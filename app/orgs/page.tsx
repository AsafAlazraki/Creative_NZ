import Link from 'next/link';
import { getOrgs } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export const metadata = { title: 'Organisations · KavaWorks' };

export default async function OrgsPage() {
  const orgs = getOrgs();
  return (
    <div className="px-4 py-6 lg:px-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--ink-soft)' }}>
          Arts organisations
        </div>
        <h1 className="mt-2 font-display text-4xl font-semibold">Galleries, collectives, festivals.</h1>
      </header>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {orgs.map((o) => (
          <Link
            key={o.id}
            href={`/orgs/${o.id}`}
            className="overflow-hidden rounded-xl border transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
          >
            <CulturalPattern id="pattern-moana" opacity={0.1} tone="brand" size={48} className="aspect-[16/9] border-b">
              <div className="flex aspect-[16/9] items-end p-4">
                <div className="font-display text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  {o.name.split('—')[0].trim()}
                </div>
              </div>
            </CulturalPattern>
            <div className="p-5">
              <h2 className="font-display text-lg font-semibold">{o.name}</h2>
              <p className="mt-1 text-xs" style={{ color: 'var(--ink-muted)' }}>
                {o.city} · est. {o.foundedYear ?? '—'}
              </p>
              <p className="mt-2 line-clamp-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
                {o.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {o.focus.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border px-2 py-0.5 text-[10px]"
                    style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
