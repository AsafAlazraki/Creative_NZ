/**
 * Image library — picsum.photos (deterministic, no API key required).
 * URL format: https://picsum.photos/seed/{seed}/{w}/{h}
 * Same seed always returns the same photo, so layouts stay consistent.
 */

function hash(seed: string): number {
  return [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 5381);
}

function picsum(seed: string, w: number, h: number): string {
  // picsum seeds must be URL-safe strings
  const safeSeed = seed.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `https://picsum.photos/seed/${safeSeed}/${w}/${h}`;
}

// Theme prefixes give visually distinct sets per content type
function themeSeed(theme: string, seed: string): string {
  return `${theme}_${hash(seed) % 40}`;
}

function artformTheme(artform: string): string {
  const a = artform.toLowerCase();
  if (
    a.includes('siapo') || a.includes('ngatu') || a.includes('hiapo') ||
    a.includes('kapa') || a.includes('masi') || a.includes('tīvaevae') ||
    a.includes('tivaevae') || a.includes('bilum') || a.includes('fala') ||
    a.includes('textile') || a.includes('weaving')
  ) return 'weave';
  if (a.includes('carving') || a.includes('sculpture') || a.includes('whakairo')) return 'craft';
  if (a.includes('photography') || a.includes('film') || a.includes('moving')) return 'photo';
  if (a.includes('painting') || a.includes('printmaking') || a.includes('print')) return 'art';
  if (a.includes('dance') || a.includes('performance') || a.includes('music')) return 'perf';
  if (a.includes('spoken') || a.includes('audio')) return 'perf';
  if (a.includes('fashion')) return 'fashion';
  if (a.includes('sand') || a.includes('shell') || a.includes('jewellery') || a.includes('bone')) return 'jewel';
  return 'art';
}

// Public API used by components
export function workImageUrl({
  artform,
  seed,
  w = 900,
  h = 1100,
}: {
  artform: string;
  nationId?: string;
  materials?: string | null;
  seed: string;
  w?: number;
  h?: number;
}): string {
  return picsum(themeSeed(artformTheme(artform), seed), w, h);
}

export function postImageUrl({
  artform,
  mediaType,
  seed,
  w = 1200,
  h = 900,
}: {
  artform: string;
  nationId?: string;
  caption?: string;
  mediaType: 'image' | 'video' | 'audio' | 'gallery';
  seed: string;
  w?: number;
  h?: number;
}): string {
  const theme = mediaType === 'audio' ? 'perf' : artformTheme(artform);
  return picsum(themeSeed(theme, seed), w, h);
}

export function heroImageUrl(theme: string, seed: string, w = 1800, h = 1000) {
  return picsum(themeSeed(artformTheme(theme), seed), w, h);
}

export function portraitImageUrl(name: string, _nationId: string, w = 480, h = 600) {
  return picsum(themeSeed('portrait', name), w, h);
}

export function coverImageForOrg(seed: string, w = 1400, h = 600) {
  return picsum(themeSeed('gallery', seed), w, h);
}

export function coverImageForEvent(seed: string, w = 1400, h = 800) {
  return picsum(themeSeed('event', seed), w, h);
}

// Back-compat aliases (previously Unsplash-based)
export function unsplashFor(theme: string, seed: string, w = 1600, h = 900) {
  return picsum(themeSeed(artformTheme(theme), seed), w, h);
}

export function pickUnsplash(theme: string, seed: string): string {
  return themeSeed(artformTheme(theme), seed);
}

export const unsplash = (id: string, opts: { w?: number; h?: number } = {}) =>
  picsum(id, opts.w ?? 1200, opts.h ?? 900);

export const UNSPLASH = {};
