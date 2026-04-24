import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

const TABS = [
  { id: 'image', label: 'Photo', icon: 'bookmark', hint: 'Image + caption' },
  { id: 'short', label: 'Short', icon: 'film', hint: 'Under 60s vertical' },
  { id: 'long', label: 'Long video', icon: 'plus-square', hint: '60s – 15min' },
  { id: 'audio', label: 'Audio', icon: 'activity', hint: 'Spoken word, music' },
  { id: 'listing', label: 'Marketplace', icon: 'shopping-bag', hint: 'List a work to sell' },
] as const;

export function CreateTabs({ active }: { active: string }) {
  return (
    <nav
      className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
      aria-label="Create type"
    >
      {TABS.map((t) => {
        const isActive = t.id === active;
        return (
          <Link
            key={t.id}
            href={`/create?type=${t.id}`}
            className="group shrink-0 rounded-xl border px-4 py-3 transition-colors"
            style={{
              borderColor: isActive ? 'var(--brand)' : 'var(--hairline)',
              background: isActive
                ? 'color-mix(in srgb, var(--brand) 8%, transparent)'
                : 'var(--surface)',
              color: isActive ? 'var(--brand)' : 'var(--ink)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Icon name={t.icon} size={16} />
              {t.label}
            </div>
            <div className="mt-0.5 text-[11px]" style={{ color: 'var(--ink-muted)' }}>
              {t.hint}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
