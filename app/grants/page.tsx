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
  const totalFunding = grants.reduce((sum, g) => sum + (g.amountMax ?? 0), 0);
  const closingThisMonth = sortedSoon.filter((x) => x.days > 0 && x.days <= 30).length;

  return (
    <div className="px-4 py-6 lg:px-10">
      <CulturalPattern
        id="pattern-koula"
        opacity={0.12}
        tone="brand"
        size={56}
        className="mb-10 overflow-hidden rounded-2xl border"
      >
        <div className="grid gap-6 p-8 md:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
              Grants
            </div>
            <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl break-words">
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
          <aside className="hidden self-start lg:block" style={{ minWidth: 220 }}>
            <div className="rounded-xl border p-5 text-sm" style={{ borderColor: 'var(--hairline)', background: 'color-mix(in srgb, var(--surface) 70%, transparent)', backdropFilter: 'blur(4px)' }}>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>This year</div>
              <div className="mt-3 space-y-3">
                <HeroStat value={String(grants.length)} label="grants listed" />
                <HeroStat value={formatPrice(totalFunding).replace('NZ$', '$')} label="combined ceiling" />
                <HeroStat value={String(closingThisMonth)} label="closing this month" accent />
              </div>
            </div>
          </aside>
        </div>
      </CulturalPattern>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Closing soon</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedSoon.slice(0, 4).map(({ g, days }) => (
            <Link
              key={g.id}
              href={`/grants/${g.id}`}
              className="overflow-hidden rounded-xl border-l-[3px] border border-r border-y p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
              style={{
                borderColor: 'var(--hairline)',
                borderLeftColor: poolAccent(g.pool),
                background: 'var(--surface)',
              }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: days < 14 ? 'var(--accent-coral)' : days < 30 ? 'var(--accent-gold)' : 'var(--ink-soft)' }}
                  >
                    {days > 0 ? `Closes in ${days} days` : 'Closed'}
                  </div>
                  <PoolChip pool={g.pool} />
                </div>
                <h3 className="font-display text-lg font-semibold leading-tight">{g.name}</h3>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {g.amountDisplay} · {g.funder}
                </p>
                <ClosingBar openDate={g.openDate} deadline={g.deadline} days={days} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">All grants</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {grants.map((g) => {
            const days = daysUntil(g.deadline);
            return (
              <Link
                key={g.id}
                href={`/grants/${g.id}`}
                className="rounded-xl border-l-[3px] border border-r border-y p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                style={{
                  borderColor: 'var(--hairline)',
                  borderLeftColor: poolAccent(g.pool),
                  background: 'var(--surface)',
                }}
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
                  <span>
                    Deadline: {new Date(g.deadline).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="font-mono">
                    {formatPrice(g.amountMin)}–{formatPrice(g.amountMax)}
                  </span>
                </div>
                <ClosingBar openDate={g.openDate} deadline={g.deadline} days={days} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * Closing bar — thin progress line showing how much of the open→close
 * window has elapsed. Red fill when <20% time remains, amber when <40%,
 * otherwise neutral. Closed grants render at 100% in muted tone.
 */
function ClosingBar({ openDate, deadline, days }: { openDate: string; deadline: string; days: number }) {
  const open = new Date(openDate).getTime();
  const close = new Date(deadline).getTime();
  const now = Date.now();
  const total = Math.max(close - open, 1);
  const elapsed = Math.min(Math.max(now - open, 0), total);
  const pct = Math.round((elapsed / total) * 100);
  const closed = days <= 0;
  const remainingPct = 100 - pct;

  const fillColor = closed
    ? 'color-mix(in srgb, var(--ink) 18%, transparent)'
    : remainingPct < 20
      ? 'var(--accent-coral)'
      : remainingPct < 40
        ? 'var(--accent-gold)'
        : 'color-mix(in srgb, var(--ink) 35%, transparent)';

  return (
    <div
      className="mt-3 h-1 w-full overflow-hidden rounded-full"
      style={{ background: 'color-mix(in srgb, var(--ink) 6%, transparent)' }}
      aria-hidden
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: fillColor,
          transition: 'width 200ms ease',
        }}
      />
    </div>
  );
}

function poolAccent(pool: string): string {
  if (pool === 'pacific') return 'var(--brand)';
  if (pool === 'ngatoi') return 'var(--accent-jade)';
  return 'color-mix(in srgb, var(--ink) 25%, transparent)';
}

function HeroStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--hairline)' }}>
      <span
        className="font-display text-2xl font-semibold leading-none"
        style={{ color: accent ? 'var(--accent-coral)' : 'var(--ink)' }}
      >
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider text-right" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </span>
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
