import { ConductorData } from '@/lib/types';

export const conductorDataEn: ConductorData = {
  name: "Vaggelis Stavropoulos",
  tagline: "Conductor",

  heroImage: "/images/hero-conducting.jpg",

  biographyShort: `Greek conductor, pianist, composer and music educator based in Athens, with experience across symphonic, operatic and contemporary repertoire.`,

  biography: `Vaggelis Stavropoulos is a Greek conductor, pianist, composer and music educator based in Athens. His conducting experience through concerts and masterclasses includes collaborations with the Prague Philharmonia Orchestra, the Berlin Sinfonietta, the Bucharest Symphony Orchestra, the Philharmonia Orchestra of Athens, the Symphony Orchestra of Ionian Islands alongside the Municipal Choir of Corfu “San Giacomo”, the Ionian Camerata, and the Symphony Orchestra of Ionian University, performing works by major composers such as L.V. Beethoven, F. Schubert, J. Brahms, W.A. Mozart, I. Stravinsky, N. Skalkottas and more.

He has also led opera and contemporary music projects, including the Greek premiere of Dan Shore’s one-act opera “The Beautiful Bridegroom”. In September 2023, he undertook the coordination and musical direction of the Ionian Conservatory String Ensemble, giving numerous concerts across Corfu.

Alongside his work as a conductor, Vaggelis is an experienced piano player and accompanist. Active as a piano teacher since 2016, he has taught at the Ionian Conservatory, the Music School of Corfu, and through private instruction. He has participated in numerous performances and collaborations, ranging from chamber music concerts and contemporary Greek compositions to educational and cultural productions with the Greek National Opera.

He holds a Bachelor’s Degree in Orchestra Conducting from the Department of Music Studies of the Ionian University and a Piano Diploma from the International Art Center & Conservatory Athenaeum.`,

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
    },
    {
      id: 'piano-color',
      src: '/images/piano-color.jpg',
      alt: 'Vaggelis Stavropoulos at the piano',
      caption: 'At the piano',
    },
    {
      id: 'piano-bw',
      src: '/images/piano-bw.jpg',
      alt: 'Vaggelis Stavropoulos at the piano, black and white portrait',
      caption: 'At the piano',
    },
    {
      id: 'portrait-studio',
      src: '/images/portrait-studio.jpg',
      alt: 'Studio portrait of Vaggelis Stavropoulos',
      caption: 'Studio portrait',
    },
  ],
};
