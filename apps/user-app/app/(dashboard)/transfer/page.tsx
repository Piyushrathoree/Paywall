import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { ShieldCheck } from "lucide-react";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { authOptions } from "../../lib/auth";

export const metadata = { title: "Add money | Paywall", description: "Top up your Paywall wallet" };

export default async function TransferPage() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  const [balance, transactions] = await Promise.all([prisma.balance.findFirst({ where: { userId } }), prisma.onRampTransaction.findMany({ where: { userId }, orderBy: { startTime: "desc" }, take: 8 })]);
  const mapped = transactions.map((transaction) => ({ time: transaction.startTime, amount: transaction.amount, status: transaction.status, provider: transaction.provider }));
  return <div className="mx-auto max-w-[1120px]"><div className="mb-9"><p className="text-xs font-black uppercase tracking-[.18em] text-[#6b8d53]">Add money</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em]">Fund your wallet</h1><p className="mt-2 max-w-xl text-sm leading-6 text-[#687064]">Top up securely from a simulated bank account. You will always see exactly what was added.</p></div><div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr]"><div className="space-y-4"><AddMoney /><div className="flex items-start gap-3 rounded-2xl bg-[#eef7e8] p-5"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4a8630]" /><div><p className="text-sm font-black">Safe by design</p><p className="mt-1 text-xs leading-5 text-[#687064]">No real bank credentials are requested. The next step is a local simulated bank page.</p></div></div></div><div className="space-y-4"><BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0} /><OnRampTransaction transactions={mapped} title="Top-up history" /></div></div></div>;
}
