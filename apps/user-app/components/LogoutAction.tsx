"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutAction() {
  return <button type="button" onClick={() => signOut({ callbackUrl: "/home" })} className="flex w-full items-center gap-4 px-5 py-5 text-left text-sm font-bold text-[#a63b3b] hover:bg-[#fff6f6]"><span className="grid h-10 w-10 place-items-center rounded-full border border-[#f0cccc]"><LogOut className="h-5 w-5" /></span>Log out</button>;
}
