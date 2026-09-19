export type Sector = 'hero' | 'about' | 'projects' | 'achievements' | 'contact';

export const sectorSignal = {
  current: 'hero' as Sector,
};

// Velocidad instantánea de scroll (escrita por Lenis en App.tsx) para efectos de transición
export const scrollSignal = {
  velocity: 0,
};

// Posición normalizada del puntero (-1..1) para efectos interactivos
export const pointerSignal = {
  x: 0,
  y: 0,
};

// Qué sección de contenido está bajo el cursor
export const hoverSignal = {
  sector: null as Sector | null,
};

export function getSectorProgress(sector: Sector): number {
  const el = document.querySelector(`[data-sector="${sector}"]`);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const totalHeight = rect.height;
  const visibleTop = Math.max(0, -rect.top);
  return Math.min(1, Math.max(0, visibleTop / (totalHeight * 0.8 || 1)));
}
