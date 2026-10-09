import { create } from 'zustand';

export type CursorVariant = 'default' | 'VIEW' | 'EXPLORE' | 'CONFIGURE' | 'DRIVE' | 'ENTER' | 'GALLERY' | 'PLAY';

interface CursorState {
  variant: CursorVariant;
  text: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: 'default',
  text: '',
  setCursor: (variant, text) => set({ variant, text: text || variant }),
  resetCursor: () => set({ variant: 'default', text: '' })
}));
