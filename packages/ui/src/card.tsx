import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
}

export function Card({
  title,
  eyebrow,
  description,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <section
      {...props}
      className={`glass-panel rounded-2xl p-5 sm:p-6 ${className}`}
    >
      {(eyebrow || title || description) && (
        <header className="mb-5">
          {eyebrow ? (
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
