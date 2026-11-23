import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { siteConfig, type Locale } from "@/config/site";

/**
 * 博客文章：src/content/blog/<语言>/<slug>.mdx
 * 每篇文章顶部导出 meta：
 *   export const meta = { title: "...", description: "...", date: "2026-09-28" }
 * 全部在构建时静态生成，部署到 Cloudflare / Vercel 都不依赖运行时文件系统。
 */
export type PostMeta = { title: string; description: string; date: string };
export type Post = PostMeta & { slug: string; readingMinutes: number };

const ROOT = path.join(process.cwd(), "src/content/blog");

export function getSlugs(locale: Locale): string[] {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readingMinutes(locale: Locale, slug: string): number {
  const raw = fs.readFileSync(path.join(ROOT, locale, `${slug}.mdx`), "utf8");
  const cjk = (raw.match(/[一-鿿]/g) ?? []).length;
  const words = raw.replace(/[一-鿿]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 238 + cjk / 400));
}

export async function loadPost(locale: Locale, slug: string) {
  const mod = (await import(`@/content/blog/${locale}/${slug}.mdx`)) as {
    default: ComponentType;
    meta: PostMeta;
  };
  return {
    Content: mod.default,
    post: { ...mod.meta, slug, readingMinutes: readingMinutes(locale, slug) } satisfies Post,
  };
}

export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await Promise.all(getSlugs(locale).map(async (s) => (await loadPost(locale, s)).post));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** sitemap 用：所有语言的所有文章 */
export async function getAllPosts() {
  const all = await Promise.all(
    siteConfig.locales.map(async (locale) => (await getPosts(locale)).map((p) => ({ locale, ...p }))),
  );
  return all.flat();
}
