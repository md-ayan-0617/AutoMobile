import React, { useRef } from 'react';
import { Compass, ShieldCheck, Flame, Cpu, ArrowRight } from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.about-stagger', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });

  return (
    <div ref={containerRef} className="about-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="about-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            MANUFACTURER MANIFESTO // HERITAGE & VISION
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            WE DON'T BUILD CARS<br />
            FOR EVERYONE.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', color: 'var(--theme-accent)', maxWidth: '900px', margin: 0 }}>
            *We build them for people who notice.*
          </p>
        </div>

        {/* Studio Hero Image */}
        <div
          className="about-stagger img-zoom-parent"
          style={{
            height: 'clamp(360px, 50vh, 600px)',
            border: '1px solid var(--theme-border)',
            marginBottom: '70px'
          }}
        >
          <SafeImage
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1800&auto=format&fit=crop"
            alt="Aurelis design studio clay model"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Narrative Split */}
        <div
          className="layout-grid-12 about-stagger"
          style={{
            marginBottom: '80px',
            alignItems: 'baseline'
          }}
        >
          <div className="col-5">
            <h2 className="text-h2" style={{ margin: 0 }}>
              THE INTERSECTION OF EMOTION & PRECISION.
            </h2>
          </div>
          <div className="col-7" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.8, color: 'var(--theme-text-secondary)', margin: 0 }}>
              Aurelis Motor Company was founded on an unapologetic premise: the modern luxury automobile had become soft, insulated, and swollen with gadgetry. In pursuit of screens and mass production, the tactile romance of steering weight and combustion crescendo was traded away.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', lineHeight: 1.8, color: 'var(--theme-text-secondary)', margin: 0 }}>
              We set out to engineer machines that demand your full consciousness. Whether powered by a roaring dry-sump twin-turbo V8 or an 800-volt high-density electric drivetrain, an Aurelis communicates what the road is doing beneath you down to the millimeter.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div
          className="about-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '24px',
            borderTop: '1px solid var(--theme-border)',
            paddingTop: '60px',
            marginBottom: '80px'
          }}
        >
          {[
            {
              icon: Compass,
              title: 'ARCHITECTURAL MINIMALISM',
              desc: 'No frivolous vents, fake exhausts, or superficial creases. Pure proportion and aerodynamic purity dictate every surface.'
            },
            {
              icon: Flame,
              title: 'MECHANICAL EMOTION',
              desc: 'Steering rack ratios, pedal firmness, and chassis balance calibrated by racing drivers on real mountain asphalt.'
            },
            {
              icon: Cpu,
              title: 'TRANSPARENT AVIONICS',
              desc: 'Technology exists solely to heighten driver control—not to isolate you into passenger passivity.'
            },
            {
              icon: ShieldCheck,
              title: 'BESPOKE LONGEVITY',
              desc: 'Hand-burnished metals, sustainable full-grain hides, and carbon composites built to endure across generations.'
            }
          ].map((pillar, i) => (
            <div key={i} className="aurelis-card" style={{ padding: '28px' }}>
              <pillar.icon size={28} color="var(--theme-accent)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 700, margin: '0 0 10px' }}>
                {pillar.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6, color: 'var(--theme-text-secondary)', margin: 0 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Historical Timeline */}
        <div className="about-stagger" style={{ borderTop: '1px solid var(--theme-border)', paddingTop: '60px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>CHRONOLOGICAL EVOLUTION</div>
          <h2 className="text-h2" style={{ margin: '0 0 40px' }}>MILESTONES OF CRAFT</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { year: '2022', title: 'PROJECT AURELIS INCEPTION', desc: 'Design studio established with the goal of creating an uncompromising grand tourer.' },
              { year: '2024', title: 'AML-09GT PROTOTYPE CIRCUIT SHAKEDOWN', desc: 'First carbon monocoque mule completes 10,000 km of high-velocity testing.' },
              { year: '2025', title: 'FLAGSHIP MOTOR HOUSE UNVEILING', desc: 'Architectural exhibition center opened on VIP Estate Boulevard.' },
              { year: '2026', title: 'THE ELECTROMAGNETIC ERA (E7 & S6)', desc: 'Rollout of 800V fast-charge electric architectures alongside hand-built V8 & V12 GTs.' }
            ].map((milestone, i) => (
              <div
                key={i}
                className="layout-grid-12"
                style={{
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--theme-border)'
                }}
              >
                <div className="col-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--theme-accent)' }}>
                  {milestone.year}
                </div>
                <div className="col-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700 }}>
                  {milestone.title}
                </div>
                <div className="col-6" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--theme-text-secondary)' }}>
                  {milestone.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <Link to="/cars" className="btn-aurelis">
              EXPLORE CURRENT FLEET <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
