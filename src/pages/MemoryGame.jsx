import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import { storySlides } from '../storySlides.js';
import { createDeck, LEVELS } from '../lib/memoryGame.js';

export default function MemoryGame() {
  const [level, setLevel] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState({});
  const heading = useRef(null);

  const start = (next) => {
    setLevel(next);
    setRound((value) => value + 1);
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: 'start' });
  };

  const complete = (moves) => {
    setUnlocked((value) => Math.max(value, Math.min(level + 1, LEVELS.length - 1)));
    setResults((value) => ({ ...value, [level]: Math.min(value[level] ?? Infinity, moves) }));
  };

  return (
    <>
      <Breadcrumbs items={['LUMI 翻翻樂']} />
      <section className="wrap memory-page">
        <header className="memory-intro">
          <span className="eyebrow">LITTLE MOMENTS, LITTLE MATCHES</span>
          <h1 ref={heading} tabIndex={-1}>LUMI 翻翻樂</h1>
          <p>翻開一張小日常，再找出和它一樣的回憶。</p>
          <span className="memory-instructions">每次翻開兩張卡片，找出相同圖片。配對成功就能留下它們，集滿即可前往下一關。</span>
        </header>
        <nav className="memory-levels" aria-label="遊戲關卡">
          {LEVELS.map((item, index) => (
            <button type="button" key={item.name} disabled={index > unlocked} aria-current={level === index ? 'step' : undefined} onClick={() => start(index)}>
              <span className="memory-level-number">0{index + 1}</span>
              <span>{item.name}<small>{item.pairs} 對圖片 · {index > unlocked ? '待解鎖' : results[index] ? '已完成 ♡' : '開始挑戰'}</small></span>
            </button>
          ))}
        </nav>
        <MemoryRound key={`${level}-${round}`} level={level} onComplete={complete} onRestart={() => start(level)} onNext={() => start(level + 1)} onReplay={() => start(0)} />
        <p className="memory-footer">沒有時間限制，也不用急著答對！陪露米慢慢玩就好～<Link to="/picture-puzzle">試試LUMI 日常拼圖 →</Link><Link to="/story">認識露米的日常 →</Link></p>
      </section>
    </>
  );
}

function MemoryRound({ level, onComplete, onRestart, onNext, onReplay }) {
  const config = LEVELS[level];
  const [deck] = useState(() => createDeck(storySlides, config.pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('選一張卡片，開始這一關吧。');
  const busy = useRef(false);
  const pending = useRef(null);
  const resultHeading = useRef(null);
  const won = matched.length === config.pairs;

  useEffect(() => () => clearTimeout(pending.current), []);
  useEffect(() => {
    if (won) resultHeading.current?.focus({ preventScroll: true });
  }, [won]);

  const flip = (card) => {
    if (busy.current || flipped.includes(card.id) || matched.includes(card.src)) return;
    if (flipped.length === 0) {
      setFlipped([card.id]);
      setMessage('再翻一張，找找相同的圖片。');
      return;
    }
    busy.current = true;
    const first = deck.find((item) => item.id === flipped[0]);
    setFlipped([first.id, card.id]);
    const nextMoves = moves + 1;
    setMoves(nextMoves);
    if (first.src === card.src) {
      const nextMatched = [...matched, card.src];
      setMatched(nextMatched);
      setFlipped([]);
      busy.current = false;
      setMessage(`配對成功！已找到 ${nextMatched.length} 對圖片。`);
      if (nextMatched.length === config.pairs) onComplete(nextMoves);
    } else {
      setMessage('這兩張不一樣，記住它們，等一下再試試。');
      pending.current = setTimeout(() => {
        setFlipped([]);
        busy.current = false;
        setMessage('再試一次，下一對也許就在旁邊。');
      }, 1100);
    }
  };

  return (
    <div className="memory-play-area">
      <div className="memory-toolbar">
        <div><span className="eyebrow">LEVEL 0{level + 1}</span><h2>{config.name}</h2><p>{config.hint}</p></div>
        <div className="memory-stats"><span><strong>{moves}</strong>翻牌次數</span><span><strong>{matched.length} / {config.pairs}</strong>已配對</span></div>
      </div>
      <div className="memory-progress" role="progressbar" aria-label="配對進度" aria-valuenow={matched.length} aria-valuemin={0} aria-valuemax={config.pairs}><span style={{ width: `${matched.length / config.pairs * 100}%` }} /></div>
      <div className="memory-feedback"><p role="status">{message}</p><button type="button" className="memory-reset" onClick={onRestart}>重新開始 ↻</button></div>
      <div className="memory-grid" aria-label={`第 ${level + 1} 關，${config.pairs * 2} 張卡片`}>
        {deck.map((card, index) => {
          const paired = matched.includes(card.src);
          const revealed = paired || flipped.includes(card.id);
          return (
            <button type="button" key={card.id} className={`memory-card${revealed ? ' is-revealed' : ''}${paired ? ' is-matched' : ''}`} onClick={() => flip(card)} aria-label={`卡片 ${index + 1}：${revealed ? `${card.alt}${paired ? '，已配對' : ''}` : '尚未翻開'}`} aria-disabled={paired || flipped.includes(card.id) || flipped.length === 2}>
              <span className="memory-card-inner">
                <span className="memory-card-back" aria-hidden="true"><span>✧</span><b>LUMI</b><small>翻開小美好</small><span>♡</span></span>
                <span className="memory-card-front" aria-hidden="true"><img src={card.src} alt="" draggable="false" width="300" height="300" />{paired && <span className="memory-match-check">✓</span>}</span>
              </span>
            </button>
          );
        })}
      </div>
      {won && (
        <section className="memory-result" aria-labelledby="memory-result-title">
          <span className="memory-result-icon" aria-hidden="true">✧ ♡ ✧</span>
          <h2 id="memory-result-title" ref={resultHeading} tabIndex={-1}>{level === LEVELS.length - 1 ? '三關完成！你是回憶收藏家' : '好棒！這一關的小美好都找齊了'}</h2>
          <p>這一關用了 {moves} 次翻牌，找到了 {config.pairs} 對回憶。</p>
          <div className="memory-result-actions"><button type="button" className="pill-btn" onClick={level === LEVELS.length - 1 ? onReplay : onNext}>{level === LEVELS.length - 1 ? '從第一關再玩一次' : '挑戰下一關 →'}</button><button type="button" className="pill-btn secondary" onClick={onRestart}>再玩本關</button></div>
        </section>
      )}
    </div>
  );
}
