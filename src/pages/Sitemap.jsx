import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const PANELS = [
  ['寶寶鞋系列', [['/baby', '系列介紹與商品'], ['/baby/product/baby-candy', '商品詳情｜糖果跑跑款']]],
  ['公主鞋系列', [['/princess', '系列介紹與商品'], ['/princess/product/princess-lace', '商品詳情｜珍珠蕾絲款']]],
  ['互動體驗', [['/memory-game', 'LUMI 翻翻樂'], ['/picture-puzzle', 'LUMI 日常拼圖'], ['/shoe-finder', '選鞋小旅程']]],
  ['品牌頁面', [['/', '首頁'], ['/collections', '系列總覽'], ['/story', '關於 LUMI'], ['/partnership', '合作洽詢'], ['/size-guide', '尺寸指南']]],
];

export default function Sitemap() {
  return (
    <>
      <Breadcrumbs items={['網站架構']} />
      <section className="wrap section">
        <SectionHeading eyebrow="SITE MAP" title="網站架構層級" desc="寶寶鞋與公主鞋分開管理，商品詳情歸屬各自系列。" />
        <div className="site-tree">
          {PANELS.map(([title, links]) => (
            <div className="tree-panel" key={title}>
              <h3>{title}</h3>
              {links.map(([to, label]) => (
                <Link key={to} to={to}>{label}</Link>
              ))}
            </div>
          ))}
          <div className="tree-panel">
            <h3>購買流程</h3>
            <p>官網商品詳情 → 蝦皮商品頁（填入賣場網址後啟用） → 蝦皮完成下單與付款。</p>
          </div>
        </div>
      </section>
    </>
  );
}
