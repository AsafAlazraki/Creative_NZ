# KavaWorks — 5-minute demo script

A guided walkthrough of the KavaWorks demo for three audiences: a Creative New Zealand Pacific Arts adviser, a Pacific artist, and a general technical reviewer.

## Setup

1. `npm install`
2. `npm run db:reset` (fresh DB + seed)
3. `npm run dev`
4. Open `http://localhost:3000` in Chrome or Safari.
5. The app loads as `Lesā Tupuola Feʻilo` — a senior Sāmoan siapo maker and the "artist" demo persona.

## 0:00 – 0:30 · The greeting

Open landing. Point out:

- **Time-of-day and island-aware greeting** — "Talofa, Lesā" (Sāmoan, because Lesā's primary island is Sāmoa).
- **Proverb of the day** — rotates daily, cited with language of origin.
- **Moana Ola card** — today's engagement hint (not a chatbot — a surfaced insight).
- **Editorial hero** — one featured artist's quote in serif pull-quote treatment.
- **Your islands strip** — artists from user's affiliated nations (Sāmoa + Aotearoa).

## 0:30 – 1:15 · The feed

Scroll down. Point out:

- **PostCard** — cultural pattern as media placeholder (6–15% opacity). Shown via nation's pattern (siapo in Sāmoan brown, ngatu in Tongan gold, etc.).
- **Original-language caption** with English translation underneath — Sāmoan, Tongan, Fijian, Hawaiian, Tok Pisin, Bislama, etc.
- **Elder mark ✦** on a comment — blessed by Matai Tuiʻi Alefaio.
- **Tapu badge** on Post 27 / 28 — visible here because the viewer is Sāmoan/Māʻohi; audience persona would not see these.
- **Inline modules every 5 posts** — live drop, grant closing soon, elder's platform note.

## 1:15 – 2:00 · Role switching

Top-right corner: "View as Artist" button. Open it.

- Seven roles, each with a description.
- Switch to **Audience** (`Reuben Tamatoa`). Feed changes to show "Your subscriptions — 12 artists you support" card at top.
- Switch to **Adviser** (`Semisi Falepapalangi`). Feed changes to coral "Adviser dashboard" with caseload digest, grant deadlines for caseload.
- Switch to **Organisation** (`Māngere Arts Centre`). Feed changes to ocean "Organisation dashboard" with upcoming events, roster.
- Switch to **Admin** (`Kava Team`). Feed changes to coral "Admin view" banner with platform stats.
- Switch back to **Artist**.

Switch also cultural theme (top right, colour dot). Cycle through: Ula Fala (red), Moana (teal), Tapa (brown), Niu (jade), Koula (gold). Cultural accents update across the whole app.

Toggle dark mode. Confirm cultural theme still applies in dark mode (CSS specificity trap — noted in `docs/LESSONS_LEARNED.md`).

## 2:00 – 2:45 · The Profile — centrepiece

Click the user chip bottom-left → opens Lesā's profile.

- **Editorial header** — name in 72px display, handle, nation badge, verified + elder badges, cultural pattern rail on left.
- **Stats bar** — 5 mono-tabular numeral counts.
- **Artist statement** — 400-word first-person serif. Pull-quote at the midpoint.
- **Lineage sentence** — "Apprenticed to my grandmother Tupu in Leulumoega. Teaches @folatalagi …"
- **Works grid** — 6+ masonry cards with Inati 95% badge on each.
- **Subscription tiers** — 3 cards (Supporter / Patron / Inati Circle) with prices and perks.
- **Exhibitions sidebar** — year-by-year, venue, role.
- **Awards sidebar** — gold ManaBadge with citation on hover.

Switch role to Adviser, open Lesā's profile again. "Adviser actions" box appears with "Endorse application", "Add to caseload", "Recommend grant" buttons.

## 2:45 – 3:30 · Marketplace + Drops

Navigate to Marketplace.

- Masonry grid of 20 works.
- Each card: cultural pattern background, artform + materials, price in mono tabular, Inati 95% badge.
- Filter chips by nation (14 nations).

Click into a work (e.g. `work_001` — Moana Whakapapa I).

- Large cultural-pattern hero.
- Artist mini-card.
- Price + 95% split explainer.
- **BuySheet**. Click "Claim this piece". Modal shows:
  - Transparent split: $4,800 price = $4,560 to Lesā (95%) + $240 platform (5%).
  - "This is a demo — no payment will be taken."
  - Click "Complete purchase". Confirmation: "Fa'afetai. Your support goes to Lesā Tupuola Feʻilo — $4,560 of this payment is theirs."

Navigate to `/drops`.

- Live drop: Folasāga's cedar tumau carvings. Inati 24-hour window. Live countdown in JetBrains Mono (d h:m:s).
- Story framing: inati explainer in serif italic.
- Permanent AttributionBlock at bottom.

## 3:30 – 4:15 · Grants

Navigate to `/grants`.

- **"What do I qualify for?" wizard** — click it. Four steps:
  1. What are you applying for? (Project / Org funding / Residency / Development)
  2. Who are you? (Individual / Collective / Registered org)
  3. Cultural affiliation? (Pacific / Ngā Toi / General / Multiple)
  4. Budget range? ($10k / $10–50k / $50–125k / $125–500k / $500k+)
- Filters grants in real-time.
- Returns ranked matches with links to detail pages.

Click `grant_aog_pacific_t1` (Arts Organisations & Groups Fund — Pacific pool, Tier 1).

- Header shows deadline + amount + pool chip.
- "In plain English" section — 3 paragraphs of editorial serif rewriting the official criteria in 5th-grade English.
- Eligibility (bullets).
- How to apply (numbered steps).
- "Apply on Creative New Zealand →" button links to the real CNZ portal.
- Similar grants sidebar.

## 4:15 – 4:45 · Groups + Kete

Navigate to `/groups`.

- 6 groups, each with elder designation visible.
- Click `group_tongan_weavers`. Elder card at top — Matai Tuiʻi Alefaio, gold ✦. Charter/Kawa statement in 200-word serif. Recent threads list.

Navigate to `/kete`.

- 6 articles by category (Making a living, Navigating grants, Cultural protocols, Shipping).
- Click "Pricing your work with mana" — 11-minute article by Akanisi Turaganivalu.
- Pull-quotes at 1/5, 1/2, 4/5 of article length.
- Sidebar with further reading, related articles.

## 4:45 – 5:00 · Wrap

Point out:

- **All 22 routes** render cleanly across 5 role personas × 5 cultural themes × light/dark mode.
- **100% correct diacritics** everywhere (Sāmoa, Hawaiʻi, tā moko, kōwhaiwhai, tīvaevae).
- **Real Creative New Zealand grants** with real deadlines and real URLs.
- **95% to artist** visible on every sale surface. Hardcoded, not configurable.
- **Elder-designated groups** enforced by data model.
- **Tapu toggle** on posts filters by nation.
- **Zero stereotype imagery** — no palm trees, no grass skirts, no tiki.
- **Cultural patterns** as 6–15% opacity textures only, never as logos.
- **18 screens × 7 roles = 126 state combinations** each with meaningful filled/empty/loading/error states.

## For Oren

`docs/LESSONS_LEARNED.md` documents the CSS specificity trap (dark mode after cultural themes), the Babel size limit (we're on Next.js now so this is moot, but noted), and the prop-naming discipline.

`docs/image-credits.md` documents sourcing strategy: no AI imagery for Pacific cultural content, placeholder cards until real photography is credited in.
