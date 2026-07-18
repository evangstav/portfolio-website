'use client';

import { useState, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Camera, Video as VideoIcon } from 'lucide-react';
import { useConductorData } from '@/lib/useConductorData';
import { Video, GalleryImage } from '@/lib/types';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { useModalA11y } from '@/lib/useModalA11y';

type MediaTab = 'videos' | 'photos';

export default function MediaGallery() {
  const locale = useLocale();
  const t = useTranslations();
  const conductorData = useConductorData();
  const [activeTab, setActiveTab] = useState<MediaTab>(
    conductorData.videos.length > 0 ? 'videos' : 'photos'
  );
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

  const filteredPhotos = useMemo(() => {
    const gallery = conductorData.gallery || [];
    return photoFilter === 'all' ? gallery : gallery.filter(p => p.category === photoFilter);
  }, [conductorData.gallery, photoFilter]);

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setSelectedImageIndex((current) => {
      const newIndex = direction === 'prev'
        ? (current - 1 + filteredPhotos.length) % filteredPhotos.length
        : (current + 1) % filteredPhotos.length;
      setSelectedImage(filteredPhotos[newIndex]);
      return newIndex;
    });
  }, [filteredPhotos]);

  const filterLabel = (category: string) => (category === 'all' ? t('media.all') : category);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      {/* Blur off on mobile: re-blurring the strip over a scrolling image grid
          costs every frame on phones; a nearly-opaque background reads the same */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/90 backdrop-blur-md max-md:backdrop-blur-none max-md:bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wider uppercase">{t('navigation.back')}</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/#contact`}
              className="text-sm tracking-wider uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              {t('navigation.contact')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main id="main-content" className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Title — CSS entrance so it is visible pre-hydration */}
          <div className="anim-fade-up text-center mb-12">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-[var(--color-text-primary)] mb-4">
              {t('media.title')}
            </h1>
            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto" />
          </div>

          {/* Tab Navigation */}
          <div className="anim-fade-up [animation-delay:200ms] flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                  : 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              }`}
            >
              <VideoIcon size={18} />
              {t('media.videos')}
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
              {t('media.photos')}
            </button>
          </div>

          {/* Videos Section */}
          <AnimatePresence mode="wait">
            {activeTab === 'videos' && (
              <m.div
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
                        {filterLabel(category)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Video Grid — a lone video gets a centered feature card */}
                <div
                  className={
                    filteredVideos.length === 1
                      ? 'flex justify-center'
                      : `grid grid-cols-1 md:grid-cols-2 ${filteredVideos.length >= 3 ? 'lg:grid-cols-3' : ''} gap-8`
                  }
                >
                  {filteredVideos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`anim-fade-up ${filteredVideos.length === 1 ? 'w-full max-w-2xl' : ''}`}
                      style={{ animationDelay: `${50 * index}ms` }}
                    >
                      <VideoCard video={video} onClick={() => setSelectedVideo(video)} />
                    </div>
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[var(--color-text-muted)]">{t('media.noVideos')}</p>
                  </div>
                )}
              </m.div>
            )}

            {/* Photos Section */}
            {activeTab === 'photos' && (
              <m.div
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
                        {filterLabel(category)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Photo Grid — aligned gallery wall for a small curated set */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="anim-fade-in"
                      style={{ animationDelay: `${50 * index}ms` }}
                    >
                      <button
                        onClick={() => openImage(photo, index)}
                        className="group relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[var(--color-bg-card)]"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                      </button>
                    </div>
                  ))}
                </div>

                {filteredPhotos.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[var(--color-text-muted)]">{t('media.noPhotos')}</p>
                  </div>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <MediaDialog label={selectedVideo.title} onClose={() => setSelectedVideo(null)}>
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
          </MediaDialog>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <MediaDialog
            label={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
            onArrow={filteredPhotos.length > 1 ? navigateImage : undefined}
          >
            {/* Navigation buttons — inside the frame on small viewports (pushed
                fully outside they were untappable on phones/tablets), outside
                only when the viewport has room */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                  className="absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white transition-colors left-2 bg-black/50 hover:bg-black/70 min-[1160px]:left-0 min-[1160px]:-translate-x-full min-[1160px]:bg-white/10 min-[1160px]:hover:bg-white/20"
                  aria-label={t('media.previousImage')}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                  className="absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full text-white transition-colors right-2 bg-black/50 hover:bg-black/70 min-[1160px]:right-0 min-[1160px]:translate-x-full min-[1160px]:bg-white/10 min-[1160px]:hover:bg-white/20"
                  aria-label={t('media.nextImage')}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto object-contain rounded-lg mx-auto"
            />

            <div className="dialog-counter absolute left-1/2 -translate-x-1/2 z-20 text-white/80 text-sm">
              {selectedImageIndex + 1} / {filteredPhotos.length}
            </div>
          </MediaDialog>
        )}
      </AnimatePresence>

      <Footer
        conductorName={conductorData.name}
        socialLinks={conductorData.socialLinks}
      />
    </div>
  );
}

// Shared accessible dialog shell: Escape closes, optional arrow-key navigation,
// Tab is trapped inside, focus returns to the trigger on close.
function MediaDialog({
  label,
  onClose,
  onArrow,
  children,
}: {
  label: string;
  onClose: () => void;
  onArrow?: (direction: 'prev' | 'next') => void;
  children: React.ReactNode;
}) {
  const t = useTranslations('media');
  const { containerRef, initialFocusRef } = useModalA11y({ onClose, onArrow });

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
      aria-label={label}
    >
      <div className="absolute inset-0 bg-black/95" />

      <m.div
        ref={containerRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* .dialog-close keeps the button inside the frame on viewports too
            small for the above-frame offset to stay on screen */}
        <button
          ref={initialFocusRef}
          onClick={onClose}
          className="dialog-close absolute z-20 p-2 text-white/60 hover:text-white transition-colors"
          aria-label={t('close')}
        >
          <X size={28} />
        </button>

        {children}
      </m.div>
    </m.div>
  );
}
