import Link from 'next/link';
import { getArtistById, getNation } from '@/lib/repo';
import { NationBadge } from './NationBadge';
import { VerifiedBadge } from './Badges';

/**
 * AttributionBlock — permanent record travelling with every work.
 *
 * Per the design language, this is the SINGLE MOST WEIGHTED element
 * on an item page:
 *   - thick 4px left border in the ceremony primary colour
 *   - 2px outer ink border on the other three sides
 *   - 32px padding
 *   - no rounded corners, no shadow
 *   - eyebrow label in Inter caps
 *   - artist name in Fraunces
 *   - nation + flag inline
 *   - cultural story as Fraunces italic pull-block
 *   - permanence disclaimer in small Inter muted
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

  return (
    <section
      aria-label="Cultural attribution"
      style={{
        background: 'var(--paper)',
        border: 'var(--line)',
        borderLeft: '6px solid var(--ceremony-primary)',
        padding: compact ? 20 : 32,
      }}
    >
      <div
        className="flex items-center gap-2 mb-4 font-body font-bold uppercase"
        style={{
          fontSize: 11,
          letterSpacing: '0.2em',
          color: 'var(--ceremony-primary)',
        }}
      >
        <span aria-hidden>◆</span>
        <span>Attribution · permanent</span>
      </div>

      <Link
        href={`/artist/${artist.handle}`}
        className="flex items-baseline gap-2 mb-2"
      >
        <span
          className="font-display"
          style={{
            fontSize: compact ? 24 : 34,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            lineHeight: 1.05,
          }}
        >
          {artist.name}
        </span>
        {artist.verified && <VerifiedBadge />}
      </Link>

      <div className="flex flex-wrap items-center gap-3 font-body text-sm mb-4">
        <span aria-hidden className="text-lg">{nation?.flag}</span>
        <NationBadge nationId={artist.primaryNationId} />
        <span aria-hidden style={{ color: 'var(--ink-soft)' }}>·</span>
        <span style={{ color: 'var(--ink-muted)' }}>{artist.city}</span>
      </div>

      {!compact && (
        <blockquote
          className="font-editorial italic"
          style={{
            fontSize: 19,
            lineHeight: 1.55,
            color: 'var(--ink)',
            borderLeft: '2px solid var(--ceremony-primary)',
            paddingLeft: 16,
          }}
        >
          {culturalStory}
        </blockquote>
      )}

      {!compact && (
        <p
          className="mt-5 font-body"
          style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}
        >
          Attribution cannot be removed, hidden, or edited after first sale.
          Mana travels with the work.
        </p>
      )}
    </section>
  );
}
