import { siteConfig, type Locale } from "@/config/site";

/** 生成带语言前缀的站内路径：默认语言不带前缀，其他语言加 /zh 等 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === siteConfig.defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** 绝对 URL（canonical / sitemap / JSON-LD 用） */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${siteConfig.url}${localePath(locale, path)}`;
}
