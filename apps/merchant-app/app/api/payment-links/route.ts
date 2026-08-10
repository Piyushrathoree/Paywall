import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";

const linkSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(300).optional(),
  amount: z.coerce.number().positive().max(10_000_000),
});

export async function GET() {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const links = await db.paymentLink.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { payments: true } } },
  });
  return NextResponse.json({ links });
}

export async function POST(request: Request) {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = linkSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the form" }, { status: 400 });
  const { title, description, amount } = parsed.data;
  const link = await db.paymentLink.create({
    data: {
      merchantId: merchant.id,
      title,
      description: description || null,
      amount: Math.round(amount * 100),
      slug: `pay-${crypto.randomUUID().slice(0, 12)}`,
    },
  });
  return NextResponse.json({ link }, { status: 201 });
}
