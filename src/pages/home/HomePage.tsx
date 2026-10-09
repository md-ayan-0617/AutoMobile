import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Crosshair, Eye, Sparkles, Layers, Volume2, ShieldCheck } from 'lucide-react';
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
  const heroCardRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useThemeStore();
  const { setCursor, resetCursor } = useCursorStore();

  const [selectedTeaserColor, setSelectedTeaserColor] = useState(VEHICLES[0].colors[0]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [heroViewAngle, setHeroViewAngle] = useState<'profile' | 'front' | 'track' | 'cockpit'>('profile');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [show3dMode, setShow3dMode] = useState<boolean>(false);

  const filteredVehicles =
    activeCategory === 'ALL'
      ? VEHICLES
      : VEHICLES.filter((v) => v.category.toUpperCase() === activeCategory.toUpperCase());

  // Get active hero image for the right side visualizer
  const getHeroImage = () => {
    switch (heroViewAngle) {
      case 'front':
        return '/images/design_laser_lights.jpg';
      case 'track':
        return '/images/performance_circuit.jpg';
      case 'cockpit':
        return '/images/design_interior.jpg';
      case 'profile':
      default:
        return selectedTeaserColor.image || '/images/hero_car_graphite.jpg';
    }
  };

  // Mouse tilt parallax handlers with GSAP interpolation
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to('.hero-car-inner-stage', {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to('.hero-car-glow-halo', {
      x: x * 30,
      y: y * 30,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleHeroMouseLeave = () => {
    resetCursor();
    gsap.to('.hero-car-inner-stage', {
      rotationY: 0,
      rotationX: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
    gsap.to('.hero-car-glow-halo', {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  };

  const handleAngleChange = (angle: 'profile' | 'front' | 'track' | 'cockpit') => {
    setHeroViewAngle(angle);
    gsap.fromTo(
      '.hero-main-car-img',
      { opacity: 0.25, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  };

  const handleColorChange = (color: (typeof VEHICLES)[0]['colors'][0]) => {
    setSelectedTeaserColor(color);
    if (heroViewAngle !== 'profile') {
      setHeroViewAngle('profile');
    }
    gsap.fromTo(
      '.hero-main-car-img',
      { opacity: 0.25, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
  };

  // GSAP Entrance & Scroll Animations with automatic context cleanup
  useGsapContext(
    () => {
      // 00. Global Luxury Scroll Progress Line
      gsap.to('.global-scroll-progress', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });

      // 01. Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-meta-top', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2
      })
        .from(
          '.hero-title-line',
          {
            opacity: 0,
            y: 50,
            stagger: 0.12,
            duration: 1
          },
          '-=0.5'
        )
        .from(
          '.hero-sub-editorial',
          {
            opacity: 0,
            y: 20,
            duration: 0.8
          },
          '-=0.6'
        )
        .from(
          '.hero-cta-group',
          {
            opacity: 0,
            y: 20,
            scale: 0.96,
            duration: 0.8
          },
          '-=0.6'
        )
        .from(
          '.hero-3d-stage',
          {
            opacity: 0,
            scale: 0.94,
            duration: 1.2
          },
          '-=0.9'
        )
        .from(
          '.hero-meta-bottom',
          {
            opacity: 0,
            y: 20,
            duration: 0.8
          },
          '-=0.8'
        );

      // Hero Scroll Scrub Parallax
      gsap.to('.hero-3d-stage', {
        scrollTrigger: {
          trigger: '#chapter-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        },
        y: 130,
        scale: 0.9,
        opacity: 0.35,
        ease: 'none'
      });

      gsap.to('.hero-text-col', {
        scrollTrigger: {
          trigger: '#chapter-hero',
          start: 'center center',
          end: 'bottom top',
          scrub: 0.5
        },
        y: -90,
        opacity: 0.15,
        ease: 'none'
      });

      gsap.to('.grid-bg-overlay', {
        scrollTrigger: {
          trigger: '#chapter-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 60,
        ease: 'none'
      });

      // Continuous floating breathing animation on the hero vehicle stage
      gsap.to('.hero-floating-car', {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Animated high-tech radar scan sweep across the car
      gsap.to('.hero-radar-scan', {
        yPercent: 350,
        repeat: -1,
        duration: 3.5,
        ease: 'power2.inOut',
        delay: 0.5
      });

      // Ambient pulse glow halo
      gsap.to('.hero-car-glow-halo', {
        scale: 1.08,
        opacity: 0.75,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: 'sine.inOut'
      });

      // 02. Chapter 02: Design doctrine ScrollTrigger
      gsap.from('#chapter-design .hud-tag, #chapter-design h2', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from('#chapter-design .font-editorial', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top 75%'
        },
        opacity: 0,
        x: 40,
        duration: 1,
        ease: 'power3.out'
      });

      // Design Cards staggered entrance
      gsap.from('.design-image-card', {
        scrollTrigger: {
          trigger: '.design-grid-container',
          start: 'top 80%'
        },
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out'
      });

      // Design Columns differential vertical parallax scrub
      gsap.to('.design-col-1', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -35,
        ease: 'none'
      });

      gsap.to('.design-col-2', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -85,
        ease: 'none'
      });

      gsap.to('.design-col-3', {
        scrollTrigger: {
          trigger: '#chapter-design',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -45,
        ease: 'none'
      });

      // 03. Chapter 03: Collection Grid ScrollTrigger
      gsap.from('#chapter-collection .collection-header', {
        scrollTrigger: {
          trigger: '#chapter-collection',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.collection-card-item', {
        scrollTrigger: {
          trigger: '.collection-cards-grid',
          start: 'top 85%'
        },
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out'
      });

      // 04. Chapter 04: Performance Chapter
      gsap.from('#chapter-performance .hud-tag, #chapter-performance h2', {
        scrollTrigger: {
          trigger: '#chapter-performance',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out'
      });

      // Performance feature image zoom-in scrub
      gsap.fromTo(
        '.performance-feature-image',
        { scale: 0.93, opacity: 0.75 },
        {
          scrollTrigger: {
            trigger: '.performance-feature-image',
            start: 'top 85%',
            end: 'center center',
            scrub: 0.5
          },
          scale: 1,
          opacity: 1,
          ease: 'power2.out'
        }
      );

      // Continuous animated speed beam across performance hero
      gsap.to('.performance-speed-beam', {
        xPercent: 400,
        repeat: -1,
        duration: 2.5,
        ease: 'power1.inOut'
      });

      // 05. Chapter 05: Engineering Split Screen Reveal
      gsap.from('.engineering-wheel-col', {
        scrollTrigger: {
          trigger: '#chapter-engineering',
          start: 'top 75%'
        },
        opacity: 0,
        x: -70,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.engineering-text-col', {
        scrollTrigger: {
          trigger: '#chapter-engineering',
          start: 'top 75%'
        },
        opacity: 0,
        x: 70,
        duration: 1,
        ease: 'power3.out'
      });

      // Parallax drift on the 3D wheel column
      gsap.to('.engineering-wheel-col', {
        scrollTrigger: {
          trigger: '#chapter-engineering',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -35,
        ease: 'none'
      });

      // Engineering specs numbers reveal
      gsap.from('.engineering-spec-number', {
        scrollTrigger: {
          trigger: '.engineering-text-col',
          start: 'center 85%'
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.5)'
      });

      // 06. Chapter 06: Electric Chapter
      gsap.from('#chapter-electric h2', {
        scrollTrigger: {
          trigger: '#chapter-electric',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.fromTo(
        '.electric-vehicle-image',
        { scale: 0.94 },
        {
          scrollTrigger: {
            trigger: '.electric-vehicle-image',
            start: 'top 85%',
            end: 'center center',
            scrub: 0.6
          },
          scale: 1,
          ease: 'power2.out'
        }
      );

      // Electric charging bar fills on scroll
      gsap.fromTo(
        '.ev-charging-progress',
        { width: '0%' },
        {
          scrollTrigger: {
            trigger: '#chapter-electric',
            start: 'top 65%'
          },
          width: '100%',
          duration: 1.8,
          ease: 'power2.out'
        }
      );

      // Electric stats cards stagger
      gsap.from('.electric-stat-card', {
        scrollTrigger: {
          trigger: '.electric-stats-grid',
          start: 'top 85%'
        },
        opacity: 0,
        y: 40,
        stagger: 0.14,
        duration: 0.8,
        ease: 'power3.out'
      });

      // 07. Chapter 07: Bespoke Configurator Teaser
      gsap.from('#chapter-configurator .config-header', {
        scrollTrigger: {
          trigger: '#chapter-configurator',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from('.config-teaser-stage', {
        scrollTrigger: {
          trigger: '.config-teaser-stage',
          start: 'top 80%'
        },
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.from('.config-swatch-button', {
        scrollTrigger: {
          trigger: '.config-swatches-bar',
          start: 'top 85%'
        },
        opacity: 0,
        scale: 0.7,
        y: 20,
        stagger: 0.06,
        duration: 0.6,
        ease: 'back.out(2)'
      });

      // 08. Chapter 08: Night Drive Chapter
      gsap.from('#chapter-night h2', {
        scrollTrigger: {
          trigger: '#chapter-night',
          start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.fromTo(
        '.night-feature-image',
        { yPercent: 8, scale: 1.08 },
        {
          scrollTrigger: {
            trigger: '#chapter-night',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          yPercent: -8,
          scale: 1,
          ease: 'none'
        }
      );

      gsap.from('.night-editorial-quote', {
        scrollTrigger: {
          trigger: '.night-feature-image',
          start: 'center 80%'
        },
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Headlight light sweep loop
      gsap.to('.night-headlight-sweep', {
        xPercent: 300,
        repeat: -1,
        duration: 4,
        ease: 'power2.inOut',
        delay: 1
      });

      // 09. Chapter 09: Showroom Spaces
      gsap.from('#chapter-showroom .showroom-header', {
        scrollTrigger: {
          trigger: '#chapter-showroom',
          start: 'top 80%'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.showroom-zone-card', {
        scrollTrigger: {
          trigger: '.showroom-zones-grid',
          start: 'top 85%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out'
      });

      // 10. Chapter 10: Test Drive Mega Typography & Invitation
      gsap.from('.test-drive-title', {
        scrollTrigger: {
          trigger: '#chapter-test-drive',
          start: 'top 75%'
        },
        opacity: 0,
        scale: 0.88,
        letterSpacing: '0.1em',
        duration: 1.2,
        ease: 'power4.out'
      });

      gsap.from('.test-drive-quote', {
        scrollTrigger: {
          trigger: '#chapter-test-drive',
          start: 'top 70%'
        },
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out'
      });

      gsap.from('.test-drive-cta', {
        scrollTrigger: {
          trigger: '#chapter-test-drive',
          start: 'top 65%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.5)'
      });

      // Marquee continuous roll at footer
      gsap.to('.test-drive-marquee-track', {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: 'none'
      });

      // 11. Theme transitions tied to scroll sections
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
      {/* 00. Global Luxury Scroll Progress Line */}
      <div
        className="global-scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          backgroundColor: 'var(--theme-accent)',
          zIndex: 9999,
          width: '0%',
          boxShadow: '0 0 10px var(--theme-accent)'
        }}
      />

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

          {/* Right: Interactive High-Tech Flagship Car Stage */}
          <div
            ref={heroCardRef}
            className="hero-3d-stage hero-stage-col"
            style={{
              gridColumn: 'span 7',
              height: 'clamp(420px, 54vh, 620px)',
              position: 'relative',
              perspective: '1200px'
            }}
            onMouseMove={handleHeroMouseMove}
            onMouseEnter={() => setCursor('GALLERY', 'INSPECT')}
            onMouseLeave={handleHeroMouseLeave}
          >
            {/* Ambient Dynamic Glow Halo */}
            <div
              className="hero-car-glow-halo"
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                right: '-10%',
                bottom: '-10%',
                background: `radial-gradient(circle at 50% 50%, ${selectedTeaserColor.hex}44 0%, rgba(255, 90, 31, 0.2) 35%, rgba(37, 99, 255, 0.1) 60%, transparent 75%)`,
                filter: 'blur(50px)',
                pointerEvents: 'none',
                zIndex: 0,
                transition: 'background 0.5s ease'
              }}
            />

            {/* Main Stage Card Container with 3D Tilt */}
            <div
              className="hero-car-inner-stage"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(15, 18, 21, 0.84)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--theme-border-strong)',
                boxShadow: '0 30px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                overflow: 'hidden'
              }}
            >
              {/* Corner HUD Tech Crosshairs */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--theme-accent)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>+</div>
              <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--theme-accent)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'var(--theme-accent)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>+</div>
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'var(--theme-accent)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>+</div>

              {/* Background HUD Grid Coordinates */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none',
                  opacity: 0.6
                }}
              />

              {/* Top HUD Telemetry Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 5,
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '6px 14px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: 'var(--theme-text)'
                  }}
                >
                  <Activity size={13} color="var(--theme-accent)" />
                  <span>CHASSIS // AML-09GT MONOCOQUE</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      padding: '6px 14px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--theme-accent)'
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#00E676',
                        boxShadow: '0 0 8px #00E676',
                        display: 'inline-block'
                      }}
                    />
                    <span>420 HP • AWD VECTORING</span>
                  </div>

                  {/* Toggle 3D Mode vs Photorealistic */}
                  <button
                    onClick={() => setShow3dMode(!show3dMode)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: show3dMode ? 'var(--theme-accent)' : 'rgba(0,0,0,0.5)',
                      color: show3dMode ? '#FFF' : 'var(--theme-text-secondary)',
                      padding: '6px 12px',
                      border: '1px solid var(--theme-border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Toggle 3D WebGL vs Photorealistic Stage"
                  >
                    <Layers size={12} />
                    <span>{show3dMode ? '3D ACTIVE' : '3D MESH'}</span>
                  </button>
                </div>
              </div>

              {/* Main Visual Display (Photorealistic or 3D fallback) */}
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '260px'
                }}
              >
                {show3dMode ? (
                  <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
                    <HeroVehicle3D color={selectedTeaserColor.hex} />
                  </div>
                ) : (
                  <div
                    className="hero-floating-car"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* High-Tech Vertical Radar Scanline */}
                    <div
                      className="hero-radar-scan"
                      style={{
                        position: 'absolute',
                        top: '-30%',
                        left: '5%',
                        right: '5%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--theme-accent), #FFF, var(--theme-accent), transparent)',
                        boxShadow: '0 0 12px var(--theme-accent)',
                        zIndex: 4,
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Featured Vehicle Image */}
                    <div
                      className="hero-main-car-img"
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        width: '92%',
                        maxHeight: '320px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.9))'
                      }}
                    >
                      <SafeImage
                        src={getHeroImage()}
                        alt={`Aurelis A9 GT Flagship in ${selectedTeaserColor.name}`}
                        style={{
                          width: '100%',
                          maxHeight: '300px',
                          objectFit: 'contain',
                          borderRadius: '6px'
                        }}
                      />
                    </div>

                    {/* Ground Reflection / Studio Pedestal Glow */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '4%',
                        left: '12%',
                        right: '12%',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(255,90,31,0.15) 40%, transparent 75%)',
                        filter: 'blur(8px)',
                        zIndex: 1
                      }}
                    />

                    {/* Interactive Hotspot 01: Optics */}
                    <div
                      onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                      onMouseEnter={() => setActiveHotspot(1)}
                      style={{
                        position: 'absolute',
                        top: '34%',
                        left: '22%',
                        zIndex: 8,
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 90, 31, 0.25)',
                          border: '1px solid var(--theme-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          boxShadow: '0 0 10px var(--theme-accent)'
                        }}
                      >
                        01
                      </div>
                      {activeHotspot === 1 && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '220px',
                            backgroundColor: 'rgba(10, 12, 14, 0.95)',
                            border: '1px solid var(--theme-accent)',
                            padding: '10px 14px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                            zIndex: 20
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)' }}>OPTICS TELEMETRY</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, margin: '2px 0' }}>Matrix Laser 600m</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>Adaptive crystal optics calibrated to satellite topography.</div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Hotspot 02: Powertrain */}
                    <div
                      onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                      onMouseEnter={() => setActiveHotspot(2)}
                      style={{
                        position: 'absolute',
                        top: '46%',
                        left: '52%',
                        zIndex: 8,
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(37, 99, 255, 0.25)',
                          border: '1px solid #2563FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          boxShadow: '0 0 10px #2563FF'
                        }}
                      >
                        02
                      </div>
                      {activeHotspot === 2 && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '220px',
                            backgroundColor: 'rgba(10, 12, 14, 0.95)',
                            border: '1px solid #2563FF',
                            padding: '10px 14px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                            zIndex: 20
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2563FF' }}>POWERTRAIN CORE</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, margin: '2px 0' }}>4.0L Twin-Turbo V8</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>420 HP (309 kW) / 580 Nm torque with variable sequential transmission.</div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Hotspot 03: Aerodynamics */}
                    <div
                      onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
                      onMouseEnter={() => setActiveHotspot(3)}
                      style={{
                        position: 'absolute',
                        top: '56%',
                        left: '78%',
                        zIndex: 8,
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 90, 31, 0.25)',
                          border: '1px solid var(--theme-accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          boxShadow: '0 0 10px var(--theme-accent)'
                        }}
                      >
                        03
                      </div>
                      {activeHotspot === 3 && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '0',
                            width: '220px',
                            backgroundColor: 'rgba(10, 12, 14, 0.95)',
                            border: '1px solid var(--theme-accent)',
                            padding: '10px 14px',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                            zIndex: 20
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)' }}>AERO SLIPSTREAM</div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, margin: '2px 0' }}>0.24 Cd Underbody</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>Venturi aerodynamic tunnels feeding dual active carbon diffusers.</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Interactive Angle & Metallurgy Switcher Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 5,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '16px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                {/* Angle Selector Tabs */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {(
                    [
                      { id: 'profile', label: 'PROFILE' },
                      { id: 'front', label: 'OPTICS' },
                      { id: 'track', label: 'CIRCUIT' },
                      { id: 'cockpit', label: 'CABIN' }
                    ] as const
                  ).map((tab) => {
                    const isActive = heroViewAngle === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleAngleChange(tab.id)}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          letterSpacing: '0.1em',
                          padding: '5px 12px',
                          backgroundColor: isActive ? 'var(--theme-accent)' : 'rgba(0,0,0,0.4)',
                          color: isActive ? '#FFFFFF' : 'var(--theme-text-secondary)',
                          border: isActive ? '1px solid var(--theme-accent)' : '1px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Metallurgy Color Quick Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)', letterSpacing: '0.1em' }}>
                    FINISH:
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {VEHICLES[0].colors.map((c) => {
                      const isSel = selectedTeaserColor.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleColorChange(c)}
                          title={c.name}
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                            border: isSel ? '2px solid #FFF' : '1px solid rgba(255,255,255,0.2)',
                            boxShadow: isSel ? '0 0 8px var(--theme-accent)' : 'none',
                            cursor: 'pointer',
                            transform: isSel ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.2s ease'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
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
                  src="/images/design_laser_lights.jpg"
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
                  src="/images/design_aero_surface.jpg"
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
                  src="/images/design_interior.jpg"
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
          <div className="collection-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
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
            className="collection-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(20px, 2.5vw, 36px)'
            }}
          >
            {filteredVehicles.map((vehicle, idx) => (
              <div key={vehicle.id} className="collection-card-item">
                <VehicleCard vehicle={vehicle} priority={idx === 0} />
              </div>
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
              src="/images/performance_circuit.jpg"
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
            {/* GSAP Animated Speed Beam */}
            <div
              className="performance-speed-beam"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '-25%',
                width: '18%',
                background: 'linear-gradient(90deg, transparent, rgba(255,90,31,0.5), rgba(255,255,255,0.8), transparent)',
                transform: 'skewX(-25deg)',
                pointerEvents: 'none',
                filter: 'blur(3px)'
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
                  <div className="engineering-spec-number" style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--theme-accent)' }}>
                    48,000 NM/°
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                    TORSIONAL RIGIDITY
                  </div>
                </div>
                <div>
                  <div className="engineering-spec-number" style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--theme-accent)' }}>
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
            className="electric-vehicle-image"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(340px, 48vh, 580px)',
              overflow: 'hidden',
              border: '1px solid rgba(37,99,255,0.3)',
              marginBottom: '28px'
            }}
          >
            <SafeImage
              src="/images/electric_car.jpg"
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

          {/* GSAP Animated Battery Charging Telemetry Bar */}
          <div
            style={{
              marginBottom: '36px',
              backgroundColor: 'rgba(37,99,255,0.1)',
              border: '1px solid rgba(37,99,255,0.25)',
              padding: '14px 20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: '#1E50D8', marginBottom: '8px' }}>
              <span>800V DC ARCHITECTURE CELL CHARGE TELEMETRY</span>
              <span>10% → 80% (22 MIN)</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(37,99,255,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div
                className="ev-charging-progress"
                style={{
                  height: '100%',
                  width: '0%',
                  background: 'linear-gradient(90deg, #2563FF, #65A0FF)',
                  boxShadow: '0 0 12px rgba(37,99,255,0.8)'
                }}
              />
            </div>
          </div>

          {/* Electric Technical Specs Strip */}
          <div
            className="electric-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            <div className="electric-stat-card" style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#485361', letterSpacing: '0.12em' }}>RANGE (WLTP)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 600, color: '#101315', margin: '8px 0' }}>620 KM</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#485361' }}>Cross-state grand touring with zero range compromise.</div>
            </div>

            <div className="electric-stat-card" style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#485361', letterSpacing: '0.12em' }}>FAST CHARGING</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '42px', fontWeight: 600, color: '#2563FF', margin: '8px 0' }}>22 MIN</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#485361' }}>10% to 80% charge at 350 kW ultra-fast DC terminals.</div>
            </div>

            <div className="electric-stat-card" style={{ backgroundColor: '#CFDEFA', padding: '24px', border: '1px solid rgba(37,99,255,0.2)' }}>
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
          <div className="config-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            className="config-teaser-stage"
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
            className="config-swatches-bar"
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
                  className="config-swatch-button"
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
            className="night-feature-image"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 52vh, 640px)',
              overflow: 'hidden',
              border: '1px solid rgba(101, 160, 255, 0.25)'
            }}
          >
            <SafeImage
              src="/images/night_drive.jpg"
              alt="Night driving through city"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* GSAP Headlight Light Sweep Beam */}
            <div
              className="night-headlight-sweep"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '-30%',
                width: '25%',
                background: 'linear-gradient(90deg, transparent, rgba(101,160,255,0.35), rgba(255,255,255,0.7), transparent)',
                transform: 'skewX(-35deg)',
                pointerEvents: 'none',
                filter: 'blur(8px)'
              }}
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
              className="night-editorial-quote"
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
          <div className="showroom-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '50px' }}>
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
            className="showroom-zones-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {SHOWROOM_DETAILS.zones.slice(0, 4).map((zone) => (
              <div
                key={zone.id}
                className="showroom-zone-card"
                style={{
                  border: '1px solid var(--theme-border)',
                  backgroundColor: 'var(--theme-card-bg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
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
          padding: 'clamp(100px, 14vw, 200px) 0 60px',
          position: 'relative',
          backgroundColor: '#111417',
          color: '#F7F8F9',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}
      >
        <div className="showroom-container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', color: 'var(--theme-accent)', marginBottom: '16px' }}>
            CHAPTER 10 // THE INVITATION
          </div>

          <h2
            className="text-mega test-drive-title"
            style={{
              color: '#F7F8F9',
              margin: '0 auto 20px',
              maxWidth: '1000px'
            }}
          >
            TAKE THE WHEEL.
          </h2>

          <p
            className="font-editorial test-drive-quote"
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
            <Link to="/test-drive" className="btn-aurelis test-drive-cta" style={{ padding: '1.1rem 2.8rem', fontSize: '0.95rem' }}>
              BOOK A TEST DRIVE →
            </Link>
            <Link to="/cars" className="btn-ghost test-drive-cta" style={{ padding: '1.1rem 2.5rem', color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}>
              VIEW CARS COLLECTION
            </Link>
          </div>

          {/* Continuous Infinite GSAP Ticker Marquee */}
          <div
            style={{
              marginTop: '90px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '28px',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            <div
              className="test-drive-marquee-track"
              style={{
                display: 'inline-flex',
                gap: '40px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase'
              }}
            >
              <span>AURELIS MOTOR COMPANY // BESPOKE COMMISSIONS OPEN</span>
              <span>•</span>
              <span>RAIPUR FLAGSHIP ATRIUM // VIP BOULEVARD SECTOR 04</span>
              <span>•</span>
              <span>HAND-CRAFTED ALUMINUM-MAGNESIUM ARCHITECTURE</span>
              <span>•</span>
              <span>A9 GT // E7 ELECTRIC // R8 CLUBSPORT // X5 SUV // V12 GRAND</span>
              <span>•</span>
              <span>AURELIS MOTOR COMPANY // BESPOKE COMMISSIONS OPEN</span>
              <span>•</span>
              <span>RAIPUR FLAGSHIP ATRIUM // VIP BOULEVARD SECTOR 04</span>
              <span>•</span>
              <span>HAND-CRAFTED ALUMINUM-MAGNESIUM ARCHITECTURE</span>
              <span>•</span>
              <span>A9 GT // E7 ELECTRIC // R8 CLUBSPORT // X5 SUV // V12 GRAND</span>
            </div>
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
