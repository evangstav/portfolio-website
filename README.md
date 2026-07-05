# Conductor Portfolio Website

A sophisticated, dark-themed portfolio website for conductors, built with Next.js 16, TypeScript, and Tailwind CSS. Features elegant typography, smooth animations, and a professional layout inspired by top conductor websites.

## Features

- 🎭 **Hero Section** - Full-screen hero with elegant typography and scroll indicator
- 📖 **About Section** - Biography summary with animated reveal
- 📚 **Full Biography Page** - Detailed biography with sections, images, and press quotes
- 🎬 **Media Page** - Videos and photo gallery with filtering and lightbox
- 🎵 **Concerts Section** - Horizontal scrolling carousel for upcoming and past performances
- 🏛️ **Affiliations** - Grid display of orchestras and organizations
- 📧 **Contact Form** - Professional contact form with social links
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ✨ **Smooth Animations** - Powered by Framer Motion
- 🌙 **Dark Theme** - Elegant dark aesthetic with gold accents

## Pages

- **/** - Homepage with hero, about, featured videos, concerts, affiliations, contact
- **/biography** - Full biography with detailed sections, press quotes, and downloadable materials
- **/media** - Videos and photo gallery with category filtering and lightbox viewer

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Customization

### 1. Update Your Information

Edit the file `src/data/conductor.ts` with your details:

```typescript
export const conductorData: ConductorData = {
  name: "Your Name",
  tagline: "Conductor",
  heroImage: "/images/hero.jpg",
  biography: "Your biography here...",
  biographySections: [...],  // Detailed biography sections
  pressQuotes: [...],        // Press reviews
  videos: [...],             // Video content
  gallery: [...],            // Photo gallery
  concerts: [...],           // Events
  affiliations: [...],       // Organizations
  socialLinks: [...],        // Social media
  contactEmail: "...",
};
```

### 2. Add Your Images

Place your images in `/public/images/`:

**Hero & Thumbnails:**

- `hero.jpg` - Main hero image (1920x1080 or larger)
- `video-thumb-1.jpg`, `video-thumb-2.jpg`, etc. - Video thumbnails (1280x720)

**Biography Page:**

- `bio-education.jpg` - Early Life & Education section (600x750 portrait)
- `bio-career.jpg` - Career Highlights section
- `bio-current.jpg` - Current & Future section

**Gallery (in `/gallery` subfolder):**

- `performance-1.jpg`, `performance-2.jpg`, etc. - Performance photos
- `rehearsal-1.jpg` - Rehearsal photos
- `portrait-1.jpg`, `portrait-2.jpg` - Portrait photos

**Logos (in `/logos` subfolder):**

- Organization logos as PNG with transparency

**Downloads (in `/public/downloads`):**

- `biography.pdf` - Downloadable biography for press
- `press-photos.zip` - High-resolution photos for press

### 3. Configure Videos

Videos can be:

- **YouTube embeds**: Use `https://www.youtube.com/embed/VIDEO_ID`
- **Self-hosted**: Place in `/public/videos/` and use `/videos/filename.mp4`

### 4. Update Colors (Optional)

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --color-accent: #c9a962; /* Gold accent color */
  --color-bg-primary: #0a0a0b; /* Main background */
}
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── biography/
│   │   └── page.tsx         # Full biography page
│   └── media/
│       └── page.tsx         # Media gallery page
├── components/
│   ├── Navigation.tsx       # Header navigation
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # Biography section
│   ├── Videos.tsx           # Video gallery
│   ├── Concerts.tsx         # Concert carousel
│   ├── Affiliations.tsx     # Organizations grid
│   ├── Contact.tsx          # Contact form
│   └── Footer.tsx           # Site footer
├── data/
│   └── conductor.ts         # All customizable content
└── lib/
    └── types.ts             # TypeScript interfaces
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Push to GitHub
2. Import to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`

## Contact Form Setup

The contact form currently logs to console. To make it functional, integrate with:

- [Resend](https://resend.com)
- [Formspree](https://formspree.io)
- [Netlify Forms](https://www.netlify.com/products/forms/)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## License

MIT License - feel free to use for your own portfolio!

---

Built with ❤️ for classical musicians
