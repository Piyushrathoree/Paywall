import Link from "next/link";
import { Link2, Plus, ExternalLink } from "lucide-react";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";
import { ResourcePage } from "../components/ResourcePage";

export default async function PaymentLinksPage() {
  const merchant = await getCurrentMerchant();
  const links = merchant ? await db.paymentLink.findMany({ where: { merchantId: merchant.id }, orderBy: { createdAt: "desc" }, include: { _count: { select: { payments: true } } } }) : [];
  return <ResourcePage eyebrow="Collect" title="Payment links" description="Create a shareable checkout link for a product, invoice, or one-off request." action={{ label: "Create payment link", href: "/dashboard/payment-links/new" }}>
    {!links.length ? <EmptyLinks /> : <div className="mt-6 grid gap-3">{links.map((link) => <div key={link.id} className="glass-panel flex flex-col justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"><div className="flex min-w-0 items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-300/10 text-indigo-200"><Link2 className="h-4 w-4" /></span><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{link.title}</p><p className="mt-1 text-xs text-slate-500">₹{(link.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })} · {link._count.payments} payment{link._count.payments === 1 ? "" : "s"}</p></div></div><div className="flex items-center gap-3"><span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${link.status === "Active" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-white/10 bg-white/[.05] text-slate-400"}`}>{link.status}</span><a href={`/pay/${link.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-200 hover:text-white">Open <ExternalLink className="h-3 w-3" /></a></div></div>)}</div>}
  </ResourcePage>;
}

function EmptyLinks() {
  return <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-14 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-200"><Link2 className="h-5 w-5" /></div><h2 className="mt-4 text-base font-semibold text-white">No payment links yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Create your first link and share it with a customer when you are ready to collect.</p><Link href="/dashboard/payment-links/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 hover:bg-indigo-50"><Plus className="h-3.5 w-3.5" />Create a link</Link></div>;
}
