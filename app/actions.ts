'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { COOKIE_NAME, THEME_COOKIE, CULTURAL_COOKIE } from '@/lib/auth';
import {
  toggleFollow as storeToggleFollow,
  toggleLike as storeToggleLike,
  toggleSave as storeToggleSave,
  addPost as storeAddPost,
  findArtistById,
  patchArtist,
  patchPost,
  findPostById,
  sendMessage as storeSendMessage,
} from '@/lib/store';

const ONE_YEAR = 60 * 60 * 24 * 365;

export async function switchPersona(personaId: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, personaId, { maxAge: ONE_YEAR, path: '/', sameSite: 'lax' });
  revalidatePath('/', 'layout');
}

export async function switchTheme(theme: 'light' | 'dark') {
  const jar = await cookies();
  jar.set(THEME_COOKIE, theme, { maxAge: ONE_YEAR, path: '/', sameSite: 'lax' });
  revalidatePath('/', 'layout');
}

export async function switchCulturalTheme(
  cultural: 'ula-fala' | 'moana' | 'tapa' | 'niu' | 'koula',
) {
  const jar = await cookies();
  jar.set(CULTURAL_COOKIE, cultural, { maxAge: ONE_YEAR, path: '/', sameSite: 'lax' });
  revalidatePath('/', 'layout');
}

export async function toggleFollow(followeeId: string, follower: string) {
  storeToggleFollow(follower, followeeId);
  revalidatePath('/');
}

export async function toggleLike(postId: string, userId: string) {
  storeToggleLike(userId, postId);
  revalidatePath('/');
}

export async function toggleSave(workId: string, userId: string) {
  storeToggleSave(userId, workId);
  revalidatePath('/');
}

export async function togglePostSave(postId: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const key = `post:${postId}`;
  storeToggleSave(me.id, key);
  revalidatePath('/');
  revalidatePath('/reels');
}

export async function togglePostLike(postId: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  storeToggleLike(me.id, postId);
  revalidatePath('/');
}

export async function togglePostFollow(handle: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const { getArtistByHandle } = await import('@/lib/repo');
  const me = await getCurrentUser();
  const target = getArtistByHandle(handle);
  if (!target || target.id === me.id) return;
  storeToggleFollow(me.id, target.id);
  revalidatePath(`/artist/${handle}`);
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  jar.delete(THEME_COOKIE);
  jar.delete(CULTURAL_COOKIE);
  revalidatePath('/', 'layout');
}

export async function createPost(formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const caption = String(formData.get('caption') ?? '').trim();
  const artform = String(formData.get('artform') ?? 'siapo');
  const lang = String(formData.get('lang') ?? 'en');
  const tapu = formData.get('tapu') === 'on';
  const linkedWork = String(formData.get('linkedWork') ?? '').trim() || undefined;
  const type = String(formData.get('type') ?? 'image');
  if (!caption && type !== 'listing') return;

  const id = `post_local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const mediaType =
    type === 'short' || type === 'long' ? 'video' : type === 'audio' ? 'audio' : 'image';

  storeAddPost({
    id,
    authorId: me.id,
    mediaType,
    mediaRef: id,
    durationSec: type === 'short' ? 45 : type === 'long' ? 240 : type === 'audio' ? 120 : undefined,
    caption: caption || `New ${artform} listing`,
    captionLang: lang,
    tapu,
    nationId: me.primaryNationId,
    artform,
    collaboratorHandles: [],
    createdAt: new Date().toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    views: 0,
    commentsData: [],
    linkedWorkId: linkedWork,
  });

  revalidatePath('/');
  redirect('/');
}

export async function addComment(postId: string, formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const text = String(formData.get('text') ?? '').trim();
  if (!text) return;

  const post = findPostById(postId);
  if (!post) return;

  post.commentsData.push({
    authorHandle: me.handle,
    text,
    createdAt: new Date().toISOString(),
    elderMark: me.elderStatus,
  });
  post.comments += 1;

  revalidatePath('/');
}

export async function updateProfile(formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const bio = String(formData.get('bio') ?? '').trim();
  const statement = String(formData.get('statement') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const artformsRaw = String(formData.get('artforms') ?? '').trim();
  const artforms = artformsRaw
    ? artformsRaw.split(',').map((a) => a.trim()).filter(Boolean)
    : undefined;

  patchArtist(me.id, {
    ...(bio && { bio }),
    ...(statement && { statement }),
    ...(city && { city }),
    ...(artforms && { artforms }),
  });

  revalidatePath(`/artist/${me.handle}`);
  redirect(`/artist/${me.handle}`);
}

export async function requestGroupJoin(groupId: string) {
  revalidatePath(`/groups/${groupId}`);
}

export async function sendMessageAction(conversationId: string, formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const body = String(formData.get('body') ?? '').trim();
  if (!body) return;
  storeSendMessage(conversationId, me.id, body);
  revalidatePath(`/messages`);
}
