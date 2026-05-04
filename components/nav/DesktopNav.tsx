'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CurrentUser } from '@/lib/auth';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { Icon } from '@/components/ui/Icon';

const NAV_ITEMS = [
  { id: 'feed', href: '/', icon: 'home' as const, label: 'Home' },
  { id: 'explore', href: '/explore', icon: 'compass' as const, label: 'Explore' },
  { id: 'market', href: '/market', icon: 'shopping-bag' as const, label: 'Market' },
  { id: 'drops', href: '/drops', icon: 'zap' as const, label: 'Drops' },
  { id: 'grants', href: '/grants', icon: 'award' as const, label: 'Grants' },
  { id: 'events', href: '/events', icon: 'calendar' as const, label: 'Events' },
  { id: 'groups', href: '/groups', icon: 'users' as const, label: 'Groups' },
  { id: 'messages', href: '/messages', icon: 'message-circle' as const, label: 'Messages' },
  { id: 'kete', href: '/kete', icon: 'book-open' as const, label: 'Kete' },
];

export function DesktopNav({ user }: { user: CurrentUser }) {
  const pathname = usePathname();

  return (
    <aside
      className="desktop-nav fixed left-0 top-0 bottom-0 hidden lg:flex flex-col items-center z-50"
      style={{
        width: 72,
        background: 'var(--surface)',
        borderRight: '1px solid var(--rule)',
        padding: '16px 0 12px',
        gap: 2,
      }}
      aria-label="Primary navigation"
    >
      {/* Logo mark */}
      <Link
        href="/"
        style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'var(--moana)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18,
          marginBottom: 20, flexShrink: 0, textDecoration: 'none',
        }}
        aria-label="KavaWorks home"
      >
        K
      </Link>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-1 flex-1 w-full" aria-label="Sections">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              style={{
                width: 48, height: 48, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? 'color-mix(in srgb, var(--moana) 12%, transparent)' : 'transparent',
                color: active ? 'var(--moana)' : 'var(--ink-muted)',
                transition: 'all 150ms ease',
                textDecoration: 'none',
              }}
            >
              <Icon name={item.icon} size={22} />
            </Link>
          );
        })}
      </nav>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 mt-auto">
        <Link
          href={`/artist/${user.handle}`}
          title="Your profile"
          aria-label="Your profile"
        >
          <AvatarIllustrated nationId={user.primaryNationId} size={36} name={user.name} />
        </Link>
      </div>
    </aside>
  );
}
