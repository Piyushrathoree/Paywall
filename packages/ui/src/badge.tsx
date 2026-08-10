import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

export function Badge({
  children,
  tone = "neutral",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  const tones: Record<BadgeTone, string> = {
    neutral: "border-white/10 bg-white/[.06] text-slate-300",
    success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    danger: "border-rose-400/20 bg-rose-400/10 text-rose-200",
    info: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  };

  return (
    <span
      {...props}
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
