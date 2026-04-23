import type { HydratedArtist } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import type { CurrentUser } from '@/lib/auth';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { RoleBadge, VerifiedBadge } from '@/components/cultural/Badges';

export function ProfileAdviser({
  artist,
  viewer: _viewer,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
}) {
  const nation = getNation(artist.primaryNationId);
  return (
    <div>
      <CulturalPattern
        id={nation?.patternId ?? 'pattern-koula'}
        opacity={0.14}
        tone="brand"
        size={64}
        className="min-h-[240px] border-b"
      >
        <div className="flex min-h-[240px] flex-col justify-end px-4 py-6 lg:px-10">
          <div className="flex items-center gap-4">
            <AvatarIllustrated nationId={artist.primaryNationId} size={88} name={artist.name} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-3xl font-semibold">{artist.name}</h1>
                {artist.verified && <VerifiedBadge />}
                <RoleBadge role="adviser" />
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                @{artist.handle} · {artist.city}
              </p>
            </div>
          </div>
        </div>
      </CulturalPattern>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 lg:px-10">
        <section>
          <h2 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            About
          </h2>
          <p className="font-editorial text-lg" style={{ color: 'var(--ink)', lineHeight: 1.6 }}>
            {artist.bio}
          </p>
          <div className="mt-6 font-editorial text-base" style={{ color: 'var(--ink-muted)', lineHeight: 1.6 }}>
            {artist.statement.split('\n\n').map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>
        </section>

        {artist.expertise && artist.expertise.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {artist.expertise.map((e) => (
                <span
                  key={e}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
                >
                  {e}
                </span>
              ))}
            </div>
          </section>
        )}

        {(artist as unknown as { officeHours?: string }).officeHours && (
          <section
            className="rounded-xl border p-5"
            style={{
              borderColor: 'color-mix(in srgb, var(--accent-coral) 35%, transparent)',
              background: 'color-mix(in srgb, var(--accent-coral) 4%, transparent)',
            }}
          >
            <h2 className="mb-1 font-display text-lg font-semibold">Office hours</h2>
            <p style={{ color: 'var(--ink-muted)' }}>
              {(artist as unknown as { officeHours?: string }).officeHours}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
