import Link from 'next/link';
import type { HydratedArtist, HydratedPost, HydratedWork } from '@/lib/repo';
import { getNation } from '@/lib/repo';
import type { CurrentUser } from '@/lib/auth';
import { CulturalRail } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import {
  VerifiedBadge,
  ElderBadge,
  ManaBadge,
} from '@/components/cultural/Badges';
import { heroImageUrl, portraitImageUrl } from '@/lib/images';
import { WorkCard } from '@/components/market/WorkCard';
import { PostCard } from '@/components/feed/PostCard';
import { FollowButton } from './FollowButton';
import { SupportButton } from './SupportButton';
import { ShareButton } from './ShareButton';
import { formatPrice, formatCount } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { userFollowsHandle } from '@/lib/repo';

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
        <ProfileCover artist={artist} />
        <ProfileIdentity artist={artist} viewer={viewer} isSelf={isSelf} />
        <StatsRibbon artist={artist} />
        <ProfileActions artist={artist} viewer={viewer} isSelf={isSelf} />

        <div className="mx-auto max-w-5xl px-4 pb-16 pt-2 lg:px-10">
          {isAdviser && !isSelf && (
            <div
              className="mb-8 rounded-xl border p-4"
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

          <section className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0 space-y-12">
              <ArtistStatement statement={artist.statement} />

              {artist.lineage && Object.keys(artist.lineage).length > 0 && (
                <LineageSentence lineage={artist.lineage} />
              )}

              {works.length > 0 && (
                <section>
                  <div className="mb-4 flex items-baseline justify-between border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
                    <h2 className="font-display text-lg font-bold">Works</h2>
                    <Link
                      href={`/market?artist=${artist.handle}`}
                      className="text-sm hover:underline"
                      style={{ color: 'var(--ink-muted)' }}
                    >
                      All works →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {works.slice(0, 6).map((w) => (
                      <WorkCard key={w.id} work={w} />
                    ))}
                  </div>
                </section>
              )}

              {artist.subscriptionTiers.length > 0 && (
                <section>
                  <div className="mb-1 border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
                    <h2 className="font-display text-lg font-bold">Support {artist.name.split(' ')[0]}</h2>
                  </div>
                  <p className="mb-4 mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
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
                        <SupportButton artistName={artist.name} tier={t} />
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {posts.length > 0 && (
                <section>
                  <div className="mb-4 border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
                    <h2 className="font-display text-lg font-bold">Recent posts</h2>
                  </div>
                  <div className="flex flex-col gap-6">
                    {posts.slice(0, 3).map((p) => (
                      <PostCard key={p.id} post={p} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <QuickFacts artist={artist} />

              {artist.awards.length > 0 && (
                <section
                  className="rounded-2xl border p-5"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
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
                  className="rounded-2xl border p-5"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
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

/**
 * Cover — full-bleed editorial header. Image fades into the page bg
 * via a bottom gradient so the avatar overlap below reads cleanly.
 */
function ProfileCover({ artist }: { artist: HydratedArtist }) {
  const nation = getNation(artist.primaryNationId);
  const heroTheme = `${artist.artforms[0] ?? 'Pacific art'}, ${nation?.name ?? 'Pacific'} tradition, studio space, editorial`;
  const heroImg = heroImageUrl(heroTheme, `${artist.id}-hero`, 1600, 900);

  return (
    <div className="relative h-64 w-full overflow-hidden lg:h-80" aria-hidden>
      <img src={heroImg} alt="" className="h-full w-full object-cover" loading="eager" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 25%, transparent) 60%, transparent 100%)',
        }}
      />
    </div>
  );
}

/**
 * Identity — avatar + name + handle, overlapping the bottom of the
 * cover. Per the brief: avatar ~88px, ringed in --bg so it visually
 * pops out of the cover image.
 */
function ProfileIdentity({
  artist,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
  isSelf: boolean;
}) {
  const nation = getNation(artist.primaryNationId);
  const portraitImg = portraitImageUrl(artist.name, artist.primaryNationId, 320, 320);

  return (
    <div className="relative -mt-14 px-4 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
          <div
            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full sm:h-28 sm:w-28"
            style={{
              boxShadow: '0 0 0 4px var(--bg)',
              background: 'var(--surface-2)',
            }}
          >
            <AvatarIllustrated nationId={artist.primaryNationId} size={112} name={artist.name} />
            <img
              src={portraitImg}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1
                className="font-display font-bold leading-tight break-words"
                style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', letterSpacing: '-0.02em', wordBreak: 'break-word' }}
              >
                {artist.name}
              </h1>
              <div className="flex items-center gap-1.5">
                {artist.verified && <VerifiedBadge />}
                {artist.elderStatus && <ElderBadge />}
              </div>
            </div>
            <p className="mt-1.5 text-sm" style={{ color: 'var(--ink-muted)' }}>
              <span className="font-mono">@{artist.handle}</span>
              <span className="mx-1.5" aria-hidden>·</span>
              <span aria-hidden>{nation?.flag}</span> {nation?.name}
              <span className="mx-1.5" aria-hidden>·</span>
              {artist.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stats ribbon — single horizontal strip, dividers between values.
 * Replaces the previous 5 separate bordered boxes that read as a UI
 * grid rather than a piece of editorial composition.
 */
function StatsRibbon({ artist }: { artist: HydratedArtist }) {
  const stats = [
    { value: formatCount(artist.followers), label: 'Followers' },
    { value: formatCount(artist.following), label: 'Following' },
    { value: formatCount(artist.postsCount), label: 'Posts' },
    { value: formatCount(artist.worksSold), label: 'Works sold' },
    { value: formatCount(artist.supporters), label: 'Supporters' },
  ];
  return (
    <div className="mt-6 px-4 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div
          className="flex items-stretch border-y"
          style={{ borderColor: 'color-mix(in srgb, var(--ink) 8%, transparent)' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center justify-center py-4"
              style={i > 0 ? { borderLeft: '1px solid color-mix(in srgb, var(--ink) 8%, transparent)' } : undefined}
            >
              <span className="font-display text-xl font-bold leading-none">{s.value}</span>
              <span
                className="mt-1.5 text-[10px] uppercase tracking-[0.18em]"
                style={{ color: 'var(--ink-muted)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Action bar — one primary (Follow / Edit profile if owner), two ghost
 * (Message + Share, or Analytics + Share). Per brief: replace 3
 * competing coloured buttons with a clear visual hierarchy.
 */
function ProfileActions({
  artist,
  viewer,
  isSelf,
}: {
  artist: HydratedArtist;
  viewer: CurrentUser;
  isSelf: boolean;
}) {
  return (
    <div className="mt-4 px-4 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap gap-2">
          {!isSelf && (
            <FollowButton
              handle={artist.handle}
              initiallyFollowing={userFollowsHandle(viewer.id, artist.id)}
              variant="primary"
            />
          )}
          {!isSelf && (
            <Link
              href={`/messages/${artist.handle}`}
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 15%, transparent)', color: 'var(--ink)' }}
            >
              <Icon name="message-circle" size={14} />
              Message
            </Link>
          )}
          {isSelf && (
            <Link
              href="/settings/profile"
              className="flex-1 sm:flex-none rounded-xl px-5 py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              <Icon name="edit-3" size={14} className="mr-1.5 inline" />
              Edit profile
            </Link>
          )}
          {isSelf && (
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 15%, transparent)', color: 'var(--ink)' }}
            >
              <Icon name="bar-chart-2" size={14} />
              Analytics
            </Link>
          )}
          <ShareButton handle={artist.handle} name={artist.name} variant="ghost" />
        </div>
      </div>
    </div>
  );
}

/**
 * Statement — first paragraph rendered as a serif pull quote, the
 * remainder as ordinary editorial prose. Replaces the previous "guess
 * which paragraph is short enough to be a quote" middle-paragraph
 * heuristic with something predictable.
 */
function ArtistStatement({ statement }: { statement: string }) {
  const paragraphs = statement.split('\n\n').filter(Boolean);
  const [first, ...rest] = paragraphs;
  return (
    <section>
      <div className="mb-4 border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
        <h2 className="font-display text-lg font-bold">Artist statement</h2>
      </div>
      {first && (
        <blockquote
          className="mt-4 border-l-2 pl-5 font-editorial italic leading-relaxed"
          style={{ borderColor: 'var(--brand)', color: 'var(--ink)', fontSize: 22 }}
        >
          &ldquo;{first}&rdquo;
        </blockquote>
      )}
      {rest.length > 0 && (
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Quick facts sidebar — icon-accented rows. Each row gets a 16px lucide
 * icon in the gutter; the label is small caps and the value is the
 * actual content.
 */
function QuickFacts({ artist }: { artist: HydratedArtist }) {
  const nation = getNation(artist.primaryNationId);
  const facts: { icon: string; label: string; value: string }[] = [
    { icon: 'palette', label: 'Artform', value: artist.artforms.join(' · ') },
    { icon: 'clock', label: 'Years active', value: `${artist.yearsActive} years` },
    { icon: 'map-pin', label: 'Primary island', value: nation?.name ?? '' },
  ];
  if (artist.affiliations.length > 1) {
    facts.push({
      icon: 'users',
      label: 'Affiliations',
      value: artist.affiliations.map((id) => getNation(id)?.name ?? id).join(' · '),
    });
  }
  facts.push({ icon: 'globe', label: 'City', value: artist.city });

  return (
    <section
      className="rounded-2xl border p-5"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ink-muted)' }}>
        Quick facts
      </h3>
      <div className="space-y-4">
        {facts.map((f) => (
          <div key={f.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--ink-muted)' }}>
              <Icon name={f.icon} size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-muted)' }}>
                {f.label}
              </p>
              <p className="mt-0.5 text-sm font-medium break-words" style={{ color: 'var(--ink)' }}>
                {f.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
