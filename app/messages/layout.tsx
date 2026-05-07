import { getCurrentUser } from '@/lib/auth';
import { ConversationList } from '@/components/messages/ConversationList';

/**
 * Messages layout — desktop split pane.
 *
 * On lg+: 280-px conversation rail on the left + active page (welcome
 * or thread) on the right. On mobile: rail hidden; the page itself
 * (list view at /messages, thread view at /messages/[handle]) takes
 * the full width.
 */
export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
  const me = await getCurrentUser();
  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden lg:h-[calc(100vh-64px)]">
      <aside
        className="hidden w-72 flex-shrink-0 flex-col border-r lg:flex"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <div
          className="flex-shrink-0 border-b px-5 py-5"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Messages
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-none">Kōrero.</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList meId={me.id} variant="rail" />
        </div>
      </aside>
      <main className="flex flex-1 min-w-0 flex-col">{children}</main>
    </div>
  );
}
