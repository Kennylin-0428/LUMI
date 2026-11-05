import { useParams } from 'react-router-dom';
import { series } from '../data.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import PillButton from '../components/PillButton.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SeriesTabs from '../components/SeriesTabs.jsx';
import FeatureRow from '../components/FeatureRow.jsx';
import Banner from '../components/Banner.jsx';
import NotFound from './NotFound.jsx';

export default function SeriesIntro() {
  const { seriesKey } = useParams();
  const d = series[seriesKey];
  if (!d) return <NotFound />;

  return (
    <>
      <Breadcrumbs items={[{ label: '系列總覽', to: '/collections' }, d.name, '系列介紹']} />
      <div className="wrap">
        <div className={`intro-hero ${seriesKey === 'princess' ? 'princess' : ''}`}>
          <div>
            <span className="eyebrow">{d.eyebrow}</span>
            <h1>{d.name}</h1>
            <h3>{d.tagline}</h3>
            <p>{d.description}</p>
            <PillButton to={`/${seriesKey}/products`} className={seriesKey === 'baby' ? 'blue' : ''}>
              瀏覽本系列商品
            </PillButton>
          </div>
          <img src={d.image} alt={d.name} />
        </div>
        <SeriesTabs seriesKey={seriesKey} active="intro" />
      </div>
      <section className="wrap section">
        <SectionHeading eyebrow="DETAILS WE LOVE" title={`${d.name}的可愛特色`} />
        <FeatureRow features={d.features} />
      </section>
      <Banner
        title="找到喜歡的顏色了嗎？"
        desc="看看這個系列有哪些可愛款式。"
        cta="前往商品列表"
        to={`/${seriesKey}/products`}
      />
    </>
  );
}
