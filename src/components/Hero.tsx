'use client';
import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  name: string;
  tagline?: string;
  heroImage: string;
}

  const t = useTranslations('hero');
export default function Hero({ name, tagline, heroImage }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/60 via-transparent to-[var(--color-bg-primary)]/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Decorative line above */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-8"
          />

          {/* Name */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-[var(--color-text-primary)] mb-4">
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

          {/* Decorative line below */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-16 h-px bg-[var(--color-accent)] mx-auto mt-8"
          />
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
          className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
        >
          <span className="text-xs tracking-widest uppercase">{t('scroll')}</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
