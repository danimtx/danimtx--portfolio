import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { BrandLogo } from './BrandLogo';

const SECTIONS = ['hero', 'experiencia', 'servicios', 'proyectos', 'icpc', 'proceso'];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const { lang, setLang, cvUrl } = useLanguage();
  const t = translations[lang].nav;

  // Dynamic Apple-grade Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 180; // Offset from top to trigger section transition

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = SECTIONS[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.home },
    { id: 'experiencia', label: t.experience },
    { id: 'servicios', label: t.services },
    { id: 'proyectos', label: t.projects },
    { id: 'icpc', label: t.icpc },
    { id: 'proceso', label: t.process },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-10 py-4 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand with Stealth Cat Monogram Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#101010] text-[#D4F014] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#D4F014]/50 shadow-sm border border-white/10">
            <BrandLogo className="w-5 h-5" variant="stealth" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-tight text-[#111111] group-hover:text-black">
              danimtx
            </span>
            <span className="text-[10px] text-[#6E6E73] font-medium leading-none">
              {t.role}
            </span>
          </div>
        </a>

        {/* Center Floating Pill Navigation with Dynamic Active Color Indicator */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-sm text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D4F014] text-black shadow-xs font-bold'
                    : 'text-[#6E6E73] hover:text-black hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls: Language Toggle, CV & Let's Talk */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-white border border-neutral-200 shadow-2xs text-[11px] font-bold">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#101010] text-[#D4F014] shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'es'
                  ? 'bg-[#101010] text-[#D4F014] shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
              title="Español"
            >
              ES
            </button>
          </div>

          {/* Dynamic CV Download Button */}
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-all shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t.cv}</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contacto"
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 text-xs font-semibold text-neutral-900 transition-all shadow-2xs group"
          >
            <span>{t.talk}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full bg-white border border-neutral-200 text-neutral-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white border border-neutral-200 shadow-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Idioma / Language</span>
            </span>
            <div className="flex items-center p-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all ${
                  lang === 'en' ? 'bg-[#101010] text-[#D4F014]' : 'text-neutral-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 rounded-full transition-all ${
                  lang === 'es' ? 'bg-[#101010] text-[#D4F014]' : 'text-neutral-600'
                }`}
              >
                ES
              </button>
            </div>
          </div>

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#D4F014] text-black'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.cv}</span>
          </a>
        </div>
      )}
    </header>
  );
};
