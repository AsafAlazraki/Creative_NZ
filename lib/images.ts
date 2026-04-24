/**
 * Image library — Unsplash only (no AI generation).
 *
 * Every photo is a real Unsplash photo by ID, under the Unsplash License
 * (free to use, no attribution legally required). Pollinations AI was
 * removed because the service is unreliable and left black rectangles
 * where images should appear.
 */

function hash(seed: string): number {
  return [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 5381);
}

function unsplash(
  id: string,
  { w = 1200, h, q = 80 }: { w?: number; h?: number; q?: number } = {},
): string {
  const params = new URLSearchParams();
  params.set('w', String(w));
  if (h) params.set('h', String(h));
  params.set('q', String(q));
  params.set('auto', 'format');
  params.set('fit', 'crop');
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

const PHOTO_SETS = {
  weaving: [
    'photo-1528489496900-c5c8dcccb8d7',
    'photo-1610505286797-bd0884ed4bb9',
    'photo-1528323273322-d81458248d40',
    'photo-1583246679877-86d13f5af6a6',
    'photo-1610420716776-d3e7cb7bcb10',
  ],
  textile: [
    'photo-1558618666-fcd25c85cd64',
    'photo-1579541814924-49fef17c5be5',
    'photo-1557672172-298e090bd0f1',
    'photo-1528489496900-c5c8dcccb8d7',
  ],
  hands: [
    'photo-1524678714210-9917a6c619c2',
    'photo-1516035069371-29a1b244cc32',
    'photo-1599831094845-7a87cf76a1cd',
    'photo-1499750310107-5fef28a66643',
  ],
  ocean: [
    'photo-1507525428034-b723cf961d3e',
    'photo-1505142468610-359e7d316be0',
    'photo-1501950183564-3c8bc96fac74',
    'photo-1439405326854-014607f694d7',
    'photo-1468413253725-0d5181091126',
  ],
  gathering: [
    'photo-1529156069898-49953e39b3ac',
    'photo-1526285849573-448a307bfa01',
    'photo-1519671482749-fd09be7ccebf',
    'photo-1505373877841-8d25f7d46678',
  ],
  studio: [
    'photo-1513519245088-0e12902e5a38',
    'photo-1544161515-4ab6ce6db874',
    'photo-1582738412127-5a4e8ff4c7bd',
    'photo-1567016526105-22da7c13161a',
    'photo-1531913764164-f85c52e6e654',
  ],
  portrait: [
    'photo-1531746020798-e6953c6e8e04',
    'photo-1544005313-94ddf0286df2',
    'photo-1573496359142-b8d87734a5a2',
    'photo-1521341957697-b93449760f30',
    'photo-1534528741775-53994a69daeb',
    'photo-1494790108377-be9c29b29330',
  ],
  performance: [
    'photo-1540039155733-5bb30b53aa14',
    'photo-1533174072545-7a4b6ad7a6c3',
    'photo-1493225457124-a3eb161ffa5f',
    'photo-1547153760-18fc86324498',
    'photo-1504609813442-a8924e83f76e',
  ],
  gallery: [
    'photo-1577720580479-7d839d829c73',
    'photo-1531243269054-5ebf6f34081e',
    'photo-1554907984-15263bfd63bd',
  ],
  landscape: [
    'photo-1501426026826-31c667bdf23d',
    'photo-1499678329028-101435549a4e',
    'photo-1516905133294-bf8b812b7f35',
  ],
} as const;

type Theme = keyof typeof PHOTO_SETS;

function themeFor(artform: string): Theme {
  const a = artform.toLowerCase();
  if (
    a.includes('siapo') || a.includes('ngatu') || a.includes('hiapo') ||
    a.includes('kapa') || a.includes('masi') || a.includes('tīvaevae') ||
    a.includes('tivaevae') || a.includes('bilum') || a.includes('fala') ||
    a.includes('textile') || a.includes('weaving')
  ) return 'weaving';
  if (a.includes('carving') || a.includes('sculpture') || a.includes('whakairo')) return 'studio';
  if (a.includes('photography') || a.includes('film') || a.includes('moving')) return 'gallery';
  if (a.includes('painting') || a.includes('printmaking') || a.includes('print')) return 'studio';
  if (a.includes('dance') || a.includes('performance') || a.includes('music')) return 'performance';
  if (a.includes('spoken') || a.includes('audio')) return 'performance';
  if (a.includes('fashion')) return 'portrait';
  if (a.includes('sand')) return 'ocean';
  if (a.includes('shell') || a.includes('jewellery') || a.includes('bone')) return 'textile';
  return 'studio';
}

function pick(theme: Theme, seed: string) {
  const list = PHOTO_SETS[theme];
  return list[hash(seed) % list.length];
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
  return unsplash(pick(themeFor(artform), seed), { w, h });
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
  if (mediaType === 'audio') return unsplash(pick('performance', seed), { w, h });
  return unsplash(pick(themeFor(artform), seed), { w, h });
}

export function heroImageUrl(theme: string, seed: string, w = 1800, h = 1000) {
  return unsplash(pick(themeFor(theme), seed), { w, h });
}

export function portraitImageUrl(name: string, _nationId: string, w = 480, h = 600) {
  return unsplash(pick('portrait', name), { w, h });
}

export function coverImageForOrg(seed: string, w = 1400, h = 600) {
  return unsplash(pick('gallery', seed), { w, h });
}

export function coverImageForEvent(seed: string, w = 1400, h = 800) {
  return unsplash(pick('performance', seed), { w, h });
}

// Back-compat
export const UNSPLASH = PHOTO_SETS;
export { unsplash };
export function unsplashFor(theme: Theme | string, seed: string, w = 1600, h = 900) {
  const t = (theme as Theme) in PHOTO_SETS ? (theme as Theme) : 'landscape';
  return unsplash(pick(t, seed), { w, h });
}
export function pickUnsplash(theme: Theme | string, seed: string): string {
  const t = (theme as Theme) in PHOTO_SETS ? (theme as Theme) : 'landscape';
  return pick(t, seed);
}
