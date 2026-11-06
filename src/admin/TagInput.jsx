import { useState } from 'react';

// 輸入文字後按 Enter（或逗號）加入標籤；點 ✕ 移除，點 ‹ 往前移
export default function TagInput({ value, onChange, placeholder, label }) {
  const [text, setText] = useState('');

  const add = () => {
    const items = text.split(/[,，、]/).map((s) => s.trim()).filter((s) => s && !value.includes(s));
    if (items.length) onChange([...value, ...new Set(items)]);
    setText('');
  };

  const move = (i, delta) => {
    const next = [...value];
    [next[i], next[i + delta]] = [next[i + delta], next[i]];
    onChange(next);
  };

  return (
    <div className="admin-tags">
      {value.length > 0 && (
        <ul className="admin-chips">
          {value.map((tag, i) => (
            <li key={tag} className="admin-chip">
              {i > 0 && <button type="button" onClick={() => move(i, -1)} aria-label={`將 ${tag} 往前移`}>‹</button>}
              <span>{tag}</span>
              <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`移除 ${tag}`}>✕</button>
            </li>
          ))}
        </ul>
      )}
      <div className="admin-tag-input">
        <input
          value={text}
          aria-label={label}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              add();
            } else if (e.key === 'Backspace' && !text && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={add}
        />
        <button type="button" className="admin-btn" onClick={add} disabled={!text.trim()}>加入</button>
      </div>
    </div>
  );
}
