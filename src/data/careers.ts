import { CareerRole } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'role-aero-engineer',
    title: 'Lead Aerodynamics Specialist',
    department: 'Engineering',
    location: 'Design Studio & Paddock',
    type: 'Full-time',
    experience: '6+ Years Automotive / Aerospace CFD',
    description: 'Spearhead our computational fluid dynamics research and wind-tunnel aero surface packaging for next-generation electric hyper-coupes.',
    responsibilities: [
      'Orchestrate 3D surface aerodynamic optimization using advanced CFD solvers',
      'Bridge active aerodynamic wing design with thermal cooling ducting',
      'Validate scale models in wind tunnels and physical proving grounds'
    ]
  },
  {
    id: 'role-cxf-designer',
    title: 'Senior Interior Ergonomist & CMF Designer',
    department: 'Design',
    location: 'Aurelis Styling Studio',
    type: 'Full-time',
    experience: '5+ Years Luxury Industrial Design',
    description: 'Curate tactile textiles, sustainable leather alternatives, machined alloy haptics, and human-centric driving cockpits.',
    responsibilities: [
      'Develop color, material, and finish (CMF) palettes aligned with architectural minimalism',
      'Design switchgear feedback resistance, rotary knurling, and physical dials',
      'Collaborate directly with master leather upholsterers and composite weavers'
    ]
  },
  {
    id: 'role-concierge-director',
    title: 'VIP Client Commission Concierge',
    department: 'Showroom & Concierge',
    location: 'Raipur Motor House Flagship',
    type: 'Full-time',
    experience: '4+ Years Ultra-Luxury Client Advisory',
    description: 'Accompany patrons through their bespoke vehicle specification journey, from private design studio consultations to trackside delivery ceremonies.',
    responsibilities: [
      'Lead bespoke consultation appointments in the Configuration Studio',
      'Coordinate special paint-to-sample and interior monogram commissions',
      'Curate track day invitations and private unveiling access for patrons'
    ]
  },
  {
    id: 'role-firmware-lead',
    title: 'High-Voltage Powertrain Firmware Architect',
    department: 'Engineering',
    location: 'Tech Hub',
    type: 'Full-time',
    experience: '7+ Years Embedded EV Systems',
    description: 'Engineer low-latency torque vectoring algorithms, 800V DC thermal management logic, and OTA vehicle architecture.',
    responsibilities: [
      'Architect real-time motor control loops for four-corner torque vectoring',
      'Develop battery longevity predictive algorithms under aggressive track stress',
      'Maintain ISO 26262 ASIL-D functional safety compliance'
    ]
  }
];
