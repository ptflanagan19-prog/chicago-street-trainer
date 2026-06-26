// useProgress: owns persistent progress (per-street stats + global totals),
// backed by LocalStorage. Exposes helpers to record answers and derive summaries.

import { useState, useCallback, useEffect } from "react";
import { loadState, saveState, clearState } from "../utils/storage.js";
import { applyResult, isMastered } from "../utils/mastery.js";
import { loopStreets } from "../data/loopStreets.js";

function defaultGlobal() {
  return {
    bestScore: 0,
    totalAnswered: 0,
    totalCorrect: 0,
  };
}

function defaultState() {
  return {
    streetStats: {},
    global: defaultGlobal(),
  };
}

export function useProgress() {
  const [state, setState] = useState(() => {
    const loaded = loadState();
    if (!loaded) return defaultState();
    return {
      streetStats: loaded.streetStats || {},
      global: { ...defaultGlobal(), ...(loaded.global || {}) },
    };
  });

  // Persist whenever state changes.
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Record a single answer for a street.
  const recordAnswer = useCallback((streetId, wasCorrect) => {
    setState((prev) => {
      const prevStat = prev.streetStats[streetId];
      const nextStat = applyResult(prevStat, wasCorrect);
      return {
        ...prev,
        streetStats: { ...prev.streetStats, [streetId]: nextStat },
        global: {
          ...prev.global,
          totalAnswered: prev.global.totalAnswered + 1,
          totalCorrect: prev.global.totalCorrect + (wasCorrect ? 1 : 0),
        },
      };
    });
  }, []);

  // Record a completed quiz's final score (updates best score).
  const recordQuizScore = useCallback((score) => {
    setState((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        bestScore: Math.max(prev.global.bestScore, score),
      },
    }));
  }, []);

  const resetProgress = useCallback(() => {
    clearState();
    setState(defaultState());
  }, []);

  // Derived summaries
  const streetsMastered = loopStreets.filter((s) =>
    isMastered(state.streetStats[s.id])
  ).length;

  const accuracy =
    state.global.totalAnswered > 0
      ? state.global.totalCorrect / state.global.totalAnswered
      : 0;

  // Streets with at least one incorrect answer (for Practice Mistakes).
  const mistakeStreetIds = loopStreets
    .filter((s) => {
      const stat = state.streetStats[s.id];
      return stat && stat.incorrect > 0;
    })
    .map((s) => s.id);

  return {
    streetStats: state.streetStats,
    global: state.global,
    streetsMastered,
    totalStreets: loopStreets.length,
    accuracy,
    mistakeStreetIds,
    recordAnswer,
    recordQuizScore,
    resetProgress,
  };
}
