import Link from "next/link";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { localePath } from "@/lib/paths";
import { Logo } from "./Logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const columns = [
    {
      title: f.product,
      links: [
        { href: localePath(locale, "/#tool"), label: dict.nav.tool },
        { href: localePath(locale, "/#features"), label: dict.nav.features },
        { href: localePath(locale, "/#faq"), label: dict.nav.faq },
      ],
    },
    {
      title: f.company,
      links: [
        { href: localePath(locale, "/about"), label: f.about },
        { href: localePath(locale, "/blog"), label: dict.nav.blog },
        { href: `mailto:${siteConfig.email}`, label: f.contact },
      ],
    },
    {
      title: f.legal,
      links: [
        { href: localePath(locale, "/privacy"), label: f.privacy },
        { href: localePath(locale, "/terms"), label: f.terms },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{f.tagline}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="label-mono">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-2 transition hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 超大字标：视觉记忆点 */}
      <div aria-hidden className="container-x select-none">
        <p className="-mb-[0.22em] font-serif text-[clamp(4.5rem,19vw,15rem)] italic leading-none tracking-tight text-ink/[0.07]">
          {siteConfig.name}
        </p>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-ink-3 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. {f.rights}
          </span>
          <span className="font-mono">{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </footer>
  );
}
