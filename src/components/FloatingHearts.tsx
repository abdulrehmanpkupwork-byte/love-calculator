import React, { useMemo } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  swayAmount: number;
}

export const FloatingHearts: React.FC = () => {
  const hearts = useMemo<HeartParticle[]>(() => {
    const colors = [
      'rgba(244, 63, 94, 0.45)', // Rose 500
      'rgba(236, 72, 153, 0.4)', // Pink 500
      'rgba(251, 113, 133, 0.35)', // Rose 400
      'rgba(217, 70, 239, 0.3)', // Fuchsia 500
      'rgba(244, 114, 182, 0.4)', // Pink 400
      'rgba(225, 29, 72, 0.35)', // Rose 600
    ];

    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: Math.round(((i * 4.6 + (i % 5) * 3) % 94) + 3),
      size: Math.round(14 + ((i * 7) % 24)),
      duration: Math.round(12 + ((i * 3) % 14)),
      delay: Math.round(((i * 2.3) % 15) * 10) / 10,
      opacity: Math.round((0.2 + ((i * 5) % 4) * 0.12) * 100) / 100,
      color: colors[i % colors.length],
      swayAmount: ((i % 3) - 1) * 35,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-60px]"
          style={{
            left: `${h.left}%`,
            animation: `floatUpHeart ${h.duration}s infinite linear`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            className="filter drop-shadow-[0_0_8px_rgba(244,63,94,0.3)] transition-transform"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes floatUpHeart {
          0% {
            transform: translateY(0) scale(0.6) rotate(-10deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-55vh) scale(1) rotate(15deg);
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-115vh) scale(1.15) rotate(-20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
