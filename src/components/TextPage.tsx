import { siteConfig } from "@/config/site";

/** 关于 / 隐私 / 条款 等纯文本页面的统一版式 */
export function TextPage({
  eyebrow,
  title,
  lead,
  sections,
  paragraphs,
  updated,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections?: { h: string; p: string }[];
  paragraphs?: string[];
  updated?: string;
}) {
  return (
    <section className="container-x pt-16 sm:pt-24">
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <p className="label-mono">{eyebrow}</p>
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">{title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink-2">{lead}</p>
          {updated && <p className="label-mono mt-6">{updated}</p>}

          <div className="prose-ink mt-12 border-t border-line pt-10">
            {paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {sections?.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
