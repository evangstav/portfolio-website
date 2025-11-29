'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { Play, X, ChevronRight } from 'lucide-react';
import { Video } from '@/lib/types';

interface VideosProps {
  videos: Video[];
}

export default function Videos({ videos }: VideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      <section id="videos" className="py-24 md:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center gap-6">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)]">
                Videos
              </h2>
              <div className="hidden sm:block h-px w-24 bg-[var(--color-border)]" />
            </div>
            <a
              href="/media"
              className="flex items-center gap-2 text-sm tracking-wider uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              View All <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
              </motion.div>
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

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full aspect-video rounded-lg overflow-hidden bg-[var(--color-bg-card)] card-shine"
    >
      {/* Thumbnail */}
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
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

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95" />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Close video"
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
      </motion.div>
    </motion.div>
  );
}
