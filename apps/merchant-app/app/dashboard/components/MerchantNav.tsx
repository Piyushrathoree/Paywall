"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, History, Home, Link2, LogOut, Settings, UsersRound, WalletCards } from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@repo/ui/theme-toggle";

const groups = [{ label: "Workspace", items: [["Overview", "/dashboard", Home], ["Payment links", "/dashboard/payment-links", Link2], ["Payments", "/dashboard/payments", CreditCard], ["Customers", "/dashboard/customers", UsersRound]] as const }, { label: "Insights", items: [["Settlements", "/dashboard/settlements", WalletCards], ["Analytics", "/dashboard/analytics", BarChart3], ["Settings", "/dashboard/settings", Settings]] as const }];

export function MerchantNav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <aside className="flex w-full shrink-0 flex-col border-b border-[#e1e5dc] bg-[#f7f8f4] p-4 lg:fixed lg:inset-y-0 lg:w-[238px] lg:border-b-0 lg:border-r lg:p-6"><Link href="/dashboard" className="mb-7 flex items-center gap-2 text-xl font-black tracking-[-.08em]">paywall<span className="text-[#5e9b40]">.</span></Link><nav className="flex gap-1 overflow-x-auto lg:block">{groups.map((group) => <div key={group.label} className="shrink-0 lg:mb-8"><p className="mb-3 hidden px-3 text-[10px] font-black uppercase tracking-[.18em] text-[#7b8577] lg:block">{group.label}</p><div className="flex gap-1 lg:block">{group.items.map(([label, href, Icon]) => { const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${active ? "bg-[#e5f4da] text-[#163300]" : "text-[#687064] hover:bg-[#eef1eb] hover:text-[#163300]"}`}><Icon className={`h-4 w-4 ${active ? "text-[#4a8630]" : "text-[#84907f]"}`} /><span className="whitespace-nowrap">{label}</span></Link>; })}</div></div>)}</nav><div className="mt-5 hidden border-t border-[#e1e5dc] pt-5 lg:mt-auto lg:block"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7eee1] text-xs font-black text-[#163300]">{initials}</span><span className="min-w-0"><span className="block truncate text-xs font-bold text-[#163300]">{name}</span><span className="block truncate text-[11px] text-[#7b8577]">{email}</span></span></div><div className="mt-4 flex items-center justify-between"><ThemeToggle /><button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="inline-flex items-center gap-2 text-xs font-semibold text-[#687064] hover:text-[#163300]"><LogOut className="h-3.5 w-3.5" />Log out</button></div></div></aside>;
}
