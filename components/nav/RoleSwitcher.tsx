'use client';
import { useState, useTransition } from 'react';
import { ROLES, type RoleId } from '@/lib/role';
import { switchPersona } from '@/app/actions';
import { Icon } from '@/components/ui/Icon';

export function RoleSwitcher({ currentRole }: { currentRole: RoleId }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const current = ROLES.find((r) => r.id === currentRole) ?? ROLES[0];

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 border-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[color-mix(in_srgb,var(--paper)_14%,transparent)]"
        style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Icon name="user" size={14} />
        <span>
          View as <span className="font-semibold">{current.label}</span>
        </span>
        <Icon name="chevron-down" size={14} />
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
            className="absolute right-0 z-50 mt-2 w-80 border-2"
            style={{ background: 'var(--surface)', borderColor: 'var(--ink)' }}
          >
            <div className="border-b px-4 py-3" style={{ borderColor: 'var(--hairline)' }}>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                View as…
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--ink-muted)' }}>
                Every role sees KavaWorks differently. Switch to preview.
              </p>
            </div>
            <ul className="max-h-96 overflow-y-auto">
              {ROLES.map((r) => (
                <li key={r.id}>
                  <button
                    className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                    disabled={pending}
                    onClick={() => {
                      start(async () => {
                        await switchPersona(r.personaId);
                        setOpen(false);
                      });
                    }}
                  >
                    <span
                      className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background:
                          r.id === currentRole ? 'var(--brand)' : 'var(--ink-soft)',
                      }}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{r.label}</div>
                      <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                        {r.description}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
