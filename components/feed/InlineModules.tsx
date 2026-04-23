import Link from 'next/link';
import { getActiveDrop, getGrants, getArtistById, getWorkById } from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { Icon } from '@/components/ui/Icon';
import { CountdownClient } from './CountdownClient';

export function DropModule() {
  const drop = getActiveDrop();
  if (!drop) return null;
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;

  return (
    <Link
      href="/drops"
      className="block rounded-xl border p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inati-badge mb-2">Inati · 24-hour drop</div>
          <h3 className="font-display text-lg font-semibold">{work.title}</h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
            by {artist.name} · {drop.remainingUnits} of {drop.totalUnits} left
          </p>
        </div>
        <div className="text-right">
          <CountdownClient target={drop.closesAt} />
        </div>
      </div>
    </Link>
  );
}

export function GrantModule() {
  const grants = getGrants();
  const soon = grants
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .filter((x) => x.days > 0 && x.days < 60)
    .sort((a, b) => a.days - b.days)[0];
  if (!soon) return null;

  return (
    <Link
      href={`/grants/${soon.g.id}`}
      className="block rounded-xl border p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="flex items-center gap-3">
        <Icon name="award" size={20} className="shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Grant closing in {soon.days} days
          </div>
          <h3 className="font-display font-semibold">{soon.g.name}</h3>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
            {soon.g.amountDisplay} · {soon.g.funder}
          </p>
        </div>
        <Icon name="chevron-right" size={16} />
      </div>
    </Link>
  );
}

export function PlatformNoteModule({ note, author }: { note: string; author: string }) {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
    >
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        From {author}
      </div>
      <p
        className="mt-2 font-editorial italic"
        style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}
      >
        "{note}"
      </p>
    </div>
  );
}
