// Question generation: picks target streets (weighted toward weak ones) and
// builds orientation-matched, shuffled multiple-choice options.

import { loopStreets } from "../data/loopStreets.js";
import { selectionWeight } from "./mastery.js";

const QUESTIONS_PER_QUIZ = 10;
const CHOICES_PER_QUESTION = 4;

export function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Weighted random pick without replacement, returning `count` streets.
function weightedSample(streets, stats, count) {
  const pool = streets.map((s) => ({
    street: s,
    weight: selectionWeight(stats[s.id]),
  }));
  const chosen = [];
  while (chosen.length < count && pool.length > 0) {
    const total = pool.reduce((sum, p) => sum + p.weight, 0);
    let r = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight;
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    chosen.push(pool[idx].street);
    pool.splice(idx, 1);
  }
  return chosen;
}

// Build distractors for a target street, preferring the same orientation.
// "curved" (Wacker) is grouped with whichever orientations are available.
function buildChoices(target, allStreets) {
  const sameOrientation = allStreets.filter(
    (s) => s.id !== target.id && s.orientation === target.orientation
  );

  let distractorPool = sameOrientation;

  // If not enough same-orientation streets, fall back to any other street so
  // we never fail to produce four choices.
  if (distractorPool.length < CHOICES_PER_QUESTION - 1) {
    const others = allStreets.filter(
      (s) => s.id !== target.id && !distractorPool.includes(s)
    );
    distractorPool = [...distractorPool, ...others];
  }

  const distractors = shuffle(distractorPool).slice(0, CHOICES_PER_QUESTION - 1);
  const choices = shuffle([target, ...distractors]).map((s) => ({
    id: s.id,
    name: s.name,
    correct: s.id === target.id,
  }));
  return choices;
}

// Generate a full quiz. `stats` is a map of streetId -> stat (may be empty).
// `restrictTo` optionally limits the target pool (used for Practice Mistakes).
export function generateQuiz(stats = {}, options = {}) {
  const { restrictTo = null, count = QUESTIONS_PER_QUIZ } = options;

  const targetableStreets = restrictTo
    ? loopStreets.filter((s) => restrictTo.includes(s.id))
    : loopStreets;

  if (targetableStreets.length === 0) {
    return [];
  }

  const questions = [];
  // Avoid repeating a target within the session unless we run out of streets.
  let available = [...targetableStreets];

  for (let i = 0; i < count; i++) {
    if (available.length === 0) {
      available = [...targetableStreets]; // refill if pool exhausted
    }
    const [target] = weightedSample(available, stats, 1);
    if (!target) break;
    available = available.filter((s) => s.id !== target.id);

    questions.push({
      index: i,
      targetId: target.id,
      targetName: target.name,
      clue: target.clue,
      orientation: target.orientation,
      choices: buildChoices(target, loopStreets),
    });
  }

  return questions;
}

export { QUESTIONS_PER_QUIZ, CHOICES_PER_QUESTION };
