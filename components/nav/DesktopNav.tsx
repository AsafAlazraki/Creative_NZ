import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { ROLE_NAV, SCREENS } from '@/lib/role';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { NationBadge } from '@/components/cultural/NationBadge';
import { VerifiedBadge, ElderBadge } from '@/components/cultural/Badges';
import { Icon } from '@/components/ui/Icon';

export function DesktopNav({ user }: { user: CurrentUser }) {
  const items = ROLE_NAV[user.role];
  return (
    <aside
      className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r px-4 py-6 lg:flex"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
      aria-label="Primary"
    >
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 px-2 font-display text-2xl font-bold tracking-tight"
      >
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
          style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
          aria-hidden
        >
          K
        </span>
        KavaWorks
      </Link>

      <nav className="flex flex-col gap-1" aria-label="Sections">
        {items.map((id) => {
          const s = SCREENS[id];
          if (!s) return null;
          return (
            <Link
              key={id}
              href={s.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
              style={{ color: 'var(--ink)' }}
            >
              <Icon name={s.icon} size={18} />
              <span>{s.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <Link
          href={`/artist/${user.handle}`}
          className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <AvatarIllustrated nationId={user.primaryNationId} size={40} name={user.name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold">{user.name}</span>
              {user.verified && <VerifiedBadge />}
            </div>
            <div className="mt-0.5">
              <NationBadge nationId={user.primaryNationId} size="xs" />
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
