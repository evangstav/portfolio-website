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
  category?: string;
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
  videos: Video[];
  gallery: GalleryImage[];
  socialLinks: SocialLink[];
  contactEmail: string;
}
