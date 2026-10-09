import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Cpu, ArrowRight } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { SafeImage } from '../../components/ui/SafeImage';
import { PerformanceMeter } from '../../components/motion/PerformanceMeter';
import { EngineSoundPreview } from '../../components/motion/EngineSoundPreview';
import { useCompareStore } from '../../store/useCompareStore';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { useGsapContext, gsap } from '../../utils/gsap';

export const CarDetailPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const vehicle = VEHICLES.find((v) => v.slug === slug);
  const { addVehicle, toggleDrawer } = useCompareStore();
  const { setVehicle } = useConfiguratorStore();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'DESIGN' | 'PERFORMANCE' | 'INTERIOR' | 'TECH' | 'SPECIFICATIONS'>('OVERVIEW');

  useGsapContext(containerRef, () => {
    gsap.from('.vehicle-hero-content', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out'
    });
  });

  if (!vehicle) {
    return <Navigate to="/404" replace />;
  }

  const handleConfigure = () => {
    setVehicle(vehicle.id);
  };

  const handleCompare = () => {
    addVehicle(vehicle.id);
    toggleDrawer();
  };

  return (
    <div ref={containerRef} className="car-detail-page" style={{ paddingTop: '88px' }}>
      {/* =========================================================================
          HERO STAGE
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '48px',
          backgroundColor: '#111417',
          color: '#F7F8F9',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <SafeImage
            src={vehicle.images.hero}
            alt={vehicle.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(17,20,23,0.95) 0%, rgba(17,20,23,0.3) 60%, rgba(17,20,23,0.7) 100%)'
            }}
          />
        </div>

        <div className="showroom-container vehicle-hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="hud-tag">{vehicle.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                {vehicle.modelCode}
              </span>
            </div>

            <h1 className="text-hero" style={{ margin: 0, color: '#FFFFFF' }}>
              {vehicle.name}
            </h1>

            <p className="font-editorial" style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: '#D8DEE4', margin: '8px 0 24px' }}>
              {vehicle.tagline}
            </p>

            {/* Quick Hero Metrics Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
                padding: '20px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                marginBottom: '28px'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B' }}>OUTPUT</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600 }}>{vehicle.power} HP</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B' }}>TORQUE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600 }}>{vehicle.torque} NM</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B' }}>0–100 KM/H</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--theme-accent)' }}>
                  {vehicle.acceleration}s
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B' }}>TOP VELOCITY</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600 }}>{vehicle.topSpeed} KM/H</div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <Link to="/configurator" onClick={handleConfigure} className="btn-aurelis" style={{ padding: '0.9rem 2rem' }}>
                CONFIGURE THIS VEHICLE
              </Link>
              <Link to="/test-drive" className="btn-ghost" style={{ padding: '0.9rem 2rem', color: '#FFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                BOOK TEST DRIVE
              </Link>
              <button
                onClick={handleCompare}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--theme-accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px'
                }}
              >
                + COMPARE SPEC
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STICKY VEHICLE NAV STRIP
          ========================================================================= */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 800,
          backgroundColor: 'var(--theme-surface)',
          borderBottom: '1px solid var(--theme-border)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div
          className="showroom-container"
          role="tablist"
          aria-label="Vehicle Section Details"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            whiteSpace: 'nowrap',
            paddingTop: '12px',
            paddingBottom: '12px'
          }}
        >
          {(['OVERVIEW', 'DESIGN', 'PERFORMANCE', 'INTERIOR', 'TECH', 'SPECIFICATIONS'] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tab-panel-${tab}`}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                padding: '6px 14px',
                backgroundColor: activeTab === tab ? 'var(--theme-text)' : 'transparent',
                color: activeTab === tab ? 'var(--theme-bg)' : 'var(--theme-text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--theme-accent)' }}>
              {vehicle.formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 01: OVERVIEW & EDITORIAL
          ========================================================================= */}
      {activeTab === 'OVERVIEW' && (
        <section id="tab-panel-OVERVIEW" role="tabpanel" style={{ padding: '80px 0' }}>
          <div className="showroom-container">
            <div className="layout-grid-12" style={{ alignItems: 'center', marginBottom: '80px' }}>
              <div className="col-7">
                <div className="hud-tag" style={{ marginBottom: '14px' }}>
                  ARCHITECTURAL DOSSIER
                </div>
                <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: '0 0 20px' }}>
                  THE PHILOSOPHY OF MOVEMENT.
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.7, color: 'var(--theme-text-secondary)' }}>
                  {vehicle.editorialDescription}
                </p>

                <div style={{ marginTop: '36px' }}>
                  <EngineSoundPreview
                    type={vehicle.soundProfile.type}
                    baseFreq={vehicle.soundProfile.baseFreq}
                    label={`${vehicle.name} ACOUSTIC SIGNATURE`}
                    isElectric={vehicle.fuelType === 'Electric'}
                  />
                </div>
              </div>

              <div className="col-5 img-zoom-parent" style={{ height: '420px', border: '1px solid var(--theme-border)' }}>
                <SafeImage src={vehicle.images.profile} alt={vehicle.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Highlights Features Grid */}
            <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: '60px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.14em', marginBottom: '24px' }}>
                FACTORY BESPOKE HIGHLIGHTS
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '24px'
                }}
              >
                {vehicle.features.map((feat, i) => (
                  <div
                    key={i}
                    className="aurelis-card"
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)' }}>
                      0{i + 1} // ENGINEERING SPEC
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600 }}>
                      {feat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 02: DESIGN
          ========================================================================= */}
      {activeTab === 'DESIGN' && (
        <section id="tab-panel-DESIGN" role="tabpanel" style={{ padding: '80px 0' }}>
          <div className="showroom-container">
            <div style={{ marginBottom: '50px' }}>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>AESTHETIC ARCHITECTURE</div>
              <h2 className="text-h1" style={{ margin: 0 }}>SCULPTED BY AIR.</h2>
            </div>

            <div className="layout-grid-12" style={{ marginBottom: '50px' }}>
              <div className="col-8 img-zoom-parent" style={{ height: '460px', border: '1px solid var(--theme-border)' }}>
                <SafeImage src={vehicle.images.front} alt="Front fascia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="col-4 img-zoom-parent" style={{ height: '460px', border: '1px solid var(--theme-border)' }}>
                <SafeImage src={vehicle.images.detail} alt="Detail metallurgy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="layout-grid-12" style={{ alignItems: 'center' }}>
              <div className="col-6 img-zoom-parent" style={{ height: '400px', border: '1px solid var(--theme-border)' }}>
                <SafeImage src={vehicle.images.rear} alt="Rear view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="col-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, marginBottom: '14px' }}>
                  AERODYNAMIC INTEGRATION
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.7, color: 'var(--theme-text-secondary)', margin: 0 }}>
                  Active aerodynamics deploy automatically at 120 km/h, introducing 180 kg of clean downforce through the rear decklid without adding parasitic drag.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 03: PERFORMANCE
          ========================================================================= */}
      {activeTab === 'PERFORMANCE' && (
        <section id="tab-panel-PERFORMANCE" role="tabpanel" style={{ padding: '80px 0', backgroundColor: '#111417', color: '#F7F8F9' }}>
          <div className="showroom-container">
            <div style={{ marginBottom: '50px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FF5A1F', letterSpacing: '0.14em', marginBottom: '12px' }}>
                POWERTRAIN CALIBRATION
              </div>
              <h2 className="text-h1" style={{ color: '#F7F8F9', margin: 0 }}>
                TELEMETRY ENVELOPE.
              </h2>
            </div>

            <PerformanceMeter
              metrics={[
                { label: '0–100 KM/H', value: vehicle.acceleration, unit: 'SEC', decimals: 1, highlight: true },
                { label: 'OUTPUT', value: vehicle.power, unit: 'HP', decimals: 0 },
                { label: 'TORQUE', value: vehicle.torque, unit: 'NM', decimals: 0 },
                { label: 'V-MAX', value: vehicle.topSpeed, unit: 'KM/H', decimals: 0 }
              ]}
            />

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
              <EngineSoundPreview
                type={vehicle.soundProfile.type}
                baseFreq={vehicle.soundProfile.baseFreq}
                label={`${vehicle.name} ENGINE AUDITION`}
                isElectric={vehicle.fuelType === 'Electric'}
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 04: INTERIOR
          ========================================================================= */}
      {activeTab === 'INTERIOR' && (
        <section id="tab-panel-INTERIOR" role="tabpanel" style={{ padding: '80px 0' }}>
          <div className="showroom-container">
            <div style={{ marginBottom: '50px' }}>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>COCKPIT ERGONOMICS</div>
              <h2 className="text-h1" style={{ margin: 0 }}>SANCTUARY OF SPEED.</h2>
            </div>

            <div className="img-zoom-parent" style={{ height: 'clamp(320px, 48vh, 520px)', border: '1px solid var(--theme-border)', marginBottom: '40px' }}>
              <SafeImage src={vehicle.images.interior} alt="Cabin interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '24px' }}>
              {vehicle.interiors.map((int) => (
                <div key={int.id} className="aurelis-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ width: '18px', height: '18px', backgroundColor: int.hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>{int.name}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
                    {int.material}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {int.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 05: TECH
          ========================================================================= */}
      {activeTab === 'TECH' && (
        <section id="tab-panel-TECH" role="tabpanel" style={{ padding: '80px 0' }}>
          <div className="showroom-container">
            <div style={{ marginBottom: '50px' }}>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>AVIONICS & ADAS</div>
              <h2 className="text-h1" style={{ margin: 0 }}>INTELLIGENT PILOT.</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {[
                { title: 'AURELIS PILOT L3', desc: 'Lidar, radar, and 8 camera sensors enabling autonomous highway cruising and automatic lane changes.' },
                { title: 'HOLOGRAPHIC HUD', desc: 'Collimated virtual display projecting speed, turn-by-turn vectors, and braking markers onto the road 10m ahead.' },
                { title: 'PREDICTIVE ACTIVE CHASSIS', desc: 'Scans the road surface up to 25 meters ahead, adjusting each damper valve in 5 milliseconds.' },
                { title: 'TELEMETRY OTA', desc: 'Secure high-speed satellite connectivity with automated firmware upgrades and track logging.' }
              ].map((tech, i) => (
                <div key={i} className="aurelis-card" style={{ padding: '28px' }}>
                  <Cpu size={24} color="var(--theme-accent)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>
                    {tech.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 06: SPECIFICATIONS
          ========================================================================= */}
      {activeTab === 'SPECIFICATIONS' && (
        <section id="tab-panel-SPECIFICATIONS" role="tabpanel" style={{ padding: '80px 0' }}>
          <div className="showroom-container">
            <div style={{ marginBottom: '40px' }}>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>FULL TECHNICAL DOSSIER</div>
              <h2 className="text-h1" style={{ margin: 0 }}>SPECIFICATION MATRIX.</h2>
            </div>

            <div style={{ border: '1px solid var(--theme-border)', backgroundColor: 'var(--theme-card-bg)' }}>
              {Object.entries(vehicle.specifications).map(([key, val], i) => (
                <div
                  key={key}
                  className="layout-grid-12"
                  style={{
                    padding: '16px 24px',
                    borderBottom: i < Object.keys(vehicle.specifications).length - 1 ? '1px solid var(--theme-border)' : 'none',
                    backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)'
                  }}
                >
                  <div className="col-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text-secondary)', textTransform: 'uppercase' }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </div>
                  <div className="col-8" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--theme-text)' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Sticky Action Bar */}
      <div
        style={{
          borderTop: '1px solid var(--theme-border)',
          backgroundColor: 'var(--theme-surface)',
          padding: '24px 0'
        }}
      >
        <div className="showroom-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700 }}>
              {vehicle.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--theme-accent)' }}>
              {vehicle.formattedPrice} // ESTIMATED STARTING COMMISSION
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/test-drive" className="btn-ghost">
              BOOK A TEST DRIVE
            </Link>
            <Link to="/configurator" onClick={handleConfigure} className="btn-aurelis">
              ENTER STUDIO CONFIGURATOR <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
