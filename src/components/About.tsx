'use client';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

interface AboutProps {
  biography: string;
  portraitImage?: string;
  portraitAlt?: string;
}

// Entrance animations are CSS (globals.css) so the biography is readable from
// first paint instead of waiting for the JS bundle to hydrate.
export default function About({ biography, portraitImage, portraitAlt }: AboutProps) {
  const t = useTranslations('sections');

  // Split biography into paragraphs
  const paragraphs = biography.split('\n\n').filter(p => p.trim());

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="anim-fade-up mb-16">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)]">
              {t('about')}
            </h2>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
        </div>

        <div className={portraitImage ? 'grid md:grid-cols-2 gap-12 md:gap-16 items-start' : ''}>
          {/* Portrait */}
          {portraitImage && (
            <div className="anim-fade-in [animation-delay:200ms] md:sticky md:top-28">
              <div className="relative aspect-[4/5] max-w-md mx-auto md:mx-0 md:ml-auto rounded-lg overflow-hidden">
                <Image
                  src={portraitImage}
                  alt={portraitAlt || ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
            </div>
          )}

          {/* Biography Content */}
          <div className="space-y-6 max-w-prose">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="anim-fade-up text-lg md:text-xl leading-relaxed text-[var(--color-text-primary)] font-light"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="anim-grow-x [animation-delay:500ms] mt-16 w-24 h-px bg-[var(--color-accent)] mx-auto" />
      </div>
    </section>
  );
}
