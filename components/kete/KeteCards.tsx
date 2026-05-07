import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

/**
 * Kete page components — dark editorial layout per the redesign brief.
 *
 * Hero, section headers, feature/compact/wide article cards, and the
 * Kōrero Mai CTA. The sticky topic nav is a separate client component
 * (KeteTopicNav.tsx) since it needs scroll-spy behaviour.
 */

export function KeteHero({ articleCount, threadCount }: { articleCount: number; threadCount: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl px-6 pb-10 pt-12 sm:px-10 sm:pt-14" style={{ background: '#1a1815' }}>
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-6 select-none font-bold leading-none text-white/[0.03]"
        style={{ fontSize: 180, letterSpacing: '-0.04em' }}
      >
        KETE
      </span>

      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">
        The Kete Toolkit
      </p>

      <h1
        className="mb-4 max-w-xl font-display font-bold leading-[1.15] text-white break-words"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        Tautua — free guidance from practitioners who have been there.
      </h1>

      <p className="mb-8 max-w-md font-editorial italic leading-relaxed text-white/75" style={{ fontSize: 15 }}>
        Articles written by Pacific artists, arts advisers, and elders. All free, always. Inati.
      </p>

      <div className="flex flex-wrap items-end gap-x-8 gap-y-5 border-t border-white/10 pt-6">
        <HeroStat value={String(articleCount)} label="Articles" />
        <HeroStat value={String(threadCount)} label="Topic threads" />
        <HeroStat value="Free" label="Always · Inati" accent />
      </div>
    </div>
  );
}

function HeroStat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <p className="font-display text-[32px] font-bold leading-none" style={{ color: accent ? 'var(--accent-jade)' : '#fff' }}>
        {value}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">{label}</p>
    </div>
  );
}

export function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div
      className="mb-4 flex items-baseline justify-between border-b pb-3"
      style={{ borderColor: 'color-mix(in srgb, var(--ink) 8%, transparent)' }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--ink-muted)' }}>
        {title}
      </span>
      <span className="text-[11px]" style={{ color: 'var(--ink-muted)' }}>
        {count} {count === 1 ? 'article' : 'articles'}
      </span>
    </div>
  );
}

export function FeatureCard({
  bgColor,
  watermarkWord,
  readTime,
  title,
  excerpt,
  authorInitials,
  authorName,
  authorRole,
  slug,
}: {
  bgColor: string;
  watermarkWord: string;
  readTime: number;
  title: string;
  excerpt: string;
  authorInitials: string;
  authorName: string;
  authorRole: string;
  slug: string;
}) {
  return (
    <Link
      href={`/kete/${slug}`}
      className="group relative block overflow-hidden rounded-2xl p-7 transition-transform hover:-translate-y-0.5 hover:shadow-xl sm:p-8"
      style={{ backgroundColor: bgColor, color: '#fff' }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-5 right-4 select-none font-bold leading-none text-white/[0.07]"
        style={{ fontSize: 100, letterSpacing: '-0.04em' }}
      >
        {watermarkWord}
      </span>

      <span
        className="absolute right-6 top-6 translate-x-1 -translate-y-1 text-lg text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      >
        ↗
      </span>

      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded bg-white/15 px-2.5 py-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80">
            {readTime} min read
          </span>
        </div>

        <h3 className="mb-3 max-w-lg font-display text-[22px] font-bold leading-[1.3] text-white">
          {title}
        </h3>

        <p className="mb-6 max-w-xl text-[13px] leading-relaxed text-white/75">
          {excerpt}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold text-white">
            {authorInitials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-white">{authorName}</p>
            <p className="truncate text-[11px] text-white/60">{authorRole}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CompactCard({
  readTime,
  title,
  excerpt,
  authorName,
  authorRole,
  slug,
}: {
  readTime: number;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  slug: string;
}) {
  return (
    <Link
      href={`/kete/${slug}`}
      className="group relative block overflow-hidden rounded-2xl border p-6 transition-all hover:-translate-y-0.5"
      style={{
        borderColor: 'color-mix(in srgb, var(--ink) 8%, transparent)',
        background: 'var(--surface)',
      }}
    >
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#534AB7' }}>
        {readTime} min read
      </p>
      <h3 className="mb-2 font-display text-[16px] font-bold leading-[1.4]" style={{ color: 'var(--ink)' }}>
        {title}
      </h3>
      <p className="mb-4 text-[12px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
        {excerpt}
      </p>
      <p className="text-[11px]" style={{ color: 'var(--ink-muted)' }}>
        {authorName} · {authorRole}
      </p>
      <span
        className="absolute right-4 top-4 text-sm opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: 'var(--ink-muted)' }}
        aria-hidden
      >
        ↗
      </span>
    </Link>
  );
}

export function WideHorizontalCard({
  readTime,
  title,
  excerpt,
  authorName,
  authorRole,
  slug,
}: {
  readTime: number;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  slug: string;
}) {
  return (
    <Link
      href={`/kete/${slug}`}
      className="group flex items-start gap-5 rounded-2xl border border-l-[3px] p-5 transition-all hover:-translate-y-0.5 sm:gap-6 sm:p-6"
      style={{
        borderColor: 'color-mix(in srgb, var(--ink) 8%, transparent)',
        borderLeftColor: '#534AB7',
        background: 'var(--surface)',
      }}
    >
      <div className="w-16 flex-shrink-0 text-right sm:w-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#534AB7' }}>Read</p>
        <p className="font-display text-[26px] font-bold leading-none sm:text-[28px]" style={{ color: '#3C3489' }}>
          {readTime}
        </p>
        <p className="text-[10px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-muted)' }}>mins</p>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 font-display text-[16px] font-bold leading-[1.4] sm:text-[17px]" style={{ color: 'var(--ink)' }}>
          {title}
        </h3>
        <p className="mb-3 text-[12px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
          {excerpt}
        </p>
        <p className="text-[11px]" style={{ color: 'var(--ink-muted)' }}>{authorName} · {authorRole}</p>
      </div>
      <span
        className="hidden flex-shrink-0 self-center text-sm opacity-0 transition-opacity group-hover:opacity-100 sm:block"
        style={{ color: 'var(--ink-muted)' }}
        aria-hidden
      >
        ↗
      </span>
    </Link>
  );
}

export function KoreroMaiCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10 sm:py-14" style={{ background: '#1a1815' }}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-8 select-none text-center font-bold leading-none text-white/[0.025]"
        style={{ fontSize: 100 }}
      >
        KŌRERO MAI
      </span>

      <div className="relative">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/65">
          Ask an adviser
        </p>
        <h2 className="mb-2 font-display font-bold text-white" style={{ fontSize: 28 }}>Kōrero mai.</h2>
        <p className="mx-auto mb-8 max-w-sm text-[14px] leading-relaxed text-white/70">
          Book a free, confidential kōrero with a Pacific Arts Practice Adviser. No obligation. Inati.
        </p>

        <a
          href="mailto:koreromai@kavaworks.demo"
          className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/[0.18] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.28]"
        >
          <Icon name="mail" size={16} />
          koreromai@kavaworks.demo
        </a>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {['Free', 'Confidential', 'No obligation'].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/60"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
