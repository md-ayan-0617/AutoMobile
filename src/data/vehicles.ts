import { Vehicle } from '../types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'aurelis-a9-gt',
    slug: 'a9-gt',
    name: 'AURELIS A9 GT',
    modelCode: 'AML-09GT-26',
    category: 'GT',
    subline: 'GRAND TOURER',
    tagline: 'ENGINEERED FOR THE LONG WAY HOME.',
    editorialDescription:
      'The A9 GT is our definitive Gran Turismo statement. Carved from aerodynamic aluminum-magnesium alloy and tuned for cross-continental composure, it delivers effortless thrust with motorsport precision.',
    price: 18500000,
    formattedPrice: '₹ 1,85,00,000',
    currency: 'INR',
    power: 420,
    torque: 580,
    acceleration: 4.1,
    topSpeed: 285,
    fuelType: 'Twin-Turbo V8',
    driveType: 'AWD',
    images: {
      hero: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop', // Sleek graphite coupe
      front: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop',
      track: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1800&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-graphite', name: 'Deep Graphite', hex: '#1B1F22', metallic: true, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-arctic', name: 'Arctic White', hex: '#EAEFF2', metallic: false, image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-mist', name: 'Silver Mist', hex: '#A8B0B8', metallic: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-blue', name: 'Electric Blue', hex: '#1E50D8', metallic: true, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-orange', name: 'Signal Orange', hex: '#E84A12', metallic: false, image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-forest', name: 'Deep Forest', hex: '#142820', metallic: true, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-21-aero', name: '21" AeroForged Monoblock', size: '21-inch', finish: 'Satin Titanium', priceDelta: 0, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' },
      { id: 'w-22-turbine', name: '22" Directional Turbine', size: '22-inch', finish: 'Diamond Cut Carbon', priceDelta: 450000, image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=800&auto=format&fit=crop' },
      { id: 'w-21-sport', name: '21" Lightweight Multi-Spoke', size: '21-inch', finish: 'Matte Graphite', priceDelta: 280000, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-cognac', name: 'Cognac Saddle Nappa', hex: '#8B4513', material: 'Semi-Aniline Full Grain Leather', description: 'Hand-burnished hide with micro-perforations and open-pore smoked oak inlays.', priceDelta: 320000, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop' },
      { id: 'int-graphite', name: 'Obsidian & Alcantara', hex: '#1A1A1A', material: 'Technical Microfibre & Leather', description: 'Laser-quilted bolsters with anodized aluminum trim and contrast orange stitching.', priceDelta: 0, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop' },
      { id: 'int-ivory', name: 'Glacier Ivory & Slate', hex: '#E6E4DF', material: 'Mineral-Tanned Scandinavian Leather', description: 'Architectural clean aesthetic with brushed nickel tactile switches.', priceDelta: 400000, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      'Adaptive Air Suspension with Predictive Road Scanning',
      'Torque-Vectoring Mechanical Rear Differential',
      'Dual 14.6" Holographic Cockpit Curved Display',
      'Aurelis Bespoke 22-Speaker Studio Acoustics (1,400W)',
      'Active Carbon Aerodynamic Front Splitter & Rear Wing',
      'Matrix Laser Headlamps with 600m Adaptive Beam'
    ],
    specifications: {
      engine: '4.0L Twin-Scroll Twin-Turbo V8',
      power: '420 HP (309 kW) @ 6,250 RPM',
      torque: '580 Nm @ 1,950–5,000 RPM',
      transmission: '8-Speed Dual-Clutch Sequential Transmission',
      drive: 'Intelligent Variable All-Wheel Drive',
      length: '4,890 mm',
      width: '1,965 mm',
      height: '1,380 mm',
      wheelbase: '2,920 mm',
      weight: '1,840 kg',
      bootCapacity: '440 Litres',
      fuelBattery: '80L Petrol Tank (98 RON)',
      range: '740 km (Highway Est.)'
    },
    availability: 'Immediate Delivery',
    soundProfile: {
      type: 'v8-turbo',
      baseFreq: 110,
      description: 'Deep resonant V8 cross-plane bass graduating to a sharp 6,500 RPM metallic bark.'
    },
    featuredOrder: 1
  },
  {
    id: 'aurelis-e7',
    slug: 'e7',
    name: 'AURELIS E7',
    modelCode: 'AML-E700-26',
    category: 'Electric',
    subline: 'ELECTRIC PERFORMANCE SEDAN',
    tagline: 'SILENCE IS THE NEW POWER.',
    editorialDescription:
      'The E7 redefines dynamic luxury through instantaneous digital torque and whisper-silent acoustic architecture. Zero combustion. Infinite composure.',
    price: 16500000,
    formattedPrice: '₹ 1,65,00,000',
    currency: 'INR',
    power: 390,
    torque: 640,
    acceleration: 4.5,
    topSpeed: 250,
    fuelType: 'Electric',
    driveType: 'AWD',
    range: 620,
    batteryCapacity: '102 kWh Lithium-Nickel',
    fastChargeTime: '10–80% in 22 min (350kW DC)',
    images: {
      hero: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1800&auto=format&fit=crop',
      front: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=1400&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-blue', name: 'Electric Glacier Blue', hex: '#2563FF', metallic: true, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-graphite', name: 'Basalt Stealth', hex: '#16191C', metallic: false, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-arctic', name: 'Polar Silver', hex: '#CED4DA', metallic: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-21-ev-aero', name: '21" Flow-Form Aerovane', size: '21-inch', finish: 'Dual-Tone Machined', priceDelta: 0, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' },
      { id: 'w-20-ultra', name: '20" Low-Drag Carbon Fibre', size: '20-inch', finish: 'Exposed Weave', priceDelta: 380000, image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-ivory', name: 'Glacier Recycled Wool & Veg Leather', hex: '#E6E4DF', material: 'Nordic Sustainable Textiles', description: 'Ultra-low carbon footprint cabin with backlit acoustic timber veneer.', priceDelta: 0, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop' },
      { id: 'int-graphite', name: 'Nightshade Carbon', hex: '#1A1A1A', material: 'Recycled Ocean Polymer & Alcantara', description: 'Sculpted bucket seats with inductive cooling and mood luminescent stitching.', priceDelta: 210000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      '800V Ultra-Fast Architecture (350 kW DC Charging)',
      'Sub-0.21 Cd Ultra-Low Drag Aerodynamic Silhouette',
      'Autonomous Valet & Highway Pilot Level 3 ADAS',
      'Steer-by-Wire with Speed-Dependent Variable Ratio',
      'Active Electronic Noise Cancellation Cabin System',
      'Bi-Directional V2L (Vehicle-to-Load) 4.8 kW Power Outlet'
    ],
    specifications: {
      engine: 'Dual Permanent Magnet Synchronous Motors',
      power: '390 HP (287 kW) Combined',
      torque: '640 Nm Instantaneous Torque',
      transmission: 'Single-Speed Direct Planetary Transmission',
      drive: 'e-AWD Intelligent Vectoring',
      length: '4,940 mm',
      width: '1,950 mm',
      height: '1,410 mm',
      wheelbase: '3,000 mm',
      weight: '2,180 kg',
      bootCapacity: '510 Litres + 80L Frunk',
      fuelBattery: '102 kWh High-Density NMC Pack',
      range: '620 km WLTP'
    },
    availability: 'Allocated Build',
    soundProfile: {
      type: 'electric-hyper',
      baseFreq: 240,
      description: 'Futuristic sub-bass frequency harmonic hum synthesized in acoustic real-time.'
    },
    featuredOrder: 2
  },
  {
    id: 'aurelis-r8',
    slug: 'r8',
    name: 'AURELIS R8',
    modelCode: 'AML-R800-26',
    category: 'Sport',
    subline: 'PERFORMANCE COUPÉ',
    tagline: 'BORN ON CIRCUIT. REFINED FOR THE STREET.',
    editorialDescription:
      'A pure mechanical weapon. Dry-sump twin-turbo V8, carbon-tub monocoque, rear-wheel drive aggression, and unfiltered road feedback designed for drivers who demand heart-rate acceleration.',
    price: 24500000,
    formattedPrice: '₹ 2,45,00,000',
    currency: 'INR',
    power: 510,
    torque: 610,
    acceleration: 3.7,
    topSpeed: 310,
    fuelType: 'Twin-Turbo V8',
    driveType: 'RWD',
    images: {
      hero: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1800&auto=format&fit=crop',
      front: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-orange', name: 'Apex Signal Orange', hex: '#FF5A1F', metallic: false, image: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-graphite', name: 'Carbon Matt Black', hex: '#141414', metallic: false, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-silver', name: 'Quicksilver Liquid Metal', hex: '#9CA3AF', metallic: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-20-forged', name: '20" Ultra-Light Forged Magnesium', size: '20-inch', finish: 'Satin Bronze', priceDelta: 520000, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' },
      { id: 'w-20-centerlock', name: '20" Motorsport Centerlock', size: '20-inch', finish: 'Matte Black', priceDelta: 680000, image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-alcantara', name: 'Clubsport Carbon & Alcantara', hex: '#111315', material: 'Full Pre-preg Carbon & Grippy Suede', description: 'FIA-certified lightweight monocoque seats with 4-point harness provisions.', priceDelta: 490000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      'Carbon-Ceramic Braking System with 420mm Front Rotors',
      'Titanium Lightweight Inconel Valved Exhaust System',
      'Electronic 10-Stage Motorsport Traction Control',
      'Roof, Bonnet, and Rear Diffuser in Exposed Twill Carbon',
      'Driver Telemetry Recorder with HD Onboard Cameras'
    ],
    specifications: {
      engine: '4.0L Dry-Sump Twin-Turbo V8',
      power: '510 HP (375 kW) @ 7,200 RPM',
      torque: '610 Nm @ 2,500–6,200 RPM',
      transmission: '7-Speed Quick-Shift Dual-Clutch',
      drive: 'Rear-Wheel Drive with Electronic LSD',
      length: '4,620 mm',
      width: '1,980 mm',
      height: '1,280 mm',
      wheelbase: '2,680 mm',
      weight: '1,530 kg',
      bootCapacity: '280 Litres',
      fuelBattery: '72L Petrol Tank',
      range: '580 km'
    },
    availability: 'Showroom Exclusive',
    soundProfile: {
      type: 'gt-sports',
      baseFreq: 145,
      description: 'Raw high-revving motorsport howl with thunderous upshift ignition cuts.'
    },
    featuredOrder: 3
  },
  {
    id: 'aurelis-x5',
    slug: 'x5',
    name: 'AURELIS X5',
    modelCode: 'AML-X500-26',
    category: 'SUV',
    subline: 'PREMIUM ARCHITECTURAL SUV',
    tagline: 'DOMINANCE WITHOUT NOISE.',
    editorialDescription:
      'Imposing presence sculpted with architectural minimalism. The X5 fuses luxury lounge ergonomics with dual-motor hybrid torque and all-terrain active air suspension.',
    price: 19800000,
    formattedPrice: '₹ 1,98,00,000',
    currency: 'INR',
    power: 350,
    torque: 520,
    acceleration: 5.2,
    topSpeed: 245,
    fuelType: 'Hybrid',
    driveType: 'AWD',
    images: {
      hero: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1800&auto=format&fit=crop',
      front: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-graphite', name: 'Gunmetal Stealth', hex: '#2C3034', metallic: true, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-forest', name: 'Alpine British Green', hex: '#1C3124', metallic: true, image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-arctic', name: 'Chalk White', hex: '#E2E5E8', metallic: false, image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-22-all-terrain', name: '22" Billet Spoke Heavy-Duty', size: '22-inch', finish: 'Shadow Chrome', priceDelta: 0, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-cognac', name: 'Saddle Tan & Brushed Walnut', hex: '#8B4513', material: 'Unfinished Natural Hide', description: 'Executive rear captain seats with calf support and hot-stone massage.', priceDelta: 420000, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      'Multi-Chamber Adaptive Air Suspension (+80mm Lift / -40mm Access)',
      'Rear Wheel Steering (Up to 4.5° Counter-Steer)',
      'Panoramic Electrochromic Smart Glass Roof',
      'Dual 11.6" Rear Passenger Entertainment Ecosystem'
    ],
    specifications: {
      engine: '3.0L Turbo Inline-6 + 100kW Mild Hybrid Motor',
      power: '350 HP (257 kW) Combined',
      torque: '520 Nm @ 1,800–4,500 RPM',
      transmission: '9-Speed Torque Converter Automatic',
      drive: 'Permanent Intelligent AWD with Terrain Modes',
      length: '5,060 mm',
      width: '2,010 mm',
      height: '1,740 mm',
      wheelbase: '3,080 mm',
      weight: '2,320 kg',
      bootCapacity: '760 Litres',
      fuelBattery: '85L Petrol + 18 kWh Battery',
      range: '880 km'
    },
    availability: 'Immediate Delivery',
    soundProfile: {
      type: 'v8-turbo',
      baseFreq: 95,
      description: 'Muffled dignified baritone transitioning to silent electric crawling.'
    },
    featuredOrder: 4
  },
  {
    id: 'aurelis-v12-grand',
    slug: 'v12-grand',
    name: 'AURELIS V12 GRAND',
    modelCode: 'AML-V12G-26',
    category: 'GT',
    subline: 'LUXURY FLAGSHIP GRAND TOURER',
    tagline: 'THE PINNACLE OF MECHANICAL ARTISTRY.',
    editorialDescription:
      'Twelve cylinders singing in harmonic perfection. Unmatched prestige, hand-formed alloy contours, and astronomical grand-touring velocity.',
    price: 36000000,
    formattedPrice: '₹ 3,60,00,000',
    currency: 'INR',
    power: 620,
    torque: 720,
    acceleration: 3.9,
    topSpeed: 330,
    fuelType: 'Naturally Aspirated V12',
    driveType: 'AWD',
    images: {
      hero: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop',
      front: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-graphite', name: 'Nero Monumental', hex: '#0B0D0F', metallic: true, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-silver', name: 'Liquid Sterling Silver', hex: '#C0C5CA', metallic: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-22-v12', name: '22" Multi-Lace Billet Polished', size: '22-inch', finish: 'Hand-Polished Mirror Rim', priceDelta: 750000, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-ivory', name: 'Chantilly Ivory & Hand-Polished Rose Gold', hex: '#F0ECE1', material: 'Bridge of Weir Heritage Leather', description: 'Real open-pore English walnut wood marquetry with analog Swiss chronometer.', priceDelta: 850000, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      'Hand-Assembled 6.5L 60° V12 Engine Signed by Master Builder',
      'Starlight Fibre-Optic Roof Inlay with Configurable Constellations',
      'Power-Closing Acoustic Soft-Close Doors & Laminated Privacy Glass',
      'Analog Chronograph Master Timepiece Integrated into Dashboard'
    ],
    specifications: {
      engine: '6.5L Naturally Aspirated 60-Degree V12',
      power: '620 HP (456 kW) @ 8,500 RPM',
      torque: '720 Nm @ 6,750 RPM',
      transmission: '8-Speed Seamless Shift Sport Automatic',
      drive: 'Permanent Intelligent All-Wheel Drive',
      length: '5,220 mm',
      width: '1,990 mm',
      height: '1,390 mm',
      wheelbase: '3,140 mm',
      weight: '2,050 kg',
      bootCapacity: '480 Litres',
      fuelBattery: '95L Petrol (98/100 RON)',
      range: '620 km'
    },
    availability: 'Showroom Exclusive',
    soundProfile: {
      type: 'v12',
      baseFreq: 180,
      description: 'Symphonic, spine-chilling 12-cylinder crescendo soaring to 8,500 RPM.'
    },
    featuredOrder: 5
  },
  {
    id: 'aurelis-s6-electric',
    slug: 's6-electric',
    name: 'AURELIS S6 ELECTRIC',
    modelCode: 'AML-S600-26',
    category: 'Electric',
    subline: 'ELECTRIC GRAN COUPE',
    tagline: 'LIGHT SCULPTED BY VELOCITY.',
    editorialDescription:
      'Four frameless doors, a dramatic shooting brake roofline, and 480 horsepower of carbon-sleeved electric propulsion. Zero emission tourer for modern pioneers.',
    price: 17200000,
    formattedPrice: '₹ 1,72,00,000',
    currency: 'INR',
    power: 480,
    torque: 690,
    acceleration: 3.8,
    topSpeed: 260,
    fuelType: 'Electric',
    driveType: 'AWD',
    range: 580,
    batteryCapacity: '98 kWh Solid-State Hybrid',
    fastChargeTime: '10–80% in 19 min (400kW DC)',
    images: {
      hero: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1800&auto=format&fit=crop',
      front: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1400&auto=format&fit=crop',
      profile: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1400&auto=format&fit=crop',
      rear: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1400&auto=format&fit=crop',
      interior: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1400&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=80&w=1400&auto=format&fit=crop'
    },
    colors: [
      { id: 'c-blue', name: 'Hyper Electric Cobalt', hex: '#1E60FF', metallic: true, image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-arctic', name: 'Pure Ice Silver', hex: '#D8DEE4', metallic: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1800&auto=format&fit=crop' },
      { id: 'c-graphite', name: 'Midnight Basalt', hex: '#101315', metallic: false, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop' }
    ],
    wheels: [
      { id: 'w-21-s6', name: '21" Blade Aero Carbon Spoke', size: '21-inch', finish: 'Gloss Black Tint', priceDelta: 0, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop' }
    ],
    interiors: [
      { id: 'int-graphite', name: 'Technical Carbon Mesh & Micro-Leather', hex: '#1C1F22', material: 'Recycled Aerogel Weave', description: 'Integrated active headrest monitors with spatial audio zones.', priceDelta: 180000, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1400&auto=format&fit=crop' }
    ],
    features: [
      'Twin High-RPM Carbon-Wrapped Dual Electric Motors',
      'Electronic Active Roll Stabilization (48V EAWS)',
      'Aurelis OS Infotainment with OTA Zero-Lag Architecture',
      'Full Digital Side Mirror Cameras with OLED Displays'
    ],
    specifications: {
      engine: 'Dual High-Speed Synchronous Electric Motors',
      power: '480 HP (353 kW)',
      torque: '690 Nm Immediate Torque',
      transmission: 'Single-Speed Vectoring Transaxle',
      drive: 'Torque-Split Electronic All-Wheel Drive',
      length: '4,880 mm',
      width: '1,940 mm',
      height: '1,375 mm',
      wheelbase: '2,960 mm',
      weight: '2,040 kg',
      bootCapacity: '490 Litres',
      fuelBattery: '98 kWh Solid-State Hybrid Pack',
      range: '580 km WLTP'
    },
    availability: 'Immediate Delivery',
    soundProfile: {
      type: 'electric-hyper',
      baseFreq: 280,
      description: 'Dynamic electromagnetic pulse sound that scales with throttle angle.'
    },
    featuredOrder: 6
  }
];
