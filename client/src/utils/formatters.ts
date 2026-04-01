export const pct = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 100);

export const scoreLabel = (correct: number, total: number) =>
  `${correct} / ${total} (${pct(correct, total)}%)`;

