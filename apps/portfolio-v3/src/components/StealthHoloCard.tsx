import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface StealthHoloCardProps {
  className?: string;
  onClick?: () => void;
}

/**
 * StealthHoloCard
 *
 * 1:1 Translation of the interactive Holographic Card beside 'NO NOISE':
 * - 16:9 ratio, obsidian glass finish, hairline border.
 * - Glowing cybernetic aperture / iris with concentric glowing rings, radar reticle,
 *   and luminous cyan center.
 * - Bottom-left caption: 'ENTER ARCHITECTURE ↗'
 * - Smooth 3D tilt interaction on mouse hover with specular holographic reflection.
 */
export const StealthHoloCard: React.FC<StealthHoloCardProps> = ({
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width;
      const yNorm = (e.clientY - rect.top) / rect.height;

      const rotX = (yNorm - 0.5) * -12;
      const rotY = (xNorm - 0.5) * 12;

      setTilt({ x: rotX, y: rotY });
      setGlare({
        x: xNorm * 100,
        y: yNorm * 100,
        opacity: 0.35,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const el = document.getElementById('architecture');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const transformStyle = prefersReducedMotion
    ? undefined
    : {
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? 'transform 60ms ease-out'
          : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={transformStyle}
      role="button"
      tabIndex={0}
      aria-label="Enter Architecture"
      className={`group relative w-64 sm:w-72 md:w-80 aspect-[16/9] rounded-2xl bg-[#090a0f]/90 border border-cyan-500/20 hover:border-cyan-400/50 p-4 select-none cursor-pointer overflow-hidden backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,242,254,0.2)] transition-shadow duration-300 focus:outline-none ${className}`}
    >
      {/* Specular Holographic Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 242, 254, 0.28) 0%, rgba(0, 242, 254, 0.05) 50%, transparent 75%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Cyber Reticle Aperture Vector (Eye of the System) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Soft Radial Ambient Blue Bloom */}
        <div className="absolute w-40 h-24 bg-cyan-500/15 blur-2xl rounded-full group-hover:bg-cyan-400/25 transition-all duration-500" />

        {/* Concentric Vector Eye / Aperture */}
        <svg
          viewBox="0 0 280 158"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="irisCyanGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#00f2fe" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#031525" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Eye Almond Outer Frame Arc */}
          <path
            d="M 20 79 Q 140 10 260 79 Q 140 148 20 79 Z"
            fill="none"
            stroke="url(#ringStroke)"
            strokeWidth="1.2"
            opacity="0.65"
          />

          {/* Inner Almond Contour */}
          <path
            d="M 50 79 Q 140 28 230 79 Q 140 130 50 79 Z"
            fill="none"
            stroke="#00f2fe"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* Outer Radar Ring */}
          <circle
            cx="140"
            cy="79"
            r="44"
            fill="none"
            stroke="url(#ringStroke)"
            strokeWidth="1.4"
          />

          {/* Middle Concentric Ring (dashed rotating effect) */}
          <circle
            cx="140"
            cy="79"
            r="32"
            fill="none"
            stroke="#00f2fe"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="group-hover:stroke-cyan-300 transition-colors"
          />

          {/* Inner Luminous Iris Core */}
          <circle cx="140" cy="79" r="22" fill="url(#irisCyanGrad)" />

          {/* Core Pupil Node */}
          <circle cx="140" cy="79" r="6.5" fill="#ffffff" />
          <circle cx="140" cy="79" r="2.5" fill="#031525" />

          {/* Horizontal Reticle Crosshair Line */}
          <line
            x1="80"
            y1="79"
            x2="200"
            y2="79"
            stroke="#00f2fe"
            strokeWidth="0.75"
            opacity="0.5"
          />
          {/* Vertical Reticle Crosshair Line */}
          <line
            x1="140"
            y1="35"
            x2="140"
            y2="123"
            stroke="#00f2fe"
            strokeWidth="0.75"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Bottom Left Label: 'ENTER ARCHITECTURE ↗' */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-semibold text-zinc-300 group-hover:text-cyan-400 transition-colors tracking-widest uppercase">
        <span>ENTER ARCHITECTURE</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
};
