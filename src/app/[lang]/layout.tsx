import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@/config/site";
import { getDictionary, hasLocale } from "@/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { themeInitScript } from "@/lib/theme";
import { AdSenseScript } from "@/components/Ads";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    ...(siteConfig.adsenseClient ? { other: { "google-adsense-account": siteConfig.adsenseClient } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#11100d" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh">
        {/* 首屏前设置深浅色，避免闪烁（beforeInteractive 会注入到初始 HTML 中） */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header locale={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={lang} dict={dict} />
        <AdSenseScript />
        <Analytics />
      </body>
    </html>
  );
}
