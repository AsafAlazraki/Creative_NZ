import Link from 'next/link';
import { getGrants } from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { GrantWizard } from '@/components/grants/GrantWizard';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Grants · KavaWorks' };

export default async function GrantsPage() {
  const grants = getGrants();
  const sortedSoon = [...grants]
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .sort((a, b) => a.days - b.days);

  return (
    <div className="px-4 py-6 lg:px-10">
      <CulturalPattern
        id="pattern-koula"
        opacity={0.12}
        tone="brand"
        size={56}
        className="mb-10 overflow-hidden rounded-2xl border"
      >
        <div className="p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Grants
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Funding for Pacific artists and organisations.
          </h1>
          <p
            className="mt-3 max-w-2xl font-editorial italic"
            style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}
          >
            Every grant here is real. Deadlines, amounts, and source URLs link to the official
            Creative New Zealand pages. Inati — access to funding information is free.
          </p>
          <div className="mt-6">
            <GrantWizard grants={grants} />
          </div>
        </div>
      </CulturalPattern>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Closing soon</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedSoon.slice(0, 4).map(({ g, days }) => (
            <Link
              key={g.id}
              href={`/grants/${g.id}`}
              className="rounded-xl border p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: days < 30 ? 'var(--accent-coral)' : 'var(--ink-soft)' }}
                  >
                    {days > 0 ? `Closes in ${days} days` : 'Closed'}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-semibold">{g.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                    {g.amountDisplay} · {g.funder}
                  </p>
                </div>
                <PoolChip pool={g.pool} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">All grants</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((g) => (
            <Link
              key={g.id}
              href={`/grants/${g.id}`}
              className="rounded-xl border p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold">{g.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                    {g.amountDisplay} · {g.duration ?? 'Single project'}
                  </p>
                </div>
                <PoolChip pool={g.pool} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs" style={{ color: 'var(--ink-muted)' }}>
                <span>Deadline: {new Date(g.deadline).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="font-mono">
                  {formatPrice(g.amountMin)}–{formatPrice(g.amountMax)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PoolChip({ pool }: { pool: string }) {
  const color =
    pool === 'pacific'
      ? 'var(--brand)'
      : pool === 'ngatoi'
        ? 'var(--accent-jade)'
        : 'var(--ink-soft)';
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize whitespace-nowrap"
      style={{
        color,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
      }}
    >
      {pool === 'pacific' ? 'Pacific pool' : pool === 'ngatoi' ? 'Ngā Toi' : 'General'}
    </span>
  );
}
