export type { FlashCard, QuizMode, QuizQuestion, EvalResult, QuizResult, SessionSummary, Recommendation } from '../../../shared/types';

export interface UICardState {
  isFlipped: boolean;
  isKnown: boolean | null; // null = not yet marked
}

