import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { generateFlashCards } from '../services/flashcardService';
import TopicSelector from '../components/topic/TopicSelector';

export default function HomePage() {
  const { setTopic, setCards, resetSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async (topic: string, count: number) => {
    setError('');
    setLoading(true);
    resetSession();
    try {
      const cards = await generateFlashCards(topic, count);
      setTopic(topic);
      setCards(cards);
      navigate('/flashcards');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate flashcards.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-10 space-y-3">
        <div className="text-6xl">🎮</div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Gamify Learn
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Select a topic, study AI-generated flashcards, and test yourself in quiz mode.
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Choose Your Topic</h2>
        <TopicSelector onSelect={handleGenerate} loading={loading} />
        {error && (
          <div className="mt-4 bg-rose-900/30 border border-rose-500/40 text-rose-300 text-sm rounded-xl px-4 py-3">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl w-full text-center text-sm text-gray-500">
        {[['📇', 'Study Flashcards', 'Flip & learn key concepts'], ['✅', 'Track Progress', 'Mark known vs learning'], ['🎯', 'Take a Quiz', 'Test yourself & get feedback']].map(([icon, title, desc]) => (
          <div key={title} className="bg-white/3 border border-white/5 rounded-xl p-4">
            <div className="text-2xl mb-1">{icon}</div>
            <p className="text-white font-semibold">{title}</p>
            <p className="text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
