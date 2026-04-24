import Link from 'next/link';
import type { HydratedArtist } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import { heroImageUrl } from '@/lib/images';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

/**
 * EditorialHero — full-bleed ceremonial hero in the Alt Group editorial
 * register. Dark ground, large image, Archivo Black display type,
 * Fraunces italic pull-quote.
 */
export function EditorialHero({ artist, quote }: { artist: HydratedArtist; quote: string }) {
  const nation = getNation(artist.primaryNationId);
  const heroTheme = `${artist.artforms[0] ?? 'Pacific craft'}, ${nation?.name ?? 'Pacific'} tradition, contemporary practice`;
  const img = heroImageUrl(heroTheme, artist.id, 2400, 1200);

  return (
    <section
      className="relative w-full overflow-hidden band-wipe"
      style={{ border: 'var(--line-ceremonial)', background: 'var(--ground)' }}
      aria-label="Featured artist"
    >
      <div className="relative" style={{ minHeight: 480 }}>
        <img
          src={img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(120deg, rgba(20,16,12,0.92) 0%, rgba(20,16,12,0.55) 55%, rgba(20,16,12,0.08) 100%)',
          }}
        />
        <div className="relative grid gap-8 p-8 md:p-14 xl:p-20 lg:grid-cols-[3fr_2fr] items-end"
          style={{ minHeight: 480, color: 'var(--paper)' }}
        >
          <div>
            <p
              className="font-body font-bold uppercase mb-6"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: 'color-mix(in srgb, var(--paper) 80%, transparent)' }}
            >
              This week · featured artist
            </p>
            <h1
              className="font-display mb-6"
              style={{
                fontSize: 'clamp(3rem, 6.5vw, 6rem)',
                lineHeight: 0.94,
                letterSpacing: '-0.035em',
                color: 'var(--paper)',
              }}
            >
              {artist.name}.
            </h1>
            <blockquote
              className="font-editorial italic max-w-3xl"
              style={{
                fontSize: 'clamp(1.25rem, 2.2vw, 2rem)',
                lineHeight: 1.28,
                color: 'color-mix(in srgb, var(--paper) 92%, transparent)',
                borderLeft: '6px solid var(--ceremony-primary)',
                paddingLeft: 24,
              }}
            >
              {quote}
            </blockquote>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap items-center gap-3 font-body text-sm font-semibold"
              style={{ color: 'var(--paper)' }}
            >
              <span aria-hidden className="text-2xl">
                {nation?.flag}
              </span>
              <span>{nation?.name}</span>
              <span aria-hidden style={{ opacity: 0.4 }}>·</span>
              <span>{artist.city}</span>
            </div>
            <div
              className="font-body text-xs font-bold uppercase"
              style={{
                letterSpacing: '0.18em',
                color: 'color-mix(in srgb, var(--paper) 70%, transparent)',
              }}
            >
              {artist.artforms.slice(0, 3).join(' · ')}
            </div>
            <Link
              href={`/artist/${artist.handle}`}
              className="mt-3 inline-flex items-center gap-2 btn btn-ghost-on-ground"
            >
              Open profile →
            </Link>
          </div>
        </div>
      </div>
      {/* Ceremonial band — full-saturation pattern at bottom, part of
          the editorial hero's architecture */}
      <CulturalPattern id={nation?.patternId ?? 'pattern-tapa'} opacity={1} size={48} tone="brand" className="block" >
        <div style={{ height: 24 }} />
      </CulturalPattern>
    </section>
  );
}
