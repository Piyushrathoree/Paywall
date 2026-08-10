"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-400 text-slate-950 shadow-[0_10px_30px_-12px_rgba(34,211,238,.8)] hover:bg-cyan-300 focus-visible:ring-cyan-300/60",
  secondary:
    "border border-white/12 bg-white/[.06] text-white hover:bg-white/[.1] focus-visible:ring-white/30",
  ghost:
    "text-slate-300 hover:bg-white/[.07] hover:text-white focus-visible:ring-white/30",
  danger:
    "border border-rose-400/25 bg-rose-400/10 text-rose-200 hover:bg-rose-400/20 focus-visible:ring-rose-300/50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 rounded-lg px-3 text-xs",
  md: "h-10 rounded-xl px-4 text-sm",
  lg: "h-12 rounded-xl px-5 text-sm",
};

export const Button = ({
  children,
  className = "",
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-label="Loading"
        />
      ) : null}
      {children}
    </button>
  );
};
