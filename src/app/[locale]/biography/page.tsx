'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Quote, Download } from 'lucide-react';
import { useConductorData } from '@/lib/useConductorData';

export default function BiographyPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const locale = useLocale();
  const t = useTranslations();
  const conductorData = useConductorData();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wider uppercase">{t('navigation.back')}</span>
          </Link>
          
          <Link
            href={`/${locale}`}
            className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            {conductorData.name}
          </Link>
          
          <div className="w-20" />
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <Image
            src={conductorData.heroImage}
            alt={conductorData.name}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-4">
                  {t('biography.title')}
                </h1>
                <div className="w-20 h-px bg-[var(--color-accent)]" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl leading-relaxed text-[var(--color-text-secondary)] font-light font-[family-name:var(--font-display)] italic"
            >
              {conductorData.biographyShort}
            </motion.p>
          </div>
        </section>

        {/* Biography Sections */}
        {conductorData.biographySections && conductorData.biographySections.length > 0 && (
          <section className="pb-24">
            {conductorData.biographySections.map((section, index) => (
              <BiographySection
                key={index}
                section={section}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </section>
        )}

        {/* Press Quotes */}
        {conductorData.pressQuotes && conductorData.pressQuotes.length > 0 && (
          <section className="py-24 bg-[var(--color-bg-secondary)]">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4">
                  {t('sections.press')}
                </h2>
                <div className="w-16 h-px bg-[var(--color-accent)] mx-auto" />
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conductorData.pressQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative p-8 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border-subtle)]"
                  >
                    <Quote
                      size={32}
                      className="absolute top-6 left-6 text-[var(--color-accent)] opacity-30"
                    />
                    <blockquote className="relative z-10 pt-8">
                      <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text-primary)] italic mb-4">
                        &ldquo;{quote.quote}&rdquo;
                      </p>
                      <footer className="text-sm text-[var(--color-text-muted)]">
                        <cite className="not-italic">
                          {quote.source}
                          {quote.year && <span className="ml-2">({quote.year})</span>}
                        </cite>
                      </footer>
                    </blockquote>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Download Bio Section */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-text-primary)] mb-6">
                {t('biography.downloadHeading')}
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                {t('biography.downloadDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/downloads/biography.pdf"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
                >
                  <Download size={20} />
                  {t('biography.downloadBio')}
                </a>
                <a
                  href="/downloads/press-photos.zip"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Download size={20} />
                  {t('biography.downloadPhotos')}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {conductorData.name}. {t('common.allRightsReserved')}.
          </p>
        </div>
      </footer>
    </div>
  );
}

function BiographySection({
  section,
  index,
  isReversed,
}: {
  section: { title: string; content: string; image?: string };
  index: number;
  isReversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const paragraphs = section.content.split('\n\n').filter(p => p.trim());

  return (
    <div
      ref={ref}
      className={`py-16 px-6 lg:px-12 ${index % 2 === 0 ? '' : 'bg-[var(--color-bg-secondary)]/50'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            isReversed ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={isReversed ? 'lg:col-start-2' : ''}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-text-primary)] mb-6">
              {section.title}
            </h2>
            <div className="w-12 h-px bg-[var(--color-accent)] mb-8" />
            <div className="space-y-4">
              {paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-[var(--color-text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          {section.image && (
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative aspect-[4/5] rounded-xl overflow-hidden ${
                isReversed ? 'lg:col-start-1' : ''
              }`}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/30 to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
