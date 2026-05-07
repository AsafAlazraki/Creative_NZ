/**
 * Image library — Lorem Flickr with Pacific-themed tags.
 *
 * URL format: https://loremflickr.com/{w}/{h}/{tags}/{lock}
 * Same lock+tags returns the same Flickr photo, so layouts stay consistent.
 *
 * Why not picsum.photos: random photos (storms, lemons, escalators) bear
 * no relation to Pacific arts. Lorem Flickr returns a Flickr photo whose
 * tags overlap our query — so a "weaving,polynesia" query reliably returns
 * something textile-shaped instead of e.g. a Manhattan skyline.
 */

function hash(seed: string): number {
  return [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 5381);
}

function flickr(tags: string, seed: string, w: number, h: number): string {
  const lock = hash(seed) % 100000;
  const tagStr = tags.replace(/\s+/g, '');
  return `https://loremflickr.com/${w}/${h}/${tagStr}/${lock}`;
}

// Pacific-relevant tag bundles per artform theme.
// Tags are ORed by Lorem Flickr — broader bundles produce more consistent
// hits than narrow ones.
const TAGS = {
  weave: 'weaving,textile,fabric,polynesia,handmade',
  craft: 'carving,wood,sculpture,maori,polynesia',
  photo: 'polynesia,island,pacific,ocean',
  art: 'painting,art,canvas,polynesia',
  perf: 'dance,performance,music,polynesia',
  fashion: 'fashion,textile,polynesia',
  jewel: 'jewelry,shell,necklace,pacific',
  portrait: 'portrait,polynesia,islander',
  event: 'festival,polynesia,celebration,community',
  gallery: 'community,polynesia,island,gathering',
} as const;

function artformTheme(artform: string): keyof typeof TAGS {
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

// Public API
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
  return flickr(TAGS[artformTheme(artform)], seed, w, h);
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
  return flickr(TAGS[theme], seed, w, h);
}

export function heroImageUrl(theme: string, seed: string, w = 1800, h = 1000) {
  return flickr(TAGS[artformTheme(theme)], seed, w, h);
}

export function portraitImageUrl(name: string, _nationId: string, w = 480, h = 600) {
  return flickr(TAGS.portrait, `portrait-${name}`, w, h);
}

export function coverImageForOrg(seed: string, w = 1400, h = 600) {
  return flickr(TAGS.gallery, `org-${seed}`, w, h);
}

export function coverImageForEvent(seed: string, w = 1400, h = 800) {
  return flickr(TAGS.event, `event-${seed}`, w, h);
}

// Back-compat aliases (previously Unsplash-based)
export function unsplashFor(theme: string, seed: string, w = 1600, h = 900) {
  return flickr(TAGS[artformTheme(theme)], seed, w, h);
}

export function pickUnsplash(theme: string, seed: string): string {
  return `${theme}-${hash(seed) % 40}`;
}

export const unsplash = (id: string, opts: { w?: number; h?: number } = {}) =>
  flickr(TAGS.art, id, opts.w ?? 1200, opts.h ?? 900);

export const UNSPLASH = {};
