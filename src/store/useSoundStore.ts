import { create } from 'zustand';

interface SoundStore {
  isPlaying: boolean;
  activeType: string | null;
  playEngineSound: (type: 'v12' | 'v8-turbo' | 'electric-hyper' | 'gt-sports', baseFreq?: number) => void;
  stopSound: () => void;
}

let audioCtx: AudioContext | null = null;
let activeNodes: { stop: () => void } | null = null;

export const useSoundStore = create<SoundStore>((set) => ({
  isPlaying: false,
  activeType: null,

  playEngineSound: (type, baseFreq = 120) => {
    try {
      if (activeNodes) {
        activeNodes.stop();
        activeNodes = null;
      }

      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtx) {
        audioCtx = new AudioCtxClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.connect(audioCtx.destination);

      if (type === 'electric-hyper') {
        // High-tech electric motor acceleration whine
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        // Frequency sweep for electric spooling
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 3.4, now + 1.2);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 2.5);

        osc2.frequency.setValueAtTime(baseFreq * 2, now);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 6.5, now + 1.2);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.8, now + 2.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.frequency.linearRampToValueAtTime(3800, now + 1.2);
        filter.frequency.linearRampToValueAtTime(1600, now + 2.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 0.3);
        masterGain.gain.linearRampToValueAtTime(0.18, now + 1.6);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.9);
        osc2.stop(now + 2.9);

        activeNodes = {
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
            } catch {
              // ignore
            }
          }
        };
      } else {
        // Combustion Engine (V8, V12, GT Sport)
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const subOsc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = type === 'v12' ? 'sawtooth' : 'triangle';
        subOsc.type = 'sine';

        const pitchMultiplier = type === 'v12' ? 2.8 : type === 'gt-sports' ? 2.5 : 2.1;
        const startFreq = baseFreq || 110;

        // Throttle rev profile
        osc1.frequency.setValueAtTime(startFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(startFreq * pitchMultiplier, now + 0.9);
        osc1.frequency.exponentialRampToValueAtTime(startFreq * 1.15, now + 2.6);

        osc2.frequency.setValueAtTime(startFreq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(startFreq * 1.5 * pitchMultiplier, now + 0.9);
        osc2.frequency.exponentialRampToValueAtTime(startFreq * 1.5 * 1.15, now + 2.6);

        subOsc.frequency.setValueAtTime(startFreq * 0.5, now);
        subOsc.frequency.exponentialRampToValueAtTime(startFreq * 0.5 * pitchMultiplier, now + 0.9);
        subOsc.frequency.exponentialRampToValueAtTime(startFreq * 0.5 * 1.1, now + 2.6);

        filter.type = 'lowpass';
        filter.Q.setValueAtTime(4, now);
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(2600, now + 0.9);
        filter.frequency.exponentialRampToValueAtTime(550, now + 2.6);

        osc1.connect(filter);
        osc2.connect(filter);
        subOsc.connect(filter);
        filter.connect(masterGain);

        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.24, now + 0.2);
        masterGain.gain.linearRampToValueAtTime(0.3, now + 0.9);
        masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc1.start(now);
        osc2.start(now);
        subOsc.start(now);
        osc1.stop(now + 2.9);
        osc2.stop(now + 2.9);
        subOsc.stop(now + 2.9);

        activeNodes = {
          stop: () => {
            try {
              osc1.stop();
              osc2.stop();
              subOsc.stop();
            } catch {
              // ignore
            }
          }
        };
      }

      set({ isPlaying: true, activeType: type });

      setTimeout(() => {
        set({ isPlaying: false, activeType: null });
      }, 2900);
    } catch {
      set({ isPlaying: false, activeType: null });
    }
  },

  stopSound: () => {
    if (activeNodes) {
      activeNodes.stop();
      activeNodes = null;
    }
    set({ isPlaying: false, activeType: null });
  }
}));
