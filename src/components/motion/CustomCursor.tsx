import React, { useEffect, useRef } from 'react';
import { useCursorStore } from '../../store/useCursorStore';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { variant, text } = useCursorStore();

  useEffect(() => {
    // Only enable on desktop devices that support fine pointer and not prefers-reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const isExpanded = variant !== 'default';

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          borderRadius: '50%',
          backgroundColor: 'var(--theme-accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
          opacity: isExpanded ? 0 : 1
        }}
      />

      {/* Trailing circle */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isExpanded ? '80px' : '28px',
          height: isExpanded ? '80px' : '28px',
          marginLeft: isExpanded ? '-40px' : '-14px',
          marginTop: isExpanded ? '-40px' : '-14px',
          borderRadius: '50%',
          border: isExpanded ? '1px solid var(--theme-accent)' : '1px solid rgba(185, 190, 195, 0.45)',
          backgroundColor: isExpanded ? 'rgba(17, 20, 23, 0.85)' : 'transparent',
          backdropFilter: isExpanded ? 'blur(4px)' : 'none',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform, width, height, background-color',
          transition: 'width 0.28s var(--ease-mechanical), height 0.28s var(--ease-mechanical), margin 0.28s var(--ease-mechanical), background-color 0.25s ease, border-color 0.25s ease'
        }}
      >
        {isExpanded && <span style={{ opacity: 1, userSelect: 'none' }}>{text}</span>}
      </div>
    </>
  );
};
