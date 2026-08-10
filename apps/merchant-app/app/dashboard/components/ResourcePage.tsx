import Link from "next/link";

type ResourcePageProps = { eyebrow: string; title: string; description: string; action?: { label: string; href: string }; children?: React.ReactNode };

export function ResourcePage({ eyebrow, title, description, action, children }: ResourcePageProps) {
  return <main><div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p></div>{action && <Link href={action.href} className="w-fit rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-indigo-50">{action.label}</Link>}</div>{children || <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-14 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-400/10 text-xl text-indigo-200">✦</div><h2 className="mt-4 text-base font-semibold text-white">Nothing here yet</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Once you start using this workspace, your {title.toLowerCase()} will show up here.</p></div>}</main>;
}
