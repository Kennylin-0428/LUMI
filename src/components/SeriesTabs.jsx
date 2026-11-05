import { Link } from 'react-router-dom';

export default function SeriesTabs({ seriesKey, active, productId }) {
  const cls = (name) => (active === name ? 'active' : '');
  return (
    <div className={`series-tabs ${seriesKey === 'princess' ? 'princess' : ''}`}>
      <Link to={`/${seriesKey}`} className={cls('intro')}>系列介紹</Link>
      <Link to={`/${seriesKey}/products`} className={cls('products')}>商品列表</Link>
      {active === 'detail' && (
        <Link to={`/${seriesKey}/product/${productId}`} className="active">商品詳情</Link>
      )}
    </div>
  );
}
