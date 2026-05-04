import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleById, getArticles } from '@/lib/repo';
import { CulturalPattern } from '@/components/cultural/CulturalPattern';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = getArticleById(id);
  if (!a) notFound();
  const relatedIds = a.relatedArticleIds as readonly string[];
  const related = getArticles().filter((x) => relatedIds.includes(x.id));

  const paragraphs = a.body.split('\n\n');
  const midQuote = a.pullQuotes.find((q) => q.position === 'mid');
  const earlyQuote = a.pullQuotes.find((q) => q.position === 'early');
  const lateQuote = a.pullQuotes.find((q) => q.position === 'late');
  const midIdx = Math.floor(paragraphs.length / 2);
  const earlyIdx = Math.max(1, Math.floor(paragraphs.length / 5));
  const lateIdx = Math.min(paragraphs.length - 2, Math.floor((paragraphs.length * 4) / 5));

  return (
    <div>
      <CulturalPattern
        id="pattern-niu"
        opacity={0.1}
        tone="brand"
        size={56}
        className="border-b"
      >
        <div className="px-4 py-10 lg:px-10">
          <nav className="mb-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
            <Link href="/kete" className="hover:underline">
              Kete
            </Link>
            <span className="mx-2">/</span>
            <span>{a.title}</span>
          </nav>
          <div
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
              {a.readTimeMin} min read · {a.category.replace(/-/g, ' ')}
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
              {a.title}
            </h1>
            <p className="mt-4 text-sm" style={{ color: 'var(--ink-muted)' }}>
              by {a.author} · {new Date(a.publishedAt).toLocaleDateString('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </CulturalPattern>

      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 lg:grid-cols-[1fr_240px] lg:px-10">
        <article className="min-w-0 font-editorial" style={{ color: 'var(--ink)', fontSize: 19, lineHeight: 1.65 }}>
          <p
            className="mb-8 text-xl italic"
            style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}
          >
            {a.excerpt}
          </p>
          {paragraphs.map((p, i) => {
            const isHeading = p.startsWith('## ');
            const text = isHeading ? p.replace(/^##\s+/, '') : p;
            const nodes: React.ReactNode[] = [];
            if (i === earlyIdx && earlyQuote) {
              nodes.push(
                <blockquote key={`q-${i}`} className="pull-quote my-8">
                  "{earlyQuote.text}"
                </blockquote>,
              );
            }
            if (isHeading) {
              nodes.push(
                <h2
                  key={i}
                  className="mb-3 mt-10 font-display text-2xl font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {text}
                </h2>,
              );
            } else {
              nodes.push(
                <p key={i} className="mb-5">
                  {text}
                </p>,
              );
            }
            if (i === midIdx && midQuote) {
              nodes.push(
                <blockquote key={`q2-${i}`} className="pull-quote my-8">
                  "{midQuote.text}"
                </blockquote>,
              );
            }
            if (i === lateIdx && lateQuote) {
              nodes.push(
                <blockquote key={`q3-${i}`} className="pull-quote my-8">
                  "{lateQuote.text}"
                </blockquote>,
              );
            }
            return <div key={i}>{nodes}</div>;
          })}
        </article>

        <aside className="space-y-6">
          {a.sidebar.length > 0 && (
            <section
              className="rounded-xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                Further reading
              </h3>
              <ul className="space-y-2 text-sm">
                {a.sidebar.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target={s.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener"
                      className="hover:underline"
                    >
                      {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {related.length > 0 && (
            <section
              className="rounded-xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
            >
              <h3 className="mb-3 text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                Related articles
              </h3>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.id} className="text-sm">
                    <Link href={`/kete/${r.id}`} className="hover:underline">
                      <div className="font-semibold">{r.title}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {r.readTimeMin} min
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
