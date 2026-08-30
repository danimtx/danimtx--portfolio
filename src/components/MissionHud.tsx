import React, { useEffect, useState } from 'react';
import { type Sector, sectorSignal } from '../sectorSignal';
import { getLenis } from '../scroll';

interface Phase {
  id: Sector;
  num: string;
  name: string;
  altitude: string;
  anchor: string;
}

const PHASES: Phase[] = [
  { id: 'hero', num: '01', name: 'KERNEL / INICIO', altitude: 'SYS ONLINE', anchor: '#hero' },
  { id: 'about', num: '02', name: 'ARQUITECTURA', altitude: 'CLEAN & CQRS', anchor: '#skills' },
  { id: 'projects', num: '03', name: 'SISTEMAS PROD', altitude: '8 DESPLIEGUES', anchor: '#projects' },
  { id: 'achievements', num: '04', name: 'ICPC / LOGROS', altitude: 'TOP 20 BOLIVIA', anchor: '#certificates' },
  { id: 'contact', num: '05', name: 'ENLACE DIRECTO', altitude: 'CANAL ABIERTO', anchor: '#contact' },
];

export const MissionHud: React.FC = () => {
  const [activeSector, setActiveSector] = useState<Sector>(sectorSignal.current);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalH > 0 ? Math.min(100, Math.max(0, (currentScroll / totalH) * 100)) : 0;
      setScrollProgress(progress);
      if (sectorSignal.current !== activeSector) {
        setActiveSector(sectorSignal.current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSector]);

  const scrollToPhase = (anchor: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(anchor, { duration: 1.6, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const el = document.querySelector(anchor);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activePhase = PHASES.find(p => p.id === activeSector) || PHASES[0];

  return (
    <aside className="mission-hud-container" aria-label="Telemetría de Misión Espacial">
      <div className="mission-hud-panel">
        {/* Header HUD */}
        <div className="hud-header">
          <div className="hud-live-dot" />
          <span className="hud-tag">ORBITAL TELEMETRY</span>
        </div>

        {/* Coordenadas / Fase actual */}
        <div className="hud-status-block">
          <div className="hud-label">FASE ACTUAL</div>
          <div className="hud-phase-title">
            <span className="hud-phase-num">{activePhase.num}</span> {activePhase.name}
          </div>
          <div className="hud-altitude">{activePhase.altitude}</div>
        </div>

        {/* Track orbital interactivo */}
        <div className="hud-phases-track">
          <div className="hud-progress-line" style={{ height: `${scrollProgress}%` }} />
          {PHASES.map((p) => {
            const isActive = activeSector === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`hud-node-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => scrollToPhase(p.anchor)}
                aria-label={`Ir a fase ${p.num}: ${p.name}`}
              >
                <span className="hud-node-dot" />
                <span className="hud-node-info">
                  <span className="hud-node-num">{p.num}</span>
                  <span className="hud-node-name">{p.name}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer HUD: Progreso de misión */}
        <div className="hud-footer">
          <div className="hud-progress-bar-bg">
            <div className="hud-progress-bar-fill" style={{ width: `${scrollProgress}%` }} />
          </div>
          <div className="hud-footer-metrics">
            <span>MISIÓN</span>
            <span className="hud-pct">{Math.round(scrollProgress)}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MissionHud;
