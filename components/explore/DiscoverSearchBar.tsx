'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

export function DiscoverSearchBar({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      startTransition(() => {
        if (val.trim()) {
          router.push(`/discover?q=${encodeURIComponent(val.trim())}`);
        } else {
          router.push('/discover');
        }
      });
    },
    [router],
  );

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        type="text"
        defaultValue={initialValue}
        onChange={handleChange}
        placeholder="Artists · artforms · grants · groups"
        className="w-full bg-transparent text-lg outline-none"
        style={{ color: 'var(--ink)' }}
        autoFocus={!!initialValue}
      />
    </div>
  );
}
