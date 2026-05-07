import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventById, getArtistsByIds, getNation } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { coverImageForEvent } from '@/lib/images';
import { Icon } from '@/components/ui/Icon';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = getEventById(id);
  if (!e) notFound();

  const nation = getNation(e.nationId);
  const linked = getArtistsByIds(e.linkedArtistIds);
  const now = new Date();
  const startsAt = new Date(e.startsAt);
  const endsAt = new Date(e.endsAt);
  const isPast = startsAt < now;
  const isMultiDay = endsAt.toDateString() !== startsAt.toDateString();
  const customImg = (e as { image?: string }).image;
  const img = customImg ?? coverImageForEvent(e.id, 1600, 900);

  const dayNum = startsAt.getDate();
  const monthShort = startsAt.toLocaleDateString('en-NZ', { month: 'short' });
  const yearNum = startsAt.getFullYear();
  const dateFmt = startsAt.toLocaleDateString('en-NZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const timeFmt = (d: Date) => d.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit' });

  // ICS calendar download — no server endpoint needed.
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KavaWorks//EN\nBEGIN:VEVENT\nUID:${e.id}@kavaworks\nSUMMARY:${escapeIcs(e.title)}\nDESCRIPTION:${escapeIcs(e.description)}\nLOCATION:${escapeIcs(e.venue)}\nDTSTART:${toIcsDate(startsAt)}\nDTEND:${toIcsDate(endsAt)}\nEND:VEVENT\nEND:VCALENDAR`;
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return (
    <div className="px-4 py-6 lg:px-10">
      <Link
        href="/events"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
        style={{ color: 'var(--brand)' }}
      >
        ← All events
      </Link>

      {/* Full-bleed poster hero — taller, dramatic gradient, identity
          overlaid on the image rather than below it. */}
      <header className="relative overflow-hidden rounded-2xl">
        <div className="relative h-72 w-full sm:h-80 lg:h-96">
          <img
            src={img}
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Aggressive gradient — bottom dark, fade to near-black at top */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          {/* Top-right "Past" badge if applicable */}
          {isPast && (
            <div
              className="absolute right-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur"
              style={{ background: 'rgba(0,0,0,0.55)' }}
            >
              Past event
            </div>
          )}

          {/* Identity overlay — bottom of the hero */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-9">
            <div className="flex items-end justify-between gap-5">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    {e.type.replace('-', ' ')}
                  </span>
                  <span className="text-sm text-white/75">
                    {nation?.flag} {nation?.name}
                  </span>
                </div>
                <h1
                  className="font-display font-bold leading-[1.05] text-white break-words"
                  style={{ fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)', letterSpacing: '-0.02em' }}
                >
                  {e.title}
                </h1>
              </div>
              {/* Date as a visual object */}
              <div className="hidden flex-shrink-0 text-right text-white sm:block">
                <div className="font-display text-5xl font-bold leading-none lg:text-6xl">
                  {dayNum}
                </div>
                <div className="mt-1 text-base font-medium text-white/75 lg:text-lg">
                  {monthShort} {yearNum}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Attendee strip — below hero. Avatar cluster + count on the
          left, primary CTA + add-to-calendar on the right. */}
      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4"
        style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3">
          {linked.length > 0 && (
            <div className="flex -space-x-2">
              {linked.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="h-8 w-8 overflow-hidden rounded-full"
                  style={{ boxShadow: '0 0 0 2px var(--surface)' }}
                >
                  <AvatarIllustrated nationId={a.primaryNationId} size={32} name={a.name} />
                </div>
              ))}
            </div>
          )}
          <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
            {e.rsvpCount.toLocaleString()}
            <span className="ml-1 font-normal" style={{ color: 'var(--ink-muted)' }}>
              {isPast ? 'attended' : 'attending'}
            </span>
          </span>
        </div>
        {!isPast && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              Register interest
            </button>
            <a
              href={icsHref}
              download={`${e.id}.ics`}
              className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              style={{ borderColor: 'color-mix(in srgb, var(--ink) 15%, transparent)' }}
            >
              <Icon name="calendar" size={14} /> Add to calendar
            </a>
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10">
            <section>
              <p className="mb-3 max-w-prose text-base leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                {e.description}
              </p>
            </section>

            <section>
              <div className="mb-4 border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
                <h2 className="font-display text-lg font-bold">Schedule</h2>
              </div>
              <ol className="space-y-4">
                <ScheduleRow
                  time={timeFmt(startsAt)}
                  title="Doors / kava"
                  detail={`Welcome and ʻava ceremony${e.type === 'live-stream' ? '. Livestream link emailed to RSVPs 30 min prior.' : '.'}`}
                />
                <ScheduleRow
                  time={addHours(startsAt, 1, timeFmt)}
                  title="Programme begins"
                  detail={
                    linked.length > 0
                      ? `Featured: ${linked.slice(0, 2).map((a) => a.name).join(', ')}.`
                      : 'Welcome by host elders, opening performance.'
                  }
                />
                <ScheduleRow
                  time={timeFmt(endsAt)}
                  title={isMultiDay ? 'Final day closes' : 'Closes'}
                  detail={
                    isMultiDay
                      ? `Multi-day event runs through ${endsAt.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long' })}.`
                      : 'Lotu and farewell.'
                  }
                />
              </ol>
              <p className="mt-3 text-xs italic" style={{ color: 'var(--ink-soft)' }}>
                Schedule is indicative. Programme details confirmed with RSVPs the week before.
              </p>
            </section>

            {linked.length > 0 && (
              <section>
                <div className="mb-4 border-b pb-2" style={{ borderColor: 'var(--hairline)' }}>
                  <h2 className="font-display text-lg font-bold">Featured artists</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {linked.map((a) => (
                    <Link
                      key={a.id}
                      href={`/artist/${a.handle}`}
                      className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                      style={{ borderColor: 'var(--hairline)' }}
                    >
                      <AvatarIllustrated nationId={a.primaryNationId} size={40} name={a.name} />
                      <div>
                        <div className="text-sm font-semibold">{a.name}</div>
                        <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>
                          {a.artforms.slice(0, 1).join(', ')}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            {/* When — calendar-card treatment with dark header */}
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <div className="px-4 py-3 text-center" style={{ background: 'var(--ink)' }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">When</p>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-muted)' }}>
                    Date
                  </p>
                  <p className="font-display text-lg font-bold leading-snug">{dateFmt}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-muted)' }}>
                    Time
                  </p>
                  <p className="text-sm font-medium">
                    {timeFmt(startsAt)} – {timeFmt(endsAt)}
                    {isMultiDay && (
                      <span style={{ color: 'var(--ink-muted)' }}> · multi-day</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-muted)' }}>
                    Where
                  </p>
                  <p className="text-sm font-medium">{e.venue}</p>
                  {e.type === 'live-stream' && (
                    <p className="mt-0.5 text-xs italic" style={{ color: 'var(--ink-muted)' }}>
                      Streamed online — RSVP for link
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--ink-muted)' }}>
                    Format
                  </p>
                  <p className="text-sm font-medium">
                    {e.type === 'live-stream' ? 'Livestream' : 'In person'}
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--ink-muted)' }}
              >
                Accessibility
              </p>
              <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                Wheelchair access. NZSL on request — email events@kavaworks.nz at least 7 days ahead.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ScheduleRow({ time, title, detail }: { time: string; title: string; detail: string }) {
  return (
    <li className="flex gap-4 border-l-2 pl-4" style={{ borderColor: 'var(--brand)' }}>
      <span
        className="font-mono text-sm font-semibold tabular-nums"
        style={{ minWidth: 64, color: 'var(--brand)' }}
      >
        {time}
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>{detail}</div>
      </div>
    </li>
  );
}

function escapeIcs(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
function toIcsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}
function addHours(d: Date, hours: number, fmt: (d: Date) => string) {
  return fmt(new Date(d.getTime() + hours * 3600 * 1000));
}
