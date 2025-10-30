import { JournalEntryForm } from '@/components/journal-entry-form';
import { InspirationQuote } from '@/components/inspiration-quote';
import { PastEntries } from '@/components/past-entries';
import { TrendsChart } from '@/components/trends-chart';
import { getEntries, getLatestQuote } from '@/lib/data';
import { MainLayout } from '@/components/main-layout';

export default async function Home() {
  const entries = await getEntries();
  const latestQuote = await getLatestQuote();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <JournalEntryForm />
          <InspirationQuote quote={latestQuote} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <TrendsChart entries={entries} />
          <PastEntries entries={entries} />
        </div>
      </div>
    </MainLayout>
  );
}
