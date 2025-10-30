import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Quote as QuoteIcon } from 'lucide-react';
import type { Quote } from '@/lib/types';

export function InspirationQuote({ quote }: { quote: Quote }) {
  if (!quote?.quote) {
    return null;
  }
  
  return (
    <Card className="animate-fade-in shadow-lg" style={{ animationDelay: '200ms' }}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <QuoteIcon className="size-6 text-accent" />
        <CardTitle className="font-headline text-lg">A Thought for You</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
          {quote.quote}
        </blockquote>
      </CardContent>
    </Card>
  );
}
