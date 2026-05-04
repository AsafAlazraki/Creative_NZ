'use client';
import { useEffect, useState } from 'react';
import { countdown } from '@/lib/utils';

type Countdown = ReturnType<typeof countdown>;

const PLACEHOLDER = '--';

export function CountdownClient({ target, size = 'sm' }: { target: string; size?: 'sm' | 'lg' }) {
  const [c, setC] = useState<Countdown | null>(null);

  useEffect(() => {
    setC(countdown(target));
    const t = setInterval(() => setC(countdown(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const units = [
    { v: c ? String(c.hours).padStart(2, '0') : PLACEHOLDER, l: 'h' },
    { v: c ? String(c.minutes).padStart(2, '0') : PLACEHOLDER, l: 'm' },
    { v: c ? String(c.seconds).padStart(2, '0') : PLACEHOLDER, l: 's' },
  ];

  if (c !== null && c.total <= 0) {
    return (
      <div className="font-mono text-sm font-semibold" style={{ color: 'var(--status-closed)' }}>
        Closed
      </div>
    );
  }

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
