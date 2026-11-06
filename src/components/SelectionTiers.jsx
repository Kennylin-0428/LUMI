import SectionHeading from './SectionHeading.jsx';

const SELECTION_TIERS = [
  {
    name: 'LUMI BASIC',
    title: '日常百搭款',
    image: '/assets/等級標籤1.png',
    description: '以簡約、好搭配的款式為選品方向，陪伴孩子每天的可愛日常。',
  },
  {
    name: 'LUMI SELECT',
    title: '質感嚴選款',
    image: '/assets/等級標籤2.png',
    description: '挑選更有細節與設計美感的款式，讓日常穿搭多一點精緻與特色。',
  },
  {
    name: 'LUMI PREMIUM',
    title: '精緻珍藏款',
    image: '/assets/等級標籤3.png',
    description: '以更細緻的外觀與裝飾細節為選品方向，為生日、聚會與值得紀念的時刻，挑選一份特別的可愛。',
  },
];

export default function SelectionTiers() {
  return (
      <section className="wrap section">
        <SectionHeading
          eyebrow="THE LUMI SELECTION"
          title="三種選品定位"
          desc="從日常百搭到特別時刻，LUMI 以三種選品分級介紹款式特色，讓家長依穿搭情境與喜好挑選。"
        />
        <div className="story-tiers">
          {SELECTION_TIERS.map(({ name, title, image, description }) => (
            <article className="story-tier" key={name}>
              <img src={image} alt={`${name}｜${title}選品標籤`} loading="lazy" />
              <div className="story-tier-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="story-tier-note">選品分級用於介紹款式定位；各款材質、尺寸與商品細節，請參考對應商品頁的說明。</p>
      </section>
  );
}
