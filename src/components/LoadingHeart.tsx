import React, { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface LoadingHeartProps {
  name1: string;
  name2: string;
}

const steps = [
  'Reading cardiac frequencies...',
  'Aligning romantic constellations...',
  "Consulting Cupid's secret formula...",
  'Harmonizing your love wavelengths...',
];

export const LoadingHeart: React.FC<LoadingHeartProps> = ({ name1, name2 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Play heartbeat sounds
    soundFx.playHeartbeat();
    const soundInterval = setInterval(() => {
      soundFx.playHeartbeat();
    }, 700);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 500);

    return () => {
      clearInterval(soundInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-12 max-w-lg w-full mx-auto text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
      {/* Background ambient pulse */}
      <div className="absolute w-48 h-48 rounded-full bg-rose-500/20 blur-3xl animate-pulse pointer-events-none" />

      {/* Couples tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs md:text-sm font-medium mb-8">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Analyzing {name1} + {name2}</span>
      </div>

      {/* Heart Beating Central Graphic */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer pulsing ripple circles */}
        <div className="absolute w-28 h-28 rounded-full border border-pink-500/30 animate-ping opacity-35" style={{ animationDuration: '1.4s' }} />
        <div className="absolute w-36 h-36 rounded-full border border-rose-500/20 animate-ping opacity-25" style={{ animationDuration: '2s' }} />

        {/* Central Beating Heart */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.6)] animate-heartbeat">
          <Heart className="w-12 h-12 text-white fill-white drop-shadow-md" />
        </div>
      </div>

      {/* Loading Step Text */}
      <div className="h-10 flex items-center justify-center">
        <p className="text-pink-100 text-base md:text-lg font-medium tracking-wide animate-pulse">
          {steps[currentStepIndex]}
        </p>
      </div>

      {/* Progress indicator dots */}
      <div className="flex items-center gap-2 mt-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentStepIndex
                ? 'w-6 bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
