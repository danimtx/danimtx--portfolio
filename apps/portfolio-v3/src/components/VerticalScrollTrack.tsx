import React, { useState, useEffect, useCallback } from 'react';

interface VerticalScrollTrackProps {
  className?: string;
}

/**
 * VerticalScrollTrack
 *
 * Minimalist right-edge vertical scroll indicator matching portfolio-v3.jpg:
 * - Top bracket icon '[ ]'
 * - Vertical monospace text 'S C R O L L'
 * - Thin vertical hairline extending downward with glowing position indicator
 */
export const VerticalScrollTrack: React.FC<VerticalScrollTrackProps> = ({
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop;
    const scrollHeight = docEl.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleAdvance = () => {
    window.scrollBy({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  const TRACK_HEIGHT = 120;
  const pillTop = scrollProgress * TRACK_HEIGHT;

  return (
    <div
      aria-label="Scroll Indicator"
      onClick={handleAdvance}
      className={`fixed right-6 sm:right-8 lg:right-10 bottom-12 z-30 hidden lg:flex flex-col items-center gap-3 select-none cursor-pointer group opacity-60 hover:opacity-100 transition-opacity ${className}`}
    >
      {/* Top Bracket [ ] */}
      <div className="font-mono text-xs text-zinc-500 group-hover:text-cyan-400 transition-colors">
        [ ]
      </div>

      {/* Vertical Hairline Track */}
      <div
        style={{ height: `${TRACK_HEIGHT}px` }}
        className="relative w-[1px] bg-white/15 group-hover:bg-white/30 transition-colors"
      >
        {/* Glowing Indicator Pill */}
        <div
          style={{
            transform: `translateY(${pillTop}px)`,
          }}
          className="absolute left-1/2 -translate-x-1/2 w-[3px] h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)] transition-transform duration-100"
        />
      </div>

      {/* Vertical 'S C R O L L' text */}
      <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500 group-hover:text-zinc-300 transition-colors [writing-mode:vertical-rl] rotate-180">
        SCROLL
      </span>
    </div>
  );
};
