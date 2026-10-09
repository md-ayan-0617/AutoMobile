import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react';
import { SafeImage } from '../ui/SafeImage';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  {
    num: '01',
    label: 'CARS',
    path: '/cars',
    previewImage: '/images/hero_car_graphite.jpg',
    caption: 'ALL CURRENT PRODUCTION MODELS & COMMISSIONS'
  },
  {
    num: '02',
    label: 'CONFIGURATOR',
    path: '/configurator',
    previewImage: '/images/configuration_studio.jpg',
    caption: 'BESPOKE 3D VEHICLE STUDIO & MATERIAL CUSTOMIZER'
  },
  {
    num: '03',
    label: 'SHOWROOM',
    path: '/showroom',
    previewImage: '/images/showroom_facade.jpg',
    caption: 'ARCHITECTURAL MOTOR HOUSE & EXHIBITION SPACES'
  },
  {
    num: '04',
    label: 'TEST DRIVE',
    path: '/test-drive',
    previewImage: '/images/night_drive.jpg',
    caption: 'RESERVE AN UNRESTRICTED DYNAMIC ROAD EVALUATION'
  },
  {
    num: '05',
    label: 'OFFERS',
    path: '/offers',
    previewImage: '/images/performance_circuit.jpg',
    caption: 'EXCLUSIVE COMMISSION INCENTIVES & VALUATION PRIVILEGES'
  },
  {
    num: '06',
    label: 'PRE-OWNED',
    path: '/pre-owned',
    previewImage: '/images/car_a9_gt.jpg',
    caption: '100+ POINT INSPECTED CERTIFIED PROVENANCE CARS'
  },
  {
    num: '07',
    label: 'EXPERIENCE',
    path: '/experience',
    previewImage: '/images/performance_circuit.jpg',
    caption: 'ALPINE ROAD TOURS, TRACK PROVING DAYS & SALONS'
  },
  {
    num: '08',
    label: 'FINANCE',
    path: '/finance',
    previewImage: '/images/design_interior.jpg',
    caption: 'TRANSPARENT BESPOKE LEASING & EMI CALCULATOR'
  },
  {
    num: '09',
    label: 'SERVICE',
    path: '/service',
    previewImage: '/images/service_bay.jpg',
    caption: 'CLINICAL HEPA WORKSHOP & TELEMETRY DIAGNOSTICS'
  },
  {
    num: '10',
    label: 'ABOUT',
    path: '/about',
    previewImage: '/images/configuration_studio.jpg',
    caption: 'THE HERITAGE OF EMOTION & PRECISION ENGINEERING'
  },
  {
    num: '11',
    label: 'CAREERS',
    path: '/careers',
    previewImage: '/images/electric_car.jpg',
    caption: 'SHAPE NEXT-GENERATION AUTOMOTIVE ARCHITECTURE'
  },
  {
    num: '12',
    label: 'CONTACT',
    path: '/contact',
    previewImage: '/images/showroom_lounge.jpg',
    caption: 'CONNECT DIRECTLY WITH THE VIP MOTOR HOUSE CONCIERGE'
  }
];

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState(MENU_ITEMS[0]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#111417',
        color: '#F7F8F9',
        zIndex: 9995,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      {/* Top Header Row inside Menu */}
      <div
        className="showroom-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '84px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <line x1="22" y1="80" x2="50" y2="20" stroke="#F7F8F9" strokeWidth="9" />
            <line x1="78" y1="80" x2="50" y2="20" stroke="#F7F8F9" strokeWidth="9" />
            <line x1="32" y1="58" x2="68" y2="58" stroke="#2563FF" strokeWidth="7" />
            <rect x="52" y="32" width="8" height="8" fill="#FF5A1F" />
          </svg>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.12em' }}>
              AURELIS
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', color: '#8E959B' }}>
              EDITORIAL ARCHIVE
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close mega menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: '#F7F8F9',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 18px',
            cursor: 'pointer',
            backgroundColor: 'transparent'
          }}
        >
          <span>CLOSE</span>
          <X size={16} />
        </button>
      </div>

      {/* 3-Column Magazine Spread */}
      <div
        className="showroom-container megamenu-grid"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(20px, 3vw, 40px)',
          paddingTop: '32px',
          paddingBottom: '40px'
        }}
      >
        {/* Left Column: Nav List */}
        <div
          className="megamenu-links-col"
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto'
          }}
        >
          {MENU_ITEMS.map((item) => {
            const isHovered = activeItem.label === item.label;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                onMouseEnter={() => setActiveItem(item)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  transition: 'padding-left 0.25s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: isHovered ? 'var(--theme-accent)' : '#5F666B'
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(20px, 2.4vw, 36px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: isHovered ? '#FFFFFF' : '#8E959B',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item.label}
                </span>
                {isHovered && <ArrowUpRight size={18} color="var(--theme-accent)" style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </div>

        {/* Center Column: Dynamic Vehicle Image */}
        <div
          className="megamenu-preview-col"
          style={{
            gridColumn: 'span 4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '360px',
              backgroundColor: '#16191C',
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}
          >
            <SafeImage
              src={activeItem.previewImage}
              alt={activeItem.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(9,11,13,0.95) 0%, transparent 60%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)', letterSpacing: '0.14em' }}>
                DIRECT VIEW / {activeItem.num}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, color: '#FFF', marginTop: '2px' }}>
                {activeItem.label}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#8E959B', marginTop: '4px' }}>
                {activeItem.caption}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timings & Architectural Coordinates */}
        <div
          className="megamenu-info-col"
          style={{
            gridColumn: 'span 3',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: '24px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
              <Clock size={14} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em' }}>TODAY'S OPERATIONS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8E959B' }}>SHOWROOM</span>
                <span style={{ color: '#FFF' }}>09:00 — 20:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8E959B' }}>SERVICE HANGAR</span>
                <span style={{ color: '#FFF' }}>08:00 — 18:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8E959B' }}>TEST DRIVES</span>
                <span style={{ color: '#FFF' }}>10:00 — 19:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8E959B' }}>SATURDAY</span>
                <span style={{ color: '#FFF' }}>09:00 — 21:00</span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
              <MapPin size={14} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em' }}>LOCATION</span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B9BEC3', lineHeight: 1.5 }}>
              Aurelis Motor House<br />
              VIP Estate Boulevard, Sector 04<br />
              Raipur, CG 492001
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#5F666B', marginTop: '4px' }}>
              COORDINATES: 21.2514° N, 81.6296° E
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
              <Phone size={14} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em' }}>VIP CONCIERGE</span>
            </div>
            <a
              href="tel:+917719408800"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#FFF', textDecoration: 'none' }}
            >
              +91 771 940 8800
            </a>
          </div>
        </div>
      </div>

      {/* Responsive media styling for MegaMenu */}
      <style>{`
        @media (max-width: 960px) {
          .megamenu-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 28px !important;
          }
          .megamenu-links-col {
            width: 100% !important;
          }
          .megamenu-preview-col {
            display: none !important;
          }
          .megamenu-info-col {
            width: 100% !important;
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.1) !important;
            padding-top: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};
