import { Link } from 'react-router-dom';

export default function PillButton({ to, className = '', children }) {
  return (
    <Link className={`pill-btn ${className}`} to={to}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}
