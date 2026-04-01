import type { FlashCard as FlashCardType } from '../../types';
import Badge from '../ui/Badge';

interface Props {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
}

const difficultyColor = (d?: string) => {
  if (d === 'easy') return 'emerald';
  if (d === 'hard') return 'rose';
  return 'amber';
};

export default function FlashCard({ card, isFlipped, onFlip }: Props) {
  return (
    <div className="perspective w-full h-64 cursor-pointer select-none" onClick={onFlip}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>

        {/* Front — keyword */}
        <div className="flip-card-front bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-indigo-500/30 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-4">Keyword</p>
          <h2 className="text-3xl font-bold text-white mb-4">{card.keyword}</h2>
          {card.difficulty && (
            <Badge label={card.difficulty} color={difficultyColor(card.difficulty) as 'emerald' | 'rose' | 'amber'} />
          )}
          <p className="text-gray-500 text-xs mt-6">Click to reveal answer</p>
        </div>

        {/* Back — answer */}
        <div className="flip-card-back bg-gradient-to-br from-emerald-900/80 to-teal-900/80 border border-emerald-500/30 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
          <p className="text-xs text-emerald-400 uppercase tracking-widest mb-4">Answer</p>
          <p className="text-lg text-white leading-relaxed">{card.answer}</p>
          <p className="text-gray-500 text-xs mt-6">Click to flip back</p>
        </div>

      </div>
    </div>
  );
}



