import Link from 'next/link';
import { getGroups, getNation, getArtistById, getNations } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { coverImageForOrg } from '@/lib/images';

export const metadata = { title: 'Groups · KavaWorks' };

export default async function GroupsPage() {
  const groups = getGroups();
  const allNations = getNations();
  // Only show nation chips for nations that actually have groups
  const groupNationIds = new Set<string>(groups.map((g) => g.nationId));
  const filterNations = allNations.filter((n) => groupNationIds.has(n.id as string)).slice(0, 8);

  return (
    <div className="px-4 py-6 lg:px-10">
      {/* Editorial masthead — match the pattern set on Explore / Events */}
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p
            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Groups
          </p>
          <h1 className="font-display text-4xl font-bold">Circles held by elders.</h1>
          <p
            className="mt-2 max-w-2xl font-editorial italic"
            style={{ color: 'var(--ink-muted)', fontSize: 16, lineHeight: 1.5 }}
          >
            Every group here has a designated kaumatua, matai, or equivalent senior figure. Without
            one, a group is in pending status and not listed publicly.
          </p>
        </div>
        <p className="hidden text-right text-sm md:block" style={{ color: 'var(--ink-muted)' }}>
          {groups.length} circles
        </p>
      </header>

      {/* Nation filter — read-only chip rail (full filter wiring is a
          future ticket); visually establishes the page is browseable. */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span
          className="flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap"
          style={{
            borderColor: 'var(--ink)',
            background: 'var(--ink)',
            color: 'var(--bg)',
          }}
        >
          All
        </span>
        {filterNations.map((n) => (
          <span
            key={n.id}
            className="flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap"
            style={{
              borderColor: 'color-mix(in srgb, var(--ink) 12%, transparent)',
              color: 'var(--ink-muted)',
            }}
          >
            {n.flag} {n.name}
          </span>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const nation = getNation(g.nationId);
          const elder = g.elderIds[0] ? getArtistById(g.elderIds[0]) : null;
          // First sentence of the kawa as a preview hook
          const kawaPreview = g.charter
            .split(/\n\n/)[0]
            .split(/(?<=[.!?])\s+/)[0]
            ?.trim();

          return (
            <Link
              key={g.id}
              href={`/groups/${g.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border transition-transform hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b bg-[color:var(--surface-2)]">
                <img
                  src={coverImageForOrg(g.id, 800, 450)}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 55%)' }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <div
                    className="rounded-md px-2 py-1 text-xs font-semibold backdrop-blur"
                    style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
                  >
                    {nation?.flag} {nation?.name}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-bold leading-tight">{g.name}</h2>
                <p className="mt-1.5 line-clamp-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {g.description}
                </p>

                {/* Kawa preview — sets the group's tone, not just its remit */}
                {kawaPreview && (
                  <p
                    className="mt-3 line-clamp-2 border-l-2 pl-3 font-editorial italic"
                    style={{
                      borderColor: 'color-mix(in srgb, var(--accent-gold) 60%, transparent)',
                      color: 'var(--ink)',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {kawaPreview}
                  </p>
                )}

                <div
                  className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  <span>{g.memberCount.toLocaleString()} members</span>
                  <span aria-hidden>·</span>
                  <span>{g.recentMessageCount} messages this week</span>
                </div>

                {elder && (
                  <div
                    className="mt-auto flex items-center gap-2 border-t pt-3"
                    style={{ borderColor: 'var(--hairline)', marginTop: 12 }}
                  >
                    <span style={{ color: 'var(--accent-gold)' }} aria-hidden>✦</span>
                    <AvatarIllustrated nationId={elder.primaryNationId} size={24} name={elder.name} />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {elder.name}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: 'var(--accent-gold)' }}
                    >
                      Elder
                    </span>
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
