import { ConductorData } from '@/lib/types';

export const conductorDataEn: ConductorData = {
  name: "Vaggelis Stavropoulos",
  tagline: "Conductor",

  heroImage: "/images/hero-conducting.jpg",

  biographyShort: `A passionate conductor with experience across symphonic, operatic, and contemporary repertoire. Known for dynamic interpretations and a collaborative approach to music-making.`,

  biography: `A passionate conductor with experience across symphonic, operatic, and contemporary repertoire. Known for dynamic interpretations and a collaborative approach to music-making.`,

  contactEmail: "vagstav97@hotmail.com",

  socialLinks: [
    { platform: 'youtube', url: 'https://www.youtube.com/@vaggelisstavropoulos' },
  ],

  // Videos - YouTube embed URLs (https://www.youtube-nocookie.com/embed/VIDEO_ID)
  videos: [
    {
      id: 'concert-rehearsal-compilation',
      title: 'Concert and Rehearsal Compilation',
      thumbnailUrl: 'https://i.ytimg.com/vi/HBpDGP7ak2M/hqdefault.jpg',
      videoUrl: 'https://www.youtube-nocookie.com/embed/HBpDGP7ak2M',
    },
  ],

  gallery: [
    {
      id: 'conducting-live',
      src: '/images/hero-conducting.jpg',
      alt: 'Vaggelis Stavropoulos conducting in concert',
      caption: 'In concert',
      category: 'Performance',
    },
    {
      id: 'piano-color',
      src: '/images/piano-color.jpg',
      alt: 'Vaggelis Stavropoulos at the piano',
      caption: 'At the piano',
      category: 'Portrait',
    },
    {
      id: 'piano-bw',
      src: '/images/piano-bw.jpg',
      alt: 'Vaggelis Stavropoulos at the piano, black and white portrait',
      caption: 'At the piano',
      category: 'Portrait',
    },
    {
      id: 'portrait-studio',
      src: '/images/portrait-studio.jpg',
      alt: 'Studio portrait of Vaggelis Stavropoulos',
      caption: 'Studio portrait',
      category: 'Portrait',
    },
  ],
};
