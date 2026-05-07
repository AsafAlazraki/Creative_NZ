import Link from 'next/link';
import type { CurrentUser } from '@/lib/auth';
import { AvatarIllustrated } from '@/components/cultural/Avatar';
import { Icon } from '@/components/ui/Icon';

/**
 * Composer card — avatar + faux-input-field + type chips.
 *
 * The input field is a fake (links to /create) but reads as a real
 * field thanks to the bg-bg + ink-soft border treatment. Type chips
 * are indented to start where the input does so the row reads as a
 * single composed control rather than a chip rail.
 */
export function ComposerCard({ user }: { user: CurrentUser }) {
  return (
    <section
      className="mb-6 rounded-2xl border p-4"
      style={{ borderColor: 'var(--hairline)', background: 'var(--surface)' }}
    >
      <div className="mb-3 flex items-center gap-3">
        <AvatarIllustrated nationId={user.primaryNationId} size={36} name={user.name} />
        <Link
          href="/create"
          className="flex-1 cursor-text rounded-xl border px-4 py-2.5 text-sm transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_4%,transparent)]"
          style={{
            borderColor: 'color-mix(in srgb, var(--ink) 12%, transparent)',
            background: 'var(--bg)',
            color: 'var(--ink-muted)',
          }}
        >
          Share with respect, {user.name.split(' ')[0]}…
        </Link>
      </div>
      <div
        className="flex items-center gap-1 overflow-x-auto pb-1 pl-12 text-xs scrollbar-none"
      >
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
      className="flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--ink)_5%,transparent)]"
      style={{ color: 'var(--ink-muted)' }}
    >
      <Icon name={icon} size={14} />
      <span>{label}</span>
    </Link>
  );
}
