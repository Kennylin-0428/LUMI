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
          <img src={d.image} alt={d.name} />
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
