import Link from "next/link";
import { Mail, Plus, UsersRound } from "lucide-react";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";
import { ResourcePage } from "../components/ResourcePage";

export default async function CustomersPage() {
  const merchant = await getCurrentMerchant();
  const customers = merchant ? await db.merchantCustomer.findMany({ where: { merchantId: merchant.id }, orderBy: { createdAt: "desc" }, include: { _count: { select: { payments: true } } } }) : [];
  return <ResourcePage eyebrow="Relationships" title="Customers" description="Keep customer context close to every payment and make repeat collection easier." action={{ label: "Add customer", href: "/dashboard/customers/new" }}>
    {!customers.length ? <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-14 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-200"><UsersRound className="h-5 w-5" /></div><h2 className="mt-4 text-base font-semibold text-white">No customers yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Save a customer once you have context worth keeping around.</p><Link href="/dashboard/customers/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 hover:bg-indigo-50"><Plus className="h-3.5 w-3.5" />Add a customer</Link></div> : <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]"><div className="divide-y divide-white/[.07]">{customers.map((customer) => <div key={customer.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-300/10 text-xs font-semibold text-indigo-200">{customer.name.slice(0, 1).toUpperCase()}</span><div><p className="text-sm font-semibold text-white">{customer.name}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-500">{customer.email ? <><Mail className="h-3 w-3" />{customer.email}</> : "No email added"}</p></div></div><p className="text-xs text-slate-500">{customer._count.payments} payment{customer._count.payments === 1 ? "" : "s"}</p></div>)}</div></div>}
  </ResourcePage>;
}
