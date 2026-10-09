import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 20px 60px'
      }}
    >
      <div className="hud-tag" style={{ marginBottom: '16px' }}>
        TELEMETRY ERROR // 0x404_OFF_COURSE
      </div>

      <h1
        className="text-mega"
        style={{
          color: 'var(--theme-text)',
          margin: '0 0 16px'
        }}
      >
        404
      </h1>

      <p className="font-editorial" style={{ fontSize: '28px', color: 'var(--theme-text-secondary)', maxWidth: '600px', margin: '0 auto 36px' }}>
        You have drifted off the paved circuit. No vehicular telemetry recorded at these coordinates.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-aurelis">
          RETURN TO HOME PADDOCK <ArrowRight size={14} />
        </Link>
        <Link to="/cars" className="btn-ghost">
          EXPLORE VEHICLE LINEUP
        </Link>
      </div>
    </div>
  );
};
