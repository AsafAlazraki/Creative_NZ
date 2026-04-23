'use client';
import { PATTERN_SVG, type PatternId } from '@/lib/patterns';
import { cn } from '@/lib/utils';

export function CulturalPattern({
  id,
  opacity = 0.1,
  size = 48,
  className,
  children,
  tone = 'ink',
}: {
  id: PatternId | string;
  opacity?: number;
  size?: number;
  className?: string;
  children?: React.ReactNode;
  tone?: 'ink' | 'brand';
}) {
  const validId = id in PATTERN_SVG ? (id as PatternId) : 'pattern-tapa';
  const colour = tone === 'brand' ? 'var(--brand)' : 'var(--ink)';
  const svg = PATTERN_SVG[validId].replace(
    '%23000',
    encodeURIComponent(tone === 'brand' ? '#c8342a' : '#0F0E0C'),
  );
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: url,
          backgroundSize: `${size}px`,
          backgroundRepeat: 'repeat',
          opacity,
          color: colour,
        }}
      />
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

export function PatternBand({
  id,
  height = 64,
  className,
}: {
  id: string;
  height?: number;
  className?: string;
}) {
  return (
    <CulturalPattern
      id={id}
      opacity={0.12}
      size={48}
      className={className}
    >
      <div style={{ height }} />
    </CulturalPattern>
  );
}

export function CulturalRail({ id, className }: { id: string; className?: string }) {
  return (
    <div
      className={cn('hidden lg:block w-10', className)}
      aria-hidden="true"
      style={{ minHeight: '100%' }}
    >
      <CulturalPattern id={id} opacity={0.08} size={48} className="h-full w-full" />
    </div>
  );
}
