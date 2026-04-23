import Link from 'next/link';
import { getArtistById, getNation, type HydratedWork } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { NationBadge } from '@/components/cultural/NationBadge';
import { InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { formatPrice } from '@/lib/utils';

export function WorkCard({ work }: { work: HydratedWork }) {
  const artist = getArtistById(work.artistId);
  const nation = getNation(work.nationId);
  if (!artist) return null;

  return (
    <Link
      href={`/market/${work.id}`}
      className="group block overflow-hidden rounded-xl border transition-transform hover:-translate-y-0.5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <CulturalPattern
        id={nation?.patternId ?? 'pattern-tapa'}
        opacity={0.16}
        tone="brand"
        size={56}
        className="aspect-[4/5] border-b"
      >
        <div
          className="flex aspect-[4/5] items-end p-4"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="flex w-full items-end justify-between gap-2">
            <div
              className="font-editorial italic"
              style={{ color: 'var(--ink-muted)', fontSize: 13, lineHeight: 1.3 }}
            >
              {work.artform} · {work.materials.split(',')[0]}
            </div>
            {work.tapu && <TapuIndicator />}
          </div>
        </div>
      </CulturalPattern>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-display font-semibold">{work.title}</h3>
          <div className="font-mono text-sm font-semibold shrink-0">{formatPrice(work.priceNzd)}</div>
        </div>
        <div
          className="mt-1 flex items-center justify-between text-xs"
          style={{ color: 'var(--ink-muted)' }}
        >
          <span className="truncate">{artist.name}</span>
          <NationBadge nationId={work.nationId} size="xs" />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <InatiBadge />
          <span className="text-[11px]" style={{ color: 'var(--ink-soft)' }}>
            95% to the artist
          </span>
        </div>
      </div>
    </Link>
  );
}
