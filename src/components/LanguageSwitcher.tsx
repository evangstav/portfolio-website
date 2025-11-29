'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = pathWithoutLocale ? `/${newLocale}/${pathWithoutLocale}` : `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLocale('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-300 ${
          locale === 'en'
            ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
        }`}
        aria-label="Switch to English"
      >
        <Image src="/flags/us.svg" alt="US Flag" width={20} height={14} className="rounded-sm" />
        <span className="text-sm font-medium">EN</span>
      </button>

      <span className="text-[var(--color-text-muted)]">|</span>

      <button
        onClick={() => switchLocale('el')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-300 ${
          locale === 'el'
            ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10'
            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
        }`}
        aria-label="Switch to Greek"
      >
        <Image src="/flags/gr.svg" alt="Greek Flag" width={20} height={14} className="rounded-sm" />
        <span className="text-sm font-medium">ΕΛ</span>
      </button>
    </div>
  );
}
