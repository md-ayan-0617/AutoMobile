import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { SHOWROOM_DETAILS } from '../../data/showroom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Sales & Commissions',
    message: ''
  });

  useGsapContext(containerRef, () => {
    gsap.from('.contact-stagger', {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div ref={containerRef} className="contact-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="contact-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            VIP CONCIERGE // DIRECT COMMUNICATIONS
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            LET'S TALK<br />
            CARS.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            Connect with our Atelier commission directors, technical service supervisors, or proving ground coordinators.
          </p>
        </div>

        {/* Contact Split */}
        <div className="layout-grid-12 contact-stagger">
          {/* Left Column: Direct Coordinates */}
          <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 className="text-h2" style={{ margin: '0 0 16px' }}>
                AURELIS MOTOR HOUSE
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--theme-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {SHOWROOM_DETAILS.address}
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginTop: '8px' }}>
                COORDINATES: {SHOWROOM_DETAILS.coordinates}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--theme-border)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Phone size={18} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)' }}>VIP HOTLINE</div>
                  <a href={`tel:${SHOWROOM_DETAILS.phone}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--theme-text)', textDecoration: 'none' }}>
                    {SHOWROOM_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Mail size={18} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)' }}>DIRECT DISPATCH</div>
                  <a href={`mailto:${SHOWROOM_DETAILS.email}`} style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--theme-text)', textDecoration: 'none' }}>
                    {SHOWROOM_DETAILS.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Clock size={18} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)' }}>OPERATIONAL HOURS</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-text)' }}>
                    MON–SAT: 09:00 — 20:00 (IST)
                  </div>
                </div>
              </div>
            </div>

            {/* Fictional Demo Note */}
            <div style={{ backgroundColor: 'var(--theme-card-bg)', padding: '16px', border: '1px solid var(--theme-border)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
              NOTE: Aurelis Motors is a production-grade UI automotive brand study. Inquiries submitted via this portal are processed in demo mode.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div
            className="col-7"
            style={{
              backgroundColor: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
              padding: 'clamp(28px, 4vw, 48px)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle2 size={40} color="var(--theme-accent)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                  DISPATCH RECEIVED
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--theme-text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry for the <strong>{formData.department}</strong> division has been forwarded to our VIP desk.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-aurelis">
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, margin: 0 }}>
                  INITIATE DIRECT INQUIRY
                </h3>

                <div className="form-row-2col">
                  <div>
                    <label htmlFor="contact-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)' }}
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div>
                    <label htmlFor="contact-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      TELEPHONE *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-dept" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      DEPARTMENT *
                    </label>
                    <select
                      id="contact-dept"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', fontFamily: 'var(--font-mono)' }}
                    >
                      <option value="Sales & Commissions">Sales & Commissions</option>
                      <option value="Atelier Bespoke Customization">Atelier Bespoke Customization</option>
                      <option value="Certified Pre-Owned Desk">Certified Pre-Owned Desk</option>
                      <option value="Technical Service & Warranty">Technical Service & Warranty</option>
                      <option value="Press & Fleet Concierge">Press & Fleet Concierge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    INQUIRY DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell us about the vehicle commission or concierge service you wish to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-aurelis"
                  style={{ padding: '0.95rem', marginTop: '6px', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <>TRANSMITTING INQUIRY... <Loader2 className="animate-spin" size={16} /></>
                  ) : (
                    <>TRANSMIT TO CONCIERGE <Send size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
