# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server on http://localhost:3000
- `npm run build` — production build (also the main type/route check)
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (`eslint-config-next`, flat config in `eslint.config.mjs`)

There is no test suite configured.

## Architecture

This is a single-conductor portfolio site built on **Next.js 16 (App Router)** with **next-intl** for i18n. The site is fully internationalized for English (`en`) and Greek (`el`).

### Routing and i18n flow

- All user-facing routes live under `src/app/[locale]/...` (`/`, `/media`). The root `src/app/layout.tsx` is intentionally a passthrough — the real `<html>`, `<body>`, and `NextIntlClientProvider` are in `src/app/[locale]/layout.tsx`.
- `src/proxy.ts` wires up the next-intl middleware (Next 16 renamed `middleware.ts` → `proxy.ts`; don't move it back) with `localePrefix: 'always'` (defined in `src/i18n/routing.ts`), so `/` redirects to `/en` and every URL is locale-prefixed. The matcher only includes `/` and `/(en|el)/:path*`.
- `src/i18n.ts` is the request config: it loads UI strings from `messages/{locale}.json` for the active locale.
- Adding a new locale requires updating **all** of: `routing.ts` (locales array), the `proxy.ts` matcher, `messages/{locale}.json`, `src/data/conductor.{locale}.ts`, and the `'en' | 'el'` unions in `src/lib/useConductorData.ts` and `src/app/[locale]/layout.tsx`.

### Two layers of translatable content

1. **UI strings** — `messages/en.json` and `messages/el.json`, accessed in client components via `useTranslations('namespace')`.
2. **Conductor content** (bio, videos, gallery, contact) — typed by `ConductorData` in `src/lib/types.ts`, with one file per locale: `src/data/conductor.en.ts` and `src/data/conductor.el.ts`. `src/data/conductor.ts` aggregates them into `conductorDataByLocale`.
3. The `useConductorData()` hook (`src/lib/useConductorData.ts`) reads `useLocale()` and returns the matching dataset. Page components call this and pass slices as props to presentation components — components themselves are content-agnostic and only know the shape of their props.

When changing any displayed text, update both the `en` and `el` variants of whichever layer it belongs to.

### Navigation and locale switching

- Internal links use plain `next/link` with manually locale-prefixed hrefs (e.g. `` href={`/${locale}${link.href}`} `` in `src/components/Navigation.tsx`) — the `next-intl/navigation` wrappers are not used.
- `src/components/LanguageSwitcher.tsx` uses `next/navigation` and manually rewrites the first path segment to switch locales. If you change `localePrefix` or add nested locale-aware routing, revisit this — the slice-from-segment-1 logic assumes the locale is always the first segment.

### Components and styling

- Most components under `src/components/` are client components (`'use client'`) — they use `framer-motion` for animations and `useTranslations` for labels. Server components are limited to layouts and metadata.
- Styling is **Tailwind CSS v4** (`@tailwindcss/postcss`) with design tokens defined as CSS custom properties in `src/app/globals.css` (e.g. `--color-accent`, `--font-display`). Components reference tokens via `var(--color-accent)` rather than Tailwind theme keys.
- `next.config.ts` enables `dangerouslyAllowSVG` for the `next/image` pipeline — still required because `LanguageSwitcher` renders the SVG flag icons through `next/image`.
- Sections render from data: the homepage Videos section returns `null` while `videos` is empty, and Contact hides its "Follow" block while `socialLinks` has no non-email entries. To light them up, add data — don't touch the components.

### Gotchas

- `*:Zone.Identifier` Windows-download artifacts are gitignored — don't commit new ones if they appear in the working tree (WSL creates them for downloaded files).
- The contact form only logs to console; there is no backend integration yet.
