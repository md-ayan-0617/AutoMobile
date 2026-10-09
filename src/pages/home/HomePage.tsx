import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { SHOWROOM_DETAILS } from '../../data/showroom';
import { VehicleCard } from '../../components/vehicles/VehicleCard';
import { HeroVehicle3D } from '../../components/three/HeroVehicle3D';
import { WheelDetail3D } from '../../components/three/WheelDetail3D';
import { PerformanceMeter } from '../../components/motion/PerformanceMeter';
import { EngineSoundPreview } from '../../components/motion/EngineSoundPreview';
import { SafeImage } from '../../components/ui/SafeImage';
import { useThemeStore } from '../../store/useThemeStore';
import { useCursorStore } from '../../store/useCursorStore';
import { gsap, ScrollTrigger, useGsapContext } from '../../utils/gsap';

export const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useThemeStore();
  const { setCursor, resetCursor } = useCursorStore();

  const [selectedTeaserColor, setSelectedTeaserColor] = useState(VEHICLES[0].colors[0]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredVehicles =
    activeCategory === 'ALL'
      ? VEHICLES
      : VEHICLES.filter((v) => v.category.toUpperCase() === activeCategory.toUpperCase());

  // GSAP Entrance & Scroll Animations with automatic context cleanup
  useGsapContext(
    () => {
      // 01. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-meta-top', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        delay: 0.2
      })
        .from('.hero-title-line', {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 1
        }, '-=0.5')
        .from('.hero-sub-editorial', {
          opacity: 0,
          y: 20,
          duration: 0.8
        }, '-=0.6')
        .from('.hero-cta-group', {
          opacity: 0,
          y: 20,
          duration: 0.8
        }, '-=0.6')
        .from('.hero-3d-stage', {
          opacity: 0,
          scale: 0.96,
          duration: 1.2
        }, '-=0.9')
        .from('.hero-meta-bottom', {
          opacity: 0,
          y: 15,
          duration: 0.8
        }, '-=0.8');

      // 02. ScrollTrigger reveals for Design Chapter
      gsap.from('.design-image-card', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out'
      });

      // 03. ScrollTrigger reveals for Performance Chapter
      gsap.from('.performance-feature-image', {
        scrollTrigger: {
          trigger: '#chapter-performance',
          start: 'top 70%'
        },
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power2.out'
      });

      // 04. Theme transitions tied to scroll sections
      const sections = [
        { id: '#chapter-performance', theme: 'performance' as const },
        { id: '#chapter-electric', theme: 'electric' as const },
        { id: '#chapter-night', theme: 'night-drive' as const },
        { id: '#chapter-showroom', theme: 'showroom' as const }
      ];

      sections.forEach(({ id, theme }) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setTheme(theme),
          onEnterBack: () => setTheme(theme)
        });
      });
    },
    [],
    containerRef
  );

  return (
    <div ref={containerRef} className="home-page" style={{ position: 'relative' }}>
      {/* =========================================================================
          CHAPTER 01 — HERO (100svh)
          ========================================================================= */}
      <section
        id="chapter-hero"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: '100px',
          paddingBottom: '32px',
          overflow: 'hidden'
        }}
      >
        <div className="grid-bg-overlay" />

        {/* Hero Microcopy Top */}
        <div className="showroom-container hero-meta-top" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--theme-border)',
              paddingBottom: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'var(--theme-text-secondary)',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--theme-accent)', display: 'inline-block' }} />
              <span>AURELIS MOTOR COMPANY / FOUNDED ON REVERENCE</span>
            </div>
            <div>
              MODEL 001 // <span style={{ color: 'var(--theme-accent)' }}>LIVE: 09:42 IST</span>
            </div>
          </div>
        </div>

        {/* Main Hero Typography & 3D Vehicle Stage */}
        <div
          className="showroom-container hero-main-stage"
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 40px)',
            margin: 'auto 0',
            width: '100%'
          }}
        >
          {/* Left: Giant Typography */}
          <div ref={heroTextRef} className="hero-text-col" style={{ gridColumn: 'span 5' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', color: 'var(--theme-accent)', marginBottom: '8px' }}>
              FLAGSHIP GRAND TOURER / AML-09GT
            </div>
            <h1
              className="text-hero"
              style={{
                color: 'var(--theme-text)',
                margin: 0
              }}
            >
              <span className="hero-title-line" style={{ display: 'block' }}>BUILT</span>
              <span className="hero-title-line" style={{ display: 'block' }}>TO</span>
              <span className="hero-title-line" style={{ display: 'block' }}>MOVE.</span>
            </h1>
            <p
              className="font-editorial hero-sub-editorial"
              style={{
                fontSize: 'clamp(20px, 2.4vw, 32px)',
                color: 'var(--theme-text-secondary)',
                marginTop: '12px',
                marginBottom: '24px'
              }}
            >
              *Not just forward.*
            </p>

            <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <Link to="/cars/a9-gt" className="btn-aurelis">
                EXPLORE A9 GT <ArrowRight size={14} />
              </Link>
              <Link to="/configurator" className="btn-ghost">
                CONFIGURE SPEC
              </Link>
            </div>
          </div>

          {/* Right: Interactive 3D Hero Vehicle */}
          <div
            className="hero-3d-stage"
            style={{
              gridColumn: 'span 7',
              height: 'clamp(340px, 46vh, 580px)',
              position: 'relative'
            }}
            onMouseEnter={() => setCursor('VIEW', 'INTERACT')}
            onMouseLeave={resetCursor}
          >
            <HeroVehicle3D color={selectedTeaserColor.hex} />
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: 'var(--theme-text-secondary)',
                background: 'rgba(0,0,0,0.5)',
                padding: '4px 10px',
                border: '1px solid var(--theme-border)'
              }}
            >
              POINTER: 3D SHIFT ENABLED
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar / Metadata HUD */}
        <div className="showroom-container hero-meta-bottom" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--theme-border)',
              paddingTop: '16px',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase' }}>
              <div>
                <span style={{ color: 'var(--theme-text-secondary)' }}>POWERTRAIN: </span>
                <span style={{ fontWeight: 600 }}>420 HP TWIN-TURBO V8</span>
              </div>
              <div>
                <span style={{ color: 'var(--theme-text-secondary)' }}>TRACTION: </span>
                <span style={{ fontWeight: 600 }}>AWD VECTORING</span>
              </div>
              <div>
                <span style={{ color: 'var(--theme-text-secondary)' }}>ACCELERATION: </span>
                <span style={{ color: 'var(--theme-accent)', fontWeight: 600 }}>0–100 IN 4.1 SEC</span>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--theme-text-secondary)' }}>
              SCROLL TO ENTER ARCHITECTURE ↓
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 02 — DESIGN
          ========================================================================= */}
      <section
        id="chapter-design"
        style={{
          padding: 'clamp(80px, 10vw, 150px) 0',
          position: 'relative',
          borderTop: '1px solid var(--theme-border)'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="hud-tag" style={{ marginBottom: '14px' }}>
                CHAPTER 02 // AESTHETIC DOCTRINE
              </div>
              <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: 0 }}>
                FORM<br />
                FOLLOWS<br />
                DESIRE.
              </h2>
            </div>
            <p
              className="font-editorial"
              style={{
                maxWidth: '460px',
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                lineHeight: 1.4,
                color: 'var(--theme-text-secondary)',
                margin: 0
              }}
            >
              "We do not design vehicles to fill parking bays. We sculpt them so that every time you turn your key, the world falls quiet."
            </p>
          </div>

          {/* Three Large Offset Images with Technical Annotations */}
          <div
            className="design-grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(20px, 3vw, 40px)',
              alignItems: 'start'
            }}
          >
            {/* Image 1: Laser Light Signature */}
            <div className="design-image-card design-col-1" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ height: '380px', position: 'relative', overflow: 'hidden', border: '1px solid var(--theme-border)' }}>
                <SafeImage
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                  alt="Laser light signature"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                  ANNOTATION // 01
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '4px 0' }}>
                  LASER LIGHT SIGNATURE
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', lineHeight: 1.5 }}>
                  Sub-millimeter crystal optics projecting 600-meter non-dazzle high beams, linked to satellite terrain data.
                </p>
              </div>
            </div>

            {/* Image 2: Aerodynamic Surface (Offset down on desktop) */}
            <div className="design-image-card design-col-2" style={{ gridColumn: 'span 4', marginTop: 'clamp(20px, 4vw, 60px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ height: '380px', position: 'relative', overflow: 'hidden', border: '1px solid var(--theme-border)' }}>
                <SafeImage
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"
                  alt="Aerodynamic surface"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                  ANNOTATION // 02
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '4px 0' }}>
                  AERODYNAMIC SURFACE
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', lineHeight: 1.5 }}>
                  Single-sheet pressed aluminum roofline directing cooling slipstreams directly into active rear downforce channels.
                </p>
              </div>
            </div>

            {/* Image 3: Hand-Finished Interior */}
            <div className="design-image-card design-col-3" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ height: '380px', position: 'relative', overflow: 'hidden', border: '1px solid var(--theme-border)' }}>
                <SafeImage
                  src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop"
                  alt="Hand-finished interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                  ANNOTATION // 03
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '4px 0' }}>
                  HAND-FINISHED INTERIOR
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', lineHeight: 1.5 }}>
                  Full-grain aniline leather cured over 40 days, accented with knurled solid aerospace billet switches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03 — VEHICLE COLLECTION
          ========================================================================= */}
      <section
        id="chapter-collection"
        style={{
          padding: 'clamp(80px, 10vw, 150px) 0',
          position: 'relative',
          backgroundColor: 'var(--theme-surface)',
          borderTop: '1px solid var(--theme-border)'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>
                CHAPTER 03 // LINEUP
              </div>
              <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: 0 }}>
                CHOOSE<br />
                YOUR MACHINE.
              </h2>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['ALL', 'GT', 'SPORT', 'SUV', 'ELECTRIC'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    padding: '8px 16px',
                    backgroundColor: activeCategory === cat ? 'var(--theme-accent)' : 'transparent',
                    color: activeCategory === cat ? '#FFFFFF' : 'var(--theme-text)',
                    border: '1px solid var(--theme-border-strong)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Editorial Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(20px, 2.5vw, 36px)'
            }}
          >
            {filteredVehicles.map((vehicle, idx) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} priority={idx === 0} />
            ))}
          </div>

          {/* Full Lineup CTA */}
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/cars" className="btn-aurelis" style={{ padding: '1rem 2.5rem' }}>
              VIEW COMPLETE VEHICLE DOSSIER <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 04 — PERFORMANCE (Graphite + Orange Accent)
          ========================================================================= */}
      <section
        id="chapter-performance"
        style={{
          padding: 'clamp(90px, 12vw, 180px) 0',
          position: 'relative',
          backgroundColor: '#111417',
          color: '#F7F8F9',
          borderTop: '2px solid #FF5A1F'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px', marginBottom: '50px' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  color: '#FF5A1F',
                  marginBottom: '14px'
                }}
              >
                CHAPTER 04 // KINETIC METRICS
              </div>
              <h2 className="text-h1" style={{ color: '#F7F8F9', margin: 0 }}>
                SPEED<br />
                HAS A SOUND.
              </h2>
            </div>

            {/* Interactive Engine Sound Audition Button */}
            <div>
              <EngineSoundPreview
                type="gt-sports"
                baseFreq={135}
                label="AURELIS R8 4.0L TWIN-TURBO HOWL"
              />
            </div>
          </div>

          {/* Large Performance Vehicle Image with Light Streak */}
          <div
            className="performance-feature-image"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(320px, 46vh, 560px)',
              border: '1px solid rgba(255, 90, 31, 0.3)',
              overflow: 'hidden',
              marginBottom: '50px'
            }}
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1800&auto=format&fit=crop"
              alt="Performance coupe on circuit"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(17,20,23,0.7) 0%, transparent 60%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                color: '#FF5A1F'
              }}
            >
              CIRCUIT HOMOLOGATION // AURELIS R8 CLUBSPORT
            </div>
          </div>

          {/* Upward Counting Animated Metrics */}
          <PerformanceMeter
            metrics={[
              { label: '0–100 KM/H', value: 3.7, unit: 'SEC', decimals: 1, highlight: true },
              { label: 'MAX POWER', value: 510, unit: 'HP', decimals: 0 },
              { label: 'PEAK TORQUE', value: 610, unit: 'NM', decimals: 0 },
              { label: 'TOP SPEED', value: 310, unit: 'KM/H', decimals: 0 }
            ]}
          />
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 05 — ENGINEERING (Split Screen + 3D Wheel/Brake Moment)
          ========================================================================= */}
      <section
        id="chapter-engineering"
        style={{
          padding: 'clamp(90px, 12vw, 160px) 0',
          position: 'relative',
          borderTop: '1px solid var(--theme-border)'
        }}
      >
        <div className="showroom-container">
          <div
            className="engineering-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(20px, 4vw, 60px)',
              alignItems: 'center'
            }}
          >
            {/* Left: Interactive 3D Wheel / Ceramic Rotor Moment */}
            <div
              className="engineering-wheel-col"
              style={{
                gridColumn: 'span 6',
                border: '1px solid var(--theme-border-strong)',
                backgroundColor: 'var(--theme-card-bg)',
                padding: '24px',
                position: 'relative'
              }}
              onMouseEnter={() => setCursor('GALLERY', 'ROTATE')}
              onMouseLeave={resetCursor}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)', letterSpacing: '0.14em', marginBottom: '8px' }}>
                INTERACTIVE THREE.JS MECHANICAL DETAIL // DRAG TO INSPECT
              </div>
              <WheelDetail3D finishColor="#B9BEC3" caliperColor="#FF5A1F" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--theme-text-secondary)',
                  borderTop: '1px solid var(--theme-border)',
                  paddingTop: '12px',
                  marginTop: '12px'
                }}
              >
                <span>420MM CARBON ROTORS</span>
                <span>10-PISTON MONOBLOCK</span>
              </div>
            </div>

            {/* Right: Editorial Engineering Text */}
            <div className="engineering-text-col" style={{ gridColumn: 'span 6' }}>
              <div className="hud-tag" style={{ marginBottom: '16px' }}>
                CHAPTER 05 // STRUCTURAL INTEGRITY
              </div>
              <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: 0 }}>
                EVERY<br />
                MILLIMETER<br />
                HAS A JOB.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'var(--theme-text-secondary)',
                  marginTop: '20px',
                  marginBottom: '24px'
                }}
              >
                In an Aurelis chassis, zero metal is decorative. From the front subframe cast in aerospace-grade magnesium to the carbon-fibre structural tub, torsional stiffness is calculated to 48,000 Nm per degree. When you input steering, the front axle responds in 8 milliseconds.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid var(--theme-border)', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--theme-accent)' }}>
                    48,000 NM/°
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                    TORSIONAL RIGIDITY
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--theme-accent)' }}>
                    49 : 51
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                    AXLE WEIGHT DISTRIBUTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 06 — ELECTRIC (Electric Blue Theme State)
          ========================================================================= */}
      <section
        id="chapter-electric"
        style={{
          padding: 'clamp(90px, 12vw, 180px) 0',
          position: 'relative',
          backgroundColor: '#DDE9FF',
          color: '#101315',
          borderTop: '2px solid #2563FF'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#2563FF', letterSpacing: '0.14em', marginBottom: '12px' }}>
                CHAPTER 06 // PURE ELECTROMAGNETIC THRUST
              </div>
              <h2 className="text-h1" style={{ color: '#101315', margin: 0 }}>
                SILENCE<br />
                IS THE NEW<br />
                POWER.
              </h2>
            </div>

            {/* EV Sound Synthesizer */}
            <div>
              <EngineSoundPreview
                type="electric-hyper"
                baseFreq={240}
                label="AURELIS E7 ELECTROMAGNETIC PULSE"
                isElectric={true}
              />
            </div>
          </div>

          {/* Electric Vehicle Visual Display */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(340px, 48vh, 580px)',
              overflow: 'hidden',
              border: '1px solid rgba(37,99,255,0.3)',
              marginBottom: '40px'
            }}
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1800&auto=format&fit=crop"
              alt="Aurelis E7 Electric Sedan"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(221,233,255,0.85) 0%, transparent 60%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                color: '#101315',
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 700
              }}
            >
              AURELIS E7 // 390 HP ZERO-EMISSION SALOON
            </div>
          </div>

          {/* Electric Technical Specs Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#485361', letterSpacing: '0.12em' }}>RANGE (WLTP)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 600, color: '#101315', margin: '8px 0' }}>620 KM</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#485361' }}>Cross-state grand touring with zero range compromise.</div>
            </div>

            <div style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#485361', letterSpacing: '0.12em' }}>FAST CHARGING</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 600, color: '#2563FF', margin: '8px 0' }}>22 MIN</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#485361' }}>10% to 80% charge at 350 kW ultra-fast DC terminals.</div>
            </div>

            <div style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#485361', letterSpacing: '0.12em' }}>OUTPUT</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 600, color: '#101315', margin: '8px 0' }}>390 HP</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#485361' }}>Dual permanent magnet synchronous e-AWD motors.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 07 — CONFIGURATOR TEASER
          ========================================================================= */}
      <section
        id="chapter-configurator"
        style={{
          padding: 'clamp(90px, 12vw, 160px) 0',
          position: 'relative',
          backgroundColor: 'var(--theme-bg)',
          borderTop: '1px solid var(--theme-border)'
        }}
      >
        <div className="showroom-container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="hud-tag" style={{ marginBottom: '14px' }}>
              CHAPTER 07 // BESPOKE STUDIO
            </div>
            <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: 0 }}>
              MAKE IT YOURS.
            </h2>
            <p className="font-editorial" style={{ fontSize: '20px', color: 'var(--theme-text-secondary)', marginTop: '8px' }}>
              Select your exterior metallurgy and audition colors in real-time.
            </p>
          </div>

          {/* Large Vehicle Canvas / Image Switcher */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(320px, 46vh, 520px)',
              backgroundColor: '#111417',
              border: '1px solid var(--theme-border)',
              overflow: 'hidden'
            }}
          >
            <SafeImage
              src={selectedTeaserColor.image}
              alt={`Aurelis A9 GT in ${selectedTeaserColor.name}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: '#FFF',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              SELECTED METALLURGY: {selectedTeaserColor.name}
            </div>
          </div>

          {/* Color Switcher Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginTop: '32px'
            }}
          >
            {VEHICLES[0].colors.map((color) => {
              const isSelected = selectedTeaserColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedTeaserColor(color)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 16px',
                    backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                    border: isSelected ? '1px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: color.hex,
                      border: '1px solid rgba(0,0,0,0.2)'
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text)' }}>
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/configurator" className="btn-aurelis" style={{ padding: '0.95rem 2.2rem' }}>
              OPEN FULL 3D CONFIGURATOR →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 08 — NIGHT DRIVE (Dark City Cinematic)
          ========================================================================= */}
      <section
        id="chapter-night"
        style={{
          padding: 'clamp(90px, 12vw, 180px) 0',
          position: 'relative',
          backgroundColor: '#090B0D',
          color: '#F7F8F9',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#65A0FF', letterSpacing: '0.14em', marginBottom: '12px' }}>
                CHAPTER 08 // URBAN NOCTURNE
              </div>
              <h2 className="text-h1" style={{ color: '#F7F8F9', margin: 0 }}>
                THE CITY<br />
                LOOKS DIFFERENT<br />
                FROM HERE.
              </h2>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#9098A0', textAlign: 'right' }}>
              23:47 IST<br />
              NIGHT DRIVE / A9 GT CONVOY
            </div>
          </div>

          {/* Cinematic Wet Road Layer */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 52vh, 640px)',
              overflow: 'hidden',
              border: '1px solid rgba(101, 160, 255, 0.25)'
            }}
          >
            <SafeImage
              src="https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1800&auto=format&fit=crop"
              alt="Night driving through city"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(9,11,13,0.3) 0%, rgba(9,11,13,0.85) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                maxWidth: '540px'
              }}
            >
              <div className="font-editorial" style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', color: '#F7F8F9', lineHeight: 1.3 }}>
                "Empty overpasses, cold asphalt, and laser headlamps carving through the dark. That is where precision becomes companionship."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 09 — SHOWROOM (Architectural Motor House)
          ========================================================================= */}
      <section
        id="chapter-showroom"
        style={{
          padding: 'clamp(90px, 12vw, 160px) 0',
          position: 'relative',
          backgroundColor: 'var(--theme-bg)',
          borderTop: '1px solid var(--theme-border)'
        }}
      >
        <div className="showroom-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
            <div>
              <div className="hud-tag" style={{ marginBottom: '14px' }}>
                CHAPTER 09 // PHYSICAL DESTINATION
              </div>
              <h2 className="text-h1" style={{ color: 'var(--theme-text)', margin: 0 }}>
                SEE IT<br />
                IN PERSON.
              </h2>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--theme-text)' }}>
                {SHOWROOM_DETAILS.name} — {SHOWROOM_DETAILS.city}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                {SHOWROOM_DETAILS.hours[0].days} : {SHOWROOM_DETAILS.hours[0].time}
              </div>
            </div>
          </div>

          {/* Showroom Zones Horizontal Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {SHOWROOM_DETAILS.zones.slice(0, 4).map((zone) => (
              <div
                key={zone.id}
                style={{
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-card-bg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', position: 'relative' }}>
                  <SafeImage src={zone.image} alt={zone.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                    ZONE ARCHITECTURE
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, margin: 0 }}>
                    {zone.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--theme-text-secondary)', lineHeight: 1.5 }}>
                    {zone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/showroom" className="btn-aurelis">
              EXPLORE MOTOR HOUSE SPACES & MAP →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 10 — TEST DRIVE
          ========================================================================= */}
      <section
        id="chapter-test-drive"
        style={{
          padding: 'clamp(100px, 14vw, 200px) 0',
          position: 'relative',
          backgroundColor: '#111417',
          color: '#F7F8F9',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="showroom-container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'var(--theme-accent)', marginBottom: '16px' }}>
            CHAPTER 10 // THE INVITATION
          </div>

          <h2
            className="text-mega"
            style={{
              color: '#F7F8F9',
              margin: '0 auto 20px',
              maxWidth: '1000px'
            }}
          >
            TAKE THE WHEEL.
          </h2>

          <p
            className="font-editorial"
            style={{
              fontSize: 'clamp(20px, 2.8vw, 36px)',
              color: '#B9BEC3',
              maxWidth: '700px',
              margin: '0 auto 48px'
            }}
          >
            Some things make more sense at 80 km/h.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/test-drive" className="btn-aurelis" style={{ padding: '1.1rem 2.8rem', fontSize: '0.95rem' }}>
              BOOK A TEST DRIVE →
            </Link>
            <Link to="/cars" className="btn-ghost" style={{ padding: '1.1rem 2.5rem', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}>
              VIEW CARS COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive media styling for homepage */}
      <style>{`
        @media (max-width: 960px) {
          .hero-main-stage {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hero-text-col, .hero-3d-stage {
            grid-column: span 12 !important;
          }
          .design-grid-container {
            grid-template-columns: 1fr !important;
          }
          .design-col-1, .design-col-2, .design-col-3 {
            grid-column: span 12 !important;
            margin-top: 0 !important;
          }
          .engineering-split-grid {
            grid-template-columns: 1fr !important;
          }
          .engineering-wheel-col, .engineering-text-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
