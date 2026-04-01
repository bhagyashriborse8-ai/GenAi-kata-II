import { FlashCard, QuizMode } from '../../../shared/types';
import { ChatMessage } from './openaiService';

export function buildQuizPrompt(topic: string, cards: FlashCard[], mode: QuizMode): ChatMessage[] {
  const cardList = cards.map((c) => `- Keyword: "${c.keyword}" | Answer: "${c.answer}"`).join('\n');

  const modeInstructions =
    mode === 'multiple-choice'
      ? `Each question must be "multiple-choice" with exactly 4 options (one correct, three plausible distractors). Include "options" array and "correctAnswer" must match one of the options exactly.`
      : `Each question must be "short-answer". No options needed. "correctAnswer" is the ideal answer string.`;

  return [
    {
      role: 'system',
      content:
        'You are an expert quiz generator. Generate challenging but fair quiz questions. Always respond with valid JSON only.',
    },
    {
      role: 'user',
      content: `Generate quiz questions for topic: "${topic}" based on these flashcards:
${cardList}

Mode: ${mode}
${modeInstructions}

Return a JSON array:
[
  {
    "id": "unique-string",
    "cardId": "matching card keyword",
    "question": "the question text",
    "type": "${mode}",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "exact correct answer"
  }
]`,
    },
  ];
}

export function buildEvalPrompt(question: string, correctAnswer: string, userAnswer: string): ChatMessage[] {
  return [
    {
      role: 'system',
      content:
        'You are a fair technical examiner. Evaluate if the student answer is correct or partially correct. Always respond with valid JSON only.',
    },
    {
      role: 'user',
      content: `Question: "${question}"
Correct Answer: "${correctAnswer}"
Student Answer: "${userAnswer}"

Evaluate and return JSON:
{
  "correct": true or false,
  "explanation": "Brief explanation of why it is correct/incorrect and what the right answer is (2-3 sentences)"
}`,
    },
  ];
}

