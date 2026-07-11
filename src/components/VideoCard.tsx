'use client';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { Video } from '@/lib/types';

// Single source of truth for the video card treatment — used by the homepage
// Videos section and the /media gallery so radius/padding cannot drift.
export default function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  const t = useTranslations('media');
  return (
    <button
      onClick={onClick}
      aria-label={`${t('playVideo')}: ${video.title}`}
      className="group relative w-full aspect-video rounded-lg overflow-hidden bg-[var(--color-bg-card)] card-shine"
    >
      {/* Thumbnail (decorative — the button carries the accessible name) */}
      <Image
        src={video.thumbnailUrl}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-500 group-hover:bg-[var(--color-accent)]">
          <Play size={28} className="text-[var(--color-bg-primary)] ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-white mb-1">
          {video.title}
        </h3>
        {video.subtitle && (
          <p className="text-sm text-white/70">{video.subtitle}</p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs text-white/50">
          {video.duration && <span>{video.duration}</span>}
          {video.ensemble && (
            <>
              <span>•</span>
              <span>{video.ensemble}</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
