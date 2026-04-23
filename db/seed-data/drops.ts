export const DROPS = [
  {
    id: 'drop_001',
    artistId: 'artist_005',
    workId: 'work_011',
    totalUnits: 24,
    remainingUnits: 11,
    opensAt: '2026-04-22T07:00:00+12:00',
    closesAt: '2026-04-23T07:00:00+12:00',
    status: 'live',
    storyFraming: `Inati — the Niuean principle of equal sharing. This drop opens for 24 hours. No queue-jumping, no collector-tier early access, no email-list preview. Every member of KavaWorks saw it the same moment.

Twenty-four small tumau study pieces, carved in cedar over the past three months. Each $420. First in, first served — but nobody is ahead because we all started together.

I am watching the counter the same way you are.`,
  },
  {
    id: 'drop_002',
    artistId: 'artist_011',
    workId: 'work_018',
    totalUnits: 40,
    remainingUnits: 40,
    opensAt: '2026-04-26T07:00:00+12:00',
    closesAt: '2026-04-27T07:00:00+12:00',
    status: 'scheduled',
    storyFraming: `Forty shell and bone pieces, priced $85 to $220. Beach-recovered materials, nothing new harvested. 24-hour inati window.

I make these in big rounds; this is the third drop I have run. The previous two sold through.`,
  },
  {
    id: 'drop_003',
    artistId: 'artist_004',
    workId: 'work_008',
    totalUnits: 12,
    remainingUnits: 0,
    opensAt: '2026-03-15T07:00:00+13:00',
    closesAt: '2026-03-16T07:00:00+13:00',
    status: 'closed',
    storyFraming: `Twelve cushion-sized tīvaevae panels. Sold out in seven hours.

I am doing a second run in June — same inati rules, same 24-hour window, same price. I will post when the date is set.`,
  },
  {
    id: 'drop_004',
    artistId: 'artist_002',
    workId: 'work_020',
    totalUnits: 15,
    remainingUnits: 15,
    opensAt: '2026-04-30T07:00:00+12:00',
    closesAt: '2026-05-01T07:00:00+12:00',
    status: 'scheduled',
    storyFraming: `Fifteen photographic prints from the 2025 Objectspace show. Edition of 8 for No. IV, remaining available.

I am doing this as a KavaWorks drop rather than a gallery release because the gallery-stand approach means one collector buying all of them. Inati means fifteen different walls.`,
  },
] as const;
