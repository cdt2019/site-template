import "server-only";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  zh: () => import("./dictionaries/zh").then((m) => m.default),
};

export const hasLocale = (value: string): value is Locale =>
  (siteConfig.locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
