export interface Concert {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  type: 'Opera' | 'Symphony' | 'Ballet' | 'Chamber' | 'Contemporary' | 'Recording';
  date: string;
  venue: string;
  description?: string;
  programme?: string[];
  isUpcoming: boolean;
}

export interface Video {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
  ensemble?: string;
  category?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category?: 'Performance' | 'Rehearsal' | 'Portrait' | 'Event' | 'Other';
}

export interface BiographySection {
  title: string;
  content: string;
  image?: string;
}

export interface PressQuote {
  quote: string;
  source: string;
  year?: string;
}

export interface Affiliation {
  id: string;
  name: string;
  role: string;
  logoUrl?: string;
  url?: string;
}

export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'linkedin' | 'email';
  url: string;
}

export interface ConductorData {
  name: string;
  tagline?: string;
  heroImage: string;
  biography: string;
  biographyShort: string;
  biographySections?: BiographySection[];
  pressQuotes?: PressQuote[];
  concerts: Concert[];
  videos: Video[];
  gallery?: GalleryImage[];
  affiliations: Affiliation[];
  socialLinks: SocialLink[];
  contactEmail: string;
}
