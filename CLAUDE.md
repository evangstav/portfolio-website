# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server on http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (`eslint-config-next`)

There is no test suite configured.

## Architecture

This is a single-conductor portfolio site built on **Next.js 16 (App Router)** with **next-intl** for i18n. The site is fully internationalized for English (`en`) and Greek (`el`).

### Routing and i18n flow

- All user-facing routes live under `src/app/[locale]/...`. The root `src/app/layout.tsx` is intentionally a passthrough — the real `<html>`, `<body>`, and `NextIntlClientProvider` are in `src/app/[locale]/layout.tsx`.
- `src/middleware.ts` wires up `next-intl` with `localePrefix: 'always'` (defined in `src/i18n/routing.ts`), so `/` redirects to `/en` and every URL is locale-prefixed. The matcher only includes `/` and `/(en|el)/:path*`.
- `src/i18n.ts` is the request config: it loads UI strings from `messages/{locale}.json` for the active locale.
- Adding a new locale requires updating **all** of: `routing.ts` (locales array), `middleware.ts` matcher, `messages/{locale}.json`, `src/data/conductor.{locale}.ts`, and the `'en' | 'el'` unions in `src/lib/useConductorData.ts` and `src/app/[locale]/layout.tsx`.

### Two layers of translatable content

1. **UI strings** — `messages/en.json` and `messages/el.json`, accessed in client components via `useTranslations('namespace')`.
2. **Conductor content** (bio, concerts, videos, gallery, press quotes, affiliations) — typed by `ConductorData` in `src/lib/types.ts`, with one file per locale: `src/data/conductor.en.ts` and `src/data/conductor.el.ts`. `src/data/conductor.ts` aggregates them into `conductorDataByLocale`.
3. The `useConductorData()` hook (`src/lib/useConductorData.ts`) reads `useLocale()` and returns the matching dataset. Page components call this and pass slices as props to presentation components — components themselves are content-agnostic and only know the shape of their props.

Greek translations are currently placeholders prefixed with `[EL]` in both `messages/el.json` and `src/data/conductor.el.ts`. See `TODO.md` for the translation checklist before shipping Greek content.

### LanguageSwitcher quirk

`src/components/LanguageSwitcher.tsx` uses `next/navigation` (not `next-intl/navigation`) and manually rewrites the first path segment to switch locales. If you change `localePrefix` or add nested locale-aware routing, revisit this — the slice-from-segment-1 logic assumes the locale is always the first segment.

### Components and styling

- Most components under `src/components/` are client components (`'use client'`) — they use `framer-motion` for animations and `useTranslations` for labels. Server components are limited to layouts and metadata.
- Styling is **Tailwind CSS v4** (`@tailwindcss/postcss`) with design tokens defined as CSS custom properties in `src/app/globals.css` (e.g. `--color-accent`, `--font-display`). Components reference tokens via `var(--color-accent)` rather than Tailwind theme keys.
- `next.config.ts` enables `dangerouslyAllowSVG` for the `next/image` pipeline so SVG placeholder assets work in dev — keep this in mind if real images replace placeholders.

### Repo housekeeping

- `*:Zone.Identifier` files scattered through the tree are Windows-download artifacts. They are checked in but harmless; ignore them and don't replicate them when creating files.
- The `additional working directory` `/Users/estav/workspace/portfolio-website` is the same project surfaced at a second mount point — edits in either location reflect in git.
