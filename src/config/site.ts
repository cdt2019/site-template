/**
 * 站点全局配置 —— 每做一个新站，主要改这个文件 + 字典文件 + src/tool/Tool.tsx
 */
export const siteConfig = {
  /** 品牌名（显示在 Logo、标题后缀） */
  name: "Wordsmith",
  /** 正式域名，用于 canonical / sitemap / OG，结尾不要带 / */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** 联系邮箱（隐私政策、关于页会用到，AdSense 审核需要） */
  email: "hello@example.com",
  /** Twitter/X 账号，不需要可留空 */
  twitter: "",

  /** 支持的语言，第一个是默认语言（默认语言 URL 不带前缀） */
  locales: ["en", "zh"] as const,
  defaultLocale: "en" as const,

  /** Google AdSense 发布商 ID，例如 ca-pub-1234567890，留空则不加载广告 */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  /** Google Analytics 4 衡量 ID，例如 G-XXXXXXX，留空则不加载 */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
};

export type Locale = (typeof siteConfig.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
};

/** 各语言对应的 hreflang / OG locale */
export const localeTags: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};
