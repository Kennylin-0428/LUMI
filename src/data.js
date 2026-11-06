export const ASSETS = { baby: 'assets/t1.svg', princess: 'assets/pc1-1.svg' };

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
    description: '精緻鞋頭花飾搭配挺版飽滿鞋型，讓每個值得紀念的日子更加可愛。',
    image: '/assets/pc系列1.svg',
    features: [
      ['❀', '精緻花飾', '細緻花飾點綴鞋頭，為每一雙公主鞋添上甜美亮點。'],
      ['♕', '挺版飽滿鞋型', '挺版輪廓搭配飽滿鞋頭，勾勒出優雅可愛的公主鞋模樣。'],
      ['♡', '甜美色系', '珍珠白與甜粉，適合日常與特別場合。'],
    ],
  },
};

export const SHOPEE_URL_RE = /^https:\/\/([\w-]+\.)?shopee\.tw\//i;
