import { Request, Response, NextFunction } from 'express';
import { chat, parseJsonFromResponse } from '../services/openaiService';
import { buildQuizPrompt, buildEvalPrompt } from '../services/quizPrompts';
import { FlashCard, QuizMode, QuizQuestion, EvalResult } from '../../../shared/types';

export async function generateQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const { topic, cards, mode } = req.body as { topic: string; cards: FlashCard[]; mode: QuizMode };
    if (!topic || !cards?.length || !mode) {
      return res.status(400).json({ error: 'topic, cards, and mode are required' });
    }

    const messages = buildQuizPrompt(topic, cards, mode);
    const raw = await chat(messages);
    const questions = parseJsonFromResponse<QuizQuestion[]>(raw);
    const withIds = questions.map((q, i) => ({ ...q, id: q.id || `q-${i + 1}` }));
    return res.json(withIds);
  } catch (err) {
    next(err);
  }
}

export async function evaluateAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const { question, correctAnswer, userAnswer } = req.body as {
      question: string;
      correctAnswer: string;
      userAnswer: string;
    };
    if (!question || !correctAnswer || userAnswer === undefined) {
      return res.status(400).json({ error: 'question, correctAnswer, and userAnswer are required' });
    }

    const messages = buildEvalPrompt(question, correctAnswer, userAnswer);
    const raw = await chat(messages);
    const result = parseJsonFromResponse<EvalResult>(raw);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

