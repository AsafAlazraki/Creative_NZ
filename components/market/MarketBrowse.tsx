'use client';

import { useMemo, useState } from 'react';
import { WorkCard } from '@/components/market/WorkCard';
import type { HydratedWork } from '@/lib/repo';

type Nation = { id: string; flag: string; name: string };

const MEDIUMS: { label: string; match: (artform: string) => boolean }[] = [
  { label: 'All', match: () => true },
  { label: 'Fibre', match: (a) => /weaving|fibre|fiber|fala|kete|bilum/i.test(a) },
  { label: 'Carving', match: (a) => /carving|whakairo|sculpture|bone|wood/i.test(a) },
  { label: 'Jewellery', match: (a) => /jewell|shell|necklace/i.test(a) },
  { label: 'Fashion', match: (a) => /fashion|garment|dress/i.test(a) },
  { label: 'Tapa & Siapo', match: (a) => /siapo|ngatu|tapa|hiapo|kapa|masi/i.test(a) },
  { label: 'Tīvaevae', match: (a) => /tīvaevae|tivaevae/i.test(a) },
];

type SortKey = 'newest' | 'priceAsc' | 'priceDesc';

export function MarketBrowse({ works, nations }: { works: HydratedWork[]; nations: Nation[] }) {
  const [medium, setMedium] = useState('All');
  const [nationId, setNationId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('newest');

  const filtered = useMemo(() => {
    const mediumMatch = MEDIUMS.find((m) => m.label === medium)?.match ?? (() => true);
    let out = works.filter((w) => mediumMatch(w.artform));
    if (nationId) out = out.filter((w) => w.nationId === nationId);
    if (sort === 'priceAsc') out = [...out].sort((a, b) => a.priceNzd - b.priceNzd);
    else if (sort === 'priceDesc') out = [...out].sort((a, b) => b.priceNzd - a.priceNzd);
    else out = [...out].sort((a, b) => b.yearMade - a.yearMade);
    return out;
  }, [works, medium, nationId, sort]);

  return (
    <>
      <div
        className="sticky top-0 z-10 -mx-4 mb-6 flex flex-col gap-2 border-b px-4 py-3 lg:-mx-10 lg:px-10 xl:-mx-16 xl:px-16"
        style={{
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--hairline)',
        }}
      >
        {/* Row 1 — medium tabs (left) + sort (right) */}
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex flex-shrink min-w-0 items-center gap-1 overflow-x-auto rounded-lg p-1 scrollbar-none"
            style={{ background: 'color-mix(in srgb, var(--ink) 5%, transparent)' }}
          >
            {MEDIUMS.map((m) => {
              const active = medium === m.label;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMedium(m.label)}
                  className="flex-shrink-0 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap"
                  style={{
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--bg)' : 'var(--ink-muted)',
                    boxShadow: active ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort works"
            className="flex-shrink-0 rounded-lg border bg-transparent px-3 py-1.5 text-xs font-medium focus:outline-none"
            style={{
              borderColor: 'color-mix(in srgb, var(--ink) 15%, transparent)',
              color: 'var(--ink-muted)',
            }}
          >
            <option value="newest">Newest first</option>
            <option value="priceAsc">Price: low → high</option>
            <option value="priceDesc">Price: high → low</option>
          </select>
        </div>

        {/* Row 2 — nation chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setNationId(null)}
            className="flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap"
            style={{
              borderColor: nationId === null ? 'var(--ink)' : 'color-mix(in srgb, var(--ink) 15%, transparent)',
              background: nationId === null ? 'var(--ink)' : 'transparent',
              color: nationId === null ? 'var(--bg)' : 'var(--ink-muted)',
            }}
          >
            All nations
          </button>
          {nations.map((n) => {
            const active = nationId === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setNationId(active ? null : n.id)}
                className="flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap"
                style={{
                  borderColor: active ? 'var(--ink)' : 'color-mix(in srgb, var(--ink) 15%, transparent)',
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--bg)' : 'var(--ink-muted)',
                }}
              >
                {n.flag} {n.name}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}>
          <p className="font-semibold">No works match these filters.</p>
          <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
            Try a different medium or nation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filtered.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      )}
    </>
  );
}
