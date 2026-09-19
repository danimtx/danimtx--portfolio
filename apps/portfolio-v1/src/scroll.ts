import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTopImmediate() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function getScrollPosition(): number {
  return lenisInstance ? lenisInstance.scroll : window.scrollY;
}

export function restoreScrollPosition(position: number) {
  const safe = Math.max(0, position);
  if (lenisInstance) lenisInstance.scrollTo(safe, { immediate: true });
  document.documentElement.scrollTop = safe;
  document.body.scrollTop = safe;
}
