// StatCard: a small labeled metric used on home and results screens.

export default function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`stat-card ${accent ? `stat-card--${accent}` : ""}`}>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {sub && <div className="stat-card__sub">{sub}</div>}
    </div>
  );
}
