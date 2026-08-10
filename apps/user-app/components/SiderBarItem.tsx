"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
  const pathname = usePathname();
  const selected = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
  return <Link href={href} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${selected ? "bg-[#e5f4da] text-[#163300]" : "text-[#687064] hover:bg-[#eef1eb] hover:text-[#163300]"}`}><span className={selected ? "text-[#4a8630]" : "text-[#84907f]"}>{icon}</span><span>{title}</span></Link>;
};
