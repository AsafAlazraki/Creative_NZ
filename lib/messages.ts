import { db } from '@/db';
import * as s from '@/db/schema';
import { and, desc, eq, or } from 'drizzle-orm';

export function conversationKey(a: string, b: string) {
  return [a, b].sort().join('|');
}

export function getInbox(userId: string) {
  return db
    .select()
    .from(s.conversations)
    .where(or(eq(s.conversations.userA, userId), eq(s.conversations.userB, userId)))
    .orderBy(desc(s.conversations.lastMessageAt))
    .all();
}

export function getOrCreateConversation(a: string, b: string) {
  const key = conversationKey(a, b);
  const existing = db
    .select()
    .from(s.conversations)
    .where(eq(s.conversations.conversationKey, key))
    .get();
  if (existing) return existing;
  const now = new Date().toISOString();
  const id = `conv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  db.insert(s.conversations)
    .values({
      id,
      conversationKey: key,
      userA: [a, b].sort()[0],
      userB: [a, b].sort()[1],
      lastMessageAt: now,
      lastMessagePreview: null,
    })
    .run();
  return db.select().from(s.conversations).where(eq(s.conversations.id, id)).get()!;
}

export function getMessages(conversationId: string) {
  return db
    .select()
    .from(s.messages)
    .where(eq(s.messages.conversationId, conversationId))
    .orderBy(s.messages.createdAt)
    .all();
}

export function otherPartyId(conv: typeof s.conversations.$inferSelect, userId: string) {
  return conv.userA === userId ? conv.userB : conv.userA;
}

export function sendMessage(conversationId: string, senderId: string, body: string) {
  const now = new Date().toISOString();
  const id = `msg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
  db.insert(s.messages)
    .values({ id, conversationId, senderId, body, createdAt: now, readAt: null })
    .run();
  db.update(s.conversations)
    .set({ lastMessageAt: now, lastMessagePreview: body.slice(0, 80) })
    .where(eq(s.conversations.id, conversationId))
    .run();
}
