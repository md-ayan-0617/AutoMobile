import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#090B0D',
        color: '#F7F8F9',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 'clamp(60px, 8vw, 120px)',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="showroom-container">
        {/* Massive Statement Heading */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'var(--theme-accent)', marginBottom: '16px' }}>
            AURELIS / VALEDICTION
          </div>
          <h2
            className="text-mega"
            style={{
              color: '#F7F8F9',
              maxWidth: '1200px'
            }}
          >
            SEE YOU<br />
            ON THE ROAD.
          </h2>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '48px',
            paddingBottom: '60px'
          }}
        >
          {/* Column 1: Vehicles & Builds */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', letterSpacing: '0.14em', marginBottom: '20px' }}>
              MODELS & CONFIGURATION
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li>
                <Link to="/cars" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  VEHICLE COLLECTION
                </Link>
              </li>
              <li>
                <Link to="/configurator" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  STUDIO CONFIGURATOR
                </Link>
              </li>
              <li>
                <Link to="/pre-owned" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  CERTIFIED PRE-OWNED
                </Link>
              </li>
              <li>
                <Link to="/offers" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  CURRENT COMMISSIONS
                </Link>
              </li>
              <li>
                <Link to="/finance" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  FINANCE & LEASING
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Experiences */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', letterSpacing: '0.14em', marginBottom: '20px' }}>
              EXPERIENCE & SHOWROOM
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li>
                <Link to="/showroom" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  MOTOR HOUSE ARCHITECTURE
                </Link>
              </li>
              <li>
                <Link to="/test-drive" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  BOOK A TEST DRIVE
                </Link>
              </li>
              <li>
                <Link to="/experience" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  CIRCUIT DAYS & TOURS
                </Link>
              </li>
              <li>
                <Link to="/service" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  CLINICAL SERVICE BAY
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', letterSpacing: '0.14em', marginBottom: '20px' }}>
              THE COMPANY
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
              <li>
                <Link to="/about" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  BRAND STORY & HERITAGE
                </Link>
              </li>
              <li>
                <Link to="/careers" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  CAREERS IN PADDOCK
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', color: '#F7F8F9', textDecoration: 'none' }}>
                  LOCATION & VIP CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Data */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', letterSpacing: '0.14em', marginBottom: '20px' }}>
              SHOWROOM OPERATIONS
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.6, color: '#B9BEC3', margin: 0 }}>
              AURELIS MOTOR HOUSE<br />
              VIP Estate Boulevard, Sector 04<br />
              Raipur, CG 492001<br />
              21.2514° N, 81.6296° E
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginTop: '12px' }}>
              MON–SAT: 09:00 — 20:00
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#646C73'
          }}
        >
          <div>
            © {new Date().getFullYear()} AURELIS MOTORS COMPANY. ALL RIGHTS RESERVED.
          </div>

          {/* Explicit demo disclaimer required */}
          <div style={{ maxWidth: '640px', fontSize: '10px', color: '#646C73' }}>
            DEMO DISCLAIMER: Aurelis Motors is an original fictional automotive brand study. All vehicle specifications, model designations, and pricing figures are creative demonstration assets.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#8E959B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              INSTAGRAM <ArrowUpRight size={12} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#8E959B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              YOUTUBE <ArrowUpRight size={12} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#8E959B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              LINKEDIN <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
