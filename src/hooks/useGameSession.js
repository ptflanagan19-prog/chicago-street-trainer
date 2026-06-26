// useGameSession: owns the live quiz state machine for one play-through.
// States flow: question -> feedback -> (next) question ... -> results.

import { useState, useCallback, useMemo } from "react";
import { generateQuiz } from "../utils/questionGenerator.js";

export function useGameSession({ stats, onAnswer, onComplete, mode = "normal", restrictTo = null }) {
  const [questions] = useState(() =>
    generateQuiz(stats, restrictTo ? { restrictTo } : {})
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("question"); // "question" | "feedback" | "results"
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(null);
  const [missed, setMissed] = useState([]); // street ids answered incorrectly

  const current = questions[currentIndex];
  const total = questions.length;

  const selectAnswer = useCallback(
    (choiceId) => {
      if (phase !== "question" || !current) return;
      const correct = current.choices.find((c) => c.correct);
      const isCorrect = choiceId === correct.id;

      setSelectedId(choiceId);
      setWasCorrect(isCorrect);
      setPhase("feedback");
      if (isCorrect) {
        setScore((s) => s + 1);
      } else {
        setMissed((m) =>
          m.includes(current.targetId) ? m : [...m, current.targetId]
        );
      }
      onAnswer?.(current.targetId, isCorrect);
    },
    [phase, current, onAnswer]
  );

  const next = useCallback(() => {
    if (phase !== "feedback") return;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setPhase("results");
      // Compute final score using latest tally (score already includes current).
      setScore((finalScore) => {
        onComplete?.(finalScore, missed);
        return finalScore;
      });
    } else {
      setCurrentIndex(nextIndex);
      setSelectedId(null);
      setWasCorrect(null);
      setPhase("question");
    }
  }, [phase, currentIndex, total, missed, onComplete]);

  const correctChoice = useMemo(
    () => current?.choices.find((c) => c.correct) || null,
    [current]
  );

  return {
    questions,
    current,
    currentIndex,
    total,
    phase,
    score,
    selectedId,
    wasCorrect,
    missed,
    correctChoice,
    selectAnswer,
    next,
    hasQuestions: total > 0,
  };
}
