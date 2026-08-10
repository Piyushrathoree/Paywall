import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@repo/db/client";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\d{6,12}$/, "Use a phone number with 6 to 12 digits"),
  password: z.string().min(6, "Use at least 6 characters").max(72),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check your details" },
      { status: 400 },
    );
  }

  const { name, phone, password } = parsed.data;
  const existingUser = await db.user.findUnique({ where: { number: phone } });
  if (existingUser) {
    return NextResponse.json(
      { error: "An account with this phone number already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: {
        name,
        number: phone,
        password: hashedPassword,
        Balance: { create: { amount: 0, locked: 0 } },
      },
      select: { id: true, name: true, number: true },
    });

    return NextResponse.json(
      { user: { id: user.id, name: user.name, phone: user.number } },
      { status: 201 },
    );
  } catch {
    // A second request can win the unique-number race between the lookup and
    // create. Avoid exposing database details and give the user a useful path.
    return NextResponse.json(
      { error: "Could not create that account. Please try again." },
      { status: 409 },
    );
  }
}
