import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { CERTIFIED_PREOWNED_VEHICLES } from '../../data/preowned';
import { SafeImage } from '../../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const PreOwnedPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<typeof CERTIFIED_PREOWNED_VEHICLES[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.preowned-stagger', {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCar(null);
    };
    if (selectedCar) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCar]);

  return (
    <div ref={containerRef} className="pre-owned-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="preowned-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            AURELIS CERTIFIED PROVENANCE // PRE-OWNED
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            DRIVEN.<br />
            CHECKED.<br />
            READY.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            Every pre-owned Aurelis undergoes a rigorous 100+ point mechanical audit by master factory technicians. Factory warranty preserved.
          </p>
        </div>

        {/* 5-Pillar Certification Guarantee Banner */}
        <div
          className="preowned-stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '16px',
            backgroundColor: 'var(--theme-surface)',
            border: '1px solid var(--theme-border)',
            padding: '24px',
            marginBottom: '60px'
          }}
        >
          {[
            { title: '100+ POINT AUDIT', desc: 'Chassis, battery/combustion, laser alignment check' },
            { title: 'VERIFIED PROVENANCE', desc: 'Single-owner history & full factory service log' },
            { title: '24–36 MO WARRANTY', desc: 'Zero-deduction comprehensive factory extension' },
            { title: 'ROADSIDE ASSIST', desc: '24/7 flatbed nationwide concierge dispatch' },
            { title: '7-DAY RETURN', desc: 'Complete peace of mind return privilege guarantee' }
          ].map((pillar, i) => (
            <div key={i} style={{ borderLeft: '2px solid var(--theme-accent)', paddingLeft: '14px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: 'var(--theme-text)' }}>
                {pillar.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                {pillar.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Certified Vehicle Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}
        >
          {CERTIFIED_PREOWNED_VEHICLES.map((car) => (
            <div
              key={car.id}
              className="aurelis-card preowned-stagger"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="img-zoom-parent" style={{ height: '260px' }}>
                <SafeImage src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: '4px 10px',
                    border: '1px solid var(--theme-accent)',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px'
                  }}
                >
                  <ShieldCheck size={14} color="var(--theme-accent)" />
                  <span>{car.certificationId}</span>
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: 0 }}>
                    {car.name}
                  </h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--theme-accent)' }}>
                    {car.formattedPrice}
                  </span>
                </div>

                {/* Specs Strip */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    padding: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--theme-text)'
                  }}
                >
                  <div>YEAR: <strong>{car.year}</strong></div>
                  <div>ODOMETER: <strong>{car.mileage.toLocaleString()} KM</strong></div>
                  <div>POWERTRAIN: <strong>{car.fuelType}</strong></div>
                  <div>WARRANTY: <strong>{car.warrantyMonths} MOS</strong></div>
                </div>

                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)' }}>
                  Exterior: {car.exteriorColor} | Cabin: {car.interiorColor}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="btn-ghost"
                    style={{ flex: 1, padding: '0.75rem', fontSize: '0.78rem' }}
                  >
                    AUDIT LOG
                  </button>
                  <Link
                    to="/test-drive"
                    className="btn-aurelis"
                    style={{ flex: 1, padding: '0.75rem', fontSize: '0.78rem' }}
                  >
                    INSPECT <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provenance Audit Modal */}
      {selectedCar && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCar(null);
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: '580px', padding: 'clamp(24px, 4vw, 36px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="hud-tag" style={{ marginBottom: '6px' }}>CERTIFIED DOSSIER</span>
                <h3 id="audit-modal-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, margin: 0 }}>
                  {selectedCar.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCar(null)}
                aria-label="Close modal"
                style={{ background: 'none', border: 'none', color: '#8E959B', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-accent)', marginBottom: '16px' }}>
              CERTIFICATE ID: {selectedCar.certificationId} // VIN: AML-CP-{selectedCar.id.toUpperCase()}-2024
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                marginBottom: '20px'
              }}
            >
              <div>ODOMETER: <strong>{selectedCar.mileage.toLocaleString()} KM</strong></div>
              <div>FIRST REGISTERED: <strong>{selectedCar.year}</strong></div>
              <div>OWNERS: <strong>1 (Private Client)</strong></div>
              <div>WARRANTY COVERAGE: <strong>{selectedCar.warrantyMonths} Months</strong></div>
              <div>EXTERIOR: <strong>{selectedCar.exteriorColor}</strong></div>
              <div>INTERIOR: <strong>{selectedCar.interiorColor}</strong></div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginBottom: '8px' }}>
                COMPREHENSIVE AUDIT HIGHLIGHTS
              </div>
              <ul style={{ paddingLeft: '20px', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.8, color: '#B9BEC3' }}>
                <li>✓ Full chassis geometry laser audit (Zero deviations recorded)</li>
                <li>✓ 100% factory fluids flush and brake pad thickness at 92%</li>
                <li>✓ Battery/ECU electronic signature match with central registry</li>
                <li>✓ Ceramic paint surface protection inspected and re-burnished</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/test-drive"
                onClick={() => setSelectedCar(null)}
                className="btn-aurelis"
                style={{ flex: 1, padding: '0.85rem', textAlign: 'center' }}
              >
                SCHEDULE PRIVATE VIEWING <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setSelectedCar(null)}
                className="btn-ghost"
                style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
