import Link from 'next/link';
import { getDrops, getArtistById, getWorkById, getNation } from '@/lib/repo';
import { InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { AttributionBlock } from '@/components/cultural/AttributionBlock';
import { CountdownClient } from '@/components/feed/CountdownClient';
import { TAUHI_VA_KB } from '@/lib/tauhi-va-kb';
import { formatPrice } from '@/lib/utils';
import { InatiFramingClient } from '@/components/market/InatiFramingClient';
import { workImageUrl } from '@/lib/images';

export const metadata = { title: 'Drops · KavaWorks' };

export default async function DropsPage() {
  const drops = getDrops();
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
        void nation;
        const dropImg = workImageUrl({
          artform: work.artform,
          nationId: work.nationId,
          materials: work.materials,
          seed: `drop-${drop.id}`,
          w: 2000,
          h: 1200,
        });
        return (
          <section
            key={drop.id}
            className="mb-10 overflow-hidden rounded-3xl border"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <div className="relative min-h-[420px] border-b xl:min-h-[520px]" style={{ borderColor: 'var(--hairline)' }}>
              <img src={dropImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top right, rgba(15,14,12,0.9) 0%, rgba(15,14,12,0.6) 50%, rgba(15,14,12,0.2) 100%)',
                }}
              />
              <div className="relative grid gap-8 p-6 md:grid-cols-2 lg:p-12 xl:p-16 text-white">
                <div className="flex flex-col justify-between">
                  <div>
                    <InatiBadge />
                    <h1 className="mt-3 font-display font-semibold"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
                    >
                      {work.title}
                    </h1>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/85">
                      <AvatarIllustrated nationId={artist.primaryNationId} size={32} name={artist.name} />
                      <Link href={`/artist/${artist.handle}`} className="font-semibold hover:underline">
                        {artist.name}
                      </Link>
                      {work.tapu && <TapuIndicator />}
                    </div>
                  </div>

                  <div className="mt-8">
                    <CountdownClient target={drop.closesAt} size="lg" />
                    <div className="mt-3 font-mono text-sm text-white/85">
                      {drop.remainingUnits} of {drop.totalUnits} remaining · {formatPrice(work.priceNzd)}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href={`/market/${work.id}`}
                      className="rounded-md px-6 py-3.5 font-semibold shadow-2xl transition-transform hover:scale-[1.02]"
                      style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                    >
                      Claim this piece — {formatPrice(work.priceNzd)}
                    </Link>
                  </div>
                </div>

                <aside className="space-y-4 font-editorial italic text-white/95" style={{ fontSize: 18, lineHeight: 1.6 }}>
                  {drop.storyFraming.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </aside>
              </div>
            </div>
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
