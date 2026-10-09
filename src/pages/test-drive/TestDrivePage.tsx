import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, Shield, MapPin, AlertCircle } from 'lucide-react';
import { VEHICLES } from '../../data/vehicles';
import { useGsapContext, gsap } from '../../utils/gsap';

const testDriveSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  phone: z.string().min(10, 'Valid 10-digit telephone number required'),
  email: z.string().email('Please enter a valid email address'),
  vehicleSlug: z.string().min(1, 'Please select a preferred vehicle'),
  preferredDate: z.string().min(1, 'Please select a preferred appointment date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  location: z.string().min(1, 'Please select an experience location'),
  hasValidLicense: z.boolean().refine((val) => val === true, {
    message: 'You must confirm possession of a valid driving license'
  }),
  experienceType: z.enum(['high-speed-track', 'urban-chassis', 'extended-residence'])
});

type TestDriveFormData = z.infer<typeof testDriveSchema>;

export const TestDrivePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionReference, setSubmissionReference] = useState('');
  const [submittedData, setSubmittedData] = useState<TestDriveFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
    defaultValues: {
      vehicleSlug: VEHICLES[0].slug,
      location: 'Raipur Flagship Motor House',
      experienceType: 'urban-chassis',
      hasValidLicense: false
    }
  });

  useGsapContext(
    () => {
      gsap.from('.test-drive-editorial-col', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out'
      });
      gsap.from('.test-drive-form-col', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
      });
    },
    [],
    containerRef
  );

  const onSubmit = async (data: TestDriveFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const refCode = `ATD-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionReference(refCode);
    setSubmittedData(data);
    setIsSuccess(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="test-drive-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {isSuccess ? (
          /* =====================================================================
              CONFIRMATION SCREEN (ATD-XXXX Reference)
              ===================================================================== */
          <div
            style={{
              maxWidth: '720px',
              margin: '40px auto',
              backgroundColor: '#111417',
              border: '2px solid var(--theme-accent)',
              padding: 'clamp(32px, 5vw, 60px)',
              color: '#F7F8F9',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: 'rgba(37,99,255,0.1)', border: '1px solid var(--theme-accent)', marginBottom: '24px' }}>
              <CheckCircle size={36} color="var(--theme-accent)" />
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.18em', marginBottom: '8px' }}>
              AURELIS / TEST DRIVE CONFIRMATION
            </div>

            <h1 className="text-h1" style={{ margin: '0 0 16px', color: '#F7F8F9' }}>
              REQUEST RECEIVED.
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--theme-accent)',
                padding: '12px 24px',
                backgroundColor: '#16191C',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'inline-block',
                margin: '12px auto 28px'
              }}
            >
              REFERENCE: {submissionReference}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6, color: '#B9BEC3', marginBottom: '32px' }}>
              Your appointment request for the{' '}
              <strong>{VEHICLES.find((v) => v.slug === submittedData?.vehicleSlug)?.name}</strong> on{' '}
              <strong>{submittedData?.preferredDate}</strong> at <strong>{submittedData?.preferredTime}</strong> has been assigned to our VIP concierge director. We will contact you at {submittedData?.phone} to confirm dispatch coordinates.
            </p>

            <button
              onClick={() => setIsSuccess(false)}
              className="btn-aurelis"
              style={{ padding: '0.9rem 2.2rem' }}
            >
              BOOK ANOTHER APPOINTMENT
            </button>
          </div>
        ) : (
          /* =====================================================================
              RESERVATION FORM
              ===================================================================== */
          <div
            className="test-drive-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(30px, 4vw, 60px)'
            }}
          >
            {/* Left Column: Editorial Philosophy */}
            <div className="test-drive-editorial-col" style={{ gridColumn: 'span 5' }}>
              <div className="hud-tag" style={{ marginBottom: '16px' }}>
                DYNAMIC EVALUATION // ON-ROAD
              </div>
              <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 20px' }}>
                TAKE THE<br />
                LONG WAY<br />
                HOME.
              </h1>
              <p className="font-editorial" style={{ fontSize: '22px', color: 'var(--theme-text-secondary)', lineHeight: 1.4, marginBottom: '32px' }}>
                "A specification sheet tells you what the car does. Ten kilometers on an open mountain pass tells you who you are behind the wheel."
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--theme-border)', paddingTop: '28px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Shield size={20} color="var(--theme-accent)" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '15px' }}>UNRESTRICTED EVALUATION</strong>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', margin: '4px 0 0' }}>
                      Accompanied by a certified performance driving specialist on curated highway & handling circuits.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--theme-accent)" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '15px' }}>BESPOKE RESIDENCE DISPATCH</strong>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', margin: '4px 0 0' }}>
                      Option for doorstep vehicle delivery to your private estate or corporate office upon request.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: React Hook Form */}
            <div
              className="test-drive-form-col"
              style={{
                gridColumn: 'span 7',
                backgroundColor: 'var(--theme-surface)',
                border: '1px solid var(--theme-border)',
                padding: 'clamp(24px, 3.5vw, 44px)'
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="td-fullName" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      PATRON FULL NAME *
                    </label>
                    <input
                      id="td-fullName"
                      type="text"
                      {...register('fullName')}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        backgroundColor: 'var(--theme-bg)',
                        border: errors.fullName ? '1px solid #FF5A1F' : '1px solid var(--theme-border-strong)',
                        color: 'var(--theme-text)'
                      }}
                    />
                    {errors.fullName && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF5A1F', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={10} /> {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="td-phone" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      TELEPHONE NUMBER *
                    </label>
                    <input
                      id="td-phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        backgroundColor: 'var(--theme-bg)',
                        border: errors.phone ? '1px solid #FF5A1F' : '1px solid var(--theme-border-strong)',
                        color: 'var(--theme-text)'
                      }}
                    />
                    {errors.phone && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF5A1F', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={10} /> {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="td-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="td-email"
                    type="email"
                    {...register('email')}
                    placeholder="patron@domain.com"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      backgroundColor: 'var(--theme-bg)',
                      border: errors.email ? '1px solid #FF5A1F' : '1px solid var(--theme-border-strong)',
                      color: 'var(--theme-text)'
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF5A1F', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <AlertCircle size={10} /> {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Preferred Vehicle */}
                <div>
                  <label htmlFor="td-vehicle" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    SELECT VEHICLE OF INTEREST *
                  </label>
                  <select
                    id="td-vehicle"
                    {...register('vehicleSlug')}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      backgroundColor: 'var(--theme-bg)',
                      border: '1px solid var(--theme-border-strong)',
                      color: 'var(--theme-text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px'
                    }}
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.name} ({v.subline} — {v.power} HP)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label htmlFor="td-date" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      PREFERRED DATE *
                    </label>
                    <input
                      id="td-date"
                      type="date"
                      {...register('preferredDate')}
                      defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        backgroundColor: 'var(--theme-bg)',
                        border: errors.preferredDate ? '1px solid #FF5A1F' : '1px solid var(--theme-border-strong)',
                        color: 'var(--theme-text)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                    {errors.preferredDate && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF5A1F', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <AlertCircle size={10} /> {errors.preferredDate.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="td-time" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                      PREFERRED TIME SLOT *
                    </label>
                    <select
                      id="td-time"
                      {...register('preferredTime')}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        backgroundColor: 'var(--theme-bg)',
                        border: '1px solid var(--theme-border-strong)',
                        color: 'var(--theme-text)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px'
                      }}
                    >
                      <option value="10:00 AM">10:00 AM — Morning Crisp</option>
                      <option value="01:30 PM">01:30 PM — Afternoon Highway</option>
                      <option value="05:00 PM">05:00 PM — Golden Hour Ridge</option>
                      <option value="07:30 PM">07:30 PM — Night Drive Experience</option>
                    </select>
                  </div>
                </div>

                {/* Location Selection */}
                <div>
                  <label htmlFor="td-location" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)', marginBottom: '6px' }}>
                    EXPERIENCE CENTER OR LOCATION *
                  </label>
                  <select
                    id="td-location"
                    {...register('location')}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      backgroundColor: 'var(--theme-bg)',
                      border: '1px solid var(--theme-border-strong)',
                      color: 'var(--theme-text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px'
                    }}
                  >
                    <option value="Raipur Flagship Motor House">Aurelis Motor House — VIP Estate Boulevard, Raipur</option>
                    <option value="Private Residence Dispatch">Private Residence / Estate Dispatch</option>
                    <option value="Circuit Homologated Paddock">Circuit Homologated Proving Paddock</option>
                  </select>
                </div>

                {/* License Checkbox */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingTop: '8px' }}>
                  <input
                    type="checkbox"
                    id="licenseCheck"
                    {...register('hasValidLicense')}
                    style={{ marginTop: '4px', accentColor: 'var(--theme-accent)' }}
                  />
                  <label htmlFor="licenseCheck" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--theme-text-secondary)', cursor: 'pointer' }}>
                    I confirm that I possess a valid national or international four-wheeler driving license and agree to adhere to Aurelis safety guidelines during dynamic evaluation.
                  </label>
                </div>
                {errors.hasValidLicense && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#FF5A1F', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={10} /> {errors.hasValidLicense.message}
                  </span>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-aurelis"
                  style={{ width: '100%', padding: '1rem', marginTop: '12px' }}
                >
                  {isSubmitting ? 'TRANSMITTING REQUEST...' : 'CONFIRM TEST DRIVE RESERVATION →'}
                </button>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-text-secondary)', textAlign: 'center' }}>
                  *All bookings subject to concierge schedule verification. Fictional demo environment.
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .test-drive-grid {
            grid-template-columns: 1fr !important;
          }
          .test-drive-editorial-col, .test-drive-form-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
