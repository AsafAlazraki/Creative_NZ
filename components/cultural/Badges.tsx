export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold ${className ?? ''}`}
      style={{
        width: 14,
        height: 14,
        background: 'var(--accent-jade)',
        color: 'white',
        fontSize: 10,
        lineHeight: 1,
      }}
      aria-label="Verified"
      title="Verified artist"
    >
      ✓
    </span>
  );
}

export function ElderBadge({
  label = 'Elder',
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${className ?? ''}`}
      style={{
        color: 'var(--accent-gold)',
        background: 'color-mix(in srgb, #b8913d 12%, transparent)',
      }}
      aria-label={label}
      title={label}
    >
      <span aria-hidden>✦</span>
      {label}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  if (role === 'adviser')
    return (
      <span
        className="rounded-full px-2 py-0.5 text-xs font-semibold"
        style={{
          color: 'var(--accent-coral)',
          background: 'color-mix(in srgb, #e07856 12%, transparent)',
        }}
      >
        Pacific Arts Adviser
      </span>
    );
  if (role === 'collector')
    return (
      <span
        className="rounded-full px-2 py-0.5 text-xs font-semibold"
        style={{
          color: 'var(--accent-jade)',
          background: 'color-mix(in srgb, #5a7a6b 12%, transparent)',
        }}
      >
        Collector
      </span>
    );
  if (role === 'org')
    return (
      <span
        className="rounded-full px-2 py-0.5 text-xs font-semibold"
        style={{
          color: 'var(--accent-ocean)',
          background: 'color-mix(in srgb, #2f5d6b 12%, transparent)',
        }}
      >
        Arts Organisation
      </span>
    );
  if (role === 'admin')
    return (
      <span className="rounded-full bg-black px-2 py-0.5 text-xs font-semibold text-white">
        Admin
      </span>
    );
  return null;
}

export function ManaBadge({
  name,
  year,
  body,
  amount,
  citation,
}: {
  name: string;
  year: number;
  body: string;
  amount?: number;
  citation?: string;
}) {
  return (
    <div
      className="group relative rounded-lg border px-3 py-2"
      style={{
        borderColor: 'color-mix(in srgb, #b8913d 30%, transparent)',
        background: 'color-mix(in srgb, #b8913d 5%, transparent)',
      }}
      title={citation}
    >
      <div className="flex items-center gap-2">
        <span className="mana-dot" aria-hidden />
        <div className="flex-1">
          <div className="font-display text-sm font-semibold" style={{ color: 'var(--accent-gold)' }}>
            {name}
          </div>
          <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
            {body} · {year}
            {amount ? ` · $${amount.toLocaleString()}` : ''}
          </div>
        </div>
      </div>
      {citation && (
        <p
          className="mt-2 hidden text-xs italic group-hover:block"
          style={{ color: 'var(--ink-muted)' }}
        >
          {citation}
        </p>
      )}
    </div>
  );
}

export function InatiBadge({ size = 'sm' }: { size?: 'xs' | 'sm' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
      }`}
      style={{
        color: 'var(--accent-jade)',
        background: 'color-mix(in srgb, #5a7a6b 10%, transparent)',
      }}
      title="Inati — 95% of this sale goes directly to the artist."
    >
      95%
    </span>
  );
}

export function TapuIndicator() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{
        color: 'var(--accent-coral)',
        background: 'color-mix(in srgb, #e07856 12%, transparent)',
      }}
      title="Tapu — this work is visible only to members of the artist's primary nation group."
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        <circle
          cx="5"
          cy="5"
          r="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      Tapu
    </span>
  );
}
