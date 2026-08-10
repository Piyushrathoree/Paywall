"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { ThemeToggle } from "@repo/ui/theme-toggle";

export function AccountMenu({ name, email }: { name: string; email: string }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <div className="flex items-center gap-2"><ThemeToggle /><Link href="/account" className="group flex items-center gap-2 rounded-full border border-[#dfe6d9] bg-white px-2 py-1.5 text-left transition hover:border-[#b9c8ae]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7eee1] text-[11px] font-black text-[#163300]">{initials}</span><span className="hidden max-w-[140px] sm:block"><span className="block truncate text-xs font-bold text-[#163300]">{name}</span><span className="block truncate text-[10px] text-[#7b8577]">{email || "Personal account"}</span></span><ChevronDown className="mr-1 h-3.5 w-3.5 text-[#7b8577] transition group-hover:text-[#163300]" /></Link><button type="button" onClick={() => signOut({ callbackUrl: "/home" })} className="hidden text-xs font-semibold text-[#687064] hover:text-[#163300] lg:block">Log out</button></div>;
}
