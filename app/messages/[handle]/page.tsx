import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getArtistByHandle } from '@/lib/repo';
import { getMessages, getOrCreateConversation } from '@/lib/messages';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { sendToHandle } from '../actions';
import { Icon } from '@/components/ui/Icon';

export default async function ThreadPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const me = await getCurrentUser();
  const other = getArtistByHandle(handle);
  if (!other) notFound();
  if (other.id === me.id) redirect('/messages');

  const conv = getOrCreateConversation(me.id, other.id);
  const messages = getMessages(conv.id);
  const action = sendToHandle.bind(null, handle);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col lg:h-[calc(100vh-64px)]">
      <header
        className="flex items-center gap-3 border-b px-4 py-3 lg:px-10"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <Link
          href="/messages"
          className="rounded-md p-2 hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
          aria-label="Back to messages"
        >
          <Icon name="chevron-left" size={18} />
        </Link>
        <Link href={`/artist/${other.handle}`} className="flex items-center gap-3 flex-1 min-w-0 hover:underline">
          <AvatarIllustrated nationId={other.primaryNationId} size={42} name={other.name} />
          <div className="min-w-0">
            <div className="font-display font-semibold truncate">{other.name}</div>
            <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
              <NationBadge nationId={other.primaryNationId} size="xs" />
            </div>
          </div>
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 lg:px-8">
          {messages.length === 0 ? (
            <p className="text-center text-sm" style={{ color: 'var(--ink-muted)' }}>
              No messages yet. Say hello.
            </p>
          ) : (
            <ul className="space-y-3">
              {messages.map((m) => {
                const mine = m.senderId === me.id;
                return (
                  <li key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className="max-w-[75%] rounded-2xl px-4 py-2.5 text-[15px]"
                      style={
                        mine
                          ? { background: 'var(--brand)', color: 'var(--brand-ink)' }
                          : { background: 'var(--surface-2)', color: 'var(--ink)' }
                      }
                    >
                      <div style={{ lineHeight: 1.45 }}>{m.body}</div>
                      <div
                        className="mt-1 font-mono text-[10px]"
                        style={{ color: mine ? 'rgba(255,255,255,0.7)' : 'var(--ink-soft)' }}
                      >
                        {new Date(m.createdAt).toLocaleTimeString('en-NZ', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <form
        action={action}
        className="border-t px-4 py-3 lg:px-10"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <textarea
            name="body"
            placeholder={`Kōrero with ${other.name.split(' ')[0]}…`}
            required
            rows={1}
            className="flex-1 resize-none rounded-2xl border bg-transparent px-4 py-2.5 text-[15px]"
            style={{ borderColor: 'var(--hairline)' }}
          />
          <button
            type="submit"
            className="shrink-0 rounded-full p-3 transition-transform hover:scale-105"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
            aria-label="Send message"
          >
            <Icon name="send" size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
