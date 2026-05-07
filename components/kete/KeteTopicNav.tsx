'use client';

import { useEffect, useState } from 'react';

const TOPICS = [
  { id: 'all', label: 'All' },
  { id: 'shipping', label: 'Shipping & logistics' },
  { id: 'living', label: 'Making a living' },
  { id: 'grants', label: 'Navigating grants' },
  { id: 'protocols', label: 'Cultural protocols' },
] as const;

export function KeteTopicNav() {
  const [active, setActive] = useState<string>('all');

  useEffect(() => {
    const sectionIds = ['shipping', 'living', 'grants', 'protocols'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );
    const els: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        els.push(el);
      }
    });

    // When the user is above the first section, fall back to "all".
    const onScroll = () => {
      if (window.scrollY < 200) setActive('all');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="sticky top-0 z-20 -mx-4 border-b px-4 py-3 lg:-mx-6 lg:px-6"
      style={{
        background: 'color-mix(in srgb, var(--bg) 90%, transparent)',
        backdropFilter: 'blur(12px)',
        borderColor: 'color-mix(in srgb, var(--ink) 8%, transparent)',
      }}
      aria-label="Kete sections"
    >
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        {TOPICS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleClick(id)}
              className="flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors"
              style={{
                borderColor: isActive ? 'var(--ink)' : 'color-mix(in srgb, var(--ink) 12%, transparent)',
                background: isActive ? 'var(--ink)' : 'transparent',
                color: isActive ? 'var(--bg)' : 'var(--ink-muted)',
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
