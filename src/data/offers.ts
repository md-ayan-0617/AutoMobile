import { EditorialOffer } from '../types';

export const EDITORIAL_OFFERS: EditorialOffer[] = [
  {
    id: 'offer-festive',
    title: 'FESTIVE DRIVE EVENT',
    category: 'SEASONAL PROGRAM',
    subtitle: 'BESPOKE COMMISSION INCENTIVE',
    description: 'Experience preferential allocation slots for custom commissions on A9 GT and V12 Grand. Includes complimentary 5-year bespoke scheduled servicing concierge.',
    benefit: 'Complimentary 5-Year Master Concierge Care & Track Day Induction',
    validUntil: '31 DECEMBER 2026',
    eligibility: 'New Commissions & Showroom Allocations',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop',
    tag: 'LIMITED COMMISSION'
  },
  {
    id: 'offer-exchange',
    title: 'EXCHANGE WEEK PRIVILEGE',
    category: 'VALUATION PRIVILEGE',
    subtitle: 'TRANSPARENT CERTIFIED TRADE-IN',
    description: 'Upgrade your performance vehicle to any current-generation Aurelis. Receive premium guaranteed equity valuation verified by our technical inspection directors.',
    benefit: 'Up to ₹ 8,50,000 Trade-In Loyalty Bonus & Direct Valuation Clearance',
    validUntil: '15 NOVEMBER 2026',
    eligibility: 'Owners of Approved Luxury Marques',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    tag: 'VALUATION GUARANTEE'
  },
  {
    id: 'offer-electric',
    title: 'ELECTRIC EXPERIENCE DAYS',
    category: 'FUTURE MOBILITY',
    subtitle: '48-HOUR IMMERSIVE HOME TEST DRIVE',
    description: 'Spend two full days with the Aurelis E7 or S6 Electric. We install a temporary high-power charging hub at your residence or estate for uninterrupted evaluation.',
    benefit: 'Complimentary 48-Hour Extended Residence Loan & Wallbox Included',
    validUntil: 'ONGOING PROGRAM',
    eligibility: 'Subject to VIP Driving Profile Clearance',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    tag: 'EXTENDED TEST DRIVE'
  },
  {
    id: 'offer-service',
    title: 'MASTER SERVICE PACKAGE',
    category: 'AFTERCARE',
    subtitle: 'PREDICTIVE DIAGNOSTICS & TELEMETRY',
    description: 'Complete mechanical overhaul and annual software firmware telemetry calibration at the Aurelis Motor House service hangar.',
    benefit: 'Zero Deduction Scheduled Consumables & Trackside Alignment',
    validUntil: 'ALL YEAR 2026',
    eligibility: 'All Aurelis Motor Vehicles Under 5 Years',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1200&auto=format&fit=crop',
    tag: 'SERVICE CONCIERGE'
  }
];
