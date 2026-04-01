import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FlashCard, QuizQuestion, QuizResult, Recommendation } from '../types';

interface SessionState {
  topic: string;
  cards: FlashCard[];
  knownIds: Set<string>;
  unknownIds: Set<string>;
  quizQuestions: QuizQuestion[];
  quizResults: QuizResult[];
  recommendation: Recommendation | null;

  setTopic: (t: string) => void;
  setCards: (c: FlashCard[]) => void;
  markKnown: (id: string) => void;
  markUnknown: (id: string) => void;
  setQuizQuestions: (q: QuizQuestion[]) => void;
  addQuizResult: (r: QuizResult) => void;
  setRecommendation: (r: Recommendation) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionState | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState('');
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());
  const [unknownIds, setUnknownIds] = useState<Set<string>>(new Set());
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const markKnown = (id: string) => {
    setKnownIds((prev) => new Set([...prev, id]));
    setUnknownIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  const markUnknown = (id: string) => {
    setUnknownIds((prev) => new Set([...prev, id]));
    setKnownIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  const addQuizResult = (r: QuizResult) => setQuizResults((prev) => [...prev, r]);

  const resetSession = () => {
    setTopic(''); setCards([]); setKnownIds(new Set()); setUnknownIds(new Set());
    setQuizQuestions([]); setQuizResults([]); setRecommendation(null);
  };

  return (
    <SessionContext.Provider
      value={{ topic, cards, knownIds, unknownIds, quizQuestions, quizResults, recommendation,
               setTopic, setCards, markKnown, markUnknown, setQuizQuestions, addQuizResult,
               setRecommendation, resetSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}

