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
      <div className="font-mono text-sm font-semibold" style={{ color: 'var(--accent-coral)' }}>
        Closed
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="font-mono tabular-nums">
        <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
          Closes in
        </div>
        <div className="text-4xl font-semibold md:text-5xl lg:text-6xl" style={{ color: 'var(--ink)' }}>
          {c.days > 0 ? `${c.days}d ` : ''}
          {c.hours.toString().padStart(2, '0')}:{c.minutes.toString().padStart(2, '0')}:
          {c.seconds.toString().padStart(2, '0')}
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono tabular-nums">
      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        Closes in
      </div>
      <div className="text-lg font-semibold">
        {c.days > 0 ? `${c.days}d ` : ''}
        {c.hours.toString().padStart(2, '0')}:{c.minutes.toString().padStart(2, '0')}:
        {c.seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}
