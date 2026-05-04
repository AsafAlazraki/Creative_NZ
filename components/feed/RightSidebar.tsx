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
  const img = workImageUrl({ artform: work.artform, nationId: work.nationId, seed: work.id, w: 400, h: 250 });

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--rule)' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: 'var(--surface-2)' }}>
          <img src={img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'var(--coral)', color: '#fff', borderRadius: 99,
          padding: '4px 10px', fontSize: 11, fontWeight: 700,
          fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4,
          animation: 'pulse 2s infinite',
        }}>● LIVE</div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
          {work.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 12, color: 'var(--ink-muted)' }}>
          <AvatarIllustrated nationId={artist.primaryNationId} size={20} name={artist.name} />
          <span>{artist.name}</span>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 4, padding: '10px 0', marginBottom: 10,
          background: 'var(--surface-2)', borderRadius: 10,
        }}>
          <CountdownClient target={drop.closesAt} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10 }}>
          <span>
            <strong style={{ color: 'var(--ink)' }}>{drop.remainingUnits}</strong>/{drop.totalUnits} left
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {formatPrice(work.priceNzd)}
          </span>
        </div>
        {isOpen ? (
          <Link
            href={`/market/${work.id}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              width: '100%', padding: '9px 0', borderRadius: 10,
              background: 'var(--coral)', color: '#fff',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
              textDecoration: 'none',
            }}
          >
            ⚡ Claim — {formatPrice(work.priceNzd)}
          </Link>
        ) : (
          <Link
            href="/drops"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              width: '100%', padding: '9px 0', borderRadius: 10,
              background: 'var(--surface-2)', color: 'var(--ink-muted)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
              textDecoration: 'none', border: '1px solid var(--hairline)',
            }}
          >
            Notify me for next drop →
          </Link>
        )}
      </div>
    </div>
  );
}
