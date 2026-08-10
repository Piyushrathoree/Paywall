import { NextResponse } from "next/server";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../../lib/merchant";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { id } = await context.params;
  const linkId = Number(id);
  if (!Number.isInteger(linkId)) return NextResponse.json({ error: "Invalid link" }, { status: 400 });
  const link = await db.paymentLink.findFirst({ where: { id: linkId, merchantId: merchant.id } });
  if (!link) return NextResponse.json({ error: "Payment link not found" }, { status: 404 });
  const updated = await db.paymentLink.update({ where: { id: link.id }, data: { status: link.status === "Active" ? "Archived" : "Active" } });
  return NextResponse.json({ link: updated });
}
