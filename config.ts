import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ['en', 'fr'] as const;
export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  "/": "/",
  "/home": "/home",
  "/about": "/about",


};

export const localePrefix: LocalePrefix<Locales> = "always";
