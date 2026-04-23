import type { CurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { getPosts, getAllArtists, getGroups, getGrants } from '@/lib/repo';
import { GreetingStrip } from '@/components/cultural/GreetingStrip';
import { Icon } from '@/components/ui/Icon';

export async function FeedAdmin({ user }: { user: CurrentUser }) {
  const posts = getPosts({ limit: 100 });
  const artists = getAllArtists();
  const groups = getGroups();
  const grants = getGrants();

  return (
    <div className="px-4 py-6 lg:px-8">
      <div
        className="mb-4 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider"
        style={{
          background: 'color-mix(in srgb, var(--accent-coral) 12%, transparent)',
          color: 'var(--accent-coral)',
        }}
      >
        Admin view — visible only to you
      </div>
      <GreetingStrip name={user.name} nationId={user.primaryNationId} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Artists" value={artists.filter((a) => a.role === 'artist').length} />
        <Stat label="Posts" value={posts.length} />
        <Stat label="Groups" value={groups.length} />
        <Stat label="Grants" value={grants.length} />
      </div>
      <div className="mt-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
        >
          Open admin dashboard <Icon name="chevron-right" size={16} />
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </div>
      <div className="mt-1 font-mono text-3xl font-semibold">{value}</div>
    </div>
  );
}
