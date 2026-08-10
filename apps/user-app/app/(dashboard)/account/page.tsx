import Link from "next/link";
import { Bell, ChevronRight, FileText, HelpCircle, Shield, SlidersHorizontal, UserRound, WalletCards } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { LogoutAction } from "../../../components/LogoutAction";

export const metadata = { title: "Account | Paywall", description: "Manage your Paywall account" };

const settings = [
  [Bell, "Notifications", "Choose how Paywall keeps you updated."],
  [Shield, "Security and privacy", "Review your sign-in and data settings."],
  [WalletCards, "Payment methods", "Manage the simulated bank connections."],
  [SlidersHorizontal, "Language and appearance", "Choose the way Paywall looks."],
  [UserRound, "Personal details", "Update the name shown in your wallet."],
] as const;

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const name = session?.user?.name || "Paywall customer";
  const email = session?.user?.email || "";
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div className="mx-auto max-w-[1080px]">
    <div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#6b8d53]">Your account</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em]">Account</h1></div><Link href="/dashboard" className="hidden text-sm font-bold text-[#4a8630] hover:underline sm:flex">← Back to home</Link></div>
    <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
      <div><section className="rounded-2xl bg-[#eef1eb] p-7"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#dce6d3] text-2xl font-black text-[#163300]">{initials}</div><h2 className="mt-5 text-center text-2xl font-black uppercase tracking-[-.05em]">{name}</h2><p className="mt-1 text-center text-sm text-[#687064]">Your personal Paywall account</p><div className="mx-auto mt-5 w-fit rounded-full bg-[#dce6d3] px-3 py-1.5 text-xs font-bold text-[#4a6338]">{email || "Phone wallet"}</div></section><div className="mt-4 space-y-2"><Link href="/contact" className="flex items-center justify-between rounded-xl border border-dashed border-[#d6ddd0] bg-white px-4 py-4 text-sm font-bold hover:border-[#9fb593]"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7eee1]"><HelpCircle className="h-4 w-4" /></span>Get help</span><ChevronRight className="h-4 w-4 text-[#82907d]" /></Link><button type="button" className="flex w-full items-center justify-between rounded-xl border border-dashed border-[#d6ddd0] bg-white px-4 py-4 text-left text-sm font-bold hover:border-[#9fb593]"><span className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7eee1]"><FileText className="h-4 w-4" /></span>Download account statement</span><ChevronRight className="h-4 w-4 text-[#82907d]" /></button></div><p className="mt-6 text-center text-xs text-[#889384]">Account reference: PW-{session?.user?.id || "LOCAL"}</p></div>
      <div><h2 className="mb-4 text-xl font-black">Settings</h2><div className="divide-y divide-[#e1e5dc] rounded-2xl border border-[#e1e5dc] bg-white">{settings.map(([Icon, title, description]) => <button type="button" key={title} className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-[#f7f8f4]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e1e5dc] text-[#53634d]"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{title}</span><span className="mt-1 block text-xs leading-5 text-[#7b8577]">{description}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-[#9aa398]" /></button>)}</div><div className="mt-8"><h2 className="mb-4 text-xl font-black">Actions</h2><div className="rounded-2xl border border-[#e1e5dc] bg-white"><LogoutAction /></div></div></div>
    </div>
  </div>;
}
