import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Briefcase, MapPin, Send, CheckCircle2, Loader2, X } from 'lucide-react';
import { CAREER_ROLES } from '../../data/careers';
import { CareerRole } from '../../types';
import { useGsapContext, gsap } from '../../utils/gsap';

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [applied, setApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantUrl, setApplicantUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.careers-stagger', {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRole(null);
    };
    if (selectedRole) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRole]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setApplied(true);
    }, 600);
  };

  return (
    <div ref={containerRef} className="careers-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="careers-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            ENGINEERING & STYLING PADDOCK // CAREERS
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            BUILD WHAT<br />
            MOVES PEOPLE.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            We are looking for aerodynamicists, software architects, master upholsterers, and client advisors driven by obsessive craft.
          </p>
        </div>

        {/* Culture Statement Banner */}
        <div
          className="layout-grid-12 careers-stagger"
          style={{
            backgroundColor: '#111417',
            color: '#F7F8F9',
            border: '1px solid var(--theme-border)',
            padding: 'clamp(28px, 4vw, 48px)',
            marginBottom: '60px',
            alignItems: 'center'
          }}
        >
          <div className="col-7">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.14em', marginBottom: '8px' }}>
              OUR WORKING ENVIRONMENT
            </div>
            <h2 className="text-h2" style={{ color: '#FFF', margin: '0 0 16px' }}>
              SMALL TEAMS. ZERO CORPORATE THEATRE.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#B9BEC3', lineHeight: 1.7, margin: 0 }}>
              At Aurelis, engineers talk directly to test drivers, and clay sculptors test aero coefficients in the same paddock. We reject bureaucratic drag in favor of rapid, empirical innovation.
            </p>
          </div>

          <div
            className="col-5"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              paddingLeft: '24px'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>✓ RACETRACK & CFD ACCESS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>✓ DIRECT BESPOKE COMMISSION RECOGNITION</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>✓ PRIVATE VEHICLE LEASING PRIVILEGES</div>
          </div>
        </div>

        {/* Open Roles */}
        <div className="careers-stagger" style={{ marginBottom: '40px' }}>
          <div className="hud-tag" style={{ marginBottom: '14px' }}>CURRENT OPENINGS</div>
          <h2 className="text-h2" style={{ margin: '0 0 32px' }}>ACTIVE PADDOCK POSITIONS</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                className="aurelis-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ maxWidth: '640px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 8px', backgroundColor: 'var(--theme-accent)', color: '#FFF' }}>
                      {role.department}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
                      {role.location} // {role.type}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: '4px 0 8px' }}>
                    {role.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--theme-text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {role.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setApplied(false);
                  }}
                  className="btn-aurelis"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.8rem' }}
                >
                  VIEW ROLE DOSSIER <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Details & Application Modal */}
      {selectedRole && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRole(null);
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: '600px', padding: 'clamp(24px, 4vw, 36px)' }}>
            {applied ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle2 size={40} color="var(--theme-accent)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                  CANDIDACY DOSSIER LOGGED
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#B9BEC3', marginBottom: '24px', lineHeight: 1.6 }}>
                  Thank you, <strong>{applicantName}</strong>. Your portfolio submission for the <strong>{selectedRole.title}</strong> role has been assigned to our engineering directors.
                </p>
                <button onClick={() => setSelectedRole(null)} className="btn-aurelis">
                  CLOSE
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)' }}>
                      {selectedRole.department} // {selectedRole.location}
                    </span>
                    <h3 id="career-modal-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, margin: '4px 0 0' }}>
                      {selectedRole.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedRole(null)}
                    aria-label="Close modal"
                    style={{ background: 'none', border: 'none', color: '#8E959B', cursor: 'pointer', padding: '4px' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginBottom: '8px' }}>
                    KEY RESPONSIBILITIES:
                  </div>
                  <ul style={{ paddingLeft: '20px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B9BEC3', lineHeight: 1.6 }}>
                    {selectedRole.responsibilities.map((res, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{res}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-accent)', margin: 0 }}>
                    TRANSMIT CANDIDACY
                  </h4>

                  <div>
                    <label htmlFor="applicant-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B', marginBottom: '4px' }}>
                      FULL NAME *
                    </label>
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#16191C', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="applicant-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B', marginBottom: '4px' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="applicant-email"
                      type="email"
                      required
                      placeholder="elena@domain.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#16191C', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="applicant-url" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#8E959B', marginBottom: '4px' }}>
                      PORTFOLIO / GITHUB / LINKEDIN URL
                    </label>
                    <input
                      id="applicant-url"
                      type="url"
                      placeholder="https://github.com/..."
                      value={applicantUrl}
                      onChange={(e) => setApplicantUrl(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#16191C', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-aurelis"
                      style={{ flex: 1, padding: '0.85rem', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? (
                        <>TRANSMITTING DOSSIER... <Loader2 className="animate-spin" size={16} /></>
                      ) : (
                        <>SUBMIT APPLICATION <Send size={14} /></>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
