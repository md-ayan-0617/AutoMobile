import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteTransition: React.FC = () => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const [label, setLabel] = useState('AURELIS // 01 SHOWROOM');

  useEffect(() => {
    // Generate route specific label
    const path = location.pathname;
    let text = 'AURELIS // DISPATCH';
    if (path === '/') text = 'AURELIS // 01 SHOWROOM';
    else if (path === '/cars') text = 'AURELIS // 02 DOSSIER';
    else if (path.startsWith('/cars/')) text = 'AURELIS // 03 MACHINE DETAIL';
    else if (path === '/configurator') text = 'AURELIS // 04 ATELIER STUDIO';
    else if (path === '/test-drive') text = 'AURELIS // 05 DYNAMIC TRIAL';
    else if (path === '/showroom') text = 'AURELIS // 06 ARCHITECTURE';
    else if (path === '/finance') text = 'AURELIS // 07 CAPITAL';
    else if (path === '/offers') text = 'AURELIS // 08 COMMISSIONS';
    else if (path === '/experience') text = 'AURELIS // 09 PADDOCK';
    else if (path === '/service') text = 'AURELIS // 10 HANGAR';
    else if (path === '/about') text = 'AURELIS // 11 HERITAGE';

    setLabel(text);
    setAnimating(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      setAnimating(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!animating) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Horizontal Wipe Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#111417',
          animation: 'routeWipe 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      />

      {/* Laser line travelling across */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '3px',
          backgroundColor: 'var(--theme-accent)',
          boxShadow: '0 0 15px var(--theme-accent)',
          animation: 'laserTravel 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      />

      {/* Technical HUD Label */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.18em',
          color: '#F7F8F9',
          padding: '8px 18px',
          border: '1px solid var(--theme-accent)',
          backgroundColor: 'rgba(0,0,0,0.85)',
          animation: 'fadeText 0.65s ease forwards'
        }}
      >
        {label}
      </div>

      <style>{`
        @keyframes routeWipe {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        @keyframes laserTravel {
          0% { left: 0%; opacity: 1; }
          50% { left: 50%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes fadeText {
          0% { opacity: 0; transform: scale(0.95); }
          40% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
