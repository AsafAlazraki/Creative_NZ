# Lessons learned

A living document. Every bug or pattern learned the hard way goes here so the next build doesn't repeat it.

## CSS specificity: dark mode ordering

Cultural theme declarations (`[data-theme-cultural="..."]`) must appear BEFORE dark mode (`[data-theme="dark"]`) in the stylesheet. Dark mode overrides ink + surface tokens; cultural themes override the `--brand` accent. Because both use single-attribute selectors (specificity 0,0,1,0), the later rule wins — so dark mode must come last. Getting this wrong means cultural accents leak into the wrong mode.

## Synchronous theme init

The `<script>` in `<head>` that reads `localStorage` and sets `data-theme` + `data-theme-cultural` on `<html>` must run synchronously, before any CSS or `<body>` content. Otherwise the first paint uses default light mode, and dark-mode users get a visible flash.

## Inline style trap

Never use `element.style.setProperty('--bg', ...)` or `element.style.setProperty('--brand', ...)` for semantic tokens. Inline styles beat `[data-theme]` selectors, silently breaking theme switching. If you need to vary a token for animation or per-component flair, use a class toggle.

## Babel standalone size limit

`@babel/standalone` silently misbehaves when the JSX input exceeds ~400KB. Keep the app JSX lean. If approaching the limit, split into two `<script type="text/babel">` blocks — the first defines components, the second mounts them.

## Prop naming discipline

Pick `nationId` and use it everywhere. Do not mix `userIsland`, `userNation`, `primaryIsland`, `islandId`, `nation`. One name, one meaning, enforced at every prop boundary.

## Pattern sizing

Cultural patterns at viewport scale look busy and disrespectful. Use them as 40-pixel-wide rails, 8-to-12-pixel-tall bands, 240px empty-state illustrations, or subtle card-hover reveals. Never as full-viewport backgrounds. Never above 15% opacity.

## Empty states are not optional

An empty state without a proverb + next-step CTA is worse than no screen at all. "No posts yet" is a failure mode — "Mālō e lelei. Nothing from your island yet — find artists from Tonga →" is the pattern.

## Image credits as first-class

`docs/image-credits.md` is not a nice-to-have. Every image that enters the app enters that file simultaneously.
