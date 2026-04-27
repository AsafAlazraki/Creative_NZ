import Link from 'next/link';
import { getArtistById, getNation } from '@/lib/repo';
import { NationBadge } from './NationBadge';
import { VerifiedBadge } from './Badges';
import { CulturalPattern } from './CulturalPattern';

/**
 * AttributionBlock — the permanent record that travels with every
 * work. Artist name, island, nation, cultural story.
 *
 * Per the Pasifika design integration plan:
 *   - P5: Whakapapa visible. The maker is named clearly.
 *   - §6.7: Attribution + credits is a first-class component, not
 *     buried in an About page.
 *   - §3.2: Decorative pattern motifs are NOT free visual material,
 *     so when we do show one, it lives here — attributed to the
 *     artist's own nation, with a brass `--whetu` wayfinding accent.
 *
 * Until paid Pasifika design partners commission the actual motifs,
 * the geometric shapes used here are placeholders signalling where
 * commissioned, properly-licensed artwork will sit.
 */
export function AttributionBlock({
  artistId,
  culturalStory,
  compact = false,
}: {
  artistId: string;
  culturalStory: string;
  compact?: boolean;
}) {
  const artist = getArtistById(artistId);
  if (!artist) return null;
  const nation = getNation(artist.primaryNationId);
  const patternId = nation?.patternId ?? 'pattern-tapa';

  return (
    <CulturalPattern
      id={patternId}
      decorative
      opacity={0.05}
      size={56}
      tone="ink"
      className="rounded-lg border"
    >
      <section
        className={`${compact ? 'p-4' : 'p-6'}`}
        style={{
          borderLeft: '4px solid var(--whetu)',
          background: 'var(--surface)',
        }}
        aria-label="Cultural attribution"
      >
        <div
          className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: 'var(--whetu)' }}
        >
          <span aria-hidden>✦</span>
          <span>Attribution · permanent</span>
        </div>
        <Link
          href={`/artist/${artist.handle}`}
          className="flex items-baseline gap-2 hover:underline"
        >
          <span
            className="font-display text-lg font-semibold"
            style={{ color: 'var(--ink)' }}
          >
            {artist.name}
          </span>
          {artist.verified && <VerifiedBadge />}
        </Link>
        <div className="mt-1 flex items-center gap-3 text-sm">
          <NationBadge nationId={artist.primaryNationId} />
          <span style={{ color: 'var(--ink-soft)' }}>·</span>
          <span style={{ color: 'var(--ink-muted)' }}>{artist.city}</span>
        </div>
        {!compact && (
          <p
            className="mt-4 font-editorial text-base italic"
            style={{ color: 'var(--ink-muted)', lineHeight: 1.6 }}
          >
            {culturalStory}
          </p>
        )}
        {!compact && (
          <p
            className="mt-3 text-xs"
            style={{ color: 'var(--ink-soft)' }}
          >
            Attribution cannot be removed, hidden, or edited after first sale.{' '}
            {nation ? `${nation.name} · ` : ''}
            {artist.city}.
          </p>
        )}
      </section>
    </CulturalPattern>
  );
}
