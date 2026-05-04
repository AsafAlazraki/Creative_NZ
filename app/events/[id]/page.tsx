import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventById, getArtistsByIds, getNation } from '@/lib/repo';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { coverImageForEvent } from '@/lib/images';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = getEventById(id);
  if (!e) notFound();

  const nation = getNation(e.nationId);
  const linked = getArtistsByIds(e.linkedArtistIds);
  const now = new Date();
  const isPast = new Date(e.startsAt) < now;
  const img = coverImageForEvent(e.id, 1200, 600);

  return (
    <div className="px-4 py-6 lg:px-10">
      <Link href="/events" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
        ← All events
      </Link>

      <article className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
        <div className="relative aspect-[16/9] max-h-[480px] overflow-hidden bg-[color:var(--surface-2)]">
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
              {new Date(e.startsAt).toLocaleDateString('en-NZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            {isPast && (
              <div className="rounded-md px-3 py-1.5 text-xs font-semibold" style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)' }}>
                Past event
              </div>
            )}
          </div>
        </div>

        <div className="p-6 lg:p-10">
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            {e.type.replace('-', ' ')} · {e.venue} · {nation?.flag} {nation?.name}
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
              <button
                className="rounded-md px-5 py-2.5 text-sm font-semibold transition-colors"
                style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
              >
                RSVP to this event
              </button>
            )}
          </div>

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
      </article>
    </div>
  );
}
