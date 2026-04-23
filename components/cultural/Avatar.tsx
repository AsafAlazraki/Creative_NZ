import { getNation } from '@/lib/repo';
import { PATTERN_SVG } from '@/lib/patterns';
import { cn } from '@/lib/utils';

export function AvatarIllustrated({
  nationId,
  size = 40,
  name,
  className,
}: {
  nationId: string;
  size?: number;
  name: string;
  className?: string;
}) {
  const nation = getNation(nationId);
  const patternId = (nation?.patternId ?? 'pattern-tapa') as keyof typeof PATTERN_SVG;
  const svg = PATTERN_SVG[patternId]?.replace('%23000', encodeURIComponent('#0F0E0C')) ??
    PATTERN_SVG['pattern-tapa'];
  const bg = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: 'var(--surface-2)',
        border: '1px solid var(--hairline)',
      }}
      aria-label={`Avatar for ${name}`}
      role="img"
    >
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: bg,
          backgroundSize: `${size * 0.6}px`,
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-semibold"
        style={{
          color: 'var(--ink-muted)',
          fontSize: size * 0.4,
          letterSpacing: '-0.02em',
        }}
        aria-hidden="true"
      >
        {name
          .split(/[\s-]+/)
          .map((w) => w[0]?.toUpperCase())
          .filter(Boolean)
          .slice(0, 2)
          .join('')}
      </div>
    </div>
  );
}
