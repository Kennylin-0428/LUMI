import MemoryGame from './pages/MemoryGame.jsx';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import SeriesIntro from './pages/SeriesIntro.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Story from './pages/Story.jsx';
import SizeGuide from './pages/SizeGuide.jsx';
import Sitemap from './pages/Sitemap.jsx';
import NotFound from './pages/NotFound.jsx';
import ShoeFinder from './pages/ShoeFinder.jsx';

const TITLES = {
  '': '首頁',
  collections: '系列總覽',
  baby: '寶寶鞋系列',
  princess: '公主鞋系列',
  story: '關於 LUMI',
  'size-guide': '尺寸指南',
  sitemap: '網站架構',
  'shoe-finder': '選鞋小旅程',
  'memory-game': 'LUMI 翻翻樂',
};

export default function App() {
  const { pathname, hash } = useLocation();
  const section = pathname.split('/').filter(Boolean)[0] || '';

  useEffect(() => {
    document.title = `${TITLES[section] || 'LUMI'}｜LUMI 露米`;
  }, [pathname, section]);

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <Header section={section || 'home'} />
      <main id="app" aria-live="polite">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/shoe-finder" element={<ShoeFinder />} />
          <Route path="/:seriesKey" element={<SeriesIntro />} />
          <Route path="/:seriesKey/products" element={<ProductList />} />
          <Route path="/:seriesKey/product/:productId" element={<ProductDetail />} />
          <Route path="/story" element={<Story />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
