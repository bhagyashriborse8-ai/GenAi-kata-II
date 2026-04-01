import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useFlashCards } from '../hooks/useFlashCards';
import { useCardTracking } from '../hooks/useCardTracking';
import FlashCardDeck from '../components/flashcard/FlashCardDeck';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';

export default function FlashCardPage() {
  const { topic, cards } = useSession();
  const navigate = useNavigate();

  const { index, isFlipped, flip, next, prev } = useFlashCards(cards.length);
  const { knownIds, unknownIds, markKnown, markUnknown, masteryPercent } = useCardTracking();

  if (!cards.length) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-white text-sm transition">← Back</button>
            <h1 className="text-2xl font-bold text-white mt-1">{topic}</h1>
          </div>
          <div className="text-right">
            <p className="text-indigo-400 font-bold text-lg">{masteryPercent}%</p>
            <p className="text-gray-500 text-xs">Mastered</p>
          </div>
        </div>

        <ProgressBar value={knownIds.size} max={cards.length} label="Mastery Progress" color="bg-indigo-500" />

        {/* Deck */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <FlashCardDeck
            cards={cards}
            index={index}
            isFlipped={isFlipped}
            knownIds={knownIds}
            unknownIds={unknownIds}
            onFlip={flip}
            onNext={next}
            onPrev={prev}
            onKnown={markKnown}
            onUnknown={markUnknown}
          />
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
            ← New Topic
          </Button>
          <Button onClick={() => navigate('/quiz')} className="flex-1">
            🎯 Take Quiz →
          </Button>
        </div>
      </div>
    </div>
  );
}

