import axios from 'axios';

const ENDPOINT = process.env.EPAM_AI_ENDPOINT as string;
const API_KEY = process.env.EPAM_AI_KEY as string;

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chat(messages: ChatMessage[], temperature = 0): Promise<string> {
  if (!ENDPOINT || !API_KEY) {
    throw new Error('EPAM AI endpoint or API key is not configured. Check your .env file.');
  }

  const response = await axios.post(
    ENDPOINT,
    { temperature, messages },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
    }
  );

  const content = response.data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from AI service');
  return content;
}

export function parseJsonFromResponse<T>(raw: string): T {
  // Strip markdown code fences if present
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`Failed to parse AI response as JSON: ${cleaned.slice(0, 200)}`);
  }
}

