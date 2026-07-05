# Evangelos Stavropoulos — Conductor Portfolio

Portfolio website for conductor Evangelos Stavropoulos. Dark theme with gold accents, built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, and next-intl (English / Greek).

## Pages

- **/{locale}** — Hero, About, Videos (shown once videos exist), Contact
- **/{locale}/media** — photo gallery and videos, with category filtering and lightbox

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

Deployed on Vercel; pushes to `main` deploy automatically.

## Not yet wired up

- The contact form only logs to the console (integrate Resend/Formspree to make it send).
- Full biography text and social media links are pending.
