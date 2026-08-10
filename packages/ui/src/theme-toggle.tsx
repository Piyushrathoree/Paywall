"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("paywall-theme");
    const shouldUseLight = saved !== "dark";
    setLight(shouldUseLight);
    document.documentElement.dataset.theme = shouldUseLight ? "light" : "dark";
  }, []);

  function toggle() {
    const nextLight = !light;
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    window.localStorage.setItem("paywall-theme", nextLight ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[.05] text-sm text-slate-300 transition hover:bg-white/[.1] hover:text-white"
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Switch to dark theme" : "Switch to light theme"}
    >
      {light ? "☾" : "☼"}
    </button>
  );
}
