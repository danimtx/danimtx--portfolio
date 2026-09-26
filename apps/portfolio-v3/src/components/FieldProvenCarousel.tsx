import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Compass, Terminal } from 'lucide-react';

export interface FieldProvenCarouselProps {
  lang: 'es' | 'en';
}

interface FieldProvenItem {
  id: string;
  badgeType: 'icon' | 'initials' | 'avatar';
  initials?: string;
  icon?: React.ReactNode;
  quote: {
    es: string;
    en: string;
  };
  attribution: string;
}

export const FieldProvenCarousel: React.FC<FieldProvenCarouselProps> = ({ lang }) => {
  const isEs = lang === 'es';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const items: FieldProvenItem[] = [
    {
      id: 'lugares-ocultos',
      badgeType: 'icon',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      quote: {
        es: '“Lugares Ocultos demostró que la navegación cartográfica offline al 100% es viable en topografías andinas complejas sin conexión celular. Teselas vectoriales MapLibre nativas a 60 FPS con sincronización asíncrona hacia PostGIS.”',
        en: '“Lugares Ocultos proved that 100% offline geospatial navigation is viable across complex Andean terrain with zero cellular connectivity. Native MapLibre vector tiles at 60 FPS with asynchronous batch sync to PostGIS.”'
      },
      attribution: 'LUGARES OCULTOS DE TARIJA, OFFLINE-FIRST GIS ENGINE'
    },
    {
      id: 'cybercorp',
      badgeType: 'initials',
      initials: 'CC',
      quote: {
        es: '“La arquitectura distribuida en .NET 10 y la integración de webhooks con WhatsApp Cloud API eliminaron por completo las órdenes de trabajo manuales en papel, reduciendo los tiempos de respuesta técnica en cuadrillas de telecomunicaciones.”',
        en: '“The distributed .NET 10 architecture and WhatsApp Cloud API webhook automation completely eliminated manual paper dispatch, slashing technician response times across field telecommunication and CCTV crews.”'
      },
      attribution: 'CYBERCORP S.R.L., DISTRIBUTED CREW DISPATCH'
    },
    {
      id: 'juez-singa',
      badgeType: 'icon',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      quote: {
        es: '“Infraestructura de ejecución de código hermética con Judge0 CE y Docker cgroups v2, evaluando envíos algorítmicos en C++, Python y Java con precisión milimétrica y simulación oficial de congelamiento de tabla ICPC.”',
        en: '“Hermetic sandboxed code execution infrastructure powered by Judge0 CE and Docker cgroups v2, evaluating C++, Python, and Java contest submissions with microsecond precision and authentic ICPC frozen scoreboard.”'
      },
      attribution: 'COMITÉ CIENTÍFICO, JUEZ SINGA EVALUATION ENGINE'
    },
    {
      id: 'icpc-awards',
      badgeType: 'initials',
      initials: 'ICPC',
      quote: {
        es: '“2x Clasificación consecutiva a las Finales Regionales de Sudamérica del ACM-ICPC (2024 & 2025). Top 6 nacional en Bolivia y Top 13.9% a nivel mundial en el maratón IEEEXtreme 18.0 entre más de 19,000 competidores globales.”',
        en: '“Two-time consecutive qualification to the ACM-ICPC South America Regional Finals (2024 & 2025). Top 6 nationally in Bolivia and Top 13.9% globally in the 24-hour IEEEXtreme 18.0 marathon out of 19,000+ competitors.”'
      },
      attribution: '2X ACM-ICPC REGIONAL FINALIST, TEAM LEADER (RISE & DIJKSTRAIDOS)'
    }
  ];

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 24 : 380;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
    setTimeout(updateScrollButtons, 300);
  };

  return (
    <div className="w-full select-none">
      {/* Section Header: 'PROVEN IN THE FIELD' (Left) and Arrows (Right) */}
      <div className="flex items-center justify-between mb-8 pb-4">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
          {isEs ? 'PROBADO EN EL CAMPO' : 'PROVEN IN THE FIELD'}
        </h2>

        {/* Carousel Navigation Arrows [ ← ] [ → ] */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-xl border border-white/10 bg-[#0E0E12] text-zinc-300 hover:text-white hover:border-white/30 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-xl border border-white/10 bg-[#0E0E12] text-zinc-300 hover:text-white hover:border-white/30 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sleek Horizontal Cards Track */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className="flex items-stretch gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 snap-start rounded-2xl bg-[#0E0E12] border border-white/[0.08] hover:border-white/20 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-[#121217]"
          >
            {/* Top Badge: Glyph or Monogram */}
            <div className="mb-6">
              {item.badgeType === 'icon' ? (
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center">
                  {item.icon}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                  {item.initials}
                </div>
              )}
            </div>

            {/* Impact Quote */}
            <blockquote className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-8 flex-1">
              {isEs ? item.quote.es : item.quote.en}
            </blockquote>

            {/* Author / System Attribution */}
            <div className="border-t border-white/[0.06] pt-4 font-mono text-[10px] sm:text-[11px] text-zinc-400 tracking-wider uppercase font-semibold">
              {item.attribution}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
