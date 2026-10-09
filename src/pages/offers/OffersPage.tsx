import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Calendar, Check, ArrowRight, Shield, X } from 'lucide-react';
import { EDITORIAL_OFFERS } from '../../data/offers';
import { SafeImage } from '../../components/ui/SafeImage';
import { Link } from 'react-router-dom';
import { useGsapContext, gsap } from '../../utils/gsap';

export const OffersPage: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<typeof EDITORIAL_OFFERS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    gsap.from('.offers-stagger', {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    });
  });

  // Handle ESC key for modal dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedOffer(null);
    };
    if (selectedOffer) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOffer]);

  return (
    <div ref={containerRef} className="offers-page" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="showroom-container">
        {/* Header */}
        <div className="offers-stagger" style={{ marginBottom: '60px', borderBottom: '1px solid var(--theme-border)', paddingBottom: '36px' }}>
          <div className="hud-tag" style={{ marginBottom: '16px' }}>
            PRIVILEGE INCENTIVES // CURATED PROGRAMS
          </div>
          <h1 className="text-hero" style={{ color: 'var(--theme-text)', margin: '0 0 16px' }}>
            CURRENT<br />
            COMMISSIONS.
          </h1>
          <p className="font-editorial" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', color: 'var(--theme-text-secondary)', maxWidth: '780px', margin: 0 }}>
            Editorial allocation privileges designed for discerning owners. Transparent terms, guaranteed factory integrity.
          </p>
        </div>

        {/* Editorial Offer Posters Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}
        >
          {EDITORIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="aurelis-card offers-stagger"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <div className="img-zoom-parent" style={{ height: '240px' }}>
                <SafeImage src={offer.image} alt={offer.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  {offer.tag}
                </span>
              </div>

              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--theme-accent)', letterSpacing: '0.12em' }}>
                    {offer.category}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, margin: '4px 0 0' }}>
                    {offer.title}
                  </h2>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-text-secondary)' }}>
                  {offer.subtitle}
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.6, color: 'var(--theme-text-secondary)' }}>
                  {offer.description}
                </p>

                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    padding: '12px 16px',
                    borderLeft: '2px solid var(--theme-accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--theme-text)',
                    marginTop: 'auto'
                  }}
                >
                  <strong>BENEFIT: </strong>{offer.benefit}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--theme-text-secondary)',
                    borderTop: '1px solid var(--theme-border)',
                    paddingTop: '12px'
                  }}
                >
                  <span>VALID UNTIL: {offer.validUntil}</span>
                </div>

                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="btn-aurelis"
                  style={{ width: '100%', padding: '0.75rem', marginTop: '6px' }}
                >
                  INQUIRE WITH CONCIERGE <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer */}
        <div
          style={{
            padding: '20px',
            backgroundColor: 'var(--theme-surface)',
            border: '1px solid var(--theme-border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--theme-text-secondary)',
            textAlign: 'center'
          }}
        >
          *DISCLAIMER: All campaign events, incentive values, and exchange figures are fictional demonstration assets for Aurelis Motors showcase evaluation.
        </div>
      </div>

      {/* Offer Inquiry Modal */}
      {selectedOffer && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOffer(null);
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: '520px', padding: 'clamp(24px, 4vw, 36px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 id="offer-modal-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: 0 }}>
                {selectedOffer.title}
              </h3>
              <button
                onClick={() => setSelectedOffer(null)}
                aria-label="Close modal"
                style={{ background: 'none', border: 'none', color: '#8E959B', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', marginBottom: '12px' }}>
              CATEGORY: {selectedOffer.category} // VALID: {selectedOffer.validUntil}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#B9BEC3', lineHeight: 1.6, marginBottom: '20px' }}>
              To claim preferential terms under <strong>{selectedOffer.title}</strong>, reserve a private consultation with the Atelier sales director.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                padding: '14px',
                borderLeft: '2px solid var(--theme-accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#FFF',
                marginBottom: '24px'
              }}
            >
              PROMISED PRIVILEGE: {selectedOffer.benefit}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                to="/test-drive"
                onClick={() => setSelectedOffer(null)}
                className="btn-aurelis"
                style={{ textAlign: 'center', padding: '0.85rem' }}
              >
                SCHEDULE CONSULTATION APPOINTMENT <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setSelectedOffer(null)}
                className="btn-ghost"
                style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                DISMISS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
