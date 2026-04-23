import { getWorks, getNations } from '@/lib/repo';
import { WorkCard } from '@/components/market/WorkCard';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export const metadata = { title: 'Marketplace · KavaWorks' };

export default async function MarketPage() {
  const works = getWorks({ limit: 40 });
  const nations = getNations();

  return (
    <div className="px-4 py-6 lg:px-10">
      <header
        className="mb-8 overflow-hidden rounded-2xl border"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <CulturalPattern id="pattern-moana" opacity={0.12} tone="brand" size={56}>
          <div className="p-8 md:p-12">
            <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
              Marketplace
            </div>
            <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
              Works by Pacific artists across Te Moana-nui-a-Kiwa.
            </h1>
            <p
              className="mt-3 max-w-2xl font-editorial italic"
              style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}
            >
              95% of every sale goes directly to the artist. Attribution travels with every work.
            </p>
          </div>
        </CulturalPattern>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--ink-soft)' }}
        >
          Filter by nation ·
        </span>
        {nations.slice(0, 10).map((n) => (
          <span
            key={n.id}
            className="rounded-full border px-2.5 py-1 text-xs"
            style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
          >
            {n.flag} {n.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {works.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
      </div>
    </div>
  );
}
