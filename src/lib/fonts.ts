import { Cormorant_Garamond, Noto_Serif, Outfit } from 'next/font/google';

// Shared between the [locale] layout and the root not-found page, which
// provides its own <html>/<body> and would otherwise render fallback fonts.

// Greek text falls back to the serif/sans stacks (neither face ships a greek subset)
// normal style only: nothing on the site sets italic, and the italic face was
// 39 KB preloaded on the critical path
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
});

// Greek display serif — Cormorant has no greek subset, so el headings use a
// steadier Greek-capable serif instead of a decorative Didot face. Includes
// 300 so font-light headings (e.g. the hero) match the Latin weight.
export const notoSerifGreek = Noto_Serif({
  subsets: ['greek', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-noto-serif-greek',
  preload: false,
});
