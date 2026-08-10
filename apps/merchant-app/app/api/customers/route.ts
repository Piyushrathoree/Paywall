import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";

const customerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional(),
});

export async function GET() {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const customers = await db.merchantCustomer.findMany({
    where: { merchantId: merchant.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { payments: true } } },
  });
  return NextResponse.json({ customers });
}

export async function POST(request: Request) {
  const merchant = await getCurrentMerchant();
  if (!merchant) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body" }, { status: 400 }); }
  const parsed = customerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the form" }, { status: 400 });
  const customer = await db.merchantCustomer.create({ data: { merchantId: merchant.id, name: parsed.data.name, email: parsed.data.email || null, phone: parsed.data.phone || null } });
  return NextResponse.json({ customer }, { status: 201 });
}
