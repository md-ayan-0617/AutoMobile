import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        paddingTop: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {/* Minimal rotating square mark */}
        <div
          style={{
            width: '28px',
            height: '28px',
            border: '2px solid var(--theme-border-strong)',
            borderTopColor: 'var(--theme-accent)',
            animation: 'spinAurelis 0.8s linear infinite'
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--theme-text-secondary)'
          }}
        >
          LOADING TELEMETRY DOSSIER...
        </div>
      </div>

      <style>{`
        @keyframes spinAurelis {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
