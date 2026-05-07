import Link from 'next/link';
import { getInbox, otherPartyId } from '@/lib/messages';
import { getArtistById } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { timeAgo } from '@/lib/utils';

/**
 * Conversation list — rendered in the desktop messages sidebar and as
 * the mobile-only fallback on /messages itself. On a thread route, the
 * `activeHandle` prop highlights the current conversation.
 */
export function ConversationList({
  meId,
  activeHandle,
  variant = 'rail',
}: {
  meId: string;
  activeHandle?: string;
  variant?: 'rail' | 'page';
}) {
  const convs = getInbox(meId);
  if (convs.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--ink-muted)' }}>
        No kōrero yet.
      </div>
    );
  }

  return (
    <ul className={variant === 'page' ? 'divide-y rounded-2xl border overflow-hidden' : ''} style={variant === 'page' ? { borderColor: 'var(--hairline)', background: 'var(--surface)' } : undefined}>
      {convs.map((c) => {
        const otherId = otherPartyId(c, meId);
        const other = getArtistById(otherId);
        if (!other) return null;
        const isActive = activeHandle === other.handle;
        return (
          <li key={c.id}>
            <Link
              href={`/messages/${other.handle}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors"
              style={{
                background: isActive
                  ? 'color-mix(in srgb, var(--ink) 5%, transparent)'
                  : 'transparent',
                borderLeft: isActive ? '3px solid var(--brand)' : '3px solid transparent',
              }}
            >
              <AvatarIllustrated
                nationId={other.primaryNationId}
                size={variant === 'rail' ? 40 : 52}
                name={other.name}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="truncate font-display text-sm font-semibold">{other.name}</div>
                  <div
                    className="shrink-0 text-[10px] font-mono"
                    style={{ color: 'var(--ink-soft)' }}
                  >
                    {timeAgo(c.lastMessageAt)}
                  </div>
                </div>
                <div className="mt-0.5 truncate text-xs" style={{ color: 'var(--ink-muted)' }}>
                  {c.lastMessagePreview ?? 'Start the conversation…'}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
