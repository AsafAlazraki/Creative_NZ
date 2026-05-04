import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getCollections, getWorksByIds } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { EmptyState } from '@/components/cultural/EmptyState';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

export const metadata = { title: 'Collections · KavaWorks' };

export default async function CollectionsPage() {
  const user = await getCurrentUser();
  const collections = getCollections(user.id);

  if (collections.length === 0) {
    return (
      <div className="px-4 py-6 lg:px-10">
        <header className="mb-8">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Collections
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold">Your kete.</h1>
        </header>
        <EmptyState
          title="A kete is woven one strand at a time."
          proverb={PACIFIC_PROVERBS[4]}
          cta={{ label: 'Browse marketplace', href: '/market' }}
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Collections
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Your kete — {collections.length} collection{collections.length === 1 ? '' : 's'}.</h1>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {collections.map((c) => {
          const works = getWorksByIds(c.workIds);
          return (
            <Link
              key={c.id}
              href={`/collections/${c.id}`}
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="grid aspect-[2/1] grid-cols-2 gap-[1px]" style={{ background: 'var(--hairline)' }}>
                {works.slice(0, 4).map((w, idx) => (
                  <CulturalPattern
                    key={w.id}
                    id={'pattern-tapa'}
                    opacity={0.2}
                    tone="brand"
                    size={40}
                    className={works.length < 4 && idx === 0 ? 'col-span-2 row-span-2' : ''}
                  />
                ))}
              </div>
              <div className="p-4">
                <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {c.description}
                </p>
                <div className="mt-2 text-xs font-mono" style={{ color: 'var(--ink-soft)' }}>
                  {works.length} work{works.length === 1 ? '' : 's'}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
