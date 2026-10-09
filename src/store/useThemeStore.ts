import { create } from 'zustand';
import { ThemeState } from '../types';

interface ThemeStoreState {
  currentTheme: ThemeState;
  setTheme: (theme: ThemeState) => void;
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  currentTheme: 'showroom',
  setTheme: (theme: ThemeState) => {
    document.documentElement.setAttribute('data-theme', theme);
    set({ currentTheme: theme });
  }
}));
