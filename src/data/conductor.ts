import { ConductorData } from '@/lib/types';

// ============================================================
// CUSTOMIZE THIS FILE WITH YOUR COUSIN'S INFORMATION
// ============================================================

export const conductorData: ConductorData = {
  name: "Evangelos Stavropoulos",
  tagline: "Conductor",

  heroImage: "/images/hero.jpg",

  biographyShort: `A passionate conductor with experience across symphonic, operatic, and contemporary repertoire. Known for dynamic interpretations and collaborative approach to music-making.`,

  biography: `Add a comprehensive biography here. This should include educational background, major achievements, notable performances, awards, and artistic philosophy.

Include information about training and education, major orchestras and ensembles conducted, awards and competition results, artistic vision and approach, and notable collaborations.

This text supports multiple paragraphs.`,

  // Extended biography sections for the full biography page
  biographySections: [
    {
      title: "Early Life & Education",
      content: `Describe early musical training, formative experiences, and educational background here. Include conservatory studies, important teachers and mentors, and early musical influences.
      
This section can span multiple paragraphs to provide rich detail about the conductor's formative years and the path that led them to conducting.`,
      image: "/images/bio-education.jpg",
    },
    {
      title: "Career Highlights",
      content: `Detail major career milestones, breakthrough performances, and significant appointments. Include information about debut performances with major orchestras, competition wins, and important collaborations.

Highlight any recordings, premieres of new works, or particularly memorable performances that have shaped the conductor's career trajectory.`,
      image: "/images/bio-career.jpg",
    },
    {
      title: "Artistic Vision",
      content: `Share the conductor's artistic philosophy, approach to interpretation, and musical values. What drives their work? How do they approach different repertoire?

This section gives insight into the artistic personality and helps audiences and presenters understand what makes this conductor unique.`,
    },
    {
      title: "Current & Future",
      content: `Outline current positions, ongoing projects, and future engagements. What's on the horizon? Any exciting upcoming debuts or collaborations?

Keep this section updated with the latest news and upcoming highlights.`,
      image: "/images/bio-current.jpg",
    },
  ],

  // Press quotes for biography page
  pressQuotes: [
    {
      quote: "A conductor of remarkable sensitivity and precision...",
      source: "Classical Music Magazine",
      year: "2024",
    },
    {
      quote: "Electrifying performances that captivate audiences...",
      source: "The Arts Review",
      year: "2024",
    },
    {
      quote: "One of the most promising conductors of their generation...",
      source: "Symphony Weekly",
      year: "2023",
    },
  ],

  contactEmail: "contact@example.com",

  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/' },
    { platform: 'youtube', url: 'https://youtube.com/' },
    { platform: 'facebook', url: 'https://facebook.com/' },
    { platform: 'linkedin', url: 'https://linkedin.com/' },
    { platform: 'email', url: 'mailto:contact@example.com' },
  ],

  // Videos - supports YouTube embeds and self-hosted
  videos: [
    {
      id: '1',
      title: 'Symphony No. 5',
      subtitle: 'Beethoven',
      thumbnailUrl: '/images/video-thumb-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '32:15',
      ensemble: 'National Symphony Orchestra',
      category: 'Symphony',
    },
    {
      id: '2',
      title: 'Piano Concerto No. 2',
      subtitle: 'Rachmaninoff',
      thumbnailUrl: '/images/video-thumb-2.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '35:42',
      ensemble: 'City Philharmonic',
      category: 'Concerto',
    },
    {
      id: '3',
      title: 'The Rite of Spring',
      subtitle: 'Stravinsky',
      thumbnailUrl: '/images/video-thumb-3.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '33:10',
      ensemble: 'Contemporary Music Ensemble',
      category: 'Contemporary',
    },
  ],

  // Photo gallery for media page
  gallery: [
    {
      id: '1',
      src: '/images/gallery/performance-1.jpg',
      alt: 'Conducting at the National Opera',
      caption: 'National Opera, Season Opening 2024',
      category: 'Performance',
    },
    {
      id: '2',
      src: '/images/gallery/performance-2.jpg',
      alt: 'Symphony concert',
      caption: 'City Symphony Orchestra',
      category: 'Performance',
    },
    {
      id: '3',
      src: '/images/gallery/rehearsal-1.jpg',
      alt: 'Rehearsal session',
      caption: 'Rehearsing with the Philharmonic',
      category: 'Rehearsal',
    },
    {
      id: '4',
      src: '/images/gallery/portrait-1.jpg',
      alt: 'Portrait',
      caption: 'Photo by Studio Name',
      category: 'Portrait',
    },
    {
      id: '5',
      src: '/images/gallery/performance-3.jpg',
      alt: 'Opera performance',
      caption: 'La Bohème, Greek National Opera',
      category: 'Performance',
    },
    {
      id: '6',
      src: '/images/gallery/portrait-2.jpg',
      alt: 'Conductor portrait',
      caption: 'Official portrait 2024',
      category: 'Portrait',
    },
  ],

  // Concerts & Events
  concerts: [
    {
      id: '1',
      title: 'Season Opening Gala',
      organization: 'National Opera',
      organizationLogo: '/images/logos/opera-logo.png',
      type: 'Opera',
      date: '2025-09-15',
      venue: 'Grand Opera House',
      description: 'Opening the new season with a spectacular gala featuring highlights from beloved operas.',
      isUpcoming: true,
    },
    {
      id: '2',
      title: 'Mahler Symphony No. 2',
      organization: 'City Symphony Orchestra',
      organizationLogo: '/images/logos/symphony-logo.png',
      type: 'Symphony',
      date: '2025-10-20',
      venue: 'Concert Hall',
      description: 'Resurrection Symphony with full chorus and soloists.',
      programme: ['Mahler - Symphony No. 2 "Resurrection"'],
      isUpcoming: true,
    },
    {
      id: '3',
      title: 'Contemporary Premieres',
      organization: 'New Music Ensemble',
      organizationLogo: '/images/logos/ensemble-logo.png',
      type: 'Contemporary',
      date: '2025-11-05',
      venue: 'Modern Arts Center',
      description: 'World premieres of works by emerging composers.',
      isUpcoming: true,
    },
    {
      id: '4',
      title: 'La Bohème',
      organization: 'National Opera',
      organizationLogo: '/images/logos/opera-logo.png',
      type: 'Opera',
      date: '2025-03-14',
      venue: 'Opera House Main Stage',
      description: 'Puccini\'s beloved masterpiece in a new production.',
      isUpcoming: false,
    },
    {
      id: '5',
      title: 'Beethoven Cycle Part I',
      organization: 'Philharmonic Orchestra',
      organizationLogo: '/images/logos/philharmonic-logo.png',
      type: 'Symphony',
      date: '2025-01-20',
      venue: 'Philharmonic Hall',
      description: 'Symphonies 1, 2, and 3 "Eroica"',
      programme: [
        'Beethoven - Symphony No. 1',
        'Beethoven - Symphony No. 2',
        'Beethoven - Symphony No. 3 "Eroica"',
      ],
      isUpcoming: false,
    },
    {
      id: '6',
      title: 'Ballet Gala Evening',
      organization: 'National Ballet',
      organizationLogo: '/images/logos/ballet-logo.png',
      type: 'Ballet',
      date: '2024-12-15',
      venue: 'State Theater',
      description: 'An evening of classical and contemporary ballet.',
      isUpcoming: false,
    },
  ],

  // Affiliations & Organizations
  affiliations: [
    {
      id: '1',
      name: 'National Opera',
      role: 'Principal Guest Conductor',
      logoUrl: '/images/logos/opera-logo.png',
      url: 'https://example.com',
    },
    {
      id: '2',
      name: 'City Symphony Orchestra',
      role: 'Music Director',
      logoUrl: '/images/logos/symphony-logo.png',
      url: 'https://example.com',
    },
    {
      id: '3',
      name: 'Contemporary Music Ensemble',
      role: 'Artistic Advisor',
      logoUrl: '/images/logos/ensemble-logo.png',
      url: 'https://example.com',
    },
  ],
};

export default conductorData;
