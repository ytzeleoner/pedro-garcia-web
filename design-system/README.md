# AI-Native Dark — Design System

A dark, terminal-inflected, single-accent design language for builder portfolios, AI-product marketing surfaces, and dev-tool dashboards. Pulled out of `pedro-garcia.dev` (v3-ai-native).

## Personality

- **Builder, not marketer.** Copy is concrete: problem → decision → number. No filler.
- **Engineered, not decorated.** Mono labels, version tags (`v 4.2`), `~/path` paths, `→` arrows, `/01` section indices. Everything feels like a CLI artifact made beautiful.
- **One accent, used like a highlighter.** Lime (`#C5FF4A`) appears in maybe 6–8% of the surface — never as fill, always to direct the eye.
- **Live, but quiet.** Pinging dot, shimmer-on-scroll, typewriter intros, regenerating words. Motion is information, not decoration.

## Files

| File | What's in it |
|---|---|
| `tokens.css` | All design tokens: colors, type scale, spacing, radii, motion, layout |
| `components.css` | Every component class extracted from the source design |
| `animations.js` | Reusable motion engine: typewriters, terminal stream, table type+collapse, shimmer-on-scroll, count-up, scroll progress |
| `index.html` | Visual showcase — every token and component on one scrollable page |
| `SKILL.md` | Agent skill manifest (Claude Code compatible) |

## Quick start

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="components.css" />
<script src="animations.js" defer></script>
```

Then compose using the component classes documented in `index.html`.

## Animations

`animations.js` exposes a global `anim` object with everything sequenced as `async`/`await`. The signature motion from the source design:

```js
// Hero intro (full sequence)
const hero = anim.prepHero('.hero h1[data-typing]', '.hero .lede[data-typing]');
const table = anim.typeAndCollapseTable({
  tableSelector: '.info-card dl > div',
  cardSelector:  '.info-card',
  keepKeys:      ['rol','foco','estado'],
});
const term = anim.terminalStream({
  overlaySelector:'#gen', promptSelector:'#genPrompt',
  outSelector:'#genOut', cursorSelector:'#genCursor', skipSelector:'#genSkip',
  storageKey: 'intro-played',
  prompt: 'generate experience.profile("you") --stream',
  lines:  ['→ line one', '→ line two', '→ render: ok ✓'],
});
term.onSkip(() => { hero.skip(); table.revealInstant(); });

(async () => {
  const played = await term.playIfFirstVisit();
  if (played) {
    await table.type();
    await table.collapse(() => anim.fadeIn('.hero-photo', 280));
    await hero.type();
  } else {
    table.revealInstant();
    await hero.type();
  }
})();

// Sectional flourishes
anim.observeShimmer('.shim');
anim.scrollProgress('.scroll-bar');
anim.countUp('[data-countto]');
```

| Function | Purpose |
|---|---|
| `anim.typeText(el, text, speed)` | Plain-text typewriter |
| `anim.typeHTML(el, html, speed)` | HTML-aware typewriter (tags atomic, cursor follows caret) |
| `anim.prepHero(h1Sel, ledeSel)` | Captures hero HTML, reserves height, returns `.type()` / `.skip()` |
| `anim.terminalStream(cfg)` | Overlay terminal with prompt + streamed lines, sessionStorage-gated |
| `anim.typeAndCollapseTable(cfg)` | Types a `dl` row-by-row, then collapses to selected keys |
| `anim.fadeIn(sel, delay)` | Adds `.shown` after delay (pair with CSS opacity+transform transition) |
| `anim.observeShimmer(sel)` | Triggers `.shim.active` on scroll into view; cycles `data-alts` if present |
| `anim.scrollProgress(sel)` | Hooks a top scroll-progress bar |
| `anim.countUp(sel)` | Animates numbers from 0 to `data-countto` with easing |

## Visual foundations

### Color
- **Background:** layered `#0A0A0A → #0F0F0F → #141414 → #171717`. Cards are *just* lighter than the page.
- **Borders:** `#222` baseline, `#2a2a2a` for slightly stronger separators. **Never** white-with-opacity for primary borders — it tints under blur.
- **Text:** 3 levels (`#FAFAFA`, `#A1A1AA`, `#71717A`). Mono labels always sit on `text-3`.
- **Accent:** **single** lime `#C5FF4A`. Allowed uses:
  - Primary button fill (text becomes `var(--bg)`)
  - Numbered prefixes (`/01`, `/02`)
  - `live-dot` pinging signal
  - `compact-tag`, `pill`, `badge.activo` (always with `--accent-soft` background)
  - Section title highlighted word
  - Inline shimmer accent on regenerating words
- **Never** use the accent as a large background fill, gradient sweep, or to color body copy.

### Type
- **Sans:** Geist (300/400/500/600/700). Hero and section titles use 500 with tight tracking; body uses 400.
- **Mono:** Geist Mono. Used for *metadata*, never for body. Labels, statuses, paths, dl/dt/dd in info-card, timeline `when`, footer column headers, badges.
- **Scale jumps are large.** `clamp(56px, 8vw, 108px)` for hero, 36px for section, 14px for body. No medium-sized titles.
- **Letter-spacing tightens with size.** Hero `-.04em`, section `-.025em`, tile `-.015em`, body 0.

### Spacing & layout
- 1280px wrap, 32px gutters (20px mobile). Section padding is 88px desktop, 56px mobile.
- Gaps are *small* between dense cards (12px in bento, 8px in stack grid) — the dark surface does the visual separation.
- Borders, not shadows. Elevation is almost never simulated — instead, surfaces step up in lightness.

### Motion
- Single easing: `cubic-bezier(.4, 0, .2, 1)`. Three durations: `.18s` fast, `.35s` base, `.6s` slow.
- **Hover states are subtle.** Border darkens to `text-3`, background lifts one step. Never scale-up, never glow.
- **Typewriter on first load only** (sessionStorage gate). Returning visitors see content instantly.
- **Live dot ping**: 2.4s loop, the only continuously-animating element on idle.
- **Shimmer**: a one-shot left→right gradient across a word on first scroll into view. Repeats on re-entry.

### Iconography
- **None by default.** This system deliberately ships without an icon set — text labels with mono prefixes (`/01`, `→`, `←`, `↓`) and the pinging dot do the work.
- If icons are needed, use a thin-stroke set (Lucide, 1.5px). Never emoji, never multicolor.

## Tone & copy

- **Spanish-first** in source (`Pedro`, `Trabajo en...`, `Pregúntame algo`), but the system is language-agnostic.
- **Casing:** sentence case for sentences, lowercase for mono labels and nav items.
- **Numbers are bold and unitless.** "40k+ personas" not "40,000 employees." "+72%" not "Increased by 72%."
- **No marketing adjectives.** "Sistemas que escalan" not "Powerful enterprise-grade solutions." 
- **Acronyms are fine** if they're real (CET, AI, IA, BI). Never invent them.

## Component inventory

| Class | Purpose |
|---|---|
| `.live-dot` | Pinging signal — status badges, live state |
| `.seclabel` | Eyebrow row with `/NN` index + meta |
| `.btn`, `.btn.primary` | Buttons |
| `.kbd` | Keyboard chip (⌘K) |
| `.badge.activo`, `.badge.completado` | Project status tags |
| `.pill` | Tiny status, inline in tables |
| `nav.top` | Sticky blurred nav with brand mark |
| `.statusbar` | Mono ribbon under nav |
| `.info-card` | dl-based key/value card with mono head |
| `.tile`, `.tile.feature` | Bento project cards |
| `.metric` | Big-number stat block |
| `.timeline`, `.tl-row` | Three-column timeline rows |
| `.ask-card` | Prompt-style input card (used for Claude integration) |
| `.stack-cell` | Compact tool grid cell |
| `.shim` | Word that shimmers on scroll-in |
| `.type-cursor` | Blinking cursor for typewriter intros |
| `.term-window` | Terminal-styled overlay window |

## Source

- Original implementation: `../v3-ai-native.html` (root of project)
- Inspired by: developer-tool dashboards (Vercel, Linear, Plain) and CLI aesthetics. Lime accent is the differentiator.

## Caveats

- **No icon set shipped.** Add Lucide via CDN if you need icons.
- **No dark/light toggle.** This is a dark-only system — light variant would require re-keying every neutral.
- **No form components beyond the ask-card input.** Add `<input>`, `<select>`, `<textarea>` patterns if extending to a real form-heavy product.
- **Imagery is sparse by design.** The hero portrait is the only image surface; add image conventions (aspect, treatment) if extending.
