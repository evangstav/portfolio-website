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

## Current state (supersedes anything below that conflicts)

Implemented in PRs #3–#9 on 2026-07-05, then evolved the same day:

- **Name:** Vaggelis Stavropoulos / Βαγγέλης Σταυρόπουλος (renamed from
  "Evangelos" in PR #9; favicon monogram is "VS").
- **Contact email:** `vagstav97@hotmail.com` (PR #6 set a gmail address; PR #6's
  successor commit replaced it — always read the current value from
  `src/data/conductor.{en,el}.ts`).
- **Video:** one entry exists (YouTube `HBpDGP7ak2M`, youtube-nocookie embed),
  so the homepage Videos section is visible and the media page defaults to the
  Videos tab.
- **Social links:** the YouTube channel (`@vaggelisstavropoulos`) is live in
  Follow/footer.
- **Contact:** the fake form was removed in the review-fix pass (PR #5);
  Contact is a mailto-first CTA.

Do not reintroduce old name/email/no-video assumptions from the sections above.

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

## Still pending

- Real biography text (EN + EL) — then consider restoring a `/biography` page.
- Real upcoming/recent performances section once real engagements exist.
- Contact form backend (Formspree/Resend) only if mailto proves insufficient.
- `NEXT_PUBLIC_SITE_URL` env var on Vercel once a custom domain exists.
