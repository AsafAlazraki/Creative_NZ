import { getPosts, getArtistById, getWorkById } from '@/lib/repo';
import { ReelsViewer } from '@/components/reels/ReelsViewer';

export const metadata = { title: 'Shorts · KavaWorks' };

export default async function ReelsPage() {
  const posts = getPosts({ limit: 100 }).filter((p) => p.mediaType === 'video' || p.linkedWorkId);

  const reels = posts.map((p) => {
    const artist = getArtistById(p.authorId);
    const work = p.linkedWorkId ? getWorkById(p.linkedWorkId) : null;
    return { post: p, artist, work };
  }).filter((r) => r.artist);

  return <ReelsViewer reels={reels as Array<{ post: any; artist: any; work: any }>} />;
}
