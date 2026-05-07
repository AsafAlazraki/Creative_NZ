import { getWorks, getNations } from '@/lib/repo';
import { heroImageUrl } from '@/lib/images';
import { DropsZone } from '@/components/market/DropsZone';
import { MarketBrowse } from '@/components/market/MarketBrowse';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Marketplace · KavaWorks' };

export default async function MarketPage() {
  const works = getWorks({ limit: 60 });
  const nations = getNations();
  const hero = heroImageUrl(
    'Pacific craft and weaving, studio light, warm earth tones',
    'market-hero',
    1800,
    900,
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
              className="mt-3 font-display font-semibold text-white break-words"
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
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent-jade)]" />
                Inati pricing: transparent 95/5 split
              </div>
              <a
                href="#drops"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <Icon name="zap" size={13} />
                See current drops
              </a>
            </div>
          </div>
        </div>
      </header>

      <DropsZone />

      {/* Why Inati? — relocated from old /drops page */}
      <section className="mb-12">
        <div
          className="rounded-2xl px-6 py-6 sm:px-8"
          style={{ background: 'color-mix(in srgb, var(--ink) 4%, transparent)' }}
        >
          <p
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Why Inati?
          </p>
          <blockquote
            className="font-editorial text-lg italic md:text-xl"
            style={{ color: 'var(--ink)', lineHeight: 1.5 }}
          >
            &ldquo;Inati reminds us that when a catch comes in, every household receives an equal portion. A drop is a catch. The window is 24 hours.&rdquo;
          </blockquote>
        </div>
      </section>

      <MarketBrowse works={works} nations={nations.slice(0, 12)} />
    </div>
  );
}
