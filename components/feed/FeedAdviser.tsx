import type { CurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { getFollowedArtists, getGrants, getPosts } from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { GreetingStrip } from '@/components/cultural/GreetingStrip';
import { PostCard } from './PostCard';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { Icon } from '@/components/ui/Icon';

export async function FeedAdviser({ user }: { user: CurrentUser }) {
  const caseload = getFollowedArtists(user.id);
  const grants = getGrants();
  const soon = grants
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .filter((x) => x.days > 0 && x.days < 60)
    .sort((a, b) => a.days - b.days);
  const caseloadPosts = getPosts({ limit: 50 }).filter((p) =>
    caseload.some((a) => a.id === p.authorId),
  );

  return (
    <div className="px-4 py-6 lg:px-8">
      <GreetingStrip name={user.name} nationId={user.primaryNationId} />
      <section
        className="mb-6 rounded-2xl border p-6"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent-coral) 35%, transparent)',
          background: 'color-mix(in srgb, var(--accent-coral) 4%, transparent)',
        }}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--accent-coral)' }}>
          <Icon name="shield" size={14} />
          Adviser dashboard
        </div>
        <h1 className="mt-1 font-display text-2xl font-semibold">
          Kia ora, {user.name.split(' ')[0]}. {caseload.length} artists on your caseload.
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Office hours: Tuesdays 10am–4pm. Book a kōrero via the CNZ portal.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <section
            className="rounded-xl border p-5"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h2 className="mb-3 font-display text-lg font-semibold">Grant deadlines for your caseload</h2>
            <ul className="divide-y" style={{ borderColor: 'var(--hairline)' }}>
              {soon.map(({ g, days }) => (
                <li key={g.id} className="py-3">
                  <Link href={`/grants/${g.id}`} className="flex items-start justify-between gap-4 hover:underline">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{g.name}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {g.amountDisplay} · {g.pool} pool
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="font-mono text-sm font-semibold"
                        style={{
                          color: days < 14 ? 'var(--accent-coral)' : 'var(--ink-muted)',
                        }}
                      >
                        {days}d
                      </div>
                      <div className="text-[10px]" style={{ color: 'var(--ink-soft)' }}>
                        to deadline
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">Caseload activity this week</h2>
            <div className="flex flex-col gap-6">
              {caseloadPosts.slice(0, 8).map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section
            className="rounded-xl border p-4"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Your caseload
            </h3>
            <ul className="space-y-2">
              {caseload.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/artist/${a.handle}`}
                    className="flex items-center gap-2 rounded-md p-1 text-sm hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                  >
                    <AvatarIllustrated nationId={a.primaryNationId} size={28} name={a.name} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{a.name}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {a.city}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
