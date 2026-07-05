'use client';
import { useLocale, useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  name: string;
  tagline?: string;
  heroImage: string;
}

export default function Hero({ name, tagline, heroImage }: HeroProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  // The Greek name is much longer — tighter tracking and one size down keeps it composed
  const nameClasses =
    locale === 'el'
      ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-normal'
      : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide';

  return (
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="relative h-full flex flex-col items-start justify-end pb-28 md:pb-36 px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-left max-w-3xl"
        >
          {/* Decorative line above */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-[var(--color-accent)] mb-8 origin-left"
          />

          {/* Name */}
          <h1
            className={`font-[family-name:var(--font-display)] font-light text-[var(--color-text-primary)] mb-4 ${nameClasses}`}
          >
            {name}
          </h1>

          {/* Tagline */}
          {tagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg sm:text-xl tracking-[0.3em] uppercase text-[var(--color-accent)] font-light"
            >
              {tagline}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">{t('scroll')}</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
