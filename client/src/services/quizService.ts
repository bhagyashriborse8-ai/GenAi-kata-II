import api from './api';
import { FlashCard, QuizMode, QuizQuestion, EvalResult, Recommendation } from '../types';

export async function generateQuiz(topic: string, cards: FlashCard[], mode: QuizMode): Promise<QuizQuestion[]> {
  const res = await api.post<QuizQuestion[]>('/quiz/generate', { topic, cards, mode });
  return res.data;
}

export async function evaluateAnswer(
  question: string, correctAnswer: string, userAnswer: string
): Promise<EvalResult> {
  const res = await api.post<EvalResult>('/quiz/evaluate', { question, correctAnswer, userAnswer });
  return res.data;
}

export async function getRecommendations(
  topic: string, unknownCards: FlashCard[], quizScore: number, totalQuestions: number
): Promise<Recommendation> {
  const res = await api.post<Recommendation>('/feedback/recommendations', {
    topic, unknownCards, quizScore, totalQuestions,
  });
  return res.data;
}

