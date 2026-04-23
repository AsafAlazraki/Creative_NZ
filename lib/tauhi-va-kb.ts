/**
 * Tauhi Vā — cultural intelligence knowledge base.
 * Not a chatbot. A structured knowledge base consumed by UI components.
 */

export const PACIFIC_VALUES = [
  {
    id: 'va',
    name: 'Vā',
    origin: 'Sāmoan / Tongan',
    meaning: 'The sacred space between people — not empty, filled with relationship.',
    productExpression:
      'Feed sorts by vā proximity. DMs carry relational context. Network-down states say "the vā is quiet right now."',
  },
  {
    id: 'mana',
    name: 'Mana',
    origin: 'Pan-Pacific',
    meaning: 'Dignity, spiritual power, standing — earned and conferred, not claimed.',
    productExpression:
      'Award badges gold and permanent. Typography editorial. Attribution travels with the work.',
  },
  {
    id: 'inati',
    name: 'Inati',
    origin: 'Niuean',
    meaning: 'Equal distribution — every household receives an equal share of the catch.',
    productExpression:
      '24-hour Drops with equal access. 95% to the artist. Kete Toolkit free. Grants visibility free.',
  },
  {
    id: 'tautua',
    name: 'Tautua',
    origin: 'Sāmoan',
    meaning: 'Service — leadership is earned through serving family and village.',
    productExpression:
      'Kete articles free and practitioner-written. Affiliate is tautua — you gain mana, not commission.',
  },
  {
    id: 'whanaungatanga',
    name: 'Whanaungatanga',
    origin: 'Māori',
    meaning: 'The web of relationships — by blood, shared experience, or common purpose.',
    productExpression:
      'Groups featured. Collaboration tags on posts. Artistic lineage on Profile.',
  },
  {
    id: 'kaitiakitanga',
    name: 'Kaitiakitanga',
    origin: 'Māori',
    meaning: 'Guardianship of people, place, and knowledge.',
    productExpression:
      'Tapu toggle restricts work to nation group. Sacred patterns respected at 6–15% opacity. DM follow-back required.',
  },
  {
    id: 'faaaloalo',
    name: 'Fa\'aaloalo',
    origin: 'Sāmoan',
    meaning: 'Respect expressed through action, speech, and presence.',
    productExpression:
      'Native greetings by declared island. Correct diacritics. Elders visually distinguished.',
  },
] as const;

export const NATION_GREETINGS = {
  samoa: {
    morning: 'Talofa',
    afternoon: 'Talofa',
    evening: 'Manuia le afiafi',
    lateNight: 'Manuia le pō',
    thanks: 'Fa\'afetai',
    closing: 'Mālō lava',
  },
  tonga: {
    morning: 'Mālō e lelei',
    afternoon: 'Mālō e lelei',
    evening: 'Mālō e lelei ki he efiafi',
    lateNight: 'Mālō e lelei ki he poʻuli',
    thanks: 'Mālō',
    closing: 'Mālō pē',
  },
  fiji: {
    morning: 'Bula vinaka',
    afternoon: 'Bula',
    evening: 'Ni sā yadra',
    lateNight: 'Ni sā moce',
    thanks: 'Vinaka vakalevu',
    closing: 'Vinaka',
  },
  cooks: {
    morning: 'Kia orana',
    afternoon: 'Kia orana',
    evening: 'Kia manuia',
    lateNight: 'Kia manuia i te pō',
    thanks: 'Meitaki maata',
    closing: 'Kia manuia',
  },
  niue: {
    morning: 'Fakaalofa lahi atu',
    afternoon: 'Fakaalofa lahi atu',
    evening: 'Kia monuina',
    lateNight: 'Kia monuina',
    thanks: 'Fakaaue',
    closing: 'Kia monuina',
  },
  tahiti: {
    morning: 'Ia ora na',
    afternoon: 'Ia ora na',
    evening: 'Ia ora na i te ahiahi',
    lateNight: 'Ia ora na i te pō',
    thanks: 'Māuruuru roa',
    closing: 'Nānā',
  },
  hawaii: {
    morning: 'Aloha kakahiaka',
    afternoon: 'Aloha \'auinalā',
    evening: 'Aloha ahiahi',
    lateNight: 'Aloha pō',
    thanks: 'Mahalo nui loa',
    closing: 'A hui hou',
  },
  vanuatu: {
    morning: 'Halo',
    afternoon: 'Halo',
    evening: 'Halo olketa',
    lateNight: 'Gudnaet',
    thanks: 'Tankyu tumas',
    closing: 'Lukim yu',
  },
  png: {
    morning: 'Gude',
    afternoon: 'Gude',
    evening: 'Gude olgeta',
    lateNight: 'Gutnait',
    thanks: 'Tenkyu tumas',
    closing: 'Lukim yu bihain',
  },
  aotearoa: {
    morning: 'Mōrena',
    afternoon: 'Kia ora',
    evening: 'Pō mārie',
    lateNight: 'Tēnā koutou i te pō',
    thanks: 'Ngā mihi',
    closing: 'Mā te wā',
  },
  solomons: {
    morning: 'Halo',
    afternoon: 'Halo',
    evening: 'Halo',
    lateNight: 'Gudnaet',
    thanks: 'Tanggio',
    closing: 'Lukim iu',
  },
  tuvalu: {
    morning: 'Tālofa',
    afternoon: 'Tālofa',
    evening: 'Tālofa i te afiafi',
    lateNight: 'Tofā',
    thanks: 'Fakafetai lasi',
    closing: 'Tofā',
  },
  tokelau: {
    morning: 'Mālō ni',
    afternoon: 'Mālō ni',
    evening: 'Mālō ni',
    lateNight: 'Tōfā',
    thanks: 'Fakafetai',
    closing: 'Tōfā',
  },
  kiribati: {
    morning: 'Mauri',
    afternoon: 'Mauri',
    evening: 'Kam na mauri',
    lateNight: 'Ti a bo',
    thanks: 'Ko rabwa',
    closing: 'Ti a bo',
  },
} as const;

export const PACIFIC_PROVERBS = [
  {
    text: 'E ui i tonu ia, ae o le Atua e ana le fa\'amasinoga.',
    language: 'Sāmoan',
    meaning: 'Though it may appear right, judgement belongs to God.',
    attribution: 'Sāmoan proverb',
  },
  {
    text: 'He waka eke noa.',
    language: 'Māori',
    meaning: 'A canoe which we are all in together.',
    attribution: 'Māori proverb',
  },
  {
    text: 'Ko Rongo ki te whenua, ko Rongo ki te tangata.',
    language: 'Māori',
    meaning: 'Peace to the land, peace to the people.',
    attribution: 'Māori proverb',
  },
  {
    text: '\'Ofa ki he kakai kotoa pē.',
    language: 'Tongan',
    meaning: 'Love for all people.',
    attribution: 'Tongan saying',
  },
  {
    text: 'Ua lelei le soifua o le tagata e ala i le galuega lelei.',
    language: 'Sāmoan',
    meaning: 'A good life comes through good work.',
    attribution: 'Sāmoan proverb',
  },
  {
    text: 'Tagi koe nohonoho mo tau kāinga.',
    language: 'Niuean',
    meaning: 'Weep when you sit with your people.',
    attribution: 'Niuean saying on shared grief',
  },
  {
    text: 'Sā ka vei nuku ni jioko.',
    language: 'Fijian',
    meaning: 'Every coconut has its own meaning.',
    attribution: 'Fijian proverb',
  },
  {
    text: '\'A\'ohe pau ka \'ike i ka hālau ho\'okahi.',
    language: 'Hawaiian',
    meaning: 'All knowledge is not taught in the same school.',
    attribution: 'Hawaiian proverb',
  },
  {
    text: 'Se e vahagaia e, kae tukua ki na fanau.',
    language: 'Tuvaluan',
    meaning: 'Whatever is known, pass it to the children.',
    attribution: 'Tuvaluan saying',
  },
  {
    text: 'Teu le vā.',
    language: 'Sāmoan',
    meaning: 'Tend the space between.',
    attribution: 'Sāmoan phrase — the root of our platform',
  },
] as const;

export const INATI_FRAMINGS = [
  'Inati — the Niuean principle of equal sharing. This drop opens for 24 hours. No queue. No early access. Every member sees it the same moment.',
  'Inati reminds us that when a catch comes in, every household receives an equal portion. A drop is a catch. The window is 24 hours.',
  'No collector-tier previews. No influencer early access. Inati means we all start together.',
  'The artist is watching the counter the same way you are. That is inati.',
] as const;

export const TAPU_EXPLAINERS = [
  'Tapu — restricted to members of your primary nation\'s group. Use for ceremonial or sacred work not intended for wider view.',
  'Marking this tapu narrows who can see it. You are exercising kaitiakitanga.',
  'Tapu works are permanent in our records, with full attribution, but their audience is limited. You decide who is inside the kōrero.',
] as const;

export const ARTFORM_NOTES: Record<string, { note: string; language: string }> = {
  siapo: {
    note: 'Sāmoan bark cloth, made from u\'a (paper mulberry) with ʻoʻa dye. Distinct from ngatu, hiapo, kapa, and masi.',
    language: 'sm',
  },
  ngatu: {
    note: 'Tongan bark cloth. Larger formats than Sāmoan siapo, dyed with koka and stamped with kupesi boards.',
    language: 'to',
  },
  hiapo: {
    note: 'Niuean bark cloth — rarer now, actively revived. Distinct stamping and dye traditions.',
    language: 'niu',
  },
  kapa: {
    note: 'Hawaiian bark cloth, from wauke. Beaten with ʻiʻe kuku; stamped with ʻohe kāpala (bamboo stamps).',
    language: 'haw',
  },
  masi: {
    note: 'Fijian bark cloth. Hand-painted designs carry village and family identity. Distinct from siapo and ngatu.',
    language: 'fj',
  },
  tīvaevae: {
    note: 'Cook Islands appliqué quilting, made in vanaga (communal gatherings). Patterns are manu (named).',
    language: 'rar',
  },
  whakairo: {
    note: 'Māori carving. Wood, bone, pounamu. Iwi-specific traditions; deep protocols.',
    language: 'mi',
  },
  tā_moko: {
    note: 'Māori tattoo. Applied with precision to lineage-bearers; not available outside whakapapa.',
    language: 'mi',
  },
  tatau: {
    note: 'Polynesian tattoo — Sāmoan, Tongan, Māʻohi traditions with distinct vocabularies. Not available outside Polynesian lineage.',
    language: 'sm',
  },
  kōwhaiwhai: {
    note: 'Māori painted scroll patterns, most commonly on marae rafters. Repeat-motif grammar with named patterns.',
    language: 'mi',
  },
  rāranga: {
    note: 'Māori weaving — harakeke (flax), kiekie, pīngao. Kete, whāriki, pīkau.',
    language: 'mi',
  },
  bilum: {
    note: 'Papua New Guinean loop-woven carry-bag. Hundreds of distinct traditions across 800+ language groups.',
    language: 'tpi',
  },
  'sand drawing': {
    note: 'Ni-Vanuatu geometric sand drawing. Transient by design — made to be erased by the tide or wind.',
    language: 'bi',
  },
  'shell jewellery': {
    note: 'Solomon Islands and wider Melanesian practice. Tafuli\'ae shell money carries exchange and relationship.',
    language: 'pis',
  },
  'spoken word': {
    note: 'Performance-first poetry. The poem lives in the body before it lives on the page.',
    language: 'en',
  },
  photography: {
    note: 'Pacific photography ranges from ethnographic critique to community documentation to fine-art portraiture.',
    language: 'en',
  },
  'documentary film': {
    note: 'Long-form moving image. Pacific filmmakers have been pioneers in climate-change documentary.',
    language: 'en',
  },
};

export const TAUHI_VA_KB = {
  values: PACIFIC_VALUES,
  greetings: NATION_GREETINGS,
  proverbs: PACIFIC_PROVERBS,
  inatiFramings: INATI_FRAMINGS,
  tapuExplainers: TAPU_EXPLAINERS,
  artforms: ARTFORM_NOTES,
};

export function greetingFor(
  nationId: keyof typeof NATION_GREETINGS | string | undefined,
  hour = new Date().getHours(),
): string {
  const greetings =
    nationId && nationId in NATION_GREETINGS
      ? NATION_GREETINGS[nationId as keyof typeof NATION_GREETINGS]
      : NATION_GREETINGS.aotearoa;
  if (hour < 6) return greetings.lateNight;
  if (hour < 12) return greetings.morning;
  if (hour < 17) return greetings.afternoon;
  if (hour < 22) return greetings.evening;
  return greetings.lateNight;
}

export function proverbOfTheDay(seed: number = Date.now()): (typeof PACIFIC_PROVERBS)[number] {
  const index = Math.floor(seed / 86400000) % PACIFIC_PROVERBS.length;
  return PACIFIC_PROVERBS[Math.abs(index)];
}
