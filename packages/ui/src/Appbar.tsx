"use client";

import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void | Promise<unknown>;
  onSignout: () => void | Promise<unknown>;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  function handleRedirect() {
    if (user) router.push("/dashboard");
    else router.push("/home");
    console.log("redirecting to home page");
  }

  return (
    <header className="fixed left-1/2 top-3 z-50 flex w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-4">
      <button type="button" onClick={handleRedirect} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition hover:bg-white/[.06]">
        <span className="brand-mark">P</span>
        <span className="text-sm font-semibold tracking-[0.18em] text-white">PAYWALL</span>
      </button>
      <div className="flex items-center gap-2"><ThemeToggle /><Button size="sm" variant={user ? "ghost" : "secondary"} onClick={user ? onSignout : onSignin}>{user ? "Sign out" : "Sign in"}</Button></div>
    </header>
  );
};
