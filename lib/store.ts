/**
 * In-memory data store — replaces SQLite/better-sqlite3 entirely.
 * All seed data is loaded from TypeScript files at module init.
 * Mutable state (likes, follows, saves, posts, messages) lives in
 * module-level Maps/Arrays and resets on Lambda cold start — acceptable
 * for a demo deployment.
 */

import { NATIONS } from '@/db/seed-data/nations';
import { ARTISTS_CORE } from '@/db/seed-data/artists-core';
import { ARTISTS_EMERGING } from '@/db/seed-data/artists-emerging';
import { ARTISTS_REST } from '@/db/seed-data/artists-rest';
import { PERSONAS } from '@/db/seed-data/personas';
import { WORKS } from '@/db/seed-data/works';
import { POSTS } from '@/db/seed-data/posts';
import { GRANTS } from '@/db/seed-data/grants';
import { AWARDS } from '@/db/seed-data/awards';
import { GROUPS } from '@/db/seed-data/groups';
import { EVENTS } from '@/db/seed-data/events';
import { ORGS } from '@/db/seed-data/orgs';
import { ARTICLES_PART_1 } from '@/db/seed-data/articles-part-1';
import { ARTICLES_PART_2 } from '@/db/seed-data/articles-part-2';
import { DROPS } from '@/db/seed-data/drops';
import type { ArtistSeed, PostSeed, WorkSeed } from '@/db/seed-data/types';

// ── Static reference data ──────────────────────────────────────────────────

export { NATIONS, AWARDS };

export const ALL_ORGS = ORGS;
export const ALL_EVENTS = EVENTS;
export const ALL_GRANTS = GRANTS;
export const ALL_DROPS = DROPS;
export const ALL_ARTICLES = [...ARTICLES_PART_1, ...ARTICLES_PART_2];

// ── Mutable artist records (allow profile edits) ───────────────────────────

export type MutableArtist = ArtistSeed;

const _artists: MutableArtist[] = [
  ...ARTISTS_CORE,
  ...ARTISTS_EMERGING,
  ...ARTISTS_REST,
  ...PERSONAS,
].map((a) => ({ ...a }));

export function getArtists() {
  return _artists;
}

export function findArtistById(id: string) {
  return _artists.find((a) => a.id === id) ?? null;
}

export function findArtistByHandle(handle: string) {
  return _artists.find((a) => a.handle === handle) ?? null;
}

export function findArtistsByIds(ids: string[]) {
  const set = new Set(ids);
  return _artists.filter((a) => set.has(a.id));
}

export function patchArtist(id: string, patch: Partial<Pick<MutableArtist, 'bio' | 'statement' | 'city' | 'artforms'>>) {
  const idx = _artists.findIndex((a) => a.id === id);
  if (idx !== -1) Object.assign(_artists[idx], patch);
}

// ── Mutable posts ──────────────────────────────────────────────────────────

export type MutablePost = PostSeed & {
  likes: number;
  comments: number;
  saves: number;
};

const _posts: MutablePost[] = POSTS.map((p) => ({ ...p }));

export function getPosts() {
  return _posts;
}

export function findPostById(id: string) {
  return _posts.find((p) => p.id === id) ?? null;
}

export function addPost(post: MutablePost) {
  _posts.unshift(post);
}

export function patchPost(id: string, patch: Partial<MutablePost>) {
  const idx = _posts.findIndex((p) => p.id === id);
  if (idx !== -1) Object.assign(_posts[idx], patch);
}

// ── Mutable works ──────────────────────────────────────────────────────────

const _works: WorkSeed[] = WORKS.map((w) => ({ ...w }));

export function getWorks() {
  return _works;
}

export function findWorkById(id: string) {
  return _works.find((w) => w.id === id) ?? null;
}

export function findWorksByArtist(artistId: string) {
  return _works.filter((w) => w.artistId === artistId);
}

export function findWorksByIds(ids: string[]) {
  const set = new Set(ids);
  return _works.filter((w) => set.has(w.id));
}

// ── Follows ────────────────────────────────────────────────────────────────

const _follows = new Map<string, Set<string>>();

export function isFollowing(followerId: string, followeeId: string) {
  return _follows.get(followerId)?.has(followeeId) ?? false;
}

export function getFollowing(userId: string): string[] {
  return Array.from(_follows.get(userId) ?? []);
}

export function toggleFollow(followerId: string, followeeId: string) {
  if (!_follows.has(followerId)) _follows.set(followerId, new Set());
  const set = _follows.get(followerId)!;
  if (set.has(followeeId)) set.delete(followeeId);
  else set.add(followeeId);
}

// ── Likes ──────────────────────────────────────────────────────────────────

const _likes = new Map<string, Set<string>>();

export function getLikedPostIds(userId: string): Set<string> {
  return _likes.get(userId) ?? new Set();
}

export function toggleLike(userId: string, postId: string) {
  if (!_likes.has(userId)) _likes.set(userId, new Set());
  const set = _likes.get(userId)!;
  const post = findPostById(postId);
  if (set.has(postId)) {
    set.delete(postId);
    if (post) post.likes = Math.max(0, post.likes - 1);
  } else {
    set.add(postId);
    if (post) post.likes += 1;
  }
}

// ── Saves ──────────────────────────────────────────────────────────────────

const _saves = new Map<string, Set<string>>();

export function getSavedIds(userId: string): Set<string> {
  return _saves.get(userId) ?? new Set();
}

export function toggleSave(userId: string, key: string) {
  if (!_saves.has(userId)) _saves.set(userId, new Set());
  const set = _saves.get(userId)!;
  if (set.has(key)) set.delete(key);
  else set.add(key);
  if (key.startsWith('post:')) {
    const postId = key.slice(5);
    const post = findPostById(postId);
    if (post) post.saves = Math.max(0, post.saves + (set.has(key) ? 1 : -1));
  }
}

// ── Collections ────────────────────────────────────────────────────────────

export type Collection = {
  id: string;
  userId: string;
  title: string;
  description: string;
  workIds: string[];
  createdAt: string;
};

const _collections: Collection[] = [
  {
    id: 'coll_001',
    userId: 'artist_001',
    title: 'Works for the house',
    description: 'Pieces I would like to live with.',
    workIds: ['work_001', 'work_003', 'work_007'],
    createdAt: '2026-03-01T09:00:00+12:00',
  },
  {
    id: 'coll_002',
    userId: 'artist_001',
    title: 'Gifts and commissions',
    description: 'Works made for others, kept for reference.',
    workIds: ['work_002', 'work_004'],
    createdAt: '2026-04-10T09:00:00+12:00',
  },
  {
    id: 'coll_003',
    userId: 'persona_collector',
    title: 'Pacific textiles 2026',
    description: 'Recent acquisitions in siapo, ngatu, and tīvaevae.',
    workIds: ['work_005', 'work_008', 'work_010'],
    createdAt: '2026-02-15T09:00:00+12:00',
  },
];

export function getCollections(userId: string) {
  return _collections.filter((c) => c.userId === userId);
}

export function findCollectionById(id: string) {
  return _collections.find((c) => c.id === id) ?? null;
}

// ── Conversations & Messages ───────────────────────────────────────────────

export type Conversation = {
  id: string;
  conversationKey: string;
  userA: string;
  userB: string;
  lastMessageAt: string;
  lastMessagePreview: string | null;
};

export type StoreMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  readAt: string | null;
};

const _conversations: Conversation[] = [
  {
    id: 'conv_001',
    conversationKey: 'artist_001|persona_adviser',
    userA: 'artist_001',
    userB: 'persona_adviser',
    lastMessageAt: '2026-04-18T10:15:00+12:00',
    lastMessagePreview: "Fa'afetai lava. Do you think the budget section needs more detail?",
  },
  {
    id: 'conv_002',
    conversationKey: 'artist_001|persona_collector',
    userA: 'artist_001',
    userB: 'persona_collector',
    lastMessageAt: '2026-04-16T15:30:00+12:00',
    lastMessagePreview: 'Talofa lava. What did you have in mind?',
  },
];

const _messages: StoreMessage[] = [
  {
    id: 'msg_001',
    conversationId: 'conv_001',
    senderId: 'persona_adviser',
    body: 'Kia ora Lesā, your application looks strong.',
    createdAt: '2026-04-18T09:00:00+12:00',
    readAt: '2026-04-18T10:00:00+12:00',
  },
  {
    id: 'msg_002',
    conversationId: 'conv_001',
    senderId: 'artist_001',
    body: "Fa'afetai lava. Do you think the budget section needs more detail?",
    createdAt: '2026-04-18T10:15:00+12:00',
    readAt: null,
  },
  {
    id: 'msg_003',
    conversationId: 'conv_002',
    senderId: 'persona_collector',
    body: 'I would love to commission a small piece.',
    createdAt: '2026-04-16T14:00:00+12:00',
    readAt: '2026-04-16T15:00:00+12:00',
  },
  {
    id: 'msg_004',
    conversationId: 'conv_002',
    senderId: 'artist_001',
    body: 'Talofa lava. What did you have in mind?',
    createdAt: '2026-04-16T15:30:00+12:00',
    readAt: null,
  },
];

export function conversationKey(a: string, b: string) {
  return [a, b].sort().join('|');
}

export function getInbox(userId: string) {
  return _conversations
    .filter((c) => c.userA === userId || c.userB === userId)
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
}

export function getOrCreateConversation(a: string, b: string) {
  const key = conversationKey(a, b);
  const existing = _conversations.find((c) => c.conversationKey === key);
  if (existing) return existing;
  const now = new Date().toISOString();
  const id = `conv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  const [uA, uB] = [a, b].sort();
  const conv: Conversation = { id, conversationKey: key, userA: uA, userB: uB, lastMessageAt: now, lastMessagePreview: null };
  _conversations.push(conv);
  return conv;
}

export function getMessages(conversationId: string) {
  return _messages
    .filter((m) => m.conversationId === conversationId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function sendMessage(conversationId: string, senderId: string, body: string) {
  const now = new Date().toISOString();
  const id = `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  _messages.push({ id, conversationId, senderId, body, createdAt: now, readAt: null });
  const conv = _conversations.find((c) => c.id === conversationId);
  if (conv) {
    conv.lastMessageAt = now;
    conv.lastMessagePreview = body.slice(0, 80);
  }
}

export function otherPartyId(conv: Conversation, userId: string) {
  return conv.userA === userId ? conv.userB : conv.userA;
}
