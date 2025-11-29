'use client';
import { useTranslations } from 'next-intl';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AboutProps {
  biography: string;
}

export default function About({ biography }: AboutProps) {
  const t = useTranslations('sections');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split biography into paragraphs
  const paragraphs = biography.split('\n\n').filter(p => p.trim());

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)]">
              About
            </h2>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
        </motion.div>

        {/* Biography Content */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] font-light"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 w-24 h-px bg-[var(--color-accent)] mx-auto"
        />
      </div>
    </section>
  );
}
