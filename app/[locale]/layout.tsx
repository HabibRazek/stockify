import type { Metadata } from "next";
import "../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Providers } from "../providers";
import { locales } from "@/config";


export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      site_name: 'Invoice Maker'
    }
  };
}
type Props = {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params: { locale } }: Props) {
  
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
