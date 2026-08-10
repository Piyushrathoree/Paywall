"use client";

import { useState } from "react";
import { ArrowRight, Building2, ShieldCheck } from "lucide-react";
import { Select } from "@repo/ui/select";

const SUPPORTED_BANKS = [{ name: "HDFC Bank" }, { name: "Axis Bank" }];

export const AddMoney = () => {
  const [value, setValue] = useState("");
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name ?? "HDFC Bank");
  const [error, setError] = useState<string | null>(null);
  function openBank() {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount <= 0) { setError("Enter an amount greater than ₹0."); return; }
    setError(null);
    window.open(provider === "HDFC Bank" ? `/Bank/hdfc?amount=${amount}` : `/Bank/axis?amount=${amount}`, "_blank");
  }
  return <section className="rounded-2xl border border-[#e1e5dc] bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#6b8d53]">Fund your wallet</p><h2 className="mt-2 text-xl font-black tracking-[-.04em]">Add money</h2><p className="mt-1 text-xs leading-5 text-[#7b8577]">Choose a simulated bank and enter your top-up amount.</p></div><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f5dc] text-[#4a8630]"><Building2 className="h-4 w-4" /></span></div><div className="mt-7 space-y-4"><label className="block text-sm font-bold">Amount in INR<input value={value} onChange={(event) => setValue(event.target.value)} type="number" min="1" step="0.01" placeholder="0.00" className="field-control mt-2" /></label><label className="block text-sm font-bold">Bank<Select aria-label="Bank" value={provider} onSelect={setProvider} options={SUPPORTED_BANKS.map((bank) => ({ key: bank.name, value: bank.name }))} className="mt-2" /></label>{error ? <p role="alert" className="border border-[#efb6b6] bg-[#fff4f4] px-3 py-2.5 text-xs text-[#a63b3b]">{error}</p> : null}<button type="button" onClick={openBank} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#163300] text-sm font-bold text-white transition hover:bg-[#2a5417]">Continue to {provider} <ArrowRight className="h-4 w-4" /></button><p className="flex items-start gap-2 text-[11px] leading-5 text-[#7b8577]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4a8630]" />This is a local simulation. No real bank credentials are requested.</p></div></section>;
};
