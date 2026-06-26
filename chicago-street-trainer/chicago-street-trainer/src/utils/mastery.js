// Mastery + per-street statistics helpers.

export function emptyStreetStat() {
  return {
    attempts: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
    lastPracticed: null,
    mastery: 0,
  };
}

// Mastery is a 0..1 value. Base is correct/attempts, but we blend in the
// current streak so consecutive correct answers nudge mastery upward, and we
// keep it safe for zero-attempt streets.
export function computeMastery(stat) {
  if (!stat || stat.attempts === 0) return 0;
  const accuracy = stat.correct / stat.attempts;
  // Small streak bonus, capped so it can't exceed 1.
  const streakBonus = Math.min(stat.streak, 5) * 0.02;
  return Math.max(0, Math.min(1, accuracy + streakBonus));
}

// Apply one answer result to a street's stat object, returning a new object.
export function applyResult(stat, wasCorrect) {
  const base = stat ? { ...stat } : emptyStreetStat();
  base.attempts += 1;
  if (wasCorrect) {
    base.correct += 1;
    base.streak += 1;
    base.bestStreak = Math.max(base.bestStreak, base.streak);
  } else {
    base.incorrect += 1;
    base.streak = 0;
  }
  base.lastPracticed = Date.now();
  base.mastery = computeMastery(base);
  return base;
}

// A street counts as "mastered" once it has a few attempts and high mastery.
export function isMastered(stat) {
  return !!stat && stat.attempts >= 3 && stat.mastery >= 0.8;
}

// Weight used by the question generator to favor weak streets. Higher weight =
// more likely to be picked. Wrong, low-mastery, recently-missed streets score
// higher. Unseen streets get a moderate baseline so they still appear.
export function selectionWeight(stat) {
  if (!stat || stat.attempts === 0) return 2; // unseen baseline
  let weight = 1 + (1 - stat.mastery) * 4; // 1..5 from mastery
  if (stat.incorrect > 0) weight += 1.5;
  // Recency boost if missed in the last day and not yet recovered.
  if (stat.streak === 0 && stat.lastPracticed) {
    const ageMs = Date.now() - stat.lastPracticed;
    const oneDay = 24 * 60 * 60 * 1000;
    if (ageMs < oneDay) weight += 1;
  }
  return weight;
}
