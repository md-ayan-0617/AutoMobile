import React, { useState, useMemo, useRef } from 'react';
import { VEHICLES } from '../../data/vehicles';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const FinancePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLES[0].id);
  const selectedVehicle = VEHICLES.find((v) => v.id === selectedVehicleId) || VEHICLES[0];

  const [price, setPrice] = useState(selectedVehicle.price);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [durationMonths, setDurationMonths] = useState(48);
  const [annualInterestRate, setAnnualInterestRate] = useState(8.75);

  useGsapContext(
    () => {
      gsap.from('.finance-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.from('.finance-calc-grid', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
      });
    },
    [],
    containerRef
  );

  // Update base price when vehicle changes
  const handleVehicleChange = (id: string) => {
    setSelectedVehicleId(id);
    const v = VEHICLES.find((item) => item.id === id);
    if (v) setPrice(v.price);
  };

  // Calculations
  const downPaymentAmount = useMemo(() => (price * downPaymentPercent) / 100, [price, downPaymentPercent]);
  const principal = useMemo(() => price - downPaymentAmount, [price, downPaymentAmount]);

  const { monthlyEMI, totalInterest, totalPayable } = useMemo(() => {
    const monthlyRate = annualInterestRate / 12 / 100;
    const n = durationMonths;

    if (monthlyRate === 0) {
      const emi = principal / n;
      return { monthlyEMI: emi, totalInterest: 0, totalPayable: principal };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = emi * n;
    const interest = total - principal;

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayable: Math.round(total)
    };
  }, [principal, annualInterestRate, durationMonths]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div ref={containerRef} className="finance-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="finance-header" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            CAPITAL ALLOCATION // BESPOKE LEASING & EMI
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            THE DRIVE YOU WANT.<br />
            THE PLAN YOU NEED.
          </h1>
          <p className="font-editorial" style={{ fontSize: '24px', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            Structured financing engineered with corporate leasing flexibility, tailored balloon tenures, and transparent depreciation schedules.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div
          className="finance-calc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(30px, 4vw, 50px)',
            marginBottom: '60px'
          }}
        >
          {/* Controls Column (7 Cols) */}
          <div
            className="finance-controls-col"
            style={{
              gridColumn: 'span 7',
              backgroundColor: 'var(--theme-surface)',
              border: '1px solid var(--theme-border)',
              padding: 'clamp(24px, 3.5vw, 44px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}
          >
            {/* Vehicle Select */}
            <div>
              <label htmlFor="fin-vehicle" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '8px' }}>
                SELECT BASE MACHINE
              </label>
              <select
                id="fin-vehicle"
                value={selectedVehicleId}
                onChange={(e) => handleVehicleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: 'var(--theme-bg)',
                  border: '1px solid var(--theme-border-strong)',
                  color: 'var(--theme-text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px'
                }}
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.formattedPrice} ({v.subline})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Valuation Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="fin-price" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
                  COMMISSION VALUATION
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--theme-accent)' }}>
                  {formatINR(price)}
                </span>
              </div>
              <input
                id="fin-price"
                type="range"
                min={12000000}
                max={40000000}
                step={500000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--theme-accent)' }}
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="fin-downpayment" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
                  EQUITY DOWN PAYMENT ({downPaymentPercent}%)
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600 }}>
                  {formatINR(downPaymentAmount)}
                </span>
              </div>
              <input
                id="fin-downpayment"
                type="range"
                min={15}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--theme-accent)' }}
              />
            </div>

            {/* Tenure Buttons */}
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '10px' }}>
                TENURE SCHEDULE (MONTHS)
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                {[12, 24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDurationMonths(m)}
                    style={{
                      padding: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      backgroundColor: durationMonths === m ? 'var(--theme-accent)' : 'var(--theme-bg)',
                      color: durationMonths === m ? '#FFF' : 'var(--theme-text)',
                      border: '1px solid var(--theme-border-strong)',
                      cursor: 'pointer'
                    }}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label htmlFor="fin-rate" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
                  INDICATIVE ANNUAL RATE
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600 }}>
                  {annualInterestRate}% p.a.
                </span>
              </div>
              <input
                id="fin-rate"
                type="range"
                min={7.5}
                max={12.0}
                step={0.25}
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--theme-accent)' }}
              />
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div
            className="finance-summary-col"
            style={{
              gridColumn: 'span 5',
              backgroundColor: '#111417',
              border: '2px solid var(--theme-accent)',
              padding: 'clamp(24px, 3.5vw, 44px)',
              color: '#F7F8F9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.14em', marginBottom: '12px' }}>
                ESTIMATED MONTHLY COMMITMENT
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(32px, 3.8vw, 48px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  letterSpacing: '-0.03em'
                }}
              >
                {formatINR(monthlyEMI)}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginTop: '6px' }}>
                PER MONTH OVER {durationMonths} MONTHS
              </div>
            </div>

            {/* Structured Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: '#8E959B' }}>VEHICLE MODEL</span>
                <strong>{selectedVehicle.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: '#8E959B' }}>EQUITY DOWN PAYMENT</span>
                <strong>{formatINR(downPaymentAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: '#8E959B' }}>NET FINANCED PRINCIPAL</span>
                <strong>{formatINR(principal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: '#8E959B' }}>ESTIMATED TOTAL INTEREST</span>
                <strong>{formatINR(totalInterest)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: '#8E959B' }}>TOTAL OUTLAY OVER TENURE</span>
                <strong style={{ color: 'var(--theme-accent)' }}>{formatINR(totalPayable)}</strong>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/test-drive" className="btn-aurelis" style={{ textAlign: 'center', padding: '0.9rem' }}>
                SUBMIT FOR FINANCIAL CLEARANCE →
              </Link>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646C73', textAlign: 'center', lineHeight: 1.5 }}>
                FOR DEMONSTRATION ONLY. Figures are indicative and do not represent formal credit sanction or financial advice.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .finance-calc-grid {
            grid-template-columns: 1fr !important;
          }
          .finance-controls-col, .finance-summary-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
