import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { StealthCat3D } from './StealthCat3D';

export const Hero: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section id="hero" className="w-full px-3.5 sm:px-6 lg:px-10 pt-2 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-[#101010] text-white overflow-hidden shadow-2xl border border-white/5 min-h-[520px] sm:min-h-[620px] flex flex-col justify-between p-5 sm:p-10 lg:p-14">
          
          {/* Top Bar inside Card: Greeting & Floating Tech Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <span className="text-[#D4F014] text-xs font-bold tracking-wider">Hey 👋</span>
              <span className="text-neutral-200 text-xs font-semibold">danimtx</span>
            </div>

            {/* Floating Glass Pill: Stack Overview with responsive touch scroll */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-xs max-w-full overflow-x-auto no-scrollbar">
              <span className="text-neutral-400 font-semibold tracking-wider uppercase text-[9px] sm:text-[10px] mr-1 shrink-0">
                {t.stackLabel}
              </span>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-1.5 shrink-0">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">.NET 10 (C#)</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-[#D4F014] font-medium text-[10.5px] sm:text-[11px] apple-press">Azure Cloud & DevOps</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">Docker</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">PostgreSQL / PostGIS</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">React Native (Expo)</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">React / Angular</span>
              </div>
            </div>
          </div>

          {/* Main Grid: Copy Left & Stealth Brand Centerpiece Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto pt-4 sm:pt-6 pb-4 z-10">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 max-w-2xl">
              <div className="space-y-2.5 sm:space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                  {t.title1} <br />
                  <span className="text-[#D4F014]">{t.title2}</span>
                </h1>
                <p className="text-xs sm:text-base text-neutral-300/90 max-w-xl font-normal leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Action Buttons with Apple Press Feedback */}
              <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#D4F014] text-black font-bold text-xs sm:text-sm hover:bg-[#bce00e] hover:shadow-lg hover:shadow-[#D4F014]/20 transition-all duration-200 group apple-press"
                >
                  <span>{t.ctaWork}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all duration-200 apple-press"
                >
                  <span>{t.ctaProjects}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Layer 3D Stealth Cat Sculpture */}
            <StealthCat3D lang={lang} />

          </div>

          {/* Bottom Row: Metrics Strip */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 z-10">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.metric1Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric1Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4F014] tracking-tight">{t.metric2Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric2Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.metric3Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric3Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4F014] tracking-tight">{t.metric4Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric4Label}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
