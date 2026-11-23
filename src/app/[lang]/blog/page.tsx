import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/paths";
import { getPosts } from "@/lib/blog";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { blog } = await getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/blog", title: blog.title, description: blog.description });
}

export default async function BlogIndex({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { blog } = await getDictionary(lang);
  const posts = await getPosts(lang);

  return (
    <section className="container-x pt-16 sm:pt-24">
      <p className="label-mono">{blog.index}</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
        {blog.title}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-2">{blog.description}</p>

      <div className="mt-14 border-t border-line">
        {posts.length === 0 && <p className="py-10 text-ink-3">{blog.empty}</p>}
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={localePath(lang, `/blog/${p.slug}`)}
            className="group grid gap-3 border-b border-line py-8 transition md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-8"
          >
            <time dateTime={p.date} className="font-mono text-xs text-ink-3">
              {p.date}
            </time>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight transition group-hover:translate-x-1 sm:text-3xl">
                {p.title}
              </h2>
              <p className="mt-2 max-w-2xl text-ink-2">{p.description}</p>
            </div>
            <span className="flex items-center gap-2 text-sm text-ink-2">
              {p.readingMinutes} {blog.minRead}
              <span className="grid size-9 place-items-center rounded-full border border-line transition group-hover:border-ink group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight className="size-4" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
