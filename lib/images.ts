/**
 * Image library for KavaWorks.
 *
 * Two sources:
 *   1. Unsplash — real, CC-licensed photography for events, orgs, and
 *      real-world scenes. Photos are addressed by stable Unsplash photo IDs
 *      so the same seed always returns the same image.
 *   2. Pollinations.ai — free, URL-based AI image generation. We use this
 *      for the cultural work imagery — posts, marketplace works, hero —
 *      because it lets us render an image *of* the artform being described,
 *      rather than a generic stock photo.
 *
 * Every generated prompt is grounded in the artform + nation + materials so
 * the output reads as Pacific-specific rather than generic "tropical".
 *
 * Usage in components:
 *   <img src={postImage(post)} alt="..." />
 *   <img src={workImage(work)} alt="..." />
 *   <img src={heroImageFor('weaving', 'feed-2026-04')} alt="..." />
 */

// -------------------------------------------------------------------------
// Unsplash (real photography)
// -------------------------------------------------------------------------

export const UNSPLASH: Record<string, readonly string[]> = {
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
  festival: [
    'photo-1540039155733-5bb30b53aa14',
    'photo-1533174072545-7a4b6ad7a6c3',
    'photo-1493225457124-a3eb161ffa5f',
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
  portrait: [
    'photo-1531746020798-e6953c6e8e04',
    'photo-1544005313-94ddf0286df2',
    'photo-1573496359142-b8d87734a5a2',
    'photo-1521341957697-b93449760f30',
    'photo-1534528741775-53994a69daeb',
    'photo-1494790108377-be9c29b29330',
  ],
};

export type UnsplashTheme = keyof typeof UNSPLASH;

export function unsplash(
  id: string,
  { w = 1200, h, q = 75, crop = 'entropy' }: { w?: number; h?: number; q?: number; crop?: string } = {},
): string {
  const params = new URLSearchParams();
  params.set('w', String(w));
  if (h) params.set('h', String(h));
  params.set('q', String(q));
  params.set('auto', 'format');
  params.set('fit', 'crop');
  params.set('crop', crop);
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

function hash(seed: string): number {
  return [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 5381);
}

export function pickUnsplash(theme: UnsplashTheme, seed: string): string {
  const list = UNSPLASH[theme] ?? UNSPLASH.landscape;
  return list[hash(seed) % list.length];
}

export function unsplashFor(theme: UnsplashTheme, seed: string, w = 1600, h = 900) {
  return unsplash(pickUnsplash(theme, seed), { w, h });
}

// -------------------------------------------------------------------------
// Pollinations AI (generative cultural imagery)
// -------------------------------------------------------------------------

/**
 * Build a Pollinations image URL. The service is URL-based, free, no auth.
 * Docs: https://image.pollinations.ai
 *
 * We ground prompts in Pacific-specific vocabulary so the model produces
 * imagery of the actual artform rather than a generic "tropical" scene.
 */
export function pollinate(
  prompt: string,
  { w = 1024, h = 1024, seed = 1, model = 'flux' }: { w?: number; h?: number; seed?: number | string; model?: string } = {},
): string {
  const seedNum = typeof seed === 'string' ? hash(seed) % 100000 : seed;
  const encoded = encodeURIComponent(prompt);
  const params = new URLSearchParams({
    width: String(w),
    height: String(h),
    seed: String(seedNum),
    model,
    nologo: 'true',
    enhance: 'true',
  });
  return `https://image.pollinations.ai/prompt/${encoded}?${params.toString()}`;
}

// -------------------------------------------------------------------------
// Artform → prompt grounding
// -------------------------------------------------------------------------

const ARTFORM_PROMPTS: Record<string, string> = {
  siapo:
    'Detail photograph of Samoan siapo bark cloth, natural ocher and umber pigments on paper mulberry, traditional geometric stamped patterns, soft studio light, museum-quality',
  ngatu:
    'Tongan ngatu bark cloth with kupesi stamped patterns, earthy tones, fine detail, natural light',
  hiapo:
    'Niuean hiapo bark cloth with fine linework and geometric motifs, natural pigments, detail shot',
  kapa:
    'Hawaiian kapa bark cloth, wauke fibre, indigo and natural dyes, refined geometric pattern, soft overcast light',
  masi:
    'Fijian masi bark cloth, hand-painted black and rust triangular pattern, textile detail, even natural light',
  'tīvaevae':
    'Cook Islands tīvaevae appliqué quilt in saturated colour, floral manu motif, textile detail, overcast daylight',
  tivaevae:
    'Cook Islands tīvaevae appliqué quilt in saturated colour, floral manu motif, textile detail, overcast daylight',
  carving:
    'Pacific wood carving in progress, chisel marks visible on pohutukawa or kauri, warm studio light, craftsperson\'s hands',
  whakairo:
    'Māori whakairo wood carving with spirals and chisel detail, natural warm wood tones, focused studio lighting',
  bilum:
    'Papua New Guinea bilum bag, hand-looped natural fibre, geometric pattern, detail close-up, daylight',
  tatau:
    'Traditional Polynesian tatau process, ink and skin detail, cultural respect, documentary photography style',
  'shell jewellery':
    'Solomon Islands traditional shell jewellery, spondylus and mother-of-pearl, beach-recovered material, beautiful natural light',
  shell:
    'Pacific shell adornment, layered strings, natural cream and ochre, delicate studio light',
  photography:
    'Black and white documentary photograph, Pacific arts studio interior, natural light',
  painting:
    'Abstract Pacific-influenced painting in progress on large canvas, earth pigments, studio setting',
  printmaking:
    'Handprinted image hanging to dry, ink and paper, studio clothesline, warm daylight',
  fashion:
    'Contemporary Pacific fashion design with bilum loop-weave detail, editorial studio photo, clean background',
  'sand drawing':
    'Ni-Vanuatu geometric sand drawing on a Pacific beach, linear flowing pattern, golden-hour sunlight',
  sculpture:
    'Contemporary Pacific sculpture, bronze or carved wood, gallery plinth, warm spotlight',
  'spoken word':
    'Spoken-word poet at microphone on small stage, warm stage light, intimate venue',
  audio:
    'Musician recording in small Pacific studio, close to microphone, moody warm light',
  'moving image':
    'Pacific documentary filmmaking, camera operator, outdoor daylight',
  adornment:
    'Pacific ceremonial adornment laid on dark cloth, shell and feather elements, editorial light',
  textile:
    'Pacific textile art in progress, woven harakeke or pandanus, natural daylight, artisan hands',
  education:
    'Pacific youth arts workshop, hands-on weaving class, community hall, natural light',
};

function promptForArtform(artform: string): string {
  const key = artform.toLowerCase();
  return (
    ARTFORM_PROMPTS[key] ??
    `Pacific Islander contemporary ${artform} artwork, traditional technique, cultural detail, editorial studio photograph`
  );
}

const NATION_FLAVOUR: Record<string, string> = {
  samoa: 'Sāmoan cultural context',
  tonga: 'Tongan cultural context',
  fiji: 'Fijian iTaukei cultural context',
  cooks: 'Cook Islands cultural context',
  niue: 'Niuean cultural context',
  tahiti: 'Tahitian Māʻohi cultural context',
  hawaii: 'Kanaka Maoli Hawaiian cultural context',
  vanuatu: 'Ni-Vanuatu cultural context',
  png: 'Papua New Guinean Melpa cultural context',
  aotearoa: 'Aotearoa Māori cultural context',
  solomons: 'Solomon Islands cultural context',
  tuvalu: 'Tuvaluan cultural context',
  tokelau: 'Tokelauan cultural context',
  kiribati: 'Kiribati cultural context',
};

// -------------------------------------------------------------------------
// Public helpers — use these in components
// -------------------------------------------------------------------------

export function workImageUrl({
  artform,
  nationId,
  materials,
  seed,
  w = 900,
  h = 1100,
}: {
  artform: string;
  nationId: string;
  materials?: string | null;
  seed: string;
  w?: number;
  h?: number;
}): string {
  const base = promptForArtform(artform);
  const flavour = NATION_FLAVOUR[nationId] ?? '';
  const mat = materials ? `, materials: ${materials}` : '';
  const prompt = `${base}, ${flavour}${mat}, fine art photography, no text, no watermark, respectful of tradition`;
  return pollinate(prompt, { w, h, seed });
}

export function postImageUrl({
  artform,
  nationId,
  caption,
  mediaType,
  seed,
  w = 1200,
  h = 900,
}: {
  artform: string;
  nationId: string;
  caption: string;
  mediaType: 'image' | 'video' | 'audio' | 'gallery';
  seed: string;
  w?: number;
  h?: number;
}): string {
  if (mediaType === 'audio') {
    // Audio post — use a studio/microphone poster
    return pollinate(
      `Pacific Islander artist recording audio in warm studio, close microphone, moody warm light, ${NATION_FLAVOUR[nationId] ?? ''}, no text, no watermark`,
      { w, h, seed },
    );
  }
  const base = promptForArtform(artform);
  const flavour = NATION_FLAVOUR[nationId] ?? '';
  const captionHint = caption.slice(0, 120);
  const action = mediaType === 'video' ? 'process video still' : 'editorial photograph';
  const prompt = `${base}, ${flavour}, ${action}, inspired by: ${captionHint}, no text, no watermark, no logo`;
  return pollinate(prompt, { w, h, seed });
}

export function heroImageUrl(theme: string, seed: string, w = 1800, h = 1000) {
  const prompt = `Editorial wide photograph for Pacific arts magazine, theme: ${theme}, warm natural light, painterly composition, strong cultural dignity, no text, no watermark`;
  return pollinate(prompt, { w, h, seed });
}

export function portraitImageUrl(name: string, nationId: string, w = 480, h = 600) {
  const flavour = NATION_FLAVOUR[nationId] ?? '';
  const prompt = `Fictional editorial studio portrait of a Pacific Islander artist, ${flavour}, warm natural light, shallow depth of field, looking off-camera, respectful, no text, no watermark`;
  return pollinate(prompt, { w, h, seed: name });
}

export function coverImageForOrg(seed: string, w = 1400, h = 600) {
  return unsplashFor('gallery', seed, w, h);
}

export function coverImageForEvent(seed: string, w = 1400, h = 800) {
  return unsplashFor('festival', seed, w, h);
}
