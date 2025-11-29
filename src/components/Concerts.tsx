'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Concert } from '@/lib/types';

interface ConcertsProps {
  concerts: Concert[];
}

export default function Concerts({ concerts }: ConcertsProps) {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const upcomingConcerts = concerts.filter(c => c.isUpcoming);
  const pastConcerts = concerts.filter(c => !c.isUpcoming);

  const scroll = (direction: 'left' | 'right', container: HTMLDivElement | null) => {
    if (!container) return;
    const scrollAmount = 400;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="concerts" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="px-6 lg:px-12 mb-12"
        >
          <div className="flex items-center gap-6">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)]">
              Concerts
            </h2>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
        </motion.div>

        {/* Upcoming Concerts */}
        {upcomingConcerts.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-6 lg:px-12 mb-6 flex items-center justify-between"
            >
              <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--color-accent)]">
                Upcoming
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left', scrollRef.current)}
                  className="p-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll('right', scrollRef.current)}
                  className="p-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>

            {/* Horizontal Scroll Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-container px-6 lg:px-12 pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {upcomingConcerts.map((concert, index) => (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ConcertCard concert={concert} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Concerts */}
        {pastConcerts.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-6 lg:px-12 mb-6 text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)]"
            >
              Past Performances
            </motion.h3>

            <div className="flex gap-6 overflow-x-auto scroll-container px-6 lg:px-12 pb-4">
              {pastConcerts.map((concert, index) => (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + 0.1 * index }}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ConcertCard concert={concert} isPast />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ConcertCard({ concert, isPast = false }: { concert: Concert; isPast?: boolean }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const typeColors: Record<Concert['type'], string> = {
    Opera: 'bg-rose-500/20 text-rose-400',
    Symphony: 'bg-blue-500/20 text-blue-400',
    Ballet: 'bg-purple-500/20 text-purple-400',
    Chamber: 'bg-emerald-500/20 text-emerald-400',
    Contemporary: 'bg-amber-500/20 text-amber-400',
    Recording: 'bg-cyan-500/20 text-cyan-400',
  };

  return (
    <div
      className={`flex-shrink-0 w-80 rounded-xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] card-shine group transition-all duration-500 hover:border-[var(--color-border)] ${
        isPast ? 'opacity-70 hover:opacity-100' : ''
      }`}
    >
      {/* Organization Logo Area */}
      <div className="h-32 bg-[var(--color-bg-secondary)] flex items-center justify-center p-6 relative overflow-hidden">
        {concert.organizationLogo ? (
          <Image
            src={concert.organizationLogo}
            alt={concert.organization}
            width={160}
            height={80}
            className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <span className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-muted)] text-center">
            {concert.organization}
          </span>
        )}
        
        {/* Type Badge */}
        <span
          className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full ${typeColors[concert.type]}`}
        >
          {concert.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-primary)] mb-2 line-clamp-2">
          {concert.title}
        </h4>
        
        <p className="text-sm text-[var(--color-accent)] mb-4">
          {concert.organization}
        </p>

        {concert.description && (
          <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3">
            {concert.description}
          </p>
        )}

        <div className="flex flex-col gap-2 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(concert.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="line-clamp-1">{concert.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
