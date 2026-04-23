export const GRANTS = [
  {
    id: 'grant_aog_pacific_t1',
    name: 'Arts Organisations & Groups Fund — Pacific pool (Tier 1)',
    funder: 'Creative New Zealand',
    amountMin: 10000,
    amountMax: 50000,
    amountDisplay: 'Up to $50,000 per year',
    duration: 'Up to 3 years',
    pool: 'pacific',
    tier: 1,
    eligibility: [
      'Pasifika-led arts organisations and groups',
      'Collectives and artist-run spaces working across Pacific artforms',
      'Marae, iwi, hapū applying for Pacific-specific activity',
    ],
    openDate: '2026-03-01',
    deadline: '2026-05-15',
    resultsBy: '2026-09-15',
    assessmentProcess:
      'Assessed by Pacific Arts kaimahi and peer assessors with lived experience in Pacific arts practice.',
    plainEnglish: `This is an operational grant for small to medium Pasifika-led arts groups. It covers core work: rent, kaimahi wages, programme costs, and organisational development.

If your group runs classes, hosts exhibitions, programmes events, or employs at least one coordinator, this is the tier for you. Tier 1 can fund up to $50,000 per year for up to three years — so you get predictable, multi-year support rather than one-off project funding.

Applications are assessed by Pacific Arts kaimahi and peer assessors who know the ecosystem. You are not explaining yourself to strangers.`,
    howToApply: [
      'Check you meet the eligibility criteria at creativenz.govt.nz',
      'Book a kōrero with a Pacific Arts Adviser — they will read your draft before submission',
      'Prepare a two-year programme budget, a letter of support from a kaumatua/matai, and evidence of prior activity',
      'Submit via the CNZ portal by the deadline (midnight NZT)',
      'If successful, attend a kickoff hui with other funded groups',
    ],
    similarGrantIds: ['grant_aog_pacific_t2', 'grant_creative_communities'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/arts-organisations-and-groups-fund',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_aog_pacific_t2',
    name: 'Arts Organisations & Groups Fund — Pacific pool (Tier 2)',
    funder: 'Creative New Zealand',
    amountMin: 50001,
    amountMax: 125000,
    amountDisplay: '$50,001 – $125,000 per year',
    duration: 'Up to 3 years',
    pool: 'pacific',
    tier: 2,
    eligibility: [
      'Established Pasifika-led arts organisations',
      'Operating for at least three years',
      'Employing at least two full-time-equivalent kaimahi',
    ],
    openDate: '2026-03-01',
    deadline: '2026-05-15',
    resultsBy: '2026-09-15',
    assessmentProcess:
      'Multi-stage: peer panel recommendation, Arts Council final decision, with Pacific Arts kaimahi accompanying throughout.',
    plainEnglish: `Tier 2 supports organisations that have grown past Tier 1 — you have staff, you have programme, you have a governance structure that works.

At this tier, CNZ expects a strategic plan and a track record. In return, you get funding that stretches to real salaries and real programming. Annual reporting is lighter than project funding because the trust has been earned.`,
    howToApply: [
      'Confirm with CNZ that you meet the eligibility thresholds',
      'Prepare your strategic plan (3-year), governance documentation, audited accounts',
      'Book two kōrero sessions with Pacific Arts Advisers — first at 6 weeks out, second at 2 weeks out',
      'Submit via CNZ portal',
      'Prepare for a possible in-person assessment hui',
    ],
    similarGrantIds: ['grant_aog_pacific_t1', 'grant_aog_pacific_t3', 'grant_toi_uru_kahikatea'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/arts-organisations-and-groups-fund',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_aog_pacific_t3',
    name: 'Arts Organisations & Groups Fund — Pacific pool (Tier 3)',
    funder: 'Creative New Zealand',
    amountMin: 125001,
    amountMax: 500000,
    amountDisplay: '$125,001 – $500,000 per year',
    duration: 'Up to 3 years',
    pool: 'pacific',
    tier: 3,
    eligibility: [
      'Large Pasifika arts organisations with national footprint',
      'Audited accounts for the past 3 years',
      'Minimum 5 FTE staff',
    ],
    openDate: '2026-03-01',
    deadline: '2026-05-15',
    resultsBy: '2026-09-15',
    assessmentProcess:
      'Full Arts Council review with Pacific Arts senior leadership. Site visits expected.',
    plainEnglish: `Tier 3 is for the major Pasifika arts organisations — the ones that programme nationally, employ teams, and shape the ecosystem.

If you are at this scale, you already know. If you are unsure, start the conversation with a Pacific Arts Practice Adviser.`,
    howToApply: [
      'Confirm eligibility with senior Pacific Arts kaimahi',
      'Prepare: 3-year strategic plan, organisational chart, 3 years audited accounts, impact evidence',
      'Multiple kōrero sessions — start 3 months before deadline',
      'Submit via CNZ portal',
      'Host a site visit from the assessment panel',
    ],
    similarGrantIds: ['grant_aog_pacific_t2', 'grant_toi_uru_kahikatea'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/arts-organisations-and-groups-fund',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_aog_dev',
    name: 'Development Fund for Arts Organisations and Groups',
    funder: 'Creative New Zealand',
    amountMin: 2000,
    amountMax: 10000,
    amountDisplay: 'Up to $10,000',
    duration: 'Single project',
    pool: 'pacific',
    tier: null,
    eligibility: [
      'Existing arts organisations or groups of any scale',
      'Purpose must be capability-building (governance, strategy, training)',
    ],
    openDate: '2026-02-01',
    deadline: '2026-06-30',
    resultsBy: '2026-08-15',
    assessmentProcess: 'Rolling decision by Pacific Arts kaimahi within 6 weeks of application.',
    plainEnglish: `The Development Fund pays for the work that strengthens your organisation but doesn't produce a visible show: governance training, strategic planning, business coaching, cultural protocols training for your board.

If you are looking at the AOG Pacific pool and realising you're not quite ready, start here. This is the step before.`,
    howToApply: [
      'Identify a specific capability gap (not general "development")',
      'Find a provider or consultant — CNZ has a list',
      'Get a short proposal from them',
      'Submit to CNZ with a 2-page letter of intent',
      'Approval typically within 6 weeks',
    ],
    similarGrantIds: ['grant_aog_pacific_t1'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/development-fund-for-arts-organisations-and-groups',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_arts_grants_pacific',
    name: 'Arts Grants — Pacific Arts',
    funder: 'Creative New Zealand',
    amountMin: 5000,
    amountMax: 65000,
    amountDisplay: '$5,000 – $65,000',
    duration: 'Single project up to 24 months',
    pool: 'pacific',
    tier: null,
    eligibility: [
      'Individual Pasifika artists',
      'Pasifika arts collectives',
      'Contestable — applications ranked against each other',
    ],
    openDate: '2026-04-01',
    deadline: '2026-06-12',
    resultsBy: '2026-10-01',
    assessmentProcess: 'Pasifika peer-assessor panel; typically 3 rounds per year.',
    plainEnglish: `Arts Grants Pacific Arts is the project fund. You have a specific work you want to make — a body of paintings, a short film, a ngatu series, a play — and you need money to make it happen.

Applications are assessed by Pasifika artists like you. The panel rotates each round.`,
    howToApply: [
      'Draft your project: what, why, who, how, how much',
      'Book a 30-minute kōrero with a Pacific Arts Adviser',
      'Prepare a budget with quotes for any paid work',
      'Submit via CNZ portal',
      'Results announced within 16 weeks',
    ],
    similarGrantIds: ['grant_iosefa_enari', 'grant_creative_communities'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/arts-grants',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_creative_communities',
    name: 'Creative Communities Scheme',
    funder: 'Creative New Zealand (via local councils)',
    amountMin: 500,
    amountMax: 7500,
    amountDisplay: '$500 – $7,500',
    duration: 'Single project',
    pool: 'general',
    tier: null,
    eligibility: [
      'Community-based arts activity',
      'Applicant must live in the council area they are applying to',
      'Grassroots priority — first-time applicants welcomed',
    ],
    openDate: '2026-05-01',
    deadline: '2026-06-30',
    resultsBy: '2026-08-30',
    assessmentProcess:
      'Council-level committee with Pasifika representation where possible. Twice-yearly rounds.',
    plainEnglish: `The Creative Communities Scheme is your local council's arts grant, co-funded by CNZ. If you have not applied for funding before, this is the best starting point.

Apply through your council, not through CNZ directly. Each council has its own form and deadlines — but the money comes from the same place.`,
    howToApply: [
      'Find your local council\'s Creative Communities page',
      'Read the priorities — some councils have Pasifika-specific streams',
      'Fill in the council form',
      'Submit by deadline',
      'Decision typically within 8 weeks',
    ],
    similarGrantIds: ['grant_arts_grants_pacific'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/creative-communities-scheme',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_toi_uru_kahikatea',
    name: 'Toi Uru Kahikatea — Arts Development Investments',
    funder: 'Creative New Zealand',
    amountMin: 100000,
    amountMax: 1000000,
    amountDisplay: '$100,000 – $1,000,000 per year',
    duration: '3 years',
    pool: 'general',
    tier: null,
    eligibility: [
      'Established arts organisations with national reach',
      'Demonstrated artistic leadership in their field',
      'Audited accounts, governance in place',
    ],
    openDate: '2026-01-15',
    deadline: '2026-07-15',
    resultsBy: '2026-12-01',
    assessmentProcess:
      'Arts Council decision on recommendation from peer panels. Includes Pacific Arts representation.',
    plainEnglish: `Toi Uru Kahikatea is the flagship 3-year investment fund for established arts organisations. A handful of Pasifika-led organisations sit inside this scheme.

If you are applying at this level, you are not in the first pass of your organisation's life. This is long-term development funding. Start a conversation with CNZ leadership at least 6 months before the deadline.`,
    howToApply: [
      'Long lead-up: begin conversations with CNZ kaimahi 6–12 months out',
      'Prepare: full strategic plan, governance, audited accounts for 3 years, artistic programme',
      'Multiple pre-submission kōrero — this is not a one-shot application',
      'Submit via CNZ portal',
      'Multi-round assessment, site visits, interviews',
    ],
    similarGrantIds: ['grant_aog_pacific_t3'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/toi-uru-kahikatea',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_samoa_residency',
    name: 'Creative New Zealand Sāmoa Artist in Residence',
    funder: 'Creative New Zealand',
    amountMin: 15000,
    amountMax: 22000,
    amountDisplay: '$15,000 – $22,000',
    duration: '3-month residency in Sāmoa',
    pool: 'pacific',
    tier: null,
    eligibility: [
      'Pasifika artists of Sāmoan descent',
      'Mid-career or established practice',
      'Clear project that benefits from working in Sāmoa',
    ],
    openDate: '2026-02-15',
    deadline: '2026-05-20',
    resultsBy: '2026-08-15',
    assessmentProcess:
      'Panel of Sāmoan arts leaders and CNZ Pacific Arts kaimahi. Cultural protocols are part of the assessment.',
    plainEnglish: `Three months in Sāmoa with accommodation, a stipend, and connection to local arts networks. The point is not to escape Aotearoa — it is to deepen your practice in the place that holds your language and lineage.

Applications should show a clear project that can only, or best, be made in Sāmoa. Generic residencies are declined.`,
    howToApply: [
      'Develop your Sāmoa-based project — be specific about why there, why now',
      'Letter of support from a matai or Sāmoan cultural leader',
      'Budget: CNZ stipend covers housing and $ living; you cover your own travel if outside NZ',
      'Submit via CNZ portal',
      'Interview for shortlisted applicants',
    ],
    similarGrantIds: ['grant_arts_grants_pacific'],
    sourceUrl:
      'https://www.creativenz.govt.nz/find-funding-and-support/all-opportunities/creative-new-zealand-samoa-artist-in-residence',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_fulbright_pacific',
    name: 'Fulbright Pacific Writer\'s Residency',
    funder: 'Fulbright New Zealand (in partnership with CNZ)',
    amountMin: 12000,
    amountMax: 18000,
    amountDisplay: '$12,000 – $18,000',
    duration: '2-month residency at a US partner institution',
    pool: 'pacific',
    tier: null,
    eligibility: [
      'Pasifika writers (fiction, poetry, nonfiction, playwriting)',
      'Published or produced work — emerging and mid-career',
      'Clear project benefiting from US-based research or community',
    ],
    openDate: '2026-03-01',
    deadline: '2026-07-01',
    resultsBy: '2026-11-01',
    assessmentProcess:
      'Fulbright NZ with Pacific-arts co-assessors. Literary merit and cultural contribution weighted equally.',
    plainEnglish: `A 2-month US residency for a Pasifika writer. Past residents have used the time to research Pacific diasporic archives, connect with US-based Pasifika communities, and draft substantial manuscripts.

The project must need the US context. "A change of scenery" is not enough.`,
    howToApply: [
      'Outline your project with specific US research or community connections',
      'Secure initial correspondence with a US partner institution',
      'Writing samples (10–20 pages)',
      'Two references — one literary, one cultural',
      'Submit via Fulbright NZ portal',
    ],
    similarGrantIds: ['grant_arts_grants_pacific'],
    sourceUrl: 'https://www.fulbright.org.nz/awards/',
    lastSyncedAt: '2026-04-20',
  },
  {
    id: 'grant_iosefa_enari',
    name: 'Iosefa Enari Memorial Award',
    funder: 'Creative New Zealand',
    amountMin: 7500,
    amountMax: 7500,
    amountDisplay: '$7,500',
    duration: 'One-time award at Arts Pasifika Awards',
    pool: 'pacific',
    tier: null,
    eligibility: [
      'Emerging Pasifika artist in the first decade of practice',
      'Self-nomination and peer nomination both accepted',
    ],
    openDate: '2026-06-01',
    deadline: '2026-08-15',
    resultsBy: '2026-11-20',
    assessmentProcess:
      'Arts Pasifika Awards panel of established Pasifika artists. Honours the late Iosefa Enari.',
    plainEnglish: `The Iosefa Enari Memorial is one of the Arts Pasifika Awards, given each year at the November ceremony. It honours Iosefa Enari, whose own practice and mentorship shaped a generation of Pacific artists.

Nominations come from both artists themselves and peers who have seen their work. The award is $7,500 and — more importantly — public recognition.`,
    howToApply: [
      'Nominations open 1 June each year',
      'Submit a 1-page statement of practice and 8-10 work samples',
      'If peer-nominated, the nominator writes a letter of support',
      'Submit via CNZ Arts Pasifika Awards form',
      'Awards ceremony each November',
    ],
    similarGrantIds: ['grant_arts_grants_pacific'],
    sourceUrl:
      'https://www.creativenz.govt.nz/about-us/news-and-blog/2024-arts-pasifika-awards-winners-announced',
    lastSyncedAt: '2026-04-20',
  },
] as const;

export type GrantId = (typeof GRANTS)[number]['id'];
