import productsData from './products.json';

export const ASSETS = { baby: 'assets/t1.svg', princess: 'assets/pc1-1.svg' };

// 商品資料存放在 src/products.json，請透過後台（npm run dev 後開啟 #/admin）新增與編輯。
// 將實際蝦皮商品網址填入 product.shopeeUrl。留空時會顯示提示，不會連到錯誤網站。
export const products = productsData.map((p) => ({
  subtitle: '',
  price: null,
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
  ...p,
}));

export const formatPrice = (price) =>
  price === null || price === undefined || price === '' ? '價格請見蝦皮賣場' : `NT$ ${Number(price).toLocaleString('zh-TW')}`;

export const series = {
  baby: {
    name: '寶寶鞋系列',
    eyebrow: 'BABY COLLECTION',
    tagline: '童趣相伴，輕鬆迎接每一天',
    description: '童趣外型搭配便利穿脫設計，陪伴寶貝走出充滿驚喜的每一天。',
    image: '/assets/bc系列1.svg',
    features: [
      ['✦', '童趣外型', '用可愛的小細節，陪伴寶貝的日常。'],
      ['☁', '穿脫便利', '輕鬆穿上喜歡的鞋，準備迎接小美好。'],
      ['♡', '繽紛撞色', '奶茶、淺藍、粉色與米白，多種日常搭配。'],
    ],
  },
  princess: {
    name: '公主鞋系列',
    eyebrow: 'PRINCESS COLLECTION',
    tagline: '精緻花飾，珍藏閃耀小日常',
    description: '精緻鞋頭花飾搭配挺版飽滿鞋型，展現甜美優雅氣質，為每一次精心打扮增添亮點。',
    image: '/assets/pc系列1.svg',
    features: [
      ['❀', '精緻花飾', '細緻花飾點綴鞋頭，為每一雙公主鞋添上甜美亮點。'],
      ['♕', '挺版飽滿鞋型', '挺版輪廓搭配飽滿鞋頭，勾勒出優雅可愛的公主鞋模樣。'],
      ['♡', '甜美色系', '珍珠白與甜粉，適合日常與特別場合。'],
    ],
  },
};

export const SHOPEE_URL_RE = /^https:\/\/([\w-]+\.)?shopee\.tw\//i;
