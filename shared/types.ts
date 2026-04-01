export interface FlashCard {
  id: string;
  keyword: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type QuizMode = 'multiple-choice' | 'short-answer';

export interface QuizQuestion {
  id: string;
  cardId: string;
  question: string;
  type: QuizMode;
  options?: string[];       // only for multiple-choice
  correctAnswer: string;
}

export interface EvalResult {
  correct: boolean;
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  cardId: string;
  userAnswer: string;
  correct: boolean;
  explanation: string;
}

export interface SessionSummary {
  topic: string;
  totalCards: number;
  knownIds: string[];
  unknownIds: string[];
  quizResults: QuizResult[];
}

export interface Recommendation {
  tips: string[];
  nextTopics: string[];
  weakAreas: string[];
}

