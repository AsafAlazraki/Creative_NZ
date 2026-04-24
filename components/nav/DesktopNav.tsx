import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { ROLE_NAV, SCREENS } from '@/lib/role';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { VerifiedBadge, ElderBadge } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';

/**
 * Desktop navigation — inverted ground chrome per design language.
 * Dark ground, paper text, hand-feel icons, ceremonial gold active bar.
 */
export function DesktopNav({ user }: { user: CurrentUser }) {
  const items = ROLE_NAV[user.role];
  return (
    <aside
      className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col px-5 py-6 lg:flex"
      style={{
        background: 'var(--ground)',
        color: 'var(--paper)',
        borderRight: 'var(--line-bold)',
      }}
      aria-label="Primary"
    >
      <Link
        href="/"
        className="mb-8 block font-display"
        style={{
          fontSize: 28,
          letterSpacing: '-0.035em',
          color: 'var(--paper)',
          lineHeight: 1,
        }}
      >
        KAVAWORKS<span style={{ color: 'var(--ceremony-primary)' }}>.</span>
      </Link>

      <nav className="flex flex-col gap-0.5" aria-label="Sections">
        {items.map((id) => {
          const s = SCREENS[id];
          if (!s) return null;
          return (
            <Link
              key={id}
              href={s.href}
              className="group flex items-center gap-3 px-3 py-2.5 text-[15px] font-semibold transition-colors"
              style={{ color: 'var(--paper)' }}
            >
              <Icon name={s.icon} size={18} />
              <span>{s.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div
          style={{
            borderTop: '2px solid color-mix(in srgb, var(--paper) 20%, transparent)',
            paddingTop: 16,
          }}
        />
        <Link
          href={`/artist/${user.handle}`}
          className="flex items-center gap-3 p-2"
          style={{ color: 'var(--paper)' }}
        >
          <AvatarIllustrated nationId={user.primaryNationId} size={44} name={user.name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold">{user.name}</span>
              {user.verified && <VerifiedBadge />}
            </div>
            <div className="text-xs" style={{ color: 'color-mix(in srgb, var(--paper) 65%, transparent)' }}>
              @{user.handle}
            </div>
            {user.elderStatus && (
              <div className="mt-1">
                <ElderBadge />
              </div>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
}
