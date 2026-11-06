import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { products } from '../data.js';
import { storySlides } from '../storySlides.js';
import { createPuzzle, isSolved, swapTiles } from '../lib/picturePuzzle.js';

const SCENES = storySlides.flatMap((slide) => {
  const product = products.find((item) => item.id === slide.productId);
  return product ? [{ ...slide, product }] : [];
});
const SCENE_NAMES = {
  party: '溫馨派對', park: '公園時光', florist: '花店挑花',
  piano: '鋼琴演奏會', violin: '小提琴演奏會', ballet: '芭蕾謝幕', 'new-year': '過年拜年',
};
function sceneName(scene) {
  return SCENE_NAMES[scene.src.split('lumi-mascot-')[1]?.replace('.png', '')] || scene.alt;
}

export default function PicturePuzzle() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [size, setSize] = useState(3);
  const [round, setRound] = useState(0);
  const scene = SCENES[sceneIndex];

  return (
    <>
      <Breadcrumbs items={['LUMI 日常拼圖']} />
      <section className="wrap puzzle-page">
        <header className="memory-intro">
          <span className="eyebrow">PIECE BY PIECE, A LOVELY DAY</span>
          <h1>LUMI 日常拼圖</h1>
          <p>把散落的小片段，拼成露米的一天。</p>
          <span className="memory-instructions">點選兩塊拼圖交換位置，拼回完整圖片，就能揭曉露米穿的鞋款。沒有時間限制，慢慢拼也很好。</span>
        </header>
        <div className="puzzle-settings">
          <label>今天想拼哪個日常？<select value={sceneIndex} onChange={(event) => setSceneIndex(Number(event.target.value))}>{SCENES.map((item, index) => <option key={item.src} value={index}>{sceneName(item)}</option>)}</select></label>
          <fieldset><legend>選擇難度</legend><div className="puzzle-difficulty">{[3, 4].map((value) => <button type="button" key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value} × {value}<small>{value === 3 ? '輕鬆拼 · 9 塊' : '小挑戰 · 16 塊'}</small></button>)}</div></fieldset>
        </div>
        {scene ? <PuzzleRound key={`${sceneIndex}-${size}-${round}`} scene={scene} size={size} onRestart={() => setRound((value) => value + 1)} onNext={() => { setSceneIndex((value) => (value + 1) % SCENES.length); setRound((value) => value + 1); }} /> : <p className="empty">新場景準備中，歡迎稍後再來。</p>}
        <p className="memory-footer">插畫是鞋款的搭配情境示意；實際顏色、材質與細節請以商品照片及賣場說明為準。<Link to="/memory-game">也來玩玩 LUMI 翻翻樂 →</Link></p>
      </section>
    </>
  );
}

function PuzzleRound({ scene, size, onRestart, onNext }) {
  const [tiles, setTiles] = useState(() => createPuzzle(size));
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState('選一塊拼圖，再選另一塊交換位置。');
  const resultHeading = useRef(null);
  const solved = isSolved(tiles);
  const correct = tiles.filter((tile, index) => tile === index).length;
  const product = scene.product;

  useEffect(() => {
    if (solved) resultHeading.current?.focus({ preventScroll: true });
  }, [solved]);

  const choose = (position) => {
    if (solved) return;
    if (selected === position) {
      setSelected(null);
      setMessage('已取消選取，挑一塊重新開始。');
    } else if (selected === null) {
      setSelected(position);
      setMessage(`已選取第 ${position + 1} 格，再選另一格交換。`);
    } else {
      const next = swapTiles(tiles, selected, position);
      setTiles(next);
      setMoves((value) => value + 1);
      setSelected(null);
      setMessage(isSolved(next) ? '拼圖完成！一起認識露米穿的鞋款。' : '交換好了！繼續找找下一塊。');
    }
  };

  return (
    <div className="memory-play-area">
      <div className="memory-toolbar"><div><span className="eyebrow">A LITTLE DAILY PUZZLE</span><h2>{sceneName(scene)}</h2><p>{size} × {size} 拼圖 · 點選任意兩塊即可交換</p></div><div className="memory-stats"><span><strong>{moves}</strong>交換次數</span><span><strong>{correct} / {tiles.length}</strong>位置正確</span></div></div>
      <div className="memory-progress" role="progressbar" aria-label="拼圖進度" aria-valuemin={0} aria-valuemax={tiles.length} aria-valuenow={correct}><span style={{ width: `${correct / tiles.length * 100}%` }} /></div>
      <div className="puzzle-actions"><button type="button" className="pill-btn secondary" aria-expanded={preview} aria-controls="puzzle-reference" onClick={() => setPreview((value) => !value)}>{preview ? '收起原圖' : '看看原圖 ♡'}</button><button type="button" className="memory-reset" onClick={onRestart}>重新洗牌 ↻</button></div>
      <p role="status" className="puzzle-status">{message}</p>
      {preview && <figure id="puzzle-reference" className="puzzle-reference"><img src={scene.src} alt={scene.alt} width="300" height="300" /><figcaption>看看小細節，慢慢拼回來。</figcaption></figure>}
      <div className={`puzzle-board${solved ? ' is-complete' : ''}`} style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }} role="group" aria-label={`${sceneName(scene)}，${size} 乘 ${size} 拼圖`}>
        {tiles.map((tile, position) => (
          <button type="button" key={position} className={`puzzle-tile${selected === position ? ' is-selected' : ''}`} onClick={() => choose(position)} aria-pressed={selected === position} aria-disabled={solved} aria-label={`第 ${position + 1} 格，圖片片段 ${tile + 1}${tile === position ? '，位置正確' : ''}`} style={{ backgroundImage: `url("${scene.src}")`, backgroundSize: `${size * 100}% ${size * 100}%`, backgroundPosition: `${tile % size / (size - 1) * 100}% ${Math.floor(tile / size) / (size - 1) * 100}%` }}>
            {!solved && <span aria-hidden="true">{selected === position ? '♡' : tile + 1}</span>}
          </button>
        ))}
      </div>
      {!solved && <p className="puzzle-tip">小提示：片段上的數字是原圖順序，從左到右、由上到下排列。點選同一塊可取消選取。</p>}
      {solved && <section className="puzzle-reveal" aria-labelledby="puzzle-reveal-title"><div className="puzzle-reveal-heading"><span className="eyebrow">THE LITTLE SHOE REVEAL</span><h2 id="puzzle-reveal-title" ref={resultHeading} tabIndex={-1}>拼好了！露米今天穿的是…</h2><p>用 {moves} 次交換，拼回了這段可愛日常。</p></div><div className="puzzle-product"><img src={`/${product.image.replace(/^\//, '')}`} alt={`${product.name}商品照片`} width="300" height="300" /><div><span className={`tag ${product.series === 'princess' ? 'pink' : ''}`}>{product.series === 'princess' ? '公主鞋系列' : '寶寶鞋系列'}</span><h3>{product.name}</h3><p>{product.subtitle}</p><p>顏色：{product.colors.join('／')}</p><Link className="pill-btn" to={`/${product.series}/product/${product.id}`}>認識這雙鞋 →</Link></div></div><div className="memory-result-actions"><button type="button" className="pill-btn secondary" onClick={onNext}>拼下一個日常 →</button><button type="button" className="memory-reset" onClick={onRestart}>再拼一次</button></div></section>}
    </div>
  );
}
