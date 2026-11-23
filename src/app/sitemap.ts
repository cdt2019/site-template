import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/paths";
import { getAllPosts } from "@/lib/blog";

/** 静态页面列表：新增页面时加到这里 */
const STATIC_PATHS = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const alternates = (path: string) => ({
    languages: Object.fromEntries(siteConfig.locales.map((l) => [l, absoluteUrl(l, path)])),
  });

  const pages = siteConfig.locales.flatMap((locale) =>
    STATIC_PATHS.map((p) => ({
      url: absoluteUrl(locale, p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: alternates(p.path),
    })),
  );

  const posts = (await getAllPosts()).map((p) => ({
    url: absoluteUrl(p.locale, `/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
