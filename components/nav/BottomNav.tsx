'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { CurrentUser } from '@/lib/auth';
import { Icon } from '@/components/ui/Icon';

const BOTTOM_ITEMS = [
  { id: 'feed', href: '/', icon: 'home' as const, label: 'Home' },
  { id: 'explore', href: '/explore', icon: 'compass' as const, label: 'Explore' },
  { id: 'create', href: '/create', icon: 'plus-square' as const, label: 'Create', accent: true },
  { id: 'market', href: '/market', icon: 'shopping-bag' as const, label: 'Market' },
];

const MORE_ITEMS = [
  { href: '/market#drops', icon: 'zap' as const, label: 'Drops' },
  { href: '/grants', icon: 'award' as const, label: 'Grants' },
  { href: '/events', icon: 'calendar' as const, label: 'Events' },
  { href: '/groups', icon: 'users' as const, label: 'Groups' },
  { href: '/kete', icon: 'book-open' as const, label: 'Kete' },
  { href: '/messages', icon: 'message-circle' as const, label: 'Messages' },
];

export function BottomNav({ user }: { user: CurrentUser }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* More sheet backdrop */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMoreOpen(false)}
          aria-hidden
        />
      )}

      {/* More sheet */}
      {moreOpen && (
        <div
          className="fixed inset-x-0 bottom-[56px] z-50 rounded-t-2xl border-t shadow-2xl"
          style={{
            background: 'color-mix(in srgb, var(--surface) 97%, transparent)',
            backdropFilter: 'blur(16px)',
            borderColor: 'var(--hairline)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
          role="dialog"
          aria-label="More navigation"
        >
          <div className="grid grid-cols-3 gap-px p-4">
            {MORE_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex flex-col items-center gap-1.5 rounded-xl py-4 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
                  style={{
                    color: active ? 'var(--moana)' : 'var(--ink-muted)',
                    fontFamily: 'var(--font-body)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon name={item.icon} size={24} />
                  <span style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex items-stretch lg:hidden"
        style={{
          background: 'color-mix(in srgb, var(--surface) 94%, transparent)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--rule)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        aria-label="Navigation"
      >
        {BOTTOM_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2"
              style={{
                color: active ? 'var(--moana)' : 'var(--ink-muted)',
                minHeight: 56,
                fontSize: 10,
                fontWeight: active ? 700 : 500,
                fontFamily: 'var(--font-body)',
                transition: 'color 150ms ease',
                textDecoration: 'none',
              }}
            >
              {item.accent ? (
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--moana)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={item.icon} size={20} />
                </div>
              ) : (
                <Icon name={item.icon} size={22} />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* More tab */}
        <button
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2"
          style={{
            color: moreOpen ? 'var(--moana)' : 'var(--ink-muted)',
            minHeight: 56,
            fontSize: 10,
            fontWeight: moreOpen ? 700 : 500,
            fontFamily: 'var(--font-body)',
            transition: 'color 150ms ease',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setMoreOpen((o) => !o)}
          aria-expanded={moreOpen}
          aria-label="More sections"
        >
          <Icon name={moreOpen ? 'x' : 'grid'} size={22} />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
