import type { ArtistSeed } from './types';

export const ARTISTS_CORE: ArtistSeed[] = [
  {
    id: 'artist_001',
    name: 'Lesā Tupuola Feʻilo',
    handle: 'lesatupuola',
    role: 'artist',
    primaryNationId: 'samoa',
    affiliations: ['samoa', 'aotearoa'],
    city: 'Tāmaki Makaurau (Auckland)',
    bio: `I am from Leulumoega on the west coast of Upolu, and from Māngere, where my father settled in 1972. I make siapo in the way my grandmother Tupu taught me — the u\'a stripped in the cooler months, the dyes prepared at the back of the house, the paiogo beaten until the cloth remembers the grain of the stone underneath. I am forty-six years into this work and I still learn from my hands every morning.`,
    statement: `Siapo is not ornament. It is record. Every pattern in every corner of every piece I have made carries a name, a place, a relationship. The central motif of Moana Whakapapa I is the one my grandmother Tupu stamped onto the shoulder of my mother\'s wedding siapo in 1978, the year before she passed. I was twelve. I was already making with her for five years by then.

I learned to beat u\'a with a paiogo at seven. I learned to prepare the \'o\'a dye at nine. I did not touch the stamps until I was eleven, and even then only to clean them. The first stamp I made as a line rather than a dot was at thirteen, and my grandmother said: now you are beginning.

My practice lives between two shorelines. In Leulumoega, siapo carries wedding, funeral, title investiture — the great moments where cloth is the language. In Māngere, siapo carries diaspora — the work of remembering what was given to us, and passing it onward to daughters and granddaughters who grow up with two oceans in their mouths. Both practices are siapo. Both are equally real.

I run a small wānanga from my garage on Saturday mornings. Nine women come. Four are my relatives. Five are strangers who became relatives through the work. We beat u\'a together. We prepare dye together. We don\'t always finish a piece — sometimes we only talk. This is siapo too. The cloth is the container; what gets shared inside it is the thing itself.

I have been fortunate to receive the Senior Pacific Artist Award in 2023. I took that money and I bought u\'a — three years\' worth. My granddaughters will have material to learn from.

Fa\'afetai tele lava.`,
    avatarStyle: 'illustrated-silhouette',
    verified: true,
    elderStatus: true,
    elderInGroups: ['group_siapo_makers'],
    culturalTheme: 'tapa',
    artforms: ['siapo', 'printmaking'],
    yearsActive: 46,
    followers: 3412,
    following: 128,
    postsCount: 187,
    worksSold: 64,
    supporters: 89,
    awards: [
      {
        id: 'senior_pacific_artist_2023',
        name: 'Senior Pacific Artist Award',
        body: 'Creative New Zealand',
        year: 2023,
        amount: 25000,
        citation:
          'For a lifetime of siapo practice that has held Sāmoan textile knowledge across two oceans.',
      },
    ],
    subscriptionTiers: [
      { name: 'Supporter', priceNzd: 5, perks: ['Early access to new works', 'Monthly studio photo'] },
      {
        name: 'Patron',
        priceNzd: 20,
        perks: ['All Supporter perks', 'Monthly video letter from the studio', 'First-look on drops'],
      },
      {
        name: 'Inati Circle',
        priceNzd: 50,
        perks: ['All Patron perks', 'Signed annual print', 'Invitation to the annual studio visit'],
      },
    ],
    exhibitions: [
      { year: 2024, title: 'Whenua Whakapapa', venue: 'Māngere Arts Centre', role: 'Solo' },
      { year: 2022, title: 'Moana Currents', venue: 'City Gallery Wellington', role: 'Group' },
      { year: 2019, title: 'Tapa: From Tonga to Tuvalu', venue: 'Te Papa Tongarewa', role: 'Group' },
      { year: 2015, title: 'Siapo Stories', venue: 'Fresh Gallery Ōtara', role: 'Solo' },
    ],
    lineage: {
      apprenticedTo: 'My grandmother Tupu in the village of Leulumoega',
      teaches: ['folatalagi', 'emerging_siapo_1', 'emerging_siapo_2'],
      exhibitedWith: ['akanisi_t', 'teremoana_nt'],
    },
  },
  {
    id: 'artist_002',
    name: 'Sione Kaho Tāufa',
    handle: 'sionekt',
    role: 'artist',
    primaryNationId: 'tonga',
    affiliations: ['tonga', 'aotearoa'],
    city: 'Te Whanganui-a-Tara (Wellington)',
    bio: `I am Tongan, queer, and photographically trained. I split my time between Te Whanganui-a-Tara and Nuku\'alofa, and sometimes Canberra where my partner teaches. I make images and moving image that think about ocean and diaspora and the bodies that carry both. Epeli Hauʻofa\'s phrase — "we are the sea, we are the ocean" — sits on my wall where I edit.`,
    statement: `I make work at the intersection of queerness, Tongan-ness, and the moana. These are not separate. In the old Tongan map of the world — the one Epeli Hauʻofa described — the ocean was not distance. It was connection. Islands were not isolated. They were stations in a living network.

I photograph bodies in this context. My subjects are Pasifika queer artists, most of them friends, some strangers who became friends through the lens. I photograph them on the shoreline, in the studio, in bedrooms, at fakaleitī events, at church afterwards. I resist the ethnographic frame. They are not specimens. They are colleagues.

My ngatu-collaborations with Tongan weavers in Nukuʻalofa began in 2022. I bring photographs to the work; the weavers bring the kupesi and the beaten bark. Together we make pieces that sit between the gallery wall and the cultural fabric. Photographers working with ngatu is not new — Greg Semu and John Pule have walked this path. I am following.

My current project is a multichannel video piece on returning — diaspora Tongans coming back to Nuku\'alofa after years away, and the way the body recognises the shore before the mind does.

I was awarded the Emerging Pacific Artist Award in 2024. I used the money to pay the weavers I work with properly — something I had been under-paying for years out of ignorance. Tauhi vā requires correction. This was correction.`,
    avatarStyle: 'illustrated-silhouette',
    verified: true,
    elderStatus: false,
    elderInGroups: [],
    culturalTheme: 'moana',
    artforms: ['photography', 'moving image', 'adornment'],
    yearsActive: 9,
    followers: 1890,
    following: 341,
    postsCount: 142,
    worksSold: 22,
    supporters: 54,
    awards: [
      {
        id: 'emerging_pacific_artist_2024',
        name: 'Emerging Pacific Artist Award',
        body: 'Creative New Zealand',
        year: 2024,
        amount: 7500,
        citation:
          'For photographic and moving-image work that thinks moana and queerness together with rigour and love.',
      },
    ],
    subscriptionTiers: [
      { name: 'Supporter', priceNzd: 5, perks: ['Monthly contact sheet PDF'] },
      { name: 'Patron', priceNzd: 15, perks: ['All Supporter perks', 'Annual zine mailed to you'] },
      {
        name: 'Studio Circle',
        priceNzd: 40,
        perks: ['All Patron perks', 'Signed archival print once a year', 'Quarterly Zoom kōrero'],
      },
    ],
    exhibitions: [
      { year: 2025, title: 'The Sea is Us', venue: 'Objectspace', role: 'Solo' },
      { year: 2023, title: 'Queer Pasifika', venue: 'Te Tuhi', role: 'Group' },
      { year: 2022, title: 'Diaspora Returns', venue: 'The Physics Room', role: 'Group' },
    ],
    lineage: {
      apprenticedTo: 'Edith Amituanai (photographic mentorship, 2017–2019)',
      teaches: [],
      exhibitedWith: ['lesatupuola', 'vehia_t'],
    },
  },
  {
    id: 'artist_003',
    name: 'Akanisi Turaganivalu',
    handle: 'akanisi_t',
    role: 'artist',
    primaryNationId: 'fiji',
    affiliations: ['fiji', 'aotearoa'],
    city: 'Kirikiriroa (Hamilton)',
    bio: `Bula vinaka. I am iTaukei and Rotuman, from the village of Veidogo on the east coast of Viti Levu. My mother is from Rotuma. I have been in Kirikiriroa for twenty-three years. I make masi, magimagi, and pandanus mats, and I run the Saturday masi wānanga at the Waikato Pasifika community centre for young people, most of whom are Fijian-born NZ.`,
    statement: `Masi is not a craft. It is a language. Every stripe, every triangle, every border pattern carries family and village identity. In Fiji, when you see a piece of masi, you can read who made it and where before you read anything else.

I am most interested in teaching young Fijian-NZ-born kids that their grandmothers\' patterns are still their patterns. Some of them were never brought to the village. Some only went once, at Christmas, when they were small. I believe — and I have seen this — that if you put the materials in their hands, the patterns find their own way back.

I spent three years working with youth in Kirikiriroa, Hamilton South, and Te Awamutu, teaching masi. I did not ask the children to make traditional patterns. I asked them to make their patterns — what they saw in their grandmothers\' houses, in their mothers\' kitchens, on the church floor. What came back was remarkable. The traditional vocabulary was all there, but arranged in new grammars.

I received the Pacific Heritage Arts Award in 2022. I used the money to buy a commercial-grade pandanus press and set up a small workshop that the Saturday class now uses. The tool is everyone\'s.

Vinaka vakalevu.`,
    avatarStyle: 'illustrated-silhouette',
    verified: true,
    elderStatus: false,
    elderInGroups: [],
    culturalTheme: 'moana',
    artforms: ['masi', 'magimagi', 'pandanus weaving', 'education'],
    yearsActive: 29,
    followers: 1245,
    following: 201,
    postsCount: 96,
    worksSold: 41,
    supporters: 37,
    awards: [
      {
        id: 'pacific_heritage_2022',
        name: 'Pacific Heritage Arts Award',
        body: 'Creative New Zealand',
        year: 2022,
        amount: 10000,
        citation: 'For sustained excellence in masi and for teaching the next generation.',
      },
    ],
    subscriptionTiers: [
      { name: 'Supporter', priceNzd: 5, perks: ['Monthly class photos'] },
      { name: 'Patron', priceNzd: 15, perks: ['All Supporter perks', 'Annual postcard set'] },
    ],
    exhibitions: [
      { year: 2023, title: 'Masi: Aotearoa', venue: 'Te Whare Tāonga o Waikato', role: 'Solo' },
      { year: 2020, title: 'Pacific Textiles Now', venue: 'Auckland Art Gallery Toi o Tāmaki', role: 'Group' },
    ],
    lineage: {
      apprenticedTo: 'My aunt Vasiti Turaganivalu in Veidogo',
      teaches: ['youth in Waikato'],
      exhibitedWith: ['lesatupuola', 'teremoana_nt'],
    },
  },
];
