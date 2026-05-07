'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

type NationOption = { id: string; flag: string; name: string };

/**
 * Nation filter popover — replaces the old overflowing chip row.
 * Opens a 2-col grid of nation buttons under the trigger; closes on
 * outside click, Escape, or selecting a nation.
 *
 * The trigger itself reads the active nation in the label so users
 * always see what's filtered without opening the popover.
 */
export function NationFilterPopover({
  options,
  selectedId,
  onSelect,
}: {
  options: NationOption[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selected = selectedId ? options.find((o) => o.id === selectedId) : null;
  const triggerLabel = selected ? `${selected.flag} ${selected.name}` : '🌏 All nations';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border bg-[color:var(--bg)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
        style={{
          borderColor: selectedId
            ? 'color-mix(in srgb, var(--ink) 40%, transparent)'
            : 'color-mix(in srgb, var(--ink) 20%, transparent)',
          color: 'var(--ink)',
        }}
      >
        <span className="truncate max-w-[160px]">{triggerLabel}</span>
        <Icon name="chevron-down" size={14} className="opacity-60" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border p-3 shadow-xl"
          style={{
            borderColor: 'color-mix(in srgb, var(--ink) 10%, transparent)',
            background: 'var(--bg)',
            boxShadow: '0 24px 48px -12px rgb(15 14 12 / 0.18)',
          }}
          role="dialog"
          aria-label="Filter by nation"
        >
          <p
            className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: 'var(--ink-muted)' }}
          >
            Filter by nation
          </p>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
              style={
                selectedId === null
                  ? { background: 'var(--ink)', color: 'var(--bg)', fontWeight: 500 }
                  : { color: 'var(--ink)' }
              }
              onMouseEnter={(e) => {
                if (selectedId !== null)
                  e.currentTarget.style.background = 'color-mix(in srgb, var(--ink) 6%, transparent)';
              }}
              onMouseLeave={(e) => {
                if (selectedId !== null) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span className="text-base">🌏</span>
              <span className="truncate">All nations</span>
            </button>
            {options.map((n) => {
              const isActive = selectedId === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    onSelect(n.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors"
                  style={
                    isActive
                      ? { background: 'var(--ink)', color: 'var(--bg)', fontWeight: 500 }
                      : { color: 'var(--ink)' }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background =
                        'color-mix(in srgb, var(--ink) 6%, transparent)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span className="text-base">{n.flag}</span>
                  <span className="truncate">{n.name}</span>
                </button>
              );
            })}
          </div>
          {selectedId !== null && (
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="mt-2 w-full rounded-xl py-2 text-xs transition-colors hover:underline"
              style={{ color: 'var(--ink-muted)' }}
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
