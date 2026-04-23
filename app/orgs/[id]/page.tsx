import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrgById, getArtistsByIds } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';
import { AvatarIllustrated } from '@/components/cultural/Avatar';

export default async function OrgDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = getOrgById(id);
  if (!o) notFound();
  const linked = getArtistsByIds(o.linkedArtistIds);

  return (
    <div>
      <CulturalPattern id="pattern-moana" opacity={0.14} tone="brand" size={56} className="border-b">
        <div className="px-4 py-10 lg:px-10">
          <nav className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <Link href="/orgs" className="hover:underline">
              Organisations
            </Link>
            <span className="mx-2">/</span>
            <span>{o.name}</span>
          </nav>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">{o.name}</h1>
          <div className="mt-2 text-sm" style={{ color: 'var(--ink-muted)' }}>
            {o.city} · founded {o.foundedYear}
          </div>
        </div>
      </CulturalPattern>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 lg:px-10">
        <section>
          <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
            About
          </h2>
          <p className="font-editorial text-lg" style={{ color: 'var(--ink)', lineHeight: 1.6 }}>
            {o.description}
          </p>
          <a
            href={o.website}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm underline"
          >
            {o.website} →
          </a>
        </section>

        {o.currentProgrammes.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Current programmes
            </h2>
            <ul className="space-y-3">
              {o.currentProgrammes.map((p) => (
                <li
                  key={p.title}
                  className="rounded-lg border p-4"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-0.5 text-xs font-mono" style={{ color: 'var(--ink-muted)' }}>
                    {p.dates}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {linked.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              Associated artists
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {linked.map((a) => (
                <Link
                  key={a.id}
                  href={`/artist/${a.handle}`}
                  className="flex items-center gap-3 rounded-xl border p-3"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
                >
                  <AvatarIllustrated nationId={a.primaryNationId} size={40} name={a.name} />
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                      {a.city}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
