import Link from 'next/link';
import { getNations, getAllArtists, getWorks, getPosts, getArtistById } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { WorkCard } from '@/components/market/WorkCard';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { formatCount } from '@/lib/utils';
import { postImageUrl } from '@/lib/images';

export const metadata = { title: 'Explore · KavaWorks' };

function normaliseTag(t: string): string {
  return t.toLowerCase().replace(/^#/, '').trim();
}

function postMatchesTag(post: { caption: string; captionTranslation: string | null; artform: string; nationId: string }, tag: string) {
  const hay =
    `${post.caption} ${post.captionTranslation ?? ''} ${post.artform} ${post.nationId}`.toLowerCase();
  return hay.includes(tag);
}

function workMatchesTag(work: { title: string; description: string; artform: string; nationId: string; materials: string }, tag: string) {
  const hay =
    `${work.title} ${work.description} ${work.artform} ${work.nationId} ${work.materials}`.toLowerCase();
  return hay.includes(tag);
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: rawTag } = await searchParams;
  const tag = rawTag ? normaliseTag(rawTag) : null;

  const nations = getNations();
  const artists = getAllArtists().filter((a) => a.role === 'artist');
  const worksAll = getWorks({ limit: 40 });
  const postsAll = getPosts({ limit: 60 });

  const works = tag ? worksAll.filter((w) => workMatchesTag(w, tag)) : worksAll.slice(0, 12);
  const posts = tag ? postsAll.filter((p) => postMatchesTag(p, tag)) : [];
  const matchingArtists = tag
    ? artists.filter((a) => {
        const hay = `${a.name} ${a.artforms.join(' ')} ${a.primaryNationId} ${a.affiliations.join(' ')}`.toLowerCase();
        return hay.includes(tag);
      })
    : artists;

  const resultCount = tag ? works.length + posts.length + matchingArtists.length : 0;

  return (
    <div className="px-4 py-6 lg:px-10 xl:px-16">
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-soft)' }}>
          Explore
        </div>
        <h1
          className="mt-2 font-display font-semibold"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
        >
          {tag ? (
            <>
              #{tag}{' '}
              <span className="text-[color:var(--ink-muted)]" style={{ fontSize: '0.6em' }}>
                · {resultCount} result{resultCount === 1 ? '' : 's'}
              </span>
            </>
          ) : (
            'This week in Pacific arts.'
          )}
        </h1>
        <span className="theme-rule mt-3" />
      </header>

      {/* Tag cloud always visible so people can browse */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2">
          {HASHTAG_TRENDS.map((t) => {
            const plain = normaliseTag(t.tag);
            const active = tag === plain;
            return (
              <Link
                key={t.tag}
                href={active ? '/explore' : `/explore?tag=${encodeURIComponent(plain)}`}
                className="rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: active
                    ? 'var(--brand)'
                    : 'color-mix(in srgb, var(--brand) 6%, transparent)',
                  color: active ? 'var(--brand-ink)' : 'var(--ink-muted)',
                  border: `1px solid ${active ? 'var(--brand)' : 'var(--hairline)'}`,
                }}
              >
                #{plain}
              </Link>
            );
          })}
          {tag && !HASHTAG_TRENDS.some((t) => normaliseTag(t.tag) === tag) && (
            <span
              className="rounded-full px-3 py-1.5 text-sm font-semibold"
              style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
            >
              #{tag}
            </span>
          )}
        </div>
      </section>

      {tag && resultCount === 0 && (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <p className="font-display text-xl">Nothing matches #{tag} yet.</p>
          <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
            Try a different tag — or{' '}
            <Link href="/explore" className="underline">
              clear the filter
            </Link>
            .
          </p>
        </div>
      )}

      {!tag && (
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">By nation</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {nations.map((n) => {
              const count = artists.filter((a) => a.primaryNationId === n.id).length;
              return (
                <Link
                  key={n.id}
                  href={`/explore?tag=${encodeURIComponent(n.id)}`}
                  className="block"
                >
                  <CulturalPattern
                    id={n.patternId}
                    opacity={0.14}
                    tone="brand"
                    size={40}
                    className="overflow-hidden rounded-xl border transition-transform hover:-translate-y-0.5"
                  >
                    <div
                      className="flex h-full min-h-[120px] flex-col justify-between p-3"
                      style={{ background: 'color-mix(in srgb, var(--surface) 92%, transparent)' }}
                    >
                      <div className="text-2xl" aria-hidden>
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
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {matchingArtists.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">Artists</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {matchingArtists.map((a) => (
              <Link
                key={a.id}
                href={`/artist/${a.handle}`}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <AvatarIllustrated nationId={a.primaryNationId} size={52} name={a.name} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{a.name}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--ink-muted)' }}>
                    {a.artforms.join(' · ')}
                  </div>
                  <div className="text-xs truncate" style={{ color: 'var(--ink-muted)' }}>
                    {a.city}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">Posts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.slice(0, 12).map((p) => {
              const artist = getArtistById(p.authorId);
              if (!artist) return null;
              const img = postImageUrl({
                artform: p.artform,
                nationId: p.nationId,
                caption: p.caption,
                mediaType: p.mediaType as 'image' | 'video' | 'audio' | 'gallery',
                seed: p.id,
                w: 600,
                h: 750,
              });
              return (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-xl border"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <div className="relative aspect-[4/5]">
                    <img src={img} alt={p.artform} className="h-full w-full object-cover" loading="lazy" />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.7), transparent 45%)',
                      }}
                    />
                    <div className="absolute inset-x-3 bottom-3 text-white">
                      <div className="flex items-center gap-2 text-xs">
                        <AvatarIllustrated nationId={artist.primaryNationId} size={20} name={artist.name} />
                        <span className="font-semibold truncate">{artist.name.split(' ')[0]}</span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs italic" style={{ lineHeight: 1.4 }}>
                        {p.caption}
                      </p>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[10px] opacity-80">
                        <span>♡ {formatCount(p.likes)}</span>
                        <span>·</span>
                        <span>↻ {formatCount(p.shares)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold">
          {tag ? 'Works' : 'Trending works'}
        </h2>
        {works.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {works.map((w) => (
              <WorkCard key={w.id} work={w} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--ink-muted)' }}>Nothing in the marketplace matches this tag yet.</p>
        )}
      </section>
    </div>
  );
}
