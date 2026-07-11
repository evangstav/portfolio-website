'use client';
import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { X, ChevronRight } from 'lucide-react';
import { Video } from '@/lib/types';
import { useModalA11y } from '@/lib/useModalA11y';
import VideoCard from './VideoCard';

interface VideosProps {
  videos: Video[];
}

// Entrance animations are CSS (globals.css) so cards are visible pre-hydration.
export default function Videos({ videos }: VideosProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <section id="videos" className="py-24 md:py-32 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="anim-fade-up flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)]">
                {t('sections.videos')}
              </h2>
              <div className="hidden sm:block h-px w-24 bg-[var(--color-border)]" />
            </div>
            <Link
              href={`/${locale}/media`}
              className="flex items-center gap-2 text-sm tracking-wider uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {t('common.viewAll')} <ChevronRight size={16} />
            </Link>
          </div>

          {/* Video Grid — a lone video gets a centered feature card, not an empty grid */}
          <div
            className={
              videos.length === 1
                ? 'flex justify-center'
                : `grid grid-cols-1 md:grid-cols-2 ${videos.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6`
            }
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`anim-fade-up ${videos.length === 1 ? 'w-full max-w-2xl' : ''}`}
                style={{ animationDelay: `${100 * index}ms` }}
              >
                <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const t = useTranslations('media');
  const { containerRef, initialFocusRef } = useModalA11y({ onClose });

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" />

      {/* Modal Content */}
      <m.div
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button — .dialog-close keeps it inside the frame on viewports
            too small for the above-frame offset to stay on screen */}
        <button
          ref={initialFocusRef}
          onClick={onClose}
          className="dialog-close absolute z-20 p-2 text-white/60 hover:text-white transition-colors"
          aria-label={t('closeVideo')}
        >
          <X size={28} />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={`${video.videoUrl}?autoplay=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">
            {video.title}
          </h3>
          {video.subtitle && (
            <p className="text-[var(--color-text-secondary)] mt-1">{video.subtitle}</p>
          )}
          {video.ensemble && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2">{video.ensemble}</p>
          )}
        </div>
      </m.div>
    </m.div>
  );
}
