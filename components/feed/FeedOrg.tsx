import type { CurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { getPosts, getEvents, getOrgs } from '@/lib/repo';
import { GreetingStrip } from '@/components/cultural/GreetingStrip';
import { PostCard } from './PostCard';
import { Icon } from '@/components/ui/Icon';

export async function FeedOrg({ user }: { user: CurrentUser }) {
  const posts = getPosts({
    limit: 20,
    viewerNationIds: user.affiliations,
    viewerId: user.id,
  });
  const events = getEvents().slice(0, 4);
  const org = getOrgs().find((o) => o.id === 'org_mangere_arts');

  return (
    <div className="px-4 py-6 lg:px-8">
      <GreetingStrip name={user.name} nationId={user.primaryNationId} />
      <section
        className="mb-6 rounded-2xl border p-6"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent-ocean) 35%, transparent)',
          background: 'color-mix(in srgb, var(--accent-ocean) 4%, transparent)',
        }}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--accent-ocean)' }}>
          <Icon name="building" size={14} />
          Organisation dashboard
        </div>
        <h1 className="mt-1 font-display text-2xl font-semibold">{org?.name}</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
          {org?.description}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section
          className="rounded-xl border p-5 lg:col-span-2"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <h2 className="mb-3 font-display text-lg font-semibold">Upcoming events</h2>
          <ul className="divide-y" style={{ borderColor: 'var(--hairline)' }}>
            {events.map((e) => (
              <li key={e.id} className="py-3">
                <Link href="/events" className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{e.title}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                      {e.venue} · {e.rsvpCount} attending
                    </div>
                  </div>
                  <div
                    className="text-right font-mono text-sm"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    {new Date(e.startsAt).toLocaleDateString('en-NZ', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-xl border p-5"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <h2 className="mb-3 font-display text-lg font-semibold">Roster</h2>
          <ul className="space-y-2">
            {org?.linkedArtistIds.map((id) => (
              <li key={id} className="text-sm">
                <Link href={`/artist/${id}`} className="hover:underline">
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">Community activity</h2>
        <div className="flex flex-col gap-6 lg:max-w-2xl">
          {posts.slice(0, 6).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
