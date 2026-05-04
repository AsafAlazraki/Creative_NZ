import Link from 'next/link';
import { getGroups, getNation, getArtistById } from '@/lib/repo';
import { ElderBadge } from '@/components/cultural/Badges';
import { coverImageForOrg } from '@/lib/images';

export const metadata = { title: 'Groups · KavaWorks' };

export default async function GroupsPage() {
  const groups = getGroups();

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Groups
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Circles held by elders.</h1>
        <p className="mt-3 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}>
          Every group here has a designated kaumatua, matai, or equivalent senior figure. Without
          one, a group is in pending status and not listed publicly.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const nation = getNation(g.nationId);
          const elder = g.elderIds[0] ? getArtistById(g.elderIds[0]) : null;
          return (
            <Link
              key={g.id}
              href={`/groups/${g.id}`}
              className="overflow-hidden rounded-xl border transition-transform hover:-translate-y-0.5"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b bg-[color:var(--surface-2)]">
                <img
                  src={coverImageForOrg(g.id, 800, 450)}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 55%)' }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <div
                    className="rounded-md px-2 py-1 text-xs font-semibold"
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}
                  >
                    {nation?.flag} {nation?.name}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display text-lg font-semibold">{g.name}</h2>
                <p className="mt-1 line-clamp-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {g.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
                  <span>{g.memberCount.toLocaleString()} members</span>
                  <span>·</span>
                  <span>{g.recentMessageCount} messages this week</span>
                </div>
                {elder && (
                  <div className="mt-3 flex items-center gap-2">
                    <ElderBadge label={elder.name} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
