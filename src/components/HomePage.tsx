'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Videos from '@/components/Videos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useConductorData } from '@/lib/useConductorData';

interface HomePageProps {
  heroImage?: string;
  heroImagePosition?: string;
  homepagePath?: string;
}

export default function HomePage({
  heroImage,
  heroImagePosition,
  homepagePath,
}: HomePageProps) {
  const conductorData = useConductorData();

  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <Navigation homepagePath={homepagePath} />

      <main id="main-content">
        <Hero
          name={conductorData.name}
          heroImage={heroImage ?? conductorData.heroImage}
          imagePosition={heroImagePosition}
          imageClassName={heroImage ? undefined : 'hero-image-original'}
        />

        <About
          biography={conductorData.biography}
          portraitImage="/images/portrait-studio-seated.jpg"
          portraitAlt={conductorData.name}
        />

        <Videos videos={conductorData.videos} />

        <Contact
          email={conductorData.contactEmail}
          socialLinks={conductorData.socialLinks}
        />
      </main>

      <Footer
        conductorName={conductorData.name}
        socialLinks={conductorData.socialLinks}
      />
    </>
  );
}
