import { MOANA_OLA_KB, upcomingSeasonalMoment, daysUntil } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Moana Ola · KavaWorks' };

export default function MoanaPage() {
  const moment = upcomingSeasonalMoment();

  return (
    <div className="px-4 py-6 lg:px-10">
      <CulturalPattern
        id="pattern-moana"
        opacity={0.12}
        tone="brand"
        size={56}
        className="mb-8 overflow-hidden rounded-2xl border"
      >
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--brand)' }}>
            <Icon name="activity" size={14} /> Moana Ola — engagement intelligence
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            The currents that carry your work.
          </h1>
          <p className="mt-3 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}>
            Moana Ola is not an algorithm in the sense you are used to. It is a knowledge base built
            from public research and Pacific artist interviews, surfacing guidance where it matters.
          </p>
        </div>
      </CulturalPattern>

      <div className="mb-10 grid gap-5 md:grid-cols-2">
        {Object.entries(MOANA_OLA_KB.bestTimes).map(([k, v]) => (
          <section
            key={k}
            className="rounded-xl border p-5"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              {k.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="font-mono text-2xl font-semibold">{v.multiplier}</span>
              <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                engagement
              </span>
            </div>
            <div className="mt-2 font-mono text-sm">{v.window}</div>
            <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
              {v.reason}
            </p>
          </section>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Seasonal moments ahead</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {MOANA_OLA_KB.seasonalMoments.map((m) => {
            const days = daysUntil(m.startDate);
            if (days < 0) return null;
            return (
              <article
                key={m.name}
                className="rounded-xl border p-4"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <h3 className="font-display font-semibold">{m.name}</h3>
                <div className="mt-1 font-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {new Date(m.startDate).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })} · in {days} days
                </div>
                <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                  {m.guidance}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {moment && (
        <section
          className="rounded-xl border p-5"
          style={{
            borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)',
            background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
          }}
        >
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--brand)' }}>
            Next moment
          </div>
          <div className="mt-1 font-display text-2xl font-semibold">{moment.name}</div>
          <p className="mt-2" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            {moment.guidance}
          </p>
        </section>
      )}
    </div>
  );
}
