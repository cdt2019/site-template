import type { Metadata } from "next";
import { siteConfig, localeTags, type Locale } from "@/config/site";
import { absoluteUrl } from "./paths";

type BuildMetadataInput = {
  locale: Locale;
  /** 不带语言前缀的路径，如 "/" 或 "/blog/hello" */
  path: string;
  title: string;
  description: string;
  /** 首页用 absolute 标题，其他页自动加 "| 品牌名" 后缀 */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/** 统一生成 title / description / canonical / hreflang / OG / Twitter */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  type = "website",
}: BuildMetadataInput): Metadata {
  const languages: Record<string, string> = {};
  for (const l of siteConfig.locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(siteConfig.defaultLocale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages,
    },
    openGraph: {
      type,
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: siteConfig.name,
      locale: localeTags[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteConfig.twitter ? { site: siteConfig.twitter } : {}),
    },
  };
}
