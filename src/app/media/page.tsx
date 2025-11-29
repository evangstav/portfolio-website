'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play, X, ArrowLeft, ChevronLeft, ChevronRight, Camera, Video as VideoIcon } from 'lucide-react';
import { conductorData } from '@/data/conductor';
import { Video, GalleryImage } from '@/lib/types';

type MediaTab = 'videos' | 'photos';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<MediaTab>('videos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [videoFilter, setVideoFilter] = useState<string>('all');
  const [photoFilter, setPhotoFilter] = useState<string>('all');

  // Get unique categories
  const videoCategories = ['all', ...new Set(conductorData.videos.map(v => v.category).filter((c): c is string => Boolean(c)))];
  const photoCategories: string[] = ['all', ...new Set((conductorData.gallery || []).map(p => p.category).filter((c): c is NonNullable<typeof c> => Boolean(c)))];

  // Filter items
  const filteredVideos = videoFilter === 'all'
    ? conductorData.videos
    : conductorData.videos.filter(v => v.category === videoFilter);

  const filteredPhotos = photoFilter === 'all'
    ? (conductorData.gallery || [])
    : (conductorData.gallery || []).filter(p => p.category === photoFilter);

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (selectedImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      : (selectedImageIndex + 1) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[newIndex]);
    setSelectedImageIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wider uppercase">Back</span>
          </Link>
          
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            {conductorData.name}
          </Link>
          
          <div className="w-20" />
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-text-primary)] mb-4">
              Media
            </h1>
            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto" />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              <VideoIcon size={18} />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              <Camera size={18} />
              Photos
            </button>
          </motion.div>

          {/* Videos Section */}
          <AnimatePresence mode="wait">
            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Video Filters */}
                {videoCategories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {videoCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setVideoFilter(category)}
                        className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                          videoFilter === category
                            ? 'bg-[var(--color-bg-card)] text-[var(--color-accent)] border border-[var(--color-accent)]'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 * index }}
                    >
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="group relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--color-bg-card)] card-shine"
                      >
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-500 group-hover:bg-[var(--color-accent)]">
                            <Play size={28} className="text-[var(--color-bg-primary)] ml-1" fill="currentColor" />
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
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
                    </motion.div>
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[var(--color-text-muted)]">No videos in this category.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Photos Section */}
            {activeTab === 'photos' && (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Photo Filters */}
                {photoCategories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {photoCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setPhotoFilter(category)}
                        className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                          photoFilter === category
                            ? 'bg-[var(--color-bg-card)] text-[var(--color-accent)] border border-[var(--color-accent)]'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* Photo Grid - Masonry-like layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {filteredPhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.05 * index }}
                      className="break-inside-avoid"
                    >
                      <button
                        onClick={() => openImage(photo, index)}
                        className="group relative w-full rounded-xl overflow-hidden bg-[var(--color-bg-card)]"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                          <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            {photo.caption && (
                              <p className="text-white text-sm">{photo.caption}</p>
                            )}
                            {photo.category && (
                              <span className="inline-block mt-2 text-xs text-white/60 uppercase tracking-wider">
                                {photo.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                {filteredPhotos.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[var(--color-text-muted)]">No photos in this category.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="absolute inset-0 bg-black/95" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <X size={28} />
              </button>

              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.subtitle && (
                  <p className="text-[var(--color-text-secondary)] mt-1">{selectedVideo.subtitle}</p>
                )}
                {selectedVideo.ensemble && (
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">{selectedVideo.ensemble}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute inset-0 bg-black/95" />

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Navigation buttons */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                  className="absolute left-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                  className="absolute right-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-6xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />

              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <p className="text-white text-center">{selectedImage.caption}</p>
                </div>
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedImageIndex + 1} / {filteredPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {conductorData.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
