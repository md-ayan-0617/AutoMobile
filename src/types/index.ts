export type VehicleCategory = 'GT' | 'Sport' | 'Sedan' | 'SUV' | 'Electric';

export type FuelType = 'Electric' | 'Hybrid' | 'Twin-Turbo V8' | 'Naturally Aspirated V12';

export type DriveType = 'AWD' | 'RWD';

export interface VehicleColorOption {
  id: string;
  name: string;
  hex: string;
  metallic: boolean;
  image: string;
}

export interface VehicleWheelOption {
  id: string;
  name: string;
  size: string;
  finish: string;
  image: string;
  priceDelta: number;
}

export interface VehicleInteriorOption {
  id: string;
  name: string;
  hex: string;
  material: string;
  description: string;
  image: string;
  priceDelta: number;
}

export interface VehicleSoundProfile {
  type: 'v12' | 'v8-turbo' | 'electric-hyper' | 'gt-sports';
  baseFreq: number;
  description: string;
}

export interface VehicleSpecs {
  engine: string;
  power: string;
  torque: string;
  transmission: string;
  drive: string;
  length: string;
  width: string;
  height: string;
  wheelbase: string;
  weight: string;
  bootCapacity: string;
  fuelBattery: string;
  range: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  modelCode: string;
  category: VehicleCategory;
  subline: string;
  tagline: string;
  editorialDescription: string;
  price: number;
  formattedPrice: string;
  currency: string;
  power: number; // HP
  torque: number; // NM
  acceleration: number; // 0-100 in sec
  topSpeed: number; // KM/H
  fuelType: FuelType;
  driveType: DriveType;
  range?: number; // KM if electric
  batteryCapacity?: string;
  fastChargeTime?: string;
  images: {
    hero: string;
    front: string;
    profile: string;
    rear: string;
    interior: string;
    detail: string;
    track?: string;
  };
  colors: VehicleColorOption[];
  wheels: VehicleWheelOption[];
  interiors: VehicleInteriorOption[];
  features: string[];
  specifications: VehicleSpecs;
  availability: 'Immediate Delivery' | 'Allocated Build' | 'Showroom Exclusive';
  soundProfile: VehicleSoundProfile;
  featuredOrder: number;
}

export interface CertifiedPreOwnedVehicle {
  id: string;
  vehicleId: string;
  name: string;
  modelCode: string;
  year: number;
  mileage: number;
  fuelType: FuelType;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  price: number;
  formattedPrice: string;
  inspectionPoints: number;
  warrantyMonths: number;
  location: string;
  image: string;
  certificationId: string;
}

export interface EditorialOffer {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  benefit: string;
  validUntil: string;
  eligibility: string;
  image: string;
  tag: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: 'Design' | 'Engineering' | 'Showroom & Concierge' | 'Motorsport' | 'Operations';
  location: string;
  type: 'Full-time' | 'Fellowship';
  experience: string;
  description: string;
  responsibilities: string[];
}

export interface TestDriveSubmission {
  fullName: string;
  phone: string;
  email: string;
  vehicleSlug: string;
  preferredDate: string;
  preferredTime: string;
  experienceCenter: string;
  licenseConfirmed: boolean;
  specialRequests?: string;
}

export type ThemeState = 'showroom' | 'performance' | 'electric' | 'night-drive';
