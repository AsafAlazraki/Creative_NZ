import { getCurrentUser } from '@/lib/auth';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export const metadata = { title: 'Affiliate · KavaWorks' };

const STORIES = [
  {
    name: 'Folasāga Talagi-Pule',
    quote:
      'Lesā brought me in. My first year of premium here was free. What I gained was not a discount — it was a doorway.',
  },
  {
    name: 'Sione Kaho Tāufa',
    quote:
      'The platform is not why I\'m here. The people are. Tautua brought me into the people.',
  },
];

export default async function AffiliatePage() {
  const user = await getCurrentUser();

  return (
    <div className="px-4 py-6 lg:px-10">
      <CulturalPattern
        id="pattern-koula"
        opacity={0.1}
        tone="brand"
        size={48}
        className="mb-8 overflow-hidden rounded-2xl border"
      >
        <div className="p-8 md:p-12">
          <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
            Affiliate — Tautua
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Bring another Pacific artist in. You gain mana, not commission.
          </h1>
          <p className="mt-3 max-w-2xl font-editorial italic" style={{ color: 'var(--ink-muted)', fontSize: 18, lineHeight: 1.5 }}>
            Tautua is service. You bring another artist; they receive a year of premium access free.
            You receive public recognition in their profile acknowledgements. No financial kickback.
            This is deliberate.
          </p>
        </div>
      </CulturalPattern>

      <section className="mb-10">
        <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          Your referral link
        </h2>
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
        >
          <code className="font-mono text-sm">kavaworks.demo/join?via={user.handle}</code>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">Stories</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {STORIES.map((s) => (
            <blockquote
              key={s.name}
              className="rounded-xl border p-5"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <p className="font-editorial italic" style={{ color: 'var(--ink)', fontSize: 17, lineHeight: 1.5 }}>
                "{s.quote}"
              </p>
              <footer className="mt-2 text-sm font-semibold" style={{ color: 'var(--ink-muted)' }}>
                — {s.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
