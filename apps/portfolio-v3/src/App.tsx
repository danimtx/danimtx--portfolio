import { useState, useEffect } from 'react';
import { CyberNavbar } from './components/CyberNavbar';
import { HeroSection } from './components/HeroSection';
import { TitaniumServicesBento } from './components/TitaniumServicesBento';
import { FieldProvenCarousel } from './components/FieldProvenCarousel';
import { HorizonCtaCard } from './components/HorizonCtaCard';
import { MonolithFooter } from './components/MonolithFooter';

export default function App() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const saved = localStorage.getItem('danimtx_lang');
    if (saved === 'es' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('danimtx_lang', next);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#D4D4D8] font-sans selection:bg-[#00F2FE] selection:text-[#050505] relative overflow-x-hidden">
      {/* Editorial Minimalist Navigation Header */}
      <CyberNavbar lang={lang} onToggleLang={toggleLang} />

      {/* Hero Section (3D Tunnel Particles + Monolith Headline + Stealth Holo Card) */}
      <HeroSection lang={lang} />

      {/* Architecture & Services (Curved Titanium Bento) */}
      <section id="architecture" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <TitaniumServicesBento lang={lang} />
      </section>

      {/* Proven In The Field (Sleek Horizontal Carousel) */}
      <section id="proven" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FieldProvenCarousel lang={lang} />
      </section>

      {/* Horizon Transmission Protocol */}
      <HorizonCtaCard lang={lang} />

      {/* Monolith Footer with Giant Bleeding Watermark */}
      <MonolithFooter lang={lang} />
    </div>
  );
}
