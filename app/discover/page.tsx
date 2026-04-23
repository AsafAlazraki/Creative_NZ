import Link from 'next/link';
import { PACIFIC_VALUES } from '@/lib/tauhi-va-kb';
import { HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export const metadata = { title: 'Discover · KavaWorks' };

export default async function DiscoverPage() {
  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Discover
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Search and browse.</h1>
      </header>

      <div
        className="mb-10 rounded-xl border p-4"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Artists · artforms · grants · groups"
          className="w-full bg-transparent text-lg outline-none"
          style={{ color: 'var(--ink)' }}
        />
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Discover by value</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PACIFIC_VALUES.map((v) => (
            <CulturalPattern
              key={v.id}
              id="pattern-tapa"
              opacity={0.08}
              tone="brand"
              size={40}
              className="overflow-hidden rounded-xl border"
            >
              <div className="p-5" style={{ background: 'color-mix(in srgb, var(--surface) 94%, transparent)' }}>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                  {v.origin}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{v.name}</h3>
                <p className="mt-2 font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 15, lineHeight: 1.5 }}>
                  {v.meaning}
                </p>
                <p className="mt-3 text-xs" style={{ color: 'var(--ink-soft)' }}>
                  In product: {v.productExpression}
                </p>
              </div>
            </CulturalPattern>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Trending</h2>
        <div className="flex flex-wrap gap-2">
          {HASHTAG_TRENDS.map((t) => (
            <Link
              key={t.tag}
              href={`/explore?tag=${encodeURIComponent(t.tag)}`}
              className="rounded-full border px-3 py-1 text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              style={{ borderColor: 'var(--hairline)' }}
            >
              {t.tag} <span className="text-xs" style={{ color: 'var(--ink-soft)' }}>· {t.momentum}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
