import 'server-only';
import type { JournalEntry, Quote } from './types';

// In-memory store
const entries: JournalEntry[] = [
  {
    id: '3',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    content: 'Feeling a bit uncertain about the future, but trying to stay hopeful. There are so many paths to choose from, and it\'s both exciting and daunting. I\'m reminding myself to take it one day at a time.',
    sentiment: 'Neutral',
    positivityScore: 0.55,
  },
  {
    id: '2',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    content: 'It was a really tough day. Nothing seemed to go right, and I felt overwhelmed by everything. It\'s hard to see the bright side right now, and I just feel drained and discouraged.',
    sentiment: 'Negative',
    positivityScore: 0.1,
  },
  {
    id: '1',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    content: 'Today was wonderful! I spent the afternoon in the park, enjoying the sunshine and reading a book. I felt so peaceful and content. It\'s moments like these that make me feel truly grateful for life.',
    sentiment: 'Positive',
    positivityScore: 0.9,
  },
];
let latestQuote: Quote = { quote: 'The journey of a thousand miles begins with a single step.' };

export async function getEntries(): Promise<JournalEntry[]> {
  return [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function addEntry(entry: Omit<JournalEntry, 'id' | 'date'>): Promise<JournalEntry> {
  const newEntry: JournalEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  entries.push(newEntry);
  return newEntry;
}

export async function getLatestQuote(): Promise<Quote> {
  return latestQuote;
}

export async function setLatestQuote(quote: Quote): Promise<void> {
  latestQuote = quote;
}
