import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      // YouTube video thumbnails
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
