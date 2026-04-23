'use client';
import { useEffect, useState } from 'react';
import { greetingFor, proverbOfTheDay, PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

export function GreetingStrip({ name, nationId }: { name: string; nationId: string }) {
  const [state, setState] = useState<{
    greeting: string;
    proverb: (typeof PACIFIC_PROVERBS)[number];
    date: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const greeting = greetingFor(nationId, now.getHours());
    const proverb = proverbOfTheDay(now.getTime());
    const date = now.toLocaleDateString('en-NZ', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    setState({ greeting, proverb, date });
  }, [nationId]);

  if (!state) {
    return (
      <div className="mb-6 h-20 rounded-lg skeleton" aria-busy />
    );
  }

  return (
    <div
      className="mb-6 rounded-xl border px-6 py-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            {state.date}
          </div>
          <div className="mt-1 font-display text-2xl">
            {state.greeting}, {name.split(' ')[0]}.
          </div>
        </div>
        <blockquote className="md:max-w-sm md:text-right">
          <p className="font-editorial italic" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            "{state.proverb.text}"
          </p>
          <footer className="mt-1 text-xs" style={{ color: 'var(--ink-soft)' }}>
            {state.proverb.language} proverb · {state.proverb.meaning}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
