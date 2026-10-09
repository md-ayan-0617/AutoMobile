import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useConfiguratorStore, TRIM_OPTIONS } from '../../store/useConfiguratorStore';
import { VEHICLES } from '../../data/vehicles';
import { HeroVehicle3D } from '../../components/three/HeroVehicle3D';
import { SafeImage } from '../../components/ui/SafeImage';
import { useGsapContext, gsap } from '../../utils/gsap';

export const ConfiguratorPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentStep,
    selectedVehicle,
    selectedColor,
    selectedWheel,
    selectedInterior,
    selectedTrim,
    estimatedPrice,
    setStep,
    setVehicle,
    setColor,
    setWheel,
    setInterior,
    setTrim
  } = useConfiguratorStore();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [previewMode, setPreviewMode] = useState<'3D' | 'PHOTO'>('PHOTO');

  const steps = [
    { num: 1, label: 'MODEL' },
    { num: 2, label: 'COLOR' },
    { num: 3, label: 'WHEELS' },
    { num: 4, label: 'INTERIOR' },
    { num: 5, label: 'TRIM' },
    { num: 6, label: 'SUMMARY' }
  ];

  useGsapContext(
    () => {
      gsap.from('.config-top-stepper', {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: 'power3.out'
      });
      gsap.from('.config-preview-panel', {
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      });
    },
    [],
    containerRef
  );

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(estimatedPrice);

  return (
    <div ref={containerRef} className="configurator-page" style={{ paddingTop: '88px', minHeight: '100vh', backgroundColor: 'var(--theme-bg)' }}>
      {/* Top Configurator Step Bar */}
      <div
        className="config-top-stepper"
        style={{
          borderBottom: '1px solid var(--theme-border)',
          backgroundColor: 'var(--theme-surface)',
          padding: '12px 0'
        }}
      >
        <div
          className="showroom-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflowX: 'auto',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--theme-accent)' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em' }}>
              AURELIS ATELIER STUDIO
            </span>
          </div>

          {/* Stepper Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
            {steps.map((st) => {
              const isActive = currentStep === st.num;
              const isPast = currentStep > st.num;
              return (
                <button
                  key={st.num}
                  onClick={() => setStep(st.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    padding: '6px 10px',
                    backgroundColor: isActive ? 'var(--theme-text)' : 'transparent',
                    color: isActive ? 'var(--theme-bg)' : isPast ? 'var(--theme-text)' : 'var(--theme-text-secondary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>0{st.num}</span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Estimated Ticker */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--theme-accent)', whiteSpace: 'nowrap' }}>
            EST: {formattedTotal}
          </div>
        </div>
      </div>

      {/* Main 70% / 30% Split Layout */}
      <div
        className="showroom-container-fluid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          minHeight: 'calc(100vh - 140px)'
        }}
      >
        {/* =====================================================================
            LEFT 70%: STICKY VEHICLE PREVIEW
            ===================================================================== */}
        <div
          style={{
            gridColumn: 'span 8',
            position: 'relative',
            backgroundColor: '#111417',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            borderRight: '1px solid var(--theme-border)',
            overflow: 'hidden'
          }}
          className="config-preview-panel"
        >
          {/* Mode Switcher */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setPreviewMode('PHOTO')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                padding: '6px 12px',
                backgroundColor: previewMode === 'PHOTO' ? 'var(--theme-accent)' : 'rgba(0,0,0,0.6)',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer'
              }}
            >
              PHOTOGRAPHIC VIEW
            </button>
            <button
              onClick={() => setPreviewMode('3D')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                padding: '6px 12px',
                backgroundColor: previewMode === '3D' ? 'var(--theme-accent)' : 'rgba(0,0,0,0.6)',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer'
              }}
            >
              3D CANVAS INTERACTIVE
            </button>
          </div>

          {/* Visual Display */}
          <div style={{ width: '100%', height: '100%', minHeight: '480px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {previewMode === '3D' ? (
              <HeroVehicle3D color={selectedColor.hex} />
            ) : currentStep === 4 ? (
              // Interior Preview
              <SafeImage
                src={selectedInterior.image}
                alt={selectedInterior.name}
                style={{ width: '92%', height: '80%', objectFit: 'cover' }}
              />
            ) : (
              // Exterior Color / Wheel Image
              <SafeImage
                src={selectedColor.image}
                alt={`${selectedVehicle.name} in ${selectedColor.name}`}
                style={{ width: '95%', height: '80%', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Active Specification Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '12px 20px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#F7F8F9',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            <div>
              <span style={{ color: 'var(--theme-accent)' }}>SPECIFICATION: </span>
              <strong>{selectedVehicle.name}</strong> / {selectedColor.name} / {selectedWheel.size} / {selectedInterior.name}
            </div>
            <div style={{ color: '#8E959B' }}>
              ALL DATA FICTIONAL DEMONSTRATION ONLY
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT 30%: CONTROLS ACCORDION / STEPPER
            ===================================================================== */}
        <div
          style={{
            gridColumn: 'span 4',
            backgroundColor: 'var(--theme-surface)',
            padding: 'clamp(20px, 3vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto'
          }}
          className="config-controls-panel"
        >
          {/* STEP 1: MODEL */}
          {currentStep === 1 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 01 // ARCHITECTURE</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                SELECT BASE CHASSIS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {VEHICLES.map((v) => {
                  const isSelected = selectedVehicle.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setVehicle(v.id)}
                      style={{
                        padding: '16px',
                        border: isSelected ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>
                          {v.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--theme-accent)' }}>
                          {v.formattedPrice}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                        {v.subline} — {v.power} HP / {v.fuelType}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: COLOR */}
          {currentStep === 2 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 02 // METALLURGY</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                EXTERIOR FINISH
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {selectedVehicle.colors.map((c) => {
                  const isSelected = selectedColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setColor(c)}
                      style={{
                        padding: '14px',
                        border: isSelected ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <span
                        style={{
                          width: '100%',
                          height: '24px',
                          backgroundColor: c.hex,
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textAlign: 'left', fontWeight: 600 }}>
                        {c.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--theme-text-secondary)', textAlign: 'left' }}>
                        {c.metallic ? 'Metallic Clearcoat' : 'Solid Gloss'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: WHEELS */}
          {currentStep === 3 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 03 // RUNNING GEAR</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                ALLOY WHEELS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedVehicle.wheels.map((w) => {
                  const isSelected = selectedWheel.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWheel(w)}
                      style={{
                        padding: '16px',
                        border: isSelected ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700 }}>
                          {w.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-accent)' }}>
                          {w.priceDelta === 0 ? 'INCLUDED' : `+ ₹ ${(w.priceDelta / 100000).toFixed(2)}L`}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                        {w.finish} — Monoblock Forged
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: INTERIOR */}
          {currentStep === 4 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 04 // CABIN LEATHER</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                INTERIOR TEXTILES
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedVehicle.interiors.map((int) => {
                  const isSelected = selectedInterior.id === int.id;
                  return (
                    <button
                      key={int.id}
                      onClick={() => setInterior(int)}
                      style={{
                        padding: '16px',
                        border: isSelected ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '16px', height: '16px', backgroundColor: int.hex, border: '1px solid rgba(0,0,0,0.2)' }} />
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700 }}>
                          {int.name}
                        </span>
                        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-accent)' }}>
                          {int.priceDelta === 0 ? 'INCLUDED' : `+ ₹ ${(int.priceDelta / 100000).toFixed(2)}L`}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--theme-text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>
                        {int.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: TRIM */}
          {currentStep === 5 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 05 // PERFORMANCE PACKS</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                EQUIPMENT TIERS
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {TRIM_OPTIONS.map((t) => {
                  const isSelected = selectedTrim.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTrim(t)}
                      style={{
                        padding: '16px',
                        border: isSelected ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
                        backgroundColor: isSelected ? 'var(--theme-card-bg)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700 }}>
                          {t.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--theme-accent)' }}>
                          {t.priceDelta === 0 ? 'STANDARD' : `+ ₹ ${(t.priceDelta / 100000).toFixed(2)}L`}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--theme-text-secondary)', margin: '6px 0 10px' }}>
                        {t.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {t.specs.map((sp, i) => (
                          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '2px 6px', background: 'rgba(0,0,0,0.06)' }}>
                            • {sp}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: SUMMARY */}
          {currentStep === 6 && (
            <div>
              <div className="hud-tag" style={{ marginBottom: '12px' }}>STEP 06 // COMMISSION SUMMARY</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }}>
                ATELIER SPECIFICATION
              </h2>

              <div style={{ border: '1px solid var(--theme-border)', backgroundColor: 'var(--theme-card-bg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>MODEL:</span>
                  <strong>{selectedVehicle.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>COLOR:</span>
                  <strong>{selectedColor.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>WHEELS:</span>
                  <strong>{selectedWheel.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>INTERIOR:</span>
                  <strong>{selectedInterior.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--theme-text-secondary)' }}>TRIM PACK:</span>
                  <strong>{selectedTrim.name}</strong>
                </div>

                <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: '12px', marginTop: '6px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)' }}>
                    ESTIMATED BUILD PRICE
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 700, color: 'var(--theme-accent)' }}>
                    {formattedTotal}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--theme-text-secondary)', marginTop: '4px' }}>
                    *All pricing figures are fictional demonstration data.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-aurelis"
                  style={{ width: '100%', padding: '1rem' }}
                >
                  REQUEST COMMISSIONS QUOTE →
                </button>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons Bottom */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--theme-border)',
              paddingTop: '20px',
              marginTop: '30px'
            }}
          >
            {currentStep > 1 ? (
              <button
                onClick={() => setStep(currentStep - 1)}
                className="btn-ghost"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem' }}
              >
                <ArrowLeft size={14} /> PREV
              </button>
            ) : <div />}

            {currentStep < 6 ? (
              <button
                onClick={() => setStep(currentStep + 1)}
                className="btn-aurelis"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.78rem' }}
              >
                NEXT STEP <ArrowRight size={14} />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {isQuoteModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(9,11,13,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              backgroundColor: '#111417',
              border: '2px solid var(--theme-accent)',
              maxWidth: '540px',
              width: '100%',
              padding: '36px',
              color: '#F7F8F9'
            }}
          >
            {quoteSubmitted ? (
              <div style={{ textAlign: 'center' }}>
                <Sparkles size={36} color="var(--theme-accent)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                  COMMISSION DOSSIER TRANSMITTED
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--theme-accent)', marginBottom: '16px' }}>
                  REFERENCE CODE: ATQ-2026-{(Math.random() * 9000 + 1000).toFixed(0)}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#8E959B', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you, {clientName}. Your bespoke build configuration for the {selectedVehicle.name} has been archived. A VIP concierge will reach out to schedule your private Atelier viewing.
                </p>
                <button
                  onClick={() => {
                    setIsQuoteModalOpen(false);
                    setQuoteSubmitted(false);
                  }}
                  className="btn-aurelis"
                >
                  RETURN TO STUDIO
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)', letterSpacing: '0.14em' }}>
                      AURELIS BESPOKE COMMISSION
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, margin: '4px 0 0' }}>
                      REQUEST OFFICIAL QUOTE
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#8E959B', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ backgroundColor: '#16191C', padding: '14px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  <div>MODEL: {selectedVehicle.name}</div>
                  <div>SPEC: {selectedColor.name} / {selectedWheel.size} / {selectedTrim.name}</div>
                  <div style={{ color: 'var(--theme-accent)', marginTop: '4px', fontWeight: 600 }}>ESTIMATED TOTAL: {formattedTotal}</div>
                </div>

                <div>
                  <label htmlFor="quote-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginBottom: '6px' }}>
                    PATRON FULL NAME *
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Vikramaditya Singhania"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#16191C',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="quote-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginBottom: '6px' }}>
                    PHONE NUMBER *
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#16191C',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginBottom: '6px' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="patron@estate.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#16191C',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFF',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="submit" className="btn-aurelis" style={{ flex: 1, padding: '0.85rem' }}>
                    TRANSMIT DOSSIER <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 960px) {
          .config-preview-panel {
            grid-column: span 12 !important;
            height: 380px !important;
            min-height: 380px !important;
          }
          .config-controls-panel {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
