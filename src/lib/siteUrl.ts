// Absolute origin for metadata, sitemap, and structured data.
// Set NEXT_PUBLIC_SITE_URL in production once a custom domain exists.
const configured = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const siteUrl = configured ?? vercelUrl ?? 'http://localhost:3000';

// Guard against silently publishing localhost (or a bare deployment URL) as the
// public origin in canonical links, sitemap, robots, and JSON-LD.
if (process.env.NODE_ENV === 'production' && !configured) {
  if (!vercelUrl) {
    console.warn(
      '[siteUrl] Production build without NEXT_PUBLIC_SITE_URL or VERCEL_URL — ' +
        'canonical URLs, sitemap, robots, and JSON-LD will point at http://localhost:3000.'
    );
  } else if (process.env.VERCEL_ENV === 'production') {
    console.warn(
      `[siteUrl] NEXT_PUBLIC_SITE_URL is not set — public metadata uses the deployment URL ${vercelUrl}. ` +
        'Set NEXT_PUBLIC_SITE_URL when a custom domain exists.'
    );
  }
}
