import React from 'react';
import { Compass, Network, Code2, Gauge, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const iconList = [Compass, Network, Code2, Gauge, Rocket];

export const ProcessSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].process;

  return (
    <section id="proceso" className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-24 bg-white border-y border-neutral-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6E6E73]">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-[#6E6E73]">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.steps.map((step, idx) => {
            const Icon = iconList[idx] || Compass;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#F8F8F6] border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-100/80 transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-black group-hover:bg-[#D4F014] group-hover:border-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-black">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#111111] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
