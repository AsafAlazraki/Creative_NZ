import Link from 'next/link';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import type { HydratedArtist } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import { NationBadge } from '@/components/cultural/NationBadge';

export function EditorialHero({ artist, quote }: { artist: HydratedArtist; quote: string }) {
  const nation = getNation(artist.primaryNationId);
  return (
    <section
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <CulturalPattern
        id={nation?.patternId ?? 'pattern-tapa'}
        opacity={0.14}
        tone="brand"
        size={72}
        className="min-h-[360px]"
      >
        <div className="flex min-h-[360px] flex-col justify-between p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            This week — featured artist
          </div>
          <div>
            <blockquote className="pull-quote max-w-2xl">"{quote}"</blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/artist/${artist.handle}`}
                className="font-display text-xl font-semibold hover:underline"
              >
                {artist.name}
              </Link>
              <span aria-hidden style={{ color: 'var(--ink-soft)' }}>
                ·
              </span>
              <NationBadge nationId={artist.primaryNationId} />
              <span aria-hidden style={{ color: 'var(--ink-soft)' }}>
                ·
              </span>
              <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                {artist.artforms.slice(0, 2).join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </CulturalPattern>
    </section>
  );
}
