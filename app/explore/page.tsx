import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';
import { getNations, getAllArtists, getPosts, getArtistById } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { VerifiedBadge } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';
import { postImageUrl } from '@/lib/images';
import { ExploreFilterBar } from '@/components/explore/ExploreFilterBar';

export const metadata = { title: 'Explore · KavaWorks' };

const CARD_LAYOUTS = ['hero', 'reg', 'reg', 'tall', 'reg', 'wide', 'reg', 'reg', 'tall', 'reg'] as const;

function getCardLayout(index: number): 'hero' | 'tall' | 'wide' | 'reg' {
  return CARD_LAYOUTS[index % CARD_LAYOUTS.length];
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ nation?: string; tag?: string }>;
}) {
  const { nation, tag } = await searchParams;
  const nations = getNations();
  const artists = getAllArtists().filter((a) => a.role === 'artist');
  const allPosts = getPosts({ limit: 60 });
  let posts = nation ? allPosts.filter((p) => p.nationId === nation) : allPosts;
  if (tag) {
    const t = tag.startsWith('#') ? tag.toLowerCase() : `#${tag.toLowerCase()}`;
    posts = posts.filter((p) => p.caption.toLowerCase().includes(t));
    if (posts.length < 8) posts = allPosts.slice(0, 24);
  }

  return (
    <div className="px-4 py-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p
            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            KavaWorks
          </p>
          <h1
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            Explore Pacific arts.
          </h1>
        </div>
        <p className="hidden max-w-xs text-right text-sm sm:block" style={{ color: 'var(--ink-muted)' }}>
          Posts, shorts, and works from artists across Te Moana-nui-a-Kiwa.
        </p>
      </div>

      {/* Artist story circles */}
      <div className="mb-5">
        <div
          className="flex gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {artists.slice(0, 12).map((a) => (
            <Link
              key={a.id}
              href={`/artist/${a.handle}`}
              className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  width: 64, height: 64, borderRadius: '50%', padding: 3,
                  background: 'linear-gradient(135deg, var(--moana), var(--coral), var(--whetu))',
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden', border: '2px solid var(--paper)',
                }}>
                  <AvatarIllustrated nationId={a.primaryNationId} size={54} name={a.name} />
                </div>
              </div>
              <span
                style={{
                  fontSize: 11, fontWeight: 500, color: 'var(--ink)',
                  maxWidth: 68, textAlign: 'center', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
              >
                {a.name.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Nation filter pills (client component for active state) */}
      <ExploreFilterBar nations={nations} activeNation={nation} />

      {/* Tag filter indicator */}
      {tag && (
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: 'var(--moana)', color: '#fff' }}>
            {tag.startsWith('#') ? tag : `#${tag}`}
          </span>
          <Link href="/explore" className="text-sm" style={{ color: 'var(--ink-muted)' }}>
            Clear ×
          </Link>
        </div>
      )}

      {/* Masonry grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 4,
          gridAutoFlow: 'dense',
        }}
      >
        {posts.map((post, i) => {
          const layout = getCardLayout(i);
          const artist = getArtistById(post.authorId);
          const isHero = layout === 'hero';
          const isTall = layout === 'tall';
          const isWide = layout === 'wide';

          const aspect = isHero ? '1/1' : isTall ? '2/3' : isWide ? '2/1' : '1/1';
          const img = postImageUrl({
            artform: post.artform,
            nationId: post.nationId,
            caption: post.caption,
            mediaType: post.mediaType as 'image' | 'video' | 'audio' | 'gallery',
            seed: post.id + i,
            w: isHero ? 800 : isWide ? 800 : 400,
            h: isHero ? 800 : isTall ? 600 : 400,
          });

          const gridStyle: React.CSSProperties = {
            borderRadius: 12,
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
          };
          if (isHero) { gridStyle.gridColumn = 'span 2'; gridStyle.gridRow = 'span 2'; }
          else if (isWide) { gridStyle.gridColumn = 'span 2'; }
          else if (isTall) { gridStyle.gridRow = 'span 2'; }

          return (
            <Link
              key={post.id + '_' + i}
              href={artist ? `/artist/${artist.handle}` : '/explore'}
              style={{ ...gridStyle, textDecoration: 'none' }}
              className="group"
            >
              <div
                style={{
                  position: 'relative', height: '100%',
                  minHeight: isHero ? 300 : isTall ? 300 : isWide ? 160 : 160,
                  background: 'var(--surface-2)',
                }}
              >
                <img
                  src={img}
                  alt={post.artform}
                  loading="lazy"
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  }}
                />

                {/* Artform label */}
                <div style={{
                  position: 'absolute', bottom: 8, left: 10,
                  fontSize: 10, fontStyle: 'italic', fontFamily: 'var(--font-editorial)',
                  color: 'rgba(255,255,255,0.7)', zIndex: 3,
                }}>
                  {post.artform}
                </div>

                {/* Video badge */}
                {post.mediaType === 'video' && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'rgba(0,0,0,0.7)', color: '#fff',
                    borderRadius: 99, padding: '3px 8px',
                    fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, zIndex: 3,
                  }}>▶</div>
                )}

                {/* Hover overlay */}
                <div
                  className="explore-overlay"
                  style={{
                    position: 'absolute', inset: 0, zIndex: 2,
                    background: 'rgba(14,16,20,0)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: isHero ? 20 : 12,
                    transition: 'background 200ms ease',
                  }}
                >
                  {artist && (
                    <div style={{ opacity: 0, transition: 'opacity 200ms ease' }} className="overlay-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <AvatarIllustrated nationId={artist.primaryNationId} size={isHero ? 32 : 22} name={artist.name} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <span style={{ color: '#fff', fontWeight: 600, fontSize: isHero ? 14 : 11 }}>
                              {artist.name.split(' ')[0]}
                            </span>
                            {artist.verified && <VerifiedBadge />}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, color: '#fff', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Heart size={10} aria-hidden /> {post.likes}
                        </span>
                        <span style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }}>
                          <MessageCircle size={10} aria-hidden /> {post.comments}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .group:hover .explore-overlay { background: rgba(14,16,20,0.65) !important; }
        .group:hover .overlay-content { opacity: 1 !important; }
        @media (hover: none) {
          .explore-overlay { background: rgba(14,16,20,0.45) !important; }
          .overlay-content { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
