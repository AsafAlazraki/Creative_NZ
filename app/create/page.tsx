import { getCurrentUser } from '@/lib/auth';
import { ARTFORM_NOTES } from '@/lib/tauhi-va-kb';
import { BEST_TIMES, HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { Icon } from '@/components/ui/Icon';
import { CreateTabs } from '@/components/create/CreateTabs';
import { CreateCanvas } from '@/components/create/CreateCanvas';

export const metadata = { title: 'Create · KavaWorks' };

const TYPES = ['image', 'short', 'long', 'audio', 'listing'] as const;
type CreateType = (typeof TYPES)[number];

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await getCurrentUser();
  const { type } = await searchParams;
  const active: CreateType = TYPES.includes(type as CreateType)
    ? (type as CreateType)
    : 'image';

  return (
    <div className="px-4 py-6 lg:px-10 xl:px-16">
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-soft)' }}>
          Create
        </div>
        <h1 className="mt-2 font-display font-semibold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          Share with respect.
        </h1>
        <span className="theme-rule mt-3" />
      </header>

      <CreateTabs active={active} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <CreateCanvas type={active} />

        <aside className="space-y-5">
          <section
            className="rounded-xl border p-4"
            style={{
              borderColor: 'color-mix(in srgb, var(--brand) 30%, transparent)',
              background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--brand)' }}>
              <Icon name="activity" size={12} /> Moana Ola · timing
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--ink)', lineHeight: 1.5 }}>
              {BEST_TIMES[
                active === 'short' ? 'processVideo'
                : active === 'long' ? 'processVideo'
                : active === 'audio' ? 'announcement'
                : active === 'listing' ? 'finishedWork'
                : 'craftPost'
              ].reason}
            </p>
            <p className="mt-2 font-mono text-xs">
              {BEST_TIMES[
                active === 'short' ? 'processVideo'
                : active === 'long' ? 'processVideo'
                : active === 'audio' ? 'announcement'
                : active === 'listing' ? 'finishedWork'
                : 'craftPost'
              ].window}
            </p>
          </section>

          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Suggested hashtags
            </h3>
            <div className="flex flex-wrap gap-2">
              {HASHTAG_TRENDS.slice(0, 8).map((t) => (
                <span
                  key={t.tag}
                  className="rounded-full border px-2 py-1 text-xs"
                  style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </section>

          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Attribution preview
            </h3>
            <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
              {user.name} · {user.city} · attribution is permanent and cannot be removed after
              first sale.
            </p>
          </section>

          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Artforms ({Object.keys(ARTFORM_NOTES).length})
            </h3>
            <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>
              Siapo, ngatu, hiapo, kapa, masi, tīvaevae, whakairo, tā moko, tatau, kōwhaiwhai, rāranga,
              bilum, sand drawing, shell jewellery, spoken word, photography, documentary film…
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
