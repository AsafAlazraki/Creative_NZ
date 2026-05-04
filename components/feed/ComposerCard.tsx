import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { Icon } from '@/components/ui/Icon';

export function ComposerCard({ user }: { user: CurrentUser }) {
  return (
    <section
      className="mb-6 rounded-2xl border p-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="flex items-center gap-3">
        <AvatarIllustrated nationId={user.primaryNationId} size={44} name={user.name} />
        <Link
          href="/create"
          className="flex-1 rounded-full border px-4 py-2.5 text-left text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_3%,transparent)]"
          style={{ borderColor: 'var(--hairline)', color: 'var(--ink-muted)' }}
        >
          Share with respect, {user.name.split(' ')[0]}…
        </Link>
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        <CreateChip href="/create?type=image" icon="bookmark" label="Photo" />
        <CreateChip href="/create?type=short" icon="film" label="Short" />
        <CreateChip href="/create?type=long" icon="plus-square" label="Video" />
        <CreateChip href="/create?type=audio" icon="activity" label="Audio" />
        <CreateChip href="/create?type=listing" icon="shopping-bag" label="Listing" />
      </div>
    </section>
  );
}

function CreateChip({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] whitespace-nowrap"
      style={{ color: 'var(--ink-muted)' }}
    >
      <Icon name={icon} size={14} />
      <span className="font-semibold">{label}</span>
    </Link>
  );
}
