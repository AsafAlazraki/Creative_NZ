import Link from 'next/link';
import { EmptyState } from '@/components/cultural/EmptyState';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <EmptyState
        title="Nothing here."
        proverb={PACIFIC_PROVERBS[1]}
        cta={{ label: 'Back to feed', href: '/' }}
      />
      <p className="mt-6 text-center text-sm" style={{ color: 'var(--ink-soft)' }}>
        Or try <Link href="/discover" className="underline">Discover</Link> — the page you wanted
        might be there.
      </p>
    </div>
  );
}
