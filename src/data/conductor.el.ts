import { ConductorData } from '@/lib/types';

export const conductorDataEl: ConductorData = {
  name: "Βαγγέλης Σταυρόπουλος",
  tagline: "Μαέστρος",

  heroImage: "/images/hero-conducting.jpg",

  biographyShort: `Ένας παθιασμένος μαέστρος με εμπειρία σε συμφωνικό, λυρικό και σύγχρονο ρεπερτόριο. Διακρίνεται για τις δυναμικές του ερμηνείες και τη συνεργατική του προσέγγιση στη μουσική δημιουργία.`,

  biography: `Ένας παθιασμένος μαέστρος με εμπειρία σε συμφωνικό, λυρικό και σύγχρονο ρεπερτόριο. Διακρίνεται για τις δυναμικές του ερμηνείες και τη συνεργατική του προσέγγιση στη μουσική δημιουργία.`,

  contactEmail: "vagstav97@hotmail.com",

  socialLinks: [
    { platform: 'youtube', url: 'https://www.youtube.com/@vaggelisstavropoulos' },
  ],

  // Βίντεο - YouTube embed URLs (https://www.youtube-nocookie.com/embed/VIDEO_ID)
  videos: [
    {
      id: 'concert-rehearsal-compilation',
      title: 'Στιγμιότυπα από Συναυλίες και Πρόβες',
      thumbnailUrl: 'https://i.ytimg.com/vi/HBpDGP7ak2M/hqdefault.jpg',
      videoUrl: 'https://www.youtube-nocookie.com/embed/HBpDGP7ak2M',
    },
  ],

  gallery: [
    {
      id: 'conducting-live',
      src: '/images/hero-conducting.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος διευθύνει σε συναυλία',
      caption: 'Σε συναυλία',
      category: 'Εμφανίσεις',
    },
    {
      id: 'piano-color',
      src: '/images/piano-color.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος στο πιάνο',
      caption: 'Στο πιάνο',
      category: 'Πορτρέτα',
    },
    {
      id: 'piano-bw',
      src: '/images/piano-bw.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος στο πιάνο, ασπρόμαυρο πορτρέτο',
      caption: 'Στο πιάνο',
      category: 'Πορτρέτα',
    },
    {
      id: 'portrait-studio',
      src: '/images/portrait-studio.jpg',
      alt: 'Πορτρέτο στούντιο του Βαγγέλη Σταυρόπουλου',
      caption: 'Πορτρέτο στούντιο',
      category: 'Πορτρέτα',
    },
  ],
};
