import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";

export async function GET() {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const [all, completed, links, customers] = await Promise.all([
    db.merchantPayment.aggregate({ where: { merchantId: merchant.id }, _sum: { amount: true }, _count: { _all: true } }),
    db.merchantPayment.aggregate({ where: { merchantId: merchant.id, status: "Completed" }, _sum: { amount: true }, _count: { _all: true } }),
    db.paymentLink.count({ where: { merchantId: merchant.id, status: "Active" } }),
    db.merchantCustomer.count({ where: { merchantId: merchant.id } }),
  ]);
  return NextResponse.json({
    totalCollected: completed._sum.amount ?? 0,
    paymentCount: all._count._all,
    completedCount: completed._count._all,
    successRate: all._count._all ? Math.round((completed._count._all / all._count._all) * 100) : null,
    activeLinks: links,
    customerCount: customers,
  });
}
