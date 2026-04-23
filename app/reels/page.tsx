import { db } from '@/db';
import * as s from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getArtistById, getNation } from '@/lib/repo';
import { hydratePost } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { proverbOfTheDay } from '@/lib/tauhi-va-kb';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Reels · KavaWorks' };

export default async function ReelsPage() {
  const rows = db.select().from(s.posts).where(eq(s.posts.mediaType, 'video')).all();
  const videos = rows.map(hydratePost);
  const proverb = proverbOfTheDay(Date.now());

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Reels
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Short videos from the studio.</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => {
          const artist = getArtistById(v.authorId);
          const nation = getNation(v.nationId);
          if (!artist) return null;

          return (
            <div key={v.id} className="contents">
              <article
                className="overflow-hidden rounded-xl border"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <CulturalPattern
                  id={nation?.patternId ?? 'pattern-tapa'}
                  opacity={0.18}
                  tone="brand"
                  size={64}
                  className="aspect-[9/16] border-b"
                >
                  <div className="relative flex aspect-[9/16] items-end justify-between p-4">
                    <div
                      className="flex items-center gap-1 rounded-full px-2 py-1 font-mono text-xs font-semibold"
                      style={{ background: 'rgba(0,0,0,0.55)', color: 'white' }}
                    >
                      <Icon name="film" size={12} /> {Math.floor((v.durationSec ?? 0) / 60)}:
                      {((v.durationSec ?? 0) % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </CulturalPattern>
                <div className="p-4">
                  <Link href={`/artist/${artist.handle}`} className="flex items-center gap-2">
                    <AvatarIllustrated nationId={artist.primaryNationId} size={28} name={artist.name} />
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold">{artist.name}</div>
                      <NationBadge nationId={artist.primaryNationId} size="xs" />
                    </div>
                  </Link>
                  <p className="mt-3 line-clamp-3 text-sm font-editorial italic" style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}>
                    {v.caption}
                  </p>
                </div>
              </article>
              {(i + 1) % 5 === 0 && (
                <div
                  className="rounded-xl border p-5 md:col-span-2 lg:col-span-3"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
                >
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Take a breath
                  </div>
                  <p
                    className="mt-2 font-editorial italic"
                    style={{ color: 'var(--ink)', fontSize: 18, lineHeight: 1.5 }}
                  >
                    "{proverb.text}"
                  </p>
                  <p className="mt-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
                    {proverb.language} · {proverb.meaning}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
