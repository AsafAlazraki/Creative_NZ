import { getWorks, getNations } from '@/lib/repo';
import { WorkCard } from '@/components/market/WorkCard';
import { heroImageUrl } from '@/lib/images';

export const metadata = { title: 'Marketplace · KavaWorks' };

export default async function MarketPage() {
  const works = getWorks({ limit: 40 });
  const nations = getNations();
  const hero = heroImageUrl(
    'Pacific craft and weaving, studio light, warm earth tones',
    'market-hero',
    2400,
    1000,
  );

  return (
    <div className="px-4 py-6 lg:px-10 xl:px-16">
      <header className="relative mb-10 overflow-hidden rounded-3xl border">
        <div className="relative min-h-[280px] xl:min-h-[360px]">
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(15,14,12,0.85) 0%, rgba(15,14,12,0.55) 55%, rgba(15,14,12,0.2) 100%)',
            }}
          />
          <div className="relative p-8 md:p-12 xl:p-16">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Marketplace
            </div>
            <h1
              className="mt-3 font-display font-semibold text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              Works by Pacific artists, <br className="hidden md:block" />
              across Te Moana-nui-a-Kiwa.
            </h1>
            <p
              className="mt-4 max-w-2xl font-editorial italic text-white/90"
              style={{ fontSize: 20, lineHeight: 1.45 }}
            >
              95% of every sale goes directly to the artist. Attribution travels with every work.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent-jade)]" />
              Inati pricing: transparent 95/5 split
            </div>
          </div>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--ink-soft)' }}
        >
          Filter by nation ·
        </span>
        {nations.slice(0, 10).map((n) => (
          <span
            key={n.id}
            className="rounded-full border px-3 py-1 text-xs transition-colors hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
            style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
          >
            {n.flag} {n.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {works.map((w) => (
          <WorkCard key={w.id} work={w} />
        ))}
      </div>
    </div>
  );
}
