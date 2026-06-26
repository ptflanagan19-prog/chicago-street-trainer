// FeedbackPanel: appears after an answer. Shows correct/incorrect, the street
// name, contextual clue, and a Next button. Enter advances (handled in QuizPage).

export default function FeedbackPanel({ wasCorrect, streetName, clue, onNext, isLast }) {
  return (
    <div className={`feedback feedback--${wasCorrect ? "good" : "bad"}`} role="status">
      <div className="feedback__head">
        <span className="feedback__verdict">
          {wasCorrect ? "Correct" : "Not quite"}
        </span>
        <span className="feedback__street">{streetName}</span>
      </div>
      <p className="feedback__clue">{clue}</p>
      <button type="button" className="btn btn--primary feedback__next" onClick={onNext} autoFocus>
        {isLast ? "See results" : "Next question"}
        <span className="btn__hint" aria-hidden="true">Enter ↵</span>
      </button>
    </div>
  );
}
