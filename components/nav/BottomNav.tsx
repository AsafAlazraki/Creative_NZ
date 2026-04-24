import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { ROLE_NAV, SCREENS } from '@/lib/role';
import { Icon } from '@/components/ui/Icon';

export function BottomNav({ user }: { user: CurrentUser }) {
  const items = ROLE_NAV[user.role].slice(0, 5);
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch lg:hidden"
      style={{
        background: 'var(--ground)',
        color: 'var(--paper)',
        borderTop: 'var(--line-bold)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      aria-label="Sections"
    >
      {items.map((id) => {
        const s = SCREENS[id];
        if (!s) return null;
        return (
          <Link
            key={id}
            href={s.href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--paper)', minHeight: 60 }}
          >
            <Icon name={s.icon} size={20} />
            <span>{s.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
