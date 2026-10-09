import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { Vehicle } from '../../types';
import { SafeImage } from '../ui/SafeImage';
import { useCursorStore } from '../../store/useCursorStore';
import { useCompareStore } from '../../store/useCompareStore';

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, priority = false }) => {
  const { setCursor, resetCursor } = useCursorStore();
  const { vehicleIds, addVehicle, removeVehicle } = useCompareStore();
  const isCompared = vehicleIds.includes(vehicle.id);

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeVehicle(vehicle.id);
    } else {
      addVehicle(vehicle.id);
    }
  };

  return (
    <div
      className="vehicle-card"
      onMouseEnter={() => setCursor('EXPLORE', 'EXPLORE')}
      onMouseLeave={resetCursor}
      style={{
        position: 'relative',
        backgroundColor: 'var(--theme-card-bg)',
        border: '1px solid var(--theme-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, transform 0.4s var(--ease-mechanical)'
      }}
    >
      {/* Image Container with Editorial Masking */}
      <Link
        to={`/cars/${vehicle.slug}`}
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: priority ? '360px' : '280px',
          overflow: 'hidden',
          backgroundColor: '#111417'
        }}
      >
        <SafeImage
          src={vehicle.images.profile}
          alt={vehicle.name}
          className="vehicle-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s var(--ease-precision)'
          }}
        />

        {/* Technical HUD Tag on image */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span className="hud-tag">{vehicle.category}</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              padding: '2px 8px',
              backgroundColor: 'rgba(0,0,0,0.65)',
              color: 'var(--theme-accent)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {vehicle.modelCode}
          </span>
        </div>

        {/* Quick Compare Button */}
        <button
          onClick={toggleCompare}
          aria-label={isCompared ? 'Remove from comparison' : 'Add to comparison'}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            backgroundColor: isCompared ? 'var(--theme-accent)' : 'rgba(17, 20, 23, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            zIndex: 3
          }}
        >
          {isCompared ? <Check size={12} /> : <Plus size={12} />}
          <span>{isCompared ? 'QUEUED' : 'COMPARE'}</span>
        </button>

        {/* Subtle light sweep reflection */}
        <div
          className="card-reflection"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none'
          }}
        />
      </Link>

      {/* Editorial Content Info */}
      <div
        style={{
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--theme-text)',
                margin: 0
              }}
            >
              {vehicle.name}
            </h3>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--theme-text-secondary)',
                letterSpacing: '0.06em',
                marginTop: '2px'
              }}
            >
              {vehicle.subline}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--theme-text-secondary)', letterSpacing: '0.1em' }}>
              FROM
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '17px',
                fontWeight: 600,
                color: 'var(--theme-accent)'
              }}
            >
              {vehicle.formattedPrice}
            </div>
          </div>
        </div>

        {/* Technical Specs Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--theme-border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--theme-text)',
            marginTop: 'auto'
          }}
        >
          <span>{vehicle.power} HP</span>
          <span style={{ color: 'var(--theme-border-strong)' }}>|</span>
          <span>{vehicle.driveType}</span>
          <span style={{ color: 'var(--theme-border-strong)' }}>|</span>
          <span style={{ color: 'var(--theme-accent)', fontWeight: 600 }}>0–100: {vehicle.acceleration}s</span>
        </div>

        {/* CTA Links */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
          <Link
            to={`/cars/${vehicle.slug}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--theme-text)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 500
            }}
          >
            EXPLORE SPEC <ArrowRight size={14} />
          </Link>

          <Link
            to={`/configurator`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--theme-accent)',
              textDecoration: 'none'
            }}
          >
            BUILD →
          </Link>
        </div>
      </div>

      <style>{`
        .vehicle-card:hover .vehicle-card-img {
          transform: scale(1.04);
        }
        .vehicle-card:hover {
          border-color: var(--theme-accent);
        }
      `}</style>
    </div>
  );
};
