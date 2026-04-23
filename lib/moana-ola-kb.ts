/**
 * Moana Ola — engagement intelligence knowledge base.
 * Not a chatbot. Structured, used to surface guidance at the point of creation.
 */

export const BEST_TIMES = {
  craftPost: {
    window: 'Saturday mornings 8am–11am NZT',
    reason: 'Pacific craft audiences in Aotearoa check in around the Saturday slow-morning rhythm.',
    multiplier: '3.4x',
  },
  processVideo: {
    window: 'Thursday evenings 6pm–9pm NZT',
    reason: 'Thursday evening performs for practice-focused content as audiences wind into weekend.',
    multiplier: '2.1x',
  },
  finishedWork: {
    window: 'Sunday afternoons 2pm–5pm NZT',
    reason: 'Sunday afternoon is a reflective window; finished-work reach is highest.',
    multiplier: '2.7x',
  },
  announcement: {
    window: 'Tuesday 10am NZT',
    reason: 'Mid-morning weekday for announcement; people are at desks.',
    multiplier: '1.8x',
  },
  community: {
    window: 'Friday evenings 6pm–8pm NZT',
    reason: 'Community-photo posts perform into the weekend start.',
    multiplier: '2.2x',
  },
} as const;

export const FORMAT_PERFORMANCE: Record<
  string,
  { bestFormat: string; bestRatio: string; note: string }
> = {
  siapo: {
    bestFormat: 'Process video 30–60s',
    bestRatio: '2x saves vs. finished stills',
    note: 'Siapo audiences save process work for reference. Short videos of stamping, beating, or dye preparation perform.',
  },
  ngatu: {
    bestFormat: 'Close-up detail stills (gallery of 4–6)',
    bestRatio: '1.7x shares vs. single image',
    note: 'Kupesi detail at high resolution reads; audiences share with family who know the patterns.',
  },
  tīvaevae: {
    bestFormat: 'Vanaga video 45–90s',
    bestRatio: '3.1x saves for vanaga content',
    note: 'Community stitching footage with multiple hands visible drives the highest saves.',
  },
  kapa: {
    bestFormat: 'Long process video 60–120s',
    bestRatio: '2.8x engagement for process over result',
    note: 'Kapa audiences are patient. Longer form performs here than elsewhere.',
  },
  masi: {
    bestFormat: 'Pattern-painting close-up',
    bestRatio: '2.4x saves',
    note: 'The painting motion reads as both craft and meditation; close-up performs.',
  },
  carving: {
    bestFormat: 'Tool close-up, under 30s',
    bestRatio: '2.0x saves',
    note: 'Chisel and wood close-ups are the hero shot for carving content.',
  },
  bilum: {
    bestFormat: 'Loop-weaving video',
    bestRatio: '3.4x saves',
    note: 'The rhythmic loop is hypnotic. 30–45s loops repeat well.',
  },
  photography: {
    bestFormat: 'Series gallery (3–5 images)',
    bestRatio: '1.9x reach',
    note: 'Series outperform single shots. Write captions that build.',
  },
  'spoken word': {
    bestFormat: 'Audio with static-image cover',
    bestRatio: '2.7x shares',
    note: 'Audio posts with a strong static cover share well. Video less so.',
  },
};

export const HASHTAG_TRENDS = [
  { tag: '#siapo', momentum: 'rising', nations: ['samoa'] },
  { tag: '#tīvaevae', momentum: 'steady', nations: ['cooks'] },
  { tag: '#ngatu', momentum: 'steady', nations: ['tonga'] },
  { tag: '#bilum', momentum: 'rising', nations: ['png'] },
  { tag: '#kapa', momentum: 'rising', nations: ['hawaii'] },
  { tag: '#pacificarts', momentum: 'steady', nations: [] },
  { tag: '#teuleva', momentum: 'rising', nations: ['samoa', 'tonga'] },
  { tag: '#inati', momentum: 'rising', nations: ['niue'] },
  { tag: '#pasifika', momentum: 'steady', nations: [] },
  { tag: '#māori', momentum: 'steady', nations: ['aotearoa'] },
  { tag: '#moana', momentum: 'rising', nations: [] },
  { tag: '#tatau', momentum: 'steady', nations: ['samoa', 'tahiti', 'aotearoa'] },
  { tag: '#craftwithmana', momentum: 'new', nations: [] },
  { tag: '#toiaotearoa', momentum: 'steady', nations: ['aotearoa'] },
] as const;

export const CAPTION_PATTERNS = {
  highShare: 'Personal story + cultural context + invitation to respond.',
  highSave: 'Process explanation + technique detail.',
  highComment: 'Open question to community.',
  lowEngagement: 'Generic product description. Avoid.',
} as const;

export const SEASONAL_MOMENTS = [
  {
    name: 'Sāmoan Language Week (Vaiaso o le Gagana Sāmoa)',
    startDate: '2026-05-25',
    endDate: '2026-05-31',
    guidance:
      'Post in Sāmoan with English translation. Siapo and tatau-process content will reach widely this week.',
    nations: ['samoa'],
  },
  {
    name: 'Cook Islands Language Week (Te \'Epetoma o te Reo Māori Kūki \'Āirani)',
    startDate: '2026-08-02',
    endDate: '2026-08-08',
    guidance: 'Tīvaevae, rito weaving, carving content peaks this week. Post in Cook Islands Māori.',
    nations: ['cooks'],
  },
  {
    name: 'Tongan Language Week (Uike Kātoanga\'i \'o e Lea faka-Tonga)',
    startDate: '2026-09-06',
    endDate: '2026-09-12',
    guidance: 'Ngatu and kava ceremony content drives attention. Post in Tongan.',
    nations: ['tonga'],
  },
  {
    name: 'Niuean Language Week',
    startDate: '2026-10-18',
    endDate: '2026-10-24',
    guidance: 'Hiapo and carving content. Post in Niuean. Tie into inati framing.',
    nations: ['niue'],
  },
  {
    name: 'Fijian Language Week',
    startDate: '2026-10-04',
    endDate: '2026-10-10',
    guidance: 'Masi, magimagi, kuta content. Post in Fijian.',
    nations: ['fiji'],
  },
  {
    name: 'Tokelauan Language Week',
    startDate: '2026-10-25',
    endDate: '2026-10-31',
    guidance: 'Tuluma, pandanus weaving. Post in Tokelauan.',
    nations: ['tokelau'],
  },
  {
    name: 'Tuvaluan Language Week',
    startDate: '2026-09-27',
    endDate: '2026-10-03',
    guidance: 'Fala, fans, climate-arts content. Post in Tuvaluan.',
    nations: ['tuvalu'],
  },
  {
    name: 'Pasifika Festival (Auckland)',
    startDate: '2026-03-14',
    endDate: '2026-03-15',
    guidance:
      'The biggest Pacific weekend in Aotearoa. All Pacific artforms benefit. Post heavily.',
    nations: [],
  },
  {
    name: 'Heilala Festival (Tonga, livestreamed)',
    startDate: '2026-07-04',
    endDate: '2026-07-13',
    guidance: 'Tongan ngatu and kava content, plus performance. Post in Tongan.',
    nations: ['tonga'],
  },
  {
    name: 'Matariki (Māori New Year)',
    startDate: '2026-07-17',
    endDate: '2026-07-19',
    guidance:
      'Māori-led moment; Pacific artists with whakapapa connections post thoughtfully. Not a promotion window.',
    nations: ['aotearoa'],
  },
] as const;

export const MOANA_OLA_KB = {
  bestTimes: BEST_TIMES,
  formatPerformance: FORMAT_PERFORMANCE,
  hashtagTrends: HASHTAG_TRENDS,
  captionPatterns: CAPTION_PATTERNS,
  seasonalMoments: SEASONAL_MOMENTS,
};

export function upcomingSeasonalMoment(
  now = new Date(),
): (typeof SEASONAL_MOMENTS)[number] | null {
  const target = now.getTime();
  const future = SEASONAL_MOMENTS.map((m) => ({
    ...m,
    startMs: new Date(m.startDate).getTime(),
  }))
    .filter((m) => m.startMs > target)
    .sort((a, b) => a.startMs - b.startMs);
  return future[0] ?? null;
}

export function daysUntil(dateStr: string, now = new Date()): number {
  const diff = new Date(dateStr).getTime() - now.getTime();
  return Math.ceil(diff / 86400000);
}
