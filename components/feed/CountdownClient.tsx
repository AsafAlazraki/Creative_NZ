'use client';
import { useEffect, useState } from 'react';
import { countdown } from '@/lib/utils';

export function CountdownClient({ target, size = 'sm' }: { target: string; size?: 'sm' | 'lg' }) {
  const [c, setC] = useState(() => countdown(target));
  useEffect(() => {
    const t = setInterval(() => setC(countdown(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  if (c.total <= 0) {
    return (
      <div className="font-mono text-sm font-semibold" style={{ color: 'var(--coral)' }}>
        Closed
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        {[{ v: c.hours, l: 'h' }, { v: c.minutes, l: 'm' }, { v: c.seconds, l: 's' }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: 'center', minWidth: 52 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 28, color: 'var(--coral)' }}>
              {String(v).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 9, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {l}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, width: '100%' }}>
      {[{ v: c.hours, l: 'h' }, { v: c.minutes, l: 'm' }, { v: c.seconds, l: 's' }].map(({ v, l }) => (
        <div key={l} style={{ textAlign: 'center', minWidth: 44 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22, color: 'var(--coral)' }}>
            {String(v).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}
