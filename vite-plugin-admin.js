// 商品後台 API：只在 `npm run dev` 時啟用，直接讀寫 src/products.json 與 public/assets/products/。
// build 出來的靜態網站不含這些 API，所以後台只能在本機使用；改完後 commit + build 即可上線。
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const DATA_FILE = 'src/products.json';
const UPLOAD_DIR = 'public/assets/products';
const UPLOAD_URL = 'assets/products';
const MAX_UPLOAD = 10 * 1024 * 1024;
const IMAGE_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const str = (v) => (typeof v === 'string' ? v.trim() : '');
const list = (v) => (Array.isArray(v) ? [...new Set(v.map(str).filter(Boolean))] : []);

function cleanProduct(p) {
  if (!p || typeof p !== 'object') throw new HttpError(400, '商品資料格式錯誤');
  const id = str(p.id);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new HttpError(400, '網址 ID 只能使用小寫英文、數字與連字號');
  if (!str(p.name)) throw new HttpError(400, '請填寫商品名稱');
  if (!str(p.series)) throw new HttpError(400, '請選擇分類');

  let price = null;
  if (p.price !== null && p.price !== undefined && p.price !== '') {
    price = Number(p.price);
    if (!Number.isInteger(price) || price < 0) throw new HttpError(400, '售價需為 0 以上的整數');
  }

  const sizes = list(p.sizes);
  return {
    id,
    series: str(p.series),
    name: str(p.name),
    subtitle: str(p.subtitle),
    price,
    sku: str(p.sku),
    colors: list(p.colors),
    sizes,
    soldOutSizes: list(p.soldOutSizes).filter((s) => sizes.includes(s)),
    image: str(p.image),
    images: list(p.images),
    description: str(p.description),
    material: str(p.material),
    care: str(p.care),
    shopeeUrl: str(p.shopeeUrl),
  };
}

// SVG 是文字檔，可以夾帶程式碼；上傳到網站前擋掉含有腳本或外部事件的檔案
function checkSvg(body) {
  const text = body.toString('utf8');
  if (!/<svg[\s>]/i.test(text)) throw new HttpError(400, '這不是有效的 SVG 檔案');
  if (/<script[\s>]|<foreignObject[\s>]|\son[a-z]+\s*=|(?:href|src)\s*=\s*["']?\s*javascript:/i.test(text)) {
    throw new HttpError(400, 'SVG 含有腳本或事件程式碼，基於安全無法上傳；請用設計軟體重新匯出');
  }
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new HttpError(413, `檔案超過 ${limit / 1024 / 1024} MB`));
        req.destroy();
      } else chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default function lumiAdmin() {
  let root = process.cwd();
  const dataPath = () => path.join(root, DATA_FILE);

  const readProducts = async () => JSON.parse(await fs.readFile(dataPath(), 'utf8'));
  const writeProducts = async (products) => {
    const tmp = `${dataPath()}.tmp`;
    await fs.writeFile(tmp, `${JSON.stringify(products, null, 2)}\n`);
    await fs.rename(tmp, dataPath());
  };

  async function handle(req, res) {
    const url = new URL(req.url, 'http://localhost');
    const route = `${req.method} ${url.pathname}`;

    if (route === 'GET /products') return readProducts();

    if (route === 'POST /products') {
      const { originalId, product, insertAfter } = JSON.parse((await readBody(req, 1024 * 1024)).toString('utf8'));
      const next = cleanProduct(product);
      const products = await readProducts();
      const index = originalId ? products.findIndex((p) => p.id === originalId) : -1;
      if (originalId && index === -1) throw new HttpError(404, '找不到要更新的商品，可能已被刪除');
      if (products.some((p, i) => p.id === next.id && i !== index)) {
        throw new HttpError(409, `網址 ID「${next.id}」已被其他商品使用`);
      }
      if (index !== -1) products[index] = next;
      else {
        // 複製的商品放在原商品後面；找不到原商品就放最後
        const after = insertAfter ? products.findIndex((p) => p.id === insertAfter) : -1;
        if (after === -1) products.push(next);
        else products.splice(after + 1, 0, next);
      }
      await writeProducts(products);
      return next;
    }

    const del = route.match(/^DELETE \/products\/([^/]+)$/);
    if (del) {
      const id = decodeURIComponent(del[1]);
      const products = await readProducts();
      const next = products.filter((p) => p.id !== id);
      if (next.length === products.length) throw new HttpError(404, '找不到此商品');
      await writeProducts(next);
      return { ok: true };
    }

    if (route === 'PUT /products/order') {
      const ids = JSON.parse((await readBody(req, 1024 * 1024)).toString('utf8'));
      const products = await readProducts();
      if (!Array.isArray(ids) || ids.length !== products.length) throw new HttpError(400, '排序資料不完整');
      const byId = new Map(products.map((p) => [p.id, p]));
      const next = ids.map((id) => byId.get(id));
      if (next.some((p) => !p) || new Set(ids).size !== ids.length) throw new HttpError(400, '排序資料不符');
      await writeProducts(next);
      return { ok: true };
    }

    if (route === 'POST /upload') {
      const ext = IMAGE_EXT[(req.headers['content-type'] || '').split(';')[0]];
      if (!ext) throw new HttpError(415, '只接受 JPG、PNG、WebP、GIF、SVG 圖片');
      const body = await readBody(req, MAX_UPLOAD);
      if (!body.length) throw new HttpError(400, '檔案是空的');
      if (ext === '.svg') checkSvg(body);
      const name = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
      await fs.mkdir(path.join(root, UPLOAD_DIR), { recursive: true });
      await fs.writeFile(path.join(root, UPLOAD_DIR, name), body);
      return { path: `${UPLOAD_URL}/${name}` };
    }

    throw new HttpError(404, '找不到此 API');
  }

  return {
    name: 'lumi-admin',
    apply: 'serve',
    configResolved(config) {
      root = config.root;
    },
    configureServer(server) {
      // 剛上傳的圖片 Vite 不一定馬上認得（會回傳 index.html），所以由這裡直接送出檔案，讓預覽立即可用
      const types = Object.fromEntries(Object.entries(IMAGE_EXT).map(([type, ext]) => [ext, type]));
      server.middlewares.use(`/${UPLOAD_URL}`, async (req, res, next) => {
        const name = path.basename(decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
        const type = types[path.extname(name).toLowerCase()];
        if (!type) return next();
        try {
          const file = await fs.readFile(path.join(root, UPLOAD_DIR, name));
          res.setHeader('Content-Type', type);
          res.setHeader('Cache-Control', 'no-cache');
          if (type === 'image/svg+xml') res.setHeader('Content-Security-Policy', "script-src 'none'");
          res.end(file);
        } catch {
          next();
        }
      });

      server.middlewares.use('/__admin', async (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        try {
          res.end(JSON.stringify(await handle(req, res)));
        } catch (err) {
          const status = err instanceof HttpError ? err.status : err instanceof SyntaxError ? 400 : 500;
          if (status === 500) server.config.logger.error(`[lumi-admin] ${err.stack || err}`);
          res.statusCode = status;
          res.end(JSON.stringify({ error: status === 500 ? '伺服器錯誤，請查看終端機' : err.message }));
        }
      });
    },
  };
}
