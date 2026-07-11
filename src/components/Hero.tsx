'use client';
import { useLocale, useTranslations } from 'next-intl';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  name: string;
  heroImage: string;
}

// All entrance animations here are CSS (see globals.css) so the name and
// scroll cue are visible from first paint, not gated on JS hydration.
export default function Hero({ name, heroImage }: HeroProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  // The Greek name is longer and denser, so it needs calmer scale and tighter rhythm.
  const nameClasses =
    locale === 'el'
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl tracking-normal leading-[1.02]'
      : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none';

  return (
    /* svh keeps the bottom-anchored content above mobile browser chrome */
    <section className="relative h-svh w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={name}
          fill
          priority
          className="object-cover object-[50%_30%] saturate-[0.6]"
          sizes="100vw"
        />
        {/* Heavy treatment: candid concert shot needs strong scrims to recede */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-[var(--color-bg-primary)]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/60 via-transparent to-[var(--color-bg-primary)]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,transparent_25%,var(--color-bg-primary)_95%)]" />
      </div>

      {/* Content — anchored to the darker lower-left negative space, off the subject */}
      <div className="relative h-full flex flex-col items-start justify-end pb-28 md:pb-36 px-6 lg:px-12">
        <div className="anim-fade-up [animation-delay:300ms] [animation-duration:1s] text-left max-w-3xl">
          {/* Decorative line above */}
          <div className="anim-grow-x [animation-delay:500ms] w-16 h-px bg-[var(--color-accent)] mb-8" />

          {/* Name */}
          <h1
            className={`font-[family-name:var(--font-display)] font-light text-[var(--color-text-primary)] mb-4 ${nameClasses}`}
          >
            {name}
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-fade-in [animation-delay:1.5s] absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="scroll-bob flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">{t('scroll')}</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}
