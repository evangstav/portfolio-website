import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Videos from '@/components/Videos';
import Concerts from '@/components/Concerts';
import Affiliations from '@/components/Affiliations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { conductorData } from '@/data/conductor';

export default function Home() {
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
        
        <About biography={conductorData.biography} />
        
        <Videos videos={conductorData.videos} />
        
        <Concerts concerts={conductorData.concerts} />
        
        <Affiliations affiliations={conductorData.affiliations} />
        
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
