"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return <><button type="button" onClick={() => setIsOpen((value) => !value)} className="fixed left-4 top-4 z-[100] grid h-9 w-9 place-items-center rounded-full border border-[#dfe6d9] bg-white text-[#163300] shadow-sm md:hidden" aria-label="Toggle navigation">{isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>{isOpen ? <button type="button" aria-label="Close navigation" className="fixed inset-0 z-[80] bg-[#163300]/20 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} /> : null}<aside className={`fixed bottom-0 left-0 top-0 z-[90] w-72 border-r border-[#e1e5dc] bg-[#f7f8f4] shadow-xl transition-transform md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}><div className="h-full overflow-y-auto">{children}</div></aside></>;
}
