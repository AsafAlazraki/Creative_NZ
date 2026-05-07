import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGroupById, getArtistsByIds, getNation } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { ElderBadge } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';
import { requestGroupJoin } from '@/app/actions';

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const g = getGroupById(id);
  if (!g) notFound();
  const elders = getArtistsByIds(g.elderIds);
  const nation = getNation(g.nationId);

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/groups" className="hover:underline">
          Groups
        </Link>
        <span className="mx-2">/</span>
        <span>{g.name}</span>
      </nav>

      {/* Dark editorial masthead — replaces the plain pattern + h1.
          The nation code sits as a giant watermark in the corner so the
          page reads as "this circle, from this nation" before any copy. */}
      <header
        className="relative overflow-hidden rounded-2xl px-6 py-10 text-white sm:px-8"
        style={{ background: 'var(--ink)' }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-0 select-none font-bold leading-none text-white/[0.04]"
          style={{ fontSize: 120, letterSpacing: '-0.04em' }}
        >
          {(nation?.id ?? g.nationId).toUpperCase().slice(0, 4)}
        </span>

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">
          {nation?.flag} {nation?.name} · {g.memberCount.toLocaleString()} members
        </p>
        <h1 className="mb-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {g.name}
        </h1>
        <p className="max-w-lg text-[15px] leading-relaxed text-white/75">
          {g.description}
        </p>
        <p className="mt-6 text-sm text-white/60">
          {g.recentMessageCount} messages this week
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            {elders.length > 0 && (
              <section
                className="rounded-2xl border p-5"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <p
                  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  ✦ Held by
                </p>
                <div className="space-y-4">
                  {elders.map((e) => {
                    const eNation = getNation(e.primaryNationId);
                    return (
                      <Link
                        key={e.id}
                        href={`/artist/${e.handle}`}
                        className="flex items-center gap-4 transition-colors hover:opacity-90"
                      >
                        <div
                          className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full"
                          style={{ boxShadow: '0 0 0 2px color-mix(in srgb, var(--ink) 12%, transparent)' }}
                        >
                          <AvatarIllustrated nationId={e.primaryNationId} size={56} name={e.name} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-lg font-bold leading-tight">{e.name}</p>
                          <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                            {eNation?.name} · {e.role}
                          </p>
                          <span className="mt-1.5 inline-block">
                            <ElderBadge />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Charter / Kawa — document treatment.
                Header bar + serif body so the kawa reads like a charter,
                not a feed post. Generous line-height for legibility. */}
            <section
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div
                className="border-b px-6 py-4"
                style={{
                  borderColor: 'var(--hairline)',
                  background: 'color-mix(in srgb, var(--ink) 3%, transparent)',
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Charter · Kawa
                </p>
              </div>
              <div className="px-6 py-6">
                <div
                  className="max-w-prose space-y-4 font-editorial"
                  style={{ color: 'var(--ink)', fontSize: 15, lineHeight: 1.85 }}
                >
                  {g.charter.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </section>

            {g.threadsData.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-lg font-bold">Recent threads</h2>
                <ul className="space-y-2">
                  {g.threadsData.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between gap-3 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {t.pinned && <Icon name="bookmark" size={12} />}
                          <span className="font-semibold">{t.title}</span>
                        </div>
                        <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                          {t.messageCount} messages · last active{' '}
                          {new Date(t.lastMessageAt).toLocaleDateString('en-NZ', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </div>
                      </div>
                      <Icon name="chevron-right" size={16} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            {/* Request-to-join — considered, not a red CTA */}
            <section
              className="rounded-2xl border p-5"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3 className="mb-1 font-display text-lg font-bold">Join this circle</h3>
              <p className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
                Joining is by request. The elder will review and respond within a few days.
              </p>
              <form action={requestGroupJoin.bind(null, g.id)}>
                <button
                  type="submit"
                  className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: 'var(--ink)', color: 'var(--bg)' }}
                >
                  Send a request to join
                </button>
              </form>
              <p className="mt-3 text-center text-[11px]" style={{ color: 'var(--ink-muted)' }}>
                Open to {nation?.name ?? 'all'} community + verified affiliates
              </p>
            </section>

            <section
              className="rounded-2xl border p-5"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--ink-muted)' }}
              >
                Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span style={{ color: 'var(--ink-muted)' }}>Members</span>
                  <span className="font-display text-lg font-bold leading-none">
                    {g.memberCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span style={{ color: 'var(--ink-muted)' }}>Messages / week</span>
                  <span className="font-display text-lg font-bold leading-none">
                    {g.recentMessageCount}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span style={{ color: 'var(--ink-muted)' }}>Threads</span>
                  <span className="font-display text-lg font-bold leading-none">
                    {g.threadsData.length}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
