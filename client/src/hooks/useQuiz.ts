import { useState } from 'react';
import { QuizQuestion, QuizResult } from '../types';

export function useQuiz(questions: QuizQuestion[]) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastResult, setLastResult] = useState<{ correct: boolean; explanation: string } | null>(null);

  const current = questions[index];
  const isFinished = index >= questions.length;
  const score = results.filter((r) => r.correct).length;

  const submitResult = (result: QuizResult & { explanation: string; correct: boolean }) => {
    setResults((prev) => [...prev, result]);
    setLastResult({ correct: result.correct, explanation: result.explanation });
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    setIsAnswered(false);
    setLastResult(null);
    setIndex((i) => i + 1);
  };

  return { current, index, isFinished, score, results, isAnswered, lastResult, submitResult, nextQuestion };
}

