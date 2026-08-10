import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeftRight, BarChart3, CircleHelp, CreditCard, History, Home, Send, Settings, UserRound, WalletCards } from "lucide-react";
import { SidebarItem } from "../../components/SiderBarItem";
import { authOptions } from "../lib/auth";
import { MobileNav } from "../../components/MobileNav";
import { AccountMenu } from "../../components/AccountMenu";

const navigation = [
  { href: "/dashboard", title: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/transfer", title: "Add money", icon: <CreditCard className="h-4 w-4" /> },
  { href: "/p2p", title: "Payments", icon: <ArrowLeftRight className="h-4 w-4" /> },
  { href: "/transactions", title: "Transactions", icon: <History className="h-4 w-4" /> },
];

function Navigation() {
  return <nav className="flex flex-col gap-0.5">{navigation.map((item) => <SidebarItem key={item.href} {...item} />)}</nav>;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/home");
  const name = session.user.name || "Paywall customer";
  return <div className="min-h-screen bg-[#f7f8f4] text-[#163300]"><header className="sticky top-0 z-40 border-b border-[#e1e5dc] bg-[#f7f8f4]/95 backdrop-blur-md"><div className="mx-auto flex h-[68px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-10"><Link href="/dashboard" className="flex items-center gap-2 text-xl font-black tracking-[-.08em] md:hidden">paywall<span className="text-[#5e9b40]">.</span></Link><div className="hidden text-sm font-semibold text-[#657060] md:block">Personal account</div><AccountMenu name={name} email={session.user.email || ""} /></div></header><div className="mx-auto flex max-w-[1480px]"><aside className="hidden w-[238px] shrink-0 border-r border-[#e1e5dc] px-5 py-9 md:block"><Link href="/dashboard" className="mb-12 block text-2xl font-black tracking-[-.1em]">paywall<span className="text-[#5e9b40]">.</span></Link><p className="mb-4 px-3 text-[10px] font-black uppercase tracking-[.18em] text-[#7b8577]">Your account</p><Navigation /><div className="mt-10 border-t border-[#e1e5dc] pt-6"><SidebarItem href="/account" title="Account" icon={<UserRound className="h-4 w-4" />} /><SidebarItem href="/contact" title="Help" icon={<CircleHelp className="h-4 w-4" />} /></div></aside><MobileNav><div className="px-4 pb-8 pt-20"><p className="mb-4 px-3 text-[10px] font-black uppercase tracking-[.18em] text-[#7b8577]">Your account</p><Navigation /><div className="mt-8 border-t border-[#e1e5dc] pt-5"><SidebarItem href="/account" title="Account" icon={<UserRound className="h-4 w-4" />} /><SidebarItem href="/contact" title="Help" icon={<CircleHelp className="h-4 w-4" />} /></div></div></MobileNav><main className="min-w-0 flex-1 px-5 py-9 sm:px-8 lg:px-12 lg:py-12">{children}</main></div></div>;
}
