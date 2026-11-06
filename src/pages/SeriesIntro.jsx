import { useParams } from 'react-router-dom';
import { products, series } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProductCard from '../components/ProductCard.jsx';
import SeriesDetails from '../components/SeriesDetails.jsx';
import NotFound from './NotFound.jsx';

export default function SeriesIntro() {
  const { seriesKey } = useParams();
  const d = series[seriesKey];
  const seriesProducts = products.filter((product) => product.series === seriesKey);
  if (!d) return <NotFound />;

  return (
    <>
      <Breadcrumbs items={[{ label: '系列總覽', to: '/collections' }, d.name]} />
      <div className="wrap">
        <div className={`intro-hero ${seriesKey === 'princess' ? 'princess' : ''}`}>
          <div>
            <span className="eyebrow">{d.eyebrow}</span>
            <h1>{d.name}</h1>
            <h3>{d.tagline}</h3>
            <p>{d.description}</p>
            <div className="intro-highlights" aria-label="系列亮點">
              {d.features.map(([, title]) => <span key={title}>{title}</span>)}
            </div>
            <span className="intro-signature" aria-hidden="true">little steps, lovely days</span>
            {/* <PillButton to={`/${seriesKey}#products`} className={seriesKey === 'baby' ? 'blue' : ''}>
              瀏覽本系列商品
            </PillButton> */}
          </div>
          <figure className="series-hero-visual">
            <svg className="series-photo-flower" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse key={angle} cx="40" cy="24" rx="12" ry="18" transform={`rotate(${angle} 40 40)`} fill="#fffefd" stroke="currentColor" strokeOpacity=".25" />
              ))}
              <circle cx="40" cy="40" r="8" fill="#fff7dd" />
            </svg>
            <span className="series-photo-ribbon" aria-hidden="true" />
            <span className="series-photo-dust" aria-hidden="true">✧</span>
            <span className="series-photo-label">{seriesKey === 'princess' ? '甜美與優雅，恰到好處' : '今天也要可可愛愛'}</span>
            <span className="series-photo-sparkle" aria-hidden="true">✦</span>
            <img src={d.image} alt={d.name} />
            <span className="series-photo-heart" aria-hidden="true">♡</span>
            <figcaption>
              <span aria-hidden="true">Little lovely moments</span>
              {seriesKey === 'princess' ? '從日常穿搭開始，展現甜美氣質。' : '繽紛柔和的色彩，讓日常穿搭更有亮點。'}
            </figcaption>
          </figure>
        </div>
      </div>
      <section id="products" className="wrap section series-products" aria-labelledby="series-products-title">
        <div className="section-title">
          <span className="eyebrow">COLLECTION SHOP</span>
          <h2 id="series-products-title">本系列商品</h2>
          <p>共 {seriesProducts.length} 款商品，挑選喜歡的款式，查看顏色與尺寸。</p>
        </div>
        <div className="products-grid">
          {seriesProducts.length ? seriesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : <p className="empty">本系列商品即將登場。</p>}
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading eyebrow="DETAILS WE LOVE" title={seriesKey === 'baby' ? '把可愛，藏進每一小步' : '把小日常，穿成童話'} desc="從設計到配色，慢慢發現那些讓人喜歡的小細節。" />
        <SeriesDetails seriesKey={seriesKey} features={d.features} />
      </section>

    </>
  );
}
