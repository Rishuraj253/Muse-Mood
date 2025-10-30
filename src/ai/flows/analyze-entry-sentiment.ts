'use server';

/**
 * @fileOverview A sentiment analysis AI agent for journal entries.
 *
 * - analyzeEntrySentiment - A function that handles the sentiment analysis process.
 * - AnalyzeEntrySentimentInput - The input type for the analyzeEntrySentiment function.
 * - AnalyzeEntrySentimentOutput - The return type for the analyzeEntrySentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEntrySentimentInputSchema = z.object({
  entryText: z
    .string()
    .describe('The text content of the journal entry to analyze.'),
});
export type AnalyzeEntrySentimentInput = z.infer<typeof AnalyzeEntrySentimentInputSchema>;

const AnalyzeEntrySentimentOutputSchema = z.object({
  sentiment: z.string().describe('The overall sentiment of the journal entry.'),
  positivityScore: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A score between 0 and 1 indicating the positivity of the journal entry. 0 is negative, 0.5 is neutral, and 1 is positive.'
    ),
});
export type AnalyzeEntrySentimentOutput = z.infer<typeof AnalyzeEntrySentimentOutputSchema>;

export async function analyzeEntrySentiment(
  input: AnalyzeEntrySentimentInput
): Promise<AnalyzeEntrySentimentOutput> {
  return analyzeEntrySentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEntrySentimentPrompt',
  input: {schema: AnalyzeEntrySentimentInputSchema},
  output: {schema: AnalyzeEntrySentimentOutputSchema},
  prompt: `Analyze the sentiment of the following journal entry and provide a positivity score between 0 and 1.

Journal Entry:
{{entryText}}

Respond in a JSON format.
Sentiment:
Positivity Score: `,
});

const analyzeEntrySentimentFlow = ai.defineFlow(
  {
    name: 'analyzeEntrySentimentFlow',
    inputSchema: AnalyzeEntrySentimentInputSchema,
    outputSchema: AnalyzeEntrySentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
