import Link from 'next/link';
import { getArtistById, getNation, type HydratedPost } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { VerifiedBadge, ElderBadge, TapuIndicator, RoleBadge } from '@/components/cultural/Badges';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { formatCount, timeAgo } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function PostCard({ post }: { post: HydratedPost }) {
  const artist = getArtistById(post.authorId);
  if (!artist) return null;
  const nation = getNation(post.nationId);

  return (
    <article
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <header className="flex items-center gap-3 px-4 py-3">
        <Link href={`/artist/${artist.handle}`}>
          <AvatarIllustrated nationId={artist.primaryNationId} size={40} name={artist.name} />
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
      </header>

      <PostMedia post={post} nationPatternId={nation?.patternId ?? 'pattern-tapa'} />

      <div className="px-4 pb-3 pt-4">
        {post.captionLang !== 'en' && (
          <div
            className="mb-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--ink-soft)' }}
          >
            In {nation?.name ?? post.captionLang}
          </div>
        )}
        <p className="font-editorial text-[17px] leading-snug" style={{ color: 'var(--ink)' }}>
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
      </div>

      <footer className="flex items-center gap-5 border-t px-4 py-3 text-sm" style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}>
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
        <div className="border-t px-4 py-3" style={{ borderColor: 'var(--hairline)' }}>
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

function PostMedia({
  post,
  nationPatternId,
}: {
  post: HydratedPost;
  nationPatternId: string;
}) {
  if (post.mediaType === 'audio') {
    return (
      <CulturalPattern id={nationPatternId} opacity={0.12} tone="brand" className="aspect-[16/9]">
        <div className="flex aspect-[16/9] items-center justify-center">
          <div
            className="rounded-full px-5 py-3 text-sm font-semibold"
            style={{ background: 'var(--surface)', color: 'var(--ink)', boxShadow: 'var(--shadow-md)' }}
          >
            ▶ Audio · {Math.floor((post.durationSec ?? 0) / 60)}:
            {((post.durationSec ?? 0) % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </CulturalPattern>
    );
  }

  const isVideo = post.mediaType === 'video';
  return (
    <CulturalPattern
      id={nationPatternId}
      opacity={isVideo ? 0.18 : 0.14}
      size={64}
      tone="brand"
      className="aspect-[4/3] border-y"
    >
      <div className="relative flex aspect-[4/3] items-end justify-start p-5" style={{ borderColor: 'var(--hairline)' }}>
        {isVideo && post.durationSec !== null && (
          <div
            className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px] font-semibold"
            style={{ background: 'rgba(0,0,0,0.65)', color: 'white' }}
          >
            ▶ {Math.floor((post.durationSec ?? 0) / 60)}:
            {((post.durationSec ?? 0) % 60).toString().padStart(2, '0')}
          </div>
        )}
        <div
          className="max-w-lg rounded-md px-4 py-3 font-editorial italic"
          style={{
            background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
            color: 'var(--ink-muted)',
            backdropFilter: 'blur(4px)',
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          {post.artform}
        </div>
      </div>
    </CulturalPattern>
  );
}
