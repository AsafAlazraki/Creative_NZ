import type { CurrentUser } from '@/lib/auth';
import {
  getPosts,
  getArtistsByIds,
  getAllArtists,
} from '@/lib/repo';
import { GreetingStrip } from '@/components/cultural/GreetingStrip';
import { EditorialHero } from './EditorialHero';
import { IslandStrip } from './IslandStrip';
import { ShortsRail } from './ShortsRail';
import { PostCard } from './PostCard';
import { DropModule, GrantModule, PlatformNoteModule } from './InlineModules';
import { RightSidebar } from './RightSidebar';
import { MoanaOlaCard } from './MoanaOlaCard';
import { ComposerCard } from './ComposerCard';

export async function FeedArtist({ user }: { user: CurrentUser }) {
  const posts = getPosts({
    limit: 30,
    viewerNationIds: user.affiliations,
    viewerId: user.id,
  });
  const allArtists = getAllArtists();
  const featured =
    allArtists.find((a) => a.id === 'artist_001' && a.id !== user.id) ??
    allArtists.find((a) => a.role === 'artist' && a.id !== user.id)!;

  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_320px] lg:px-8">
      <div className="min-w-0">
        <GreetingStrip name={user.name} nationId={user.primaryNationId} />
        <ComposerCard user={user} />
        <ShortsRail />
        <MoanaOlaCard user={user} />
        <EditorialHero
          artist={featured}
          quote={featured.statement.split('\n\n')[0]?.slice(0, 180) ?? ''}
        />
        <div className="mt-6">
          <IslandStrip nationIds={user.affiliations} />
        </div>
        <div className="mt-6 flex flex-col gap-6">
          {posts.map((p, i) => (
            <div key={p.id}>
              <PostCard post={p} />
              {(i + 1) % 5 === 0 && (
                <div className="mt-6">
                  {(i / 5) % 3 === 0 ? (
                    <DropModule />
                  ) : (i / 5) % 3 === 1 ? (
                    <GrantModule />
                  ) : (
                    <PlatformNoteModule
                      note="Teu le vā. Every post you leave here tends the space between us. Thank you for being careful with it."
                      author="Matai Tuiʻi Alefaio · Elder"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <aside className="hidden lg:block">
        <RightSidebar user={user} />
      </aside>
    </div>
  );
}
