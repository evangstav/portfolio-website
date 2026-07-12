# Real content: replace placeholder site with truthful content

**Date:** 2026-07-05 · **Status:** implemented; details updated same day (see "Current state")

## Goal

The site was a template full of invented content (fake concerts, fake orchestras,
fake press quotes, placeholder images). Make it a truthful portfolio for
Vaggelis Stavropoulos using the four real photos provided in `data/`, with a
single YouTube video to be added when the URL is provided.

## Decisions (user-confirmed)

- **Hero image:** the live conducting shot (`hero-conducting.jpg`).
- **Fake content:** deleted entirely — code, data, and assets. Not hidden, not kept.
- **Biography:** skipped for now; About shows the existing one-line summary only.
- **Contact email:** real address in the data files; fake social links removed.

## Current state (supersedes anything below that conflicts; updated 2026-07-12)

Implemented in PRs #3–#9 on 2026-07-05, then evolved through PRs #11–#22:

- **Name:** Vaggelis Stavropoulos / Βαγγέλης Σταυρόπουλος (renamed from
  "Evangelos" in PR #9; favicon monogram is "VS").
- **Contact email:** `vagstav97@hotmail.com` (always read the current value from
  `src/data/conductor.{en,el}.ts`).
- **Biography:** full real bio (EN + EL) landed in PR #18 — the "one-liner"
  below is history.
- **Video:** one entry exists (YouTube `HBpDGP7ak2M`, youtube-nocookie embed),
  so the homepage Videos section is visible and the media page defaults to the
  Videos tab.
- **Social links:** the YouTube channel (`@vaggelisstavropoulos`) is live in
  Follow/footer.
- **Contact:** a real Resend-backed form (`sendContactEmail` server action,
  PRs #18/#19) with honest failure states and a mailto fallback — the fake form
  referenced below stayed dead; this one actually delivers.
- **Domain:** live at `https://vaggelisstavropoulos.com` with
  `NEXT_PUBLIC_SITE_URL` set on Vercel (2026-07-12).

Do not reintroduce old name/email/no-video/no-bio assumptions from the
sections above or below.

## Resulting site (as of the original implementation)

- **Homepage:** Hero (conducting shot) → About (one-liner + B&W piano portrait)
  → Videos → Contact → Footer.
- **Media page:** kept; photo gallery of the 4 real photos.
- **Deleted:** `/biography` page, Concerts and Affiliations components/sections,
  press quotes, all placeholder images/logos/thumbnails, unused default Next.js
  SVGs, downloads dir. Types (`Concert`, `Affiliation`, `PressQuote`,
  `BiographySection`) and message namespaces removed with them.
- **Images:** `data/*.jpg` copied to `public/images/` as `hero-conducting.jpg`,
  `portrait-studio.jpg`, `piano-color.jpg`, `piano-bw.jpg`.

## Still pending (as of 2026-07-12)

- Real upcoming/recent performances section once real engagements exist.
- Additional social media profiles beyond YouTube.
- A dedicated concert photo for the gallery (the "In concert" entry reuses the
  hero image).
