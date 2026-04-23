import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGrantById, getGrants } from '@/lib/repo';
import { getCurrentUser } from '@/lib/auth';
import { daysUntil } from '@/lib/moana-ola-kb';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { Icon } from '@/components/ui/Icon';

export default async function GrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const g = getGrantById(id);
  if (!g) notFound();
  const viewer = await getCurrentUser();
  const all = getGrants();
  const similar = all.filter((x) => g.similarGrantIds.includes(x.id));

  const days = daysUntil(g.deadline);
  const isAdviser = viewer.role === 'adviser';

  return (
    <div className="px-4 py-6 lg:px-10">
      <nav className="mb-6 text-sm" style={{ color: 'var(--ink-muted)' }}>
        <Link href="/grants" className="hover:underline">
          Grants
        </Link>
        <span className="mx-2">/</span>
        <span>{g.name}</span>
      </nav>

      <CulturalPattern id="pattern-koula" opacity={0.1} tone="brand" size={56} className="mb-8 rounded-2xl border overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            {g.funder} · {g.pool === 'pacific' ? 'Pacific pool' : g.pool === 'ngatoi' ? 'Ngā Toi Māori' : 'General'}
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold">{g.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-mono text-xl font-semibold">{g.amountDisplay}</span>
            <span aria-hidden>·</span>
            <span>{g.duration ?? 'Single project'}</span>
            <span aria-hidden>·</span>
            <span
              className="font-mono font-semibold"
              style={{
                color: days > 0 ? (days < 14 ? 'var(--accent-coral)' : 'var(--ink)') : 'var(--ink-soft)',
              }}
            >
              {days > 0 ? `Closes in ${days} days` : 'Closed'}
            </span>
          </div>
        </div>
      </CulturalPattern>

      <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              In plain English
            </h2>
            <div className="font-editorial space-y-4" style={{ color: 'var(--ink)', fontSize: 18, lineHeight: 1.6 }}>
              {g.plainEnglish.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Eligibility
            </h2>
            <ul className="space-y-2 text-[15px]" style={{ color: 'var(--ink)' }}>
              {g.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-2">
                  <span aria-hidden style={{ color: 'var(--brand)' }}>
                    ·
                  </span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              How to apply
            </h2>
            <ol className="space-y-3 text-[15px]" style={{ color: 'var(--ink)' }}>
              {g.howToApply.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold"
                    style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="rounded-lg border-l-4 p-4"
            style={{
              borderColor: 'var(--brand)',
              background: 'color-mix(in srgb, var(--brand) 4%, transparent)',
            }}
          >
            <h3 className="text-sm font-semibold">Assessment</h3>
            <p className="mt-1 text-sm italic" style={{ color: 'var(--ink-muted)' }}>
              {g.assessmentProcess}
            </p>
          </section>

          <a
            href={g.sourceUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold"
            style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          >
            Apply on Creative New Zealand → <Icon name="chevron-right" size={16} />
          </a>
        </div>

        <aside className="space-y-6">
          <dl
            className="rounded-xl border p-4 space-y-3 text-sm"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <Meta label="Opens" value={new Date(g.openDate).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })} />
            <Meta label="Closes" value={new Date(g.deadline).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })} />
            {g.resultsBy && (
              <Meta label="Results by" value={new Date(g.resultsBy).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })} />
            )}
            <Meta label="Amount" value={g.amountDisplay} />
          </dl>

          {isAdviser && (
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: 'color-mix(in srgb, var(--accent-coral) 35%, transparent)',
                background: 'color-mix(in srgb, var(--accent-coral) 4%, transparent)',
              }}
            >
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent-coral)' }}>
                Adviser actions
              </div>
              <button
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm font-semibold"
                style={{ borderColor: 'var(--hairline)' }}
              >
                Surface to my caseload
              </button>
            </div>
          )}

          {similar.length > 0 && (
            <section
              className="rounded-xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3 className="mb-2 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                Similar grants
              </h3>
              <ul className="space-y-2 text-sm">
                {similar.map((s) => (
                  <li key={s.id}>
                    <Link href={`/grants/${s.id}`} className="hover:underline">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {s.amountDisplay}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        {label}
      </dt>
      <dd className="font-mono font-medium">{value}</dd>
    </div>
  );
}
