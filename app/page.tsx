import { getCurrentUser } from '@/lib/auth';
import { FeedArtist } from '@/components/feed/FeedArtist';
import { FeedAdmin } from '@/components/feed/FeedAdmin';

export default async function FeedPage() {
  const user = await getCurrentUser();
  // Admin sees a separate feed-level banner + stats;
  // everyone else sees the same unified feed. Role-specific
  // affordances (adviser endorse, collector save, org roster) live
  // on the places they're relevant (profile, work detail, groups).
  if (user.role === 'admin') return <FeedAdmin user={user} />;
  return <FeedArtist user={user} />;
}
