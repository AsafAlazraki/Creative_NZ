import Link from 'next/link';
import type { HydratedArtist, HydratedPost } from '@/lib/repo';
import { getArtistsByIds, getNation } from '@/lib/repo';
import type { CurrentUser } from '@/lib/auth';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { RoleBadge, VerifiedBadge } from '@/components/cultural/Badges';

export function ProfileOrg({
  artist,
  viewer: _viewer,
  posts: _posts,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
  posts: HydratedPost[];
}) {
  const nation = getNation(artist.primaryNationId);
  const info = artist.orgInfo;
  const roster = getArtistsByIds(artist.lineage.teaches ?? []);

  return (
    <div>
      <CulturalPattern
        id={nation?.patternId ?? 'pattern-moana'}
        opacity={0.18}
        tone="brand"
        size={72}
        className="min-h-[280px] border-b"
      >
        <div className="flex min-h-[280px] flex-col justify-end px-4 py-6 lg:px-10">
          <div className="flex items-center gap-4">
            <AvatarIllustrated nationId={artist.primaryNationId} size={88} name={artist.name} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-semibold">{artist.name}</h1>
                {artist.verified && <VerifiedBadge />}
                <RoleBadge role="org" />
              </div>
              <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                {artist.city} · founded {info?.foundedYear ?? '—'}
              </p>
            </div>
          </div>
        </div>
      </CulturalPattern>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 lg:px-10">
        {info && (
          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Mission
            </h2>
            <p className="font-editorial text-lg" style={{ color: 'var(--ink)', lineHeight: 1.6 }}>
              {info.mission}
            </p>
          </section>
        )}

        {info && info.staff.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Staff
            </h2>
            <ul className="space-y-2 text-sm">
              {info.staff.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {roster.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Associated artists
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {roster.map((r) => (
                <Link
                  key={r.id}
                  href={`/artist/${r.handle}`}
                  className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <AvatarIllustrated nationId={r.primaryNationId} size={40} name={r.name} />
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                      {r.city}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {info && info.focus.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Focus
            </h2>
            <div className="flex flex-wrap gap-2">
              {info.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
                >
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
