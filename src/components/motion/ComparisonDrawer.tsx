import React from 'react';
import { X, ArrowRight, Gauge, Zap } from 'lucide-react';
import { useCompareStore } from '../../store/useCompareStore';
import { VEHICLES } from '../../data/vehicles';
import { SafeImage } from '../ui/SafeImage';
import { Link } from 'react-router-dom';

export const ComparisonDrawer: React.FC = () => {
  const { vehicleIds, isOpen, toggleDrawer, removeVehicle, clearAll } = useCompareStore();

  const comparedCars = VEHICLES.filter((v) => vehicleIds.includes(v.id));

  if (!isOpen) {
    if (vehicleIds.length === 0) return null;
    return (
      <button
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 900,
          backgroundColor: '#111417',
          color: '#F7F8F9',
          border: '1px solid var(--theme-accent)',
          padding: '12px 20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--theme-accent)',
            borderRadius: '50%'
          }}
        />
        COMPARE MACHINES ({vehicleIds.length}/3)
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        backgroundColor: 'rgba(9, 11, 13, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      <div
        style={{
          backgroundColor: '#111417',
          borderTop: '2px solid var(--theme-accent)',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 3vw, 40px)',
          color: '#F7F8F9',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--theme-accent)', letterSpacing: '0.14em' }}>
              AURELIS BENCHMARK LAB
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '4px' }}>
              TELEMETRY COMPARISON
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={clearAll}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              [ CLEAR ALL ]
            </button>
            <button
              onClick={toggleDrawer}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '6px', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Columns */}
        {comparedCars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'var(--font-mono)', color: '#8E959B' }}>
            NO VEHICLES CURRENTLY QUEUED FOR COMPARISON. SELECT "COMPARE" ON ANY MODEL.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${comparedCars.length}, minmax(280px, 1fr))`,
              gap: '24px',
              overflowX: 'auto'
            }}
          >
            {comparedCars.map((car) => (
              <div
                key={car.id}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: '#16191C',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                {/* Image & Remove */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <SafeImage src={car.images.profile} alt={car.name} style={{ height: '100%' }} />
                  <button
                    onClick={() => removeVehicle(car.id)}
                    aria-label={`Remove ${car.name}`}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#FFF',
                      padding: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={14} />
                  </button>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      background: 'rgba(0,0,0,0.8)',
                      padding: '2px 6px',
                      color: 'var(--theme-accent)'
                    }}
                  >
                    {car.modelCode}
                  </span>
                </div>

                {/* Identity */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, margin: 0 }}>
                    {car.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8E959B', marginTop: '4px' }}>
                    {car.subline}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--theme-accent)', fontWeight: 600, marginTop: '8px' }}>
                    {car.formattedPrice}
                  </div>
                </div>

                {/* Metrics Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>0–100 KM/H</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.acceleration} SEC</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>MAX POWER</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.power} HP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>PEAK TORQUE</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.torque} NM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>TOP SPEED</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.topSpeed} KM/H</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>DRIVETRAIN</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.driveType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: '#8E959B' }}>ENERGY</span>
                    <span style={{ fontWeight: 600, color: '#F7F8F9' }}>{car.fuelType}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '12px' }}>
                  <Link
                    to={`/cars/${car.slug}`}
                    onClick={toggleDrawer}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textDecoration: 'none'
                    }}
                  >
                    DOSSIER →
                  </Link>
                  <Link
                    to="/configurator"
                    onClick={toggleDrawer}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: 'var(--theme-accent)',
                      color: '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textDecoration: 'none'
                    }}
                  >
                    BUILD
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
