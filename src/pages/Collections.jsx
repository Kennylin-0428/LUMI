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
          desc="探索寶寶鞋與公主鞋的系列特色，挑選適合寶貝的可愛款式。"
        />
        <CollectionCards />
      </section>
    </>
  );
}
