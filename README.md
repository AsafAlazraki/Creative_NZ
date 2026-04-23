# KavaWorks

A digital community platform for Pacific Island artists across the 14 nations of Te Moana-nui-a-Kiwa — the great ocean of Kiwa. Built from Pacific cultural values outward: vā, mana, inati, tautua, whanaungatanga, kaitiakitanga, fa'aaloalo.

This repository contains a single-file React PWA demo of KavaWorks. It is **local-only**, **demo-only** — no backend, no real payments, no real auth. Every interaction is seeded with plausibly-real Pacific arts ecosystem data.

## Running locally

```bash
./scripts/serve.sh
```

Opens on [http://localhost:8000](http://localhost:8000).

## What's here

- `app/KavaWorks.html` — the entire application in a single file (React via CDN, Babel-in-browser, ~60 components)
- `app/manifest.json` — PWA manifest
- `app/sw.js` — service worker (offline shell cache)
- `docs/image-credits.md` — every image source, credited
- `docs/DEMO_SCRIPT.md` — 5-minute walkthrough
- `docs/LESSONS_LEARNED.md` — patterns to avoid in future iterations

## Cultural foundation

See the build brief for the full cultural foundation. Short version: attribution is permanent, sacred patterns are texture only, elders are designated not self-declared, 95% goes to the artist, and every piece of copy carries its diacritics correctly.

*Tauhi vā. Hold the space. Build with respect.*
