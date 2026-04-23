import { getCurrentUser } from '@/lib/auth';
import { FeedArtist } from '@/components/feed/FeedArtist';
import { FeedAdviser } from '@/components/feed/FeedAdviser';
import { FeedAudience } from '@/components/feed/FeedAudience';
import { FeedOrg } from '@/components/feed/FeedOrg';
import { FeedAdmin } from '@/components/feed/FeedAdmin';

export default async function FeedPage() {
  const user = await getCurrentUser();

  if (user.role === 'adviser') return <FeedAdviser user={user} />;
  if (user.role === 'org') return <FeedOrg user={user} />;
  if (user.role === 'admin') return <FeedAdmin user={user} />;
  if (user.role === 'audience' || user.role === 'collector')
    return <FeedAudience user={user} />;
  return <FeedArtist user={user} />;
}
