import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { conductorDataByLocale } from '@/data/conductor';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/siteUrl';
import MediaGallery from './MediaGallery';

type Locale = (typeof routing.locales)[number];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'media' });
  const data = conductorDataByLocale[locale as Locale];

  return {
    title: `${t('title')} | ${data.name}`,
    description: t('description'),
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
  const data = conductorDataByLocale[locale as Locale];
  const t = await getTranslations({ locale, namespace: 'media' });
  const mediaDescription = t('description');

  // VideoObject structured data for each embedded video — only fields we
  // actually know; no invented dates or descriptions.
  const videosJsonLd =
    data.videos.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: data.videos.map((video, index) => {
            const videoId = video.videoUrl.split('/embed/')[1]?.split(/[?&]/)[0];
            const contentUrl = videoId
              ? `https://www.youtube.com/watch?v=${videoId}`
              : video.videoUrl;

            return {
              '@type': 'VideoObject',
              position: index + 1,
              name: video.title,
              description: video.subtitle ?? mediaDescription,
              thumbnailUrl: video.thumbnailUrl,
              embedUrl: video.videoUrl,
              contentUrl,
              url: `${siteUrl}/${locale}/media`,
              inLanguage: locale,
            };
          }),
        }
      : null;

  const imagesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: data.gallery.map((image, index) => ({
      '@type': 'ImageObject',
      position: index + 1,
      name: image.alt,
      description: image.alt,
      contentUrl: new URL(image.src, siteUrl).toString(),
      url: `${siteUrl}/${locale}/media`,
      inLanguage: locale,
    })),
  };

  return (
    <>
      {videosJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videosJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imagesJsonLd) }}
      />
      <MediaGallery />
    </>
  );
}
