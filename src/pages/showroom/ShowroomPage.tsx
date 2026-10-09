import React, { useState, useRef } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Calendar, Check, ExternalLink } from 'lucide-react';
import { SHOWROOM_DETAILS } from '../../data/showroom';
import { SafeImage } from '../../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const ShowroomPage: React.FC = () => {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const activeZone = SHOWROOM_DETAILS.zones[activeZoneIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.showroom-fade-in', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });

  return (
    <div ref={containerRef} className="showroom-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Page Header */}
        <div className="showroom-fade-in" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            PHYSICAL DESTINATION // FLAGSHIP ARCHITECTURE
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            COME SEE<br />
            WHAT'S NEXT.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', color: 'var(--theme-text-secondary)', maxWidth: '800px', margin: 0 }}>
            {SHOWROOM_DETAILS.tagline}
          </p>
        </div>

        {/* Large Architectural Hero Image */}
        <div
          className="showroom-fade-in"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(360px, 54vh, 640px)',
            backgroundColor: '#111417',
            border: '1px solid var(--theme-border)',
            overflow: 'hidden',
            marginBottom: '60px'
          }}
        >
          <SafeImage
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1800&auto=format&fit=crop"
            alt="Aurelis Motor House Facade"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              backgroundColor: 'rgba(17,20,23,0.88)',
              backdropFilter: 'blur(10px)',
              padding: '20px 24px',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              color: '#F7F8F9'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)' }}>
                COORDINATES: {SHOWROOM_DETAILS.coordinates}
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700 }}>
                {SHOWROOM_DETAILS.name} // {SHOWROOM_DETAILS.city}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/test-drive" className="btn-aurelis" style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}>
                SCHEDULE VISIT
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Zone Walkthrough Tabs */}
        <div className="showroom-fade-in" style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="hud-tag" style={{ marginBottom: '8px' }}>EXPLORE THE ZONES</div>
              <h2 className="text-h2" style={{ margin: 0 }}>ARCHITECTURAL SPACES</h2>
            </div>

            {/* Zone Selector Pills */}
            <div role="tablist" aria-label="Showroom Zones" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SHOWROOM_DETAILS.zones.map((zone, idx) => (
                <button
                  key={zone.id}
                  role="tab"
                  aria-selected={activeZoneIndex === idx}
                  aria-controls={`zone-panel-${zone.id}`}
                  onClick={() => setActiveZoneIndex(idx)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    padding: '8px 14px',
                    backgroundColor: activeZoneIndex === idx ? 'var(--theme-accent)' : 'var(--theme-surface)',
                    color: activeZoneIndex === idx ? '#FFF' : 'var(--theme-text)',
                    border: '1px solid var(--theme-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  0{idx + 1} {zone.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Zone Display */}
          <div
            id={`zone-panel-${activeZone.id}`}
            role="tabpanel"
            className="layout-grid-12 aurelis-card"
            style={{
              padding: 'clamp(20px, 3vw, 40px)',
              alignItems: 'center'
            }}
          >
            <div className="col-7 img-zoom-parent" style={{ height: 'clamp(280px, 40vh, 420px)', border: '1px solid var(--theme-border)' }}>
              <SafeImage src={activeZone.image} alt={activeZone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.14em' }}>
                ZONE 0{activeZoneIndex + 1} OF 05
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, margin: 0 }}>
                {activeZone.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                {activeZone.subtitle}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: 'var(--theme-text-secondary)', margin: 0 }}>
                {activeZone.description}
              </p>

              <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {activeZone.specs.map((sp, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      border: '1px solid var(--theme-border)'
                    }}
                  >
                    ✓ {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location & Architectural Vector Map */}
        <div className="layout-grid-12 showroom-fade-in" style={{ borderTop: '1px solid var(--theme-border)', paddingTop: '60px' }}>
          {/* Left: Info */}
          <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>DISPATCH & ACCESS</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, margin: '0 0 12px' }}>
                FIND THE MOTOR HOUSE
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Located in Sector 04, VIP Estate Boulevard. Valet reception available at the main porte-cochère. Private helipad coordinates available upon prior concierge arrangement.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--theme-card-bg)', padding: '20px', border: '1px solid var(--theme-border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
                OPERATING TIMINGS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.8 }}>
                MON–SAT: 09:00 — 20:00<br />
                SUNDAY: 10:00 — 18:00 (Private Appointments Only)<br />
                SERVICE BAY: 08:00 — 18:00
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text-secondary)' }}>
                DIRECT VIP DESK: <strong style={{ color: 'var(--theme-text)' }}>{SHOWROOM_DETAILS.phone}</strong>
              </div>
            </div>
          </div>

          {/* Right: Architectural Vector Map */}
          <div
            className="col-7"
            style={{
              height: 'clamp(320px, 45vh, 420px)',
              backgroundColor: '#111417',
              border: '1px solid var(--theme-border)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F7F8F9'
            }}
          >
            {/* Minimal SVG Blueprint Map */}
            <svg viewBox="0 0 600 400" aria-label="Architectural Showroom Blueprint Map" style={{ width: '100%', height: '100%', opacity: 0.75 }}>
              <rect width="600" height="400" fill="#111417" />
              {/* Grid Lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {/* Road vectors */}
              <path d="M 0 220 Q 250 200, 320 200 T 600 180" fill="none" stroke="#2563FF" strokeWidth="3" />
              <path d="M 320 0 L 320 400" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="6 4" />
              {/* Showroom Marker Pin */}
              <circle cx="320" cy="200" r="16" fill="rgba(37,99,255,0.25)" />
              <circle cx="320" cy="200" r="8" fill="#2563FF" />
              <circle cx="320" cy="200" r="3" fill="#FFFFFF" />
            </svg>

            {/* Overlay Map Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(0,0,0,0.85)',
                padding: '12px 18px',
                border: '1px solid var(--theme-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#FFF'
              }}
            >
              <div style={{ color: 'var(--theme-accent)', fontWeight: 600 }}>AURELIS MOTOR HOUSE PIN</div>
              <div style={{ color: '#8E959B', fontSize: '10px' }}>VIP Estate Blvd, Raipur (Demo Map)</div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#646C73'
              }}
            >
              *Interactive architectural location map representation. Fictional demo showroom.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
