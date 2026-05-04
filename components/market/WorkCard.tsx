import Link from 'next/link';
import { getArtistById, type HydratedWork } from '@/lib/repo';
import { NationBadge } from '@/components/cultural/NationBadge';
import { InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { formatPrice } from '@/lib/utils';
import { workImageUrl } from '@/lib/images';

export function WorkCard({ work }: { work: HydratedWork }) {
  const artist = getArtistById(work.artistId);
  if (!artist) return null;

  const img = workImageUrl({
    artform: work.artform,
    nationId: work.nationId,
    materials: work.materials,
    seed: work.id,
    w: 900,
    h: 1100,
  });

  return (
    <Link
      href={`/market/${work.id}`}
      className="group block overflow-hidden rounded-2xl border transition-transform hover:-translate-y-0.5 hover:shadow-xl"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--surface-2)]">
        <img
          src={img}
          alt={`${work.title} — ${work.artform}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {work.tapu && (
          <div className="absolute right-3 top-3">
            <TapuIndicator />
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="font-editorial italic text-white text-sm">
            {work.artform}
          </div>
          <InatiBadge />
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-display font-semibold" style={{ fontSize: 17 }}>
          {work.title}
        </h3>
        <div
          className="mt-1 flex items-center justify-between gap-2 text-xs"
          style={{ color: 'var(--ink-muted)' }}
        >
          <span className="min-w-0 flex-1">{artist.name}</span>
          <NationBadge nationId={work.nationId} size="xs" />
        </div>
        <div className="mt-2 font-mono text-sm font-semibold">{formatPrice(work.priceNzd)}</div>
      </div>
    </Link>
  );
}
