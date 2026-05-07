import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import {
  getGrants,
  getActiveDrop,
  getEvents,
  getArtistById,
  getWorkById,
  getGroups,
  getAllArtists,
  getArticles,
  getNation,
} from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { Icon } from '@/components/ui/Icon';
import { workImageUrl } from '@/lib/images';
import { CountdownClient } from './CountdownClient';
import { formatPrice } from '@/lib/utils';

export function RightSidebar({ user }: { user: CurrentUser }) {
  const grants = getGrants();
  const soon = grants
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .filter((x) => x.days > 0)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);
  const drop = getActiveDrop();
  const events = getEvents().slice(0, 3);
  const groups = getGroups().slice(0, 3);
  const allArtists = getAllArtists().filter((a) => a.role === 'artist' && a.id !== user.id);
  const islandMatches = allArtists.filter((a) =>
    user.affiliations.some((aff) => a.affiliations.includes(aff)),
  );
  const myIslandArtists = islandMatches.length >= 4
    ? islandMatches.slice(0, 6)
    : [...islandMatches, ...allArtists.filter((a) => !islandMatches.includes(a))].slice(0, 6);
  const articles = getArticles?.()?.slice(0, 2) ?? [];

  return (
    <div className="sticky flex flex-col gap-6" style={{ top: 24 }}>

      {/* Island artists */}
      {myIslandArtists.length > 0 && (
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="globe" size={15} />
            {islandMatches.length >= 4 ? 'Your islands' : 'Discover artists'}
          </h3>
          <div
            className="flex gap-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {myIslandArtists.map((a) => (
              <Link
                key={a.id}
                href={`/artist/${a.handle}`}
                className="flex flex-col items-center gap-1 shrink-0"
                style={{ textDecoration: 'none' }}
              >
                <AvatarIllustrated nationId={a.primaryNationId} size={48} name={a.name} />
                <span style={{
                  fontSize: 10, fontWeight: 500, color: 'var(--ink-muted)',
                  maxWidth: 56, textAlign: 'center', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {a.name.split(' ')[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Live drop countdown */}
      {drop && <DropModule drop={drop} />}

      {/* Grant deadlines */}
      {soon.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="award" size={15} />
              Grant deadlines
            </h3>
            <Link href="/grants" style={{ fontSize: 12, color: 'var(--moana)', fontWeight: 600, textDecoration: 'none' }}>
              All grants
            </Link>
          </div>
          {soon.map(({ g, days }) => (
            <Link
              key={g.id}
              href={`/grants/${g.id}`}
              style={{
                display: 'block', padding: '10px 12px', borderRadius: 10, marginBottom: 6,
                background: 'color-mix(in srgb, var(--whetu) 5%, transparent)',
                border: '1px solid color-mix(in srgb, var(--whetu) 12%, transparent)',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}>{g.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--ink-muted)' }}>
                <span>{g.funder}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--whetu)' }}>
                  {days}d left
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Events */}
      {events.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="calendar" size={15} />
              Upcoming
            </h3>
            <Link href="/events" style={{ fontSize: 12, color: 'var(--moana)', fontWeight: 600, textDecoration: 'none' }}>
              See all
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {events.map((e) => {
              const d = new Date(e.startsAt);
              const day = d.toLocaleDateString('en-NZ', { day: 'numeric' });
              const month = d.toLocaleDateString('en-NZ', { month: 'short' });
              return (
                <Link
                  key={e.id}
                  href="/events"
                  style={{
                    display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 12,
                    background: 'var(--surface)', border: '1px solid var(--rule)',
                    textDecoration: 'none', transition: 'box-shadow 150ms',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'color-mix(in srgb, var(--moana) 10%, transparent)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--moana)' }}>{day}</span>
                    <span style={{ fontSize: 8, color: 'var(--ink-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{month}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, color: 'var(--ink)' }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
                      {e.rsvpCount ?? 0} going
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Groups */}
      {groups.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="users" size={15} />
              Your groups
            </h3>
            <Link href="/groups" style={{ fontSize: 12, color: 'var(--moana)', fontWeight: 600, textDecoration: 'none' }}>
              All
            </Link>
          </div>
          {groups.map((g) => (
            <Link
              key={g.id}
              href={`/groups/${g.id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                borderRadius: 10, marginBottom: 4, textDecoration: 'none',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {getNation(g.nationId)?.flag ?? '🌏'}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{g.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{g.memberCount} members</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Kete articles */}
      {articles.length > 0 && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="book-open" size={15} />
            From the Kete
          </h3>
          {articles.map((a, i) => (
            <Link
              key={a.id}
              href={`/kete/${a.id}`}
              style={{
                display: 'block', padding: '8px 0', textDecoration: 'none',
                borderBottom: i < articles.length - 1 ? '1px solid var(--rule)' : 'none',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, color: 'var(--ink)' }}>{a.title}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
                {a.author} · {a.readTimeMin} min
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DropModule({
  drop,
}: {
  drop: { workId: string; artistId: string; closesAt: string; remainingUnits: number; totalUnits: number };
}) {
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;

  const isOpen = new Date(drop.closesAt) > new Date();
  const img = workImageUrl({ artform: work.artform, nationId: work.nationId, seed: work.id, w: 400, h: 500 });

  // Atmospheric background-image treatment — the artwork sits behind
  // the card body at low opacity so the widget feels rooted in the
  // actual piece rather than being a UI shell with a header thumbnail.
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <img src={img} alt="" aria-hidden className="h-full w-full object-cover opacity-25" loading="lazy" />
      </div>
      <div
        className="relative rounded-2xl border p-4"
        style={{
          borderColor: 'var(--hairline)',
          background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
            Inati drop
          </p>
          {isOpen && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide text-white"
              style={{ background: 'var(--coral)', animation: 'pulse 2s infinite' }}
            >
              ● LIVE
            </span>
          )}
        </div>

        <p className="font-display text-base font-bold leading-tight">{work.title}</p>
        <div className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-muted)' }}>
          <AvatarIllustrated nationId={artist.primaryNationId} size={16} name={artist.name} />
          <span className="truncate">by {artist.name}</span>
        </div>

        {isOpen ? (
          <>
            <div
              className="mt-3 flex justify-center rounded-lg py-2"
              style={{ background: 'color-mix(in srgb, var(--ink) 5%, transparent)' }}
            >
              <CountdownClient target={drop.closesAt} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs" style={{ color: 'var(--ink-muted)' }}>
              <span>
                <strong style={{ color: 'var(--ink)' }}>{drop.remainingUnits}</strong>/{drop.totalUnits} left
              </span>
              <span className="font-mono font-semibold" style={{ color: 'var(--ink)' }}>
                {formatPrice(work.priceNzd)}
              </span>
            </div>
            <Link
              href={`/market/${work.id}`}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              <Icon name="zap" size={13} />
              Claim — {formatPrice(work.priceNzd)}
            </Link>
          </>
        ) : (
          <>
            <div
              className="mt-3 rounded-lg py-2 text-center text-sm font-medium"
              style={{ background: 'color-mix(in srgb, var(--ink) 5%, transparent)', color: 'var(--ink-muted)' }}
            >
              Closed
            </div>
            <Link
              href="/market#drops"
              className="mt-2 block w-full text-center text-xs font-medium transition-colors hover:underline"
              style={{ color: 'var(--ink-muted)' }}
            >
              Notify me for next drop →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
