import Link from 'next/link';
import { getArtistById, getNation, type HydratedPost } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { VerifiedBadge, ElderBadge, TapuIndicator, RoleBadge } from '@/components/cultural/Badges';
import { formatCount, timeAgo } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { postImageUrl } from '@/lib/images';

export function PostCard({ post }: { post: HydratedPost }) {
  const artist = getArtistById(post.authorId);
  if (!artist) return null;
  const nation = getNation(post.nationId);

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

      <PostMedia post={post} />

      <div className="px-5 pb-3 pt-4">
        {post.captionLang !== 'en' && (
          <div
            className="mb-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--ink-soft)' }}
          >
            In {nation?.name ?? post.captionLang}
          </div>
        )}
        <p className="font-editorial text-[18px] leading-snug" style={{ color: 'var(--ink)' }}>
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
      </div>

      <footer className="flex items-center gap-5 border-t px-5 py-3 text-sm" style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}>
        <button
          className="flex items-center gap-1.5 transition-colors hover:text-[color:var(--brand)]"
          aria-label="Honour"
        >
          <Icon name="heart" size={16} />
          <span className="font-mono">{formatCount(post.likes)}</span>
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-[color:var(--ink)]"
          aria-label="Comments"
        >
          <Icon name="message-circle" size={16} />
          <span className="font-mono">{formatCount(post.comments)}</span>
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-[color:var(--ink)]"
          aria-label="Share"
          title="Share with respect"
        >
          <Icon name="send" size={16} />
          <span className="font-mono">{formatCount(post.shares)}</span>
        </button>
        <button
          className="ml-auto flex items-center gap-1.5 hover:text-[color:var(--ink)]"
          aria-label="Keep"
          title="Keep"
        >
          <Icon name="bookmark" size={16} />
          <span className="font-mono">{formatCount(post.saves)}</span>
        </button>
      </footer>

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

function PostMedia({ post }: { post: HydratedPost }) {
  const img = postImageUrl({
    artform: post.artform,
    nationId: post.nationId,
    caption: post.caption,
    mediaType: post.mediaType as 'image' | 'video' | 'audio' | 'gallery',
    seed: post.id,
  });
  const isVideo = post.mediaType === 'video';
  const isAudio = post.mediaType === 'audio';

  return (
    <div className="relative aspect-[4/3] bg-[color:var(--surface-2)] overflow-hidden">
      <img
        src={img}
        alt={post.artform}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {(isVideo || isAudio) && post.durationSec !== null && post.durationSec !== undefined && (
        <div
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}
        >
          {isVideo ? '▶' : '♪'} {Math.floor((post.durationSec ?? 0) / 60)}:
          {((post.durationSec ?? 0) % 60).toString().padStart(2, '0')}
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
      />
      <div className="absolute bottom-3 left-4 font-editorial italic text-white/90 text-sm">
        {post.artform}
      </div>
    </div>
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
