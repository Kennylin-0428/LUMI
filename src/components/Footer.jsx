import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <div className="logo footer-logo">
            <img className="footer-logo-image" src="assets/logo_圓.png" alt="" width="52" height="52" />
            <span className="logo-mark">LUMI</span>
            <small>露米</small>
          </div>
          <p>把日常的可愛，穿在腳上。<br />寶寶鞋與公主鞋，用心挑選每一份童趣。</p>
        </div>
        <div>
          <h4>系列選購</h4>
          <Link to="/collections">系列總覽</Link>
          <Link to="/baby">寶寶鞋系列</Link>
          <Link to="/princess">公主鞋系列</Link>
        </div>
        <div>
          <h4>關於露米</h4>
          <Link to="/story">關於 LUMI</Link>
          <Link to="/partnership">合作洽詢</Link>
          <Link to="/size-guide">尺寸指南</Link>
          <Link to="/sitemap">網站導覽</Link>
        </div>
        <div>
          <h4>選購提醒</h4>
          <p>目前官網為商品展示，實際選購於蝦皮完成。商品價格、尺寸與庫存請以賣場為準。</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} LUMI 露米 · All rights reserved. · 網站示範版本
      </div>
    </footer>
  );
}
