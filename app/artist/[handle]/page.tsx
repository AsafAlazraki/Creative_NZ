import { notFound } from 'next/navigation';
import {
  getArtistByHandle,
  getPostsByArtist,
  getWorksByArtist,
} from '@/lib/repo';
import { getCurrentUser } from '@/lib/auth';
import { ProfileEditorial } from '@/components/profile/ProfileEditorial';
import { ProfileOrg } from '@/components/profile/ProfileOrg';
import { ProfileAdviser } from '@/components/profile/ProfileAdviser';

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const artist = getArtistByHandle(handle);
  if (!artist) notFound();
  const viewer = await getCurrentUser();
  const posts = getPostsByArtist(artist.id, 6);
  const works = getWorksByArtist(artist.id);

  if (artist.role === 'org')
    return <ProfileOrg artist={artist} viewer={viewer} posts={posts} />;
  if (artist.role === 'adviser')
    return <ProfileAdviser artist={artist} viewer={viewer} />;
  return <ProfileEditorial artist={artist} viewer={viewer} posts={posts} works={works} />;
}
