// AnswerChoices: four multiple-choice buttons. Supports number keys 1-4 and
// shows correct/incorrect states once feedback phase begins.

import { useEffect } from "react";

export default function AnswerChoices({
  choices,
  phase,
  selectedId,
  correctId,
  onSelect,
}) {
  const locked = phase !== "question";

  // Number keys 1-4 select an answer while in the question phase.
  useEffect(() => {
    function handleKey(e) {
      if (locked) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= choices.length) {
        e.preventDefault();
        onSelect(choices[n - 1].id);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [locked, choices, onSelect]);

  return (
    <ul className="answers" role="list">
      {choices.map((choice, i) => {
        let state = "idle";
        if (locked) {
          if (choice.id === correctId) state = "correct";
          else if (choice.id === selectedId) state = "incorrect";
          else state = "muted";
        }
        return (
          <li key={choice.id}>
            <button
              type="button"
              className={`answer answer--${state}`}
              disabled={locked}
              onClick={() => onSelect(choice.id)}
              aria-pressed={selectedId === choice.id}
            >
              <span className="answer__key" aria-hidden="true">
                {i + 1}
              </span>
              <span className="answer__label">{choice.name}</span>
              {state === "correct" && (
                <span className="answer__mark answer__mark--good" aria-label="Correct answer">
                  ✓
                </span>
              )}
              {state === "incorrect" && (
                <span className="answer__mark answer__mark--bad" aria-label="Your incorrect answer">
                  ✕
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
