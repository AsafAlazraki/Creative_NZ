'use client';
import { useState, useTransition } from 'react';
import { switchTheme, switchCulturalTheme } from '@/app/actions';
import { Icon } from '@/components/ui/Icon';

const CULTURAL_THEMES = [
  { id: 'ula-fala', label: 'Ula Fala', color: '#c8342a' },
  { id: 'moana', label: 'Moana', color: '#2f6b7a' },
  { id: 'tapa', label: 'Tapa', color: '#8b5a2b' },
  { id: 'niu', label: 'Niu', color: '#4a7c3a' },
  { id: 'koula', label: 'Koula', color: '#c89836' },
] as const;

export function ThemeControls({
  theme,
  cultural,
}: {
  theme: 'light' | 'dark';
  cultural: string;
}) {
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => start(() => switchTheme(theme === 'dark' ? 'light' : 'dark'))}
        className="rounded-md border p-1.5 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
        style={{ borderColor: 'var(--hairline)' }}
        disabled={pending}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
      </button>
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
          style={{ borderColor: 'var(--hairline)' }}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Cultural theme"
        >
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{
              background: CULTURAL_THEMES.find((c) => c.id === cultural)?.color,
            }}
            aria-hidden
          />
          <Icon name="chevron-down" size={12} />
        </button>
        {open && (
          <>
            <button
              aria-hidden
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              tabIndex={-1}
            />
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-44 rounded-lg border shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--hairline)' }}
            >
              <div className="border-b px-3 py-2 text-xs uppercase tracking-wider"
                style={{ borderColor: 'var(--hairline)', color: 'var(--ink-soft)' }}
              >
                Cultural theme
              </div>
              {CULTURAL_THEMES.map((c) => (
                <button
                  key={c.id}
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      await switchCulturalTheme(c.id);
                      setOpen(false);
                    })
                  }
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: c.color }}
                    aria-hidden
                  />
                  <span className="flex-1">{c.label}</span>
                  {c.id === cultural && <Icon name="check" size={14} />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
