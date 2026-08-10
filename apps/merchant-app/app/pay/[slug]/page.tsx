import { notFound } from "next/navigation";
import db from "@repo/db/client";
import CheckoutForm from "../../components/CheckoutForm";

export default async function PaymentLinkCheckout({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = await db.paymentLink.findUnique({ where: { slug }, include: { merchant: { select: { name: true, email: true } } } });
  if (!link || link.status !== "Active") notFound();
  return <main className="flex min-h-screen items-center justify-center px-4 py-10"><div className="w-full max-w-md"><div className="mb-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 text-sm font-black text-white">P</span><div><p className="text-sm font-semibold text-white">Paywall checkout</p><p className="text-xs text-slate-500">{link.merchant.name || link.merchant.email}</p></div></div><section className="glass-panel rounded-3xl p-6 sm:p-8"><p className="eyebrow">Payment request</p><h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">{link.title}</h1>{link.description ? <p className="mt-2 text-sm leading-6 text-slate-400">{link.description}</p> : null}<div className="mt-7 border-y border-white/10 py-5"><p className="text-xs text-slate-500">Amount due</p><p className="mt-1 text-3xl font-semibold text-white">₹{(link.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p></div><CheckoutForm slug={link.slug} /></section><p className="mt-5 text-center text-xs leading-5 text-slate-600">This checkout is part of a Paywall demo. No real payment method is charged.</p></div></main>;
}
