import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getWorkById,
  getArtistById,
  getNation,
  getWorksByArtist,
} from '@/lib/repo';
import { AttributionBlock } from '@/components/cultural/AttributionBlock';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { InatiBadge } from '@/components/cultural/Badges';
import { WorkCard } from '@/components/market/WorkCard';
import { WorkGallery } from '@/components/market/WorkGallery';
import { BuySheet } from '@/components/market/BuySheet';
import { Icon } from '@/components/ui/Icon';
import { formatPrice } from '@/lib/utils';
import { workImageUrl } from '@/lib/images';

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
  // Five seed-derived viewpoints of the same work — front, detail crop,
  // side, materials close-up, in-context shot. Picsum returns a different
  // photo per seed, so the gallery feels like multiple shots of the same
  // piece rather than one repeated image.
  const galleryViews = [
    { seed: work.id, label: 'Front' },
    { seed: `${work.id}-detail`, label: 'Detail' },
    { seed: `${work.id}-side`, label: 'Side' },
    { seed: `${work.id}-materials`, label: 'Materials' },
    { seed: `${work.id}-context`, label: 'In context' },
  ];
  const gallery = galleryViews.map((v) => ({
    label: v.label,
    src: workImageUrl({
      artform: work.artform,
      nationId: work.nationId,
      materials: work.materials,
      seed: v.seed,
      w: 1400,
      h: 1700,
    }),
  }));
  void nation;

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/market" className="hover:underline">
          Marketplace
        </Link>
        <span className="mx-2">/</span>
        <span>{work.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <WorkGallery views={gallery} title={work.title} tapu={!!work.tapu} />

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

          <div className="border-y py-4" style={{ borderColor: 'var(--hairline)' }}>
            <div className="flex items-end justify-between gap-4">
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
            <div
              className="mt-3 flex items-start gap-1.5 text-xs"
              style={{ color: 'var(--ink-muted)' }}
            >
              <span style={{ color: 'var(--accent-jade)' }} className="mt-0.5 flex-shrink-0">
                <Icon name="shield" size={13} />
              </span>
              <span>
                95% of this sale goes directly to {artist.name.split(' ')[0]}. Attribution travels permanently with the work.
              </span>
            </div>
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

      {otherWorks.length >= 2 && (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">More from {artist.name.split(' ')[0]}</h2>
            <Link
              href={`/artist/${artist.handle}`}
              className="text-sm font-semibold hover:underline"
              style={{ color: 'var(--brand)' }}
            >
              See all →
            </Link>
          </div>
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
