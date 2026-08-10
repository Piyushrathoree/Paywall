import type { HTMLAttributes } from "react";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={`animate-pulse rounded-lg bg-white/[.08] ${className}`}
    />
  );
}
