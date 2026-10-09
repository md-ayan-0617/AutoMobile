import { create } from 'zustand';
import { VEHICLES } from '../data/vehicles';
import { Vehicle, VehicleColorOption, VehicleWheelOption, VehicleInteriorOption } from '../types';

export interface TrimOption {
  id: string;
  name: string;
  priceDelta: number;
  description: string;
  specs: string[];
}

export const TRIM_OPTIONS: TrimOption[] = [
  {
    id: 'trim-standard',
    name: 'PURSUIT SPECIFICATION',
    priceDelta: 0,
    description: 'The pure baseline engineering balance with passive aero elements and sport dynamics.',
    specs: ['Standard Aero Package', 'Monoblock Calipers', 'Aurelis Dynamic Sound']
  },
  {
    id: 'trim-track',
    name: 'CORSA COMPETITION PACK',
    priceDelta: 950000,
    description: 'Carbon-ceramic braking rotors, active downforce wing, titanium sports exhaust, and telemetry app.',
    specs: ['Carbon-Ceramic Braking', 'Active Aero Wing', 'Titanium Valved Exhaust']
  },
  {
    id: 'trim-luxury',
    name: 'ATELIER COMMISSION PACK',
    priceDelta: 1250000,
    description: 'Double acoustic privacy glazing, 22-speaker spatial concert audio, illuminated sill treadplates, and full luggage set.',
    specs: ['22-Speaker Bespoke Sound', 'Acoustic Double Glazing', 'Matching Hide Luggage Suite']
  }
];

interface ConfiguratorState {
  currentStep: number;
  selectedVehicle: Vehicle;
  selectedColor: VehicleColorOption;
  selectedWheel: VehicleWheelOption;
  selectedInterior: VehicleInteriorOption;
  selectedTrim: TrimOption;
  estimatedPrice: number;
  setStep: (step: number) => void;
  setVehicle: (vehicleId: string) => void;
  setColor: (color: VehicleColorOption) => void;
  setWheel: (wheel: VehicleWheelOption) => void;
  setInterior: (interior: VehicleInteriorOption) => void;
  setTrim: (trim: TrimOption) => void;
  calculateTotal: () => number;
}

const defaultVehicle = VEHICLES[0];

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 1,
  selectedVehicle: defaultVehicle,
  selectedColor: defaultVehicle.colors[0],
  selectedWheel: defaultVehicle.wheels[0],
  selectedInterior: defaultVehicle.interiors[0],
  selectedTrim: TRIM_OPTIONS[0],
  estimatedPrice: defaultVehicle.price,

  setStep: (step: number) => set({ currentStep: step }),

  setVehicle: (vehicleId: string) => {
    const v = VEHICLES.find((item) => item.id === vehicleId) || defaultVehicle;
    set({
      selectedVehicle: v,
      selectedColor: v.colors[0],
      selectedWheel: v.wheels[0],
      selectedInterior: v.interiors[0],
      selectedTrim: TRIM_OPTIONS[0],
      estimatedPrice: v.price + v.wheels[0].priceDelta + v.interiors[0].priceDelta
    });
  },

  setColor: (color: VehicleColorOption) => set({ selectedColor: color }),

  setWheel: (wheel: VehicleWheelOption) => {
    set({ selectedWheel: wheel });
    const total = get().calculateTotal();
    set({ estimatedPrice: total });
  },

  setInterior: (interior: VehicleInteriorOption) => {
    set({ selectedInterior: interior });
    const total = get().calculateTotal();
    set({ estimatedPrice: total });
  },

  setTrim: (trim: TrimOption) => {
    set({ selectedTrim: trim });
    const total = get().calculateTotal();
    set({ estimatedPrice: total });
  },

  calculateTotal: () => {
    const state = get();
    return (
      state.selectedVehicle.price +
      (state.selectedWheel?.priceDelta || 0) +
      (state.selectedInterior?.priceDelta || 0) +
      (state.selectedTrim?.priceDelta || 0)
    );
  }
}));
