import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { conductorDataByLocale } from '@/data/conductor';
import { routing } from '@/i18n/routing';
import MediaGallery from './MediaGallery';

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'media' });
  const data = conductorDataByLocale[locale as Locale];

  return {
    title: `${t('title')} | ${data.name}`,
    alternates: {
      canonical: `/${locale}/media`,
      languages: {
        'en': '/en/media',
        'el': '/el/media',
        'x-default': '/en/media',
      },
    },
  };
}

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MediaGallery />;
}
