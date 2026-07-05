'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Videos from '@/components/Videos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useConductorData } from '@/lib/useConductorData';

export default function Home() {
  const conductorData = useConductorData();

  return (
    <>
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <Navigation conductorName={conductorData.name} />

      <main>
        <Hero
          name={conductorData.name}
          tagline={conductorData.tagline}
          heroImage={conductorData.heroImage}
        />

        <About
          biography={conductorData.biography}
          portraitImage="/images/piano-bw.jpg"
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
