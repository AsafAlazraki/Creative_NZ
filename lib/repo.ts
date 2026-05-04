import {
  NATIONS,
  AWARDS,
  ALL_ORGS,
  ALL_EVENTS,
  ALL_GRANTS,
  ALL_DROPS,
  ALL_ARTICLES,
  getArtists,
  findArtistById,
  findArtistByHandle,
  findArtistsByIds,
  getPosts as storePosts,
  getWorks as storeWorks,
  findWorkById,
  findWorksByArtist,
  findWorksByIds,
  getLikedPostIds,
  getSavedIds,
  isFollowing,
  getFollowing as storeFollowing,
  getCollections as storeCollections,
  findCollectionById as storeFindCollection,
} from './store';
import { GROUPS } from '@/db/seed-data/groups';
import type { MutableArtist, MutablePost } from './store';
import type { WorkSeed } from '@/db/seed-data/types';

// ── Nations ────────────────────────────────────────────────────────────────

export type Nation = typeof NATIONS[number];

export function getNations(): Nation[] {
  return NATIONS as unknown as Nation[];
}

export function getNation(id: string): Nation | undefined {
  return (NATIONS as readonly Nation[]).find((n) => n.id === id);
}

// ── Artists ────────────────────────────────────────────────────────────────

export type HydratedArtist = MutableArtist;

export function getAllArtists(): HydratedArtist[] {
  return getArtists();
}

export function getArtistById(id: string): HydratedArtist | null {
  return findArtistById(id);
}

export function getArtistByHandle(handle: string): HydratedArtist | null {
  return findArtistByHandle(handle);
}

export function getArtistsByIds(ids: readonly string[]): HydratedArtist[] {
  return findArtistsByIds([...ids]);
}

export function getOtherArtists(excludeId: string, limit = 4): HydratedArtist[] {
  return getArtists()
    .filter((a) => a.id !== excludeId && a.role === 'artist')
    .slice(0, limit);
}

// ── Posts ──────────────────────────────────────────────────────────────────

export type HydratedPost = MutablePost;

export function hydratePost(p: MutablePost): HydratedPost {
  return p;
}

export function getPosts({
  limit = 50,
  viewerNationIds = [],
  viewerId,
}: {
  limit?: number;
  viewerNationIds?: string[];
  viewerId?: string;
} = {}): HydratedPost[] {
  return storePosts()
    .filter((p) => {
      if (!p.tapu) return true;
      if (p.authorId === viewerId) return true;
      return viewerNationIds.includes(p.nationId);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getPostsByArtist(artistId: string, limit = 20): HydratedPost[] {
  return storePosts()
    .filter((p) => p.authorId === artistId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

// ── Works ──────────────────────────────────────────────────────────────────

export type HydratedWork = WorkSeed;

export function getWorks({ limit = 40 }: { limit?: number } = {}): HydratedWork[] {
  return storeWorks()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function getWorkById(id: string): HydratedWork | null {
  return findWorkById(id);
}

export function getWorksByArtist(artistId: string): HydratedWork[] {
  return findWorksByArtist(artistId);
}

export function getWorksByIds(ids: string[]): HydratedWork[] {
  return findWorksByIds(ids);
}

// ── Grants ─────────────────────────────────────────────────────────────────

function widenGrant(g: typeof ALL_GRANTS[number]) {
  return {
    ...g,
    pool: g.pool as string,
    eligibility: [...g.eligibility] as string[],
    howToApply: [...g.howToApply] as string[],
    similarGrantIds: [...g.similarGrantIds] as string[],
  };
}

export function getGrants() {
  return ALL_GRANTS.map(widenGrant);
}

export function getGrantById(id: string) {
  const g = ALL_GRANTS.find((g) => g.id === id);
  return g ? widenGrant(g) : null;
}

export type HydratedGrant = ReturnType<typeof getGrantById>;

// ── Groups ─────────────────────────────────────────────────────────────────

export function getGroups() {
  return GROUPS;
}

export function getGroupById(id: string) {
  return GROUPS.find((g) => g.id === id) ?? null;
}

// ── Events ─────────────────────────────────────────────────────────────────

export function getEvents() {
  return [...ALL_EVENTS];
}

export function getEventById(id: string) {
  return ALL_EVENTS.find((e) => e.id === id) ?? null;
}

// ── Orgs ───────────────────────────────────────────────────────────────────

export function getOrgs() {
  return [...ALL_ORGS];
}

export function getOrgById(id: string) {
  return ALL_ORGS.find((o) => o.id === id) ?? null;
}

// ── Articles ───────────────────────────────────────────────────────────────

export function getArticles() {
  return [...ALL_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleById(id: string) {
  return ALL_ARTICLES.find((a) => a.id === id) ?? null;
}

// ── Drops ──────────────────────────────────────────────────────────────────

export function getDrops() {
  return [...ALL_DROPS];
}

export function getActiveDrop() {
  return ALL_DROPS.find((d) => d.status === 'live') ?? null;
}

export function getUpcomingDrop() {
  return ALL_DROPS.filter((d) => d.status === 'scheduled')
    .sort((a, b) => a.opensAt.localeCompare(b.opensAt))[0] ?? null;
}

// ── Awards ─────────────────────────────────────────────────────────────────

export function getAwards() {
  return AWARDS;
}

// ── Collections ────────────────────────────────────────────────────────────

export function getCollections(userId: string) {
  return storeCollections(userId);
}

export function getCollectionById(id: string) {
  return storeFindCollection(id);
}

// ── Social state ───────────────────────────────────────────────────────────

export function userLikedPostIds(userId: string): Set<string> {
  return getLikedPostIds(userId);
}

export function userSavedPostIds(userId: string): Set<string> {
  const all = getSavedIds(userId);
  return new Set(Array.from(all).filter((k) => k.startsWith('post:')).map((k) => k.slice(5)));
}

export function userFollowsHandle(userId: string, targetId: string): boolean {
  return isFollowing(userId, targetId);
}

export function getFollowing(userId: string): string[] {
  return storeFollowing(userId);
}

export function getFollowedArtists(userId: string): HydratedArtist[] {
  return findArtistsByIds(storeFollowing(userId));
}

// ── Search ─────────────────────────────────────────────────────────────────

export function searchAll(q: string) {
  const term = q.toLowerCase().trim();
  if (!term) return { artists: [], works: [], grants: [], groups: [] };

  const artists = getAllArtists().filter(
    (a) =>
      a.name.toLowerCase().includes(term) ||
      a.handle.toLowerCase().includes(term) ||
      a.bio.toLowerCase().includes(term) ||
      a.artforms.some((f) => f.toLowerCase().includes(term)),
  );

  const works = getWorks({ limit: 200 }).filter(
    (w) =>
      w.title.toLowerCase().includes(term) ||
      w.description.toLowerCase().includes(term) ||
      w.artform.toLowerCase().includes(term) ||
      w.materials.toLowerCase().includes(term),
  );

  const grants = getGrants().filter(
    (g) =>
      g.name.toLowerCase().includes(term) ||
      g.funder.toLowerCase().includes(term) ||
      g.plainEnglish.toLowerCase().includes(term),
  );

  const groups = getGroups().filter(
    (g) =>
      g.name.toLowerCase().includes(term) ||
      g.description.toLowerCase().includes(term),
  );

  return { artists, works, grants, groups };
}
