import { db } from '@/db';
import * as s from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getArtistById, getWorkById, hydratePost } from '@/lib/repo';
import { ReelsViewer } from '@/components/reels/ReelsViewer';

export const metadata = { title: 'Shorts · KavaWorks' };

export default async function ReelsPage() {
  // Get all video + image posts — the vertical feed shows a mix,
  // TikTok-style. Video first, then images that are shoppable.
  const rows = db
    .select()
    .from(s.posts)
    .orderBy(s.posts.createdAt)
    .all()
    .filter((p) => p.mediaType === 'video' || p.linkedWorkId);
  const posts = rows.map(hydratePost);

  const reels = posts.map((p) => {
    const artist = getArtistById(p.authorId);
    const work = p.linkedWorkId ? getWorkById(p.linkedWorkId) : null;
    return { post: p, artist, work };
  }).filter((r) => r.artist);

  return <ReelsViewer reels={reels as Array<{ post: any; artist: any; work: any }>} />;
}
