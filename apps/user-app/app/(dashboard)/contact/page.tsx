"use client";

import { useState } from "react";
import { Clock3, HelpCircle, Mail, Send, ShieldCheck } from "lucide-react";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSent(false);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return <div className="mx-auto max-w-6xl"><div className="mb-8"><p className="eyebrow">Support</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">How can we help?</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Tell us what is blocking you and we will point you in the right direction.</p></div><div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><aside className="space-y-4"><div className="glass-panel rounded-2xl p-6"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><Mail className="h-4 w-4" /></span><h2 className="mt-4 text-base font-semibold text-white">Email support</h2><p className="mt-2 text-sm leading-6 text-slate-500">For account or transaction questions, email us and include the phone number on your account.</p><a href="mailto:support@paywall.com" className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">support@paywall.com</a></div><div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[.05] p-6"><ShieldCheck className="h-5 w-5 text-emerald-300" /><h2 className="mt-4 text-base font-semibold text-emerald-100">Your data stays yours</h2><p className="mt-2 text-sm leading-6 text-slate-400">Never send a password, bank PIN, or one-time code through this form.</p></div><div className="glass-panel rounded-2xl p-6"><Clock3 className="h-5 w-5 text-slate-400" /><p className="mt-4 text-sm font-semibold text-white">Response time</p><p className="mt-2 text-sm leading-6 text-slate-500">Usually within one business day while this demo workspace is running.</p></div></aside><section className="glass-panel rounded-2xl p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><HelpCircle className="h-4 w-4" /></span><div><h2 className="text-base font-semibold text-white">Send a message</h2><p className="mt-1 text-xs text-slate-500">We will use your email only to reply.</p></div></div><form onSubmit={submit} className="mt-7 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-slate-300">Name<input required value={form.name} onChange={(event) => update("name", event.target.value)} className="field-control mt-2" placeholder="Your name" /></label><label className="text-sm text-slate-300">Email<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="field-control mt-2" placeholder="you@example.com" /></label></div><label className="block text-sm text-slate-300">Subject<input required value={form.subject} onChange={(event) => update("subject", event.target.value)} className="field-control mt-2" placeholder="What do you need help with?" /></label><label className="block text-sm text-slate-300">Message<textarea required rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} className="field-control mt-2 h-auto py-3" placeholder="Share the details…" /></label><button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"><Send className="h-4 w-4" />Send message</button>{sent ? <p role="status" className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2.5 text-sm text-emerald-200">Message received. We&apos;ll get back to you at the email you provided.</p> : null}</form></section></div></div>;
}
