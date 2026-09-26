import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface TitaniumServicesBentoProps {
  lang: 'es' | 'en';
}

export const TitaniumServicesBento: React.FC<TitaniumServicesBentoProps> = ({ lang }) => {
  const isEs = lang === 'es';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full select-none">
      {/* Section Title Above Panel: 'DRK' (ghost gray) 'SERVICES' (white) */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-zinc-700 uppercase">
          DRK
        </span>
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
          SERVICES
        </span>
      </div>

      {/* Single Curved High-Contrast Titanium Panel (#ECECEE) */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-[#E8E8EC] p-5 sm:p-8 md:p-10 text-[#0a0a0c] shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
        {/* Top Row: Left Dark App Mockup (7 cols) + Right Danimtx Core Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Card A: Dark Application Window Mockup (.NET 10 Microservices Console) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0E0E12] text-zinc-300 p-5 sm:p-6 border border-black/10 shadow-xl flex flex-col justify-between min-h-[340px]">
            {/* Window Chrome Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="font-mono text-[11px] text-zinc-400 font-semibold tracking-wider ml-2">
                  CONVERSATION TITLE:
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  .NET 10 CQRS
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE · 4.2ms</span>
              </div>
            </div>

            {/* Window Content: Sidebar + Console Log */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 flex-1 py-1">
              {/* Left Mini Sidebar */}
              <div className="sm:col-span-4 border-r border-white/5 pr-3 space-y-1.5 hidden sm:block font-mono text-[10px]">
                <div className="text-zinc-500 tracking-wider pb-1">SERVICES</div>
                <div className="p-1.5 rounded bg-white/[0.05] text-cyan-300 border border-white/5 truncate">
                  → Orders.Dispatch
                </div>
                <div className="p-1.5 rounded text-zinc-400 hover:bg-white/[0.02] truncate">
                  MediatR.Bus
                </div>
                <div className="p-1.5 rounded text-zinc-400 hover:bg-white/[0.02] truncate">
                  Redis.L2Cache
                </div>
                <div className="p-1.5 rounded text-zinc-400 hover:bg-white/[0.02] truncate">
                  PostGIS.Sync
                </div>
              </div>

              {/* Main Log Output Pane */}
              <div className="sm:col-span-8 font-mono text-[11px] space-y-2 leading-relaxed text-zinc-300 flex flex-col justify-center">
                <div className="text-zinc-500 text-[10px]">
                  // DISTRIBUTED PIPELINE EXECUTION
                </div>
                <div className="text-zinc-400">
                  <span className="text-emerald-400">✓</span> Command dispatched: <span className="text-white">CreateOrderCommandHandler</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-cyan-400">✓</span> MediatR CQRS pipeline: <span className="text-white">0 allocations</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-emerald-400">✓</span> PostgreSQL ACID committed in <span className="text-white font-semibold">2.1ms</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-cyan-400">✓</span> Multi-tier Redis L2 cache synced across nodes
                </div>
              </div>
            </div>

            {/* Bottom Prompt / Command Input Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 bg-black/30 px-3.5 py-2 rounded-xl border border-white/5">
              <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 truncate">
                {isEs ? 'Iniciar telemetría o consultar endpoint...' : 'Initialize distributed pipeline or inspect endpoint...'}
              </span>
              <button
                onClick={() => scrollToSection('proven')}
                className="w-6 h-6 rounded-lg bg-cyan-400 text-black flex items-center justify-center hover:bg-cyan-300 transition-colors shrink-0 cursor-pointer"
                title="Inspect"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card B: DANIMTX CORE (Right Top) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#F0F0F4] p-6 sm:p-7 border border-black/5 shadow-sm flex flex-col justify-between group hover:border-black/15 transition-all">
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-6">
                <span className="flex items-center gap-1.5 text-zinc-800 font-semibold">
                  <span className="w-1.5 h-1.5 bg-cyan-500 inline-block" />
                  {isEs ? 'ARQUITECTURA DISTRIBUIDA' : 'DISTRIBUTED ARCHITECTURE'}
                </span>
                <span>{isEs ? 'POTENCIADO POR .NET 10' : 'POWERED BY .NET 10'}</span>
              </div>

              {/* Title with AFTRDRK style vertical bars */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-lg text-zinc-400 tracking-tighter">||||||</span>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0a0a0c] uppercase">
                  DANIMTX CORE
                </h3>
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {isEs
                  ? 'Microservicios de alto rendimiento en .NET 10, C#, PostgreSQL y Redis. Arquitecturas distribuidas tolerantes a fallos diseñadas para escalar sin cuellos de botella.'
                  : 'High-throughput microservices in .NET 10, C#, PostgreSQL and Redis. Zero-downtime distributed systems built for scale.'}
              </p>
            </div>

            {/* Bottom Action: Link + Black Square Button [ ↗ ] */}
            <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between">
              <button
                onClick={() => scrollToSection('proven')}
                className="font-mono text-[11px] font-bold tracking-widest text-zinc-800 group-hover:text-black uppercase cursor-pointer"
              >
                {isEs ? 'EXPLORAR ARQUITECTURA' : 'EXPLORE ARCHITECTURE'}
              </button>

              <button
                onClick={() => scrollToSection('proven')}
                className="w-8 h-8 rounded-lg bg-[#0a0a0c] text-white flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Explore Architecture"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: 2 Equal Cards (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-5 sm:mt-6">
          {/* Card C: OFFLINE-FIRST GEOSPATIAL (Bottom Left) */}
          <div className="rounded-2xl bg-[#F0F0F4] p-6 sm:p-7 border border-black/5 shadow-sm flex flex-col justify-between group hover:border-black/15 transition-all">
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-6">
                <span className="flex items-center gap-1.5 text-zinc-800 font-semibold">
                  <span className="w-1.5 h-1.5 bg-cyan-500 inline-block" />
                  {isEs ? 'GIS OFFLINE-FIRST' : 'OFFLINE-FIRST GIS'}
                </span>
                <span>{isEs ? 'MOTOR MAPLIBRE' : 'MAPLIBRE ENGINE'}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0a0a0c] uppercase mb-3">
                {isEs ? 'GEOESPACIAL OFFLINE-FIRST' : 'OFFLINE-FIRST GEOSPATIAL'}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {isEs
                  ? 'Motor de cartografía móvil con MapLibre GL, PostGIS y sincronización asíncrona con Supabase para rutas de senderismo y navegación 100% sin conexión.'
                  : 'Mobile mapping engine with MapLibre GL, PostGIS, and Supabase offline sync for rural trails and navigation.'}
              </p>
            </div>

            {/* Bottom Action: Link + Black Square Button [ ↗ ] */}
            <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between">
              <button
                onClick={() => scrollToSection('proven')}
                className="font-mono text-[11px] font-bold tracking-widest text-zinc-800 group-hover:text-black uppercase cursor-pointer"
              >
                {isEs ? 'VER LUGARES OCULTOS' : 'VIEW LUGARES OCULTOS'}
              </button>

              <button
                onClick={() => scrollToSection('proven')}
                className="w-8 h-8 rounded-lg bg-[#0a0a0c] text-white flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="View Lugares Ocultos"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card D: ALGORITHMIC RIGOR & SANDBOX (Bottom Right) */}
          <div className="rounded-2xl bg-[#F0F0F4] p-6 sm:p-7 border border-black/5 shadow-sm flex flex-col justify-between group hover:border-black/15 transition-all">
            <div>
              {/* Top Tags */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-6">
                <span className="flex items-center gap-1.5 text-zinc-800 font-semibold">
                  <span className="w-1.5 h-1.5 bg-cyan-500 inline-block" />
                  {isEs ? 'RIGOR ALGORÍTMICO' : 'ALGORITHMIC RIGOR'}
                </span>
                <span>{isEs ? 'FINALISTA ICPC' : 'ICPC FINALIST'}</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#0a0a0c] uppercase mb-3">
                {isEs ? 'RIGOR ALGORÍTMICO & SANDBOX' : 'ALGORITHMIC RIGOR & SANDBOX'}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {isEs
                  ? 'Evaluación automatizada de código con Judge0 CE y aislamiento hermético en Docker. 2x Finalista Regional Sudamérica del ACM-ICPC.'
                  : 'Automated code evaluation with Judge0 CE and Docker isolation. 2x ACM-ICPC South America Regional Finalist.'}
              </p>
            </div>

            {/* Bottom Action: Link + Black Square Button [ ↗ ] */}
            <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between">
              <button
                onClick={() => scrollToSection('proven')}
                className="font-mono text-[11px] font-bold tracking-widest text-zinc-800 group-hover:text-black uppercase cursor-pointer"
              >
                {isEs ? 'VERIFICAR BENCHMARKS' : 'VERIFY BENCHMARKS'}
              </button>

              <button
                onClick={() => scrollToSection('proven')}
                className="w-8 h-8 rounded-lg bg-[#0a0a0c] text-white flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Verify Benchmarks"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
