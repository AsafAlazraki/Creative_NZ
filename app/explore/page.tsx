import Link from 'next/link';
import { getNations, getAllArtists, getWorks } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { WorkCard } from '@/components/market/WorkCard';
import { AvatarIllustrated } from '@/components/cultural/Avatar';

export const metadata = { title: 'Explore · KavaWorks' };

export default async function ExplorePage() {
  const nations = getNations();
  const artists = getAllArtists().filter((a) => a.role === 'artist');
  const works = getWorks({ limit: 12 });

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Explore
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">This week in Pacific arts.</h1>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">By nation</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {nations.map((n) => {
            const count = artists.filter((a) => a.primaryNationId === n.id).length;
            return (
              <CulturalPattern
                key={n.id}
                id={n.patternId}
                opacity={0.14}
                tone="brand"
                size={40}
                className="overflow-hidden rounded-xl border"
              >
                <div
                  className="flex h-full min-h-[110px] flex-col justify-between p-3"
                  style={{ borderColor: 'var(--hairline)', background: 'color-mix(in srgb, var(--surface) 92%, transparent)' }}
                >
                  <div className="text-xl" aria-hidden>
                    {n.flag}
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold">{n.name.split(' ')[0]}</div>
                    <div className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>
                      {count} artist{count === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>
              </CulturalPattern>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Artists</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((a) => (
            <Link
              key={a.id}
              href={`/artist/${a.handle}`}
              className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <AvatarIllustrated nationId={a.primaryNationId} size={56} name={a.name} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{a.name}</div>
                <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                  {a.artforms.join(' · ')}
                </div>
                <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                  {a.city}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Trending works</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>
    </div>
  );
}
