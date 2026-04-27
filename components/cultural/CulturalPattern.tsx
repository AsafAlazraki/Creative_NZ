'use client';
import { PATTERN_SVG, type PatternId } from '@/lib/patterns';
import { cn } from '@/lib/utils';

/**
 * CulturalPattern — wrapper for editorial / hero surfaces.
 *
 * Per the Pasifika design language plan (Creative NZ): Pacific
 * geometric motifs (siapo, ngatu, hiapo, kapa, masi, kōwhaiwhai,
 * etc.) are not free decorative material. They carry meaning,
 * customary owners, and lineage. Section 3.2 of the integration
 * plan calls this the "frangipani problem".
 *
 * As a result this component renders **no pattern overlay by
 * default** — children render against the parent surface only.
 *
 * The decorative pattern overlay is opt-in via `decorative={true}`,
 * and should only be used in surfaces where the pattern is
 * **attributed** to the artist or context whose tradition it
 * belongs to (e.g. inside AttributionBlock, the elder plate).
 *
 * Until paid Pasifika design engagement happens, treat
 * `decorative={true}` as a temporary marker showing where a
 * commissioned, properly-licensed motif should sit.
 */
export function CulturalPattern({
  id,
  opacity = 0.1,
  size = 48,
  className,
  children,
  tone = 'ink',
  decorative = false,
}: {
  id: PatternId | string;
  opacity?: number;
  size?: number;
  className?: string;
  children?: React.ReactNode;
  tone?: 'ink' | 'brand';
  /** Render the pattern overlay. Default: false. Use only where attributed. */
  decorative?: boolean;
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
      {decorative && (
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
      )}
      {children && <div className="relative">{children}</div>}
    </div>
  );
}

/**
 * PatternBand — was a decorative band; now a quiet horizontal
 * brass-toned hairline rule per the design plan's "wayfinding"
 * accents.
 */
export function PatternBand({
  height = 6,
  className,
}: {
  id?: string;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('w-full', className)}
      style={{
        height,
        background: 'var(--whetu, #B58A3F)',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * CulturalRail — was a vertical decorative stripe; now a thin brass
 * accent line on the inside edge of editorial columns. Keeps the
 * "wayfinding" thread without the decorative motif.
 */
export function CulturalRail({ className }: { id?: string; className?: string }) {
  return (
    <div
      className={cn('hidden lg:block', className)}
      aria-hidden="true"
      style={{
        width: 4,
        minHeight: '100%',
        background: 'var(--whetu, #B58A3F)',
        opacity: 0.55,
      }}
    />
  );
}
