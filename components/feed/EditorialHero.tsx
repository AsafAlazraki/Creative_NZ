import Link from 'next/link';
import type { HydratedArtist } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import { NationBadge } from '@/components/cultural/NationBadge';
import { heroImageUrl } from '@/lib/images';

export function EditorialHero({ artist, quote }: { artist: HydratedArtist; quote: string }) {
  const nation = getNation(artist.primaryNationId);
  const heroTheme = `${artist.artforms[0] ?? 'Pacific craft'}, ${nation?.name ?? 'Pacific'} tradition, contemporary practice`;
  const img = heroImageUrl(heroTheme, artist.id, 2000, 1100);

  return (
    <section
      className="relative overflow-hidden rounded-3xl border"
      style={{ borderColor: 'var(--hairline)' }}
    >
      <div className="relative aspect-[16/9] xl:aspect-[2/1] min-h-[360px]">
        <img
          src={img}
          alt={`Featured: ${artist.name}, ${artist.artforms.slice(0, 2).join(' and ')} from ${nation?.name ?? 'the Pacific'}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top right, rgba(15,14,12,0.85) 0%, rgba(15,14,12,0.5) 45%, rgba(15,14,12,0.15) 100%)',
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-8 md:p-12 xl:p-16">
          <div
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85"
          >
            This week — featured artist
          </div>
          <div className="max-w-3xl overflow-hidden">
            <blockquote
              className="font-editorial italic text-white line-clamp-4 overflow-hidden break-words"
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 3.25rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              "{quote}"
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-white">
              <Link
                href={`/artist/${artist.handle}`}
                className="font-display text-xl font-semibold hover:underline md:text-2xl"
              >
                {artist.name}
              </Link>
              <span aria-hidden className="text-white/60">
                ·
              </span>
              <span className="flex items-center gap-1.5 text-white/90 text-sm md:text-base">
                <span aria-hidden>{nation?.flag}</span>
                <span>{nation?.name}</span>
              </span>
              <span aria-hidden className="text-white/60">
                ·
              </span>
              <span className="text-white/80 text-sm md:text-base">
                {artist.artforms.slice(0, 2).join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
