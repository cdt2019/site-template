import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, localePath } from "@/lib/paths";
import { Tool } from "@/tool/Tool";
import { AdSlot } from "@/components/Ads";
import { JsonLd } from "@/components/JsonLd";
import { Faq, Marquee, SectionHeading } from "@/components/Sections";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    locale: lang,
    path: "/",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { hero, how, features, faq, cta } = dict;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteConfig.name,
      url: absoluteUrl(lang),
      description: dict.meta.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: lang,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* ---------------- Hero ---------------- */}
      <section className="container-x relative pt-14 pb-10 sm:pt-20">
        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-ink-2">
              <span className="size-1.5 rounded-full bg-signal" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7.2vw,5.8rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-balance">
              {hero.titleBefore}{" "}
              <em className="marker font-serif font-normal tracking-[-0.01em]">{hero.titleEmphasis}</em>
              {hero.titleAfter}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{hero.subtitle}</p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              {hero.badges.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* 旋转印章：品牌记忆点 */}
          <a
            href="#tool"
            aria-label={dict.nav.tool}
            className="group relative hidden size-36 shrink-0 md:block"
          >
            <svg viewBox="0 0 100 100" className="size-full animate-[spin_18s_linear_infinite]">
              <defs>
                <path id="stamp-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-ink-2 font-mono text-[7.4px] uppercase">
                {/* textLength 让文字刚好绕满一圈，不同语言长度都不会重叠 */}
                <textPath href="#stamp-circle" textLength="236" lengthAdjust="spacing">
                  {hero.eyebrow} ·
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-ink text-paper transition group-hover:bg-accent group-hover:text-accent-ink">
              <ArrowDown className="size-5" />
            </span>
          </a>
        </div>
      </section>

      {/* ---------------- Tool ---------------- */}
      <section id="tool" className="container-x scroll-mt-24 animate-rise [animation-delay:120ms]">
        <Tool t={dict.tool} />
        <AdSlot slot="home-below-tool" className="mt-8" />
      </section>

      <div className="mt-20">
        <Marquee items={dict.marquee} />
      </div>

      {/* ---------------- How it works ---------------- */}
      <section id="how" className="container-x scroll-mt-24 pt-24">
        <SectionHeading index={how.index} label={how.label} title={how.title} />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3">
          {how.steps.map((s, i) => (
            <li key={s.title} className="relative bg-paper p-7 sm:p-8">
              <span className="font-serif text-7xl leading-none text-ink/15 italic">{i + 1}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Features ---------------- */}
      <section id="features" className="container-x scroll-mt-24 pt-24">
        <SectionHeading index={features.index} label={features.label} title={features.title} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((f, i) => {
            const highlight = i === 1;
            return (
              <div
                key={f.title}
                className={`group flex min-h-56 flex-col justify-between p-7 transition sm:p-8 ${
                  highlight ? "bg-accent text-accent-ink" : "bg-card hover:bg-paper"
                }`}
              >
                <span
                  className={`font-mono text-xs ${highlight ? "text-accent-ink/60" : "text-ink-3"}`}
                >
                  {features.index}.{String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p
                    className={`mt-2 leading-relaxed ${highlight ? "text-accent-ink/75" : "text-ink-2"}`}
                  >
                    {f.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="container-x scroll-mt-24 pt-24">
        <SectionHeading index={faq.index} label={faq.label} title={faq.title} />
        <div className="mt-8 md:pl-[244px]">
          <Faq items={faq.items} />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-x pt-24">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-paper sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 size-72 rounded-full bg-accent opacity-90 blur-[2px]"
          />
          <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full border border-paper/20 [transform:scale(1.35)]" />
          <h2 className="relative max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {cta.title}
          </h2>
          <Link
            href={localePath(lang, "/#tool")}
            className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition hover:gap-3"
          >
            {cta.button} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
