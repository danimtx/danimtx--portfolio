/**
 * useCatLedges.ts
 * Measures and caches DOM ledges (`[data-cat-ledge]`) and the Hero home (`[data-cat-home]`)
 * in document coordinates. Never calls `getBoundingClientRect` inside the RAF animation loop.
 */
import { useEffect, useRef, useCallback } from 'react';

export type LedgeSurface = 'light' | 'dark';
export type LedgeBehavior = 'curious' | 'sniff' | 'stalk' | 'alert' | 'stepping' | 'sleep';

export interface CatLedge {
  id: string;
  el: HTMLElement;
  xStart: number;
  xEnd: number;
  y: number; // document Y of the top edge
  surface: LedgeSurface;
  behavior: LedgeBehavior;
}

export interface CatHomeBox {
  x: number; // center X in document coordinates
  y: number; // launch/land Y in document coordinates
  bottomY: number; // Hero bottom in document coordinates
  ctaBottomY: number; // Bottom of the two Hero CTA buttons ("Trabajemos Juntos" / "Explorar Proyectos")
}

export interface LedgeRegistry {
  ledges: CatLedge[];
  home: CatHomeBox | null;
  docHeight: number;
  viewportW: number;
  viewportH: number;
  remeasure: () => void;
}

export const useCatLedges = (enabled: boolean): React.MutableRefObject<LedgeRegistry> => {
  const regRef = useRef<LedgeRegistry>({
    ledges: [],
    home: null,
    docHeight: 2000,
    viewportW: typeof window !== 'undefined' ? window.innerWidth : 1280,
    viewportH: typeof window !== 'undefined' ? window.innerHeight : 800,
    remeasure: () => {},
  });

  const measureAll = useCallback(() => {
    if (typeof window === 'undefined' || !enabled) return;
    const sx = window.scrollX;
    const sy = window.scrollY;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Measure Hero home & the two Hero CTA buttons ("Trabajemos Juntos" / "Explorar Proyectos")
    const homeEl = document.querySelector<HTMLElement>('[data-cat-home]');
    const heroSection = document.getElementById('hero');
    const ctaEls = document.querySelectorAll<HTMLElement>(
      '#hero a[href="#contacto"], #hero a[href="#proyectos"]',
    );
    let home: CatHomeBox | null = null;
    if (homeEl) {
      const r = homeEl.getBoundingClientRect();
      const heroR = heroSection ? heroSection.getBoundingClientRect() : r;
      let ctaBottom = r.bottom + sy;
      if (ctaEls.length > 0) {
        let maxBot = 0;
        ctaEls.forEach((btn) => {
          const br = btn.getBoundingClientRect();
          if (br.bottom + sy > maxBot) maxBot = br.bottom + sy;
        });
        if (maxBot > 0) ctaBottom = maxBot;
      }
      home = {
        x: r.left + sx + r.width * 0.5,
        y: r.top + sy + r.height * 0.78,
        bottomY: heroR.bottom + sy,
        ctaBottomY: ctaBottom,
      };
    }

    // Measure all ledges
    const nodes = document.querySelectorAll<HTMLElement>('[data-cat-ledge]');
    const ledges: CatLedge[] = [];
    nodes.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      if (r.width < 95 || r.height < 10) return; // skip hidden or tiny elements
      const pad = Math.min(28, r.width * 0.14);
      const xStart = r.left + sx + pad;
      const xEnd = r.right + sx - pad;
      if (xEnd <= xStart) return;
      const surface = (el.dataset.catSurface as LedgeSurface) || 'light';
      const behavior = (el.dataset.catBehavior as LedgeBehavior) || 'curious';
      const id = el.dataset.catLedgeId || `ledge-${idx}-${Math.round(r.top + sy)}`;
      ledges.push({
        id,
        el,
        xStart,
        xEnd,
        y: r.top + sy,
        surface,
        behavior,
      });
    });

    ledges.sort((a, b) => a.y - b.y || a.xStart - b.xStart);

    regRef.current.ledges = ledges;
    regRef.current.home = home;
    regRef.current.docHeight = document.documentElement.scrollHeight;
    regRef.current.viewportW = vw;
    regRef.current.viewportH = vh;
  }, [enabled]);

  useEffect(() => {
    regRef.current.remeasure = measureAll;
    if (!enabled || typeof window === 'undefined') return;

    measureAll();
    document.fonts?.ready?.then(() => measureAll());

    const ro = new ResizeObserver(() => measureAll());
    ro.observe(document.documentElement);

    const mo = new MutationObserver(() => measureAll());
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('resize', measureAll, { passive: true });
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', measureAll);
    };
  }, [enabled, measureAll]);

  return regRef;
};
