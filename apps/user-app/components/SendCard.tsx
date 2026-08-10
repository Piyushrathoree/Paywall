"use client";

import { useRef, useState } from "react";
import { ArrowRight, CircleCheck, Send, Smartphone } from "lucide-react";
import { p2pTransfer } from "../app/lib/actions/P2Ptransfer";
import { NumberList } from "./NumberList";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMoney = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    const cleanNumber = number.replace(/\D/g, "");
    const rupees = Number(amount);
    if (!/^\d{6,12}$/.test(cleanNumber)) { setMessage({ tone: "error", text: "Enter a valid Paywall phone number." }); return; }
    if (!Number.isFinite(rupees) || rupees <= 0) { setMessage({ tone: "error", text: "Enter an amount greater than ₹0." }); return; }
    setLoading(true);
    try { await p2pTransfer(cleanNumber, Math.round(rupees * 100)); setMessage({ tone: "success", text: `₹${rupees.toFixed(2)} sent successfully.` }); setAmount(""); } catch (error) { setMessage({ tone: "error", text: error instanceof Error && error.message === "Insufficient funds" ? "You do not have enough available balance." : error instanceof Error && error.message === "User not found" ? "We could not find that Paywall user." : "We could not complete the transfer." }); } finally { setLoading(false); }
  };

  return <section className="rounded-2xl border border-[#e1e5dc] bg-white p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.16em] text-[#6b8d53]">Paywall to Paywall</p><h2 className="mt-2 text-xl font-black tracking-[-.04em]">Send money</h2><p className="mt-1 text-xs leading-5 text-[#7b8577]">Move INR instantly to someone already on Paywall.</p></div><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f5dc] text-[#4a8630]"><Send className="h-4 w-4" /></span></div><form onSubmit={handleSendMoney} className="mt-7 space-y-5"><label className="block text-sm font-bold">Recipient phone number<span className="relative mt-2 block"><Smartphone className="field-icon" size={17} /><input ref={inputRef} type="tel" inputMode="numeric" autoComplete="tel" placeholder="Search by phone number" value={number} onChange={(event) => { setNumber(event.target.value); setDropdownVisible(true); }} onFocus={() => setDropdownVisible(true)} onBlur={() => setTimeout(() => setDropdownVisible(false), 180)} className="field-control pl-10" required />{dropdownVisible ? <NumberList number={number} onSelect={(selected) => { setNumber(selected); setDropdownVisible(false); inputRef.current?.blur(); }} /> : null}</span></label><label className="block text-sm font-bold">Amount<input type="number" min="1" step="0.01" inputMode="decimal" placeholder="0.00" value={amount} onChange={(event) => setAmount(event.target.value)} className="field-control mt-2" required /></label><div className="flex items-center justify-between gap-4 border-t border-[#e1e5dc] pt-5"><p className="text-xs leading-5 text-[#7b8577]">Settled instantly in this local demo.</p><button type="submit" disabled={loading} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#163300] px-4 text-xs font-bold text-white hover:bg-[#2a5417] disabled:opacity-60">{loading ? "Sending…" : "Send money"}{!loading ? <ArrowRight className="h-3.5 w-3.5" /> : null}</button></div>{message ? <p role="status" className={`flex items-center gap-2 px-3 py-2.5 text-sm ${message.tone === "success" ? "bg-[#eef7e8] text-[#4a8630]" : "bg-[#fff4f4] text-[#a63b3b]"}`}>{message.tone === "success" ? <CircleCheck size={16} /> : null}{message.text}</p> : null}</form></section>;
}
