'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const locale = useLocale();
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Already on the homepage: navigating to the same route is a no-op, so
  // close the menu (if open) and scroll back to the top instead.
  const handleHomeClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: `/#about`, label: t('about') },
    { href: `/media`, label: t('media') },
    { href: `/#contact`, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes the mobile menu; lock background scroll while it is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Over the hero the header is transparent: a scrim + brighter links keep it legible
  const linkColor = isScrolled ? 'text-[var(--color-text-secondary)]' : 'text-white/90';

  return (
    <>
      {/* Slide-down runs in CSS so the header shows without waiting for hydration.
          transition-colors (not -all) keeps backdrop-filter from animating for
          500ms right while the user is scrolling past the threshold. */}
      <header
        className={`anim-slide-down fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled
            ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md max-md:backdrop-blur-none max-md:bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border-subtle)]'
            : 'bg-gradient-to-b from-black/60 to-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Home link */}
            <Link
              href={`/${locale}`}
              onClick={handleHomeClick}
              className={`font-[family-name:var(--font-display)] text-2xl tracking-wide hover:text-[var(--color-accent)] transition-colors duration-300 ${
                isScrolled ? 'text-[var(--color-text-primary)]' : 'text-white'
              }`}
            >
              {t('home')}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={`text-sm tracking-wider uppercase hover:text-[var(--color-accent)] transition-colors duration-300 ${linkColor}`}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher onDark={!isScrolled} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 hover:text-[var(--color-accent)] transition-colors ${linkColor}`}
              aria-label={t('menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}${link.href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <LanguageSwitcher />
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
