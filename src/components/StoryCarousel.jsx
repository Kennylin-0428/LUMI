import { useEffect, useState } from 'react';
import { ASSETS } from '../data.js';

const SLIDES = [
  { src: ASSETS.princess, alt: 'LUMI 公主鞋實品參考' },
  { src: ASSETS.baby, alt: 'LUMI 寶寶鞋實品參考' },
];

export default function StoryCarousel({ slides = SLIDES, label = 'LUMI 鞋款照片' }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion, active, slides.length]);

  const move = (direction) => setActive((index) => (index + direction + slides.length) % slides.length);

  return (
    <section
      className="story-carousel"
      aria-label={label}
      aria-roledescription="輪播"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="story-carousel-slides">
        {slides.map(({ src, alt }, index) => (
          <div key={src} hidden={active !== index} role="group" aria-roledescription="投影片" aria-label={`${index + 1} / ${slides.length}`}>
            <img src={src} alt={alt} width="600" height="600" />
          </div>
        ))}
      </div>
      <button className="story-carousel-arrow previous" type="button" onClick={() => move(-1)} aria-label="上一張照片">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <button className="story-carousel-arrow next" type="button" onClick={() => move(1)} aria-label="下一張照片">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
      </button>
      <div className="story-carousel-controls">
        <div className="story-carousel-dots">
          {slides.map(({ alt }, index) => (
            <button key={alt} type="button" aria-label={`顯示${alt}`} aria-current={active === index ? 'true' : undefined} onClick={() => setActive(index)} />
          ))}
        </div>
        {/* {!reducedMotion && <button className="story-carousel-pause" type="button" onClick={() => setPaused((value) => !value)}>{paused ? '播放' : '暫停'}</button>} */}
      </div>
    </section>
  );
}
