'use client';
import { useTranslations } from 'next-intl';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Affiliation } from '@/lib/types';

interface AffiliationsProps {
  affiliations: Affiliation[];
}

export default function Affiliations({ affiliations }: AffiliationsProps) {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (affiliations.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-secondary)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4">
            Affiliations
          </h2>
          <div className="w-16 h-px bg-[var(--color-accent)] mx-auto" />
        </motion.div>

        {/* Affiliations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliations.map((affiliation, index) => (
            <motion.div
              key={affiliation.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <AffiliationCard affiliation={affiliation} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AffiliationCard({ affiliation }: { affiliation: Affiliation }) {
  const content = (
    <div className="group p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] transition-all duration-500 h-full flex flex-col items-center text-center card-shine">
      {/* Logo */}
      <div className="w-24 h-24 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center mb-6 overflow-hidden">
        {affiliation.logoUrl ? (
          <Image
            src={affiliation.logoUrl}
            alt={affiliation.name}
            width={64}
            height={64}
            className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text-muted)]">
            {affiliation.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
        {affiliation.name}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {affiliation.role}
      </p>
    </div>
  );

  if (affiliation.url) {
    return (
      <a href={affiliation.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
