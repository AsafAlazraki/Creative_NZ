import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getWorkById,
  getArtistById,
  getNation,
  getWorksByArtist,
} from '@/lib/repo';
import { AttributionBlock } from '@/components/cultural/AttributionBlock';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { InatiBadge, TapuIndicator } from '@/components/cultural/Badges';
import { WorkCard } from '@/components/market/WorkCard';
import { BuySheet } from '@/components/market/BuySheet';
import { formatPrice } from '@/lib/utils';

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) notFound();
  const artist = getArtistById(work.artistId);
  if (!artist) notFound();
  const nation = getNation(work.nationId);
  const otherWorks = getWorksByArtist(artist.id).filter((w) => w.id !== work.id).slice(0, 3);

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/market" className="hover:underline">
          Marketplace
        </Link>
        <span className="mx-2">/</span>
        <span>{work.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="min-w-0">
          <CulturalPattern
            id={nation?.patternId ?? 'pattern-tapa'}
            opacity={0.18}
            tone="brand"
            size={72}
            className="aspect-[4/5] overflow-hidden rounded-2xl border"
          >
            <div
              className="relative flex aspect-[4/5] items-end p-8"
              style={{ borderColor: 'var(--hairline)' }}
            >
              {work.tapu && (
                <div className="absolute right-4 top-4">
                  <TapuIndicator />
                </div>
              )}
              <div
                className="max-w-md rounded-md px-4 py-3 font-editorial italic"
                style={{
                  background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
                  color: 'var(--ink-muted)',
                  backdropFilter: 'blur(4px)',
                  fontSize: 15,
                  lineHeight: 1.4,
                }}
              >
                {work.artform} · {work.materials}
              </div>
            </div>
          </CulturalPattern>
        </div>

        <div className="min-w-0 space-y-6">
          <div>
            <div
              className="text-xs uppercase tracking-wider"
              style={{ color: 'var(--ink-soft)' }}
            >
              {work.yearMade}
              {work.edition ? ` · Edition ${work.edition.number} of ${work.edition.of}` : ''}
            </div>
            <h1 className="mt-1 font-display text-4xl font-semibold">{work.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
              <NationBadge nationId={work.nationId} />
              <span>·</span>
              <span>{work.artform}</span>
            </div>
          </div>

          <Link
            href={`/artist/${artist.handle}`}
            className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <AvatarIllustrated nationId={artist.primaryNationId} size={44} name={artist.name} />
            <div className="flex-1">
              <div className="font-semibold">{artist.name}</div>
              <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                {artist.city}
              </div>
            </div>
          </Link>

          <div className="flex items-end justify-between gap-4 border-y py-4" style={{ borderColor: 'var(--hairline)' }}>
            <div>
              <div className="font-mono text-3xl font-semibold">{formatPrice(work.priceNzd)}</div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <InatiBadge />
                <span style={{ color: 'var(--ink-muted)' }}>
                  {formatPrice(Math.round(work.priceNzd * 0.95))} goes directly to {artist.name.split(' ')[0]}
                </span>
              </div>
            </div>
            <BuySheet work={work} artist={artist} />
          </div>

          <section>
            <h2 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              About
            </h2>
            <p className="font-editorial text-lg" style={{ color: 'var(--ink)', lineHeight: 1.6 }}>
              {work.description}
            </p>
          </section>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Meta label="Materials" value={work.materials} />
            <Meta label="Dimensions" value={work.dimensions} />
            <Meta label="Year made" value={String(work.yearMade)} />
            <Meta label="Ships from" value={work.shippingFrom} />
          </dl>

          <AttributionBlock artistId={artist.id} culturalStory={work.culturalStory} />
        </div>
      </div>

      {otherWorks.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">More from {artist.name.split(' ')[0]}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherWorks.map((w) => (
              <WorkCard key={w.id} work={w} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </dt>
      <dd className="mt-0.5" style={{ color: 'var(--ink)' }}>
        {value}
      </dd>
    </div>
  );
}
