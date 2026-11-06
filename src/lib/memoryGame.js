export const LEVELS = [
  { name: '初次見面', pairs: 4, hint: '先從 4 對圖片開始，認識露米的小日常。' },
  { name: '日常小探險', pairs: 6, hint: '這次有 6 對圖片，慢慢記住每個小場景。' },
  { name: '回憶收藏家', pairs: 8, hint: '最後挑戰 8 對圖片，把可愛的回憶配成一對！' },
];

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createDeck(slides, pairs, random = Math.random) {
  const chosen = shuffle(slides, random).slice(0, pairs);
  return shuffle(chosen.flatMap((slide) => [
    { ...slide, id: `${slide.src}-a` },
    { ...slide, id: `${slide.src}-b` },
  ]), random);
}
