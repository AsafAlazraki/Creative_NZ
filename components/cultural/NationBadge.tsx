import { getNation } from '@/lib/repo';
import { cn } from '@/lib/utils';

export function NationBadge({
  nationId,
  size = 'sm',
  className,
}: {
  nationId: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}) {
  const nation = getNation(nationId);
  if (!nation) return null;

  const textSize = size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-base';
  const flagSize = size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className={cn('inline-flex items-center gap-1.5', textSize, className)}>
      <span className={flagSize} aria-hidden="true">
        {nation.flag}
      </span>
      <span className="font-medium" style={{ color: 'var(--ink-muted)' }}>
        {nation.name}
      </span>
    </span>
  );
}
