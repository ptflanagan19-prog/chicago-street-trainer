// ResultsPanel: end-of-quiz summary with score, accuracy, missed streets,
// and the three follow-up actions.

import StatCard from "./StatCard.jsx";
import { getStreetById } from "../data/loopStreets.js";

export default function ResultsPanel({
  score,
  total,
  bestScore,
  missed,
  onPlayAgain,
  onPracticeMistakes,
  onHome,
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const incorrect = total - score;
  const isBest = score >= bestScore && score > 0;

  return (
    <div className="results">
      <div className="results__hero">
        <p className="eyebrow">Quiz complete</p>
        <div className="results__score">
          <span className="results__score-num">{score}</span>
          <span className="results__score-den">/ {total}</span>
        </div>
        <div className="results__pct">{pct}% correct</div>
        {isBest && <div className="results__best-flag">New best score</div>}
      </div>

      <div className="results__stats">
        <StatCard label="Correct" value={score} accent="good" />
        <StatCard label="Incorrect" value={incorrect} accent="bad" />
        <StatCard label="Best score" value={bestScore} accent="blue" />
      </div>

      {missed.length > 0 ? (
        <div className="results__missed">
          <h3 className="results__missed-title">Streets to review</h3>
          <ul className="missed-list">
            {missed.map((id) => {
              const s = getStreetById(id);
              if (!s) return null;
              return (
                <li key={id} className="missed-list__item">
                  <span className="missed-list__name">{s.name}</span>
                  <span className="missed-list__clue">{s.clue}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="results__perfect">No misses — clean run through the Loop.</p>
      )}

      <div className="results__actions">
        <button className="btn btn--primary" onClick={onPlayAgain}>
          Play again
        </button>
        <button
          className="btn btn--ghost"
          onClick={onPracticeMistakes}
          disabled={missed.length === 0}
          title={missed.length === 0 ? "No mistakes to practice" : undefined}
        >
          Practice mistakes
        </button>
        <button className="btn btn--ghost" onClick={onHome}>
          Return home
        </button>
      </div>
    </div>
  );
}
