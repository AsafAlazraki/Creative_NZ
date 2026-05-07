'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { HydratedArtist, HydratedPost, HydratedWork } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { VerifiedBadge, ElderBadge, InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';
import { postImageUrl, reelVideoUrl } from '@/lib/images';
import { formatCount, formatPrice } from '@/lib/utils';

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduce;
}

type Reel = {
  post: HydratedPost;
  artist: HydratedArtist;
  work: HydratedWork | null;
};

export function ReelsViewer({ reels }: { reels: Reel[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(i, reels.length - 1));
    el.scrollTo({
      top: target * el.clientHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        scrollToIndex(active + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        scrollToIndex(active - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reels.length, reduceMotion]);

  if (!reels.length) {
    return (
      <div className="flex h-[calc(100vh-160px)] items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <p className="font-display text-2xl">No shorts yet.</p>
          <p className="mt-2" style={{ color: 'var(--ink-muted)' }}>
            Be the first to share — open Create and pick Short.
          </p>
          <Link
            href="/create?type=short"
            className="mt-4 inline-block rounded-md px-5 py-2.5 font-semibold"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            Open Create
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      className={
        'relative h-[calc(100vh-56px)] w-full overflow-y-auto outline-none lg:h-[calc(100vh-64px)] ' +
        (reduceMotion ? '' : 'snap-y snap-mandatory')
      }
      style={{
        scrollSnapType: reduceMotion ? 'none' : 'y mandatory',
        overscrollBehaviorY: 'contain',
      }}
      onScroll={(e) => {
        const el = e.currentTarget;
        const idx = Math.round(el.scrollTop / el.clientHeight);
        if (idx !== active) setActive(idx);
      }}
      role="region"
      aria-label="Shorts feed"
      aria-roledescription="vertical reel viewer"
    >
      {reels.map((r, i) => (
        <ReelCard key={r.post.id} reel={r} isActive={i === active} reduceMotion={reduceMotion} />
      ))}

      {/* Counter pill */}
      <div className="pointer-events-none fixed right-4 top-20 z-50 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-mono font-semibold text-white backdrop-blur">
        <span className="sr-only">Reel </span>
        {active + 1} <span className="sr-only">of</span><span aria-hidden> / </span>{reels.length}
      </div>

      {/* Desktop nav arrows — overlaid on the right edge of the viewport */}
      <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          aria-label="Previous reel"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <Icon name="chevron-up" size={22} />
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === reels.length - 1}
          aria-label="Next reel"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <Icon name="chevron-down" size={22} />
        </button>
      </div>
    </div>
  );
}

function ReelCard({
  reel,
  isActive,
  reduceMotion,
}: {
  reel: Reel;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  const { post, artist, work } = reel;
  const isVideo = post.mediaType === 'video';
  const img = postImageUrl({
    artform: post.artform,
    nationId: post.nationId,
    caption: post.caption,
    mediaType: (post.mediaType as 'image' | 'video' | 'audio' | 'gallery'),
    seed: `reel-${post.id}`,
    w: 900,
    h: 1600,
  });
  const videoSrc = isVideo ? reelVideoUrl(post.id) : null;
  const altText = `${post.artform} ${isVideo ? 'short video' : 'post'} by ${artist.name}`;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause inactive videos so we don't have N tracks playing simultaneously,
  // and resume the active one. Network bandwidth + CPU savings.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 0;
      void v.play().catch(() => {/* autoplay may be blocked; user can tap */});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <section
      className={
        'relative flex h-full w-full items-center justify-center ' + (reduceMotion ? '' : 'snap-start snap-always')
      }
      aria-label={`Reel by ${artist.name}: ${post.caption.slice(0, 80)}`}
    >
      <div className="relative mx-auto flex h-full max-w-[min(500px,100%)] items-center justify-center overflow-hidden bg-black lg:my-3 lg:h-[calc(100%-1.5rem)] lg:max-w-[420px] lg:rounded-2xl" style={{ aspectRatio: '9/16' }}>
        {isVideo && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={img}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload={isActive ? 'auto' : 'metadata'}
            aria-label={altText}
          />
        ) : (
          <img
            src={img}
            alt={altText}
            className={'h-full w-full object-cover ' + (isActive ? 'ken-burns' : '')}
            loading={isActive ? 'eager' : 'lazy'}
            decoding="async"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Top meta */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              {post.mediaType === 'video' ? 'Short' : 'Post'}
            </span>
            {post.tapu && <TapuIndicator />}
          </div>
          {post.durationSec && post.durationSec > 0 && (
            <span className="font-mono text-xs font-semibold">
              {Math.floor(post.durationSec / 60)}:
              {(post.durationSec % 60).toString().padStart(2, '0')}
            </span>
          )}
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <Link
            href={`/artist/${artist.handle}`}
            className="flex items-center gap-2"
          >
            <AvatarIllustrated nationId={artist.primaryNationId} size={36} name={artist.name} className="ring-2 ring-white/40" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <span className="truncate">{artist.name}</span>
                {artist.verified && <VerifiedBadge />}
                {artist.elderStatus && <ElderBadge />}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/75">
                <NationBadge nationId={artist.primaryNationId} size="xs" />
                <span>·</span>
                <span>{post.artform}</span>
              </div>
            </div>
          </Link>

          <p
            lang={post.captionLang || undefined}
            className="mt-3 font-editorial italic"
            style={{ fontSize: 15, lineHeight: 1.45 }}
          >
            {post.caption}
          </p>
          {post.captionTranslation && post.captionLang !== 'en' && (
            <p className="mt-1 text-xs text-white/70" style={{ lineHeight: 1.45 }}>
              {post.captionTranslation}
            </p>
          )}

          {/* TikTok Shop-style product card */}
          {work && (
            <Link
              href={`/market/${work.id}`}
              className="mt-3 flex items-center gap-3 rounded-xl bg-white/95 p-2.5 text-[color:var(--ink)] shadow-lg backdrop-blur transition-transform hover:scale-[1.02]"
            >
              <div
                className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[color:var(--surface-2)]"
              >
                <img
                  src={postImageUrl({
                    artform: work.artform,
                    nationId: work.nationId,
                    caption: work.title,
                    mediaType: 'image',
                    seed: work.id,
                    w: 180,
                    h: 180,
                  })}
                  alt={work.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--brand)] text-[9px] font-bold text-white">K</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Shop
                  </span>
                </div>
                <div className="truncate text-sm font-semibold">{work.title}</div>
                <div className="flex items-baseline justify-between gap-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
                  <span className="font-mono font-semibold" style={{ color: 'var(--ink)' }}>
                    {formatPrice(work.priceNzd)}
                  </span>
                  <InatiBadge size="xs" />
                </div>
              </div>
              <Icon name="chevron-right" size={16} />
            </Link>
          )}
        </div>

        {/* Right-side action rail (TikTok style) */}
        <div className="absolute right-2 bottom-28 flex flex-col items-center gap-4 text-white lg:right-[-72px]">
          <ActionButton icon="heart" count={post.likes} label="Honour" />
          <ActionButton icon="message-circle" count={post.comments} label="Comment" />
          <ActionButton icon="bookmark" count={post.saves} label="Keep" />
          <ActionButton icon="send" count={post.shares} label="Share" />
        </div>
      </div>
    </section>
  );
}

function ActionButton({ icon, count, label }: { icon: string; count: number; label: string }) {
  return (
    <button
      className="group flex flex-col items-center gap-1"
      aria-label={label}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur transition-transform group-hover:scale-110 group-hover:bg-black/60 lg:bg-[color:var(--surface)]/90 lg:text-[color:var(--ink)] lg:backdrop-blur-none"
      >
        <Icon name={icon} size={18} />
      </span>
      <span className="font-mono text-[10px] font-semibold drop-shadow lg:text-[color:var(--ink-muted)] lg:drop-shadow-none">
        {formatCount(count)}
      </span>
    </button>
  );
}
