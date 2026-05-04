'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { COOKIE_NAME, THEME_COOKIE, CULTURAL_COOKIE } from '@/lib/auth';

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
  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { and, eq } = await import('drizzle-orm');
  const existing = db
    .select()
    .from(s.follows)
    .where(and(eq(s.follows.followerId, follower), eq(s.follows.followeeId, followeeId)))
    .get();
  if (existing) {
    db.delete(s.follows)
      .where(and(eq(s.follows.followerId, follower), eq(s.follows.followeeId, followeeId)))
      .run();
  } else {
    db.insert(s.follows)
      .values({ followerId: follower, followeeId, createdAt: new Date().toISOString() })
      .run();
  }
  revalidatePath('/');
}

export async function toggleLike(postId: string, userId: string) {
  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { and, eq, sql } = await import('drizzle-orm');
  const existing = db
    .select()
    .from(s.likes)
    .where(and(eq(s.likes.userId, userId), eq(s.likes.postId, postId)))
    .get();
  if (existing) {
    db.delete(s.likes)
      .where(and(eq(s.likes.userId, userId), eq(s.likes.postId, postId)))
      .run();
    db.update(s.posts)
      .set({ likes: sql`MAX(likes - 1, 0)` })
      .where(eq(s.posts.id, postId))
      .run();
  } else {
    db.insert(s.likes)
      .values({ userId, postId, createdAt: new Date().toISOString() })
      .run();
    db.update(s.posts)
      .set({ likes: sql`likes + 1` })
      .where(eq(s.posts.id, postId))
      .run();
  }
  revalidatePath('/');
}

export async function toggleSave(workId: string, userId: string) {
  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { and, eq } = await import('drizzle-orm');
  const existing = db
    .select()
    .from(s.saves)
    .where(and(eq(s.saves.userId, userId), eq(s.saves.workId, workId)))
    .get();
  if (existing) {
    db.delete(s.saves)
      .where(and(eq(s.saves.userId, userId), eq(s.saves.workId, workId)))
      .run();
  } else {
    db.insert(s.saves)
      .values({ userId, workId, createdAt: new Date().toISOString() })
      .run();
  }
  revalidatePath('/');
}

/* -------------------------------------------------------------- */
/* Wired below: post saves, signOut, createPost, post comment */
/* -------------------------------------------------------------- */

export async function togglePostSave(postId: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { and, eq, sql } = await import('drizzle-orm');
  // Reuse the saves table — postId stored in workId column for the demo.
  // (For a real schema we'd add a separate post_saves table.)
  const id = `post:${postId}`;
  const existing = db
    .select()
    .from(s.saves)
    .where(and(eq(s.saves.userId, me.id), eq(s.saves.workId, id)))
    .get();
  if (existing) {
    db.delete(s.saves)
      .where(and(eq(s.saves.userId, me.id), eq(s.saves.workId, id)))
      .run();
    db.update(s.posts).set({ saves: sql`MAX(saves - 1, 0)` }).where(eq(s.posts.id, postId)).run();
  } else {
    db.insert(s.saves).values({ userId: me.id, workId: id, createdAt: new Date().toISOString() }).run();
    db.update(s.posts).set({ saves: sql`saves + 1` }).where(eq(s.posts.id, postId)).run();
  }
  revalidatePath('/');
  revalidatePath('/reels');
}

export async function togglePostLike(postId: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  await toggleLike(postId, me.id);
}

export async function togglePostFollow(handle: string) {
  const { getCurrentUser } = await import('@/lib/auth');
  const { getArtistByHandle } = await import('@/lib/repo');
  const me = await getCurrentUser();
  const target = getArtistByHandle(handle);
  if (!target || target.id === me.id) return;
  await toggleFollow(target.id, me.id);
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
  const linkedWork = String(formData.get('linkedWork') ?? '').trim() || null;
  const type = String(formData.get('type') ?? 'image');
  if (!caption && type !== 'listing') return;

  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const id = `post_local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  db.insert(s.posts)
    .values({
      id,
      authorId: me.id,
      mediaType: type === 'short' || type === 'long' ? 'video' : type === 'audio' ? 'audio' : 'image',
      mediaRef: id,
      posterRef: null,
      durationSec: type === 'short' ? 45 : type === 'long' ? 240 : type === 'audio' ? 120 : null,
      caption: caption || `New ${artform} listing`,
      captionLang: lang,
      captionTranslation: null,
      tapu: tapu ? true : false,
      nationId: me.primaryNationId,
      artform,
      collaboratorHandles: '[]',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      views: 0,
      commentsData: '[]',
      linkedWorkId: linkedWork,
    } as typeof s.posts.$inferInsert)
    .run();
  revalidatePath('/');
  redirect('/');
}

export async function updateProfile(formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const bio = String(formData.get('bio') ?? '').trim();
  const statement = String(formData.get('statement') ?? '').trim();
  const city = String(formData.get('city') ?? '').trim();
  const artformsRaw = String(formData.get('artforms') ?? '').trim();
  const artforms = artformsRaw
    ? JSON.stringify(artformsRaw.split(',').map((a) => a.trim()).filter(Boolean))
    : undefined;

  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { eq } = await import('drizzle-orm');
  const updates: Partial<typeof s.artists.$inferInsert> = {};
  if (bio) updates.bio = bio;
  if (statement) updates.statement = statement;
  if (city) updates.city = city;
  if (artforms) updates.artforms = artforms;
  if (Object.keys(updates).length) {
    db.update(s.artists).set(updates).where(eq(s.artists.id, me.id)).run();
  }
  revalidatePath(`/artist/${me.handle}`);
  redirect(`/artist/${me.handle}`);
}

export async function requestGroupJoin(groupId: string) {
  // Demo: just revalidate — in production this would insert a join_requests row
  revalidatePath(`/groups/${groupId}`);
}

export async function addComment(postId: string, formData: FormData) {
  const { getCurrentUser } = await import('@/lib/auth');
  const me = await getCurrentUser();
  const text = String(formData.get('text') ?? '').trim();
  if (!text) return;
  const { db } = await import('@/db');
  const s = await import('@/db/schema');
  const { eq, sql } = await import('drizzle-orm');
  const row = db.select().from(s.posts).where(eq(s.posts.id, postId)).get();
  if (!row) return;
  const list = JSON.parse(row.commentsData ?? '[]') as Array<{
    authorHandle: string;
    text: string;
    createdAt: string;
    elderMark?: boolean;
  }>;
  list.push({
    authorHandle: me.handle,
    text,
    createdAt: new Date().toISOString(),
    elderMark: me.elderStatus,
  });
  db.update(s.posts)
    .set({
      commentsData: JSON.stringify(list),
      comments: sql`comments + 1`,
    })
    .where(eq(s.posts.id, postId))
    .run();
  revalidatePath('/');
}
