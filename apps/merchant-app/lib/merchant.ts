import { getServerSession } from "next-auth";
import db from "@repo/db/client";
import { authOptions } from "./auth";

export async function getCurrentMerchant() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;
  return db.merchant.findUnique({ where: { email } });
}

export async function requireMerchant() {
  const merchant = await getCurrentMerchant();
  if (!merchant) throw new Error("UNAUTHENTICATED");
  return merchant;
}
