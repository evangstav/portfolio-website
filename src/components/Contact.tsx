'use client';
import { useTranslations } from 'next-intl';

import { useActionState } from 'react';
import { Mail, Instagram, Youtube, Facebook, Linkedin, Twitter } from 'lucide-react';
import { SocialLink } from '@/lib/types';
import { sendContactEmail, type ContactFormState } from '@/lib/contactAction';

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

// Entrance animations are CSS (globals.css) so the section is visible pre-hydration.
export default function Contact({ email, socialLinks }: ContactProps) {
  const t = useTranslations();

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        {/* Section Header */}
        <div className="anim-fade-up mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text-primary)] mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
            {t('contact.description')}
          </p>
          <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mt-6" />
        </div>

        {/* Contact form */}
        <div className="anim-fade-up [animation-delay:200ms]">
          <ContactForm />
        </div>

        {/* Direct email fallback */}
        <div className="anim-fade-in [animation-delay:300ms] mt-10 flex flex-col items-center gap-2">
          <span className="text-sm text-[var(--color-text-muted)]">
            {t('contact.form.orEmail')}
          </span>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors break-all"
          >
            <Mail size={20} />
            {email}
          </a>
        </div>

        {/* Social Links */}
        {socialLinks.some(link => link.platform !== 'email') && (
          <div className="anim-fade-in [animation-delay:400ms] mt-14">
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
          </div>
        )}
      </div>
    </section>
  );
}

const inputClasses =
  'w-full rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors';

function ContactForm() {
  const t = useTranslations('contact.form');
  const initialState: ContactFormState = { status: 'idle' };
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  if (state.status === 'success') {
    return (
      <p
        role="status"
        className="max-w-xl mx-auto rounded-lg border border-[var(--color-accent)] px-6 py-5 text-[var(--color-text-primary)]"
      >
        {t('success')}
      </p>
    );
  }

  const values = state.status === 'error' ? state.values : undefined;

  return (
    <form action={formAction} className="max-w-xl mx-auto text-left space-y-4">
      {/* Honeypot — hidden from real users, catches naive bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs tracking-wider uppercase text-[var(--color-text-muted)] mb-2">
            {t('name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={200}
            defaultValue={values?.name}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs tracking-wider uppercase text-[var(--color-text-muted)] mb-2">
            {t('email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={320}
            defaultValue={values?.email}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs tracking-wider uppercase text-[var(--color-text-muted)] mb-2">
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          defaultValue={values?.message}
          className={`${inputClasses} resize-y`}
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="text-sm text-[var(--color-accent)]">
          {state.code === 'invalid' ? t('errorInvalid') : t('errorUnavailable')}
        </p>
      )}

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-medium tracking-wide hover:bg-[var(--color-accent-hover)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Mail size={20} />
          {isPending ? t('sending') : t('send')}
        </button>
      </div>
    </form>
  );
}
