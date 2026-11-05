import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CollectionCards from '../components/CollectionCards.jsx';

export default function Collections() {
  return (
    <>
      <Breadcrumbs items={['系列總覽']} />
      <section className="wrap section">
        <SectionHeading
          eyebrow="TWO LOVELY COLLECTIONS"
          title="系列總覽"
          desc="分別探索寶寶鞋與公主鞋；兩種商品不會混在同一商品列表。"
        />
        <CollectionCards />
      </section>
    </>
  );
}
