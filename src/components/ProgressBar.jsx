// ProgressBar: question counter + score, with a thin fill bar.

export default function ProgressBar({ current, total, score }) {
  const pct = total > 0 ? ((current) / total) * 100 : 0;
  return (
    <div className="progress">
      <div className="progress__row">
        <span className="progress__label">
          Question <strong>{Math.min(current + 1, total)}</strong> of {total}
        </span>
        <span className="progress__score">
          Score <strong>{score}</strong>
        </span>
      </div>
      <div className="progress__track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
