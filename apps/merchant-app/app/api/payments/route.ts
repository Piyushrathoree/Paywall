import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";

export async function GET() {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const payments = await db.merchantPayment.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { paymentLink: { select: { title: true } }, customer: { select: { name: true, email: true } } },
  });
  return NextResponse.json({ payments });
}
