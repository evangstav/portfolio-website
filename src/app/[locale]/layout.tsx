import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "../globals.css";
import { conductorDataByLocale } from "@/data/conductor";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/siteUrl";
import { cormorant, notoSerifGreek, outfit } from "@/lib/fonts";
import MotionProvider from "@/components/MotionProvider";

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
          url: '/images/og-card.jpg',
          width: 1200,
          height: 630,
          alt: data.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | ${data.tagline}`,
      description: data.biographyShort,
      images: ['/images/og-card.jpg'],
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
  // Opt into static rendering — without this next-intl marks the locale routes dynamic
  setRequestLocale(locale);
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
    sameAs: data.socialLinks
      .filter((link) => link.platform !== 'email')
      .map((link) => link.url),
  };

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${cormorant.variable} ${outfit.variable} ${locale === 'el' ? notoSerifGreek.variable : ''}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
