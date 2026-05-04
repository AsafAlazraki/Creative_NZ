'use client';

import Link from 'next/link';
import type { Nation } from '@/lib/repo';

export function ExploreFilterBar({
  nations,
  activeNation,
}: {
  nations: Nation[];
  activeNation?: string;
}) {
  const options = [
    { id: 'all', label: 'For You', icon: '◎' },
    ...nations.slice(0, 12).map((n) => ({ id: n.id, label: n.name, icon: n.flag })),
  ];

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-4 mb-4"
      style={{ scrollbarWidth: 'none' }}
    >
      {options.map((o) => {
        const isActive = o.id === 'all' ? !activeNation : activeNation === o.id;
        return (
          <Link
            key={o.id}
            href={o.id === 'all' ? '/explore' : `/explore?nation=${o.id}`}
            style={{
              padding: '7px 14px', borderRadius: 99,
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 5,
              background: isActive ? 'var(--moana)' : 'var(--surface)',
              color: isActive ? '#fff' : 'var(--ink-muted)',
              boxShadow: isActive ? 'none' : 'inset 0 0 0 1px var(--rule)',
              transition: 'all 150ms ease',
              textDecoration: 'none',
            }}
          >
            <span>{o.icon}</span>{o.label}
          </Link>
        );
      })}
    </div>
  );
}
