import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MonolithFooterProps {
  lang: 'es' | 'en';
}

export const MonolithFooter: React.FC<MonolithFooterProps> = ({ lang }) => {
  const isEs = lang === 'es';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] pt-16 pb-12 overflow-hidden select-none">
      {/* Ambient Blue/Cyan Glow at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-cyan-600/[0.07] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Main Footer Row: Left (Brand + Quote), Center (Links), Right (Button) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.06] items-start">
          {/* Left Column: Brand & Manifesto (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div
              onClick={scrollToTop}
              className="font-display font-black text-xl tracking-[0.2em] text-white uppercase cursor-pointer hover:text-cyan-400 transition-colors"
            >
              DANIMTX
            </div>

            <p className="font-mono text-xs sm:text-[13px] text-zinc-400 max-w-sm leading-relaxed tracking-wider uppercase">
              {isEs
                ? '“DISEÑAMOS SISTEMAS EN LA SOMBRA PARA QUE BRILLEN EN PRODUCCIÓN.”'
                : '“WE ENGINEER SYSTEMS IN THE DARK TO SHINE IN PRODUCTION.”'}
            </p>
          </div>

          {/* Center Column 1: Main Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5 font-mono text-xs text-zinc-400 tracking-wider uppercase">
            <div>
              <button
                onClick={() => scrollToSection('architecture')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'ARQUITECTURA' : 'ARCHITECTURE'}
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('architecture')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'SISTEMAS DISTRIBUIDOS' : 'SYSTEMS'}
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('architecture')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'GIS OFFLINE-FIRST' : 'OFFLINE GIS'}
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('proven')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'ICPC / EN CAMPO' : 'ICPC / FIELD PROVEN'}
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'ACERCA DE' : 'ABOUT'}
              </button>
            </div>
            <div>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isEs ? 'CONTACTO' : 'GET IN TOUCH'}
              </button>
            </div>
          </div>

          {/* Center Column 2: Legal & External Links (2 cols) */}
          <div className="md:col-span-2 space-y-2.5 font-mono text-xs text-zinc-400 tracking-wider uppercase">
            <div>
              <a
                href="https://github.com/danimtx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors block"
              >
                GITHUB
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/daniel-mancilla-tejerina/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors block"
              >
                LINKEDIN
              </a>
            </div>
            <div>
              <span className="text-zinc-600 block">
                {isEs ? 'POLÍTICA DE PRIVACIDAD' : 'PRIVACY POLICY'}
              </span>
            </div>
            <div>
              <span className="text-zinc-600 block">
                {isEs ? 'TÉRMINOS Y CONDICIONES' : 'TERMS & CONDITIONS'}
              </span>
            </div>
          </div>

          {/* Right Column: Action Button (2 cols) */}
          <div className="md:col-span-2 flex md:justify-end">
            <a
              href="mailto:danimtx.dev@gmail.com?subject=Inquiry%20-%20Daniel%20Mamani"
              className="px-5 py-2.5 rounded-full border border-white/20 bg-transparent text-white font-mono text-[11px] tracking-wider uppercase hover:border-white/50 hover:bg-white/[0.04] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{isEs ? 'CONTACTAR' : 'GET IN TOUCH'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Giant Monolith Watermark Typography Bleed (1:1 with AFTRDRK) */}
        <div className="pt-16 pb-10 select-none overflow-hidden text-center pointer-events-none">
          <p className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-[132px] tracking-tighter text-white/[0.06] hover:text-white/[0.1] transition-colors uppercase whitespace-nowrap leading-none">
            ARCHITECTING IN DRK PLACES
          </p>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] text-zinc-600 tracking-wider">
          <div>
            © {new Date().getFullYear()} DANIMTX. ALL RIGHTS RESERVED.
          </div>
          <button
            onClick={scrollToTop}
            className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer uppercase"
          >
            [ TOP ]
          </button>
        </div>
      </div>
    </footer>
  );
};
