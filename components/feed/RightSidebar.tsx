import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { getGrants, getActiveDrop, getEvents, getArtistById, getWorkById } from '@/lib/repo';
import { daysUntil } from '@/lib/moana-ola-kb';
import { HASHTAG_TRENDS } from '@/lib/moana-ola-kb';
import { PACIFIC_PROVERBS, proverbOfTheDay } from '@/lib/tauhi-va-kb';
import { CountdownClient } from './CountdownClient';

export function RightSidebar({ user: _user }: { user: CurrentUser }) {
  const grants = getGrants();
  const soon = grants
    .map((g) => ({ g, days: daysUntil(g.deadline) }))
    .filter((x) => x.days > 0)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);
  const drop = getActiveDrop();
  const events = getEvents().slice(0, 3);
  const proverb = proverbOfTheDay(Date.now());

  return (
    <div className="sticky top-16 space-y-4">
      {drop && (
        <SidebarCard title="Drop live now">
          <DropPreview drop={drop} />
        </SidebarCard>
      )}
      {soon.length > 0 && (
        <SidebarCard title="Grants closing soon">
          <ul className="space-y-3">
            {soon.map(({ g, days }) => (
              <li key={g.id}>
                <Link href={`/grants/${g.id}`} className="block hover:underline">
                  <div className="font-semibold text-sm">{g.name}</div>
                  <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-muted)' }}>
                    {g.amountDisplay}
                  </div>
                  <div className="mt-1 text-xs font-mono" style={{ color: 'var(--accent-coral)' }}>
                    Closes in {days} days
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}
      <SidebarCard title="Trending">
        <ul className="flex flex-wrap gap-2">
          {HASHTAG_TRENDS.slice(0, 10).map((h) => (
            <li
              key={h.tag}
              className="rounded-full border px-2 py-1 text-xs"
              style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
            >
              {h.tag}
            </li>
          ))}
        </ul>
      </SidebarCard>
      <SidebarCard title="This week">
        <ul className="space-y-2 text-sm">
          {events.map((e) => (
            <li key={e.id}>
              <Link href="/events" className="hover:underline">
                <div className="font-semibold">{e.title}</div>
                <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                  {new Date(e.startsAt).toLocaleDateString('en-NZ', {
                    day: 'numeric',
                    month: 'short',
                  })}{' '}
                  · {e.venue}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarCard>
      <SidebarCard title="Proverb of the day">
        <blockquote>
          <p
            className="font-editorial italic"
            style={{ color: 'var(--ink)', lineHeight: 1.5 }}
          >
            "{proverb.text}"
          </p>
          <footer className="mt-2 text-xs" style={{ color: 'var(--ink-muted)' }}>
            {proverb.language} · {proverb.meaning}
          </footer>
        </blockquote>
      </SidebarCard>
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-xl border p-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function DropPreview({
  drop,
}: {
  drop: { workId: string; artistId: string; closesAt: string; remainingUnits: number; totalUnits: number };
}) {
  const artist = getArtistById(drop.artistId);
  const work = getWorkById(drop.workId);
  if (!artist || !work) return null;
  return (
    <Link href="/drops" className="block hover:underline">
      <div className="inati-badge mb-2 inline-block">Inati</div>
      <div className="font-semibold text-sm">{work.title}</div>
      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
        by {artist.name}
      </div>
      <div className="mt-2">
        <CountdownClient target={drop.closesAt} />
      </div>
      <div className="mt-1 text-xs" style={{ color: 'var(--ink-muted)' }}>
        {drop.remainingUnits} of {drop.totalUnits} remaining
      </div>
    </Link>
  );
}
