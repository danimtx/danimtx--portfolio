/**
 * catStore.ts
 * Zero-overhead external store synchronizing StealthCat3D (Hero) and StealthCatCompanion.
 */
import { useSyncExternalStore } from 'react';

export type CatMode = 'docked' | 'exiting' | 'roaming' | 'returning';

export interface CatStoreState {
  mode: CatMode;
  paused: boolean;
  dismissed: boolean;
}

const STORAGE_KEY = 'catCompanion:dismissed';

const readDismissed = (): boolean => {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

let state: CatStoreState = {
  mode: 'docked',
  paused: false,
  dismissed: readDismissed(),
};

const listeners = new Set<() => void>();

const emit = () => {
  for (const l of listeners) l();
};

export const catStore = {
  getState: (): CatStoreState => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setMode: (mode: CatMode) => {
    if (state.mode === mode) return;
    state = { ...state, mode };
    emit();
  },
  setPaused: (paused: boolean) => {
    if (state.paused === paused) return;
    state = { ...state, paused };
    emit();
  },
  setDismissed: (dismissed: boolean) => {
    if (state.dismissed === dismissed) return;
    state = { ...state, dismissed, mode: dismissed ? 'docked' : state.mode };
    try {
      if (typeof window !== 'undefined') {
        if (dismissed) window.localStorage.setItem(STORAGE_KEY, '1');
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
    emit();
  },
};

export const useCatStore = (): CatStoreState =>
  useSyncExternalStore(catStore.subscribe, catStore.getState, catStore.getState);
