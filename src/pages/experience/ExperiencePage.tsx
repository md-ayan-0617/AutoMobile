import React, { useRef } from 'react';
import { EXPERIENCES } from '../../data/experience';
import { SafeImage } from '../../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.experience-block', {
      opacity: 0,
      y: 35,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  });

  return (
    <div ref={containerRef} className="experience-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="experience-block" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            AURELIS CULTURE // MOTORSPORT & EXPEDITIONS
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            MORE THAN<br />
            A SHOWROOM.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '800px', margin: 0 }}>
            Automotive devotion is lived on the asphalt. Discover our curated owner expeditions, circuit telemetry days, and design symposia.
          </p>
        </div>

        {/* Experience Stories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {EXPERIENCES.map((exp, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={exp.id}
                className="layout-grid-12 experience-block"
                style={{
                  alignItems: 'center',
                  borderBottom: '1px solid var(--theme-border)',
                  paddingBottom: '80px'
                }}
              >
                {/* Image Column */}
                <div
                  className={`col-7 img-zoom-parent ${isReversed ? 'order-md-2' : ''}`}
                  style={{
                    height: 'clamp(320px, 46vh, 520px)',
                    position: 'relative',
                    border: '1px solid var(--theme-border)'
                  }}
                >
                  <SafeImage src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(0,0,0,0.75)',
                      color: 'var(--theme-accent)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {exp.tag} // {exp.location}
                  </span>
                </div>

                {/* Editorial Content Column */}
                <div
                  className={`col-5 ${isReversed ? 'order-md-1' : ''}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                    {exp.date}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3.2vw, 38px)', fontWeight: 700, margin: 0 }}>
                    {exp.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.7, color: 'var(--theme-text-secondary)', margin: 0 }}>
                    {exp.description}
                  </p>

                  {/* Quote */}
                  <blockquote
                    className="font-editorial"
                    style={{
                      fontSize: '18px',
                      color: 'var(--theme-text)',
                      borderLeft: '2px solid var(--theme-accent)',
                      paddingLeft: '16px',
                      margin: '8px 0'
                    }}
                  >
                    "{exp.quote}"
                  </blockquote>

                  {/* Stats Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                      gap: '12px',
                      borderTop: '1px solid var(--theme-border)',
                      paddingTop: '16px',
                      marginTop: '8px'
                    }}
                  >
                    {exp.stats.map((st, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)' }}>
                          {st.label}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--theme-text)', marginTop: '2px' }}>
                          {st.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: '12px' }}>
                    <Link to="/test-drive" className="btn-aurelis" style={{ padding: '0.75rem 1.6rem' }}>
                      INQUIRE ABOUT ENTRY <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
