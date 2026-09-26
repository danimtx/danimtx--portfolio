import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface CyberNavbarProps {
  lang: 'es' | 'en';
  onToggleLang: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({ lang, onToggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEs = lang === 'es';

  const navLinks = [
    { id: 'architecture', label: isEs ? 'ARQUITECTURA' : 'ARCHITECTURE' },
    { id: 'systems', label: isEs ? 'SISTEMAS' : 'SYSTEMS' },
    { id: 'offline-gis', label: isEs ? 'GIS OFFLINE' : 'OFFLINE GIS' },
    { id: 'proven', label: isEs ? 'ICPC / PROBADO EN CAMPO' : 'ICPC / FIELD PROVEN', hasCyanMarker: true },
    { id: 'about', label: isEs ? 'ACERCA DE' : 'ABOUT' },
    { id: 'contact', label: isEs ? 'TRANSMITIR' : 'TRANSMIT' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'offline-gis' || id === 'systems') {
      const el = document.getElementById('architecture');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (id === 'about') {
      const el = document.getElementById('architecture');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cvPath = isEs ? '/cv.pdf' : '/cv_EN.pdf';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Left: Pure geometric DANIMTX */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-black text-lg tracking-[0.2em] text-white hover:text-cyan-400 transition-colors uppercase select-none"
        >
          DANIMTX
        </a>

        {/* Center: Spacious, minimal text navigation (1:1 with AFTRDRK) */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {item.hasCyanMarker && (
                <span className="w-1.5 h-1.5 bg-cyan-400 inline-block shrink-0 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions: [ DOSSIER / CV ↗ ] and [ EN / ES ] */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="font-mono text-[11px] tracking-wider px-2.5 py-1 text-zinc-400 hover:text-white transition-colors"
            title={isEs ? 'Switch to English' : 'Cambiar a Español'}
          >
            <span className={!isEs ? 'text-white font-semibold' : 'text-zinc-500'}>EN</span>
            <span className="text-zinc-600 mx-1">/</span>
            <span className={isEs ? 'text-white font-semibold' : 'text-zinc-500'}>ES</span>
          </button>

          {/* Dossier / CV Button: Clean hairline border pill */}
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-wider px-4 py-2 rounded-full border border-white/20 bg-transparent text-zinc-200 hover:text-white hover:border-white/50 hover:bg-white/[0.04] transition-all flex items-center gap-1.5"
          >
            <span>{isEs ? 'DOSSIER / CV' : 'CLAIM DOSSIER'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onToggleLang}
            className="font-mono text-xs px-2 py-1 text-cyan-400"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070709] border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 font-mono text-xs tracking-widest text-zinc-300 hover:text-cyan-400 flex items-center gap-2 border-b border-white/5"
              >
                {item.hasCyanMarker && (
                  <span className="w-1.5 h-1.5 bg-cyan-400 inline-block" />
                )}
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 flex items-center gap-3">
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-full border border-white/20 font-mono text-xs text-center text-zinc-200 hover:text-white flex items-center justify-center gap-1.5"
            >
              <span>{isEs ? 'DOSSIER / CV' : 'CLAIM DOSSIER'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
