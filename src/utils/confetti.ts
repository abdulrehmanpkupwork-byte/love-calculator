import confetti from 'canvas-confetti';

export function fireLoveConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ff2a6d', '#ff758c', '#ff7eb3', '#f43f5e', '#ec4899', '#ffd166', '#ffffff'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-stage fireworks-like romantic burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // Secondary side bursts after a quick delay
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
  }, 400);
}
