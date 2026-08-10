import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = "cyan",
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
  accent?: "cyan" | "violet" | "emerald" | "amber";
}) {
  const accents = {
    cyan: "bg-cyan-300/10 text-cyan-200",
    violet: "bg-violet-300/10 text-violet-200",
    emerald: "bg-emerald-300/10 text-emerald-200",
    amber: "bg-amber-300/10 text-amber-200",
  };
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        {icon ? (
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accents[accent]}`}>
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {value}
      </p>
      {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}
