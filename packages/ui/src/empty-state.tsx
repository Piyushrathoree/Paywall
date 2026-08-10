import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[.02] px-6 py-10 text-center">
      {icon ? (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
