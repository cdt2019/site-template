import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import { TextPage } from "@/components/TextPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { about } = await getDictionary(lang);
  return buildMetadata({ locale: lang, path: "/about", title: about.title, description: about.description });
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { about } = await getDictionary(lang);
  return <TextPage eyebrow={about.title} title={about.title} lead={about.description} paragraphs={about.body} />;
}
