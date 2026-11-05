import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// items: 字串（目前頁面）或 { label, to }（可點擊連結）
export default function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs wrap">
      <Link to="/">首頁</Link>{' '}
      {items.map((x, i) => (
        <Fragment key={i}>
          {' / '}
          {typeof x === 'string' ? x : <Link to={x.to}>{x.label}</Link>}
        </Fragment>
      ))}
    </div>
  );
}
