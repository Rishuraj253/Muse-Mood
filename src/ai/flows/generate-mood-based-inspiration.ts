// src/ai/flows/generate-mood-based-inspiration.ts
'use server';
/**
 * @fileOverview Generates an inspirational quote tailored to the user's mood.
 *
 * - generateMoodBasedInspiration - A function that generates an inspirational quote based on mood.
 * - GenerateMoodBasedInspirationInput - The input type for the generateMoodBasedInspiration function.
 * - GenerateMoodBasedInspirationOutput - The return type for the generateMoodBasedInspiration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodBasedInspirationInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
});
export type GenerateMoodBasedInspirationInput = z.infer<
  typeof GenerateMoodBasedInspirationInputSchema
>;

const GenerateMoodBasedInspirationOutputSchema = z.object({
  quote: z.string().describe('An inspirational quote tailored to the user.'),
});
export type GenerateMoodBasedInspirationOutput = z.infer<
  typeof GenerateMoodBasedInspirationOutputSchema
>;

export async function generateMoodBasedInspiration(
  input: GenerateMoodBasedInspirationInput
): Promise<GenerateMoodBasedInspirationOutput> {
  return generateMoodBasedInspirationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodBasedInspirationPrompt',
  input: {schema: GenerateMoodBasedInspirationInputSchema},
  output: {schema: GenerateMoodBasedInspirationOutputSchema},
  prompt: `You are an AI assistant designed to provide inspirational quotes tailored to a user's mood.

  Based on the user's current mood: "{{mood}}", provide a single, inspirational quote that resonates with their feelings and encourages them positively.`,
});

const generateMoodBasedInspirationFlow = ai.defineFlow(
  {
    name: 'generateMoodBasedInspirationFlow',
    inputSchema: GenerateMoodBasedInspirationInputSchema,
    outputSchema: GenerateMoodBasedInspirationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
