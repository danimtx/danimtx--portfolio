import React, { useState } from 'react';
import { Trophy, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const CompetitiveHighlight: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].icpc;
  const [activeCert, setActiveCert] = useState<'icpc' | 'ieee'>('icpc');

  // Apple Spotlight Effect on Pointer Move
  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleSpotlightTouch = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`);
  };

  return (
    <section id="icpc" className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] text-[#D4F014] text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>{t.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
              {t.title}
            </h2>
          </div>
          <p className="text-sm text-[#6E6E73] max-w-md">
            {t.description}
          </p>
        </div>

        {/* ICPC & IEEEXtreme Feature Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Editorial Achievement Card */}
          <div
            onMouseMove={handleSpotlight}
            onTouchMove={handleSpotlightTouch}
            className="apple-spotlight apple-spotlight-inner lg:col-span-7 rounded-[32px] bg-[#101010] text-white p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#D4F014] text-black font-extrabold text-xs">
                  ACM-ICPC &amp; IEEEXtreme
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  2024 &amp; 2025
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {t.headline}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {t.body}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-[#D4F014] font-bold uppercase tracking-wider">ICPC 2025 · RISE</p>
                <p className="text-base font-extrabold text-white mt-1">Top 20 Bolivia</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">Final Regional Sudamérica</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-[#D4F014] font-bold uppercase tracking-wider">IEEEXtreme 18.0</p>
                <p className="text-base font-extrabold text-white mt-1">Top 6 Bolivia</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">+19,000 Participantes</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[11px] text-[#D4F014] font-bold uppercase tracking-wider">ICPC 2024 · UAJMS</p>
                <p className="text-base font-extrabold text-white mt-1">Finalista Regional</p>
                <p className="text-[10px] text-neutral-400 mt-0.5">Sede Sudamericana</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {t.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certificates Switcher */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Interactive Certificate Card with Tabs */}
            <div
              onMouseMove={handleSpotlight}
              onTouchMove={handleSpotlightTouch}
              className="apple-spotlight apple-spotlight-inner bg-white rounded-[32px] p-6 border border-neutral-200 shadow-md space-y-4"
            >
              
              {/* Certificate Switcher Pills */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 text-xs font-bold">
                  <button
                    onClick={() => setActiveCert('icpc')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer apple-press ${
                      activeCert === 'icpc'
                        ? 'bg-[#101010] text-[#D4F014] shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    ICPC 2025
                  </button>
                  <button
                    onClick={() => setActiveCert('ieee')}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer apple-press ${
                      activeCert === 'ieee'
                        ? 'bg-[#101010] text-[#D4F014] shadow-xs'
                        : 'text-neutral-600 hover:text-black'
                    }`}
                  >
                    IEEEXtreme 18
                  </button>
                </div>

                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                  {activeCert === 'icpc' ? t.certStatus : t.certIeeeStatus}
                </span>
              </div>

              {/* Certificate Image Display with Smooth Cross-fade */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 aspect-video relative group shadow-inner">
                <div key={activeCert} className="w-full h-full animate-in fade-in duration-300">
                  {activeCert === 'icpc' ? (
                    <img
                      src="/certificados/ICPC-2025.webp"
                      alt="Official ICPC 2025 Certificate"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/certificados/ICPC-2025.jpeg';
                      }}
                    />
                  ) : (
                    <img
                      src="/certificados/ieee18.png"
                      alt="Official IEEEXtreme 18.0 Certificate"
                      className="w-full h-full object-contain object-center p-2 bg-white transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900">
                  {activeCert === 'icpc' ? t.certTitle : t.certIeeeTitle}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeCert === 'icpc' ? t.certDesc : t.certIeeeDesc}
                </p>
              </div>

            </div>

            {/* Continuous Problem Solving Badge */}
            <div className="bg-white rounded-[32px] p-6 border border-neutral-200 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {t.trainingTitle}
                </span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t.trainingDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
