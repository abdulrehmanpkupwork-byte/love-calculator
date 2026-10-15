import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  score,
  size = 220,
  strokeWidth = 14,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8 seconds smooth count up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * score);
      setDisplayScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [score]);

  // Color scheme based on score
  const getGradientColors = () => {
    if (score <= 30) {
      return { start: '#818cf8', mid: '#a855f7', end: '#ec4899', glow: 'rgba(168, 85, 247, 0.4)' };
    }
    if (score <= 60) {
      return { start: '#f43f5e', mid: '#fb7185', end: '#f59e0b', glow: 'rgba(244, 63, 94, 0.45)' };
    }
    if (score <= 80) {
      return { start: '#ec4899', mid: '#f43f5e', end: '#fb7185', glow: 'rgba(236, 72, 153, 0.5)' };
    }
    return { start: '#ff2a6d', mid: '#f43f5e', end: '#ffd166', glow: 'rgba(255, 42, 109, 0.65)' };
  };

  const colors = getGradientColors();

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-4 rounded-full blur-2xl -z-10 transition-all duration-700"
        style={{ background: colors.glow }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="50%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={colors.start} floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated colored progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#loveGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          filter="url(#glowFilter)"
          style={{
            transition: 'stroke-dashoffset 0.1s ease',
          }}
        />
      </svg>

      {/* Center percentage and label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline justify-center">
          <span
            className={`${
              size <= 130
                ? 'text-2xl sm:text-3xl font-bold'
                : 'text-5xl md:text-6xl font-bold'
            } font-mono tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] tabular-nums`}
          >
            {displayScore}
          </span>
          <span
            className={`${
              size <= 130 ? 'text-xs sm:text-sm' : 'text-2xl md:text-3xl'
            } font-semibold text-pink-300 ml-0.5`}
          >
            %
          </span>
        </div>
        {size > 140 && (
          <span className="text-xs uppercase tracking-widest text-pink-200/80 font-medium mt-1">
            Compatibility
          </span>
        )}
      </div>
    </div>
  );
};
