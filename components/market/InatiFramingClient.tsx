'use client';
import { useEffect, useState } from 'react';

export function InatiFramingClient({ framings }: { framings: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % framings.length), 6500);
    return () => clearInterval(t);
  }, [framings.length]);
  return (
    <aside
      className="mt-10 rounded-2xl border p-8"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface-2)' }}
    >
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
        Why inati?
      </div>
      <p className="mt-3 font-editorial italic" style={{ color: 'var(--ink)', fontSize: 20, lineHeight: 1.55 }}>
        "{framings[idx]}"
      </p>
    </aside>
  );
}
