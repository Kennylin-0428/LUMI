// features: [icon, title, desc][]
export default function FeatureRow({ features }) {
  return (
    <div className="feature-row">
      {features.map(([icon, title, desc]) => (
        <article className="feature-card" key={title}>
          <div className="symbol">{icon}</div>
          <h3>{title}</h3>
          <p>{desc}</p>
        </article>
      ))}
    </div>
  );
}
