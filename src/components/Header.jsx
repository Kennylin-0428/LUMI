import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  ['home', '/', '首頁'],
  ['collections', '/collections', '系列總覽'],
  ['baby', '/baby', '寶寶鞋系列'],
  ['princess', '/princess', '公主鞋系列'],
  ['story', '/story', '品牌故事'],
  ['size-guide', '/size-guide', '尺寸指南'],
];

export default function Header({ section }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // 換頁時收起手機選單
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link className="logo" to="/" aria-label="LUMI 露米首頁">
          <span className="logo-mark">LUMI</span>
          <small>露米</small>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <nav id="site-nav" className={open ? 'open' : ''} aria-label="主要導覽">
          {NAV.map(([key, to, label]) => (
            <Link key={key} to={to} className={section === key ? 'active' : ''}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" to="/collections">探索鞋款 ♡</Link>
      </div>
    </header>
  );
}
