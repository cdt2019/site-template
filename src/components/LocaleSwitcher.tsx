"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { siteConfig, localeLabels, type Locale } from "@/config/site";
import { localePath } from "@/lib/paths";

export function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || "/";
  // 去掉当前语言前缀，得到与语言无关的路径
  const prefix = `/${current}`;
  const base =
    current !== siteConfig.defaultLocale && pathname.startsWith(prefix)
      ? pathname.slice(prefix.length) || "/"
      : pathname;

  return (
    <details className="group relative">
      <summary
        aria-label={label}
        className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-full border border-line px-3 text-xs text-ink-2 transition hover:border-ink hover:text-ink [&::-webkit-details-marker]:hidden"
      >
        <Globe className="size-3.5" />
        <span className="font-mono uppercase">{current}</span>
      </summary>
      <ul className="absolute right-0 z-50 mt-2 min-w-36 overflow-hidden rounded-xl border border-line bg-card p-1 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.25)]">
        {siteConfig.locales.map((l) => (
          <li key={l}>
            <Link
              href={localePath(l, base)}
              hrefLang={l}
              className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm transition hover:bg-paper-2 ${
                l === current ? "text-ink" : "text-ink-2"
              }`}
            >
              {localeLabels[l]}
              {l === current && <span className="size-1.5 rounded-full bg-signal" />}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
