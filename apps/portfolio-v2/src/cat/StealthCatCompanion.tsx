/**
 * StealthCatCompanion.tsx
 * Document-space portal overlay hosting the autonomous silhouette cat companion.
 * Zero React re-renders per frame; respects prefers-reduced-motion and desktop media query.
 * Activates as soon as the two Hero CTA buttons ("Trabajemos Juntos" / "Explorar Proyectos")
 * scroll out of view, leaping in from the lateral edge of the screen.
 */
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StealthCatSideRig, type StealthCatSideRigHandle } from './StealthCatSideRig';
import { CatSim } from './catSim';
import { CatBrain } from './catBrain';
import { useCatLedges } from './useCatLedges';
import { catStore, useCatStore } from './catStore';

export const StealthCatCompanion: React.FC = () => {
  const { mode, paused, dismissed } = useCatStore();
  const [eligible, setEligible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rigRef = useRef<StealthCatSideRigHandle | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pillAnchorRef = useRef<HTMLDivElement | null>(null);
  const brainRef = useRef<CatBrain | null>(null);
  const prevModeRef = useRef<string>('docked');
  const hoverTimeoutRef = useRef<number>(0);

  const handleCatHover = (isHover: boolean) => {
    window.clearTimeout(hoverTimeoutRef.current);
    if (isHover) {
      setHovered(true);
    } else {
      hoverTimeoutRef.current = window.setTimeout(() => setHovered(false), 320);
    }
  };

  // Evaluate desktop + pointer:fine + no reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const check = () => {
      const ok = mqDesktop.matches && !mqReduced.matches;
      setEligible(ok);
      if (!ok && catStore.getState().mode !== 'docked') {
        catStore.setMode('docked');
      }
    };
    check();
    mqDesktop.addEventListener('change', check);
    mqReduced.addEventListener('change', check);
    return () => {
      mqDesktop.removeEventListener('change', check);
      mqReduced.removeEventListener('change', check);
    };
  }, []);

  const active = eligible && !dismissed;
  const regRef = useCatLedges(active);

  // Trigger observer based on the two Hero CTA buttons ("Trabajemos Juntos" & "Explorar Proyectos"):
  // Companion activates as soon as those two buttons are no longer visible in the viewport,
  // and docks when scrolling back up so they become visible again.
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const evaluateHeroThreshold = () => {
      const reg = regRef.current;
      if (!reg.home) reg.remeasure();
      const home = reg.home;
      if (!home) return;

      const sy = window.scrollY;
      const ctaVisibleBottom = home.ctaBottomY - sy;
      const curMode = catStore.getState().mode;

      // Activate as soon as the two Hero CTA buttons pass behind the top bar (<= 48px)
      if ((curMode === 'docked' || curMode === 'exiting') && ctaVisibleBottom <= 48) {
        catStore.setMode('roaming');
      } else if (curMode === 'roaming' && ctaVisibleBottom > 76) {
        // User scrolled back up so the Hero CTA buttons are visible again -> exit off lateral edge then dock
        catStore.setMode('exiting');
      }
    };

    evaluateHeroThreshold();
    window.addEventListener('scroll', evaluateHeroThreshold, { passive: true });
    return () => window.removeEventListener('scroll', evaluateHeroThreshold);
  }, [active, regRef]);

  // Main single RAF loop when roaming
  useEffect(() => {
    if (!active || mode === 'docked' || paused) return;

    const reg = regRef.current;
    reg.remeasure();

    if (!brainRef.current) {
      const sim = new CatSim({ x: -120, y: 300, scale: 0.72, facing: 1, posture: 'crouch' });
      brainRef.current = new CatBrain(sim);
    }
    const brain = brainRef.current;

    // Only trigger lateral entry when transitioning from 'docked'/'exiting' into 'roaming',
    // NOT when unpausing from a project modal.
    if (mode === 'roaming' && prevModeRef.current !== 'roaming') {
      brain.enterFromHero(reg, window.scrollY);
    } else if (mode === 'exiting' && prevModeRef.current !== 'exiting') {
      brain.exitToHero(reg, window.scrollY, () => {
        if (catStore.getState().mode === 'exiting') {
          catStore.setMode('docked');
        }
      });
    }
    prevModeRef.current = mode;

    // Track mouse in document space for gaze & card hover
    const onMouseMove = (e: MouseEvent) => {
      const docX = e.clientX + window.scrollX;
      const docY = e.clientY + window.scrollY;
      brain.sim.lookAt({ x: docX, y: docY });

      // If perched on a stalk ledge and cursor hovers that ledge element, playfully swipe or lookFront
      const cl = brain.currentLedge;
      if (cl && cl.behavior === 'stalk') {
        if (docX >= cl.xStart - 20 && docX <= cl.xEnd + 20 && docY >= cl.y - 40 && docY <= cl.y + 180) {
          if (Math.random() < 0.04) brain.notifyCardHover();
        }
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (document.visibilityState === 'visible') {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (mode === 'exiting') {
          brain.sim.update(dt);
        } else {
          brain.update(dt, regRef.current, window.scrollY);
        }
        const f = brain.sim.frame;
        rigRef.current?.renderFrame(f, { darkSurface: brain.darkSurface });

        if (overlayRef.current) {
          const dh = `${regRef.current.docHeight}px`;
          if (overlayRef.current.style.height !== dh) {
            overlayRef.current.style.height = dh;
          }
        }
        if (pillAnchorRef.current) {
          pillAnchorRef.current.style.transform = `translate3d(${Math.round(f.x - 36)}px, ${Math.round(f.y - 94)}px, 0)`;
        }
      } else {
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [active, mode, paused, regRef]);

  useEffect(() => {
    if (mode === 'docked') {
      prevModeRef.current = 'docked';
    }
  }, [mode]);

  if (!active || mode === 'docked' || paused || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      data-testid="stealth-cat-companion"
      className="pointer-events-none absolute top-0 left-0 w-full z-40 overflow-hidden"
      style={{ height: `${regRef.current.docHeight}px` }}
    >
      <StealthCatSideRig
        ref={rigRef}
        className="w-full h-full overflow-visible"
        onCatClick={() => brainRef.current?.handleCatClick()}
        onCatHoverChange={handleCatHover}
      />

      {/* Accessible dismiss pill anchored above the cat (never blocks underlying page buttons) */}
      <div
        ref={pillAnchorRef}
        onMouseEnter={() => handleCatHover(true)}
        onMouseLeave={() => handleCatHover(false)}
        className="pointer-events-none absolute top-0 left-0 select-none"
      >
        <button
          type="button"
          aria-label="Ocultar gatito acompañante"
          title="Ocultar gatito acompañante"
          onClick={(e) => {
            e.stopPropagation();
            catStore.setDismissed(true);
          }}
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/80 text-[#D4F014] border border-[#D4F014]/40 shadow transition-opacity duration-200 cursor-pointer focus:opacity-100 focus:pointer-events-auto ${
            hovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          💤 Descansar
        </button>
      </div>
    </div>,
    document.body,
  );
};
