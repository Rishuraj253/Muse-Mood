export type JournalEntry = {
  id: string;
  date: string;
  content: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral' | string;
  positivityScore: number;
};

export type Quote = {
  quote: string;
};
