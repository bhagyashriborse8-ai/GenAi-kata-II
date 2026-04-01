import { Request, Response, NextFunction } from 'express';
import { chat, parseJsonFromResponse } from '../services/openaiService';
import { buildFeedbackPrompt } from '../services/feedbackPrompts';
import { FlashCard, Recommendation } from '../../../shared/types';

export async function getRecommendations(req: Request, res: Response, next: NextFunction) {
  try {
    const { topic, unknownCards, quizScore, totalQuestions } = req.body as {
      topic: string;
      unknownCards: FlashCard[];
      quizScore: number;
      totalQuestions: number;
    };
    if (!topic) return res.status(400).json({ error: 'topic is required' });

    const messages = buildFeedbackPrompt(topic, unknownCards || [], quizScore || 0, totalQuestions || 0);
    const raw = await chat(messages);
    const result = parseJsonFromResponse<Recommendation>(raw);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}

