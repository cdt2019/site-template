import type { ReactNode } from "react";

/** 区块标题：左侧 "01 — LABEL" 等宽编号，右侧衬线大标题 */
export function SectionHeading({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-line pt-6 md:grid-cols-[220px_1fr_auto] md:items-end">
      <p className="label-mono">
        <span className="text-ink">{index}</span> — {label}
      </p>
      <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {aside}
    </div>
  );
}

/** 无限滚动的用途标签条 */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper-2/60 py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-2xl italic text-ink-2">
            {item}
            <span className="size-1.5 rounded-full bg-signal" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}

/** FAQ：原生 <details>，内容默认在 HTML 中，对 SEO 友好且无需 JS */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-b border-line">
      {items.map((item, i) => (
        <details key={item.q} className="group py-1" {...(i === 0 ? { open: true } : {})}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-5">
              <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              {item.q}
            </span>
            <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:border-ink group-open:bg-accent">
              <span className="absolute h-px w-3 bg-ink" />
              <span className="absolute h-3 w-px bg-ink" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pl-10 leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
