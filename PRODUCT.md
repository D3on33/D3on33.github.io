# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

In-house hiring managers — Recruiters and Design Leads at tech and fintech companies — evaluating Darshan for a Senior UX or Product Design role. They arrive with a candidate list, limited time, and a need to quickly assess depth of thinking, domain fit, and visual craft.

## Product Purpose

A portfolio that converts a hiring-manager visit into a confident "advance to interview" decision. Success means the visitor leaves with a clear picture of Darshan's process, outcomes, and domain expertise — not just a gallery of screenshots.

## Positioning

Research-led design practice with outcome measurement. Every case study is anchored to user research and measurable business results, not aesthetic execution alone. A competing portfolio cannot copy the specific evidence of impact from NDA-protected enterprise engagements.

## Operating Context

- Visitors arrive via LinkedIn profile link, recruiter email, or referral
- Case studies require a password (NDA-protected client work at US Bank, Verizon, LPL Financial, Citi)
- Resume is downloadable from every page
- Site is a static GitHub Pages deployment; no CMS or build step
- Domain: `d3on33.github.io` (live); `darshanmunkur.com` (pending cutover)

## Capabilities and Constraints

- Password gate uses SHA-256 via SubtleCrypto; session-storage based unlock
- Four protected case studies: US Bank, Verizon, LPL Financial, Citi
- Light/dark theme with manual toggle + OS preference detection; persisted in localStorage
- Static HTML + CSS only — no framework, no bundler
- Password-gated NDA case studies must remain gated; never expose protected content publicly

## Brand Commitments

- Name: Darshan Munkur
- Title: Senior UX Designer
- Accent color system: Royal Amethyst `#5D3FD3` (light) / Luminous Lavender `#A899FF` (dark) — Purple Identity token system
- Type stack: Instrument Serif (display), DM Sans (body), DM Mono (utility/labels)
- Canvas: `#FBF9F4` light / `#121016` dark
- Voice: precise, confident, minimal — no superlatives or generic design-speak

## Evidence on Hand

- 4 password-protected case studies (enterprise B2B: banking, telecom, wealth management)
- Resume PDF: `resume.pdf` (Darshan_Munkur_Resume)
- Real photos: headshot (`photo-about-bio.jpg`), 3 personal/OTC photos (`photo-otc-01/02/03.jpg`)
- Hero illustration: `photo-hero.png` (transparent PNG, inverts in dark mode)
- OG social image: `og-image.svg` (needs raster export as `og-image.jpg` at 1200×630)
- 5+ years experience, Fortune 500 clients, MS in Human-Computer Interaction

## Product Principles

1. **Depth over breadth** — fewer, deeper case studies beat a gallery of thumbnails
2. **Evidence, not assertion** — every claim about impact should trace to a real outcome
3. **Access earns trust** — the password gate signals professionalism, not secrecy
4. **Performance is craft** — a slow or broken site contradicts the UX story
5. **Consistency across surfaces** — theme, type, spacing, and tone are the same on every page

## Accessibility & Inclusion

WCAG 2.1 AA target; contrast ratios documented in CSS token comments. Keyboard navigation verified. `prefers-reduced-motion` respected for animations.
