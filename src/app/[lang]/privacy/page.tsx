import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { TextPage } from "@/components/TextPage";

const UPDATED = "2026-09-28";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { legal } = await getDictionary(lang);
  return buildMetadata({
    locale: lang,
    path: "/privacy",
    title: legal.privacy.title,
    description: legal.privacy.description,
  });
}

type PrivacySection = { h: string; p: string; requires?: "analytics" | "ads" };

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { legal } = await getDictionary(lang);
  // 统计、广告的说明只在真的开启时显示，隐私政策要和站点实际行为一致
  const enabled = { analytics: !!siteConfig.gaId, ads: !!siteConfig.adsenseClient };
  const sections = (legal.privacy.sections as PrivacySection[]).filter((s) => !s.requires || enabled[s.requires]);
  return (
    <TextPage
      eyebrow={legal.privacy.title}
      title={legal.privacy.title}
      lead={legal.privacy.description}
      sections={sections}
      updated={`${legal.updated}: ${UPDATED}`}
    />
  );
}
