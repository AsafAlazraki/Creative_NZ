import type { CurrentUser } from '@/lib/auth';
import { getPosts, getFollowedArtists, getWorks } from '@/lib/repo';
import { GreetingStrip } from '@/components/cultural/GreetingStrip';
import { PostCard } from './PostCard';
import { DropModule, GrantModule, PlatformNoteModule } from './InlineModules';
import { RightSidebar } from './RightSidebar';
import { IslandStrip } from './IslandStrip';
import Link from 'next/link';
import { AvatarIllustrated } from '@/components/cultural/Avatar';

export async function FeedAudience({ user }: { user: CurrentUser }) {
  const posts = getPosts({
    limit: 30,
    viewerNationIds: user.affiliations,
    viewerId: user.id,
  });
  const following = getFollowedArtists(user.id);

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:px-8">
      <div className="min-w-0">
        <GreetingStrip name={user.name} nationId={user.primaryNationId} />
        <section
          className="mb-6 rounded-xl border p-5"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Your subscriptions
          </div>
          <h2 className="mt-1 font-display text-lg font-semibold">
            {following.length} artist{following.length === 1 ? '' : 's'} you support
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {following.slice(0, 8).map((a) => (
              <Link
                key={a.id}
                href={`/artist/${a.handle}`}
                className="flex items-center gap-2 rounded-full border px-2 py-1 text-xs transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <AvatarIllustrated nationId={a.primaryNationId} size={20} name={a.name} />
                <span>{a.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </section>
        <IslandStrip nationIds={user.affiliations} />
        <div className="mt-6 flex flex-col gap-6">
          {posts.map((p, i) => (
            <div key={p.id}>
              <PostCard post={p} />
              {(i + 1) % 6 === 0 && (
                <div className="mt-6">
                  {(i / 6) % 2 === 0 ? <DropModule /> : <GrantModule />}
                </div>
              )}
            </div>
          ))}
          <PlatformNoteModule
            note="Inati means 95% of every marketplace sale goes directly to the artist you are supporting."
            author="KavaWorks team"
          />
        </div>
      </div>
      <aside className="hidden lg:block">
        <RightSidebar user={user} />
      </aside>
    </div>
  );
}
