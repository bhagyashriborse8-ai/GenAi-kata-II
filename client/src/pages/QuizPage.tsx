import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { generateQuiz, evaluateAnswer } from '../services/quizService';
import { useQuiz } from '../hooks/useQuiz';
import { QuizMode, QuizResult } from '../types';
import { shuffle } from '../utils/shuffle';
import QuizCard from '../components/quiz/QuizCard';
import SessionProgress from '../components/progress/SessionProgress';
import Button from '../components/ui/Button';

export default function QuizPage() {
  const { topic, cards, quizQuestions, setQuizQuestions, addQuizResult } = useSession();
  const navigate = useNavigate();

  const [mode, setMode] = useState<QuizMode | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState('');

  const { current, index, isFinished, score, isAnswered, lastResult, submitResult, nextQuestion } = useQuiz(quizQuestions);

  if (!cards.length) { navigate('/'); return null; }

  // ── Mode selection ──
  if (!mode) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="text-5xl">🎯</div>
          <h1 className="text-3xl font-bold text-white">Quiz Mode</h1>
          <p className="text-gray-400">How would you like to be tested on <span className="text-indigo-400 font-semibold">{topic}</span>?</p>
          <div className="grid grid-cols-2 gap-4">
            {(['multiple-choice', 'short-answer'] as QuizMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-6 text-center transition-all group"
              >
                <div className="text-3xl mb-2">{m === 'multiple-choice' ? '🔘' : '✍️'}</div>
                <p className="text-white font-semibold capitalize">{m.replace('-', ' ')}</p>
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => navigate('/flashcards')}>← Back to Flashcards</Button>
        </div>
      </div>
    );
  }

  // ── Generate questions ──
  if (!quizQuestions.length && !loadingQuiz) {
    const startQuiz = async () => {
      setError('');
      setLoadingQuiz(true);
      try {
        const shuffled = shuffle(cards).slice(0, Math.min(cards.length, 10));
        const questions = await generateQuiz(topic, shuffled, mode);
        setQuizQuestions(questions);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to generate quiz.');
      } finally {
        setLoadingQuiz(false);
      }
    };
    startQuiz();
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Generating your quiz…</p>
        </div>
      </div>
    );
  }

  if (loadingQuiz) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">Generating your quiz…</p>
        </div>
      </div>
    );
  }

  // ── Finished ──
  if (isFinished) {
    navigate('/results');
    return null;
  }

  const handleAnswer = async (answer: string) => {
    if (!current) return;

    // For multiple-choice: evaluate locally
    if (current.type === 'multiple-choice') {
      const correct = answer === current.correctAnswer;
      const result: QuizResult & { correct: boolean; explanation: string } = {
        questionId: current.id,
        cardId: current.cardId,
        userAnswer: answer,
        correct,
        explanation: correct
          ? `Correct! "${current.correctAnswer}" is the right answer.`
          : `Incorrect. The correct answer is: "${current.correctAnswer}".`,
      };
      submitResult(result);
      addQuizResult(result);
      return;
    }

    // For short-answer: call AI evaluation
    setEvaluating(true);
    try {
      const eval_ = await evaluateAnswer(current.question, current.correctAnswer, answer);
      const result: QuizResult & { correct: boolean; explanation: string } = {
        questionId: current.id,
        cardId: current.cardId,
        userAnswer: answer,
        correct: eval_.correct,
        explanation: eval_.explanation,
      };
      submitResult(result);
      addQuizResult(result);
    } catch {
      const result: QuizResult & { correct: boolean; explanation: string } = {
        questionId: current.id,
        cardId: current.cardId,
        userAnswer: answer,
        correct: false,
        explanation: 'Could not evaluate answer. Please check your connection.',
      };
      submitResult(result);
      addQuizResult(result);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        <button onClick={() => navigate('/flashcards')} className="text-gray-500 hover:text-white text-sm transition">← Back to Flashcards</button>

        <SessionProgress
          topic={topic}
          current={index + 1}
          total={quizQuestions.length}
          score={score}
        />

        {error && (
          <div className="bg-rose-900/30 border border-rose-500/40 text-rose-300 text-sm rounded-xl px-4 py-3">⚠️ {error}</div>
        )}

        {current && (
          <QuizCard
            key={index}
            question={current}
            isAnswered={isAnswered}
            evaluating={evaluating}
            feedback={lastResult}
            onAnswer={handleAnswer}
            onNext={nextQuestion}
            isLast={index === quizQuestions.length - 1}
          />
        )}
      </div>
    </div>
  );
}

