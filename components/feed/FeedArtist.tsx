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
    <div className="grid grid-cols-1 px-4 py-6 lg:grid-cols-[1fr_340px] lg:px-0" style={{ gap: 0, borderLeft: 'none' }}>
      <div className="min-w-0 px-4 lg:px-7 pb-24" style={{ animation: 'page-fade 350ms ease' }}>
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
      <aside
        className="hidden lg:block px-5 pb-24 self-start"
        style={{ borderLeft: '1px solid var(--rule)', animation: 'page-fade 400ms ease', position: 'sticky', top: 0 }}
      >
        <div style={{ paddingTop: 24 }}>
          <RightSidebar user={user} />
        </div>
      </aside>
    </div>
  );
}
