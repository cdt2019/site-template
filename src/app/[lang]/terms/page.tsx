import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { TextPage } from "@/components/TextPage";

const UPDATED = "2026-09-28";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { legal } = await getDictionary(lang);
  return buildMetadata({
    locale: lang,
    path: "/terms",
    title: legal.terms.title,
    description: legal.terms.description,
  });
}

export default async function Terms({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { legal } = await getDictionary(lang);
  return (
    <TextPage
      eyebrow={legal.terms.title}
      title={legal.terms.title}
      lead={legal.terms.description}
      sections={legal.terms.sections}
      updated={`${legal.updated}: ${UPDATED}`}
    />
  );
}
