import Link from 'next/link';
import { getArticles } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export const metadata = { title: 'Kete Toolkit · KavaWorks' };

const CATEGORY_LABELS: Record<string, string> = {
  'making-a-living': 'Making a living',
  'navigating-grants': 'Navigating grants',
  'cultural-protocols': 'Cultural protocols',
  'shipping-logistics': 'Shipping & logistics',
  'taxes': 'Taxes for artists in NZ',
  'copyright': 'Copyright & moral rights',
};

export default async function KetePage() {
  const articles = getArticles();
  const byCategory = articles.reduce<Record<string, typeof articles>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="px-4 py-6 lg:px-10">
      <CulturalPattern
        id="pattern-niu"
        opacity={0.1}
        tone="brand"
        size={56}
        className="mb-8 overflow-hidden rounded-2xl border"
      >
        <div className="p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Kete Toolkit
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Tautua — free guidance from practitioners who have been there.
          </h1>
          <p className="mt-3 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}>
            Articles written by Pacific artists, arts advisers, and elders. All free, always. Inati.
          </p>
        </div>
      </CulturalPattern>

      {Object.entries(byCategory).map(([cat, list]) => (
        <section key={cat} className="mb-10">
          <h2 className="mb-4 font-display text-xl font-semibold">
            {CATEGORY_LABELS[cat] ?? cat}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {list.map((a) => (
              <Link
                key={a.id}
                href={`/kete/${a.id}`}
                className="rounded-xl border p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
                style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
              >
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                  {a.readTimeMin} min read · by {a.author}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                  {a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section
        className="mt-10 rounded-xl border p-5"
        style={{
          borderColor: 'color-mix(in srgb, var(--accent-coral) 30%, transparent)',
          background: 'color-mix(in srgb, var(--accent-coral) 4%, transparent)',
        }}
      >
        <h2 className="font-display text-lg font-semibold">Kōrero mai — ask an adviser</h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Book a kōrero with a Pacific Arts Practice Adviser. Free, confidential, no obligation.
        </p>
        <a
          href="mailto:koreromai@kavaworks.demo"
          className="mt-3 inline-block rounded-md border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: 'var(--hairline)' }}
        >
          koreromai@kavaworks.demo
        </a>
      </section>
    </div>
  );
}
