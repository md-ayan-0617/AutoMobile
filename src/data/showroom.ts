export interface ShowroomZone {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  specs: string[];
}

export const SHOWROOM_DETAILS = {
  name: 'AURELIS MOTOR HOUSE',
  tagline: 'ARCHITECTURAL SPACE ENGINEERED FOR AUTOMOTIVE REVERENCE.',
  city: 'RAIPUR',
  address: 'Aurelis Motor House, VIP Estate Boulevard, Sector 04, Raipur, CG 492001',
  phone: '+91 771 940 8800',
  email: 'concierge@aurelismotors.com',
  coordinates: '21.2514° N, 81.6296° E',
  hours: [
    { days: 'Monday – Saturday', time: '09:00 – 20:00' },
    { days: 'Sunday', time: '10:00 – 18:00' }
  ],
  serviceHours: [
    { days: 'Monday – Friday', time: '08:00 – 18:00' },
    { days: 'Saturday', time: '09:00 – 15:00' }
  ],
  zones: [
    {
      id: 'z-facade',
      name: 'ARCHITECTURAL FACADE',
      subtitle: 'CAST CONCRETE & ULTRA-CLEAR LOW-IRON STRUCTURAL GLASS',
      description: 'A 28-meter floating cantilever roof housing panoramic glass vistas, designed to bathe display automobiles in pure natural northern daylight.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      specs: ['1,800 m² Footprint', 'Cast Concrete Monolith', 'High-Clearance Glass']
    },
    {
      id: 'z-floor',
      name: 'MAIN VEHICLE FLOOR',
      subtitle: 'POLISHED TERRAZZO & CONTROLLED STUDIO FLOODLIGHTING',
      description: 'Circular exhibition pods engineered with custom diffuse light canopies to illuminate sculptural automotive metal without harsh glare.',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
      specs: ['8 Vehicle Turntables', 'Acoustic Ceiling Baffles', 'Zero-Reflective Floor']
    },
    {
      id: 'z-studio',
      name: 'CONFIGURATION STUDIO',
      subtitle: 'TACTILE MATERIAL WALLS & HAPTIC COLOUR CONSOLE',
      description: 'Physical samples of all 24 hand-finished leathers, real woven carbon twills, open-pore woods, and precision machined alloy switchgear.',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
      specs: ['36 Physical Swatches', '4K Ultra-Wide Visualizer', 'Espresso Lounge']
    },
    {
      id: 'z-lounge',
      name: 'PRIVATE DELIVERY LOUNGE',
      subtitle: 'CURATED LIGHT REVEAL & AUDIO CELEBRATION',
      description: 'An acoustic sanctuary where new owners take delivery of their bespoke commission under timed theatrical spotlight sequences.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      specs: ['Theatrical Light Choreography', 'Climate Controlled', 'Champagne Bar']
    },
    {
      id: 'z-hangar',
      name: 'CLINICAL SERVICE BAY',
      subtitle: 'MOTORSPORT-SPEC HEPA DIAGNOSTIC HANGAR',
      description: 'A hospital-grade clinical workshop where master technicians conduct telemetry audits and mechanical restorations in spotless environments.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop',
      specs: ['Air-Conditioned Bays', 'Laser Wheel Alignment', '350kW DC Fast Hub']
    }
  ]
};
