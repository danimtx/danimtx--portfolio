import React from 'react';
import { ArrowUpRight, Mail, Phone, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const Footer: React.FC = () => {
  const { lang, cvUrl } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer id="contacto" className="w-full px-4 sm:px-6 lg:px-10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] md:rounded-[40px] bg-[#101010] text-white p-8 sm:p-12 lg:p-16 border border-white/5 shadow-2xl space-y-12">
          
          {/* Main Footer Banner */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4F014]">
                {t.tag}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:danimtx03@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#D4F014] text-black font-bold text-sm hover:bg-[#bce00e] transition-all group apple-press"
              >
                <span>{t.emailBtn}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all apple-press"
              >
                <FileText className="w-4 h-4 text-neutral-400" />
                <span>{t.cvBtn}</span>
              </a>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{t.emailLabel}</p>
              <a
                href="mailto:danimtx03@gmail.com"
                className="text-sm font-bold text-white hover:text-[#D4F014] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#D4F014]" />
                <span>danimtx03@gmail.com</span>
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{t.phoneLabel}</p>
              <a
                href="https://wa.me/59171168130"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hover:text-[#D4F014] transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4F014]" />
                <span>+591 71168130</span>
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{t.githubLabel}</p>
              <a
                href="https://github.com/danimtx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hover:text-[#D4F014] transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 fill-[#D4F014]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>github.com/danimtx</span>
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">{t.linkedinLabel}</p>
              <a
                href="https://linkedin.com/in/danimtx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-white hover:text-[#D4F014] transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 fill-[#D4F014]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>linkedin.com/in/danimtx</span>
              </a>
            </div>
          </div>

          {/* Bottom Copyright & Location */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
            <p>{t.rights}</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{t.location}</span>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
