# Changelog

## 0.1.0 — Initial build (2026-04-23)

Fresh Next.js 15 + TypeScript + Tailwind v4 + Drizzle + better-sqlite3 build of KavaWorks per `KAVAWORKS_BUILD_BRIEF.md`. All 22 routes render across 7 role personas × 5 cultural themes × light/dark mode.



Fresh build from the KavaWorks brief. Single-file React PWA at `app/KavaWorks.html`.

### Added
- Repo skeleton: `README.md`, `app/`, `docs/`, `scripts/serve.sh`
- PWA shell: `manifest.json`, `sw.js`
- Design system: CSS tokens, 5 cultural themes, dark mode, 14 nation patterns, 5 theme patterns, synchronous theme init
- Knowledge bases: `window.TAUHI_VA_KB` (cultural), `window.MOANA_OLA_KB` (engagement)
- Seed data: 14 nations, 19 artist profiles, 28 posts, 16 shorts, 20 market items, 10 grants, 8 awards, 6 groups, 6 events, 8 orgs, 6 articles, 4 drops, 7 personas
- Components: ~60 components spanning navigation, feed, profile, marketplace, drops, grants, groups, kete, admin
- Screens: 18 public screens + welcome + onboarding + admin view
- Role system: 7 roles with differential UI (artist, audience, collector, org, adviser, elder, admin)
- Accessibility: VoiceOver pass, reduced-motion + reduced-transparency handling, AA contrast, 44px tap targets
- Cultural polish: correct diacritics throughout, 14 nation greetings, proverb library, permanent attribution block
