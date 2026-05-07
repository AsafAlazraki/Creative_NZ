/**
 * Image library — picsum.photos (deterministic, reliable, no API key).
 * URL format: https://picsum.photos/seed/{seed}/{w}/{h}
 *
 * Earlier we tried Lorem Flickr for tag-themed Pacific imagery, but it
 * failed to load reliably on the deployed site (intermittent timeouts,
 * blocked redirects, near-black tag matches). Picsum is back: random
 * but always loads, and the same seed always returns the same image so
 * layouts stay consistent.
 *
 * To improve theme relevance without sacrificing reliability, theme
 * prefixes still bucket each artform into a distinct seed namespace
 * so e.g. all "weave" posts pull from the same 40-image set.
 */

function hash(seed: string): number {
  return [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 5381);
}

function picsum(seed: string, w: number, h: number, blur?: number): string {
  const safeSeed = seed.replace(/[^a-zA-Z0-9_-]/g, '_');
  const base = `https://picsum.photos/seed/${safeSeed}/${w}/${h}`;
  return blur ? `${base}?blur=${blur}` : base;
}

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

/**
 * Hero/banner images — use blur so random picsum photos read as
 * atmospheric editorial backgrounds rather than "wrong stock photo".
 * Foreground text + the existing dark gradient overlay carry the meaning;
 * the hero just supplies depth, mood, and tonal warmth.
 */
export function heroImageUrl(theme: string, seed: string, w = 1600, h = 900) {
  return picsum(themeSeed(artformTheme(theme), seed), w, h, 2);
}

/** Stronger blur — used for full-bleed cinematic heroes (Drops, Market). */
export function heroAtmosphericUrl(theme: string, seed: string, w = 1600, h = 900) {
  return picsum(themeSeed(artformTheme(theme), seed), w, h, 3);
}

export function portraitImageUrl(name: string, _nationId: string, w = 480, h = 600) {
  return picsum(themeSeed('portrait', name), w, h);
}

export function coverImageForOrg(seed: string, w = 1400, h = 600) {
  // Sharp — these sit behind a dark label gradient on the cards, the
  // image itself wants to read as a photo, not a soft texture wash.
  return picsum(themeSeed('gallery', seed), w, h);
}

export function coverImageForEvent(seed: string, w = 1400, h = 800) {
  return picsum(themeSeed('event', seed), w, h);
}

// Back-compat aliases
export function unsplashFor(theme: string, seed: string, w = 1600, h = 900) {
  return picsum(themeSeed(artformTheme(theme), seed), w, h);
}
export function pickUnsplash(theme: string, seed: string): string {
  return themeSeed(artformTheme(theme), seed);
}
export const unsplash = (id: string, opts: { w?: number; h?: number } = {}) =>
  picsum(id, opts.w ?? 1200, opts.h ?? 900);
export const UNSPLASH = {};

/**
 * Reel video URL — public sample MP4s used for any post with
 * mediaType === 'video'. Big Buck Bunny + Sintel + Tears of Steel are
 * canonical Creative Commons sample clips hosted on Google's GCS bucket.
 * They're 30 fps H.264 MP4s that play across all browsers without CORS
 * issues and are intentionally generic placeholder content.
 */
const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];
export function reelVideoUrl(seed: string): string {
  return SAMPLE_VIDEOS[hash(seed) % SAMPLE_VIDEOS.length];
}
