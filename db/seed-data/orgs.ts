export const ORGS = [
  {
    id: 'org_mangere_arts',
    name: 'Māngere Arts Centre — Ngā Tohu o Uenuku',
    description:
      'Council-owned, community-run arts venue in Māngere, South Auckland. Pasifika and Māori programming at the centre.',
    city: 'Māngere, Tāmaki Makaurau',
    website: 'https://www.mangerearts.co.nz',
    focus: ['Pacific arts', 'Māori arts', 'community arts', 'youth development'],
    linkedArtistIds: ['artist_001', 'persona_elder'],
    currentProgrammes: [
      { title: 'Whenua Whakapapa — Lesā Tupuola Feʻilo', dates: 'Oct 2024 – Mar 2025' },
      { title: 'Emerging Pasifika 2026', dates: 'Jul 2026 – Oct 2026' },
      { title: 'Saturday Siapo Wānanga', dates: 'Weekly' },
    ],
    foundedYear: 2009,
  },
  {
    id: 'org_fresh_gallery',
    name: 'Fresh Gallery Ōtara',
    description:
      'Contemporary art space in Ōtara, Auckland. Focus on emerging Pasifika and Māori contemporary practice.',
    city: 'Ōtara, Tāmaki Makaurau',
    website: 'https://www.freshgallery.co.nz',
    focus: ['contemporary Pasifika', 'contemporary Māori', 'emerging practice'],
    linkedArtistIds: ['artist_001', 'artist_005'],
    currentProgrammes: [
      { title: 'Tumau: New Work — Folasāga Talagi-Pule', dates: 'Apr 2024 – May 2024' },
      { title: 'Ōtara Futures 2026', dates: 'Sep 2026 – Nov 2026' },
    ],
    foundedYear: 2007,
  },
  {
    id: 'org_pacific_dance',
    name: 'Pacific Dance New Zealand',
    description:
      'Supports Pacific dance practice nationally. Commissions, festivals, residencies, and education.',
    city: 'Tāmaki Makaurau',
    website: 'https://www.pacificdance.co.nz',
    focus: ['Pacific dance', 'performance', 'choreographic development'],
    linkedArtistIds: [],
    currentProgrammes: [
      { title: 'Pacific Dance Festival 2026', dates: 'Jun 2026' },
      { title: 'Choreographic Residency 2026', dates: 'ongoing' },
    ],
    foundedYear: 2009,
  },
  {
    id: 'org_pacific_underground',
    name: 'Pacific Underground',
    description:
      'Long-running Ōtautahi-based Pasifika theatre and performance collective.',
    city: 'Ōtautahi (Christchurch)',
    website: 'https://www.pacificunderground.co.nz',
    focus: ['theatre', 'performance', 'youth development'],
    linkedArtistIds: ['artist_010'],
    currentProgrammes: [
      { title: 'Pasifika Youth Theatre 2026', dates: 'All year' },
      { title: 'Fresh Voices — new writing', dates: 'Sep 2026' },
    ],
    foundedYear: 1994,
  },
  {
    id: 'org_bats',
    name: 'BATS Theatre',
    description:
      'Wellington independent theatre with strong Pasifika programming line.',
    city: 'Te Whanganui-a-Tara (Wellington)',
    website: 'https://bats.co.nz',
    focus: ['theatre', 'independent performance', 'Pasifika programming'],
    linkedArtistIds: ['artist_002', 'artist_010'],
    currentProgrammes: [
      { title: 'Pasifika Season 2026', dates: 'Aug 2026' },
    ],
    foundedYear: 1989,
  },
  {
    id: 'org_playmarket',
    name: 'Playmarket',
    description:
      'New Zealand\'s playwrights\' agency. Pasifika Playreading Series and development programmes.',
    city: 'Te Whanganui-a-Tara (Wellington)',
    website: 'https://www.playmarket.org.nz',
    focus: ['playwriting', 'script development', 'Pasifika playwrights'],
    linkedArtistIds: [],
    currentProgrammes: [
      { title: 'Pasifika Playreading Series', dates: 'Quarterly' },
      { title: 'Playwrights b4 25 — Pasifika stream', dates: 'Annual' },
    ],
    foundedYear: 1973,
  },
  {
    id: 'org_coconet',
    name: 'The Coconet / Tikilounge Productions',
    description:
      'Pacific digital media platform and production company. Long-form Pacific storytelling in documentary and digital formats.',
    city: 'Tāmaki Makaurau',
    website: 'https://www.thecoconet.tv',
    focus: ['digital media', 'documentary', 'Pacific storytelling'],
    linkedArtistIds: ['artist_012'],
    currentProgrammes: [
      { title: 'Moana Stories Season 5', dates: '2026' },
    ],
    foundedYear: 2010,
  },
  {
    id: 'org_signature_choir',
    name: 'Signature Choir',
    description:
      'Auckland-based Pasifika choir. 2024 Pacific Heritage Arts Award winner.',
    city: 'Tāmaki Makaurau',
    website: 'https://www.signaturechoir.co.nz',
    focus: ['choral', 'performance', 'cultural celebration'],
    linkedArtistIds: [],
    currentProgrammes: [
      { title: 'Annual concert 2026', dates: 'Nov 2026' },
      { title: 'Community choir programme', dates: 'All year' },
    ],
    foundedYear: 2018,
  },
] as const;
