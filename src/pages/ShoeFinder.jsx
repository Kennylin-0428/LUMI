import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { products } from '../data.js';

const QUESTIONS = [
  { title: '今天，想帶寶貝去哪裡？', story: '陽光從窗邊探進來，寶貝已經迫不及待出門。這一天的故事會從哪裡開始？', options: [
    ['park', '☀', '公園裡的小小探險', '散步、追逐，享受自在的日常', 'baby'],
    ['party', '♕', '赴一場閃亮的約會', '聚會、慶生，留下可愛的紀念', 'princess'],
    ['both', '♡', '每天都有一點驚喜', '日常和特別的日子，我都想看看', null],
  ] },
  { title: '打開鞋櫃，最想拿起哪一雙？', story: '穿上喜歡的衣服，再選一雙讓心情亮起來的鞋。哪一種細節最讓你心動？', options: [
    ['playful', '✦', '繽紛又俏皮', '童趣外型、繽紛撞色與便利穿脫設計', 'baby'],
    ['sweet', '✧', '溫柔又甜美', '精緻花飾與甜美的鞋型輪廓', 'princess'],
    ['open', '☁', '還沒有決定', '讓 LUMI 陪我一起找靈感', null],
  ] },
];

export default function ShoeFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(['', '']);
  const [foot, setFoot] = useState('');
  const [usual, setUsual] = useState('');
  const heading = useRef(null);
  const go = (next) => {
    setStep(next);
    requestAnimationFrame(() => heading.current?.focus());
  };
  const selected = QUESTIONS.map((q, i) => q.options.find(([id]) => id === answers[i]));
  const score = (product) => selected.reduce((total, option, i) => total + (option?.[4] === product.series ? (i === 0 ? 2 : 1) : 0), 0);
  const ranked = [...products].sort((a, b) => score(b) - score(a));
  const recommendations = ranked.filter((p) => score(p) === score(ranked[0]));
  const reset = () => { setAnswers(['', '']); setFoot(''); setUsual(''); go(0); };

  return (
    <>
      <Breadcrumbs items={['選鞋小旅程']} />
      <section className={`wrap finder${step === 3 ? ' finder-with-results' : ''}`}>
        <div className="finder-intro">
          <span className="eyebrow">FIND YOUR LITTLE SPARK</span>
          <h1>下一步，穿上喜歡的故事。</h1>
          <p>3 個小問題，陪你探索 LUMI 鞋櫃，找到心動的款式與選碼方向。</p>
        </div>
        <ol className="finder-progress" aria-label="測驗進度">
          {['出門的故事', '心動的風格', '小腳的尺寸'].map((label, i) => (
            <li key={label} className={step >= i ? 'current' : ''} aria-current={step === i ? 'step' : undefined}><span>{step > i ? '✓' : `0${i + 1}`}</span>{label}</li>
          ))}
        </ol>
        <div className={`finder-panel${step < 2 ? ' finder-panel-first' : ''}`}>
          {step === 0 && <img className="finder-puzzled-cat" src="assets/lumi-mascot-puzzled-barefoot.png" alt="LUMI 貓咪赤著腳，托著下巴疑惑地思考要選哪雙鞋" />}
          {step === 1 && <img className="finder-puzzled-cat finder-cabinet-cat" src="assets/lumi-mascot-shoe-cabinet-sneakers-v2.png" alt="LUMI 貓咪赤著腳打開鞋櫃，挑選米色與淺藍色跑步鞋" />}
          <span className="eyebrow">{step < 3 ? `CHAPTER 0${step + 1}` : 'YOUR LUMI MATCH'}</span>
          <h2 ref={heading} tabIndex={-1}>{step < 2 ? QUESTIONS[step].title : step === 2 ? '出發前，量量小腳丫。' : '屬於寶貝的選鞋提案 ♡'}</h2>
          {step < 2 ? <>
            <p className="finder-story">{QUESTIONS[step].story}</p>
            <div className="finder-options" role="group" aria-label={QUESTIONS[step].title}>
              {QUESTIONS[step].options.map(([id, icon, title, desc]) => <button type="button" key={id} className={`finder-option ${answers[step] === id ? 'selected' : ''}`} aria-pressed={answers[step] === id} onClick={() => setAnswers((prev) => prev.map((value, i) => i === step ? id : value))}>
                <span className="finder-icon" aria-hidden="true">{icon}</span><strong>{title}</strong><span>{desc}</span><span className="finder-check" aria-hidden="true">{answers[step] === id ? '●' : '○'}</span>
              </button>)}
            </div>
            <div className="finder-actions">{step > 0 && <button className="pill-btn secondary" onClick={() => go(step - 1)}>上一步</button>}<button className="pill-btn" disabled={!answers[step]} onClick={() => go(step + 1)}>下一章 →</button></div>
          </> : step === 2 ? <form onSubmit={(event) => { event.preventDefault(); go(3); }}>
            <p className="finder-story">讓孩子站在紙上，量出腳跟到最長腳趾的距離，左右腳都量，以較長的一腳為準。</p>
            <div className="finder-fields">
              <label htmlFor="finder-foot">腳長（cm，選填）<input id="finder-foot" type="number" min="1" max="40" step="0.1" placeholder="例如 13.2" value={foot} onChange={(event) => setFoot(event.target.value)} /><small>填寫實際腳長，不需自行加上預留空間。</small></label>
              <label htmlFor="finder-usual">平常穿的商品標示尺寸（選填）<select id="finder-usual" value={usual} onChange={(event) => setUsual(event.target.value)}><option value="">不確定／還沒買過</option>{products.find((p) => p.series === 'baby').sizes.map((size) => <option key={size} value={size}>{size}</option>)}</select><small>不同品牌尺碼不同，這項資訊僅用來提供核對起點。</small></label>
            </div>
            <p className="finder-note">還沒量好也沒關係，可以先看款式。尺寸需對照各款實際鞋內長與楦頭，不能只用年齡或平常尺碼判斷。</p>
            <div className="finder-actions"><button type="button" className="pill-btn secondary" onClick={() => go(1)}>上一步</button><button className="pill-btn" type="submit">打開我的選鞋提案 ♡</button></div>
          </form> : <>
            <p className="finder-story">你選擇了「{selected[0][2]}」與「{selected[1][2]}」。{recommendations.length > 1 ? '兩種風格都值得探索，先從喜歡的那雙開始吧。' : '依照場合與風格偏好，這一款最值得先看看。'}</p>
            <div className="finder-results">{recommendations.map((p) => {
              const candidate = p.sizes.includes(usual) ? usual : null;
              return <div className="finder-result-row" key={p.id}>
                <article className="finder-result">
                <img src={p.image} alt={p.name} />
                <div><span className="tag">依你的偏好推薦</span><h3>{p.name}</h3><p>{p.subtitle}</p>
                  <div className="finder-size"><strong>{candidate ? `優先核對尺寸：${candidate}（待確認）` : '尺寸建議：待尺寸表確認'}</strong><p>{foot ? `你提供的腳長：${foot} cm。` : '你尚未提供腳長。'}{candidate ? '此尺寸來自你平常穿的標示，尚未驗證是否合腳。' : '目前缺少可將腳長換算為此款尺碼的資料，暫時無法推薦確切尺寸。'}</p><p>商品標示尺寸：{p.sizes.join('、')}。請至商品頁核對鞋內長與楦頭，或提供腳長向賣場客服確認。</p></div>
                  <span
                    className={`finder-mascot finder-mascot-mobile finder-mascot-${p.series}`}
                    role="img"
                    aria-label={p.series === 'baby' ? 'LUMI 公園貓雙手自然垂下擺動並走路，穿著吊帶褲與寶寶鞋' : 'LUMI 宴會貓輕拉粉色裙擺行禮，穿著公主鞋'}
                  />
                  <Link className="pill-btn" to={`/${p.series}/product/${p.id}`}>查看這雙鞋 →</Link>
                </div>
                </article>
                <span
                  className={`finder-mascot finder-mascot-desktop finder-mascot-${p.series}`}
                  role="img"
                  aria-label={p.series === 'baby' ? 'LUMI 公園貓雙手自然垂下擺動並走路，穿著吊帶褲與寶寶鞋' : 'LUMI 宴會貓輕拉粉色裙擺行禮，穿著公主鞋'}
                />
              </div>;
            })}</div>
            <div className="finder-actions"><button className="pill-btn secondary" onClick={() => go(2)}>修改尺寸資訊</button><button className="pill-btn secondary" onClick={reset}>重新探索</button><Link to="/size-guide">查看量腳指南 →</Link></div>
          </>}
        </div>
      </section>
    </>
  );
}
