# Vaggelis Stavropoulos — Conductor Portfolio

Portfolio website for conductor Vaggelis Stavropoulos, live at [vaggelisstavropoulos.com](https://vaggelisstavropoulos.com). Dark theme with gold accents, built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, and next-intl (English / Greek).

## Pages

- **/{locale}** — Hero, About, Videos (shown once videos exist), Contact (Resend-backed form + mailto fallback)
- **/{locale}/media** — video and photo gallery with lightbox

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Updating content

All displayed content lives in two places, each with one file per locale (`en`, `el`):

1. **Site content** (bio, videos, gallery, contact): `src/data/conductor.en.ts` and `src/data/conductor.el.ts`
2. **UI strings** (labels, headings): `messages/en.json` and `messages/el.json`

Always update both locales. Images go in `public/images/`.

### Adding a video

Add an entry to `videos` in both data files:

```typescript
{
  id: 'unique-id',
  title: 'Work title',
  subtitle: 'Composer',
  thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',
}
```

The Videos section on the homepage appears automatically once at least one video exists.

## Deployment

Deployed on Vercel at **vaggelisstavropoulos.com**; pushes to `main` deploy automatically.

Environment variables (see `.env.example` for details):

- `RESEND_API_KEY` — contact-form delivery via Resend; without it the form reports an honest failure and points at the mailto fallback
- `RESEND_EMAIL_DOMAIN` — verified Resend sending domain (lifts Resend's own-address-only delivery limit)
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — optional delivery/sender overrides
- `NEXT_PUBLIC_SITE_URL` — canonical origin for metadata, sitemap, robots, and JSON-LD (set to the production domain)

## Pending content

- Additional social media links (only YouTube so far — feeds the Follow block and JSON-LD `sameAs`)
- A dedicated concert photo for the gallery (the "In concert" entry currently reuses the hero image)
