import { BarChart3, CheckCircle2, Link2, UsersRound } from "lucide-react";
import db from "@repo/db/client";
import { getCurrentMerchant } from "../../../lib/merchant";
import { ResourcePage } from "../components/ResourcePage";

export default async function AnalyticsPage() {
  const merchant = await getCurrentMerchant();
  const [all, completed, activeLinks, customers] = merchant ? await Promise.all([
    db.merchantPayment.aggregate({ where: { merchantId: merchant.id }, _sum: { amount: true }, _count: { _all: true } }),
    db.merchantPayment.aggregate({ where: { merchantId: merchant.id, status: "Completed" }, _sum: { amount: true }, _count: { _all: true } }),
    db.paymentLink.count({ where: { merchantId: merchant.id, status: "Active" } }),
    db.merchantCustomer.count({ where: { merchantId: merchant.id } }),
  ]) : [{ _sum: { amount: null }, _count: { _all: 0 } }, { _sum: { amount: null }, _count: { _all: 0 } }, 0, 0] as const;
  const successRate = all._count._all ? Math.round((completed._count._all / all._count._all) * 100) : null;
  return <ResourcePage eyebrow="Understand" title="Analytics" description="See collection trends, conversion, and the health of your payment flows."><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric icon={<BarChart3 className="h-4 w-4" />} label="Collected" value={`₹${((completed._sum.amount ?? 0) / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`} /><Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Success rate" value={successRate === null ? "—" : `${successRate}%`} /><Metric icon={<Link2 className="h-4 w-4" />} label="Active links" value={String(activeLinks)} /><Metric icon={<UsersRound className="h-4 w-4" />} label="Customers" value={String(customers)} /></div><div className="glass-panel mt-4 rounded-2xl p-6"><p className="text-sm font-semibold text-white">Payment volume</p><p className="mt-1 text-sm text-slate-500">{all._count._all ? `${all._count._all} payment event${all._count._all === 1 ? "" : "s"} recorded in this workspace.` : "Your first completed checkout will start this view."}</p></div></ResourcePage>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="glass-panel rounded-2xl p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-300/10 text-indigo-200">{icon}</span><p className="mt-4 text-xs text-slate-500">{label}</p><p className="mt-1 text-xl font-semibold text-white">{value}</p></div>; }
