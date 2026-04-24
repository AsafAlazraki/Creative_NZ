export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center font-bold ${className ?? ''}`}
      style={{
        width: 14,
        height: 14,
        background: 'var(--verified-jade)',
        color: 'white',
        fontSize: 10,
        lineHeight: 1,
        borderRadius: 2,
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
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${className ?? ''}`}
      style={{
        color: 'var(--elder-halo)',
        background: 'color-mix(in srgb, #e8b42a 12%, transparent)',
        border: '1px solid var(--elder-halo)',
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
        className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{
          color: 'var(--paper)',
          background: 'var(--mana-gold)',
        }}
      >
        CNZ Adviser
      </span>
    );
  if (role === 'collector')
    return (
      <span
        className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{
          color: 'var(--paper)',
          background: 'var(--verified-jade)',
        }}
      >
        Collector
      </span>
    );
  if (role === 'org')
    return (
      <span
        className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{
          color: 'var(--paper)',
          background: 'var(--ground)',
        }}
      >
        Organisation
      </span>
    );
  if (role === 'admin')
    return (
      <span className="bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
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
      className="group relative p-3"
      style={{
        borderLeft: '4px solid var(--mana-gold)',
        background: 'color-mix(in srgb, #c89a1f 6%, var(--paper))',
      }}
      title={citation}
    >
      <div className="flex items-center gap-2">
        <span className="mana-dot" aria-hidden />
        <div className="flex-1">
          <div className="font-display text-sm" style={{ color: 'var(--mana-gold)', letterSpacing: '-0.01em' }}>
            {name}
          </div>
          <div className="text-xs font-body" style={{ color: 'var(--ink-muted)' }}>
            {body} · {year}
            {amount ? ` · $${amount.toLocaleString()}` : ''}
          </div>
        </div>
      </div>
      {citation && (
        <p
          className="mt-2 hidden font-editorial italic text-[13px] group-hover:block"
          style={{ color: 'var(--ink-muted)', lineHeight: 1.4 }}
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
      className={`inline-flex items-center gap-1 font-bold uppercase tracking-[0.16em] ${
        size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]'
      }`}
      style={{
        color: 'var(--paper)',
        background: 'var(--ceremony-primary)',
      }}
      title="Inati — 95% of this sale goes directly to the artist."
    >
      95% ◯
    </span>
  );
}

export function TapuIndicator() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
      style={{
        color: 'var(--paper)',
        background: 'var(--tapu-ember)',
      }}
      title="Tapu — restricted to members of the artist's primary nation group."
    >
      ● Tapu
    </span>
  );
}
