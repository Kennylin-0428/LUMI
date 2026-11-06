import { shuffle } from './memoryGame.js';

export function isSolved(tiles) {
  return tiles.every((tile, index) => tile === index);
}

export function createPuzzle(size, random = Math.random) {
  const tiles = shuffle(Array.from({ length: size * size }, (_, index) => index), random);
  // A round must start unsolved, even if the shuffle returns the original order.
  if (isSolved(tiles)) [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  return tiles;
}

export function swapTiles(tiles, first, second) {
  const next = [...tiles];
  [next[first], next[second]] = [next[second], next[first]];
  return next;
}
