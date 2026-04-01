import api from './api';
import { FlashCard } from '../types';

export async function generateFlashCards(topic: string, count = 10): Promise<FlashCard[]> {
  const res = await api.post<FlashCard[]>('/flashcards/generate', { topic, count });
  return res.data;
}

