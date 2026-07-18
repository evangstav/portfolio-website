import { conductorDataByLocale } from '@/data/conductor';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/siteUrl';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const urls = routing.locales
    .map((locale) => {
      const pageUrl = `${siteUrl}/${locale}/media`;
      const images = conductorDataByLocale[locale].gallery
        .map(
          (image) => `
    <image:image>
      <image:loc>${escapeXml(new URL(image.src, siteUrl).toString())}</image:loc>
      <image:title>${escapeXml(image.alt)}</image:title>
    </image:image>`
        )
        .join('');

      return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>${images}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
