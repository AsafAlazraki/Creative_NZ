import Link from 'next/link';
import { getArtistById, getNation } from '@/lib/repo';
import { NationBadge } from './NationBadge';
import { VerifiedBadge } from './Badges';

/**
 * The permanent attribution that travels with every work.
 * Artist name + island + nation flag + cultural story.
 * Cannot be removed after first sale (enforced server-side in production).
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
      className={`rounded-lg border p-4 ${compact ? '' : 'p-6'}`}
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
      aria-label="Cultural attribution"
    >
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        <span aria-hidden>❖</span>
        <span>Attribution · permanent</span>
      </div>
      <Link
        href={`/artist/${artist.handle}`}
        className="flex items-baseline gap-2 hover:underline"
      >
        <span className="font-display text-lg font-semibold" style={{ color: 'var(--ink)' }}>
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
        <p className="mt-3 text-xs" style={{ color: 'var(--ink-soft)' }}>
          Attribution cannot be removed, hidden, or edited after first sale. {nation ? `${nation.name} · ` : ''}
          {artist.city}.
        </p>
      )}
    </section>
  );
}
