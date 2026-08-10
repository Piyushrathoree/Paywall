"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateLinkForm({ customer = false }: { customer?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(customer ? "/api/customers" : "/api/payment-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer ? { name, email, phone } : { title: name, description, amount }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Could not save this yet");
        return;
      }
      setSaved(true);
      setTimeout(() => router.push(customer ? "/dashboard/customers" : "/dashboard/payment-links"), 500);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass-panel mt-6 max-w-xl rounded-2xl p-6">
      <div className="grid gap-4">
        <label className="text-sm text-slate-300">
          {customer ? "Customer name" : "What are you collecting for?"}
          <input required value={name} onChange={(event) => setName(event.target.value)} className="field-control mt-2" placeholder={customer ? "e.g. Aanya Sharma" : "e.g. Monthly subscription"} />
        </label>
        {customer ? (
          <>
            <label className="text-sm text-slate-300">Email <span className="text-slate-600">(optional)</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field-control mt-2" placeholder="aanya@example.com" /></label>
            <label className="text-sm text-slate-300">Phone <span className="text-slate-600">(optional)</span><input value={phone} onChange={(event) => setPhone(event.target.value)} className="field-control mt-2" placeholder="Phone number" /></label>
          </>
        ) : (
          <>
            <label className="text-sm text-slate-300">Amount in INR<input required value={amount} onChange={(event) => setAmount(event.target.value)} type="number" min="1" step="0.01" className="field-control mt-2" placeholder="0.00" /></label>
            <label className="text-sm text-slate-300">Description <span className="text-slate-600">(optional)</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="field-control mt-2 h-auto py-3" placeholder="A short note your customer will see" /></label>
          </>
        )}
        {error ? <p role="alert" className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2.5 text-sm text-rose-200">{error}</p> : null}
        <button disabled={loading || saved} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50 disabled:cursor-wait disabled:opacity-60">
          {saved ? "Saved" : loading ? "Saving…" : customer ? "Add customer" : "Create payment link"}
        </button>
        {saved ? <p className="text-xs text-emerald-300">Saved to this workspace. Redirecting…</p> : <p className="text-xs leading-5 text-slate-500">This is a demo workspace. Creating a link does not move money until a payment is recorded.</p>}
      </div>
    </form>
  );
}
