/**
 * Love Calculator deterministic algorithm & scoring details
 */

export interface LoveResultData {
  name1: string;
  name2: string;
  score: number;
  tier: 'just_friends' | 'spark' | 'great_match' | 'soulmates';
  title: string;
  badge: string;
  quote: string;
  description: string;
  advice: string;
  metrics: {
    label: string;
    value: number;
    description: string;
  }[];
}

/**
 * Calculates a deterministic love score (10 - 99) based on two names.
 * The order of names does NOT matter (e.g. Romeo & Juliet === Juliet & Romeo).
 */
export function calculateLoveScore(name1: string, name2: string): number {
  // Normalize names: lowercase, strip all non-alphanumeric characters
  const clean1 = name1.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  const clean2 = name2.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  // Sort names alphabetically so order never changes the outcome
  const [first, second] = [clean1, clean2].sort();

  // Primary string representation
  const canonical = `${first}&${second}`;

  // Polynomial hash combining prime multiples
  let hash1 = 5381;
  let hash2 = 0x811c9dc5;

  for (let i = 0; i < canonical.length; i++) {
    const code = canonical.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ code;
    hash2 = Math.imul(hash2 ^ code, 16777619);
  }

  // Romantic letter resonance (letters in L-O-V-E and S-O-U-L)
  const romanticChars = ['l', 'o', 'v', 'e', 's', 'u', 'r', 't', 'm', 'a'];
  let resonance = 0;
  for (let i = 0; i < canonical.length; i++) {
    if (romanticChars.includes(canonical[i])) {
      resonance += (i + 1) * 3;
    }
  }

  const combinedHash = Math.abs(hash1 ^ hash2) + resonance;

  // Distribute across 15 to 99 to cover all 4 tiers nicely:
  // 0-30%: 15-30%
  // 31-60%: 31-60%
  // 61-80%: 61-80%
  // 81-100%: 81-99%
  const score = (combinedHash % 85) + 15;

  return Math.min(99, Math.max(15, score));
}

export function getLoveDetails(name1: string, name2: string): LoveResultData {
  const formatted1 = name1.trim().replace(/^\w/, (c) => c.toUpperCase());
  const formatted2 = name2.trim().replace(/^\w/, (c) => c.toUpperCase());
  const score = calculateLoveScore(name1, name2);

  // Deterministic sub-metrics
  const metricSeed = Math.abs(
    (name1 + name2).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );

  const chemistry = Math.min(100, Math.max(20, Math.round(score * 0.95 + (metricSeed % 11) - 5)));
  const communication = Math.min(100, Math.max(25, Math.round(score * 0.9 + ((metricSeed * 3) % 15) - 7)));
  const emotionalSync = Math.min(100, Math.max(18, Math.round(score * 1.02 + ((metricSeed * 7) % 9) - 4)));
  const loyalty = Math.min(100, Math.max(30, Math.round(score * 0.98 + ((metricSeed * 5) % 13) - 6)));

  const metrics = [
    { label: 'Chemistry', value: chemistry, description: 'Natural spark & magnetic attraction' },
    { label: 'Communication', value: communication, description: 'Ease of deep talks & mutual understanding' },
    { label: 'Emotional Sync', value: emotionalSync, description: 'Intuitive empathy & wavelength' },
    { label: 'Loyalty & Trust', value: loyalty, description: 'Foundation for steady companionship' },
  ];

  if (score <= 30) {
    return {
      name1: formatted1,
      name2: formatted2,
      score,
      tier: 'just_friends',
      title: 'Just Friends',
      badge: 'Charming Pals',
      quote: 'Great friendships are the rarest treasure on earth.',
      description: `${formatted1} and ${formatted2} have a lighthearted, drama-free dynamic. While fireworks might not be lighting up the midnight sky, you two share honest laughs, zero pretenses, and a comfortable companionship.`,
      advice: 'Enjoy the easygoing camaraderie. Sometimes the truest bonds are built on being each other’s favorite person to vent and joke with!',
      metrics,
    };
  }

  if (score <= 60) {
    return {
      name1: formatted1,
      name2: formatted2,
      score,
      tier: 'spark',
      title: 'There is a Spark!',
      badge: 'Curious Chemistry',
      quote: 'Where curiosity wanders, magic often follows.',
      description: `There is a distinct electric twinkle between ${formatted1} and ${formatted2}! With playful banter, shared inside jokes, and mutual intrigue, there is plenty of room for this cozy flame to ignite into something deeper.`,
      advice: 'Plan an unexpected coffee date or a late-night music exchange. A little romantic intention can easily turn this spark into a bonfire.',
      metrics,
    };
  }

  if (score <= 80) {
    return {
      name1: formatted1,
      name2: formatted2,
      score,
      tier: 'great_match',
      title: 'Great Match!',
      badge: 'Harmonious Duo',
      quote: 'Two souls meeting at the exact right frequency.',
      description: `${formatted1} and ${formatted2} are remarkably compatible! Your values, humor, and lifestyles align with ease. You bring out the best in one another and have that comforting feeling of home whenever you connect.`,
      advice: 'You have a golden foundation. Keep celebrating each other’s victories and creating little spontaneous rituals together.',
      metrics,
    };
  }

  return {
    name1: formatted1,
    name2: formatted2,
    score,
    tier: 'soulmates',
    title: 'Soulmates!',
    badge: 'Cosmic Affinity',
    quote: 'Written in the stars, bound by unforgettable magnetism.',
    description: `Astounding compatibility! ${formatted1} and ${formatted2} share an almost telepathic harmony. From finish-each-other’s-sentences moments to unconditional affection, you are true twin flames!`,
    advice: 'Hold on tight to this extraordinary connection. Love like this comes along once in a lifetime—cherish and celebrate every chapter!',
    metrics,
  };
}
