import Link from 'next/link';
import { Heart } from 'lucide-react';
import { getPosts, getArtistById, getWorkById } from '@/lib/repo';
import { postImageUrl } from '@/lib/images';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { InatiBadge } from '@/components/cultural/Badges';
import { formatCount, formatPrice } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function ShortsRail() {
  const reels = getPosts({ limit: 60 })
    .filter((p) => p.mediaType === 'video' || p.linkedWorkId)
    .slice(0, 10);

  if (!reels.length) return null;

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-soft)' }}>
            <Icon name="film" size={14} />
            Shorts
          </div>
          <h2 className="mt-1 font-display text-2xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
            Watch the hands at work.
          </h2>
        </div>
        <Link
          href="/reels"
          className="rounded-full border px-4 py-2 text-xs font-semibold transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)] whitespace-nowrap"
          style={{ borderColor: 'var(--hairline)' }}
        >
          Open reels →
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 lg:-mx-7 lg:px-7">
        {reels.map((r) => {
          const artist = getArtistById(r.authorId);
          const work = r.linkedWorkId ? getWorkById(r.linkedWorkId) : null;
          if (!artist) return null;
          const img = postImageUrl({
            artform: r.artform,
            nationId: r.nationId,
            caption: r.caption,
            mediaType: r.mediaType as 'image' | 'video' | 'audio' | 'gallery',
            seed: `rail-${r.id}`,
            w: 540,
            h: 900,
          });
          return (
            <Link
              key={r.id}
              href="/reels"
              className="group relative shrink-0 overflow-hidden rounded-2xl border bg-black transition-transform hover:-translate-y-1"
              style={{ width: 200, aspectRatio: '9/16', borderColor: 'var(--hairline)' }}
            >
              <img
                src={img}
                alt={`${r.artform} short by ${artist.name}`}
                className="h-full w-full object-cover transition-transform duration-[350ms] group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.25) 100%)',
                }}
              />
              {r.mediaType === 'video' && (
                <div className="absolute right-2 top-2 rounded-full bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                  {r.durationSec ? `${Math.floor(r.durationSec / 60)}:${(r.durationSec % 60).toString().padStart(2, '0')}` : '▶'}
                </div>
              )}
              {work && (
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[color:var(--brand)] px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
                  <Icon name="shopping-bag" size={10} />
                  Shop · {formatPrice(work.priceNzd)}
                </div>
              )}
              <div className="absolute inset-x-2 bottom-2 text-white">
                <div className="flex items-center gap-1.5">
                  <AvatarIllustrated nationId={artist.primaryNationId} size={22} name={artist.name} className="ring-1 ring-white/50" />
                  <span className="truncate text-xs font-semibold">{artist.name.split(' ')[0]}</span>
                </div>
                <div className="mt-1 line-clamp-2 text-[11px] opacity-90" style={{ lineHeight: 1.35 }}>
                  {r.caption}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] font-mono opacity-80">
                  <span className="flex items-center gap-0.5"><Heart size={10} aria-hidden /> {formatCount(r.likes)}</span>
                  <span>·</span>
                  <span>{formatCount(r.views)} views</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
