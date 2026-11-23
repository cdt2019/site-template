import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, localePath } from "@/lib/paths";
import { getSlugs, loadPost } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/Ads";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.flatMap((lang) => getSlugs(lang).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { post } = await loadPost(lang, slug);
  const meta = buildMetadata({
    locale: lang,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    type: "article",
  });
  // 只有存在对应译文的语言才输出 hreflang
  const languages: Record<string, string> = {};
  for (const l of siteConfig.locales) {
    if (getSlugs(l).includes(slug)) languages[l] = absoluteUrl(l, `/blog/${slug}`);
  }
  return { ...meta, alternates: { ...meta.alternates, languages } };
}

export default async function BlogPost({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !getSlugs(lang).includes(slug)) notFound();
  const { blog } = await getDictionary(lang);
  const { Content, post } = await loadPost(lang, slug);

  return (
    <article className="container-x pt-12 sm:pt-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: lang,
          mainEntityOfPage: absoluteUrl(lang, `/blog/${slug}`),
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />

      <Link href={localePath(lang, "/blog")} className="btn-line">
        <ArrowLeft className="size-3.5" /> {blog.back}
      </Link>

      <header className="mx-auto mt-10 max-w-3xl">
        <p className="label-mono flex flex-wrap gap-x-4">
          <time dateTime={post.date}>{post.date}</time>
          <span>
            {post.readingMinutes} {blog.minRead}
          </span>
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.04] tracking-tight text-balance sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-ink-2">{post.description}</p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl border-t border-line pt-10">
        <div className="prose-ink">
          <Content />
        </div>
        <AdSlot slot="article-bottom" className="mt-14" />
      </div>
    </article>
  );
}
