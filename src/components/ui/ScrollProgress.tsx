import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'transparent',
        zIndex: 10001,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollPercent}%`,
          backgroundColor: 'var(--theme-accent)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px var(--theme-accent)'
        }}
      />
    </div>
  );
};
