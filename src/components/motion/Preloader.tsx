import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if previously loaded in this session
    const hasSeen = sessionStorage.getItem('aurelis_preloader_done');
    if (hasSeen) {
      setIsDone(true);
      onComplete();
      return;
    }

    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      if (start > 100) {
        clearInterval(interval);
        setProgress(100);
        setIsExpanding(true);
        sessionStorage.setItem('aurelis_preloader_done', 'true');
        setTimeout(() => {
          setIsDone(true);
          onComplete();
        }, 650);
      } else {
        setProgress(start);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  // Calculate SVG speedometer circle parameters
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#111417',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F7F8F9',
        overflow: 'hidden',
        opacity: isExpanding ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isExpanding ? 'scale(1.2)' : 'scale(1)',
        pointerEvents: isExpanding ? 'none' : 'auto'
      }}
    >
      {/* Expanding aperture circle */}
      <div
        style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isExpanding ? 'scale(8)' : 'scale(1)',
          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          {/* Outer Track */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
          />
          {/* Travelling Blue Speedometer Indicator */}
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="#2563FF"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
          {/* Subtle tick marks around circle */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="140"
                y1="40"
                x2="140"
                y2="46"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1.5"
                transform={`rotate(${angle} 140 140)`}
              />
            );
          })}
        </svg>

        {/* Speedometer Cluster Center Display */}
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#F7F8F9',
              marginBottom: '2px'
            }}
          >
            AURELIS
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '10px'
            }}
          >
            MOTOR COMPANY
          </div>

          {/* Large Cluster Speedometer Number */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '52px',
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#F7F8F9'
            }}
          >
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100'}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.14em',
              color: '#65A0FF',
              marginTop: '8px'
            }}
          >
            {progress >= 60 ? 'CALIBRATING EXPERIENCE' : 'SYSTEM INITIALIZING'}
          </div>
        </div>
      </div>

      {/* Skip indicator for user convenience */}
      <button
        onClick={() => {
          sessionStorage.setItem('aurelis_preloader_done', 'true');
          setIsDone(true);
          onComplete();
        }}
        style={{
          position: 'absolute',
          bottom: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.4)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px'
        }}
      >
        [ SKIP CALIBRATION ]
      </button>
    </div>
  );
};
