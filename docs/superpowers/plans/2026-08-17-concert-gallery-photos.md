# Concert Gallery Photos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add all six supplied concert photographs to the existing four-photo Media gallery with faithful aspect ratios, bilingual descriptions, and web-sized assets.

**Architecture:** Extend `GalleryImage` with intrinsic dimensions so the data layer remains the source of truth for image presentation. Render the photo gallery as responsive CSS columns with naturally sized `next/image` elements while preserving the existing filtering and lightbox behavior. Store optimized JPEG derivatives under `public/images/`; never modify the source files in Downloads.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, next-intl, next/image, Tailwind CSS 4, ImageMagick.

## Global Constraints

- Keep all four existing gallery images and add all six supplied concert photographs.
- Do not change the homepage or replace its hero image.
- Do not invent event, venue, ensemble, or date details.
- Do not remove photographer watermarks.
- Preserve the existing lightbox, previous/next navigation, keyboard handling, filtering, and responsive behavior.
- Do not modify the supplied source files in Downloads.
- Do not commit or push without separate authorization.

---

### Task 1: Create optimized concert image assets

**Files:**
- Create: `public/images/concert-church-orchestra-wide.jpg`
- Create: `public/images/conducting-profile-black-white.jpg`
- Create: `public/images/conducting-orchestra-black-white.jpg`
- Create: `public/images/orchestra-curtain-call.jpg`
- Create: `public/images/conducting-chamber-orchestra-black-white.jpg`
- Create: `public/images/conducting-choir-orchestra.jpg`

**Interfaces:**
- Consumes: the six user-supplied JPEG files under `C:/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/`.
- Produces: six orientation-normalized, metadata-stripped JPEGs no larger than 2400 pixels on either axis for `next/image` and the gallery data.

- [ ] **Step 1: Record source dimensions and sizes**

Run:

```bash
identify -format '%f %wx%h %[orientation] %b\n' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/image00240.jpeg' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/IMG_20230620_212408.jpg' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/IMG_20230620_232605.jpg' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2309.jpg' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2375.jpg' \
  '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2483.jpg'
```

Expected: six readable JPEGs with dimensions `3797x2848`, `947x998`, `1259x756`, `6048x4024`, `3597x5027`, and `5830x3879` respectively.

- [ ] **Step 2: Create the web derivatives**

Run each source through ImageMagick with EXIF orientation applied, metadata removed, a 2400-pixel bounding box, and JPEG quality 84:

```bash
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/image00240.jpeg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/concert-church-orchestra-wide.jpg
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/IMG_20230620_212408.jpg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/conducting-profile-black-white.jpg
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/IMG_20230620_232605.jpg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/conducting-orchestra-black-white.jpg
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2309.jpg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/orchestra-curtain-call.jpg
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2375.jpg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/conducting-chamber-orchestra-black-white.jpg
convert '/mnt/c/Users/estavrop/Downloads/wetransfer_foto-gia-aggelo_2026-08-17_0930/foto gia aggelo/VAS_2483.jpg' -auto-orient -strip -resize '2400x2400>' -quality 84 public/images/conducting-choir-orchestra.jpg
```

Expected: six new JPEG files; the three VAS derivatives are much smaller than their 11–16 MB sources.

- [ ] **Step 3: Verify derivative dimensions, orientation, and size**

Run:

```bash
identify -format '%f %wx%h %[orientation] %b\n' public/images/concert-church-orchestra-wide.jpg public/images/conducting-profile-black-white.jpg public/images/conducting-orchestra-black-white.jpg public/images/orchestra-curtain-call.jpg public/images/conducting-chamber-orchestra-black-white.jpg public/images/conducting-choir-orchestra.jpg
```

Expected dimensions in order: `2400x1800`, `947x998`, `1259x756`, approximately `2400x1597`, approximately `1717x2400`, and approximately `2400x1597`. No output dimension exceeds 2400 pixels and each orientation is `Undefined` or `TopLeft`.

---

### Task 2: Add intrinsic dimensions and bilingual gallery entries

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/data/conductor.en.ts`
- Modify: `src/data/conductor.el.ts`

**Interfaces:**
- Consumes: the six asset paths and dimensions produced by Task 1.
- Produces: `GalleryImage.width: number` and `GalleryImage.height: number`, plus matching ten-entry English and Greek gallery arrays.

- [ ] **Step 1: Make intrinsic dimensions part of the gallery contract**

Change `GalleryImage` in `src/lib/types.ts` to:

```ts
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  category?: string;
}
```

- [ ] **Step 2: Add dimensions and the six English entries**

Update every existing entry in `src/data/conductor.en.ts` with its real dimensions and insert the new photos into the sequence. Use these entries exactly:

```ts
gallery: [
  {
    id: 'conducting-live',
    src: '/images/hero-conducting.jpg',
    alt: 'Vaggelis Stavropoulos conducting in concert',
    width: 2000,
    height: 1500,
    caption: 'In concert',
  },
  {
    id: 'conducting-profile-black-white',
    src: '/images/conducting-profile-black-white.jpg',
    alt: 'Vaggelis Stavropoulos conducting an orchestra, black and white',
    width: 947,
    height: 998,
  },
  {
    id: 'conducting-orchestra-black-white',
    src: '/images/conducting-orchestra-black-white.jpg',
    alt: 'Vaggelis Stavropoulos conducting an orchestra on stage, black and white',
    width: 1259,
    height: 756,
  },
  {
    id: 'piano-color',
    src: '/images/piano-color.jpg',
    alt: 'Vaggelis Stavropoulos at the piano',
    width: 1920,
    height: 1281,
    caption: 'At the piano',
  },
  {
    id: 'concert-church-orchestra-wide',
    src: '/images/concert-church-orchestra-wide.jpg',
    alt: 'Vaggelis Stavropoulos conducting an orchestra in a church',
    width: 2400,
    height: 1800,
  },
  {
    id: 'conducting-chamber-orchestra-black-white',
    src: '/images/conducting-chamber-orchestra-black-white.jpg',
    alt: 'Vaggelis Stavropoulos conducting a chamber orchestra, black and white',
    width: 1717,
    height: 2400,
  },
  {
    id: 'piano-bw',
    src: '/images/piano-bw.jpg',
    alt: 'Vaggelis Stavropoulos at the piano, black and white portrait',
    width: 1536,
    height: 1920,
    caption: 'At the piano',
  },
  {
    id: 'orchestra-curtain-call',
    src: '/images/orchestra-curtain-call.jpg',
    alt: 'Orchestra musicians on stage after a concert',
    width: 2400,
    height: 1597,
  },
  {
    id: 'conducting-choir-orchestra',
    src: '/images/conducting-choir-orchestra.jpg',
    alt: 'Vaggelis Stavropoulos conducting an orchestra and choir in concert',
    width: 2400,
    height: 1597,
  },
  {
    id: 'portrait-studio-suit',
    src: '/images/portrait-studio-suit.jpg',
    alt: 'Studio portrait of Vaggelis Stavropoulos in a black suit',
    width: 1153,
    height: 1536,
    caption: 'Studio portrait',
  },
],
```

- [ ] **Step 3: Mirror the same entries with Greek alternative descriptions**

Use the same IDs, paths, dimensions, order, and existing captions in `src/data/conductor.el.ts`. Translate the six new alternative descriptions as follows:

```ts
'Ο Βαγγέλης Σταυρόπουλος διευθύνει ορχήστρα, ασπρόμαυρη φωτογραφία'
'Ο Βαγγέλης Σταυρόπουλος διευθύνει ορχήστρα στη σκηνή, ασπρόμαυρη φωτογραφία'
'Ο Βαγγέλης Σταυρόπουλος διευθύνει ορχήστρα σε εκκλησία'
'Ο Βαγγέλης Σταυρόπουλος διευθύνει ορχήστρα δωματίου, ασπρόμαυρη φωτογραφία'
'Μουσικοί ορχήστρας στη σκηνή μετά από συναυλία'
'Ο Βαγγέλης Σταυρόπουλος διευθύνει ορχήστρα και χορωδία σε συναυλία'
```

- [ ] **Step 4: Run the production type check**

Run: `npm run build`

Expected before Task 3: the data satisfies the stricter interface. Any remaining failure must identify a missed `GalleryImage` construction outside the two conductor data files.

---

### Task 3: Render the adaptive gallery and verify the complete change

**Files:**
- Modify: `src/app/[locale]/media/MediaGallery.tsx`
- Verify: `src/app/[locale]/media/page.tsx`
- Verify: `src/app/image-sitemap.xml/route.ts`

**Interfaces:**
- Consumes: `GalleryImage.width` and `GalleryImage.height` from Task 2.
- Produces: a responsive one-, two-, and three-column gallery that retains each photo's natural aspect ratio and keeps the current lightbox behavior.

- [ ] **Step 1: Replace the fixed-crop photo grid with adaptive columns**

Replace the current photo grid with:

```tsx
{/* Photo gallery — natural aspect ratios preserve wide concert scenes. */}
<div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
  {filteredPhotos.map((photo, index) => (
    <div
      key={photo.id}
      className="anim-fade-in mb-6 break-inside-avoid"
      style={{ animationDelay: `${50 * index}ms` }}
    >
      <button
        onClick={() => openImage(photo, index)}
        className="group relative block w-full rounded-lg overflow-hidden bg-[var(--color-bg-card)]"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </button>
    </div>
  ))}
</div>
```

- [ ] **Step 2: Use intrinsic dimensions in the lightbox**

Change the lightbox `Image` dimensions from hard-coded `1200` and `800` to:

```tsx
width={selectedImage.width}
height={selectedImage.height}
```

Keep `className="max-h-[85vh] w-auto object-contain rounded-lg mx-auto"` unchanged.

- [ ] **Step 3: Confirm every localized data entry resolves to a real file**

Run:

```bash
node -e "const fs=require('fs'); for (const f of ['src/data/conductor.en.ts','src/data/conductor.el.ts']) { const s=fs.readFileSync(f,'utf8'); const paths=[...s.matchAll(/src: '([^']+)'/g)].map(m=>m[1]); if(paths.length!==10) throw new Error(f+': expected 10 images, found '+paths.length); for(const p of paths) if(!fs.existsSync('public'+p)) throw new Error(f+': missing '+p); console.log(f+': 10/10 images found'); }"
```

Expected:

```text
src/data/conductor.en.ts: 10/10 images found
src/data/conductor.el.ts: 10/10 images found
```

- [ ] **Step 4: Run static quality gates**

Run: `npm run lint && npm run build`

Expected: ESLint exits with no errors and the Next.js production build completes successfully.

- [ ] **Step 5: Inspect responsive gallery behavior**

Start the site with `npm run dev`, open `/en/media`, select Photos, and inspect widths near 390 px, 768 px, and 1440 px. Expected: one, two, and three columns respectively; all ten thumbnails retain their natural proportions; no horizontal overflow; every thumbnail opens the correct full image; arrow buttons and keyboard arrows traverse all ten images; Escape closes the lightbox.

- [ ] **Step 6: Inspect the Greek gallery and machine-readable image list**

Open `/el/media`, select Photos, and confirm the same ten images and Greek alternative descriptions. Fetch `/image-sitemap.xml` and confirm all ten gallery URLs appear without broken or duplicate new paths.

- [ ] **Step 7: Review the final diff and status without committing**

Run:

```bash
git diff --check
git status --short
git diff -- src/lib/types.ts src/data/conductor.en.ts src/data/conductor.el.ts 'src/app/[locale]/media/MediaGallery.tsx'
```

Expected: no whitespace errors; only the approved specification, plan, six image assets, type/data changes, and adaptive gallery changes are present.
