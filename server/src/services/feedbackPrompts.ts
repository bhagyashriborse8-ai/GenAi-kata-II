import { FlashCard } from '../../../shared/types';
import { ChatMessage } from './openaiService';

export function buildFeedbackPrompt(topic: string, unknownCards: FlashCard[], quizScore: number, totalQuestions: number): ChatMessage[] {
  const weakAreas = unknownCards.map((c) => `- ${c.keyword}: ${c.answer}`).join('\n');

  return [
    {
      role: 'system',
      content:
        'You are a personalized learning coach. Give specific, actionable feedback and a clear learning roadmap. Always respond with valid JSON only.',
    },
    {
      role: 'user',
      content: `A student just studied the topic: "${topic}".
Quiz score: ${quizScore} / ${totalQuestions}

Concepts they struggled with:
${weakAreas || 'None — they knew everything!'}

Provide personalized feedback as JSON:
{
  "weakAreas": ["list of weak concept names"],
  "tips": ["3-5 specific, actionable study tips addressing the weak areas"],
  "nextTopics": ["2-3 related topics to study next to build on this knowledge"]
}`,
    },
  ];
}

