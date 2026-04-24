import Link from 'next/link';
import { getArtistById, getNation, getWorkById, type HydratedPost } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { VerifiedBadge, ElderBadge, TapuIndicator, RoleBadge, InatiBadge } from '@/components/cultural/Badges';
import { formatPrice, timeAgo } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { postImageUrl, workImageUrl } from '@/lib/images';
import { PostActions } from './PostActions';
import { userLikedPostIds, userSavedPostIds } from '@/lib/repo';
import { getCurrentUser } from '@/lib/auth';

export async function PostCard({ post }: { post: HydratedPost }) {
  const artist = getArtistById(post.authorId);
  if (!artist) return null;
  const nation = getNation(post.nationId);

  const viewer = await getCurrentUser();
  const likedSet = userLikedPostIds(viewer.id);
  const savedSet = userSavedPostIds(viewer.id);
  const liked = likedSet.has(post.id);
  const saved = savedSet.has(post.id);

  const hashtagSeeds = extractHashtags(post.caption, post.captionTranslation);

  return (
    <article
      className="rounded-2xl border overflow-hidden transition-shadow hover:shadow-lg"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <header className="flex items-center gap-3 px-5 py-4">
        <Link href={`/artist/${artist.handle}`}>
          <AvatarIllustrated nationId={artist.primaryNationId} size={44} name={artist.name} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href={`/artist/${artist.handle}`}
              className="truncate font-semibold hover:underline"
            >
              {artist.name}
            </Link>
            {artist.verified && <VerifiedBadge />}
            {artist.elderStatus && <ElderBadge />}
            <RoleBadge role={artist.role} />
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
            <NationBadge nationId={artist.primaryNationId} size="xs" />
            <span>·</span>
            <span className="font-mono">{timeAgo(post.createdAt)}</span>
            {post.tapu && (
              <>
                <span>·</span>
                <TapuIndicator />
              </>
            )}
          </div>
        </div>
        <button
          className="rounded-md p-2 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
          aria-label="Post menu"
        >
          <Icon name="more-horizontal" size={18} />
        </button>
      </header>

      <PostMedia post={post} authorName={artist.name} />

      <div className="px-5 pb-3 pt-4">
        {post.captionLang !== 'en' && (
          <div
            className="mb-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--ink-soft)' }}
          >
            In {nation?.name ?? post.captionLang}
          </div>
        )}
        <p
          lang={post.captionLang || undefined}
          className="font-editorial text-[18px] leading-snug"
          style={{ color: 'var(--ink)' }}
        >
          {post.caption}
        </p>
        {post.captionTranslation && (
          <p
            className="mt-2 text-sm italic"
            style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}
          >
            {post.captionTranslation}
          </p>
        )}
        {post.collaboratorHandles.length > 0 && (
          <p className="mt-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
            with{' '}
            {post.collaboratorHandles.map((h, i) => (
              <span key={h}>
                <Link href={`/artist/${h}`} className="font-semibold hover:underline">
                  @{h}
                </Link>
                {i < post.collaboratorHandles.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}

        {hashtagSeeds.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hashtagSeeds.map((tag) => (
              <Link
                key={tag}
                href={`/explore?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border px-2 py-0.5 text-xs font-medium transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {post.linkedWorkId && <ShopCard workId={post.linkedWorkId} />}
      </div>

      <PostActions
        postId={post.id}
        initialLikes={post.likes}
        initialComments={post.comments}
        initialShares={post.shares}
        initialSaves={post.saves}
        initiallyLiked={liked}
        initiallySaved={saved}
      />

      {post.commentsData.length > 0 && (
        <div className="border-t px-5 py-3" style={{ borderColor: 'var(--hairline)' }}>
          {post.commentsData.slice(0, 3).map((c, i) => (
            <div key={i} className="flex gap-2 py-1 text-sm">
              <Link href={`/artist/${c.authorHandle}`} className="font-semibold hover:underline">
                @{c.authorHandle}
              </Link>
              {c.elderMark && (
                <span className="font-bold" style={{ color: 'var(--accent-gold)' }} aria-label="Elder mark">
                  ✦
                </span>
              )}
              <span style={{ color: 'var(--ink-muted)' }}>{c.text}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function PostMedia({ post, authorName }: { post: HydratedPost; authorName: string }) {
  const img = postImageUrl({
    artform: post.artform,
    nationId: post.nationId,
    caption: post.caption,
    mediaType: post.mediaType as 'image' | 'video' | 'audio' | 'gallery',
    seed: post.id,
  });
  const isVideo = post.mediaType === 'video';
  const isAudio = post.mediaType === 'audio';
  const altText = `${post.artform} ${isVideo ? 'video' : isAudio ? 'audio' : 'work'} by ${authorName}`;

  return (
    <div className="relative aspect-[4/3] bg-[color:var(--surface-2)] overflow-hidden">
      <img
        src={img}
        alt={altText}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {(isVideo || isAudio) && post.durationSec !== null && post.durationSec !== undefined && (
        <div
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}
          aria-hidden
        >
          {isVideo ? '▶' : '♪'} {Math.floor((post.durationSec ?? 0) / 60)}:
          {((post.durationSec ?? 0) % 60).toString().padStart(2, '0')}
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-3 left-4 font-editorial italic text-white/90 text-sm"
        aria-hidden
      >
        {post.artform}
      </div>
    </div>
  );
}

function ShopCard({ workId }: { workId: string }) {
  const work = getWorkById(workId);
  if (!work) return null;
  const img = workImageUrl({
    artform: work.artform,
    nationId: work.nationId,
    materials: work.materials,
    seed: work.id,
    w: 240,
    h: 240,
  });
  return (
    <Link
      href={`/market/${work.id}`}
      className="mt-4 flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_4%,transparent)]"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
    >
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <img src={img} alt={work.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            K
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Shop · this post
          </span>
        </div>
        <div className="truncate text-sm font-semibold">{work.title}</div>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
          <span className="font-mono font-semibold" style={{ color: 'var(--ink)' }}>
            {formatPrice(work.priceNzd)}
          </span>
          <InatiBadge size="xs" />
        </div>
      </div>
      <Icon name="chevron-right" size={16} />
    </Link>
  );
}

function extractHashtags(caption: string, translation?: string | null): string[] {
  const text = [caption, translation ?? ''].join(' ');
  const explicit = [...text.matchAll(/#([a-zA-Z0-9_āēīōūĀĒĪŌŪʻ]+)/g)].map((m) => m[1]);
  if (explicit.length) return Array.from(new Set(explicit)).slice(0, 5);
  // If the post has no explicit hashtags, infer from artform + key nouns.
  const candidates = new Set<string>();
  const artformTag = caption.toLowerCase();
  const known = ['siapo', 'ngatu', 'kapa', 'masi', 'tīvaevae', 'bilum', 'tatau', 'whakairo', 'hiapo', 'pasifika', 'māori', 'moana', 'inati'];
  for (const k of known) {
    if (artformTag.includes(k)) candidates.add(k);
  }
  return Array.from(candidates).slice(0, 4);
}
