import { getCurrentUser } from '@/lib/auth';
import { getPostsByArtist, getWorksByArtist } from '@/lib/repo';
import { formatCount, formatPrice } from '@/lib/utils';

export const metadata = { title: 'Analytics · KavaWorks' };

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  const posts = getPostsByArtist(user.id, 50);
  const works = getWorksByArtist(user.id);

  const reach = posts.reduce((a, p) => a + p.views, 0);
  const engagement = posts.reduce((a, p) => a + p.likes + p.comments + p.shares, 0);
  const saves = posts.reduce((a, p) => a + p.saves, 0);
  const sales = works.reduce((a, w) => a + (w.status === 'sold' ? w.priceNzd : 0), 0);

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Analytics
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">This month.</h1>
      </header>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Reach" value={formatCount(reach)} />
        <Stat label="Engagement" value={formatCount(engagement)} />
        <Stat label="Saves" value={formatCount(saves)} />
        <Stat label="Gross sales" value={formatPrice(sales)} />
      </div>

      <section
        className="mb-10 rounded-xl border p-6"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent-jade) 30%, transparent)',
          background: 'color-mix(in srgb, var(--accent-jade) 4%, transparent)',
        }}
      >
        <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent-jade)' }}>
          95% to you
        </div>
        <div className="mt-2 flex items-baseline gap-3">
          <div className="font-mono text-4xl font-semibold">{formatPrice(Math.round(sales * 0.95))}</div>
          <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            net revenue after platform fee
          </div>
        </div>
        <p className="mt-3 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Platform took {formatPrice(Math.round(sales * 0.05))} to cover payment processing and
          operations. Inati — hard-coded, visible, fair.
        </p>
      </section>

      <section
        className="rounded-xl border p-5"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--brand)' }}>
          <span aria-hidden>~</span>
          Moana Ola insight
        </div>
        <p
          className="mt-2 font-editorial italic"
          style={{ color: 'var(--ink)', fontSize: 18, lineHeight: 1.5 }}
        >
          Your Saturday morning posts performed 3.4× better this month than weekday posts. Keep
          that rhythm.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </div>
      <div className="mt-1 font-mono text-3xl font-semibold">{value}</div>
    </div>
  );
}
