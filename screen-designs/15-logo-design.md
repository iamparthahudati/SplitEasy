# SplitEasy — Logo Design Prompt & Specification

## Overview

SplitEasy uses a single brand mark — the **split circle** — expressed in three distinct variants
across the app. Each variant adapts the same core concept to its context: monochrome on the
splash screen, amber-accented on sign-in, and compact blue on the main app header and nav bar.

The mark is currently built entirely from React Native `View` components (no SVG, no image
assets). This document provides the full specification for each variant and a premium AI prompt
for designing a production-quality SVG logo system.

---

## The Core Concept

A circle divided vertically down the center:

- **Left half** — solid filled (represents the person paying, the known quantity)
- **Right half** — outline only (represents the split, the shared portion)
- **Center line** — a precise vertical divider, the moment of splitting

The metaphor is immediate: one thing becoming two. A bill, a cost, a balance — split cleanly
down the middle. The asymmetry between solid and outline creates tension and resolution in a
single mark.

---

## Variant 1 — Splash Screen Mark

**Context:** Full-screen dark indigo splash, centered, animated spring entry

**Dimensions:** 76 × 76px (radius 38)

**Construction:**

```
Layer 1: Full circle outline
  - borderWidth: 1.5px
  - borderColor: rgba(255,255,255,0.88)  — slightly transparent white, not pure
  - backgroundColor: transparent

Layer 2: Left half fill (overflow clip)
  - Clip container: width=38px (half), height=76px, overflow hidden
  - Inner circle: 76×76px, borderRadius 38, backgroundColor #FFFFFF (solid white)
  - Effect: only the left semicircle is visible

Layer 3: Center vertical divider
  - position: absolute, left: 37.5px (center − 0.5)
  - width: 1px, height: 76px
  - backgroundColor: #FFFFFF
```

**Visual result:**

- Left half: solid white filled semicircle
- Right half: white outline arc only (the fill is transparent, showing the dark background)
- Center: 1px white hairline divider
- The right arc stroke is `rgba(255,255,255,0.88)` — slightly dimmed, not harsh

**Color palette:** Monochrome white on `#1A1560` (near-black indigo)

**Wordmark (below mark, 12px gap):**

- Text: `SplitEasy`
- Font: 30px, weight 800 (extrabold)
- Color: `#FFFFFF`
- Letter spacing: -0.5 (tight)

**Tagline (below wordmark, separated by 36×1px divider):**

- Text: `SPLIT BILLS · KEEP FRIENDS`
- Font: 10px, weight 500 (medium)
- Color: `rgba(255,255,255,0.40)`
- Letter spacing: 3.5 (very wide)
- Text transform: uppercase

**Animation:**

- Entry: spring scale `0.72 → 1.0` (tension 52, friction 8) + opacity `0 → 1` (380ms)
- Tagline: opacity `0 → 1` (400ms, 280ms delay after logo completes)

---

## Variant 2 — Sign-In Screen Mark (Full Brand Version)

**Context:** Dark indigo sign-in screen, inline with wordmark, above the auth form

**Construction:** Asymmetric split — left circle is smaller than right, creating a D-shape tension

```
Left semicircle:
  - Radius: 22px → 44px diameter
  - Solid white fill, left half only (overflow clip)
  - Vertically centered within total height

Right arc:
  - Radius: 27px → 54px diameter (larger than left)
  - Orange (#F59E0B) outline only, 2.5px stroke
  - Full circle drawn, then left half masked with background color (#1A1560)
  - Effect: only the right D-arc is visible

Center divider:
  - position: absolute, left: 21px (left radius − 1)
  - width: 2px, height: 44px (left circle height)
  - backgroundColor: #F59E0B (orange — matches right arc)

Total width: 22 + 27 = 49px
Total height: 54px (driven by larger right circle)
```

**Color palette:**

- Left fill: `#FFFFFF` (solid white)
- Right arc stroke: `#F59E0B` (Amber 400)
- Center divider: `#F59E0B` (Amber 400)
- Background mask: `#1A1560` (must match screen background exactly)

**Wordmark (inline, 10px gap from mark):**

```
"Split" — color: #FFFFFF, weight: bold (700)
"Easy"  — color: #F59E0B, weight: bold (700)
Font size: 26px
Letter spacing: -0.3
```

**Visual result:** The mark and wordmark read as a single unit. The amber accent on the right arc
and "Easy" creates a warm, energetic counterpoint to the cool white left half. The asymmetry
(smaller left, larger right) gives the mark a forward-leaning dynamism.

---

## Variant 3 — App Header Mark (Compact, Light Background)

**Context:** White header bar on GroupsHomeScreen and GroupDetail NavBar

**Two sizes:**

- Header (GroupsHomeScreen): 28 × 28px (radius 14)
- NavBar (GroupDetail): 24 × 24px (radius 12)

**Construction (28px version):**

```
Layer 1: Full circle outline
  - borderWidth: 1.5px
  - borderColor: #3B5BDB (logoBlueBrand — a distinct, slightly cooler blue)
  - backgroundColor: transparent

Layer 2: Left half fill (overflow clip)
  - Clip container: width=14px, height=28px, overflow hidden
  - Inner circle: 28×28px, borderRadius 14, backgroundColor #FFFFFF

Layer 3: Center vertical divider
  - position: absolute, left: 13.25px
  - width: 1.5px, height: 28px
  - backgroundColor: #3B5BDB
```

**Color palette:** `#3B5BDB` (logoBlueBrand) on white — a cooler, more corporate blue than the
brand indigo `#6366F1`. This distinction is intentional: the logo mark uses its own dedicated
blue, separate from the primary brand color.

**Wordmark (inline, 8px gap):**

- Text: `SplitEasy`
- Font: 18px, weight bold (700)
- Color: `#3B5BDB` (logoBlueBrand — matches the mark)
- Line height: 22px

**Subtitle (below wordmark):**

- Text: `{N} active groups`
- Font: 12px, weight regular (400)
- Color: `#64748B` (text3)
- Line height: 16px

---

## Logo Usage Rules

| Context               | Variant         | Size    | Colors                      |
| --------------------- | --------------- | ------- | --------------------------- |
| Splash screen         | Monochrome      | 76px    | White on `#1A1560`          |
| Sign-in screen        | Full brand      | 49×54px | White + Amber `#F59E0B`     |
| App header (light bg) | Compact         | 28px    | `#3B5BDB` on white          |
| NavBar (light bg)     | Compact         | 24px    | `#3B5BDB` on white          |
| Dark hero sections    | Compact adapted | 24px    | White on indigo             |
| Tab bar               | —               | —       | Not used (text labels only) |

**Never:**

- Use the amber variant on a light background (the mask technique requires a known dark bg)
- Use the blue compact variant on a dark background (insufficient contrast)
- Stretch or distort the mark asymmetrically
- Change the left/right fill relationship (left is always solid, right is always outline)
- Use a color other than the three defined palettes

---

## AI Prompt — Current Logo Refinement (Wallet + Swoosh Variant)

Use this prompt to iterate on the existing wallet-and-swoosh logo. Apply to Midjourney,
Adobe Firefly, DALL-E, Ideogram, or a human designer brief.

---

### Prompt

> Refine an existing logo for a mobile app called **SplitEasy** — a bill-splitting and
> expense-sharing app for friends, flatmates, and travel groups.
>
> **Current design to improve:** A dark navy wallet icon with sparkle stars (✦), wrapped by
> a teal swoosh arc, with the wordmark "SPLIT EASY" in bold teal below. Keep this overall
> concept — only apply the three specific fixes below.
>
> **Fix 1 — Balance the swoosh:**
> The swoosh currently feels heavier/thicker on the left side. Make it a smooth, even-weight
> elliptical orbit arc that wraps the wallet symmetrically. The arc should taper equally at
> both ends — same weight, same taper — so it reads as a balanced orbit, not a lopsided stroke.
>
> **Fix 2 — Enlarge the wallet icon:**
> The wallet mark inside the circle is too small and loses detail below 64px. Increase the
> wallet to occupy ~65% of the enclosing circle (up from ~45%). The card slot detail inside
> the wallet should be bold enough to read at 48px. Remove any fine inner details that vanish
> at small sizes — keep only: wallet body, card slot rectangle, corner radius.
>
> **Fix 3 — Open up the wordmark letter-spacing:**
> "SPLIT EASY" currently feels slightly tight. Increase letter-spacing to +150 tracking
> (roughly 0.15em). Keep the bold weight and all-caps treatment. The extra air makes the
> wordmark feel more premium and balances the visual weight of the icon above it.
>
> **Keep unchanged:** Color palette (dark navy `#1A2744` + teal `#2E7D82`), sparkle stars
> placement, all-caps bold wordmark, overall compact square composition.
>
> **Deliver:** SVG + 1024×1024px PNG, transparent background version, and dark background version.

---

## AI Prompt — Premium SVG Logo Design (Original Split-Circle Concept)

Use this prompt with any AI image generation or vector design tool (Figma AI, Midjourney,
Adobe Firefly, DALL-E, or a human designer brief).

---

### Prompt

> Design a premium, modern logo for a mobile app called **SplitEasy** — a bill-splitting and
> expense-sharing app for friends, flatmates, and travel groups.
>
> **Brand personality:** Trustworthy, clean, modern, slightly premium. Not a bank — more like
> a smart friend who handles money without making it awkward. The tone is confident and
> approachable, not corporate.
>
> **Core mark concept:** A circle split vertically down the center. The left half is solid
> filled. The right half is an outline arc only. A precise vertical line divides them. This
> represents a single thing (a bill, a cost) being split into two — the fundamental action of
> the app. The mark should feel geometric, precise, and instantly readable at small sizes.
>
> **Deliver three variants:**
>
> **Variant A — Dark / Splash (primary brand mark)**
>
> - Background: deep navy indigo `#1A1560`
> - Mark: 76px circle. Left half solid white fill. Right half white outline stroke (1.5px),
>   slightly transparent (`rgba(255,255,255,0.88)`). Center vertical divider: 1px white.
> - Wordmark below mark (12px gap): "SplitEasy" — single color white, 30px, weight 800,
>   letter-spacing -0.5
> - Thin horizontal rule (36px wide, 1px, `rgba(255,255,255,0.20)`) between wordmark and tagline
> - Tagline below rule (10px gap): "SPLIT BILLS · KEEP FRIENDS" — 10px, weight 500,
>   `rgba(255,255,255,0.40)`, letter-spacing 3.5, uppercase
> - The entire unit (mark + wordmark + rule + tagline) should feel centered, balanced, and
>   quietly confident — like a premium fintech app, not a startup
>
> **Variant B — Dark / Sign-In (full brand, amber accent)**
>
> - Background: deep navy indigo `#1A1560`
> - Mark: asymmetric split circle. Left semicircle: 44px diameter, solid white fill.
>   Right arc: 54px diameter, amber `#F59E0B` outline only (2.5px stroke), D-shape.
>   Center divider: 2px amber `#F59E0B`, height of left circle.
>   The asymmetry (left smaller, right larger) gives the mark forward momentum.
> - Wordmark inline with mark (10px gap): "Split" in white bold + "Easy" in amber `#F59E0B`
>   bold, 26px, letter-spacing -0.3. The two-tone wordmark mirrors the two-tone mark exactly.
> - This variant is used on the sign-in screen — it should feel warmer and more inviting than
>   Variant A, with the amber introducing energy and optimism
>
> **Variant C — Light / App Header (compact, blue)**
>
> - Background: white `#FFFFFF`
> - Mark: 28px circle. Left half solid white fill (invisible against white bg — the fill
>   creates the clipping boundary). Right half outline only. Full circle stroke: 1.5px,
>   color `#3B5BDB` (a slightly cooler, more corporate blue than the primary brand indigo).
>   Center divider: 1.5px, same `#3B5BDB`.
>   Effect: on white, only the right arc and center line are visible — the left half
>   disappears into the background, creating a subtle half-circle mark.
> - Wordmark inline (8px gap): "SplitEasy" — 18px, bold, `#3B5BDB`, letter-spacing 0
> - This is the everyday app mark — compact, professional, used in the header bar
>
> **Technical requirements:**
>
> - Deliver as SVG (scalable, no raster artifacts)
> - Mark must be crisp at 16px (favicon/tab bar) and sharp at 200px (splash/marketing)
> - The split-circle mark should work as a standalone icon (without wordmark) at all sizes
> - Geometric construction: use precise circles, not hand-drawn curves
> - No gradients on the mark itself — flat, geometric, two-color maximum per variant
> - The center divider must be optically centered (not mathematically centered if they differ)
>
> **What to avoid:**
>
> - Rounded or bubbly letterforms — the wordmark should use a clean geometric sans-serif
> - Drop shadows on the mark
> - More than two colors in any single variant
> - Decorative elements, flourishes, or icons inside the circle
> - Any metaphor other than the split circle (no coins, no receipts, no hands)

---

## AI Prompt — App Icon (iOS / Android)

> Design a premium app icon for **SplitEasy**, a bill-splitting mobile app.
>
> **Canvas:** 1024 × 1024px, rounded corners applied by the OS (do not pre-round)
>
> **Background:** Deep navy indigo gradient — top `#1A1560`, bottom `#3730A3`. The gradient
> should be subtle and smooth, not dramatic. Think premium fintech, not gaming.
>
> **Mark:** The SplitEasy split-circle mark, centered, approximately 480px diameter.
>
> - Left half: solid white fill
> - Right half: white outline arc, 6px stroke, `rgba(255,255,255,0.90)`
> - Center divider: 3px white
> - The mark should have a very subtle inner glow — a soft white radial bloom behind it,
>   `rgba(255,255,255,0.06)`, approximately 600px diameter. Not visible as a distinct shape —
>   purely atmospheric warmth.
>
> **No wordmark** — the icon is mark-only. The name appears below the icon on the home screen.
>
> **Mood:** Premium, trustworthy, clean. Comparable to: Revolut, Monzo, Wise — not a
> traditional bank, but clearly handling money. The icon should look equally at home on a
> dark mode home screen and a light mode home screen.
>
> **Deliver:** 1024×1024px PNG + SVG source

---

## AI Prompt — Wordmark Refinement

> Refine the **SplitEasy** wordmark for use across a mobile app.
>
> **Current state:** "SplitEasy" set in the system default sans-serif, weight 800, white,
> letter-spacing -0.5. On sign-in: "Split" white + "Easy" amber `#F59E0B`, weight 700, 26px.
>
> **Goal:** A custom wordmark that feels designed, not defaulted. The letterforms should be
> geometric and modern — similar to the precision of the split-circle mark.
>
> **Requirements:**
>
> - Geometric sans-serif — similar to: Geist, Inter, DM Sans, or Neue Haas Grotesk
> - The split between "Split" and "Easy" should be visually intentional — consider a subtle
>   optical break, a slight weight shift, or a micro-space between the two words
> - The amber "Easy" in the sign-in variant should feel warm but not playful — it is an
>   accent, not a decoration
> - Letter-spacing: -0.3 to -0.5 at display sizes (26–30px), 0 at small sizes (16–18px)
> - The wordmark must be legible at 14px (minimum usage in the app header)
>
> **Deliver:**
>
> - Full wordmark: "SplitEasy" — white on dark, blue on white, two-tone (white+amber) on dark
> - Wordmark + mark lockup: horizontal (mark left, wordmark right) for header use
> - Wordmark alone: for contexts where the mark is not needed
> - All as SVG with outlined text (no font dependency)

---

## Current Implementation Notes

The logo is currently built entirely from React Native `View` primitives — no SVG files, no
image assets. This was intentional for the initial build (zero dependencies, works everywhere)
but has limitations:

| Limitation                                      | Impact                                                     |
| ----------------------------------------------- | ---------------------------------------------------------- |
| Amber variant requires background color masking | Breaks if placed on any background other than `#1A1560`    |
| No sub-pixel rendering control                  | Slight aliasing at small sizes on some Android devices     |
| Cannot be used as a true SVG icon               | Cannot be exported, shared, or used in marketing materials |
| Three separate implementations                  | Any change to the mark requires updating 4 files           |

**Recommended next step:** Replace all three variants with a single SVG file per variant,
imported via `react-native-svg`. The SVG transformer is already configured in `metro.config.js`.
Place files at:

```
src/assets/
  logo-splash.svg       ← Variant A (white monochrome, 76px viewBox)
  logo-signin.svg       ← Variant B (white + amber, asymmetric)
  logo-header.svg       ← Variant C (blue compact, 28px viewBox)
  logo-icon.svg         ← App icon mark only (for marketing use)
```

Each SVG should use `currentColor` for stroke/fill where color needs to be overridden at
runtime, and hardcoded hex values where the color is fixed to the variant.
