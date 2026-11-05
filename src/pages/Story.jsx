import { ASSETS } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Story() {
  return (
    <>
      <Breadcrumbs items={['品牌故事']} />
      <section className="wrap">
        <div className="intro-hero princess">
          <div>
            <span className="eyebrow">HELLO, WE ARE LUMI</span>
            <h1>把日常的小美好，<br />穿在腳上。</h1>
            <p>
              LUMI 露米，是一個以童趣與柔和色彩為靈感的童鞋選品品牌。從繽紛的寶寶鞋，到精緻的公主鞋，我們希望每個日常與特別時刻，都有剛剛好的可愛。
            </p>
            <PillButton to="/collections">看看 LUMI 的系列</PillButton>
          </div>
          <img src={ASSETS.princess} alt="LUMI 公主鞋實品參考" />
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading eyebrow="OUR LITTLE STORY" title="每一步，都是值得收藏的成長故事" />
        <div className="rich-text">
          <p>從第一次挑選童鞋，到準備出遊、生日聚會或家庭合照，孩子的成長裡有好多值得記住的日子。</p>
          <p>露米喜歡用溫柔的米色、粉色、淺藍色與淺紫色，替小小的鞋子添上一點夢幻；也相信日常活力與精緻打扮都各有可愛。</p>
          <p>寶寶鞋系列與公主鞋系列各自擁有獨立的選購空間，讓家長更方便找到正在尋找的款式。</p>
        </div>
      </section>
    </>
  );
}
