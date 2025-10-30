'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { JournalEntry } from '@/lib/types';
import { format } from 'date-fns';

export function TrendsChart({ entries }: { entries: JournalEntry[] }) {
  const chartData = entries
    .map((entry) => ({
      date: format(new Date(entry.date), 'MMM d'),
      positivity: entry.positivityScore,
    }))
    .reverse();

  const chartConfig = {
    positivity: {
      label: 'Positivity',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="animate-fade-in shadow-lg" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle className="font-headline">Your Emotional Journey</CardTitle>
        <CardDescription>
          Positivity score over your recent entries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                domain={[0, 1]}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="positivity"
                fill="var(--color-positivity)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-muted-foreground">Not enough data to display a chart yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
