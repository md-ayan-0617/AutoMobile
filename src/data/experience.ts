export interface ExperienceStory {
  id: string;
  tag: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  quote: string;
  stats: { label: string; value: string }[];
}

export const EXPERIENCES: ExperienceStory[] = [
  {
    id: 'exp-alpine-tour',
    tag: 'ANNUAL EXPEDITION',
    title: 'THE ALPINE ESCARPMENT TOUR',
    date: 'OCTOBER 2026',
    location: 'WESTERN GHATS & MOUNTAIN PASSES',
    description: 'Four days traversing 1,400 kilometres of technical switchbacks, misty ridge ascents, and high-velocity plateau straights with our performance convoy.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200&auto=format&fit=crop',
    quote: '"At 6,000 feet with the road unspooling into the mist, the A9 GT felt less like a machine and more like an extension of breath."',
    stats: [
      { label: 'Total Distance', value: '1,420 km' },
      { label: 'Elevation Gain', value: '2,650 m' },
      { label: 'Participating Aurelis', value: '18 Vehicles' }
    ]
  },
  {
    id: 'exp-track-day',
    tag: 'CLOSED CIRCUIT',
    title: 'CIRCUIT PROVING SESSIONS',
    date: 'DECEMBER 2026',
    location: 'FORMULA 1 HOMOLOGATED CIRCUIT',
    description: 'Unrestricted throttle telemetry under the direct instruction of championship endurance racers. Master trail-braking, apex throttle balance, and high-speed aero compression.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    quote: '"You do not know what 510 horsepower can do until you brake at the 100-meter marker at 270 km/h and feel the aero bite."',
    stats: [
      { label: 'Top Track Velocity', value: '298 km/h' },
      { label: 'Max Lateral G', value: '1.42 G' },
      { label: 'Telemetry Sensors', value: '64 Channels' }
    ]
  },
  {
    id: 'exp-design-nights',
    tag: 'STUDIO GATHERING',
    title: 'AURELIS DESIGN SALON',
    date: 'QUARTERLY GATHERING',
    location: 'RAIPUR MOTOR HOUSE ATRIUM',
    description: 'Intimate evening symposiums where our chief styling architects dissect clay models, material tactile ethics, and future powertrain ergonomics over curated tasting menus.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    quote: '"Luxury in 2026 is not decoration. Luxury is the absolute elimination of the unnecessary."',
    stats: [
      { label: 'Guest Capacity', value: '45 Patrons' },
      { label: 'Clay Models Unveiled', value: '2 Concepts' },
      { label: 'Atmosphere', value: 'Acoustic Minimal' }
    ]
  }
];
