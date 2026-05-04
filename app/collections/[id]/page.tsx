import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getCollectionById, getWorksByIds } from '@/lib/repo';
import { WorkCard } from '@/components/market/WorkCard';
import { EmptyState } from '@/components/cultural/EmptyState';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const collection = getCollectionById(id);

  if (!collection || collection.userId !== user.id) notFound();

  const works = getWorksByIds(collection.workIds);

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/collections" className="hover:underline">
          Collections
        </Link>
        <span className="mx-2">/</span>
        <span>{collection.title}</span>
      </nav>

      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Collection · {works.length} work{works.length === 1 ? '' : 's'}
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">{collection.title}</h1>
        {collection.description && (
          <p className="mt-2 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 17, lineHeight: 1.5 }}>
            {collection.description}
          </p>
        )}
      </header>

      {works.length === 0 ? (
        <EmptyState
          title="This kete is empty."
          proverb={PACIFIC_PROVERBS[4]}
          cta={{ label: 'Browse marketplace', href: '/market' }}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      )}
    </div>
  );
}
