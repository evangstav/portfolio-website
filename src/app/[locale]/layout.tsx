import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { conductorDataByLocale } from "@/data/conductor";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const data = conductorDataByLocale[locale as 'en' | 'el'];

  return {
    title: `${data.name} | Conductor`,
    description: data.biographyShort,
    keywords: ["conductor", "classical music", "orchestra", "opera", "symphony"],
    authors: [{ name: data.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'el': '/el',
      },
    },
    openGraph: {
      title: `${data.name} | Conductor`,
      description: data.biographyShort,
      type: "website",
      locale: locale === 'en' ? 'en_US' : 'el_GR',
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | Conductor`,
      description: data.biographyShort,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
