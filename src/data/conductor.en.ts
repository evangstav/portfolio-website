import { ConductorData } from '@/lib/types';

export const conductorDataEn: ConductorData = {
  name: "Vaggelis Stavropoulos",
  tagline: "Conductor",

  heroImage: "/images/hero-conducting.jpg",

  biographyShort: `Greek conductor, pianist, composer and music educator based in Athens, with experience across symphonic, operatic and contemporary repertoire.`,

  biography: `Vaggelis Stavropoulos is a Greek conductor, pianist, composer and music educator based in Athens. His conducting experience through concerts and masterclasses includes collaborations with the Prague Philharmonia Orchestra, the Berlin Sinfonietta, the Bucharest Symphony Orchestra, the Philharmonia Orchestra of Athens, the Symphony Orchestra of Ionian Islands alongside the Municipal Choir of Corfu “San Giacomo”, the Ionian Camerata, and the Symphony Orchestra of Ionian University, performing works by major composers such as L.V. Beethoven, F. Schubert, J. Brahms, W.A. Mozart, I. Stravinsky, N. Skalkottas and more.

He has also led opera and contemporary music projects, including the Greek premiere of Dan Shore’s one-act opera “The Beautiful Bridegroom”. In September 2023, he undertook the coordination and musical direction of the Ionian Conservatory String Ensemble, giving numerous concerts across Corfu.

Alongside his work as a conductor, Vaggelis is an experienced piano player and accompanist. Active as a piano teacher since 2016, he has taught at the Ionian Conservatory, the Music School of Corfu, and through private instruction. He has participated in numerous performances and collaborations, ranging from chamber music concerts featuring classical repertoire and contemporary Greek compositions to educational and cultural productions with the Greek National Opera.

In February 2026, he founded and assumed the artistic direction of the musical ensemble Rève Renaissants, which specializes in presenting original transcriptions and arrangements of works from the international repertoire.`,

  contactEmail: "stavropoulos.vls@gmail.com",

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
};
