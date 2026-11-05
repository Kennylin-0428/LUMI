import { ASSETS } from '../data.js';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CollectionCards from '../components/CollectionCards.jsx';
import FeatureRow from '../components/FeatureRow.jsx';
import Banner from '../components/Banner.jsx';

const PROMISES = [
  ['☁', '自在日常', '陪孩子探索生活裡的每一個新發現。'],
  ['✧', '溫柔選品', '挑選富有童趣與質感的可愛鞋款。'],
  ['♡', '珍藏時刻', '讓穿搭成為每一段成長回憶的點綴。'],
];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-content">
          <span className="eyebrow">LITTLE STEPS, LOVELY DAYS</span>
          <h1>把日常的小可愛，<br />穿在腳上。</h1>
          <p>從活潑可愛的寶寶鞋，到甜美優雅的公主鞋。LUMI 露米陪伴孩子每一個閃閃發光的小日常。</p>
          <div className="hero-actions">
            <PillButton to="/collections">探索兩大系列</PillButton>
            <PillButton to="/story" className="secondary">認識 LUMI</PillButton>
          </div>
        </div>
        <div className="hero-visual">
          <span className="sparkle float">✦</span>
          <img src={ASSETS.princess} alt="LUMI 甜美公主鞋系列實品參考照片" />
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading
          eyebrow="OUR COLLECTIONS"
          title="找到寶貝喜歡的那一雙"
          desc="兩種系列，兩種可愛。分開挑選，找到適合日常與特殊時刻的鞋款。"
        />
        <CollectionCards />
      </section>
      <section className="wrap section">
        <SectionHeading eyebrow="OUR LITTLE PROMISE" title="小小的鞋子，大大的喜歡" />
        <FeatureRow features={PROMISES} />
      </section>
      <Banner
        eyebrow="A LITTLE HELP"
        title="寶貝尺寸怎麼選？"
        desc="穿鞋舒適的第一步，從測量腳長開始。"
        cta="查看尺寸指南"
        to="/size-guide"
      />
    </>
  );
}
