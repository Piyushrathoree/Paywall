"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Phone, UserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Mode = "signin" | "signup";

export default function LoginSignup() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("mode") === "signup") setMode("signup");
  }, []);

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setError("");
    router.replace(`/auth${nextMode === "signup" ? "?mode=signup" : ""}`, { scroll: false });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const phone = phoneNumber.replace(/\D/g, "");
    try {
      if (mode === "signup") {
        const registration = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, password }) });
        const data = (await registration.json()) as { error?: string };
        if (!registration.ok) { setError(data.error ?? "Could not create your account"); return; }
      }
      const result = await signIn("credentials", { phone, password, redirect: false });
      if (!result || result.error) { setError(mode === "signup" ? "Account created, but sign-in failed. Please try again." : "That phone number or password is not correct."); return; }
      router.push("/dashboard");
      router.refresh();
    } catch { setError("Something went wrong. Check your connection and try again."); } finally { setIsLoading(false); }
  };

  return <main className="min-h-screen bg-[#f7f8f4] px-4 py-5 text-[#163300] sm:px-8 sm:py-8"><div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-[1240px] flex-col overflow-hidden rounded-[2rem] border border-[#dfe6d9] bg-white shadow-[0_18px_60px_rgba(22,51,0,.08)] lg:flex-row"><section className="relative flex min-h-[360px] flex-1 flex-col justify-between overflow-hidden bg-[#9fe870] p-7 sm:p-10 lg:min-h-[740px] lg:p-14"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c5f59e]" /><div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#78bb53]" /><div className="relative"><a href="/home" className="text-xl font-black tracking-[-.08em]">paywall<span className="text-[#5e9b40]">.</span></a><p className="mt-20 max-w-lg text-xs font-bold uppercase tracking-[.2em] text-[#587d3c]">Personal wallet</p><h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-7xl">A simpler way to move your money.</h1><p className="mt-6 max-w-md text-sm leading-6 text-[#355422]">Top up, send money to people you trust, and keep your whole activity trail in focus.</p></div><div className="relative mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:max-w-sm">{["Clear balances", "Instant Paywall transfers", "Simulated bank top-ups"].map((item) => <div key={item} className="flex items-center gap-2 text-xs font-bold text-[#355422]"><span className="grid h-6 w-6 place-items-center rounded-full bg-[#d7f9bd]"><Check className="h-3.5 w-3.5" /></span>{item}</div>)}</div></section><section className="flex w-full flex-1 items-center p-6 sm:p-10 lg:max-w-[520px] lg:p-16"><div className="w-full"><div className="mb-8"><p className="text-xs font-black uppercase tracking-[.18em] text-[#6b8d53]">Welcome to Paywall</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{mode === "signin" ? "Sign in to your wallet" : "Create your wallet"}</h2><p className="mt-2 text-sm leading-6 text-[#687064]">{mode === "signin" ? "Pick up where you left off." : "It only takes a minute to get started."}</p></div><div className="mb-7 flex gap-5 border-b border-[#e1e5dc]" role="tablist" aria-label="Authentication mode">{(["signin", "signup"] as Mode[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={mode === tab} onClick={() => switchMode(tab)} className={`relative pb-3 text-sm font-bold ${mode === tab ? "text-[#163300] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-[#163300]" : "text-[#8a9485]"}`}>{tab === "signin" ? "Sign in" : "Create account"}</button>)}</div><form onSubmit={handleSubmit} className="space-y-4">{mode === "signup" ? <label className="block space-y-2"><span className="field-label">Full name</span><span className="relative block"><UserRound className="field-icon" size={17} /><input className="field-control pl-10" type="text" autoComplete="name" placeholder="Piyush Rathore" value={name} onChange={(event) => setName(event.target.value)} required /></span></label> : null}<label className="block space-y-2"><span className="field-label">Phone number</span><span className="relative block"><Phone className="field-icon" size={17} /><input className="field-control pl-10" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10 digit phone number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required /></span></label><label className="block space-y-2"><span className="field-label">Password</span><span className="relative block"><LockKeyhole className="field-icon" size={17} /><input className="field-control pl-10 pr-11" type={showPassword ? "text" : "password"} autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687064]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>{error ? <p role="alert" className="border border-[#efb6b6] bg-[#fff4f4] px-3 py-2.5 text-sm text-[#a63b3b]">{error}</p> : null}<button type="submit" disabled={isLoading} className="group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#163300] px-5 text-sm font-bold text-white transition hover:bg-[#2a5417] disabled:opacity-60">{isLoading ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}{!isLoading ? <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" /> : null}</button></form><p className="mt-7 text-center text-xs leading-5 text-[#7a8474]">By continuing, you agree to Paywall&apos;s <a className="font-semibold underline" href="/terms">Terms</a> and <a className="font-semibold underline" href="/privacy">Privacy Policy</a>.</p></div></section></div></main>;
}
