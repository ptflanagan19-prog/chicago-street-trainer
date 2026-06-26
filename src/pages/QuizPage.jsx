// QuizPage: orchestrates one quiz session — map, progress, answers, feedback.
// Handles the empty-questions edge case and Enter-to-advance.

import { useEffect } from "react";
import GameMap from "../components/GameMap.jsx";
import AnswerChoices from "../components/AnswerChoices.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import FeedbackPanel from "../components/FeedbackPanel.jsx";
import ResultsPanel from "../components/ResultsPanel.jsx";
import { useGameSession } from "../hooks/useGameSession.js";

export default function QuizPage({
  stats,
  bestScore,
  mode,
  restrictTo,
  onAnswer,
  onComplete,
  onExit,
  onPlayAgain,
  onPracticeMistakes,
}) {
  const session = useGameSession({
    stats,
    onAnswer,
    onComplete,
    mode,
    restrictTo,
  });

  const {
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
    hasQuestions,
  } = session;

  // Enter advances during feedback.
  useEffect(() => {
    function handleKey(e) {
      if (phase === "feedback" && e.key === "Enter") {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, next]);

  // Edge case: practice mode with no eligible streets.
  if (!hasQuestions) {
    return (
      <div className="quiz quiz--empty">
        <div className="empty-card">
          <h2 className="empty-card__title">Nothing to practice yet</h2>
          <p className="empty-card__body">
            You haven't missed any streets. Play a regular quiz first, then your
            misses will collect here for focused review.
          </p>
          <div className="empty-card__actions">
            <button className="btn btn--primary" onClick={onPlayAgain}>
              Start a regular quiz
            </button>
            <button className="btn btn--ghost" onClick={onExit}>
              Return home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <ResultsPanel
        score={score}
        total={total}
        bestScore={Math.max(bestScore, score)}
        missed={missed}
        onPlayAgain={onPlayAgain}
        onPracticeMistakes={onPracticeMistakes}
        onHome={onExit}
      />
    );
  }

  return (
    <div className="quiz">
      <div className="quiz__topbar">
        <ProgressBar current={currentIndex} total={total} score={score} />
        <button className="btn btn--exit" onClick={onExit} aria-label="Exit quiz">
          Exit
        </button>
      </div>

      <div className="quiz__board">
        <div className="quiz__map">
          <GameMap
            targetId={current.targetId}
            phase={phase}
            revealName={phase === "feedback" ? current.targetName : null}
          />
        </div>

        <div className="quiz__panel">
          {mode === "practice" && (
            <p className="quiz__mode-tag">Practice · your missed streets</p>
          )}
          <h2 className="quiz__prompt">Which street is highlighted?</h2>

          <AnswerChoices
            choices={current.choices}
            phase={phase}
            selectedId={selectedId}
            correctId={correctChoice?.id}
            onSelect={selectAnswer}
          />

          {phase === "feedback" && (
            <FeedbackPanel
              wasCorrect={wasCorrect}
              streetName={current.targetName}
              clue={current.clue}
              onNext={next}
              isLast={currentIndex + 1 >= total}
            />
          )}
        </div>
      </div>
    </div>
  );
}
