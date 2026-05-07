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
  const img = coverImageForEvent(e.id, 1200, 600);

  const dateFmt = startsAt.toLocaleDateString('en-NZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const timeFmt = (d: Date) => d.toLocaleTimeString('en-NZ', { hour: 'numeric', minute: '2-digit' });

  // ICS calendar download — works without a server endpoint by using a data: URL
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KavaWorks//EN\nBEGIN:VEVENT\nUID:${e.id}@kavaworks\nSUMMARY:${escapeIcs(e.title)}\nDESCRIPTION:${escapeIcs(e.description)}\nLOCATION:${escapeIcs(e.venue)}\nDTSTART:${toIcsDate(startsAt)}\nDTEND:${toIcsDate(endsAt)}\nEND:VEVENT\nEND:VCALENDAR`;
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return (
    <div className="px-4 py-6 lg:px-10">
      <Link href="/events" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
        ← All events
      </Link>

      <article className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
        <div className="relative w-full aspect-[21/9] overflow-hidden bg-[color:var(--surface-2)]">
          <img
            src={img}
            alt=""
            aria-hidden
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)' }} />
          <div className="absolute inset-0 flex items-end justify-between p-6">
            <div className="rounded-md px-3 py-1.5 font-mono text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', backdropFilter: 'blur(4px)' }}>
              {dateFmt}
            </div>
            {isPast && (
              <div className="rounded-md px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)' }}>
                Past event
              </div>
            )}
          </div>
        </div>

        <div className="p-6 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                {e.type.replace('-', ' ')} · {nation?.flag} {nation?.name}
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl break-words">{e.title}</h1>
              <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--ink-muted)', maxWidth: '65ch' }}>
                {e.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {linked.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {linked.slice(0, 5).map((a) => (
                        <AvatarIllustrated key={a.id} nationId={a.primaryNationId} size={32} name={a.name} className="ring-2 ring-white" />
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                      {e.rsvpCount.toLocaleString()} {isPast ? 'attended' : 'attending'}
                    </span>
                  </div>
                )}
                {!isPast && (
                  <>
                    <button
                      className="rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
                      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                    >
                      RSVP to this event
                    </button>
                    <a
                      href={icsHref}
                      download={`${e.id}.ics`}
                      className="inline-flex items-center gap-1.5 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                      style={{ borderColor: 'var(--hairline)' }}
                    >
                      <Icon name="calendar" size={14} /> Add to calendar
                    </a>
                  </>
                )}
              </div>

              <section className="mt-10">
                <h2 className="mb-4 font-display text-xl font-semibold">Schedule</h2>
                <ol className="space-y-4">
                  <ScheduleRow
                    time={timeFmt(startsAt)}
                    title="Doors / kava"
                    detail={`Welcome and ʻava ceremony${e.type === 'live-stream' ? '. Livestream link emailed to RSVPs 30 min prior.' : '.'}`}
                  />
                  <ScheduleRow
                    time={addHours(startsAt, 1, timeFmt)}
                    title="Programme begins"
                    detail={linked.length > 0
                      ? `Featured: ${linked.slice(0, 2).map((a) => a.name).join(', ')}.`
                      : 'Welcome by host elders, opening performance.'}
                  />
                  <ScheduleRow
                    time={timeFmt(endsAt)}
                    title={isMultiDay ? 'Final day closes' : 'Closes'}
                    detail={isMultiDay
                      ? `Multi-day event runs through ${endsAt.toLocaleDateString('en-NZ', { day: 'numeric', month: 'long' })}.`
                      : 'Lotu and farewell.'}
                  />
                </ol>
                <p className="mt-3 text-xs italic" style={{ color: 'var(--ink-soft)' }}>
                  Schedule is indicative. Programme details confirmed with RSVPs the week before.
                </p>
              </section>

              {linked.length > 0 && (
                <section className="mt-10">
                  <h2 className="mb-4 font-display text-xl font-semibold">Featured artists</h2>
                  <div className="flex flex-wrap gap-4">
                    {linked.map((a) => (
                      <Link key={a.id} href={`/artist/${a.handle}`} className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]" style={{ borderColor: 'var(--hairline)' }}>
                        <AvatarIllustrated nationId={a.primaryNationId} size={40} name={a.name} />
                        <div>
                          <div className="font-semibold text-sm">{a.name}</div>
                          <div className="text-xs" style={{ color: 'var(--ink-soft)' }}>{a.artforms.slice(0, 1).join(', ')}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-4">
              <Meta
                icon="calendar"
                label="When"
                value={dateFmt}
                detail={`${timeFmt(startsAt)} – ${timeFmt(endsAt)}${isMultiDay ? ' · multi-day' : ''}`}
              />
              <Meta
                icon="globe"
                label="Where"
                value={e.venue}
                detail={e.type === 'live-stream' ? 'Streamed online — RSVP for link' : `${nation?.name ?? ''}`}
              />
              <Meta
                icon="users"
                label="Format"
                value={e.type === 'live-stream' ? 'Livestream' : 'In person'}
                detail={`${e.rsvpCount.toLocaleString()} ${isPast ? 'attended' : 'going'}`}
              />
              <div className="rounded-xl border p-4 text-sm" style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>Accessibility</div>
                <p className="mt-2" style={{ color: 'var(--ink-muted)' }}>
                  Wheelchair access. NZSL on request — email events@kavaworks.nz at least 7 days ahead.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}

function Meta({ icon, label, value, detail }: { icon: string; label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: 'var(--hairline)' }}>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        <Icon name={icon} size={13} /> {label}
      </div>
      <div className="mt-1.5 text-sm font-semibold">{value}</div>
      {detail && <div className="mt-0.5 text-xs" style={{ color: 'var(--ink-muted)' }}>{detail}</div>}
    </div>
  );
}

function ScheduleRow({ time, title, detail }: { time: string; title: string; detail: string }) {
  return (
    <li className="flex gap-4 border-l-2 pl-4" style={{ borderColor: 'var(--brand)' }}>
      <span className="font-mono text-sm font-semibold tabular-nums" style={{ minWidth: 64, color: 'var(--brand)' }}>{time}</span>
      <div>
        <div className="font-semibold text-sm">{title}</div>
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
