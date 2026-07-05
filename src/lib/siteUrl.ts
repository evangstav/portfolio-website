// Absolute origin for metadata, sitemap, and structured data.
// Set NEXT_PUBLIC_SITE_URL in production once a custom domain exists.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
