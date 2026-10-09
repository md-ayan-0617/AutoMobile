import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: 'car' | 'interior' | 'wheel' | 'showroom' | 'general';
  overlayClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Aurelis Motors Vehicle Imagery',
  className = '',
  style,
  fallbackCategory = 'car',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If error occurs, render procedural high-tech automotive visual SVG fallback
  if (error || !src) {
    return (
      <div
        className={`safe-image-fallback ${className}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#111417',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '220px',
          width: '100%',
          ...style
        }}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 800 500"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B1F22" />
              <stop offset="50%" stopColor="#111417" />
              <stop offset="100%" stopColor="#090B0D" />
            </linearGradient>
            <linearGradient id="streamline" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#2563FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
            </linearGradient>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="800" height="500" fill="url(#gradMetallic)" />
          <rect width="800" height="500" fill="url(#gridPattern)" />

          {/* Aerodynamic wind-tunnel vehicle silhouette streamline */}
          <path
            d="M 120 340 C 220 330, 280 230, 420 220 C 560 210, 640 290, 720 330"
            fill="none"
            stroke="url(#streamline)"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 100 350 C 240 350, 310 260, 440 250 C 570 240, 660 320, 750 350"
            fill="none"
            stroke="#2563FF"
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* Minimal Wheel outlines */}
          <circle cx="240" cy="350" r="38" fill="none" stroke="#B9BEC3" strokeWidth="2" opacity="0.5" />
          <circle cx="240" cy="350" r="22" fill="none" stroke="#2563FF" strokeWidth="1.5" opacity="0.7" />
          <circle cx="620" cy="350" r="38" fill="none" stroke="#B9BEC3" strokeWidth="2" opacity="0.5" />
          <circle cx="620" cy="350" r="22" fill="none" stroke="#2563FF" strokeWidth="1.5" opacity="0.7" />

          {/* Ground reflection plane */}
          <line x1="80" y1="388" x2="740" y2="388" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>

        {/* Technical HUD Overlay Tag */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: '#B9BEC3',
            background: 'rgba(0,0,0,0.65)',
            padding: '4px 10px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <span style={{ width: '6px', height: '6px', backgroundColor: '#2563FF', display: 'inline-block' }} />
          AURELIS STUDIO / TELEMETRY ARCHIVE
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', display: 'flex' }}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0.4,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...style
        }}
        {...props}
      />
    </div>
  );
};
