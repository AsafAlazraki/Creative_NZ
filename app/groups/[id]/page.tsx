import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGroupById, getArtistsByIds, getNation } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { ElderBadge } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';

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
    <div>
      <CulturalPattern id={g.coverPatternId} opacity={0.16} tone="brand" size={64} className="border-b">
        <div className="px-4 py-10 lg:px-10">
          <nav className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <Link href="/groups" className="hover:underline">
              Groups
            </Link>
            <span className="mx-2">/</span>
            <span>{g.name}</span>
          </nav>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">{g.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <span>
              {nation?.flag} {nation?.name}
            </span>
            <span>·</span>
            <span>{g.memberCount.toLocaleString()} members</span>
            <span>·</span>
            <span>{g.recentMessageCount} messages this week</span>
          </div>
        </div>
      </CulturalPattern>

      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            {elders.length > 0 && (
              <section
                className="rounded-xl border p-5"
                style={{
                  borderColor: 'color-mix(in srgb, #b8913d 30%, transparent)',
                  background: 'color-mix(in srgb, #b8913d 4%, transparent)',
                }}
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--accent-gold)' }}>
                  <span aria-hidden>✦</span>
                  Held by
                </div>
                {elders.map((e) => (
                  <div key={e.id} className="mt-3 flex items-center gap-3">
                    <AvatarIllustrated nationId={e.primaryNationId} size={48} name={e.name} />
                    <div>
                      <Link href={`/artist/${e.handle}`} className="font-display font-semibold hover:underline">
                        {e.name}
                      </Link>
                      <div className="mt-0.5">
                        <ElderBadge />
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            <section>
              <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                Charter / Kawa
              </h2>
              <div
                className="rounded-xl border p-6 font-editorial"
                style={{
                  borderColor: 'var(--hairline)',
                  background: 'var(--surface)',
                  color: 'var(--ink)',
                  fontSize: 18,
                  lineHeight: 1.6,
                }}
              >
                {g.charter.split('\n\n').map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-display text-lg font-semibold">Recent threads</h2>
              <ul className="space-y-2">
                {g.threadsData.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                    style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                  >
                    <div className="flex-1 min-w-0">
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
          </div>

          <aside>
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                About this group
              </h3>
              <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                {g.description}
              </p>
              <button
                className="mt-4 w-full rounded-md px-4 py-2 text-sm font-semibold"
                style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
              >
                Request to join
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
