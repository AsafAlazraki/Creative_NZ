import { db } from '@/db';
import * as s from '@/db/schema';
import { desc, eq, inArray, and, ne } from 'drizzle-orm';
import { parseJson } from './utils';
import { NATIONS } from '@/db/seed-data/nations';

export type Nation = typeof NATIONS[number];

export function getNations(): Nation[] {
  return NATIONS as unknown as Nation[];
}

export function getNation(id: string): Nation | undefined {
  return (NATIONS as readonly Nation[]).find((n) => n.id === id);
}

export function getAllArtists() {
  return db.select().from(s.artists).all().map(hydrateArtist);
}

export function getArtistById(id: string) {
  const row = db.select().from(s.artists).where(eq(s.artists.id, id)).get();
  return row ? hydrateArtist(row) : null;
}

export function getArtistByHandle(handle: string) {
  const row = db.select().from(s.artists).where(eq(s.artists.handle, handle)).get();
  return row ? hydrateArtist(row) : null;
}

export function getArtistsByIds(ids: string[]) {
  if (!ids.length) return [];
  return db.select().from(s.artists).where(inArray(s.artists.id, ids)).all().map(hydrateArtist);
}

export function hydrateArtist(row: typeof s.artists.$inferSelect) {
  return {
    ...row,
    affiliations: parseJson<string[]>(row.affiliations, []),
    elderInGroups: parseJson<string[]>(row.elderInGroups, []),
    artforms: parseJson<string[]>(row.artforms, []),
    awards: parseJson<
      Array<{ id: string; name: string; body: string; year: number; amount: number; citation: string }>
    >(row.awards, []),
    subscriptionTiers: parseJson<Array<{ name: string; priceNzd: number; perks: string[] }>>(
      row.subscriptionTiers,
      [],
    ),
    exhibitions: parseJson<Array<{ year: number; title: string; venue: string; role: string }>>(
      row.exhibitions,
      [],
    ),
    lineage: parseJson<{ apprenticedTo?: string; teaches?: string[]; exhibitedWith?: string[] }>(
      row.lineage,
      {},
    ),
    expertise: parseJson<string[] | null>(row.expertise, null),
    orgInfo: parseJson<{
      mission: string;
      staff: string[];
      foundedYear: number;
      focus: string[];
    } | null>(row.orgInfo, null),
    verified: Boolean(row.verified),
    elderStatus: Boolean(row.elderStatus),
  };
}

export type HydratedArtist = ReturnType<typeof hydrateArtist>;

export function getPosts({
  limit = 50,
  viewerNationIds = [],
  viewerId,
}: {
  limit?: number;
  viewerNationIds?: string[];
  viewerId?: string;
}) {
  const rows = db.select().from(s.posts).orderBy(desc(s.posts.createdAt)).limit(limit).all();
  const hydrated = rows.map(hydratePost);

  // Tapu filter — viewer must be in the nation or be the author
  const filtered = hydrated.filter((p) => {
    if (!p.tapu) return true;
    if (p.authorId === viewerId) return true;
    return viewerNationIds.includes(p.nationId);
  });
  return filtered;
}

export function getPostsByArtist(artistId: string, limit = 20) {
  return db
    .select()
    .from(s.posts)
    .where(eq(s.posts.authorId, artistId))
    .orderBy(desc(s.posts.createdAt))
    .limit(limit)
    .all()
    .map(hydratePost);
}

export function hydratePost(row: typeof s.posts.$inferSelect) {
  return {
    ...row,
    tapu: Boolean(row.tapu),
    collaboratorHandles: parseJson<string[]>(row.collaboratorHandles, []),
    commentsData: parseJson<
      Array<{ authorHandle: string; text: string; createdAt: string; elderMark?: boolean }>
    >(row.commentsData, []),
    linkedWorkId: row.linkedWorkId ?? null,
  };
}

export type HydratedPost = ReturnType<typeof hydratePost>;

export function getWorks({ limit = 40 }: { limit?: number } = {}) {
  return db.select().from(s.works).orderBy(desc(s.works.createdAt)).limit(limit).all().map(hydrateWork);
}

export function getWorkById(id: string) {
  const row = db.select().from(s.works).where(eq(s.works.id, id)).get();
  return row ? hydrateWork(row) : null;
}

export function getWorksByArtist(artistId: string) {
  return db
    .select()
    .from(s.works)
    .where(eq(s.works.artistId, artistId))
    .all()
    .map(hydrateWork);
}

export function getWorksByIds(ids: string[]) {
  if (!ids.length) return [];
  return db.select().from(s.works).where(inArray(s.works.id, ids)).all().map(hydrateWork);
}

export function hydrateWork(row: typeof s.works.$inferSelect) {
  return {
    ...row,
    mediaRefs: parseJson<string[]>(row.mediaRefs, []),
    edition: parseJson<{ number: number; of: number } | null>(row.edition, null),
    tapu: Boolean(row.tapu),
  };
}

export type HydratedWork = ReturnType<typeof hydrateWork>;

export function getGrants() {
  return db.select().from(s.grants).all().map(hydrateGrant);
}

export function getGrantById(id: string) {
  const row = db.select().from(s.grants).where(eq(s.grants.id, id)).get();
  return row ? hydrateGrant(row) : null;
}

export function hydrateGrant(row: typeof s.grants.$inferSelect) {
  return {
    ...row,
    eligibility: parseJson<string[]>(row.eligibility, []),
    howToApply: parseJson<string[]>(row.howToApply, []),
    similarGrantIds: parseJson<string[]>(row.similarGrantIds, []),
  };
}

export function getGroups() {
  return db.select().from(s.groups).all().map(hydrateGroup);
}

export function getGroupById(id: string) {
  const row = db.select().from(s.groups).where(eq(s.groups.id, id)).get();
  return row ? hydrateGroup(row) : null;
}

export function hydrateGroup(row: typeof s.groups.$inferSelect) {
  return {
    ...row,
    elderIds: parseJson<string[]>(row.elderIds, []),
    threadsData: parseJson<
      Array<{
        id: string;
        title: string;
        pinned: boolean;
        messageCount: number;
        lastMessageAt: string;
      }>
    >(row.threadsData, []),
  };
}

export function getEvents() {
  return db.select().from(s.events).all().map(hydrateEvent);
}

export function hydrateEvent(row: typeof s.events.$inferSelect) {
  return {
    ...row,
    linkedArtistIds: parseJson<string[]>(row.linkedArtistIds, []),
  };
}

export function getOrgs() {
  return db.select().from(s.orgs).all().map(hydrateOrg);
}

export function getOrgById(id: string) {
  const row = db.select().from(s.orgs).where(eq(s.orgs.id, id)).get();
  return row ? hydrateOrg(row) : null;
}

export function hydrateOrg(row: typeof s.orgs.$inferSelect) {
  return {
    ...row,
    focus: parseJson<string[]>(row.focus, []),
    linkedArtistIds: parseJson<string[]>(row.linkedArtistIds, []),
    currentProgrammes: parseJson<Array<{ title: string; dates: string }>>(
      row.currentProgrammes,
      [],
    ),
  };
}

export function getArticles() {
  return db.select().from(s.articles).orderBy(desc(s.articles.publishedAt)).all().map(hydrateArticle);
}

export function getArticleById(id: string) {
  const row = db.select().from(s.articles).where(eq(s.articles.id, id)).get();
  return row ? hydrateArticle(row) : null;
}

export function hydrateArticle(row: typeof s.articles.$inferSelect) {
  return {
    ...row,
    pullQuotes: parseJson<Array<{ text: string; position: string }>>(row.pullQuotes, []),
    sidebar: parseJson<Array<{ label: string; url: string }>>(row.sidebar, []),
    relatedArticleIds: parseJson<string[]>(row.relatedArticleIds, []),
  };
}

export function getDrops() {
  return db.select().from(s.drops).all();
}

export function getAwards() {
  return db.select().from(s.awards).all();
}

export function getCollections(userId: string) {
  return db
    .select()
    .from(s.collections)
    .where(eq(s.collections.userId, userId))
    .all()
    .map((c) => ({
      ...c,
      workIds: parseJson<string[]>(c.workIds, []),
    }));
}

export function getFollowing(userId: string) {
  const rows = db.select().from(s.follows).where(eq(s.follows.followerId, userId)).all();
  return rows.map((r) => r.followeeId);
}

export function getFollowedArtists(userId: string) {
  const ids = getFollowing(userId);
  return getArtistsByIds(ids);
}

export function getActiveDrop() {
  const rows = db.select().from(s.drops).where(eq(s.drops.status, 'live')).all();
  return rows[0] ?? null;
}

export function getUpcomingDrop() {
  const rows = db.select().from(s.drops).where(eq(s.drops.status, 'scheduled')).all();
  return rows.sort((a, b) => a.opensAt.localeCompare(b.opensAt))[0] ?? null;
}

export function getOtherArtists(excludeId: string, limit = 4) {
  return db
    .select()
    .from(s.artists)
    .where(and(ne(s.artists.id, excludeId), eq(s.artists.role, 'artist')))
    .limit(limit)
    .all()
    .map(hydrateArtist);
}
