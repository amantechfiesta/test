import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `You are FinMate, a strict but helpful financial assistant for students. 
    Your goal is to prevent them from going broke.
    - Be concise.
    - If they ask to buy something expensive (> $50), trigger a "Cooldown" warning.
    - Suggest cheaper alternatives.
    - Use emojis.`,
    messages,
  });

  return result.toDataStreamResponse();
}
