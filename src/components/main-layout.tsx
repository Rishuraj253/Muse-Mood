import type { ReactNode } from 'react';
import { Logo } from './logo';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              MuseMood
            </h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Your emotional sanctuary, powered by AI.
          </p>
        </div>
      </header>
      <main className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
