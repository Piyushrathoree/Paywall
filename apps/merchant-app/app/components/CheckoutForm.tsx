"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard } from "lucide-react";

export default function CheckoutForm({ slug }: { slug: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`/api/public/payment-links/${encodeURIComponent(slug)}/pay`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email }) });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) { setError(data.error ?? "Could not complete checkout"); return; }
      setComplete(true);
    } catch { setError("Connection error. Please try again."); } finally { setLoading(false); }
  }

  if (complete) return <div className="mt-7 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" /><h2 className="mt-3 text-base font-semibold text-emerald-100">Payment recorded</h2><p className="mt-1 text-sm leading-6 text-emerald-200/70">Thanks, {name}. The merchant can now see this payment in their workspace.</p></div>;
  return <form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm text-slate-300">Your name<input required value={name} onChange={(event) => setName(event.target.value)} className="field-control mt-2" placeholder="Aanya Sharma" /></label><label className="block text-sm text-slate-300">Email <span className="text-slate-600">(optional)</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field-control mt-2" placeholder="you@example.com" /></label>{error ? <p role="alert" className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2.5 text-sm text-rose-200">{error}</p> : null}<button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-slate-900 transition hover:bg-indigo-50 disabled:opacity-60"><CreditCard className="h-4 w-4" />{loading ? "Recording payment…" : "Pay securely (demo)"}</button></form>;
}
