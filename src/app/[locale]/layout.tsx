import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { conductorDataByLocale } from "@/data/conductor";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/siteUrl";
import MotionProvider from "@/components/MotionProvider";

// Greek text falls back to the serif/sans stacks (neither face ships a greek subset)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

type Locale = (typeof routing.locales)[number];

function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const data = conductorDataByLocale[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: `${data.name} | ${data.tagline}`,
    description: data.biographyShort,
    authors: [{ name: data.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'el': '/el',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: `${data.name} | ${data.tagline}`,
      description: data.biographyShort,
      type: "website",
      locale: locale === 'en' ? 'en_US' : 'el_GR',
      images: [
        {
          url: '/images/hero-conducting.jpg',
          width: 2000,
          height: 1500,
          alt: data.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | ${data.tagline}`,
      description: data.biographyShort,
      images: ['/images/hero-conducting.jpg'],
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
  if (!isLocale(locale)) {
    notFound();
  }
  const messages = await getMessages();
  const data = conductorDataByLocale[locale];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.tagline,
    email: `mailto:${data.contactEmail}`,
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/images/portrait-studio.jpg`,
  };

  return (
    <html lang={locale} className={`scroll-smooth ${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
