import React, { useState, useRef } from 'react';
import { Wrench, CheckCircle, ShieldCheck, Cpu, BatteryCharging, Sparkles, Send, Loader2 } from 'lucide-react';
import { SafeImage } from '../../components/ui/SafeImage';
import { useGsapContext, gsap } from '../../utils/gsap';

export const ServicePage: React.FC = () => {
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    vehicleModel: 'Aurelis A9 GT',
    regNumber: '',
    serviceType: 'Periodic Precision Maintenance',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    ownerName: '',
    phone: '',
    notes: ''
  });

  useGsapContext(containerRef, () => {
    gsap.from('.service-stagger', {
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
      setBookingRef(`SRV-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSubmitting(false);
      setIsBooked(true);
    }, 600);
  };

  return (
    <div ref={containerRef} className="service-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="service-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            CLINICAL AFTERSALES // HEPA SERVICE HANGAR
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            KEEP<br />
            MOVING.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            Precision engineering demands precision stewardship. Hospital-grade diagnostic cleanrooms, laser geometry rigs, and factory-trained masters.
          </p>
        </div>

        {/* Hangar Hero Image */}
        <div
          className="service-stagger img-zoom-parent"
          style={{
            height: 'clamp(320px, 46vh, 520px)',
            border: '1px solid var(--theme-border)',
            marginBottom: '60px'
          }}
        >
          <SafeImage
            src="/images/service_bay.jpg"
            alt="Clinical service bay"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px',
            marginBottom: '70px'
          }}
        >
          {[
            { icon: Wrench, title: 'PERIODIC MAINTENANCE', desc: 'Fluid telemetry analysis, braking consumables, and 64-point mechanical recalibration.' },
            { icon: Cpu, title: 'DIAGNOSTICS & OTA', desc: 'Direct satellite CAN-bus audit, ECU engine map alignment, and sensor zero-point tuning.' },
            { icon: Sparkles, title: 'ATELIER DETAILING', desc: 'Ceramic paint protection, multi-stage swirl removal, and steam conditioning of natural hides.' },
            { icon: BatteryCharging, title: 'EV HIGH-VOLTAGE CARE', desc: 'Cell balancing, coolant circuit flush, and 800V fast-charging harness certification.' },
            { icon: ShieldCheck, title: 'CHASSIS & GEOMETRY', desc: 'Sub-millimeter laser suspension alignment and four-corner corner-weight balance.' }
          ].map((item, i) => (
            <div key={i} className="aurelis-card service-stagger" style={{ padding: '28px' }}>
              <item.icon size={26} color="var(--theme-accent)" style={{ marginBottom: '14px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.6, color: 'var(--theme-text-secondary)', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Service Booking Form */}
        <div
          className="service-stagger"
          style={{
            backgroundColor: 'var(--theme-surface)',
            border: '1px solid var(--theme-border)',
            padding: 'clamp(28px, 4vw, 50px)',
            maxWidth: '880px',
            margin: '0 auto'
          }}
        >
          {isBooked ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle size={40} color="var(--theme-accent)" style={{ margin: '0 auto 16px' }} />
              <div className="hud-tag" style={{ marginBottom: '12px' }}>
                SERVICE BAY SLOT COMMITTED
              </div>
              <h2 className="text-h2" style={{ margin: '8px 0 16px' }}>
                SERVICE REQUEST CONFIRMED
              </h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--theme-accent)', marginBottom: '20px' }}>
                REFERENCE: {bookingRef}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--theme-text-secondary)', maxWidth: '580px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                Your service intake for <strong>{formState.vehicleModel}</strong> ({formState.regNumber}) on <strong>{formState.preferredDate}</strong> has been logged into the hangar manifest. Our lead service engineer will contact you shortly.
              </p>
              <button onClick={() => setIsBooked(false)} className="btn-aurelis">
                BOOK ANOTHER SERVICE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div className="hud-tag" style={{ marginBottom: '8px' }}>SERVICE SCHEDULING</div>
                <h2 className="text-h2" style={{ margin: 0 }}>BOOK HANGAR APPOINTMENT</h2>
              </div>

              <div className="form-row-2col">
                <div>
                  <label htmlFor="service-model" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    VEHICLE MODEL *
                  </label>
                  <select
                    id="service-model"
                    value={formState.vehicleModel}
                    onChange={(e) => setFormState({ ...formState, vehicleModel: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', fontFamily: 'var(--font-mono)' }}
                  >
                    <option value="Aurelis A9 GT">Aurelis A9 GT</option>
                    <option value="Aurelis E7 Electric">Aurelis E7 Electric</option>
                    <option value="Aurelis R8 Performance">Aurelis R8 Performance</option>
                    <option value="Aurelis X5 SUV">Aurelis X5 SUV</option>
                    <option value="Aurelis V12 Grand">Aurelis V12 Grand</option>
                    <option value="Aurelis S6 Electric">Aurelis S6 Electric</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service-reg" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    REGISTRATION / VIN *
                  </label>
                  <input
                    id="service-reg"
                    type="text"
                    required
                    placeholder="e.g. CG 04 AB 9009"
                    value={formState.regNumber}
                    onChange={(e) => setFormState({ ...formState, regNumber: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div>
                  <label htmlFor="service-type" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    SERVICE REQUIREMENT *
                  </label>
                  <select
                    id="service-type"
                    value={formState.serviceType}
                    onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', fontFamily: 'var(--font-mono)' }}
                  >
                    <option value="Periodic Precision Maintenance">Periodic Precision Maintenance</option>
                    <option value="Telemetry & Software ECU Diagnostic">Telemetry & Software ECU Diagnostic</option>
                    <option value="Atelier Protective Detailing">Atelier Protective Detailing</option>
                    <option value="Braking & Track Pack Alignment">Braking & Track Pack Alignment</option>
                    <option value="High-Voltage EV Health Certificate">High-Voltage EV Health Certificate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service-date" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    PREFERRED DATE *
                  </label>
                  <input
                    id="service-date"
                    type="date"
                    required
                    value={formState.preferredDate}
                    onChange={(e) => setFormState({ ...formState, preferredDate: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div>
                  <label htmlFor="service-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    OWNER / CONTACT NAME *
                  </label>
                  <input
                    id="service-name"
                    type="text"
                    required
                    placeholder="Full name"
                    value={formState.ownerName}
                    onChange={(e) => setFormState({ ...formState, ownerName: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)' }}
                  />
                </div>

                <div>
                  <label htmlFor="service-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    TELEPHONE NUMBER *
                  </label>
                  <input
                    id="service-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service-notes" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                  TECHNICAL NOTES OR SPECIAL OBSERVATIONS
                </label>
                <textarea
                  id="service-notes"
                  rows={3}
                  placeholder="e.g. slight resonance at 130 km/h, brake squeal evaluation..."
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', backgroundColor: 'var(--theme-bg)', border: '1px solid var(--theme-border-strong)', color: 'var(--theme-text)', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-aurelis"
                style={{ padding: '0.95rem', marginTop: '8px', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <>COMMITTING SLOT... <Loader2 className="animate-spin" size={16} /></>
                ) : (
                  <>COMMIT SERVICE APPOINTMENT <Send size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
