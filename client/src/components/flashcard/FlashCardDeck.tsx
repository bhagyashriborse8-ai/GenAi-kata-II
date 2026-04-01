import { FlashCard as FlashCardType } from '../../types';
import FlashCard from './FlashCard';
import CardControls from './CardControls';
import Button from '../ui/Button';

interface Props {
  cards: FlashCardType[];
  index: number;
  isFlipped: boolean;
  knownIds: Set<string>;
  unknownIds: Set<string>;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onKnown: (id: string) => void;
  onUnknown: (id: string) => void;
}

export default function FlashCardDeck({
  cards, index, isFlipped, knownIds, unknownIds,
  onFlip, onNext, onPrev, onKnown, onUnknown,
}: Props) {
  if (!cards.length) return null;
  const card = cards[index];

  return (
    <div className="space-y-6">
      {/* Counter */}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Card {index + 1} of {cards.length}</span>
        <span className="flex gap-4">
          <span className="text-emerald-400">✓ Known: {knownIds.size}</span>
          <span className="text-rose-400">✗ Learning: {unknownIds.size}</span>
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 flex-wrap">
        {cards.map((c, i) => (
          <div
            key={c.id}
            className={`h-2 flex-1 min-w-[8px] rounded-full transition-all ${
              knownIds.has(c.id) ? 'bg-emerald-500' :
              unknownIds.has(c.id) ? 'bg-rose-500' :
              i === index ? 'bg-indigo-500' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <FlashCard card={card} isFlipped={isFlipped} onFlip={onFlip} />

      <CardControls
        cardId={card.id}
        isKnown={knownIds.has(card.id)}
        isUnknown={unknownIds.has(card.id)}
        onKnown={onKnown}
        onUnknown={onUnknown}
      />

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onPrev} disabled={index === 0}>← Prev</Button>
        <Button variant="ghost" onClick={onNext} disabled={index === cards.length - 1}>Next →</Button>
      </div>
    </div>
  );
}

