import { getAllArtists, getPosts, getGroups, getGrants } from '@/lib/repo';
import { getCurrentUser } from '@/lib/auth';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { formatCount } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Admin · KavaWorks' };

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (user.role !== 'admin') redirect('/');

  const artists = getAllArtists();
  const posts = getPosts({ limit: 1000 });
  const groups = getGroups();
  const grants = getGrants();

  return (
    <div className="px-4 py-6 lg:px-10">
      <div
        className="mb-6 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider"
        style={{
          background: 'color-mix(in srgb, var(--accent-coral) 12%, transparent)',
          color: 'var(--accent-coral)',
        }}
      >
        Admin view — visible only to you
      </div>

      <CulturalPattern
        id="pattern-moana"
        opacity={0.06}
        tone="brand"
        size={48}
        className="mb-10 overflow-hidden rounded-2xl border"
      >
        <div className="p-8">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Admin dashboard
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold">Platform overview.</h1>
          <p className="mt-2 max-w-2xl text-sm" style={{ color: 'var(--ink-muted)' }}>
            Aggregate only. Individual surveillance is not a capability we build.
          </p>
        </div>
      </CulturalPattern>

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Artists" value={formatCount(artists.filter((a) => a.role === 'artist').length)} />
        <Stat label="Posts" value={formatCount(posts.length)} />
        <Stat label="Groups" value={formatCount(groups.length)} />
        <Stat label="Grants" value={formatCount(grants.length)} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card title="Featured content editor" desc="Reorder Feed hero rotation; pick Explore editorial carousel." />
        <Card title="Flagged items queue" desc="Posts/works flagged by advisers or users. Zero in queue right now." />
        <Card title="Grant database" desc="10 grants seeded. Changes save to demo DB only." />
        <Card title="User role management" desc="Grant elder status, verify adviser, approve organisations." />
        <Card title="Platform metrics" desc="Total users, posts this week, sales this month, active groups." />
      </div>
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

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <article
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
        {desc}
      </p>
    </article>
  );
}
