'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  { code: 'en', label: 'EN', ariaLabel: 'Switch to English' },
  { code: 'el', label: 'ΕΛ', ariaLabel: 'Αλλαγή στα Ελληνικά' },
];

// onDark: rendered over the transparent header on the hero photo, where the
// nav links are also brightened — follow the same scheme instead of tokens.
export default function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one, keeping any #hash
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = pathWithoutLocale ? `/${newLocale}/${pathWithoutLocale}` : `/${newLocale}`;
    router.push(`${newPath}${window.location.hash}`);
  };

  const inactiveColor = onDark
    ? 'text-white/90 hover:text-white'
    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]';
  const dividerColor = onDark ? 'text-white/30' : 'text-[var(--color-border)]';

  return (
    <div className="flex items-center">
      {locales.map((l, index) => (
        <span key={l.code} className="flex items-center">
          {index > 0 && <span className={`${dividerColor} mx-1`}>|</span>}
          <button
            onClick={() => switchLocale(l.code)}
            className={`min-h-11 min-w-11 px-2 text-sm tracking-wider transition-colors duration-300 ${
              locale === l.code
                ? 'text-[var(--color-accent)] border-b border-[var(--color-accent)]'
                : inactiveColor
            }`}
            aria-label={l.ariaLabel}
            aria-current={locale === l.code ? 'true' : undefined}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
