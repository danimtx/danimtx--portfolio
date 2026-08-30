export type Sector = 'hero' | 'about' | 'projects' | 'achievements' | 'contact';

export const sectorSignal = {
  current: 'hero' as Sector,
};

// Velocidad instantánea de scroll (escrita por Lenis en App.tsx) para efectos de "warp"
export const scrollSignal = {
  velocity: 0,
};

// Posición normalizada del puntero (-1..1) para que los mundos hagan parallax en vivo
export const pointerSignal = {
  x: 0,
  y: 0,
};

// Qué sección de contenido está bajo el cursor (hover) → los mundos reaccionan
export const hoverSignal = {
  sector: null as Sector | null,
};

// Qué card de proyecto tiene el hover → el astronauta "mira" hacia ella
export const cardHoverSignal = {
  index: -1, // -1 = ninguna
  x: 0,      // posición normalizada X del centro de la card (-1..1)
  y: 0,      // posición normalizada Y del centro de la card (-1..1)
};

// Devuelve la fila de proyecto cuyo centro está más cerca del centro del viewport
// (índice real del DOM) y su coordenada Y de mundo. Así el astronauta acompaña a la
// card realmente visible: aunque una card sea más larga que otra, el zig-zag no se
// desincroniza con las de abajo.
export function getProjectAnchor(): { index: number; y: number } {
  const rows = Array.from(document.querySelectorAll('#projects .project-row')) as HTMLElement[];
  if (!rows.length) return { index: 0, y: 0 };
  const vh = window.innerHeight;
  const vhCenter = vh / 2;
  let best = 0;
  let bestDist = Infinity;
  rows.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const dist = Math.abs(r.top + r.height / 2 - vhCenter);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  const rect = rows[best].getBoundingClientRect();
  const visibleH = 2 * Math.tan((50 / 2) * (Math.PI / 180)) * 7; // ≈ 6.53
  const cyPx = rect.top + rect.height / 2 - vhCenter;
  return { index: best, y: -((cyPx / vhCenter) * (visibleH / 2)) };
}

export function getSectorProgress(sector: Sector): number {
  const el = document.querySelector(`[data-sector="${sector}"]`);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const totalHeight = rect.height;
  const visibleTop = Math.max(0, -rect.top);
  return Math.min(1, Math.max(0, visibleTop / (totalHeight * 0.8 || 1)));
}

// Convierte el centro del bloque de contenido de una sección a coordenada Y de mundo
// (cámara real: position [0,0,7], fov 50 → altura visible ≈ 6.53 unidades).
// El astronauta se ancla "al lado" del bloque que se está leyendo.
export function getAnchorY(sector: Sector): number {
  const el = document.querySelector(`[data-sector="${sector}"] .anchor3d`);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const visibleH = 2 * Math.tan((50 / 2) * (Math.PI / 180)) * 7; // ≈ 6.53
  const cyPx = rect.top + rect.height / 2 - vh / 2;
  return -((cyPx / (vh / 2)) * (visibleH / 2));
}
