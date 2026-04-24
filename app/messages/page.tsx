import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getInbox, otherPartyId } from '@/lib/messages';
import { getArtistById } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { EmptyState } from '@/components/cultural/EmptyState';
import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';
import { timeAgo } from '@/lib/utils';

export const metadata = { title: 'Messages · KavaWorks' };

export default async function MessagesPage() {
  const me = await getCurrentUser();
  const convs = getInbox(me.id);

  return (
    <div className="px-4 py-6 lg:px-10 xl:px-16">
      <header className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-soft)' }}>
          Messages
        </div>
        <h1 className="mt-2 font-display font-semibold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
          Kōrero.
        </h1>
        <span className="theme-rule mt-3" />
      </header>

      {convs.length === 0 ? (
        <EmptyState
          title="No kōrero yet."
          proverb={PACIFIC_PROVERBS[5]}
          cta={{ label: 'Find artists to message', href: '/explore' }}
        />
      ) : (
        <ul className="divide-y rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
          {convs.map((c) => {
            const otherId = otherPartyId(c, me.id);
            const other = getArtistById(otherId);
            if (!other) return null;
            return (
              <li key={c.id}>
                <Link
                  href={`/messages/${other.handle}`}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                >
                  <AvatarIllustrated nationId={other.primaryNationId} size={52} name={other.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-display font-semibold truncate">{other.name}</div>
                      <div className="text-xs font-mono shrink-0" style={{ color: 'var(--ink-soft)' }}>
                        {timeAgo(c.lastMessageAt)}
                      </div>
                    </div>
                    <div className="mt-0.5 truncate text-sm" style={{ color: 'var(--ink-muted)' }}>
                      {c.lastMessagePreview ?? 'Start the conversation…'}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
