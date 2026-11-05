import { useState } from 'react';
import { Link } from 'react-router-dom';
import { series } from '../data.js';

export default function ProductCard({ product: p }) {
  // 收藏僅為示意功能，只存在於當前頁面
  const [favorite, setFavorite] = useState(false);
  const url = `/${p.series}/product/${p.id}`;

  return (
    <article className="product-card">
      <div className="product-img">
        <Link to={url}>
          <img src={p.image} alt={p.name} />
        </Link>
        <button
          className="heart"
          aria-label={`收藏 ${p.name}`}
          aria-pressed={favorite}
          title="加入喜愛清單（示意功能）"
          onClick={() => setFavorite((v) => !v)}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-body">
        <span className={`tag ${p.series === 'princess' ? 'pink' : ''}`}>{series[p.series].name}</span>
        <h3>{p.name}</h3>
        <p>{p.subtitle}</p>
        <div className="price">價格請見蝦皮賣場</div>
        <Link className={`small-btn ${p.series === 'baby' ? 'baby' : ''}`} to={url}>
          查看商品詳情 →
        </Link>
      </div>
    </article>
  );
}
