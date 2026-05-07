import Link from 'next/link';
import { getDrops, getArtistById, getWorkById } from '@/lib/repo';
import { workImageUrl, heroAtmosphericUrl } from '@/lib/images';
import { CountdownClient } from '@/components/feed/CountdownClient';
import { Icon } from '@/components/ui/Icon';
import { formatPrice } from '@/lib/utils';

/**
 * Drops Zone — lives inside /market#drops.
 *
 * Shows one of three states for the current drop slot:
 *   A. Live    — full-bleed hero card with countdown + claim CTA
 *   B. Upcoming — compact teaser with thumbnail + countdown to open
 *   C. Quiet   — soft inline message ("the vā is quiet")
 *
 * Below that, an archive strip of past drops scrolls horizontally with
 * artwork covers. The whole section is the merged replacement for the
 * old standalone /drops route.
 */
export function DropsZone() {
  const drops = getDrops();
  const now = new Date();
  const live = drops.find((d) => new Date(d.opensAt) <= now && new Date(d.closesAt) > now);
  const upcoming = drops
    .filter((d) => new Date(d.opensAt) > now)
    .sort((a, b) => a.opensAt.localeCompare(b.opensAt))[0];
  const past = drops
    .filter((d) => new Date(d.closesAt) <= now)
    .sort((a, b) => b.closesAt.localeCompare(a.closesAt));

  return (
    <section id="drops" className="mb-12 scroll-mt-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
            Inati Drops
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Limited works, shared windows.
          </h2>
        </div>
        {past.length > 0 && (
          <a
            href="#drops-archive"
            className="hidden text-sm transition-colors sm:inline-block hover:underline"
            style={{ color: 'var(--ink-muted)' }}
          >
            View archive →
          </a>
        )}
      </div>

      {live ? (
        <LiveDropCard dropId={live.id} />
      ) : upcoming ? (
        <UpcomingDropCard dropId={upcoming.id} />
      ) : (
        <QuietState />
      )}

      {past.length > 0 && <ArchiveStrip dropIds={past.map((d) => d.id)} />}
    </section>
  );
}

function LiveDropCard({ dropId }: { dropId: string }) {
  const drop = getDrops().find((d) => d.id === dropId);
  if (!drop) return null;
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;

  const heroBg = heroAtmosphericUrl(work.artform, `drop-${drop.id}`, 1600, 900);
  const portraitImg = workImageUrl({ artform: work.artform, nationId: work.nationId, materials: work.materials, seed: work.id, w: 800, h: 1100 });
  const firstName = artist.name.split(' ')[0];

  return (
    <div className="relative overflow-hidden rounded-2xl text-white" style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--ink) 0%, color-mix(in srgb, var(--ink) 80%, transparent) 55%, transparent 100%)' }} />
      </div>

      <div className="relative grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Live now</span>
          </div>

          <div>
            <p className="mb-1 text-sm text-white/60">{artist.name} · {work.nationId}</p>
            <h3 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              {work.title}
            </h3>
            <p className="mt-3 max-w-lg text-base text-white/70" style={{ lineHeight: 1.5 }}>
              {drop.storyFraming.split('\n\n')[0]}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-white/50">Price</p>
              <p className="font-display text-2xl font-bold">{formatPrice(work.priceNzd)}</p>
              <p className="mt-0.5 text-xs text-white/50">95% → {firstName}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-white/50">Closes in</p>
              <CountdownClient target={drop.closesAt} />
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-white/50">Units</p>
              <p className="text-lg font-semibold">{drop.remainingUnits} <span className="text-sm font-normal text-white/60">left of {drop.totalUnits}</span></p>
            </div>
          </div>

          <Link
            href={`/market/${work.id}`}
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{ color: 'var(--ink)' }}
          >
            Claim this piece
            <Icon name="chevron-right" size={16} />
          </Link>
        </div>

        <div className="hidden overflow-hidden rounded-xl lg:block" style={{ aspectRatio: '3/4' }}>
          <img src={portraitImg} alt={work.title} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function UpcomingDropCard({ dropId }: { dropId: string }) {
  const drop = getDrops().find((d) => d.id === dropId);
  if (!drop) return null;
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;

  const thumb = workImageUrl({ artform: work.artform, nationId: work.nationId, materials: work.materials, seed: work.id, w: 240, h: 240 });

  return (
    <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl" style={{ background: 'var(--surface-2)' }}>
            <img src={thumb} alt={work.title} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>Next drop</p>
            <h3 className="font-display text-xl font-bold leading-tight">{work.title}</h3>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--ink-muted)' }}>by {artist.name} · {work.nationId}</p>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-col items-start sm:items-end">
          <p className="mb-1 text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-muted)' }}>Opens in</p>
          <CountdownClient target={drop.opensAt} />
        </div>
      </div>
    </div>
  );
}

function QuietState() {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border px-6 py-5 sm:gap-6 sm:px-8 sm:py-6"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: 'color-mix(in srgb, var(--ink) 6%, transparent)', color: 'var(--ink-muted)' }}
      >
        <Icon name="zap" size={20} />
      </div>
      <div>
        <p className="font-semibold" style={{ color: 'var(--ink)' }}>The vā is quiet.</p>
        <p className="mt-0.5 text-sm" style={{ color: 'var(--ink-muted)' }}>
          No drop live right now. Inati drops announce with little notice — follow an artist to be first to know.
        </p>
      </div>
    </div>
  );
}

function ArchiveStrip({ dropIds }: { dropIds: string[] }) {
  const drops = getDrops();
  return (
    <div id="drops-archive" className="mt-8 scroll-mt-6">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
        Past drops
      </p>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none">
        {dropIds.map((id) => {
          const drop = drops.find((d) => d.id === id);
          if (!drop) return null;
          const work = getWorkById(drop.workId);
          const artist = getArtistById(drop.artistId);
          if (!work || !artist) return null;
          const img = workImageUrl({ artform: work.artform, nationId: work.nationId, materials: work.materials, seed: work.id, w: 360, h: 480 });
          const sold = drop.totalUnits - drop.remainingUnits;
          return (
            <Link
              key={drop.id}
              href={`/market/${work.id}`}
              className="group relative h-52 w-44 flex-shrink-0 overflow-hidden rounded-xl"
              style={{ background: 'var(--surface-2)' }}
            >
              <img
                src={img}
                alt={work.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">Ended</p>
                <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-tight">{work.title}</p>
                <p className="mt-1 text-[11px] text-white/70">sold {sold} of {drop.totalUnits}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
