import Link from "next/link";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/i18n";
import { localePath } from "@/lib/paths";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: localePath(locale, "/#how"), label: dict.nav.how },
    { href: localePath(locale, "/#features"), label: dict.nav.features },
    { href: localePath(locale, "/#faq"), label: dict.nav.faq },
    { href: localePath(locale, "/blog"), label: dict.nav.blog },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href={localePath(locale)} aria-label="Home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-2 transition hover:bg-paper-2 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} label={dict.nav.language} />
          <ThemeToggle label={dict.nav.theme} />
          <Link href={localePath(locale, "/#tool")} className="btn-ink hidden !py-2 sm:inline-flex">
            {dict.nav.cta}
          </Link>
        </div>
      </div>

      {/* 移动端导航：横向滚动的第二行 */}
      <nav className="container-x flex gap-1 overflow-x-auto pb-2.5 md:hidden [scrollbar-width:none]">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-ink-2"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
