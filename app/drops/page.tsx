import Link from 'next/link';
import { db } from '@/db';
import * as s from '@/db/schema';
import { getArtistById, getWorkById, getNation } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { AttributionBlock } from '@/components/cultural/AttributionBlock';
import { CountdownClient } from '@/components/feed/CountdownClient';
import { TAUHI_VA_KB } from '@/lib/tauhi-va-kb';
import { formatPrice } from '@/lib/utils';
import { InatiFramingClient } from '@/components/market/InatiFramingClient';

export const metadata = { title: 'Drops · KavaWorks' };

export default async function DropsPage() {
  const drops = db.select().from(s.drops).all();
  const live = drops.filter((d) => d.status === 'live');
  const upcoming = drops.filter((d) => d.status === 'scheduled');
  const past = drops.filter((d) => d.status === 'closed');

  return (
    <div className="px-4 py-6 lg:px-10">
      {live.map((drop) => {
        const artist = getArtistById(drop.artistId);
        const work = getWorkById(drop.workId);
        if (!artist || !work) return null;
        const nation = getNation(artist.primaryNationId);
        return (
          <section
            key={drop.id}
            className="mb-10 overflow-hidden rounded-2xl border"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <CulturalPattern
              id={nation?.patternId ?? 'pattern-tapa'}
              opacity={0.14}
              tone="brand"
              size={72}
              className="border-b"
            >
              <div className="grid gap-8 p-6 md:grid-cols-2 lg:p-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <InatiBadge />
                    <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                      {work.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                      <AvatarIllustrated nationId={artist.primaryNationId} size={28} name={artist.name} />
                      <Link href={`/artist/${artist.handle}`} className="font-semibold hover:underline">
                        {artist.name}
                      </Link>
                      {work.tapu && <TapuIndicator />}
                    </div>
                  </div>

                  <div className="mt-8">
                    <CountdownClient target={drop.closesAt} size="lg" />
                    <div className="mt-3 font-mono text-sm" style={{ color: 'var(--ink-muted)' }}>
                      {drop.remainingUnits} of {drop.totalUnits} remaining · {formatPrice(work.priceNzd)}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href={`/market/${work.id}`}
                      className="rounded-md px-5 py-3 font-semibold"
                      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                    >
                      Claim this piece — {formatPrice(work.priceNzd)}
                    </Link>
                  </div>
                </div>

                <aside className="space-y-4 font-editorial italic" style={{ color: 'var(--ink)', fontSize: 17, lineHeight: 1.55 }}>
                  {drop.storyFraming.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </aside>
              </div>
            </CulturalPattern>
            <div className="p-6 lg:p-10">
              <AttributionBlock artistId={artist.id} culturalStory={work.culturalStory} />
            </div>
          </section>
        );
      })}

      {live.length === 0 && (
        <section
          className="mb-10 rounded-2xl border p-10 text-center"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            Drops
          </div>
          <h1 className="mt-2 font-display text-3xl">No drop live right now.</h1>
          <p className="mx-auto mt-3 max-w-md font-editorial italic" style={{ color: 'var(--ink-muted)' }}>
            Inati is not a sale. It is a shared moment. We wait for the next one together.
          </p>
        </section>
      )}

      <section className="mb-10">
        <h2 className="mb-3 font-display text-xl font-semibold">Upcoming</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((d) => {
            const a = getArtistById(d.artistId);
            const w = getWorkById(d.workId);
            if (!a || !w) return null;
            return (
              <div
                key={d.id}
                className="rounded-xl border p-5"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <InatiBadge />
                <h3 className="mt-2 font-display text-lg font-semibold">{w.title}</h3>
                <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                  by {a.name} · {formatPrice(w.priceNzd)} · {d.totalUnits} units
                </div>
                <div className="mt-3">
                  <CountdownClient target={d.opensAt} />
                </div>
              </div>
            );
          })}
          {upcoming.length === 0 && (
            <p style={{ color: 'var(--ink-muted)' }}>Nothing scheduled. The vā is quiet.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-semibold">Archive</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {past.map((d) => {
            const a = getArtistById(d.artistId);
            const w = getWorkById(d.workId);
            if (!a || !w) return null;
            return (
              <div
                key={d.id}
                className="rounded-xl border p-5 opacity-75"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                  Ended
                </div>
                <h3 className="mt-1 font-display font-semibold">{w.title}</h3>
                <div className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                  by {a.name} · sold through in {d.totalUnits} units
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <InatiFramingClient framings={[...TAUHI_VA_KB.inatiFramings]} />
    </div>
  );
}
