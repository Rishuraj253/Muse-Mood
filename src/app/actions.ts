'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { analyzeEntrySentiment } from '@/ai/flows/analyze-entry-sentiment';
import { generateMoodBasedInspiration } from '@/ai/flows/generate-mood-based-inspiration';
import { addEntry, setLatestQuote } from '@/lib/data';

const FormSchema = z.object({
  content: z.string().min(10, {
    message: 'Your journal entry must be at least 10 characters long.',
  }),
});

export type State = {
  errors?: {
    content?: string[];
  };
  message?: string | null;
};

export async function createJournalEntry(
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create entry. Please check your input.',
    };
  }

  const { content } = validatedFields.data;

  try {
    const sentimentAnalysis = await analyzeEntrySentiment({ entryText: content });

    await addEntry({
      content,
      sentiment: sentimentAnalysis.sentiment,
      positivityScore: sentimentAnalysis.positivityScore,
    });

    const mood = sentimentAnalysis.positivityScore > 0.6 ? 'positive' : sentimentAnalysis.positivityScore < 0.4 ? 'negative' : 'neutral';
    const inspiration = await generateMoodBasedInspiration({ mood });

    await setLatestQuote({ quote: inspiration.quote });

  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while processing your entry. Please try again.',
    };
  }

  revalidatePath('/');
  return {
    message: 'Your entry has been saved!',
  };
}
