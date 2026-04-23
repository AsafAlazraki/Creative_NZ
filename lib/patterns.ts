/**
 * Cultural pattern SVG library.
 *
 * Each pattern is a small, tileable geometric motif inspired by (not copying)
 * the living Pacific traditions of siapo, tivaevae, masi, hiapo, kapa, ngatu,
 * bilum, kowhaiwhai. Pure geometry — no representational motifs, no human
 * figures, no sacred forms.
 *
 * Used as 6–15% opacity textures only, never as logos.
 */

export const PATTERN_IDS = [
  'pattern-ula-fala',
  'pattern-moana',
  'pattern-tapa',
  'pattern-niu',
  'pattern-koula',
  'pattern-fiji-masi',
  'pattern-cook-tivaevae',
  'pattern-tahiti-tifaifai',
  'pattern-hawaii-kapa',
  'pattern-vanuatu-sand',
  'pattern-png-bilum',
  'pattern-solomons-shell',
  'pattern-tuvalu-fala',
  'pattern-kiribati-te-bino',
] as const;

export type PatternId = (typeof PATTERN_IDS)[number];

const p = (svg: string) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

const wrap = (inner: string, color = '%23000') =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><g fill='none' stroke='${color}' stroke-width='1.5' stroke-linecap='square'>${inner}</g></svg>`;

export const PATTERN_SVG: Record<PatternId, string> = {
  'pattern-ula-fala': wrap(
    '<path d="M0 24 L12 12 L24 24 L36 12 L48 24"/><path d="M0 36 L12 24 L24 36 L36 24 L48 36"/><path d="M0 12 L12 0 L24 12 L36 0 L48 12"/>',
  ),
  'pattern-moana': wrap(
    '<path d="M0 12 Q12 6 24 12 T48 12"/><path d="M0 24 Q12 18 24 24 T48 24"/><path d="M0 36 Q12 30 24 36 T48 36"/>',
  ),
  'pattern-tapa': wrap(
    '<rect x="4" y="4" width="16" height="16"/><rect x="28" y="4" width="16" height="16"/><rect x="4" y="28" width="16" height="16"/><rect x="28" y="28" width="16" height="16"/><path d="M12 12 L16 16 M32 12 L36 16 M12 32 L16 36 M32 32 L36 36"/>',
  ),
  'pattern-niu': wrap(
    '<path d="M24 0 L48 24 L24 48 L0 24 Z"/><path d="M24 12 L36 24 L24 36 L12 24 Z"/><circle cx="24" cy="24" r="3"/>',
  ),
  'pattern-koula': wrap(
    '<path d="M0 0 L24 24 L0 48 M48 0 L24 24 L48 48"/><circle cx="12" cy="12" r="1.5"/><circle cx="36" cy="12" r="1.5"/><circle cx="12" cy="36" r="1.5"/><circle cx="36" cy="36" r="1.5"/>',
  ),
  'pattern-fiji-masi': wrap(
    '<path d="M0 0 L12 12 L0 24 M12 0 L24 12 L12 24 M24 0 L36 12 L24 24 M36 0 L48 12 L36 24"/><path d="M0 24 L12 36 L0 48 M12 24 L24 36 L12 48 M24 24 L36 36 L24 48 M36 24 L48 36 L36 48"/>',
  ),
  'pattern-cook-tivaevae': wrap(
    '<path d="M24 6 L30 18 L42 18 L32 26 L36 38 L24 30 L12 38 L16 26 L6 18 L18 18 Z"/>',
  ),
  'pattern-tahiti-tifaifai': wrap(
    '<rect x="10" y="10" width="28" height="28" transform="rotate(45 24 24)"/><path d="M24 6 L24 42 M6 24 L42 24"/>',
  ),
  'pattern-hawaii-kapa': wrap(
    '<path d="M0 0 L48 48 M48 0 L0 48"/><rect x="16" y="16" width="16" height="16"/>',
  ),
  'pattern-vanuatu-sand': wrap(
    '<path d="M6 24 Q18 6 30 24 T54 24"/><path d="M-6 24 Q6 42 18 24 T42 24"/><circle cx="24" cy="24" r="2"/>',
  ),
  'pattern-png-bilum': wrap(
    '<path d="M0 6 Q12 18 24 6 Q36 18 48 6"/><path d="M0 18 Q12 6 24 18 Q36 6 48 18"/><path d="M0 30 Q12 42 24 30 Q36 42 48 30"/><path d="M0 42 Q12 30 24 42 Q36 30 48 42"/>',
  ),
  'pattern-solomons-shell': wrap(
    '<path d="M24 6 Q6 24 24 42 Q42 24 24 6"/><path d="M24 12 Q12 24 24 36 Q36 24 24 12"/><circle cx="24" cy="24" r="2"/>',
  ),
  'pattern-tuvalu-fala': wrap(
    '<path d="M0 0 L48 0 L48 48 L0 48 Z"/><path d="M0 16 L48 16 M0 32 L48 32 M16 0 L16 48 M32 0 L32 48"/>',
  ),
  'pattern-kiribati-te-bino': wrap(
    '<circle cx="12" cy="12" r="6"/><circle cx="36" cy="12" r="6"/><circle cx="12" cy="36" r="6"/><circle cx="36" cy="36" r="6"/><circle cx="24" cy="24" r="4"/>',
  ),
};

export function patternUrl(id: PatternId, colorHex = '#0F0E0C'): string {
  const encoded = PATTERN_SVG[id].replace('%23000', encodeURIComponent(colorHex));
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(encoded)}")`;
}

export function patternStyle(
  id: PatternId | string,
  opacity = 0.1,
  size = 48,
): React.CSSProperties {
  const valid = (PATTERN_IDS as readonly string[]).includes(id) ? (id as PatternId) : 'pattern-tapa';
  const svg = PATTERN_SVG[valid];
  return {
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
    backgroundSize: `${size}px`,
    backgroundRepeat: 'repeat',
    opacity,
  };
}
