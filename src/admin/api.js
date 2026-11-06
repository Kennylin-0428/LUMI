// 呼叫 vite-plugin-admin.js 提供的開發伺服器 API
async function request(path, options) {
  let res;
  try {
    res = await fetch(`/__admin${path}`, options);
  } catch {
    throw new Error('無法連線到後台 API，請確認 npm run dev 正在執行');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `請求失敗（${res.status}）`);
  return data;
}

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const fetchProducts = () => request('/products');
export const saveProduct = (product, originalId, insertAfter) =>
  request('/products', json('POST', { product, originalId, insertAfter }));
export const deleteProduct = (id) => request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
export const reorderProducts = (ids) => request('/products/order', json('PUT', ids));

// 複製商品的網址 ID：baby-candy → baby-candy-copy，已有 baby-candy-copy 時 → baby-candy-copy-2
// 複製「baby-candy-copy」不會變成 baby-candy-copy-copy
export function copyId(id, existing) {
  const base = `${id.replace(/-copy(-\d+)?$/, '')}-copy`;
  if (!existing.includes(base)) return base;
  let n = 2;
  while (existing.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

// 部分系統選取 .svg 時 file.type 是空字串，改用副檔名判斷
const EXT_TYPES = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' };
export const ACCEPT_IMAGES = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,.svg';
export const imageType = (file) => file.type || EXT_TYPES[file.name.split('.').pop().toLowerCase()] || '';

export async function uploadImage(file) {
  const { path } = await request('/upload', {
    method: 'POST',
    headers: { 'Content-Type': imageType(file) || 'application/octet-stream' },
    body: file,
  });
  return path;
}
