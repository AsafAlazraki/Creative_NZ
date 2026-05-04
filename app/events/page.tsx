import Link from 'next/link';
import { getEvents, getArtistsByIds, getNation } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';

export const metadata = { title: 'Events · KavaWorks' };

export default async function EventsPage() {
  const now = new Date();
  const events = getEvents().sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const upcoming = events.filter((e) => new Date(e.startsAt) >= now);
  const past = events.filter((e) => new Date(e.startsAt) < now);

  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Events
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Pacific arts calendar 2026.</h1>
        <p className="mt-2 font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 17 }}>
          Workshops, exhibitions, festivals, and language weeks across the Pacific arts community.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {upcoming.map((e) => <EventCard key={e.id} e={e} />)}
      </div>

      {past.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold" style={{ color: 'var(--ink-muted)' }}>
            Past events
          </h2>
          <div className="grid gap-5 md:grid-cols-2 opacity-60">
            {past.map((e) => <EventCard key={e.id} e={e} isPast />)}
          </div>
        </section>
      )}
    </div>
  );
}

function EventCard({ e, isPast = false }: { e: ReturnType<typeof getEvents>[number]; isPast?: boolean }) {
  const nation = getNation(e.nationId);
  const linked = getArtistsByIds(e.linkedArtistIds);
  return (
    <article
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <CulturalPattern
        id={nation?.patternId ?? 'pattern-moana'}
        opacity={0.12}
        tone="brand"
        size={48}
        className="aspect-[16/9] border-b"
      >
        <div className="flex aspect-[16/9] items-end justify-between p-4">
          <div
            className="rounded-md px-3 py-1.5 font-mono text-xs font-semibold"
            style={{ background: 'var(--surface)', color: 'var(--ink)' }}
          >
            {new Date(e.startsAt).toLocaleDateString('en-NZ', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
          {isPast && (
            <div
              className="rounded-md px-3 py-1.5 text-xs font-semibold"
              style={{ background: 'var(--surface)', color: 'var(--ink-soft)' }}
            >
              Past
            </div>
          )}
        </div>
      </CulturalPattern>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          {e.type.replace('-', ' ')} · {e.venue}
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold">{e.title}</h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
          {e.description}
        </p>
        {linked.length > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {linked.slice(0, 3).map((a) => (
                  <AvatarIllustrated
                    key={a.id}
                    nationId={a.primaryNationId}
                    size={24}
                    name={a.name}
                    className="ring-2 ring-white"
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                {e.rsvpCount.toLocaleString()} {isPast ? 'attended' : 'attending'}
              </span>
            </div>
            {!isPast && (
              <Link
                href="/events"
                className="rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_6%,transparent)]"
                style={{ borderColor: 'var(--hairline)', color: 'var(--brand)' }}
              >
                RSVP →
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
