import { PACIFIC_PROVERBS } from '@/lib/tauhi-va-kb';

export function EmptyState({
  title,
  proverb,
  cta,
}: {
  title: string;
  proverb?: (typeof PACIFIC_PROVERBS)[number];
  cta?: { label: string; href: string };
}) {
  const pick = proverb ?? PACIFIC_PROVERBS[0];
  return (
    <div
      className="rounded-xl border p-10 text-center"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
    >
      <p className="font-display text-xl">{title}</p>
      <blockquote className="mx-auto mt-4 max-w-md">
        <p
          className="font-editorial italic"
          style={{ color: 'var(--ink-muted)', lineHeight: 1.5 }}
        >
          "{pick.text}"
        </p>
        <footer className="mt-2 text-xs" style={{ color: 'var(--ink-soft)' }}>
          {pick.language} · {pick.meaning}
        </footer>
      </blockquote>
      {cta && (
        <a
          href={cta.href}
          className="mt-6 inline-block rounded-lg px-5 py-2 text-sm font-semibold"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
