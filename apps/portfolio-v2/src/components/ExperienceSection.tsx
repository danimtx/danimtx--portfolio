import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export const ExperienceSection: React.FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // SVG direct element references for 120 FPS continuous GPU updates
  const activeLineRef = useRef<SVGLineElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const dotsSvgRef = useRef<(SVGCircleElement | null)[]>([]);

  const [dotsPositions, setDotsPositions] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dotsPositionsRef = useRef<number[]>([]);
  const targetYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const animatingRef = useRef<boolean>(false);
  const activeIndexRef = useRef<number>(0);

  // Recalculate anchor positions for each experience card
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const isSm = window.innerWidth >= 640;
    // Align with the card's role/header badge row
    const anchorOffset = isSm ? 44 : 32;

    const positions: number[] = [];
    cardsRef.current.forEach((card) => {
      if (card) {
        const cardRect = card.getBoundingClientRect();
        positions.push(cardRect.top - containerRect.top + anchorOffset);
      }
    });

    if (positions.length > 0) {
      dotsPositionsRef.current = positions;
      setDotsPositions(positions);

      if (currentYRef.current === 0) {
        currentYRef.current = positions[0];
        targetYRef.current = positions[0];
        if (travelerRef.current) {
          travelerRef.current.setAttribute('cy', String(positions[0]));
        }
        if (activeLineRef.current) {
          activeLineRef.current.setAttribute('y2', String(positions[0]));
        }
      }
    }
  }, []);

  // Continuous animation loop (Apple-style fluid spring physics directly on SVG)
  const tick = useCallback(() => {
    const diff = targetYRef.current - currentYRef.current;

    if (Math.abs(diff) > 0.2) {
      // Snappy and ultra-fluid spring interpolation
      currentYRef.current += diff * 0.22;
      const y = currentYRef.current;

      // Update the active green line height
      if (activeLineRef.current) {
        activeLineRef.current.setAttribute('y2', String(y));
      }
      // Update the traveling green ball position along the exact center axis
      if (travelerRef.current) {
        travelerRef.current.setAttribute('cy', String(y));
      }

      // Paint milestone dots that have been reached by the green head
      dotsPositionsRef.current.forEach((dotY, idx) => {
        const dotEl = dotsSvgRef.current[idx];
        if (dotEl) {
          if (y >= dotY - 2) {
            dotEl.setAttribute('fill', '#D4F014');
            dotEl.setAttribute('stroke', '#101010');
          } else {
            dotEl.setAttribute('fill', '#D4D4D8');
            dotEl.setAttribute('stroke', '#FFFFFF');
          }
        }
      });

      // Update active card highlight
      let closestIdx = 0;
      let minDistance = Infinity;
      dotsPositionsRef.current.forEach((dotY, idx) => {
        const dist = Math.abs(y - dotY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIndexRef.current) {
        activeIndexRef.current = closestIdx;
        setActiveIndex(closestIdx);
      }

      requestAnimationFrame(tick);
    } else {
      currentYRef.current = targetYRef.current;
      const y = currentYRef.current;

      if (activeLineRef.current) {
        activeLineRef.current.setAttribute('y2', String(y));
      }
      if (travelerRef.current) {
        travelerRef.current.setAttribute('cy', String(y));
      }

      dotsPositionsRef.current.forEach((dotY, idx) => {
        const dotEl = dotsSvgRef.current[idx];
        if (dotEl) {
          if (y >= dotY - 2) {
            dotEl.setAttribute('fill', '#D4F014');
            dotEl.setAttribute('stroke', '#101010');
          } else {
            dotEl.setAttribute('fill', '#D4D4D8');
            dotEl.setAttribute('stroke', '#FFFFFF');
          }
        }
      });

      animatingRef.current = false;
    }
  }, []);

  // Update target based on viewport scroll position
  const handleScroll = useCallback(() => {
    if (!containerRef.current || dotsPositionsRef.current.length === 0) return;

    // Natural eye reading line in viewport (45% from top)
    const focalY = window.innerHeight * 0.45;
    const containerRect = containerRef.current.getBoundingClientRect();
    const focalInContainer = focalY - containerRect.top;

    const positions = dotsPositionsRef.current;
    const first = positions[0];
    const last = positions[positions.length - 1];

    let target = focalInContainer;
    if (target < first) target = first;
    if (target > last) target = last;

    targetYRef.current = target;

    if (!animatingRef.current) {
      animatingRef.current = true;
      requestAnimationFrame(tick);
    }
  }, [tick]);

  // Recalculate on mount, resize, and language change
  useEffect(() => {
    updatePositions();
  }, [updatePositions, lang]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      updatePositions();
    });
    observer.observe(containerRef.current);
    window.addEventListener('resize', updatePositions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
  }, [updatePositions]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Smooth scroll to card on clicking dot
  const scrollToCard = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      const yOffset = -window.innerHeight * 0.35;
      const y = card.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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

        {/* Timeline Grid with Dynamic SVG Connecting Rail */}
        <div ref={containerRef} className="relative pl-7 sm:pl-14 space-y-6 sm:space-y-8">
          
          {/* Unified SVG Timeline Track (100% centered, 0 offset, ultra-fluid) */}
          <svg className="absolute left-[12px] sm:left-[21px] top-0 h-full w-8 -translate-x-1/2 overflow-visible pointer-events-none z-10">
            <defs>
              <filter id="timeline-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#D4F014" floodOpacity="0.8" />
              </filter>
            </defs>

            {dotsPositions.length > 1 && (
              <>
                {/* Base Inactive Gray Line */}
                <line
                  x1="16"
                  y1={dotsPositions[0]}
                  x2="16"
                  y2={dotsPositions[dotsPositions.length - 1]}
                  stroke="#E5E7EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                
                {/* Active Glowing Green Line (painted from top down) */}
                <line
                  ref={activeLineRef}
                  x1="16"
                  y1={dotsPositions[0]}
                  x2="16"
                  y2={dotsPositions[0]}
                  stroke="#D4F014"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* Stationary Milestone Dots on the Center Axis */}
            {dotsPositions.map((pos, index) => (
              <g key={index}>
                {/* Visible Milestone Circle */}
                <circle
                  ref={(el) => {
                    dotsSvgRef.current[index] = el;
                  }}
                  cx="16"
                  cy={pos}
                  r="5.5"
                  fill={index === 0 ? '#D4F014' : '#D4D4D8'}
                  stroke={index === 0 ? '#101010' : '#FFFFFF'}
                  strokeWidth="2"
                  className="transition-colors duration-200"
                />
                {/* Generous Click / Tap target area for mobile & desktop */}
                <circle
                  cx="16"
                  cy={pos}
                  r="16"
                  fill="transparent"
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => scrollToCard(index)}
                >
                  <title>{`${t.items[index]?.role} — ${t.items[index]?.company}`}</title>
                </circle>
              </g>
            ))}

            {/* The Single Moving Green Ball (glides down the exact center axis) */}
            {dotsPositions.length > 0 && (
              <circle
                ref={travelerRef}
                cx="16"
                cy={dotsPositions[0] || 0}
                r="7"
                fill="#D4F014"
                stroke="#101010"
                strokeWidth="2"
                filter="url(#timeline-glow)"
              />
            )}
          </svg>

          {/* Experience Cards */}
          {t.items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseMove={handleSpotlight}
                onTouchMove={handleSpotlightTouch}
                className={`apple-spotlight apple-spotlight-inner relative p-5 sm:p-8 lg:p-10 rounded-3xl border transition-all duration-300 group ${
                  isActive
                    ? 'bg-white border-neutral-300 ring-2 ring-[#D4F014]/30 shadow-xl'
                    : 'bg-[#F8F8F6] border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/90 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Header: Role & Organization */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#101010] text-[#D4F014] ring-1 ring-[#D4F014]/50'
                          : 'bg-[#101010] text-[#D4F014]'
                      }`}>
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
