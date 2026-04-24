import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { ROLE_NAV, SCREENS } from '@/lib/role';
import { Icon } from '@/components/ui/Icon';

/** Mobile bottom nav uses a curated 5-item set rather than slicing the
 *  longer desktop nav — typical FB/IG mobile pattern. */
const BOTTOM_NAV_IDS = ['feed', 'explore', 'create', 'notifications', 'messages'];

export function BottomNav({ user }: { user: CurrentUser }) {
  const items = ROLE_NAV[user.role].filter((id) => BOTTOM_NAV_IDS.includes(id));
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t lg:hidden"
      style={{
        background: 'color-mix(in srgb, var(--surface) 94%, transparent)',
        backdropFilter: 'blur(10px)',
        borderColor: 'var(--hairline)',
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
            className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium"
            style={{ color: 'var(--ink)', minHeight: 56 }}
          >
            <Icon name={s.icon} size={20} />
            <span>{s.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
