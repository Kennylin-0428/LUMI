import { Link } from 'react-router-dom';
import { series } from '../data.js';

const CARDS = [
  {
    key: 'baby',
    eyebrow: 'BABY COLLECTION',
    title: '☁ 寶寶鞋系列',
    desc: '童趣外型・穿脫便利・繽紛撞色',
    image: series.baby.image,
    alt: '童趣外型寶寶鞋系列',
    colors: '奶茶米／天空藍／甜心粉／米白色',
  },
  {
    key: 'princess',
    eyebrow: 'PRINCESS COLLECTION',
    title: '♕ 公主鞋系列',
    desc: '精緻花飾・挺版鞋型・浪漫甜美',
    image: series.princess.image,
    alt: '精緻花飾公主鞋系列',
    colors: '珍珠白／甜粉',
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
