import { ChatMessage } from './openaiService';

export function buildFlashCardPrompt(topic: string, count: number): ChatMessage[] {
  return [
    {
      role: 'system',
      content:
        'You are an expert technical educator. Generate concise, accurate flashcards for developers. Always respond with valid JSON only — no markdown, no extra text.',
    },
    {
      role: 'user',
      content: `Generate exactly ${count} flashcards for the topic: "${topic}".

Return a JSON array with this exact shape:
[
  {
    "id": "unique-string",
    "keyword": "short term or concept (2-5 words max)",
    "answer": "clear, concise explanation (2-4 sentences)",
    "difficulty": "easy" | "medium" | "hard"
  }
]

Cover a range of difficulties. Make keywords specific and answers educational.`,
    },
  ];
}

