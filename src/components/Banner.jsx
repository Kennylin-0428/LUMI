import PillButton from './PillButton.jsx';

export default function Banner({ eyebrow, title, desc, cta, to }) {
  return (
    <section className="wrap banner">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <PillButton to={to}>{cta}</PillButton>
    </section>
  );
}
