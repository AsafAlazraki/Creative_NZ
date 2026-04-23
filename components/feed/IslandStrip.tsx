import Link from 'next/link';
import { getAllArtists, getNation, type HydratedArtist } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';

export function IslandStrip({ nationIds }: { nationIds: string[] }) {
  const all = getAllArtists().filter(
    (a) => a.role === 'artist' && nationIds.includes(a.primaryNationId),
  );

  if (!all.length) return null;

  return (
    <section
      className="mb-6 overflow-x-auto scrollbar-none"
      aria-label="Artists from your islands"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          Your islands
        </h2>
        <Link href="/explore" className="text-xs font-semibold hover:underline">
          See all →
        </Link>
      </div>
      <div className="flex gap-3 pb-2">
        {all.slice(0, 8).map((a) => (
          <IslandCard key={a.id} artist={a} />
        ))}
      </div>
    </section>
  );
}

function IslandCard({ artist }: { artist: HydratedArtist }) {
  const nation = getNation(artist.primaryNationId);
  return (
    <Link
      href={`/artist/${artist.handle}`}
      className="shrink-0 flex flex-col items-center gap-2 rounded-xl border p-3 transition-transform hover:-translate-y-0.5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', width: 120 }}
    >
      <AvatarIllustrated nationId={artist.primaryNationId} size={64} name={artist.name} />
      <div className="text-center">
        <div className="line-clamp-1 text-xs font-semibold">{artist.name.split(' ')[0]}</div>
        <div className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>
          {nation?.flag} {nation?.name.split(' ')[0]}
        </div>
      </div>
    </Link>
  );
}
