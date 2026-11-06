import SelectionTiers from '../components/SelectionTiers.jsx';
import StoryCarousel from '../components/StoryCarousel.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const STORY_SLIDES = [
  { src: '/assets/lumi-mascot-party.png', alt: 'LUMI 吉祥物參加溫馨派對' },
  { src: '/assets/lumi-mascot-park.png', alt: 'LUMI 吉祥物的公園時光' },
  { src: '/assets/lumi-mascot-beach.png', alt: 'LUMI 吉祥物在海邊拾貝' },
  { src: '/assets/lumi-mascot-bookshop.png', alt: 'LUMI 吉祥物在溫馨書店閱讀' },
  { src: '/assets/lumi-mascot-florist.png', alt: 'LUMI 吉祥物在花店挑花' },
  { src: '/assets/lumi-mascot-school.png', alt: 'LUMI 吉祥物的學校日常' },
  { src: '/assets/lumi-mascot-wedding.png', alt: 'LUMI 吉祥物擔任婚禮小花童' },
  { src: '/assets/lumi-mascot-christmas.png', alt: 'LUMI 吉祥物的溫馨聖誕節' },
  { src: '/assets/lumi-mascot-halloween.png', alt: 'LUMI 吉祥物的可愛萬聖節' },
  { src: '/assets/lumi-mascot-piano.png', alt: 'LUMI 吉祥物的鋼琴演奏會' },
  { src: '/assets/lumi-mascot-violin.png', alt: 'LUMI 吉祥物的小提琴演奏會' },
  { src: '/assets/lumi-mascot-ballet.png', alt: 'LUMI 吉祥物的芭蕾謝幕' },
  { src: '/assets/lumi-mascot-new-year.png', alt: 'LUMI 吉祥物的過年拜年' },
  { src: '/assets/lumi-mascot-running.png', alt: 'LUMI 吉祥物在公園跑步' },
  { src: '/assets/lumi-mascot-slide.png', alt: 'LUMI 吉祥物溜滑梯' },
  { src: '/assets/lumi-mascot-amusement-park.png', alt: 'LUMI 吉祥物的樂園出遊' },
];

export default function Story() {
  return (
    <>
      <Breadcrumbs items={['關於 LUMI']} />
      <section className="wrap">
        <div className="intro-hero about-lumi">
          <div>
            <span className="eyebrow">HELLO, WE ARE LUMI</span>
            <h1>把日常的小美好，<br />穿在腳上。</h1>
            <p>
              LUMI 露米，是一個以童趣與柔和色彩為靈感的童鞋選品品牌。我們從日常穿搭與特別時刻出發，挑選繽紛的寶寶鞋與精緻的公主鞋，希望讓家長更容易找到符合孩子需求與喜好的款式，為成長中的每一步添上一點可愛。
            </p>
            <div className="intro-highlights" aria-label="品牌選品方向">
              <span>日常百搭</span><span>質感嚴選</span><span>精緻珍藏</span>
            </div>
            <PillButton to="/collections">看看 LUMI 的系列</PillButton>
          </div>
          <StoryCarousel slides={STORY_SLIDES} label="LUMI 吉祥物的日常" />
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading eyebrow="WHAT WE CARE ABOUT" title="陪伴每個日常，點綴每個特別時刻" />
        <div className="rich-text">
          <p>從第一次挑選童鞋，到準備出遊、生日聚會或家庭合照，孩子的成長裡有好多值得記住的日子。</p>
          <p>露米喜歡溫柔的米色、粉色、淺藍色與淺紫色，也喜歡小小鞋子上的童趣細節。我們帶著這份喜好挑選款式，相信日常活力與精緻打扮都各有可愛。</p>
          <p>從款式挑選、風格搭配，到整理尺寸與選購資訊，LUMI 希望把選鞋這件事變得更清楚、更輕鬆。寶寶鞋與公主鞋各自擁有獨立的選購空間，陪家長找到適合當下需求的鞋子。</p>
        </div>
      </section>
      <SelectionTiers />
    </>
  );
}
