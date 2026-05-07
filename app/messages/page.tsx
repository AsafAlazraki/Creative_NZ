import { getCurrentUser } from '@/lib/auth';
import { getInbox } from '@/lib/messages';
import { EmptyState } from '@/components/cultural/EmptyState';
import { ConversationList } from '@/components/messages/ConversationList';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Messages · KavaWorks' };

export default async function MessagesPage() {
  const me = await getCurrentUser();
  const convs = getInbox(me.id);

  return (
    <>
      {/* Mobile-only list. On lg+ this hides; the layout's left rail
          carries the conversation list and the right pane shows the
          welcome state below. */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:hidden">
        <header className="mb-6">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Messages
          </p>
          <h1
            className="mt-1 font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)' }}
          >
            Kōrero.
          </h1>
        </header>
        {convs.length === 0 ? (
          <EmptyState
            title="No kōrero yet."
            proverb={PACIFIC_PROVERBS[5]}
            cta={{ label: 'Find artists to message', href: '/explore' }}
          />
        ) : (
          <ConversationList meId={me.id} variant="page" />
        )}
      </div>

      {/* Desktop welcome state — visible only on lg+ when no thread is
          open. Rail on the left already shows conversations. */}
      <div className="hidden flex-1 flex-col items-center justify-center px-8 py-12 lg:flex">
        <div className="max-w-md text-center">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: 'color-mix(in srgb, var(--ink) 5%, transparent)',
              color: 'var(--ink-muted)',
            }}
          >
            <Icon name="message-circle" size={26} />
          </div>
          <h2 className="font-display text-2xl font-bold">Kōrero with care.</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: 'var(--ink-muted)' }}>
            {convs.length === 0
              ? 'No kōrero yet. Open an artist profile and tap Message to start one.'
              : 'Select a conversation from the left, or open an artist profile to start a new one.'}
          </p>
        </div>
      </div>
    </>
  );
}
