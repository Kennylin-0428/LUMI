export const ASSETS = { baby: 'assets/t1.png', princess: 'assets/princess-shoes.jpg' };

// 將實際蝦皮商品網址填入 product.shopeeUrl。留空時會顯示提示，不會連到錯誤網站。
export const products = [
  {
    id: 'baby-candy',
    series: 'baby',
    name: '糖果跑跑款｜繽紛撞色',
    colors: ['奶茶米', '天空藍', '甜心粉', '米白色'],
    sizes: ['13 cm', '14 cm', '15 cm', '16 cm', '17 cm'],
    price: null,
    image: ASSETS.baby,
    subtitle: '透氣網眼 × 雙帶設計・日常自在探索',
    shopeeUrl: '',
  },
  {
    id: 'princess-lace',
    series: 'princess',
    name: '珍珠蕾絲款｜夢幻公主鞋',
    colors: ['奶白', '甜粉'],
    sizes: ['請參考實際商品尺寸'],
    price: null,
    image: ASSETS.princess,
    subtitle: '立體蕾絲 × 珍珠點綴・溫柔優雅',
    shopeeUrl: '',
  },
];

export const series = {
  baby: {
    name: '寶寶鞋系列',
    eyebrow: 'BABY COLLECTION',
    tagline: '輕盈舒適，自在探索每一步',
    description: '繽紛色彩與俏皮設計，陪伴寶貝走出充滿驚喜的每一天。',
    image: ASSETS.baby,
    features: [
      ['☁', '透氣網眼', '網眼拼接設計，輕盈又有活力。'],
      ['✦', '雙帶設計', '魔鬼氈設計，穿脫更便利。'],
      ['♡', '繽紛撞色', '奶茶、淺藍、粉色與米白，多種日常搭配。'],
    ],
  },
  princess: {
    name: '公主鞋系列',
    eyebrow: 'PRINCESS COLLECTION',
    tagline: '優雅蕾絲，珍藏閃耀小日常',
    description: '細緻蕾絲、珍珠與蝴蝶結，讓每個值得紀念的日子更加可愛。',
    image: ASSETS.princess,
    features: [
      ['♕', '精緻蕾絲', '浪漫蕾絲蝴蝶結，增添柔美層次。'],
      ['✧', '珍珠點綴', '細緻裝飾，呈現溫柔氣質。'],
      ['♡', '甜美色系', '奶白與甜粉，適合日常與特別場合。'],
    ],
  },
};

export const SHOPEE_URL_RE = /^https:\/\/([\w-]+\.)?shopee\.tw\//i;
