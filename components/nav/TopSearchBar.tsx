'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';

export function TopSearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = ref.current?.value.trim();
        if (!q) return;
        router.push(`/explore?tag=${encodeURIComponent(q)}`);
      }}
      className={className}
    >
      <label className="sr-only" htmlFor="kw-top-search">
        Search artists, artforms, posts, and works
      </label>
      <div
        className="flex items-center gap-2 rounded-full border bg-[color:var(--surface-2)] px-3 py-1.5"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <Icon name="search" size={14} className="text-[color:var(--ink-soft)]" />
        <input
          id="kw-top-search"
          ref={ref}
          type="search"
          placeholder="Search artists, works, hashtags…"
          className="flex-1 min-w-0 bg-transparent text-sm outline-none"
          autoComplete="off"
        />
        <kbd
          className="hidden text-[10px] font-mono lg:inline-block"
          style={{ color: 'var(--ink-soft)' }}
          aria-hidden
        >
          ⏎
        </kbd>
      </div>
    </form>
  );
}
