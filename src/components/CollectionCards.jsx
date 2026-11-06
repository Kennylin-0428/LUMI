import { Link } from 'react-router-dom';
import { series } from '../data.js';

const CARDS = [
  {
    key: 'baby',
    eyebrow: 'BABY COLLECTION',
    title: '☁ 寶寶鞋系列',
    desc: '糖果跑跑款・繽紛撞色・日常活力',
    image: series.baby.image,
    alt: '糖果跑跑款寶寶鞋',
    colors: '奶茶米／天空藍／甜心粉／米白色',
  },
  {
    key: 'princess',
    eyebrow: 'PRINCESS COLLECTION',
    title: '♕ 公主鞋系列',
    desc: '珍珠蕾絲款・細緻蝴蝶結・浪漫甜美',
    image: series.princess.image,
    alt: '珍珠蕾絲款公主鞋',
    colors: '奶白／甜粉',
  },
];

export default function CollectionCards() {
  return (
    <div className="collection-grid">
      {CARDS.map((c) => (
        <article className={`collection-card ${c.key}`} key={c.key}>
          <div className="collection-top">
            <span className="eyebrow">{c.eyebrow}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
          <Link to={`/${c.key}`}>
            <img src={c.image} alt={c.alt} />
          </Link>
          <div className="collection-bottom">
            <span>{c.colors}</span>
            <Link to={`/${c.key}`}>查看系列 →</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
