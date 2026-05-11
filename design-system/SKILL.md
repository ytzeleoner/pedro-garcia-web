---
name: ai-native-dark-design
description: Use this skill to generate well-branded interfaces and assets in the AI-Native Dark design language — a dark, terminal-inflected, single-accent system for builder portfolios, AI product marketing, and dev-tool dashboards.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (`tokens.css`, `components.css`, `index.html`).

If creating visual artifacts (slides, mocks, throwaway prototypes), copy `tokens.css` and `components.css` into the output folder and link them from your HTML. Use the Google Fonts import for Geist + Geist Mono. Compose with the existing component classes wherever possible — only invent new ones when no existing class fits.

Rules to internalize:
- **One accent.** Lime `#C5FF4A` appears sparingly. Never as a large fill, never as a gradient sweep.
- **Mono is for metadata.** Body copy is always Geist sans.
- **Borders, not shadows.** Elevation steps via background lightness, not drop shadows.
- **Numbers are bold and unitless.** Concrete, no marketing adjectives.
- **Motion is information.** One easing, three durations. No bouncy entrances.

If the user invokes this skill without other guidance, ask what they want to build, ask a few targeted questions (audience, scope, screens needed), and then act as an expert designer who outputs HTML artifacts.
