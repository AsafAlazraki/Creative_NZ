import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/db';
import * as s from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getArtistById } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { EmptyState } from '@/components/cultural/EmptyState';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';
import { timeAgo } from '@/lib/utils';

export const metadata = { title: 'Notifications · KavaWorks' };

/**
 * Notifications — surfaced from real platform activity:
 *  - Recent comments on the viewer's own posts
 *  - Recent messages received
 *  - New followers (best-effort from follow table)
 */
export default async function NotificationsPage() {
  const me = await getCurrentUser();

  const myPosts = db
    .select()
    .from(s.posts)
    .where(eq(s.posts.authorId, me.id))
    .all();

  const commentEvents: Array<{
    type: 'comment';
    at: string;
    fromHandle: string;
    text: string;
    postId: string;
  }> = [];
  for (const p of myPosts) {
    let comments: Array<{ authorHandle: string; text: string; createdAt: string }>;
    try {
      comments = JSON.parse(p.commentsData ?? '[]');
    } catch {
      continue;
    }
    for (const c of comments) {
      if (c.authorHandle === me.handle) continue;
      commentEvents.push({
        type: 'comment',
        at: c.createdAt,
        fromHandle: c.authorHandle,
        text: c.text,
        postId: p.id,
      });
    }
  }

  const recentDms = db
    .select()
    .from(s.messages)
    .orderBy(desc(s.messages.createdAt))
    .limit(20)
    .all()
    .filter((m) => m.senderId !== me.id);

  const events = [
    ...commentEvents.map((e) => ({ kind: 'comment' as const, at: e.at, payload: e })),
    ...recentDms.map((m) => ({ kind: 'dm' as const, at: m.createdAt, payload: m })),
  ].sort((a, b) => b.at.localeCompare(a.at));

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-6">
        <div
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--ink-soft)' }}
        >
          Notifications
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold">What's new for you.</h1>
      </header>

      {events.length === 0 ? (
        <EmptyState
          title="Quiet here. The vā is still."
          proverb={PACIFIC_PROVERBS[5]}
          cta={{ label: 'Find artists', href: '/explore' }}
        />
      ) : (
        <ul
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          {events.map((e, i) => {
            if (e.kind === 'comment') {
              const c = e.payload;
              return (
                <li
                  key={`c${i}`}
                  className="flex items-start gap-3 border-b px-5 py-4 last:border-b-0"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <Link href={`/artist/${c.fromHandle}`}>
                    <AvatarIllustrated nationId="aotearoa" size={40} name={`@${c.fromHandle}`} />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <Link
                        href={`/artist/${c.fromHandle}`}
                        className="font-semibold hover:underline"
                      >
                        @{c.fromHandle}
                      </Link>
                      <span style={{ color: 'var(--ink-muted)' }}>
                        {' '}
                        commented on your post
                      </span>
                    </p>
                    <p className="mt-1 text-sm italic" style={{ color: 'var(--ink-muted)' }}>
                      "{c.text}"
                    </p>
                    <div
                      className="mt-1 font-mono text-xs"
                      style={{ color: 'var(--ink-soft)' }}
                    >
                      {timeAgo(c.at)}
                    </div>
                  </div>
                </li>
              );
            }
            const m = e.payload;
            const sender = getArtistById(m.senderId);
            return (
              <li
                key={m.id}
                className="flex items-start gap-3 border-b px-5 py-4 last:border-b-0"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {sender && (
                  <Link href={`/messages/${sender.handle}`}>
                    <AvatarIllustrated
                      nationId={sender.primaryNationId}
                      size={40}
                      name={sender.name}
                    />
                  </Link>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {sender && (
                      <Link
                        href={`/messages/${sender.handle}`}
                        className="font-semibold hover:underline"
                      >
                        {sender.name}
                      </Link>
                    )}
                    <span style={{ color: 'var(--ink-muted)' }}> sent you a message</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm italic" style={{ color: 'var(--ink-muted)' }}>
                    "{m.body}"
                  </p>
                  <div
                    className="mt-1 font-mono text-xs"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    {timeAgo(m.createdAt)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
