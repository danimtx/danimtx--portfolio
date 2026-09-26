import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const IntroStatement: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].intro;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Status Badge */}
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-neutral-200/80 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              {t.availability}
            </span>
          </div>
        </div>

        {/* Right Column: High-Impact Editorial Statement */}
        <div className="lg:col-span-8 space-y-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.3] text-[#6E6E73] tracking-tight">
            {t.p1}<strong className="text-[#111111] font-bold">{t.boldName}</strong>{t.p2}<strong className="text-[#111111] font-bold">{t.boldArch}</strong>{t.p3}
          </p>

          <a
            href="#experiencia"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-black group border-b-2 border-black pb-0.5"
          >
            <span>{t.linkText}</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
