import React from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { useSoundStore } from '../../store/useSoundStore';

interface EngineSoundPreviewProps {
  type?: 'v12' | 'v8-turbo' | 'electric-hyper' | 'gt-sports';
  baseFreq?: number;
  label?: string;
  isElectric?: boolean;
}

export const EngineSoundPreview: React.FC<EngineSoundPreviewProps> = ({
  type = 'v8-turbo',
  baseFreq = 120,
  label = 'AURELIS V8 TWIN-TURBO ACOUSTIC NOTE',
  isElectric = false
}) => {
  const { isPlaying, activeType, playEngineSound, stopSound } = useSoundStore();
  const isThisPlaying = isPlaying && activeType === type;

  const handleToggle = () => {
    if (isThisPlaying) {
      stopSound();
    } else {
      playEngineSound(type, baseFreq);
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        padding: '12px 20px',
        background: 'rgba(17, 20, 23, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--theme-border-strong)',
        color: '#F7F8F9',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <button
        onClick={handleToggle}
        aria-label={isThisPlaying ? 'Stop engine acoustics' : 'Audition engine note'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '38px',
          height: '38px',
          backgroundColor: isThisPlaying ? 'var(--theme-accent)' : 'rgba(255, 255, 255, 0.08)',
          color: '#FFFFFF',
          border: '1px solid var(--theme-border)',
          cursor: 'pointer',
          transition: 'all 0.25s ease'
        }}
      >
        {isThisPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio
            size={12}
            color={isThisPlaying ? 'var(--theme-accent)' : '#8E959B'}
            style={{ animation: isThisPlaying ? 'pulse 1s infinite' : 'none' }}
          />
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#8E959B', textTransform: 'uppercase' }}>
            {isThisPlaying ? (isElectric ? 'HARMONIC PULSE EMITTING' : 'REV TELEMETRY ACTIVE') : 'SOUND OFF / ON-DEMAND'}
          </span>
        </div>

        <button
          onClick={handleToggle}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#F7F8F9',
            textAlign: 'left',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {isThisPlaying ? '[ REV ENGINE (STOP) ]' : `[ AUDITION: ${label} ]`}
        </button>
      </div>

      {/* Dynamic Soundwave Equalizer Bars */}
      {isThisPlaying && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px', marginLeft: '6px' }}>
          {[12, 18, 9, 16, 22, 14, 20, 11].map((h, i) => (
            <span
              key={i}
              style={{
                width: '3px',
                height: `${h}px`,
                backgroundColor: 'var(--theme-accent)',
                animation: `bounceBar ${0.3 + (i % 3) * 0.15}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes bounceBar {
          0% { height: 4px; }
          100% { height: 18px; }
        }
      `}</style>
    </div>
  );
};
