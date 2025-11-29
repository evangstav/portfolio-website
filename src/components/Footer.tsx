'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import { SocialLink } from '@/lib/types';

interface FooterProps {
  conductorName: string;
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

export default function Footer({ conductorName, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name / Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text-secondary)]"
          >
            {conductorName}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4"
          >
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
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    aria-label={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-[var(--color-text-muted)]"
          >
            © {currentYear} {conductorName}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
