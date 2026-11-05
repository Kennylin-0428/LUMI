import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products, series } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SeriesTabs from '../components/SeriesTabs.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Banner from '../components/Banner.jsx';
import NotFound from './NotFound.jsx';

export default function ProductList() {
  const { seriesKey } = useParams();
  // key 讓切換系列時重置篩選狀態
  return <ProductListInner key={seriesKey} seriesKey={seriesKey} />;
}

function ProductListInner({ seriesKey }) {
  const [color, setColor] = useState('');
  const [sort, setSort] = useState('default');

  const seriesProducts = useMemo(() => products.filter((p) => p.series === seriesKey), [seriesKey]);
  const colors = useMemo(() => [...new Set(seriesProducts.flatMap((p) => p.colors))], [seriesProducts]);
  const list = useMemo(() => {
    const filtered = seriesProducts.filter((p) => !color || p.colors.includes(color));
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
    return filtered;
  }, [seriesProducts, color, sort]);

  const d = series[seriesKey];
  if (!d) return <NotFound />;

  return (
    <>
      <Breadcrumbs
        items={[{ label: '系列總覽', to: '/collections' }, { label: d.name, to: `/${seriesKey}` }, '商品列表']}
      />
      <div className="wrap">
        <div className={`intro-hero ${seriesKey === 'princess' ? 'princess' : ''}`}>
          <div>
            <span className="eyebrow">COLLECTION SHOP</span>
            <h1>{d.name}｜商品列表</h1>
            <p>{d.tagline}</p>
          </div>
          <img src={d.image} alt={d.name} />
        </div>
        <SeriesTabs seriesKey={seriesKey} active="products" />
        <div className="products-toolbar">
          <span id="product-count">本系列共 {list.length} 款商品</span>
          <div className="filters">
            <select className="filter" aria-label="篩選顏色" value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">全部顏色</option>
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select className="filter" aria-label="排序方式" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="default">預設排序</option>
              <option value="name">名稱排序</option>
            </select>
          </div>
        </div>
        <div className="products-grid">
          {list.length ? (
            list.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="empty">目前沒有符合此篩選條件的商品。</div>
          )}
        </div>
      </div>
      <Banner title="想先看看系列特色？" desc="更多細節、色系與日常搭配靈感。" cta="系列介紹" to={`/${seriesKey}`} />
    </>
  );
}
