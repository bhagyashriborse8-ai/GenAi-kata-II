import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useProgress } from '../hooks/useProgress';
import { getRecommendations } from '../services/quizService';
import SummaryCard from '../components/progress/SummaryCard';
import Button from '../components/ui/Button';

export default function ResultsPage() {
  const { topic, cards, unknownIds, quizResults, recommendation, setRecommendation, resetSession } = useSession();
  const { known, total, quizScore, quizTotal } = useProgress();
  const navigate = useNavigate();
  const [loadingRec, setLoadingRec] = useState(false);

  useEffect(() => {
    if (!topic || recommendation) return;
    const unknownCards = cards.filter((c) => unknownIds.has(c.id));
    setLoadingRec(true);
    getRecommendations(topic, unknownCards, quizScore, quizTotal)
      .then(setRecommendation)
      .catch(() => {/* silently fail */})
      .finally(() => setLoadingRec(false));
  }, []);  // eslint-disable-line

  if (!topic) { navigate('/'); return null; }

  const handleRetry = () => {
    // Keep cards, reset quiz results
    navigate('/quiz');
  };

  const handleNewTopic = () => {
    resetSession();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-5xl">🏆</div>
          <h1 className="text-3xl font-bold text-white">Session Complete!</h1>
          <p className="text-gray-400">Here's how you did on <span className="text-indigo-400 font-semibold">{topic}</span></p>
        </div>

        <SummaryCard
          topic={topic}
          known={known}
          total={total}
          quizScore={quizScore}
          quizTotal={quizTotal}
          recommendation={recommendation}
          loadingRec={loadingRec}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => navigate('/flashcards')} className="flex-1">
            📇 Review Flashcards
          </Button>
          <Button variant="ghost" onClick={handleRetry} className="flex-1">
            🔁 Retry Quiz
          </Button>
          <Button onClick={handleNewTopic} className="flex-1">
            🎮 New Topic
          </Button>
        </div>
      </div>
    </div>
  );
}

