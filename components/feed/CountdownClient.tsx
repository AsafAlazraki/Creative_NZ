'use client';
import { useEffect, useState } from 'react';
import { countdown } from '@/lib/utils';

type Countdown = ReturnType<typeof countdown>;

export function CountdownClient({ target, size = 'sm' }: { target: string; size?: 'sm' | 'lg' }) {
  const [c, setC] = useState<Countdown | null>(null);

  useEffect(() => {
    setC(countdown(target));
    const t = setInterval(() => setC(countdown(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  if (c === null) {
    const numSize = size === 'lg' ? 28 : 22;
    const minWidth = size === 'lg' ? 52 : 44;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, width: size === 'sm' ? '100%' : undefined }}>
        {['h', 'm', 's'].map((l) => (
          <div key={l} style={{ textAlign: 'center', minWidth }}>
            <div className="skeleton rounded" style={{ height: numSize, width: minWidth - 8 }} />
            <div style={{ fontSize: 9, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>
              {l}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (c.total <= 0) {
    return (
      <div className="font-mono text-sm font-semibold" style={{ color: 'var(--status-closed)' }}>
        Closed
      </div>
    );
  }

  const units = [
    { v: String(c.hours).padStart(2, '0'), l: 'h' },
    { v: String(c.minutes).padStart(2, '0'), l: 'm' },
    { v: String(c.seconds).padStart(2, '0'), l: 's' },
  ];

  const numSize = size === 'lg' ? 28 : 22;
  const minWidth = size === 'lg' ? 52 : 44;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, width: size === 'sm' ? '100%' : undefined }}>
      {units.map(({ v, l }) => (
        <div key={l} style={{ textAlign: 'center', minWidth }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: numSize, color: 'var(--coral)' }}>
            {v}
          </div>
          <div style={{ fontSize: 9, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}
