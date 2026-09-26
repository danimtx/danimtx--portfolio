import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

interface HorizonCtaCardProps {
  lang: 'es' | 'en';
}

export const HorizonCtaCard: React.FC<HorizonCtaCardProps> = ({ lang }) => {
  const isEs = lang === 'es';
  const [copied, setCopied] = useState(false);
  const email = 'danimtx.dev@gmail.com';

  const handleTransmit = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      window.location.href = `mailto:${email}?subject=Architectural%20Inquiry%20-%20Daniel%20Mamani`;
    }, 400);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      <div className="relative rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#0A0D14] overflow-hidden px-6 py-16 sm:px-12 sm:py-20 text-center shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
        {/* Soft Radial Horizon Glow at Bottom (1:1 with AFTRDRK) */}
        <div className="absolute inset-0 pointer-events-none horizon-gradient opacity-80" />

        {/* Inner Content */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          {/* Top Tag: 'READY TO BUILD?' */}
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-cyan-400 uppercase font-semibold">
            {isEs ? '¿LISTO PARA CONSTRUIR?' : 'READY TO BUILD?'}
          </div>

          {/* Headline: 'OWN YOUR ARCHITECTURE' */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight">
            <span className="text-white">OWN </span>
            <span className="text-zinc-400">
              {isEs ? 'TU ARQUITECTURA' : 'YOUR ARCHITECTURE'}
            </span>
          </h2>

          {/* Subtext */}
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            {isEs
              ? 'Sistemas distribuidos de alto impacto, aplicaciones móviles offline-first y asesoría en arquitectura de software de alta concurrencia.'
              : 'High-impact distributed systems, resilient offline-first mobile apps, and technical advisory.'}
          </p>

          {/* Center Pill Button: 'INITIALIZE TRANSMISSION ↗' */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleTransmit}
              className="press-cyber px-7 py-3 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] hover:border-cyan-400/50 text-white font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{isEs ? 'COPIADO' : 'COPIED TO CLIPBOARD'}</span>
                </>
              ) : (
                <>
                  <span>{isEs ? 'INICIAR TRANSMISIÓN' : 'INITIALIZE TRANSMISSION'}</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
