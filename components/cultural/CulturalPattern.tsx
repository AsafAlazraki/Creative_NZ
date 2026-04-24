'use client';
import { PATTERN_SVG, type PatternId } from '@/lib/patterns';
import { cn } from '@/lib/utils';

/**
 * CulturalPattern — renders a repeating geometric pattern.
 *
 * Two modes:
 *
 *   mode="texture"   — pattern overlay at configurable opacity over
 *                      the parent's background. Use for subtle rails,
 *                      card hovers, article page-edges.
 *
 *   mode="ceremonial" — solid ceremony-coloured background with the
 *                       pattern rendered in a contrast colour (paper/ink).
 *                       Use for ceremonial bands, framed plates, and
 *                       anywhere the design language asks for 100%
 *                       saturation.
 *
 * Colour is resolved at render from the CSS variables of the current
 * cultural theme — so the same element adapts across all seven
 * ceremonies without re-rendering.
 */
export function CulturalPattern({
  id,
  opacity = 1,
  size = 48,
  className,
  children,
  mode = 'ceremonial',
  tone,
}: {
  id: PatternId | string;
  opacity?: number;
  size?: number;
  className?: string;
  children?: React.ReactNode;
  mode?: 'ceremonial' | 'texture';
  /** Back-compat: 'ink' | 'brand' alias for mode overrides.
   *  tone='ink' → texture of ink on paper background.
   *  tone='brand' → texture of brand on paper background. */
  tone?: 'ink' | 'brand';
}) {
  const validId = id in PATTERN_SVG ? (id as PatternId) : 'pattern-tapa';

  // Resolve colours. For ceremonial mode, we need the raw stroke colour
  // baked into the SVG so the pattern shows through the solid ceremony
  // background. We pick contrasty ink/paper depending on the ceremony's
  // brightness. This uses a trick: the SVG is re-encoded with a colour
  // placeholder filled at render time.
  const isCeremonial = mode === 'ceremonial' && !tone;
  // For ceremonial mode, stroke is paper-like against ceremony ground.
  // For texture/tone mode, we keep the legacy stroke colour for compat.
  const stroke = isCeremonial
    ? '%23F5EDDC' // paper
    : tone === 'brand'
      ? encodeURIComponent('#c8342a')
      : encodeURIComponent('#0F0E0C');
  const svg = PATTERN_SVG[validId].replace('%23000', stroke);
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  const wrapperStyle: React.CSSProperties = isCeremonial
    ? { background: 'var(--ceremony-primary)' }
    : {};

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={wrapperStyle}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: url,
          backgroundSize: `${size}px`,
          backgroundRepeat: 'repeat',
          opacity,
        }}
      />
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

export function PatternBand({
  id,
  height = 96,
  className,
}: {
  id: string;
  height?: number;
  className?: string;
}) {
  return (
    <CulturalPattern id={id} mode="ceremonial" size={56} className={className}>
      <div style={{ height }} />
    </CulturalPattern>
  );
}

export function CulturalRail({ id, className }: { id: string; className?: string }) {
  return (
    <div
      className={cn('hidden lg:block', className)}
      aria-hidden="true"
      style={{ minHeight: '100%', minWidth: 48 }}
    >
      <CulturalPattern id={id} mode="ceremonial" size={40} className="h-full w-full" />
    </div>
  );
}

/**
 * FramedPlate — Type C ceremonial element. Square pattern plate with
 * heavy ink border. Used as section marker, empty state, collection
 * cover, artform picker cell.
 */
export function FramedPlate({
  id,
  size = 240,
  className,
  children,
}: {
  id: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <CulturalPattern
      id={id}
      mode="ceremonial"
      size={48}
      className={cn('relative', className)}
    >
      <div
        style={{ width: size, height: size, border: 'var(--line-bold)' }}
        className="relative flex items-center justify-center"
      >
        {children}
      </div>
    </CulturalPattern>
  );
}
