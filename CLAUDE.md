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
- Fonts load via `next/font` in `src/app/[locale]/layout.tsx`, exposed as `--font-cormorant`/`--font-outfit` and consumed through `--font-display`/`--font-body` in `globals.css`. Don't reintroduce Google Fonts CSS imports.
- Sections render from data: the homepage Videos section returns `null` while `videos` is empty, and Contact hides its "Follow" block while `socialLinks` has no non-email entries. To light them up, add data — don't touch the components.
- The `[locale]` layout validates the locale and calls `notFound()` for anything else — unknown paths land on the root `src/app/not-found.tsx`, which provides its own `<html>`/`<body>` (the root layout is a passthrough). Keep that invariant when touching layouts.

### Gotchas

- `*:Zone.Identifier` Windows-download artifacts are gitignored — don't commit new ones if they appear in the working tree (WSL creates them for downloaded files).
- The contact form sends via Resend through the `sendContactEmail` server action (`src/lib/contactAction.ts`). It needs `RESEND_API_KEY` (see `.env.example`); without it the form reports an honest "could not be sent" error and points at the mailto fallback. An earlier form was removed for faking success with no backend — never reintroduce a success state that isn't backed by actual delivery.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:970c3bf2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   bd dolt push
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->
