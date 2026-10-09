import { create } from 'zustand';

interface CompareState {
  vehicleIds: string[];
  isOpen: boolean;
  addVehicle: (id: string) => void;
  removeVehicle: (id: string) => void;
  clearAll: () => void;
  toggleDrawer: () => void;
  setOpen: (open: boolean) => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  vehicleIds: ['aurelis-a9-gt', 'aurelis-e7'],
  isOpen: false,
  addVehicle: (id: string) => {
    const current = get().vehicleIds;
    if (current.includes(id)) return;
    if (current.length >= 3) {
      // Keep max 3
      set({ vehicleIds: [...current.slice(1), id] });
    } else {
      set({ vehicleIds: [...current, id] });
    }
  },
  removeVehicle: (id: string) => {
    set({ vehicleIds: get().vehicleIds.filter((item) => item !== id) });
  },
  clearAll: () => set({ vehicleIds: [] }),
  toggleDrawer: () => set({ isOpen: !get().isOpen }),
  setOpen: (open: boolean) => set({ isOpen: open })
}));
