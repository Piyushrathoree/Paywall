import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@repo/db/client";

const checkoutSchema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(160).optional().or(z.literal("")) });

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const link = await db.paymentLink.findUnique({ where: { slug } });
  if (!link || link.status !== "Active") return NextResponse.json({ error: "This payment link is no longer available" }, { status: 404 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body" }, { status: 400 }); }
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check your details" }, { status: 400 });
  const { name, email } = parsed.data;
  const customer = await db.merchantCustomer.create({ data: { merchantId: link.merchantId, name, email: email || null } });
  const payment = await db.merchantPayment.create({ data: { merchantId: link.merchantId, paymentLinkId: link.id, customerId: customer.id, reference: `pw_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`, amount: link.amount, status: "Completed", paidAt: new Date() } });
  return NextResponse.json({ payment: { reference: payment.reference, amount: payment.amount, status: payment.status } }, { status: 201 });
}
