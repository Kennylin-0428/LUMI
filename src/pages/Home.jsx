import StoryCarousel from '../components/StoryCarousel.jsx';
import SelectionTiers from '../components/SelectionTiers.jsx';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CollectionCards from '../components/CollectionCards.jsx';
import PromiseCards from '../components/PromiseCards.jsx';
import Banner from '../components/Banner.jsx';

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-content">
          <span className="eyebrow">LITTLE STEPS, LOVELY DAYS</span>
          <h1>把日常的可愛，<br />穿在腳上。</h1>
          <p>從活潑可愛的寶寶鞋，到甜美優雅的公主鞋。LUMI 露米陪伴孩子每一個閃閃發光的小日常。</p>
          <div className="hero-actions">
            <PillButton to="/collections">探索兩大系列</PillButton>
            <PillButton to="/story" className="secondary">認識 LUMI</PillButton>
          </div>
        </div>
        <div className="hero-visual hero-carousel">
          <span className="sparkle float">✦</span>
          <StoryCarousel />
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading
          eyebrow="OUR COLLECTIONS"
          title="找到適合寶貝的鞋子"
          desc="每個系列都經典！分開挑選，找到適合日常與特殊時刻的鞋款。"
        />
        <CollectionCards />
      </section>
      <SelectionTiers />
      <section className="wrap section">
        <SectionHeading eyebrow="OUR LITTLE PROMISE" title="選一雙鞋，也放一點心思" />
        <PromiseCards />
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
