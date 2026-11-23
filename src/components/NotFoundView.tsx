"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { localePath } from "@/lib/paths";

export function NotFoundView({ texts }: { texts: Record<Locale, Dictionary["notFound"]> }) {
  const first = (usePathname() || "/").split("/")[1] as Locale;
  const locale = siteConfig.locales.includes(first) ? first : siteConfig.defaultLocale;
  const t = texts[locale];

  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-serif text-[clamp(7rem,26vw,16rem)] leading-none tracking-tight italic">
          4<span className="marker not-italic">0</span>4
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-ink-2">{t.body}</p>
        <Link href={localePath(locale, "/#tool")} className="btn-ink mt-8">
          {t.back}
        </Link>
      </div>
    </section>
  );
}
