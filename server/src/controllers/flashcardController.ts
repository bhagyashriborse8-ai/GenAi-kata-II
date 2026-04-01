import { Request, Response, NextFunction } from 'express';
import { chat, parseJsonFromResponse } from '../services/openaiService';
import { buildFlashCardPrompt } from '../services/flashcardPrompts';
import { FlashCard } from '../../../shared/types';

export async function generateFlashCards(req: Request, res: Response, next: NextFunction) {
  try {
    const { topic, count = 10 } = req.body as { topic: string; count?: number };
    if (!topic) return res.status(400).json({ error: 'topic is required' });

    const safeCount = Math.min(Math.max(Number(count), 5), 20);
    const messages = buildFlashCardPrompt(topic, safeCount);
    const raw = await chat(messages);
    const cards = parseJsonFromResponse<FlashCard[]>(raw);

    // Ensure IDs are present
    const withIds = cards.map((c, i) => ({ ...c, id: c.id || `card-${i + 1}` }));
    return res.json(withIds);
  } catch (err) {
    next(err);
  }
}

