import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const ExperienceSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

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
    <section id="experiencia" className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101010] text-[#D4F014] text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
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

        {/* Timeline Grid with Vertical Connecting Rail */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-8 before:bottom-8 before:w-[2px] before:bg-gradient-to-b before:from-[#D4F014] before:via-neutral-300 before:to-neutral-200">
          {t.items.map((item, index) => (
            <div
              key={item.id}
              onMouseMove={handleSpotlight}
              onTouchMove={handleSpotlightTouch}
              className="apple-spotlight apple-spotlight-inner relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#F8F8F6] border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/90 transition-all duration-300 hover:shadow-xl group"
            >
              {/* Timeline Node Marker */}
              <div className="absolute -left-[30px] sm:-left-[41px] top-8 sm:top-10 flex items-center justify-center">
                {index === 0 ? (
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4F014] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4F014] border-2 border-[#101010] shadow-[0_0_10px_#D4F014]"></span>
                  </span>
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full bg-neutral-300 border-2 border-white shadow-xs"></span>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Left Header: Role & Organization */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-[#101010] text-[#D4F014]">
                      0{index + 1}
                    </span>
                    <span className="px-3 py-0.5 rounded-full bg-white text-neutral-800 text-xs font-semibold border border-neutral-200">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight group-hover:text-black">
                    {item.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm font-semibold text-neutral-600">
                    <span className="text-black font-bold">{item.company}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Right Period Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/80 text-xs font-mono font-bold text-neutral-800 shadow-2xs w-fit">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{item.period}</span>
                </div>

              </div>

              {/* Bullet Achievements */}
              <div className="mt-6 pt-6 border-t border-neutral-200/60 space-y-3">
                {item.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#A6E600] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Pill Row */}
              <div className="mt-6 flex flex-wrap items-center gap-1.5">
                {item.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-xs font-semibold text-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
