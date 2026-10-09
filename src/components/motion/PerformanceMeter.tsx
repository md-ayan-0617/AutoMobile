import React, { useEffect, useRef, useState } from 'react';

interface MetricItem {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
  highlight?: boolean;
}

interface PerformanceMeterProps {
  metrics?: MetricItem[];
  className?: string;
}

export const PerformanceMeter: React.FC<PerformanceMeterProps> = ({
  metrics = [
    { label: '0–100 KM/H', value: 4.1, unit: 'SEC', decimals: 1, highlight: true },
    { label: 'MAX POWER', value: 420, unit: 'HP', decimals: 0 },
    { label: 'PEAK TORQUE', value: 580, unit: 'NM', decimals: 0 },
    { label: 'TOP SPEED', value: 285, unit: 'KM/H', decimals: 0 }
  ],
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => metrics.map(() => 0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate upward count
          const duration = 1600; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts(metrics.map((m) => m.value * ease));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(metrics.map((m) => m.value));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, metrics]);

  return (
    <div
      ref={containerRef}
      className={`performance-meter-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        width: '100%'
      }}
    >
      {metrics.map((m, idx) => {
        const val = counts[idx] || 0;
        const displayVal = m.decimals ? val.toFixed(m.decimals) : Math.round(val);

        return (
          <div
            key={m.label}
            style={{
              padding: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--theme-border)',
              borderTop: m.highlight ? '2px solid var(--theme-accent)' : '1px solid var(--theme-border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Tech HUD mark */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--theme-text-secondary)',
                  textTransform: 'uppercase'
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--theme-accent)',
                  opacity: 0.7
                }}
              >
                CH-0{idx + 1}
              </span>
            </div>

            {/* Live Counted Number */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: m.highlight ? 'var(--theme-accent)' : 'var(--theme-text)'
                }}
              >
                {displayVal}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  color: 'var(--theme-text-secondary)'
                }}
              >
                {m.unit}
              </span>
            </div>

            {/* Progress gauge line */}
            <div
              style={{
                marginTop: '16px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                width: '100%',
                position: 'relative'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: hasAnimated ? '100%' : '0%',
                  backgroundColor: m.highlight ? 'var(--theme-accent)' : 'var(--theme-text-secondary)',
                  transition: `width 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.12}s`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
