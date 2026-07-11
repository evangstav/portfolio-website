import Link from 'next/link';
import './globals.css';
import { cormorant, notoSerifGreek, outfit } from '@/lib/fonts';

// Root 404 boundary: renders outside the [locale] layout (which is a passthrough),
// so it must provide its own <html>/<body>. Bilingual since the locale is unknown
// here — Greek segments carry lang="el" and the Greek-capable serif, since
// Cormorant has no Greek subset.
const greekDisplay = 'font-[family-name:var(--font-noto-serif-greek)]';

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${notoSerifGreek.variable}`}
    >
      <body className="antialiased">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--color-bg-primary)]">
          <p className="font-[family-name:var(--font-display)] text-7xl text-[var(--color-accent)] mb-6">
            404
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-text-primary)] mb-3">
            Page not found ·{' '}
            <span lang="el" className={greekDisplay}>
              Η σελίδα δεν βρέθηκε
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-10 max-w-md">
            The page you are looking for does not exist. ·{' '}
            <span lang="el">Η σελίδα που αναζητάτε δεν υπάρχει.</span>
          </p>
          <div className="flex gap-4">
            <Link
              href="/en"
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              English
            </Link>
            <Link
              href="/el"
              lang="el"
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              Ελληνικά
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
