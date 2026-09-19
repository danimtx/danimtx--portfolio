import React, { useState } from 'react';
import { Smartphone, Server, Layout, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const iconMap: Record<string, React.ElementType> = {
  mobile: Smartphone,
  backend: Server,
  frontend: Layout,
  competitive: ShieldCheck
};

export const ServicesAccordion: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('mobile');
  const { lang } = useLanguage();
  const t = translations[lang].services;

  const activeService = t.items.find((s) => s.id === activeId) || t.items[0];
  const ActiveIcon = iconMap[activeService.id] || Smartphone;

  // Apple Spotlight Effect on Pointer Move
  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="servicios" className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6E6E73]">
              {t.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mt-2">
              {t.title}
            </h2>
          </div>
          <p className="text-sm text-[#6E6E73] max-w-md">
            {t.description}
          </p>
        </div>

        {/* Interactive Accordion / Tab Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Service Selector Rows */}
          <div className="lg:col-span-6 space-y-3">
            {t.items.map((service) => {
              const isActive = service.id === activeId;
              const Icon = iconMap[service.id] || Smartphone;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  onMouseMove={handleSpotlight}
                  className={`group apple-spotlight apple-spotlight-inner apple-press p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#101010] text-white border-black shadow-xl'
                      : 'bg-white text-neutral-900 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#D4F014] text-black'
                            : 'bg-neutral-100 text-neutral-800 group-hover:bg-neutral-200'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#D4F014]' : 'text-neutral-400'}`}>
                          {service.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? 'bg-white/10 text-white rotate-45'
                          : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200 group-hover:translate-x-0.5'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className={`mt-3 text-sm leading-relaxed ${isActive ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {service.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Service Deep Dive Card */}
          <div
            onMouseMove={handleSpotlight}
            className="apple-spotlight apple-spotlight-inner lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-lg sticky top-24 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#6E6E73]">
                    {activeService.number}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                    {activeService.title}
                  </h4>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#D4F014]/20 border border-[#D4F014]/40 text-black text-xs font-bold">
                {t.activeBadge}
              </div>
            </div>

            <p className="text-sm text-[#444444] leading-relaxed">
              {activeService.fullDesc}
            </p>

            {/* Metrics pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeService.metrics.map((m, idx) => (
                <div key={idx} className="px-3 py-2 rounded-2xl bg-neutral-50 border border-neutral-150 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-neutral-800">{m}</span>
                </div>
              ))}
            </div>

            {/* Tech chips */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                {t.techLabel}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeService.tech.map((techItem, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview Card Mockup */}
            {activeService.previewImage && (
              <div className="pt-2">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 aspect-video group">
                  <img
                    src={activeService.previewImage}
                    alt={activeService.previewTitle}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <p className="text-xs font-semibold text-white">
                      {activeService.previewTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
