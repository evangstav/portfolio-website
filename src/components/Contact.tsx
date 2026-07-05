'use client';
import { useTranslations } from 'next-intl';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Instagram, Youtube, Facebook, Linkedin, Twitter } from 'lucide-react';
import { SocialLink } from '@/lib/types';

interface ContactProps {
  email: string;
  socialLinks: SocialLink[];
}

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export default function Contact({ email, socialLinks }: ContactProps) {
  const t = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            {t('contact.description')}
          </p>
          <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mt-6" />
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-medium tracking-wide hover:bg-[var(--color-accent-hover)] transition-colors duration-300"
          >
            <Mail size={20} />
            {t('contact.cta')}
          </a>
          <a
            href={`mailto:${email}`}
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors break-all"
          >
            {email}
          </a>
        </motion.div>

        {/* Social Links */}
        {socialLinks.some(link => link.platform !== 'email') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14"
          >
            <h3 className="text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
              {t('contact.follow')}
            </h3>
            <div className="flex justify-center gap-4">
              {socialLinks
                .filter(link => link.platform !== 'email')
                .map((link) => {
                  const Icon = socialIcons[link.platform];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
                      aria-label={link.platform}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
