import type { JournalEntry } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Smile, Frown, Meh, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

function MoodIcon({ score }: { score: number }) {
  if (score > 0.65) return <Smile className="text-primary" />;
  if (score < 0.35) return <Frown className="text-destructive" />;
  return <Meh className="text-yellow-500" />;
}

export function PastEntries({ entries }: { entries: JournalEntry[] }) {
  return (
    <Card className="animate-fade-in shadow-lg" style={{ animationDelay: '600ms' }}>
      <CardHeader>
        <CardTitle className="font-headline">Your Past Reflections</CardTitle>
        <CardDescription>Review your emotional journey.</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-12 text-muted-foreground">
            <Sparkles className="size-10 mb-4" />
            <p>You haven't written any entries yet.</p>
            <p className="text-sm">Start by sharing your thoughts above!</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {entries.map((entry) => (
                <AccordionItem value={entry.id} key={entry.id} className="border-b-0 rounded-lg bg-background data-[state=open]:bg-muted/50">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline rounded-lg">
                    <div className="flex items-center gap-4 w-full pr-4 text-left">
                      <div className="flex-shrink-0">
                        <MoodIcon score={entry.positivityScore} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium font-headline">
                          {format(new Date(entry.date), 'MMMM d, yyyy')}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {entry.sentiment}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-4">
                    <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {entry.content}
                    </p>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Positivity Score
                      </label>
                      <Progress
                        value={entry.positivityScore * 100}
                        className="h-2 mt-1"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
