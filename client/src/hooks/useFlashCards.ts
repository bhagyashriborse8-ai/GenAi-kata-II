import { useState } from 'react';

export function useFlashCards(total: number) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => setIsFlipped((f) => !f);

  const next = () => {
    setIsFlipped(false);
    setTimeout(() => setIndex((i) => Math.min(i + 1, total - 1)), 150);
  };

  const prev = () => {
    setIsFlipped(false);
    setTimeout(() => setIndex((i) => Math.max(i - 1, 0)), 150);
  };

  const goTo = (i: number) => { setIsFlipped(false); setIndex(i); };

  return { index, isFlipped, flip, next, prev, goTo };
}

