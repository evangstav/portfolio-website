# Real content: replace placeholder site with truthful content

**Date:** 2026-07-05 · **Status:** approved by user

## Goal

The site was a template full of invented content (fake concerts, fake orchestras,
fake press quotes, placeholder images). Make it a truthful portfolio for
Evangelos Stavropoulos using the four real photos provided in `data/`, with a
single YouTube video to be added when the URL is provided.

## Decisions (user-confirmed)

- **Hero image:** the live conducting shot (`hero-conducting.jpg`).
- **Fake content:** deleted entirely — code, data, and assets. Not hidden, not kept.
- **Biography:** skipped for now; About shows the existing one-line summary only.
- **Contact email:** `evang.stavropoulos@gmail.com`; fake social links removed
  (Follow block hidden until real profiles are provided).

## Resulting site

- **Homepage:** Hero (conducting shot) → About (one-liner + B&W piano portrait)
  → Videos (hidden while `videos: []`; appears when the YouTube video is added)
  → Contact → Footer.
- **Media page:** kept; photo gallery of the 4 real photos, defaults to the
  Photos tab while there are no videos.
- **Deleted:** `/biography` page, Concerts and Affiliations components/sections,
  press quotes, all placeholder images/logos/thumbnails, unused default Next.js
  SVGs, downloads dir. Types (`Concert`, `Affiliation`, `PressQuote`,
  `BiographySection`) and message namespaces removed with them.
- **Images:** `data/*.jpg` copied to `public/images/` as `hero-conducting.jpg`,
  `portrait-studio.jpg`, `piano-color.jpg`, `piano-bw.jpg`.
- **i18n fixes in passing:** Contact form and media tabs had hardcoded English;
  now use existing message keys. Both locales' data files carry the same real
  content.

## Later (out of scope now)

- YouTube video URL (user will provide) → one `Video` entry per locale,
  thumbnail via `https://img.youtube.com/vi/<ID>/hqdefault.jpg`.
- Real biography text (EN + EL).
- Real social profile links.
- Contact form backend (currently console-only).
