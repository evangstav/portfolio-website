import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '@/components/HomePage';
import { homepageVariants, isHomepageVariant } from '@/lib/homepageVariants';

export const dynamicParams = false;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export function generateStaticParams() {
  return Object.keys(homepageVariants).map((variant) => ({ variant }));
}

export default async function HomepagePreview({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;

  if (!isHomepageVariant(variant)) {
    notFound();
  }

  const selectedVariant = homepageVariants[variant];

  return (
    <HomePage
      heroImage={selectedVariant.image}
      heroImagePosition={selectedVariant.imagePosition}
      homepagePath={`/preview/${variant}`}
    />
  );
}
