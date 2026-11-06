import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, series } from '../data.js';
import { deleteProduct, fetchProducts, reorderProducts } from './api.js';

export default function ProductAdminList() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts, (err) => setError(err.message));
  }, []);

  const run = async (task) => {
    setBusy(true);
    setError('');
    try {
      await task();
    } catch (err) {
      setError(err.message);
      fetchProducts().then(setProducts, () => {});
    } finally {
      setBusy(false);
    }
  };

  const remove = (p) => {
    if (!window.confirm(`確定要刪除「${p.name}」嗎？此動作無法復原。`)) return;
    run(async () => {
      await deleteProduct(p.id);
      setProducts((list) => list.filter((x) => x.id !== p.id));
    });
  };

  const move = (index, delta) => {
    const next = [...products];
    const target = index + delta;
    [next[index], next[target]] = [next[target], next[index]];
    setProducts(next);
    run(() => reorderProducts(next.map((p) => p.id)));
  };

  if (!products) {
    return error ? <p className="admin-alert">{error}</p> : <p className="admin-empty">載入中…</p>;
  }

  const visible = products.map((p, index) => ({ p, index })).filter(({ p }) => filter === 'all' || p.series === filter);

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>商品管理</h1>
          <p className="admin-hint">共 {products.length} 件商品。排序會套用到前台系列頁的顯示順序。</p>
        </div>
        <Link to="/admin/new" className="pill-btn">＋ 新增商品</Link>
      </div>

      <div className="admin-tabs" role="group" aria-label="依分類篩選">
        {[['all', '全部'], ...Object.entries(series).map(([key, s]) => [key, s.name])].map(([key, label]) => (
          <button key={key} type="button" className={filter === key ? 'active' : ''} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      {error && <p className="admin-alert" role="alert">{error}</p>}

      {visible.length === 0 ? (
        <p className="admin-empty">此分類還沒有商品。</p>
      ) : (
        <ul className="admin-list">
          {visible.map(({ p, index }) => (
            <li key={p.id} className="admin-row">
              <img src={p.image ? `/${p.image}` : undefined} alt="" className="admin-thumb" />
              <div className="admin-row-main">
                <span className={`tag ${p.series === 'princess' ? 'pink' : ''}`}>{series[p.series]?.name || p.series}</span>
                <strong>{p.name}</strong>
                <span className="admin-meta">
                  {p.sku ? `料號 ${p.sku}` : '未填料號'} ・ {formatPrice(p.price)} ・ {p.sizes.length} 個尺碼
                  {p.soldOutSizes?.length > 0 && <em>（售完 {p.soldOutSizes.join('、')}）</em>}
                </span>
              </div>
              <div className="admin-row-actions">
                {filter === 'all' && (
                  <>
                    <button type="button" className="admin-icon-btn" disabled={busy || index === 0} onClick={() => move(index, -1)} aria-label={`將 ${p.name} 上移`}>↑</button>
                    <button type="button" className="admin-icon-btn" disabled={busy || index === products.length - 1} onClick={() => move(index, 1)} aria-label={`將 ${p.name} 下移`}>↓</button>
                  </>
                )}
                <Link to={`/${p.series}/product/${p.id}`} className="admin-btn" target="_blank">預覽</Link>
                <Link to={`/admin/new?from=${encodeURIComponent(p.id)}`} className="admin-btn">複製</Link>
                <Link to={`/admin/edit/${p.id}`} className="admin-btn primary">編輯</Link>
                <button type="button" className="admin-btn danger" disabled={busy} onClick={() => remove(p)}>刪除</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
