"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

/** An accessible, unopinionated input used by both Paywall applications. */
export function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-200">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leading ? (
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
            {leading}
          </span>
        ) : null}
        <input
          {...props}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-11 w-full rounded-xl border border-white/10 bg-white/[.055] px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-50 ${leading ? "pl-10" : ""} ${trailing ? "pr-10" : ""} ${error ? "border-rose-400/60 focus:border-rose-300/70 focus:ring-rose-300/10" : ""} ${className}`}
        />
        {trailing ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
            {trailing}
          </span>
        ) : null}
      </div>
      {error ? <p id={`${inputId}-error`} className="text-xs text-rose-300">{error}</p> : null}
      {!error && hint ? <p id={`${inputId}-hint`} className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
