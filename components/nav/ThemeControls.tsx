'use client';
import { useState, useTransition } from 'react';
import { switchTheme, switchCulturalTheme } from '@/app/actions';
import { Icon } from '@/components/ui/Icon';

const CULTURAL_THEMES = [
  { id: 'ula-fala', label: 'Ula', hint: 'Sāmoan siapo red', color: '#b8261c' },
  { id: 'koula', label: 'Ngatu', hint: 'Tongan koka gold', color: '#c89a1f' },
  { id: 'tivaevae', label: 'Tīvaevae', hint: 'Cook Islands cerise', color: '#d62960' },
  { id: 'tapa', label: 'Masi', hint: 'Fijian bark charcoal', color: '#3e2d1b' },
  { id: 'kapa', label: 'Kapa', hint: 'Hawaiian dark-ground', color: '#1e1e1e' },
  { id: 'niu', label: 'Bilum', hint: 'PNG networked jade', color: '#0c5c3a' },
  { id: 'moana', label: 'Te Bino', hint: 'Kiribati shell + indigo', color: '#0e1e3a' },
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
        className="border-2 p-2 transition-colors hover:bg-[color-mix(in_srgb,var(--paper)_14%,transparent)]"
        style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
        disabled={pending}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
      </button>
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 border-2 px-3 py-2 text-xs font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--paper)_14%,transparent)]"
          style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Cultural theme"
        >
          <span
            className="inline-block h-4 w-4"
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
              className="absolute right-0 z-50 mt-2 w-60 border-2"
              style={{ background: 'var(--surface)', borderColor: 'var(--ink)' }}
            >
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ borderBottom: 'var(--line)', color: 'var(--ink-muted)' }}
              >
                Cultural ceremony
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
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]"
                >
                  <span
                    className="inline-block h-4 w-4 shrink-0"
                    style={{ background: c.color }}
                    aria-hidden
                  />
                  <span className="flex-1">
                    <span className="font-semibold">{c.label}</span>
                    <span className="block text-[11px]" style={{ color: 'var(--ink-muted)' }}>
                      {c.hint}
                    </span>
                  </span>
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
