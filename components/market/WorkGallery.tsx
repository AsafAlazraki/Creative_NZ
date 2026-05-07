'use client';

import { useEffect, useRef, useState } from 'react';
import { TapuIndicator } from '@/components/cultural/Badges';

type View = { label: string; src: string };

export function WorkGallery({
  views,
  title,
  tapu,
}: {
  views: View[];
  title: string;
  tapu: boolean;
}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' });
  };

  // Sync active index when user scrolls (kept in sync with both snap +
  // thumbnail clicks).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      if (idx !== active) setActive(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [active]);

  return (
    <div className="min-w-0 lg:sticky lg:top-6" style={{ alignSelf: 'start' }}>
      <div
        ref={scrollRef}
        className="relative w-full overflow-y-auto rounded-2xl border bg-[color:var(--surface-2)] snap-y snap-mandatory scrollbar-none lg:h-[calc(100vh-9rem)]"
        style={{ borderColor: 'var(--hairline)', overscrollBehaviorY: 'contain' }}
        tabIndex={0}
        aria-label={`${title} — gallery, ${views.length} angles`}
      >
        {views.map((v, i) => (
          <div
            key={v.label}
            className="relative aspect-[4/5] w-full snap-start snap-always lg:aspect-auto lg:h-full"
          >
            <img
              src={v.src}
              alt={`${title} — ${v.label.toLowerCase()}`}
              className="absolute inset-0 h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
            >
              {i + 1} / {views.length} · {v.label}
            </div>
            {i === 0 && tapu && (
              <div className="absolute right-4 top-4">
                <TapuIndicator />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Thumbnail strip — click to jump to that view */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            onClick={() => {
              setActive(i);
              scrollToIndex(i);
            }}
            aria-label={`Show ${v.label} view`}
            aria-pressed={active === i}
            className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-opacity"
            style={{
              borderColor: active === i ? 'var(--ink)' : 'transparent',
              opacity: active === i ? 1 : 0.55,
            }}
          >
            <img src={v.src} alt="" aria-hidden className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
