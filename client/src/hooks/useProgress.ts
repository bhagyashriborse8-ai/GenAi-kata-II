import { useSession } from '../context/SessionContext';

export function useProgress() {
  const { cards, knownIds, unknownIds, quizResults } = useSession();
  const total = cards.length;
  const known = knownIds.size;
  const unknown = unknownIds.size;
  const untouched = total - known - unknown;
  const masteryPercent = total ? Math.round((known / total) * 100) : 0;

  const quizScore = quizResults.filter((r) => r.correct).length;
  const quizTotal = quizResults.length;

  return { total, known, unknown, untouched, masteryPercent, quizScore, quizTotal };
}

