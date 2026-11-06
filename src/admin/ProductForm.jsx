import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { series } from '../data.js';
import { ACCEPT_IMAGES, copyId, fetchProducts, imageType, saveProduct, uploadImage } from './api.js';
import TagInput from './TagInput.jsx';

const EMPTY = {
  id: '',
  series: Object.keys(series)[0],
  name: '',
  subtitle: '',
  price: '',
  sku: '',
  colors: [],
  sizes: [],
  soldOutSizes: [],
  image: '',
  images: [],
  description: '',
  material: '',
  care: '',
  shopeeUrl: '',
};

const imgSrc = (path) => (/^(https?:|data:|blob:|\/)/.test(path) ? path : `/${path}`);
const isSvg = (path) => /\.svg$/i.test(path);

// 用 key 讓「新增 / 複製 / 編輯」之間切換時，表單狀態會完整重置
export default function ProductForm() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  return <ProductFormInner key={`${productId || 'new'}:${searchParams.get('from') || ''}`} />;
}

function ProductFormInner() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isNew = !productId;
  const [searchParams] = useSearchParams();
  const copyFrom = isNew ? searchParams.get('from') : null;
  const [form, setForm] = useState(isNew && !copyFrom ? EMPTY : null);
  const [allIds, setAllIds] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  // 上傳中的圖片先用本機預覽（blob URL）顯示
  const [pending, setPending] = useState([]);
  const [zoom, setZoom] = useState(null);
  const [dirty, setDirty] = useState(false);
  const idTouched = useRef(!isNew || !!copyFrom);

  useEffect(() => {
    fetchProducts().then(
      (list) => {
        setAllIds(list.map((p) => p.id));
        if (copyFrom) {
          const p = list.find((x) => x.id === copyFrom);
          if (p) {
            setForm({
              ...EMPTY,
              ...p,
              id: copyId(p.id, list.map((x) => x.id)),
              price: p.price ?? '',
            });
          } else setError(`找不到要複製的商品「${copyFrom}」`);
        } else if (!isNew) {
          const p = list.find((x) => x.id === productId);
          if (p) setForm({ ...EMPTY, ...p, price: p.price ?? '' });
          else setError(`找不到商品「${productId}」`);
        }
      },
      (err) => setError(err.message),
    );
  }, [isNew, productId, copyFrom]);

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!form) return error ? <p className="admin-alert">{error}</p> : <p className="admin-empty">載入中…</p>;

  const update = (patch) => {
    setForm((f) => ({ ...f, ...(typeof patch === 'function' ? patch(f) : patch) }));
    setDirty(true);
  };
  const field = (key) => ({
    value: form[key],
    onChange: (e) => update({ [key]: e.target.value }),
  });

  // 新商品：依料號自動產生網址 ID，使用者手動修改後就不再自動帶入
  const onSkuChange = (e) => {
    const sku = e.target.value;
    update((f) => ({
      sku,
      id: idTouched.current ? f.id : sku.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    }));
  };

  const setSizes = (sizes) => update((f) => ({ sizes, soldOutSizes: f.soldOutSizes.filter((s) => sizes.includes(s)) }));
  const toggleSoldOut = (size) =>
    update((f) => ({
      soldOutSizes: f.soldOutSizes.includes(size) ? f.soldOutSizes.filter((s) => s !== size) : [...f.soldOutSizes, size],
    }));

  const uploading = pending.length;
  const upload = async (files, target) => {
    const list = [...files];
    if (!list.length) return;
    setError('');
    const bad = list.find((file) => !imageType(file).startsWith('image/'));
    if (bad) {
      setError(`「${bad.name}」不是支援的圖片格式（JPG、PNG、WebP、GIF、SVG）`);
      return;
    }
    const items = (target === 'main' ? list.slice(0, 1) : list).map((file) => ({
      key: `${Date.now()}-${Math.random()}`,
      file,
      target,
      url: URL.createObjectURL(file),
      svg: imageType(file) === 'image/svg+xml',
    }));
    setPending((p) => [...p, ...items]);
    for (const item of items) {
      try {
        const path = await uploadImage(item.file);
        update((f) => (item.target === 'main' ? { image: path } : { images: [...f.images, path] }));
      } catch (err) {
        setError(`「${item.file.name}」上傳失敗：${err.message}`);
      } finally {
        setPending((p) => p.filter((x) => x.key !== item.key));
        URL.revokeObjectURL(item.url);
      }
    }
  };
  const pendingMain = pending.findLast((x) => x.target === 'main');
  const pendingGallery = pending.filter((x) => x.target === 'gallery');

  const moveImage = (index, delta) =>
    update((f) => {
      const images = [...f.images];
      [images[index], images[index + delta]] = [images[index + delta], images[index]];
      return { images };
    });
  const makeMain = (index) =>
    update((f) => {
      const images = [...f.images];
      const [picked] = images.splice(index, 1);
      if (f.image) images.unshift(f.image);
      return { image: picked, images };
    });
  const removeImage = (index) => update((f) => ({ images: f.images.filter((_, i) => i !== index) }));

  const validate = () => {
    if (!form.name.trim()) return '請填寫商品名稱';
    if (!series[form.series]) return '請選擇分類';
    if (form.price !== '' && !(Number.isInteger(Number(form.price)) && Number(form.price) >= 0)) return '售價需為 0 以上的整數';
    if (!/^[a-z0-9][a-z0-9-]*$/.test(form.id)) return '網址 ID 只能使用小寫英文、數字與連字號';
    if (allIds.includes(form.id) && form.id !== productId) return `網址 ID「${form.id}」已被其他商品使用`;
    if (!form.image) return '請上傳主圖';
    if (form.colors.length === 0) return '請至少加入一個顏色選項';
    if (form.shopeeUrl && !/^https:\/\/([\w-]+\.)?shopee\.tw\//i.test(form.shopeeUrl)) return '蝦皮連結需為 https://shopee.tw/ 開頭';
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveProduct({ ...form, price: form.price === '' ? null : Number(form.price) }, productId, copyFrom);
      setDirty(false);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    if (dirty && !window.confirm('有尚未儲存的變更，確定要離開嗎？')) return;
    navigate('/admin');
  };

  return (
    <form className="admin-form" onSubmit={submit} noValidate>
      <div className="admin-toolbar">
        <div>
          <Link to="/admin" className="admin-link" onClick={(e) => { e.preventDefault(); cancel(); }}>← 商品列表</Link>
          <h1>{copyFrom ? '複製商品' : isNew ? '新增商品' : `編輯：${form.name || productId}`}</h1>
        </div>
      </div>

      {copyFrom && (
        <p className="admin-notice">
          已帶入「{copyFrom}」的所有資料，網址 ID 自動改為 <code>{form.id}</code>。按「儲存商品」後才會建立，取消則不會新增。
        </p>
      )}

      {error && <p className="admin-alert" role="alert">{error}</p>}

      <section className="admin-card">
        <h2>基本資訊</h2>
        <div className="admin-grid">
          <label className="span-2">
            <span>商品名稱 <b>*</b></span>
            <input {...field('name')} placeholder="例：糖果跑跑款｜繽紛撞色" required />
          </label>
          <label className="span-2">
            副標題
            <input {...field('subtitle')} placeholder="例：透氣網眼 × 雙帶設計・日常自在探索" />
          </label>
          <label>
            <span>分類 <b>*</b></span>
            <select {...field('series')}>
              {Object.entries(series).map(([key, s]) => (
                <option key={key} value={key}>{s.name}</option>
              ))}
            </select>
          </label>
          <label>
            售價 (NT$)
            <input {...field('price')} type="number" min="0" step="1" inputMode="numeric" placeholder="留空則顯示「價格請見蝦皮賣場」" />
          </label>
          <label>
            料號
            <input value={form.sku} onChange={onSkuChange} placeholder="例：LB-001" />
          </label>
          <label>
            <span>網址 ID <b>*</b></span>
            <input
              value={form.id}
              onChange={(e) => {
                idTouched.current = true;
                update({ id: e.target.value.toLowerCase() });
              }}
              placeholder="例：baby-candy"
            />
            <small>前台網址：#/{form.series}/product/{form.id || '…'}</small>
          </label>
          <label className="span-2">
            蝦皮商品連結
            <input {...field('shopeeUrl')} type="url" placeholder="https://shopee.tw/..." />
          </label>
        </div>
      </section>

      <section className="admin-card">
        <h2>標籤 / 樣式</h2>
        <div className="admin-stack">
          <div>
            <div className="admin-label">顏色選項 <b>*</b></div>
            <TagInput value={form.colors} onChange={(colors) => update({ colors })} placeholder="輸入顏色後按 Enter，例：奶茶米" label="顏色選項" />
          </div>
          <div>
            <div className="admin-label">可選尺碼</div>
            <TagInput value={form.sizes} onChange={setSizes} placeholder="輸入尺碼後按 Enter，例：13 cm" label="可選尺碼" />
          </div>
          <div>
            <div className="admin-label">售完尺碼</div>
            {form.sizes.length === 0 ? (
              <p className="admin-hint">請先加入可選尺碼。</p>
            ) : (
              <>
                <div className="admin-chips">
                  {form.sizes.map((size) => {
                    const soldOut = form.soldOutSizes.includes(size);
                    return (
                      <button key={size} type="button" className={`admin-size ${soldOut ? 'sold-out' : ''}`} aria-pressed={soldOut} onClick={() => toggleSoldOut(size)}>
                        {size}
                        <span>{soldOut ? '售完' : '有貨'}</span>
                      </button>
                    );
                  })}
                </div>
                <small className="admin-hint">點選尺碼切換售完狀態；售完的尺碼在前台會顯示為無法選取。</small>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="admin-card">
        <h2>商品圖片</h2>
        <div className="admin-images">
          <div>
            <div className="admin-label">主圖上傳 <b>*</b></div>
            <label className={`admin-drop ${form.image || pendingMain ? 'has-image' : ''}`}>
              {pendingMain ? (
                <Preview src={pendingMain.url} svg={pendingMain.svg} alt="主圖預覽" busy />
              ) : form.image ? (
                <Preview src={imgSrc(form.image)} svg={isSvg(form.image)} alt="主圖預覽" />
              ) : (
                <span>點擊選擇圖片<br /><small>JPG／PNG／WebP／GIF／SVG，10 MB 以內</small></span>
              )}
              <input type="file" accept={ACCEPT_IMAGES} onChange={(e) => { upload(e.target.files, 'main'); e.target.value = ''; }} />
            </label>
            {form.image && (
              <div className="admin-drop-foot">
                <small className="admin-hint">點擊圖片可更換主圖</small>
                <button type="button" className="admin-text-btn" onClick={() => setZoom(imgSrc(form.image))}>放大預覽</button>
              </div>
            )}
          </div>
          <div>
            <div className="admin-label">加入更多圖片</div>
            <label className="admin-btn admin-upload-btn">
              ＋ 選擇圖片（可多選，支援 SVG）
              <input type="file" accept={ACCEPT_IMAGES} multiple onChange={(e) => { upload(e.target.files, 'gallery'); e.target.value = ''; }} />
            </label>
            {uploading > 0 && <p className="admin-hint" role="status">上傳中…（剩 {uploading} 張）</p>}

            <div className="admin-label" style={{ marginTop: 18 }}>圖片列表</div>
            {form.images.length === 0 && pendingGallery.length === 0 ? (
              <p className="admin-hint">尚未加入其他圖片。</p>
            ) : (
              <ol className="admin-gallery">
                {form.images.map((path, i) => (
                  <li key={path}>
                    <button type="button" className="admin-gallery-img" onClick={() => setZoom(imgSrc(path))} aria-label={`放大預覽商品圖片 ${i + 2}`}>
                      <Preview src={imgSrc(path)} svg={isSvg(path)} alt="" />
                    </button>
                    <div className="admin-gallery-actions">
                      <button type="button" disabled={i === 0} onClick={() => moveImage(i, -1)} aria-label="往前移">←</button>
                      <button type="button" disabled={i === form.images.length - 1} onClick={() => moveImage(i, 1)} aria-label="往後移">→</button>
                      <button type="button" onClick={() => makeMain(i)}>設為主圖</button>
                      <button type="button" className="danger" onClick={() => removeImage(i)} aria-label="移除圖片">✕</button>
                    </div>
                  </li>
                ))}
                {pendingGallery.map((item) => (
                  <li key={item.key}>
                    <div className="admin-gallery-img">
                      <Preview src={item.url} svg={item.svg} alt={`${item.file.name} 上傳中`} busy />
                    </div>
                    <div className="admin-gallery-actions"><small className="admin-hint">{item.file.name}</small></div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      <section className="admin-card">
        <h2>商品描述</h2>
        <div className="admin-stack">
          <label>
            商品描述
            <textarea {...field('description')} rows={6} placeholder="介紹這雙鞋的設計特色、適合的場合…" />
          </label>
          <label>
            材質
            <textarea {...field('material')} rows={3} placeholder="例：鞋面：透氣網布／鞋底：TPR 防滑大底" />
          </label>
          <label>
            保養方式
            <textarea {...field('care')} rows={3} placeholder="例：請以濕布輕拭，避免浸泡與烘乾" />
          </label>
        </div>
      </section>

      <div className="admin-actions">
        <button type="button" className="pill-btn secondary" onClick={cancel}>取消</button>
        <button type="submit" className="pill-btn" disabled={saving || uploading > 0}>
          {saving ? '儲存中…' : uploading > 0 ? '圖片上傳中…' : '儲存商品'}
        </button>
      </div>

      {zoom && (
        <div className="admin-lightbox" role="dialog" aria-modal="true" aria-label="圖片預覽" onClick={() => setZoom(null)} onKeyDown={(e) => e.key === 'Escape' && setZoom(null)}>
          <img src={zoom} alt="圖片預覽" className={isSvg(zoom) ? 'is-svg' : ''} />
          <button type="button" autoFocus onClick={() => setZoom(null)}>關閉 ✕</button>
        </div>
      )}
    </form>
  );
}

// SVG 以完整比例顯示（contain）並加上棋盤底，方便看出透明背景
function Preview({ src, svg, alt, busy }) {
  return (
    <span className={`admin-preview ${svg ? 'is-svg' : ''} ${busy ? 'is-busy' : ''}`}>
      <img src={src} alt={alt} />
      {svg && <em className="admin-badge">SVG</em>}
      {busy && <em className="admin-busy">上傳中…</em>}
    </span>
  );
}
