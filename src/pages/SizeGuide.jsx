import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const STEPS = [
  ['01｜測量腳長', '讓孩子站在紙上，腳跟靠牆，標出最長腳趾的位置，量出腳跟到腳趾的距離。'],
  ['02｜兩腳都要量', '左右腳可能略有差異，選鞋時以較長的一腳為參考。'],
  ['03｜確認鞋款尺碼', '對照該款鞋子的實際鞋內長、楦頭寬度與穿著建議，避免只依年齡選擇。'],
  ['04｜下單前再核對', '不同系列尺寸系統可能不同，請前往對應蝦皮商品頁確認商品尺寸表。'],
];

export default function SizeGuide() {
  return (
    <>
      <Breadcrumbs items={['尺寸指南']} />
      <section className="wrap section">
        <SectionHeading
          eyebrow="SIZE GUIDE"
          title="尺寸指南"
          desc="以下為一般測量方法；不同鞋款的鞋內長、楦頭與尺寸可能不同，最終以蝦皮商品資訊及客服回覆為準。"
        />
        <div className="guide-grid">
          {STEPS.map(([title, desc]) => (
            <div className="guide-card" key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
