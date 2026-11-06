import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const STEPS = [
  ['01｜測量腳長', '讓孩子站在紙上，腳跟靠牆，標出最長腳趾的位置，量出腳跟到腳趾的距離。'],
  ['02｜兩腳都要量', '左右腳可能略有差異，選鞋時以較長的一腳為參考。'],
  ['03｜依腳型對照尺寸', '先選擇對應鞋款的尺寸表，再以實際腳長對照「適合腳長（cm）」欄位：一般腳型看左欄，寬腳或厚腳看右欄。「內長」是鞋內長度，與實際腳長不同。'],
  ['04｜確認系列再選碼', '公主鞋與寶寶鞋／童鞋的尺碼對應不同，請勿混用。例如 21 碼的公主鞋內長為 13.5 cm，寶寶鞋／童鞋內長為 14.5 cm。下單前請再核對商品頁的鞋款與尺寸資訊。'],
];

const SIZE_CHARTS = [
  {
    title: '公主鞋尺寸表',
    src: '/assets/童鞋尺寸表_左右欄位修正.svg',
    description: '選購公主鞋時，請依此表的內長及適合腳長對照尺碼。',
  },
  {
    title: '寶寶鞋／童鞋尺寸表',
    src: '/assets/寶寶鞋童鞋尺寸表_左右欄位修正.svg',
    description: '選購寶寶鞋／童鞋時，請依此表對照，勿套用公主鞋的尺碼。',
  },
];

export default function SizeGuide() {
  return (
    <>
      <Breadcrumbs items={['尺寸指南']} />
      <section className="wrap section">
        <SectionHeading
          eyebrow="SIZE GUIDE"
          title="尺寸指南"
          desc="選鞋先量腳長，再依鞋款與腳型對照下方尺寸表。表內長度皆以公分（cm）為單位，請分清鞋內長與適合腳長。"
        />
        <div className="size-charts">
          {SIZE_CHARTS.map(({ title, src, description }) => (
            <section className="size-chart" key={src} aria-label={title}>
              <div className="size-chart-heading">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <a className="size-chart-image" href={src} target="_blank" rel="noopener noreferrer" aria-label={`開啟${title}原圖（新分頁）`}>
                <img src={src} alt={`${title}，由左至右為尺寸、內長（cm）、一般腳型適合腳長（cm）、寬／厚腳適合腳長（cm）`} width="1080" height="1350" />
              </a>
              {/* <a className="size-chart-link" href={src} target="_blank" rel="noopener noreferrer">開啟尺寸表原圖（新分頁） ↗</a> */}
            </section>
          ))}
        </div>
        <section className="size-measurement" aria-labelledby="measurement-title">
          <div className="size-measurement-heading">
            <span className="eyebrow">HOW TO MEASURE</span>
            <h2 id="measurement-title">量好腳長，選對尺寸</h2>
            <p>左右腳都測量，以較長的一腳為準，再對照上方適合的鞋款與腳型。</p>
          </div>
        <div className="guide-grid">
          {STEPS.map(([title, desc]) => (
            <div className="guide-card" key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        </section>
      </section>
    </>
  );
}
