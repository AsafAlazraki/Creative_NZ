import Link from 'next/link';
import type { HydratedArtist, HydratedPost, HydratedWork } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import type { CurrentUser } from '@/lib/auth';
import { CulturalRail } from '@/components/cultural/CulturalPattern';
import { NationBadge } from '@/components/cultural/NationBadge';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import {
  VerifiedBadge,
  ElderBadge,
  ManaBadge,
} from '@/components/cultural/Badges';
import { heroImageUrl, portraitImageUrl } from '@/lib/images';
import { WorkCard } from '@/components/market/WorkCard';
import { PostCard } from '@/components/feed/PostCard';
import { formatPrice, formatCount } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function ProfileEditorial({
  artist,
  viewer,
  posts,
  works,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
  posts: HydratedPost[];
  works: HydratedWork[];
}) {
  const nation = getNation(artist.primaryNationId);
  const isSelf = artist.id === viewer.id;
  const isAdviser = viewer.role === 'adviser';

  return (
    <div className="relative flex">
      <CulturalRail id={nation?.patternId ?? 'pattern-tapa'} />
      <div className="min-w-0 flex-1">
        <ProfileHero artist={artist} viewer={viewer} isSelf={isSelf} />

        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-10">
          <StatsBar artist={artist} />

          {isAdviser && !isSelf && (
            <div
              className="mt-6 rounded-xl border p-4"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-coral) 40%, transparent)',
                background: 'color-mix(in srgb, var(--accent-coral) 6%, transparent)',
              }}
            >
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent-coral)' }}>
                Adviser actions
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="rounded-md border px-3 py-1.5 text-sm font-semibold" style={{ borderColor: 'var(--hairline)' }}>
                  Endorse application
                </button>
                <button className="rounded-md border px-3 py-1.5 text-sm font-semibold" style={{ borderColor: 'var(--hairline)' }}>
                  Add to caseload
                </button>
                <button className="rounded-md border px-3 py-1.5 text-sm font-semibold" style={{ borderColor: 'var(--hairline)' }}>
                  Recommend grant
                </button>
              </div>
            </div>
          )}

          <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0 space-y-10">
              <div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'var(--ink-soft)' }}
                >
                  Artist statement
                </div>
                <div className="mt-3 font-editorial text-lg leading-[1.6]" style={{ color: 'var(--ink)' }}>
                  {artist.statement.split('\n\n').map((para, i) => {
                    const total = artist.statement.split('\n\n').length;
                    const isQuoteCandidate =
                      total >= 4 && i === Math.floor(total / 2) && para.length < 240;
                    if (isQuoteCandidate) {
                      return (
                        <blockquote key={i} className="pull-quote my-6">
                          "{para}"
                        </blockquote>
                      );
                    }
                    return (
                      <p key={i} className="mb-5">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>

              {artist.lineage && Object.keys(artist.lineage).length > 0 && (
                <LineageSentence lineage={artist.lineage} />
              )}

              {works.length > 0 && (
                <section>
                  <h2 className="mb-4 font-display text-xl font-semibold">Works</h2>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {works.map((w) => (
                      <WorkCard key={w.id} work={w} />
                    ))}
                  </div>
                </section>
              )}

              {artist.subscriptionTiers.length > 0 && (
                <section>
                  <h2 className="mb-1 font-display text-xl font-semibold">Support {artist.name.split(' ')[0]}</h2>
                  <p className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
                    Monthly support — 95% of every payment goes directly to the artist. Inati.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {artist.subscriptionTiers.map((t) => (
                      <article
                        key={t.name}
                        className="rounded-xl border p-5"
                        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                      >
                        <div className="font-display text-lg font-semibold">{t.name}</div>
                        <div className="mt-1 font-mono text-2xl">
                          {formatPrice(t.priceNzd)}
                          <span className="text-sm font-normal" style={{ color: 'var(--ink-muted)' }}>
                            {' '}
                            / month
                          </span>
                        </div>
                        <ul className="mt-3 space-y-1.5 text-sm" style={{ color: 'var(--ink-muted)' }}>
                          {t.perks.map((p) => (
                            <li key={p} className="flex items-start gap-1.5">
                              <span aria-hidden>·</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="mt-4 w-full rounded-md px-4 py-2 font-semibold"
                          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                        >
                          Support {artist.name.split(' ')[0]}
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {posts.length > 0 && (
                <section>
                  <h2 className="mb-4 font-display text-xl font-semibold">Recent posts</h2>
                  <div className="flex flex-col gap-6">
                    {posts.slice(0, 3).map((p) => (
                      <PostCard key={p.id} post={p} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <section
                className="rounded-xl border p-4"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                  Quick facts
                </h3>
                <dl className="space-y-2 text-sm">
                  <Fact label="Artform" value={artist.artforms.join(' · ')} />
                  <Fact label="Years active" value={`${artist.yearsActive}`} />
                  <Fact label="Primary island" value={nation?.name ?? ''} />
                  {artist.affiliations.length > 1 && (
                    <Fact label="Affiliations" value={artist.affiliations.join(', ')} />
                  )}
                  <Fact label="City" value={artist.city} />
                </dl>
              </section>

              {artist.awards.length > 0 && (
                <section
                  className="rounded-xl border p-4"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Awards
                  </h3>
                  <ul className="space-y-3">
                    {artist.awards.map((a) => (
                      <li key={a.id}>
                        <ManaBadge
                          name={a.name}
                          year={a.year}
                          body={a.body}
                          amount={a.amount}
                          citation={a.citation}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {artist.exhibitions.length > 0 && (
                <section
                  className="rounded-xl border p-4"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Exhibitions
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {artist.exhibitions.map((e) => (
                      <li key={`${e.year}-${e.title}`}>
                        <div className="font-mono text-xs" style={{ color: 'var(--ink-soft)' }}>
                          {e.year}
                        </div>
                        <div className="font-semibold">{e.title}</div>
                        <div style={{ color: 'var(--ink-muted)' }}>
                          {e.venue} · {e.role}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProfileHero({
  artist,
  viewer: _viewer,
  isSelf,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
  isSelf: boolean;
}) {
  const nation = getNation(artist.primaryNationId);
  const heroTheme = `${artist.artforms[0] ?? 'Pacific art'}, ${nation?.name ?? 'Pacific'} tradition, studio space, editorial`;
  const heroImg = heroImageUrl(heroTheme, `${artist.id}-hero`, 2200, 900);
  const portraitImg = portraitImageUrl(artist.name, artist.primaryNationId, 400, 400);

  return (
    <header className="relative">
      <div className="relative min-h-[380px] border-b overflow-hidden xl:min-h-[480px]" style={{ borderColor: 'var(--hairline)' }}>
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(15,14,12,0.88) 0%, rgba(15,14,12,0.55) 55%, rgba(15,14,12,0.2) 100%)',
          }}
        />
        <div className="relative flex min-h-[380px] xl:min-h-[480px] flex-col justify-end px-4 py-8 lg:px-10 lg:py-12">
          <div className="flex items-end gap-5">
            <img
              src={portraitImg}
              alt={artist.name}
              width={128}
              height={128}
              className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-white/80 md:h-32 md:w-32 lg:h-36 lg:w-36"
              loading="eager"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2 text-white">
                <h1 className="font-display font-semibold leading-tight"
                    style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.02em' }}
                >
                  {artist.name}
                </h1>
                {artist.verified && <VerifiedBadge />}
                {artist.elderStatus && <ElderBadge />}
              </div>
              <div
                className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/85 lg:text-base"
              >
                <span className="font-mono">@{artist.handle}</span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden>{nation?.flag}</span>
                  <span>{nation?.name}</span>
                </span>
                <span aria-hidden>·</span>
                <span>{artist.city}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {!isSelf && (
              <button
                className="rounded-md px-5 py-2.5 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.02]"
                style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
              >
                Follow
              </button>
            )}
            {!isSelf && (
              <Link
                href={`/messages/${artist.handle}`}
                className="rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Message
              </Link>
            )}
            {isSelf && (
              <Link
                href="/analytics"
                className="rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Icon name="bar-chart-2" size={14} className="mr-1 inline" />
                Analytics
              </Link>
            )}
            <button
              className="rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsBar({ artist }: { artist: HydratedArtist }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <Stat label="Followers" value={formatCount(artist.followers)} />
      <Stat label="Following" value={formatCount(artist.following)} />
      <Stat label="Posts" value={formatCount(artist.postsCount)} />
      <Stat label="Works sold" value={formatCount(artist.worksSold)} />
      <Stat label="Supporters" value={formatCount(artist.supporters)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg border p-3 text-center"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="font-mono text-xl font-semibold">{value}</div>
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </dt>
      <dd className="mt-0.5" style={{ color: 'var(--ink)' }}>
        {value}
      </dd>
    </div>
  );
}

function LineageSentence({
  lineage,
}: {
  lineage: {
    apprenticedTo?: string;
    teaches?: string[];
    exhibitedWith?: string[];
  };
}) {
  const parts: React.ReactNode[] = [];
  if (lineage.apprenticedTo) {
    parts.push(
      <span key="a">
        Apprenticed to <em>{lineage.apprenticedTo}</em>
      </span>,
    );
  }
  if (lineage.teaches?.length) {
    parts.push(
      <span key="t">
        Teaches{' '}
        {lineage.teaches.map((t, i) => (
          <span key={t}>
            {t.includes(' ') ? t : <Link className="underline" href={`/artist/${t}`}>@{t}</Link>}
            {i < (lineage.teaches?.length ?? 0) - 1 && ', '}
          </span>
        ))}
      </span>,
    );
  }
  if (lineage.exhibitedWith?.length) {
    parts.push(
      <span key="e">
        Exhibited alongside{' '}
        {lineage.exhibitedWith.map((h, i) => (
          <span key={h}>
            <Link className="underline" href={`/artist/${h}`}>@{h}</Link>
            {i < (lineage.exhibitedWith?.length ?? 0) - 1 && ', '}
          </span>
        ))}
      </span>,
    );
  }
  if (!parts.length) return null;
  return (
    <section>
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        Lineage
      </div>
      <p className="mt-2 font-editorial text-lg" style={{ color: 'var(--ink)', lineHeight: 1.6 }}>
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 && '. '}
          </span>
        ))}
        .
      </p>
    </section>
  );
}
