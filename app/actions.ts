'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
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
  cultural:
    | 'ula-fala'
    | 'moana'
    | 'tapa'
    | 'niu'
    | 'koula'
    | 'ula'
    | 'ngatu'
    | 'tivaevae'
    | 'masi'
    | 'kapa'
    | 'bilum'
    | 'tebino',
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
