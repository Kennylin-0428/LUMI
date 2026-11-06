import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice, products, series, SHOPEE_URL_RE } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
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
  const gallery = [p.image, ...p.images].filter(Boolean);
  const [photo, setPhoto] = useState(gallery[0]);
  const soldOut = p.soldOutSizes;
  const info = [
    ['商品描述', p.description],
    ['材質', p.material],
    ['保養方式', p.care],
  ].filter(([, text]) => text);

  const buy = () => {
    if (SHOPEE_URL_RE.test(p.shopeeUrl)) {
      window.open(p.shopeeUrl, '_blank', 'noopener,noreferrer');
    } else {
      setNotice('尚未設定此商品的蝦皮連結。請在商品後台填入蝦皮商品連結。');
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: '系列總覽', to: '/collections' },
          { label: d.name, to: `/${p.series}` },
          '商品詳情',
        ]}
      />
      <div className="wrap">
        <section className="detail-layout">
          <div>
            <div className="detail-photo">
              <img src={photo} alt={`${p.name}商品照片`} />
            </div>
            {gallery.length > 1 && (
              <div className="detail-thumbs" role="group" aria-label="商品圖片">
                {gallery.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className={photo === src ? 'active' : ''}
                    aria-pressed={photo === src}
                    aria-label={`第 ${i + 1} 張圖片`}
                    onClick={() => setPhoto(src)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="detail-info">
            <span className={`tag ${p.series === 'princess' ? 'pink' : ''}`}>{d.name}</span>
            <h1>{p.name}</h1>
            <p>{p.subtitle}</p>
            <div className="large-price">{formatPrice(p.price)}</div>
            {p.sku && <div className="detail-sku">料號：{p.sku}</div>}
            <div className="option-label">顏色選擇</div>
            <Swatches options={p.colors} value={color} onChange={setColor} />
            <div className="option-label">尺寸參考</div>
            <Swatches options={p.sizes} value={size} onChange={setSize} disabled={soldOut} />
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
        {info.length > 0 && (
          <section className="detail-info-blocks">
            {info.map(([title, text]) => (
              <div className="detail-info-block" key={title}>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            ))}
          </section>
        )}
        {/* <section className="section">
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
        </section> */}
      </div>
    </>
  );
}

function Swatches({ options, value, onChange, disabled = [] }) {
  return (
    <div className="swatches">
      {options.map((o) => {
        const off = disabled.includes(o);
        return (
          <button
            type="button"
            key={o}
            className={`swatch ${value === o ? 'active' : ''} ${off ? 'sold-out' : ''}`}
            aria-pressed={value === o}
            disabled={off}
            onClick={() => onChange(o)}
          >
            {o}
            {off && <small>售完</small>}
          </button>
        );
      })}
    </div>
  );
}
