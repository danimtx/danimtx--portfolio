import React from 'react';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import { StealthHoloCard } from './StealthHoloCard';
import { VerticalScrollTrack } from './VerticalScrollTrack';

interface HeroSectionProps {
  lang: 'es' | 'en';
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const isEs = lang === 'es';

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden bg-[#050505] pt-24 pb-16 select-none"
    >
      {/* 3D Kinetic Cylindrical Particle Tunnel (Three.js WebGL) */}
      <HeroParticleCanvas />

      {/* Subtle Depth Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10" />

      {/* Right Edge Vertical Scroll Indicator */}
      <VerticalScrollTrack />

      {/* Main Editorial Hero Composition */}
      <div className="relative z-20 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
        {/* Giant Monolith Typography */}
        <div className="space-y-1 sm:space-y-2">
          {/* Line 1: 'HAVE SYSTEMS' */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.9] uppercase">
            HAVE SYSTEMS
          </h1>

          {/* Line 2: 'IN ' (white) + 'DRK' (ghost gray) + ' PLACES...' (white) */}
          <div className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] uppercase flex flex-wrap items-baseline">
            <span className="text-white">IN&nbsp;</span>
            <span className="text-zinc-800 transition-colors duration-500 hover:text-zinc-600 cursor-default">
              DRK
            </span>
            <span className="text-white">&nbsp;PLACES...</span>
          </div>
        </div>

        {/* Sub-paragraph: Left-aligned 2-line monospace description (1:1 with AFTRDRK) */}
        <div className="max-w-xl text-left pt-2 pb-4">
          <p className="font-mono text-[11px] sm:text-xs text-zinc-400 tracking-wider uppercase leading-relaxed font-light">
            {isEs ? (
              <>
                DISEÑAMOS LAS ARQUITECTURAS DISTRIBUIDAS DONDE LA ESCALA IMPORTA — <br />
                ENTREGANDO BACKENDS RESILIENTES ANTES DE QUE SURJAN CUELLOS DE BOTELLA.
              </>
            ) : (
              <>
                WE ENGINEER THE DISTRIBUTED ARCHITECTURES WHERE SCALE MATTERS — <br />
                DELIVERING RESILIENT BACKENDS BEFORE BOTTLENECKS ARISE.
              </>
            )}
          </p>
        </div>

        {/* Line 3: Interactive Holographic Card beside massive 'NO NOISE.' */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-2">
          {/* 16:9 Holographic Card with Cybernetic Eye Reticle */}
          <div className="shrink-0">
            <StealthHoloCard />
          </div>

          {/* Huge 'NO NOISE.' Ghost Metallic Typography */}
          <div className="flex items-center">
            <span className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-400 uppercase select-none leading-none drop-shadow-[0_2px_20px_rgba(255,255,255,0.05)]">
              NO NOISE.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
