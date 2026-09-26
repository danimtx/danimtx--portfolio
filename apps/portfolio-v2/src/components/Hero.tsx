import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
export const Hero: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  // Apple-grade 3D Interactive Spatial Parallax Tilt
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const emblemRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!emblemRef.current) return;
    const rect = emblemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate continuous physical tilt
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!emblemRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = emblemRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="w-full px-3.5 sm:px-6 lg:px-10 pt-2 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-[#101010] text-white overflow-hidden shadow-2xl border border-white/5 min-h-[520px] sm:min-h-[620px] flex flex-col justify-between p-5 sm:p-10 lg:p-14">
          
          {/* Top Bar inside Card: Greeting & Floating Tech Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
              <span className="text-[#D4F014] text-xs font-bold tracking-wider">Hey 👋</span>
              <span className="text-neutral-200 text-xs font-semibold">danimtx</span>
            </div>

            {/* Floating Glass Pill: Stack Overview with responsive touch scroll */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-xs max-w-full overflow-x-auto no-scrollbar">
              <span className="text-neutral-400 font-semibold tracking-wider uppercase text-[9px] sm:text-[10px] mr-1 shrink-0">
                {t.stackLabel}
              </span>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-1.5 shrink-0">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">.NET 10 (C#)</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-[#D4F014] font-medium text-[10.5px] sm:text-[11px] apple-press">Azure Cloud & DevOps</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">Docker</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">PostgreSQL / PostGIS</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">React Native (Expo)</span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/10 text-white font-medium text-[10.5px] sm:text-[11px] apple-press">React / Angular</span>
              </div>
            </div>
          </div>

          {/* Main Grid: Copy Left & Stealth Brand Centerpiece Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto pt-4 sm:pt-6 pb-4 z-10">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 max-w-2xl">
              <div className="space-y-2.5 sm:space-y-3">
                <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                  {t.title1} <br />
                  <span className="text-[#D4F014]">{t.title2}</span>
                </h1>
                <p className="text-xs sm:text-base text-neutral-300/90 max-w-xl font-normal leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Action Buttons with Apple Press Feedback */}
              <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#D4F014] text-black font-bold text-xs sm:text-sm hover:bg-[#bce00e] hover:shadow-lg hover:shadow-[#D4F014]/20 transition-all duration-200 group apple-press"
                >
                  <span>{t.ctaWork}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all duration-200 apple-press"
                >
                  <span>{t.ctaProjects}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Stealth Cat Logo with 3D Spatial Parallax & Touch Support */}
            <div
              ref={emblemRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ perspective: 1000 }}
              className="lg:col-span-5 relative flex items-center justify-center py-4 sm:py-6 lg:py-0 select-none cursor-pointer"
            >
              {/* Subtle ambient lime glow behind the mark */}
              <div
                className="absolute w-52 h-52 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-[#D4F014]/14 blur-[90px] sm:blur-[110px] pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `translate(${tilt.y * 1.5}px, ${-tilt.x * 1.5}px)`,
                }}
              />

              {/* Direct Stealth Cat Vector Logo - Physically tilted in 3D */}
              <div
                style={{
                  transform: isHovered
                    ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale(1.05)`
                    : 'rotateX(0deg) rotateY(0deg) scale(1)',
                  transition: isHovered
                    ? 'transform 100ms ease-out'
                    : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                }}
                className={`will-change-transform ${!isHovered ? 'animate-cat-float' : ''}`}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-[0_0_40px_rgba(212,240,20,0.25)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="danimtx Stealth Cat Brand Mark"
                >
                  <defs>
                    <linearGradient id="heroCatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E6FF2E" />
                      <stop offset="50%" stopColor="#D4F014" />
                      <stop offset="100%" stopColor="#8AC600" />
                    </linearGradient>
                  </defs>

                  {/* Left Ear */}
                  <polygon points="30,22 48,52 26,52" fill="url(#heroCatGrad)" />
                  <polygon points="33,28 45,50 28,50" fill="#141414" />

                  {/* Right Ear */}
                  <polygon points="90,22 94,52 72,52" fill="url(#heroCatGrad)" />
                  <polygon points="87,28 92,50 75,50" fill="#141414" />

                  {/* Crown bridge between ears */}
                  <path d="M48,52 L72,52 L60,62 Z" fill="#1a1a1a" stroke="url(#heroCatGrad)" strokeWidth="2" />

                  {/* Sleek Cat Mask Outline */}
                  <polygon
                    points="26,52 60,38 94,52 90,84 60,102 30,84"
                    fill="#141414"
                    stroke="url(#heroCatGrad)"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />

                  {/* Glowing Slit Eyes with Subtle Breathing Pulse */}
                  <polygon points="40,64 54,66 44,74" fill="#D4F014" className="animate-cat-eyes" />
                  <polygon points="80,64 66,66 76,74" fill="#D4F014" className="animate-cat-eyes" />

                  {/* Nose prompt */}
                  <circle cx="60" cy="80" r="2.6" fill="#D4F014" />

                  {/* Whiskers */}
                  <line x1="20" y1="72" x2="36" y2="72" stroke="#D4F014" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                  <line x1="22" y1="80" x2="38" y2="78" stroke="#D4F014" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                  
                  <line x1="100" y1="72" x2="84" y2="72" stroke="#D4F014" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                  <line x1="98" y1="80" x2="82" y2="78" stroke="#D4F014" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
                </svg>
              </div>
            </div>

          </div>

          {/* Bottom Row: Metrics Strip */}
          <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 z-10">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.metric1Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric1Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4F014] tracking-tight">{t.metric2Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric2Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.metric3Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric3Label}</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#D4F014] tracking-tight">{t.metric4Value}</p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium">{t.metric4Label}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
