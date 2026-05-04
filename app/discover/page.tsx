import Link from 'next/link';
import { PACIFIC_VALUES } from '@/lib/tauhi-va-kb';
import { HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { searchAll } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { VerifiedBadge } from '@/components/cultural/Badges';
import { DiscoverSearchBar } from '@/components/explore/DiscoverSearchBar';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Discover · KavaWorks' };

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const hasQuery = typeof q === 'string' && q.trim().length > 0;
  const results = hasQuery ? searchAll(q!) : null;

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Discover
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Search and browse.</h1>
      </header>

      <DiscoverSearchBar initialValue={q ?? ''} />

      {hasQuery && results ? (
        <div className="mt-8 space-y-10">
          {results.artists.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold">
                Artists <span className="text-base font-normal" style={{ color: 'var(--ink-soft)' }}>({results.artists.length})</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.artists.slice(0, 9).map((a) => (
                  <Link
                    key={a.id}
                    href={`/artist/${a.handle}`}
                    className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', textDecoration: 'none' }}
                  >
                    <AvatarIllustrated nationId={a.primaryNationId} size={44} name={a.name} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-semibold truncate">
                        {a.name}
                        {a.verified && <VerifiedBadge />}
                      </div>
                      <div className="text-sm truncate" style={{ color: 'var(--ink-muted)' }}>
                        @{a.handle} · {a.artforms.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.works.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold">
                Works <span className="text-base font-normal" style={{ color: 'var(--ink-soft)' }}>({results.works.length})</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.works.slice(0, 9).map((w) => (
                  <Link
                    key={w.id}
                    href={`/market/${w.id}`}
                    className="rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', textDecoration: 'none' }}
                  >
                    <div className="font-semibold">{w.title}</div>
                    <div className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                      {w.artform} · {formatPrice(w.priceNzd)}
                    </div>
                    <div className="mt-1 text-xs truncate" style={{ color: 'var(--ink-soft)' }}>
                      {w.description.slice(0, 80)}…
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.grants.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold">
                Grants <span className="text-base font-normal" style={{ color: 'var(--ink-soft)' }}>({results.grants.length})</span>
              </h2>
              <div className="space-y-3">
                {results.grants.slice(0, 5).map((g) => (
                  <Link
                    key={g.id}
                    href={`/grants/${g.id}`}
                    className="flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', textDecoration: 'none' }}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold">{g.name}</div>
                      <div className="mt-0.5 text-sm" style={{ color: 'var(--ink-muted)' }}>
                        {g.funder} · {g.amountDisplay}
                      </div>
                    </div>
                    <div className="text-xs shrink-0 font-mono" style={{ color: 'var(--ink-soft)' }}>
                      Closes {new Date(g.deadline).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' })}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.groups.length > 0 && (
            <section>
              <h2 className="mb-4 font-display text-xl font-semibold">
                Groups <span className="text-base font-normal" style={{ color: 'var(--ink-soft)' }}>({results.groups.length})</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.groups.slice(0, 6).map((g) => (
                  <Link
                    key={g.id}
                    href={`/groups/${g.id}`}
                    className="rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', textDecoration: 'none' }}
                  >
                    <div className="font-semibold">{g.name}</div>
                    <div className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                      {g.memberCount.toLocaleString()} members
                    </div>
                    <div className="mt-1 text-xs" style={{ color: 'var(--ink-soft)' }}>
                      {g.description.slice(0, 60)}…
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {results.artists.length === 0 && results.works.length === 0 && results.grants.length === 0 && results.groups.length === 0 && (
            <div className="py-16 text-center" style={{ color: 'var(--ink-muted)' }}>
              <div className="font-display text-2xl font-semibold">No results for "{q}"</div>
              <p className="mt-2 text-sm">Try a different artform, name, or grant keyword.</p>
            </div>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
