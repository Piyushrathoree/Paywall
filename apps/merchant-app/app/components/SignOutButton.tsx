"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white disabled:opacity-60"
    >
      {isLoading ? "Signing out…" : "Sign out"}
    </button>
  );
}
