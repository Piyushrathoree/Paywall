import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";

export async function GET() {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const settlements = await db.settlement.findMany({ where: { merchantId: merchant.id }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ settlements });
}
