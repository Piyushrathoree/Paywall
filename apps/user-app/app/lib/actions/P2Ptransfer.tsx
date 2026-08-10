"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  if (!from) {
    throw new Error("Error while sending");
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Amount should be greater than 0");
  }

  let toUser;
  try {
    toUser = await prisma.user.findFirst({
      where: {
        number: to,
      },
    });
  } catch (error) {
    throw new Error("Error fetching user");
  }

  if (!toUser) {
    throw new Error("User not found");
  }
  if (toUser.id === Number(from)) {
    throw new Error("You cannot send money to yourself");
  }
  await prisma.$transaction(async (tx: any) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.upsert({
      where: { userId: toUser.id },
      create: { userId: toUser.id, amount, locked: 0 },
      update: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
