import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, series, SHOPEE_URL_RE } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SeriesTabs from '../components/SeriesTabs.jsx';
import NotFound from './NotFound.jsx';

export default function ProductDetail() {
  const { seriesKey, productId } = useParams();
  const p = products.find((x) => x.id === productId && x.series === seriesKey);
  if (!p) return <NotFound />;
  // key 讓切換商品時重置選項狀態
  return <ProductDetailInner key={p.id} product={p} />;
}

function ProductDetailInner({ product: p }) {
  const d = series[p.series];
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState(null);
  const [notice, setNotice] = useState('');

  const buy = () => {
    if (SHOPEE_URL_RE.test(p.shopeeUrl)) {
      window.open(p.shopeeUrl, '_blank', 'noopener,noreferrer');
    } else {
      setNotice('尚未設定此商品的蝦皮連結。請在 src/data.js 的 products 中填入 shopeeUrl。');
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: '系列總覽', to: '/collections' },
          { label: d.name, to: `/${p.series}` },
          { label: '商品列表', to: `/${p.series}/products` },
          '商品詳情',
        ]}
      />
      <div className="wrap">
        <SeriesTabs seriesKey={p.series} active="detail" productId={p.id} />
        <section className="detail-layout">
          <div className="detail-photo">
            <img src={p.image} alt={`${p.name}商品照片`} />
          </div>
          <div className="detail-info">
            <span className={`tag ${p.series === 'princess' ? 'pink' : ''}`}>{d.name}</span>
            <h1>{p.name}</h1>
            <p>{p.subtitle}</p>
            <div className="large-price">價格請見蝦皮賣場</div>
            <div className="option-label">顏色選擇</div>
            <Swatches options={p.colors} value={color} onChange={setColor} />
            <div className="option-label">尺寸參考</div>
            <Swatches options={p.sizes} value={size} onChange={setSize} />
            <p>
              <Link to="/size-guide" style={{ textDecoration: 'underline' }}>查看尺寸指南 →</Link>
            </p>
            <div className="detail-note">
              此網站為 LUMI 品牌展示版本。請至蝦皮確認實際尺寸、商品售價、庫存與下單條件。
            </div>
            <button type="button" className="pill-btn" onClick={buy}>前往蝦皮選購 →</button>
            <p role="status" style={notice ? { color: '#ae6478' } : undefined}>{notice}</p>
          </div>
        </section>
        <section className="section">
          <SectionHeading eyebrow="PRODUCT DETAILS" title="商品特色" />
          <div className="detail-facts">
            {d.features.map(([icon, title, desc]) => (
              <div className="fact" key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Swatches({ options, value, onChange }) {
  return (
    <div className="swatches">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          className={`swatch ${value === o ? 'active' : ''}`}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
