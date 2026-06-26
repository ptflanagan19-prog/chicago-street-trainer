// HomePage: entry screen with the brand moment, a quick explanation, the two
// play actions, and a progress summary.

import StatCard from "../components/StatCard.jsx";

export default function HomePage({ progress, onStart, onPracticeMistakes }) {
  const { global, streetsMastered, totalStreets, accuracy, mistakeStreetIds } = progress;
  const hasMistakes = mistakeStreetIds.length > 0;
  const accuracyPct = Math.round(accuracy * 100);

  return (
    <div className="home">
      <header className="home__hero">
        <p className="eyebrow">Chicago · The Loop</p>
        <h1 className="home__title">
          Street<span className="home__title-accent">Trainer</span>
        </h1>
        <p className="home__lede">
          A street lights up on the map. Name it before you second-guess
          yourself. Learn the Loop grid the way cab drivers know it — by sight,
          one block at a time.
        </p>

        <div className="home__actions">
          <button className="btn btn--primary btn--lg" onClick={onStart}>
            Start Loop quiz
          </button>
          <button
            className="btn btn--ghost btn--lg"
            onClick={onPracticeMistakes}
            disabled={!hasMistakes}
            title={!hasMistakes ? "Finish a quiz first to build a review list" : undefined}
          >
            Practice mistakes
            {hasMistakes && <span className="btn__badge">{mistakeStreetIds.length}</span>}
          </button>
        </div>
      </header>

      <section className="home__summary" aria-label="Your progress">
        <h2 className="home__summary-title">Your progress</h2>
        <div className="home__stats">
          <StatCard label="Best score" value={`${global.bestScore}/10`} accent="blue" />
          <StatCard
            label="Streets mastered"
            value={`${streetsMastered}/${totalStreets}`}
            accent="good"
          />
          <StatCard label="Overall accuracy" value={`${accuracyPct}%`} />
          <StatCard label="Questions answered" value={global.totalAnswered} />
        </div>
      </section>

      <footer className="home__foot">
        <span className="home__foot-rule" />
        Proof of concept · Loop streets only
      </footer>
    </div>
  );
}
