# SplitEasy — Premium Screen Design Specifications

# Version 1.0 · April 2026

# This document is the single source of truth for every screen design.

# Hand this to any designer or AI image generator to produce pixel-perfect screens.

---

## HOW TO READ THIS DOCUMENT

Each screen spec contains:

- **Mood** — the emotional intent of the screen
- **Layout** — exact composition, top to bottom
- **Typography** — font, size, weight, color, spacing for every text element
- **Colors** — every fill, border, shadow, opacity
- **Interactions** — what states exist (pressed, empty, error, success)
- **Designer Notes** — the "why" behind every decision

---

## DESIGN SYSTEM FOUNDATION

### Canvas

- Width: 390px · Height: 844px (iPhone 14 standard)
- Safe area top: 59px (status bar 44px + 15px breathing room)
- Safe area bottom: 34px (home indicator)
- All designs assume light mode unless specified as Dark World

### The Two Worlds

Every screen belongs to one of two visual worlds:

**Dark World** — Splash, Sign In, Paywall, Confetti

> Deep indigo backgrounds. Glass-effect cards. Gold accents. White typography.
> Feels cinematic, premium, emotional. Like opening a luxury product.

**Light World** — Home, Balances, Activity, Settings, Group screens

> Crisp white cards on slate-50 background. Real shadows. Brand color only on actions.
> Feels fast, trustworthy, professional. Like a well-designed banking app.

---

### Logo Mark — The Split Circle

**Concept:** A perfect circle divided by a clean vertical line down the center.
Left half: solid filled with brand indigo (#6366F1).
Right half: outline only, same indigo, transparent fill.
The line between them is the "split" — the core product metaphor.

**Construction:**

- Outer circle: diameter varies by context (see per-screen specs)
- Left semicircle: filled #6366F1
- Right semicircle: stroke only, 2px, #6366F1, no fill
- Center dividing line: 1.5px, #6366F1, full height of circle
- The two halves together read as one whole — division without separation

**Wordmark:** "SplitEasy" — Inter 800, letter-spacing -0.5px

- On dark backgrounds: white
- On light backgrounds: #6366F1
- Always sits 12px to the right of the logo mark when inline
- Always sits 10px below the logo mark when stacked

**Sizes:**

- App icon: 512px circle
- Splash screen: 72px circle
- Header inline: 28px circle
- Favicon: 16px circle

---

### Color System

**Brand**

- Indigo 500 `#6366F1` — primary actions, active states, logo
- Indigo 700 `#4338CA` — pressed states, gradient end
- Indigo 50 `#EEF2FF` — light tinted backgrounds, selected states
- Indigo 200 `#C7D2FE` — subtle accents on dark backgrounds

**Dark World Backgrounds**

- Deep Indigo `#1E1B4B` — darkest background, top of gradients
- Indigo 900 `#312E81` — mid gradient layer
- Indigo 700 `#4338CA` — bottom of gradients, lighter end
- Violet 700 `#6D28D9` — slide 3 gradient end

**Money Language — SACRED, never change**

- Emerald 600 `#059669` — money owed TO you (positive)
- Emerald 100 `#D1FAE5` — positive balance card background
- Emerald 900 `#065F46` — positive text on green background
- Red 600 `#DC2626` — money you OWE (negative)
- Red 100 `#FEE2E2` — negative balance card background
- Slate 400 `#94A3B8` — settled / zero balance

**Premium Gold**

- Amber 500 `#F59E0B` — premium badges, best value, gold checkmarks
- Amber 100 `#FEF3C7` — gold tinted backgrounds
- Amber 900 `#92400E` — text on gold backgrounds

**Surfaces (Light World)**

- White `#FFFFFF` — cards, inputs, buttons
- Slate 50 `#F8FAFC` — app background, recessed areas
- Slate 100 `#F1F5F9` — dividers, separators
- Slate 200 `#E2E8F0` — input borders, card borders

**Text**

- Slate 900 `#0F172A` — primary text, headings
- Slate 700 `#334155` — secondary text
- Slate 500 `#64748B` — tertiary text, captions, meta
- Slate 400 `#94A3B8` — placeholders, hints, disabled

**Glass (Dark World cards)**

- Glass fill: `rgba(255, 255, 255, 0.10)`
- Glass border: `rgba(255, 255, 255, 0.18)`
- Glass pressed: `rgba(255, 255, 255, 0.15)`

---

### Typography Scale

All body text uses Inter. Display moments use Inter with tight tracking.

| Role       | Size | Weight | Tracking | Usage                         |
| ---------- | ---- | ------ | -------- | ----------------------------- |
| Display    | 48px | 800    | -2px     | Hero amounts, splash wordmark |
| H1         | 34px | 800    | -1px     | Splash wordmark               |
| H2         | 28px | 700    | -0.5px   | Screen titles, modal headings |
| H3         | 22px | 600    | 0        | Section headings              |
| H4         | 18px | 600    | 0        | Card titles, names            |
| Body Large | 16px | 400    | 0        | Subtitles, descriptions       |
| Body       | 14px | 400    | 0        | Standard content              |
| Body Small | 13px | 400    | 0        | Meta, secondary info          |
| Label      | 12px | 500    | 0        | Labels, captions              |
| Micro      | 11px | 500    | 0        | Badges, chips, timestamps     |
| Caps       | 10px | 600    | +3px     | Section headers uppercase     |
| Nano       | 10px | 400    | +0.5px   | Version numbers, legal        |

---

### Elevation System

Cards are not flat. Every surface has a shadow that communicates its height.

| Level | Shadow                                                           | Usage                        |
| ----- | ---------------------------------------------------------------- | ---------------------------- |
| 0     | none                                                             | App background               |
| 1     | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`         | Standard cards, rows         |
| 2     | `0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`        | Hero cards, banners          |
| 3     | `0 8px 32px rgba(99,102,241,0.20), 0 4px 8px rgba(0,0,0,0.06)`   | FAB, floating elements       |
| 4     | `0 12px 40px rgba(99,102,241,0.35), 0 6px 12px rgba(0,0,0,0.08)` | Paywall CTA, primary actions |

---

### Border Radius System

| Token    | Value | Usage                       |
| -------- | ----- | --------------------------- |
| Screen   | 44px  | iPhone frame corners        |
| Sheet    | 28px  | Bottom sheets, modals       |
| Card     | 20px  | Hero cards, profile cards   |
| Standard | 16px  | Regular cards, sections     |
| Input    | 14px  | Text inputs, buttons        |
| Chip     | 10px  | Category icons, small cards |
| Badge    | 8px   | PRO badge, small elements   |
| Pill     | 999px | Tags, filter pills, avatars |

---

### Component Specs

**Primary Button**

- Height: 56px · Border radius: 14px
- Background: #6366F1 · Text: white Inter 600 16px
- Shadow: Level 4 with brand color
- Pressed: scale 0.98, background #4338CA

**Secondary Button**

- Height: 56px · Border radius: 14px
- Background: transparent · Border: 1.5px #6366F1
- Text: #6366F1 Inter 600 16px

**Ghost Button**

- Height: 44px · Border radius: 14px
- Background: transparent · Border: 1px rgba(255,255,255,0.15) on dark, 1px #E2E8F0 on light
- Text: rgba(255,255,255,0.5) on dark, #64748B on light, Inter 500 14px

**Destructive Button**

- Height: 56px · Border radius: 14px
- Background: #FEE2E2 · Text: #DC2626 Inter 600 16px

**Input Field**

- Height: 56px · Border radius: 14px
- Background: #F8FAFC · Border: 1px #E2E8F0
- Focused border: 2px #6366F1
- Text: #0F172A Inter 400 16px
- Placeholder: #94A3B8

**Dark Input (Dark World)**

- Height: 56px · Border radius: 14px
- Background: rgba(255,255,255,0.12) · Border: 1px rgba(255,255,255,0.20)
- Text: white · Placeholder: rgba(255,255,255,0.40)

**Filter Pill**

- Height: 32px · Border radius: 999px · Padding: 0 14px
- Active: #6366F1 bg, white Inter 600 13px
- Inactive: white bg, 1px #E2E8F0 border, #64748B Inter 500 13px

**Avatar**

- Shape: circle · Sizes: 32px / 40px / 44px / 56px / 64px
- Background: deterministic color from palette based on name hash
- Text: white Inter 700, size = avatar size × 0.35
- Palette: #6366F1, #059669, #D97706, #DC2626, #7C3AED, #0891B2, #BE185D, #16A34A

**Balance Chip**

- Height: 24px · Border radius: 999px · Padding: 0 10px
- Positive: #D1FAE5 bg, #059669 text Inter 600 12px
- Negative: #FEE2E2 bg, #DC2626 text Inter 600 12px
- Zero: #F1F5F9 bg, #94A3B8 text Inter 600 12px

---

## STATUS BAR (all screens)

Position: top 0, full width, height 44px
Background: transparent (inherits screen background) with subtle overlay where needed

Left side: "9:41" — Inter 600 15px, color matches screen (white on dark, #0F172A on light)
Right side (left to right): signal bars, wifi icon, battery icon
Dynamic Island: centered pill, 126×37px, #000000, top 12px — present on all screens

---

---

# SCREEN DESIGNS

---

## SCREEN 01 — Splash Screen

**World:** Dark · **Duration:** 1.8 seconds on screen

### Mood

The very first thing a user sees. This is the brand's handshake.
It should feel like the opening frame of a premium app — confident, calm, inevitable.
Not flashy. Not busy. Just the logo, the name, and a quiet promise.
Think: Apple's boot screen. Calm authority.

### Background

Full bleed gradient, top to bottom:

- Top (0% to 40%): #1E1B4B — very dark indigo, almost black-blue
- Middle (40% to 70%): #312E81 — deep indigo
- Bottom (70% to 100%): #4338CA — indigo 700, slightly lighter

The gradient is smooth, not stepped. No hard edges.
The overall feel is deep space — dark, vast, premium.

### Composition

Everything is centered both horizontally and vertically.
The entire logo + wordmark + tagline block sits at the exact vertical center of the screen.

**Logo Mark**

- The Split Circle logo, 72px diameter
- Left half: solid white (not indigo — on dark bg the logo inverts to white)
- Right half: white outline only, 2px stroke, no fill
- Center dividing line: 1.5px white, full height
- The circle has a very subtle glow behind it: 120px circle, rgba(255,255,255,0.06), no border
- This glow makes the logo feel like it's emitting light, not just sitting there

**Wordmark**

- "SplitEasy" — Inter 800, 34px, white, letter-spacing -1px
- Sits 16px below the logo mark
- No shadow, no glow — clean and confident

**Divider**

- A thin horizontal line: 40px wide, 1.5px tall
- Color: rgba(255,255,255,0.25)
- Sits 14px below the wordmark
- This is a design breath — a pause between the name and the tagline

**Tagline**

- "SPLIT BILLS · KEEP FRIENDS"
- Inter 600, 10px, rgba(255,255,255,0.55), letter-spacing 3px, uppercase
- Sits 12px below the divider
- The wide letter-spacing makes it feel editorial, like a magazine masthead

### Bottom

- "v1.0.0" — Inter 400, 10px, rgba(255,255,255,0.25), letter-spacing 0.5px
- Positioned 40px from the bottom of the screen, centered
- Barely visible — it's there for the detail-oriented user, not for everyone

### What is NOT on this screen

No buttons. No navigation. No illustrations. No animations described here (those are in code).
The restraint IS the design. Every element removed makes the remaining elements stronger.

### Designer Notes

> The logo glow is critical. Without it the logo feels pasted on. With it, the logo feels like it belongs to the dark background — like it's part of the atmosphere, not on top of it.
>
> The gradient must be smooth. If it looks like two colors meeting, it's wrong. It should look like one color breathing.
>
> The tagline letter-spacing at 3px is intentional. At 10px font size, tight tracking looks cramped. Wide tracking at small sizes reads as premium — it's how luxury brands set type.

---

## SCREEN 02 — Welcome Carousel · Slide 1 of 3

**World:** Dark · **Slide theme:** Speed and simplicity

### Mood

The first slide sells the core promise: splitting is fast.
The illustration should make the user feel the speed — three people, one bill, done.
Not a tutorial. Not a feature list. A feeling.

### Background

Gradient: #1E1B4B top → #4338CA bottom
Same gradient language as the splash screen — this is intentional continuity.
The user is still in the "welcome" emotional space.

### Skip Button

- Top right corner, 20px from right edge, 72px from top
- "Skip" — Inter 500, 14px, rgba(255,255,255,0.55)
- No border, no background — just text
- Tapping it goes directly to Sign In

### Illustration Area

Centered horizontally, top third of the screen (roughly y=160 to y=380).

**Glow backdrop**

- Circle: 200px diameter, rgba(255,255,255,0.07), centered behind the illustration
- This creates a soft halo effect — the illustration glows from within

**Three Avatar Circles (the split illustration)**
The three avatars represent three people splitting a bill.
They overlap slightly — this overlap is the visual metaphor for "together."

- Left avatar: 52px circle, #818CF8 (indigo 400), white border 2px at 25% opacity
  - Initial "A" — Inter 700, 18px, white, centered
  - Positioned slightly left of center
- Center avatar: 52px circle, #6366F1 (brand indigo), white border 2px at 25% opacity
  - Initial "B" — Inter 700, 18px, white, centered
  - Centered, sits 4px higher than the others (slightly elevated — it's the "payer")
  - Has an additional subtle ring: 60px circle, rgba(255,255,255,0.10), behind it
- Right avatar: 52px circle, #4F46E5 (indigo 600), white border 2px at 25% opacity
  - Initial "C" — Inter 700, 18px, white, centered
  - Positioned slightly right of center
- Overlap: each avatar overlaps the next by 14px (left edge of next avatar = right edge of previous - 14px)

**Divider line**

- Horizontal line: 160px wide, 1.5px, rgba(255,255,255,0.25)
- Sits 20px below the bottom of the avatars
- Represents the "split" — the bill being divided

**Amount labels**

- Three amounts sit below the divider, aligned under each avatar
- "$12" under A, "$12" under B, "$11" under C (total $35 — realistic, not round)
- Inter 600, 14px, white
- The uneven split ($11 vs $12) is intentional — it shows the app handles real math

### Text Block

Sits below the illustration, 40px gap.

**Title**

- "Split any bill in 3 taps"
- Inter 700, 28px, white, line-height 36px, text-align center
- This is the promise. It must be the biggest text on the screen.

**Subtitle**

- "No more mental math. No more awkward conversations. Just tap, split, done."
- Inter 400, 16px, rgba(255,255,255,0.72), line-height 26px, text-align center
- Max width: 310px (centered, with 40px side padding)
- Three sentences. Three pain points eliminated. The period after "done." is intentional — it's final.

### Bottom Controls

Fixed to the bottom of the screen.

**Page Dots**

- 3 dots, centered, 124px from bottom
- Active dot (slide 1): 24px wide × 6px tall, border-radius 999px, white
- Inactive dots: 6px × 6px circle, rgba(255,255,255,0.32)
- Gap between dots: 8px
- The active dot is a pill shape, not a circle — this is a premium detail

**Next Button**

- Full width minus 40px total (20px each side)
- Height: 56px, border-radius: 16px
- Background: white
- Text: "Next" — Inter 600, 16px, #6366F1
- Positioned 48px from bottom of screen
- No shadow on this button — the white on dark is contrast enough

### Designer Notes

> The center avatar being slightly elevated is a subtle hierarchy cue — it suggests the person who paid. Most users won't consciously notice it, but it makes the illustration feel more dynamic and less like three identical circles in a row.
>
> The amounts $12/$12/$11 instead of $10/$10/$10 is a trust signal. Round numbers feel fake. Uneven numbers feel real. Real feels trustworthy.
>
> The pill-shaped active dot is a signature detail. It's used consistently across all three slides. When users swipe, they see the pill "travel" from position to position — it's a micro-animation that feels satisfying.

---

## SCREEN 03 — Welcome Carousel · Slide 2 of 3

**World:** Dark · **Slide theme:** Clarity and fairness

### Mood

This slide answers the question every user has: "But how do I know who owes what?"
The balance scale illustration is the answer — visual, immediate, no explanation needed.
The mood is: reassuring. You are always in control.

### Background

Gradient: #064E3B top → #059669 bottom
This is the only slide with a green background — it's intentional.
Green = money = balances. The color itself communicates the content.
The shift from indigo (slide 1) to green (slide 2) to violet (slide 3) creates a visual journey.

### Illustration — Balance Scale

Centered, same position as slide 1 illustration.

**Fulcrum pole**

- Vertical rectangle: 4px wide, 80px tall, rgba(255,255,255,0.65), border-radius 2px
- Sits at the center bottom of the illustration area
- This is the anchor — everything hangs from it

**Horizontal beam**

- Rectangle: 160px wide, 4px tall, rgba(255,255,255,0.85), border-radius 2px
- Sits at the top of the pole
- The beam is slightly tilted — left side 6px lower than right side
- This tilt shows imbalance — someone owes more than the other
- The tilt is subtle (not dramatic) — it's a hint, not a statement

**Left side (positive — owed to you)**

- Wire: 1.5px wide, 32px tall, rgba(255,255,255,0.50), hanging from left end of beam
- Pan: 60px wide, 44px tall, border-radius 10px, #34D399 (emerald 400) background
- Pan has a subtle inner shadow: inset 0 2px 4px rgba(0,0,0,0.15)
- Text inside pan: "+$24" — Inter 700, 14px, white, centered
- The green pan sits lower (because it's heavier — more money owed to you)

**Right side (negative — you owe)**

- Wire: same as left
- Pan: same size, #F87171 (red 400) background
- Text inside pan: "-$18" — Inter 700, 14px, white, centered
- The red pan sits higher (lighter — less debt)

**Base**

- Rectangle: 48px wide, 14px tall, border-radius 6px, rgba(255,255,255,0.35)
- Sits at the very bottom of the pole, like a stand
- Gives the scale a sense of physical grounding

### Text Block

Same position and style rules as slide 1.

**Title**

- "Always know who owes whom"
- Inter 700, 28px, white, line-height 36px, centered

**Subtitle**

- "Real-time balances across every group. Settle one person at a time."
- Inter 400, 16px, rgba(255,255,255,0.72), line-height 26px, centered

### Bottom Controls

Same structure as slide 1.
Active dot is now the second dot (middle position).
Button still says "Next."

### Designer Notes

> The tilted beam is the most important detail on this screen. A perfectly level scale would suggest everything is already balanced — which is the opposite of why users need this app. The slight tilt creates tension, and tension creates the need for resolution. The app is the resolution.
>
> Using #34D399 (a lighter emerald) instead of the standard #059669 on the green background ensures the pan is visible and distinct. Dark green on dark green would disappear.
>
> The base of the scale is a grounding element — without it, the scale feels like it's floating in space. With it, the illustration has physical weight and believability.

---

## SCREEN 04 — Welcome Carousel · Slide 3 of 3

**World:** Dark · **Slide theme:** Inclusion and zero friction

### Mood

This slide removes the biggest objection: "My friends won't download another app."
The answer is shown, not told — one person is highlighted (the user), others are faded (friends who don't need the app).
The mood is: liberating. You can use this with anyone.

### Background

Gradient: #1E1B4B top → #6D28D9 bottom
Back to indigo family but with a violet end — this is the "magic" slide.
The violet suggests something special: no barriers, no friction, just connection.

### Illustration — Network of People

Centered, same position as previous slides.

**Center person (the user — highlighted)**

- Head: 44px circle, white, solid
- Body: 56px wide, 30px tall, border-radius 12px, white, solid
- Glow ring behind: 90px circle, rgba(255,255,255,0.12), centered behind the person
- This person is fully opaque — they are the focus, the app user

**Left person (friend — faded)**

- Head: 32px circle, rgba(255,255,255,0.40)
- Body: 44px wide, 24px tall, border-radius 8px, rgba(255,255,255,0.30)
- Positioned left of center, 40px gap from center person

**Right person (friend — faded)**

- Same as left person, mirrored to the right side

**Connector lines**

- Two dashed horizontal lines connecting left/right persons to center
- 1.5px, rgba(255,255,255,0.35), dash pattern: 4px dash, 4px gap

### Text Block

**Title**

- "Friends need zero account"
- Inter 700, 28px, white, line-height 36px, centered

**Subtitle**

- "Add anyone by name. They never have to download anything."
- Inter 400, 16px, rgba(255,255,255,0.72), line-height 26px, centered

### Bottom Controls

Same structure as slides 1 and 2.
Active dot is now the third dot (rightmost position).
Button says "Get Started" — this is the call to action, not "Next."

### Designer Notes

> The faded friends are the key insight. They are present but not required. This is the entire product promise in one illustration.
>
> "Get Started" replaces "Next" on this slide. The copy shift signals the end of the introduction and the beginning of the user's journey.

---

## SCREEN 05 — Sign In Screen

**World:** Dark

### Mood

The user has decided to try the app. This screen must not lose them.
Every friction point removed here is a user retained.
The mood is: welcoming, private, effortless.
It should feel like walking into a well-designed space — not filling out a form.

### Background

- Base: #1E1B4B full bleed
- Bottom 55% overlay: #312E81 at 70% opacity
- The two layers create a subtle gradient without being dramatic
- The dark background signals: your data is private, this is a serious app

### Top Section

Centered horizontally, starts 60px below the status bar.

**Logo Mark**

- Split Circle, 32px diameter, white version (inverted for dark bg)
- Sits inline with the wordmark — logo left, wordmark right, 10px gap
- Together they form a single centered unit

**Wordmark**

- "SplitEasy" — Inter 700, 28px, white, letter-spacing 0.4px
- 10px to the right of the logo mark

**Welcome Heading**

- "Welcome back" — Inter 600, 22px, white
- 32px below the logo+wordmark unit
- text-align center

**Trust Line**

- "Your friends never need to download anything."
- Inter 400, 14px, rgba(255,255,255,0.60)
- 8px below the heading
- text-align center, max-width 280px

### Glass Card

The primary interaction area. Contains all auth options.

- Margin: 20px each side
- Background: rgba(255,255,255,0.10)
- Border: 1px rgba(255,255,255,0.18)
- Border radius: 24px
- Padding: 24px inside
- Elevation: subtle — no hard shadow, the border does the work
- 32px below the trust line

**Inside the glass card, top to bottom:**

**Apple Button**

- Height: 56px, border-radius: 14px, background: #000000
- Left: Apple symbol — SF Pro 20px, white, 24px from left edge
- Center: "Sign in with Apple" — Inter 600, 16px, white
- This button must be first — Apple requires it when any social login is present

**Google Button**

- Height: 56px, border-radius: 14px, background: white
- Left: "G" — Inter 700, 16px, #4285F4, 24px from left edge
- Center: "Sign in with Google" — Inter 500, 16px, #0F172A
- 12px below Apple button

**Divider**

- Hairline line: rgba(255,255,255,0.18), full width of card
- "or" — Inter 400, 12px, rgba(255,255,255,0.40), centered on the line
- 12px above and below

**Email Button**

- Height: 56px, border-radius: 14px
- Background: transparent
- Border: 1px rgba(255,255,255,0.30)
- Text: "Continue with Email" — Inter 600, 16px, white, centered

**Guest Button**

- Height: 44px, border-radius: 14px
- Background: transparent
- Border: 1px rgba(255,255,255,0.15)
- Text: "Continue without account" — Inter 500, 14px, rgba(255,255,255,0.50), centered
- 8px below email button

### Below the Card

- "🔒 Encrypted and private"
- Inter 400, 12px, rgba(255,255,255,0.35)
- Centered, 20px below the card
- The lock icon is a trust signal — small but important

### Designer Notes

> The glass card groups all auth options into one visual unit. Without the card, four buttons in a column look like a list. With the card, they look like a considered set of choices.
>
> The guest button being the smallest and most faded is intentional hierarchy. We want users to sign in. But we respect that some won't. The option is there — just not promoted.
>
> The trust line "Your friends never need to download anything" is placed before the auth options deliberately. It answers the user's biggest hesitation before they even see the buttons.

---

## SCREEN 06 — Sign In · Email Mode

**World:** Dark

### Mood

Focused. The user has chosen email. Remove everything except what they need.
One task: enter credentials and get in.

### Background

Same as Screen 05 — #1E1B4B base, #312E81 bottom overlay.

### Back Navigation

- Top left, 72px from top
- "←" arrow — Inter 400, 22px, #A5B4FC (indigo 300)
- "Back" — Inter 500, 14px, #A5B4FC, 6px to the right of arrow
- Using indigo 300 (not white) signals this is a navigation element, not content

### Content

Starts 32px below the back row.

**Heading**

- "Sign in" — Inter 700, 28px, white
- Left-aligned, 20px from screen edge

**Email Input**

- 56px tall, border-radius 14px
- Background: rgba(255,255,255,0.12)
- Border: 1px rgba(255,255,255,0.20)
- Placeholder: "Email address" — rgba(255,255,255,0.40)
- Text: white, Inter 400, 16px
- 24px below heading

**Password Input**

- Same style as email input
- Placeholder: "Password"
- Right side: eye icon to toggle visibility — 20px, rgba(255,255,255,0.40)
- 12px below email input

**Error State** (when credentials are wrong)

- Small text below the password input
- "Wrong email or password. Please try again."
- Inter 400, 13px, #FCA5A5 (red 300 — softer than full red on dark bg)
- 8px below password input

**Sign In Button**

- 56px, border-radius 14px, background #6366F1
- "Sign in" — Inter 600, 16px, white, centered
- Shadow: 0 8px 24px rgba(99,102,241,0.40)
- 20px below the last input (or error message)

**Forgot Password Link**

- "Forgot password?" — Inter 400, 13px, rgba(255,255,255,0.60)
- Centered, 16px below the sign in button
- Tapping opens the forgot password flow inline (no new screen)

### Designer Notes

> Dark inputs on a dark background require careful contrast management. The rgba(255,255,255,0.12) background is just enough to define the input boundary without looking like a white box dropped onto the screen.
>
> The back button uses #A5B4FC (indigo 300) instead of white. This is a deliberate color signal — indigo-tinted elements are navigation, white elements are content. Users learn this pattern subconsciously.

---

## SCREEN 07 — Create Group Screen

**World:** Light

### Mood

The first real action in the app. The user is creating something.
This should feel creative and personal — not like filling out a form.
The emoji picker is the hero of this screen. It makes the group feel like theirs.

### Background

White #FFFFFF — we have crossed from the dark onboarding world into the light app world.
This transition is intentional. The dark world was about trust and welcome. The light world is about doing.

### Header

- Back arrow left: "‹" — Inter 300, 28px, #6366F1
- Title center: "New Group" — Inter 600, 16px, #0F172A
- No right element

### Content (scrollable, 20px side padding)

**Section Label — Group Name**

- "GROUP NAME" — Inter 600, 10px, #94A3B8, letter-spacing 3px, uppercase
- 24px below header

**Name Input**

- 56px, border-radius 14px
- Background: #F8FAFC, border: 1px #E2E8F0
- Placeholder: "e.g. Spain Trip, Flat Bills…" — #94A3B8
- Text: #0F172A, Inter 400, 16px
- Auto-focused on screen load — keyboard appears immediately
- 8px below section label

**Section Label — Pick an Emoji**

- Same style as above
- 24px below the name input

**Emoji Grid**

- 6 columns × 5 rows = 30 emoji options
- Each cell: 52×52px, border-radius 10px
- Default state: transparent background
- Selected state: #EEF2FF background, 2px #6366F1 border
- Emoji font size: 26px
- Gap between cells: 8px
- Emoji categories represented: travel, home, food, party, outdoors, money
- Example emoji: ✈️ 🏠 🍕 🎉 🏔️ 💰 🎿 🌴 🍻 🎸 🏖️ 🚗 🎓 💼 🏋️ 🌮 🎬 🛒 ⚡ 🎮 🐶 🌍 🎂 🏊 🚀 🎯 🌺 🍜 🎪 🦋

**Section Label — Add Members**

- Same style
- 24px below emoji grid

**Member Input Rows**

- Each row: 48px tall, border-radius 12px
- Background: #F8FAFC, border: 1px #E2E8F0
- Left: person icon circle — 28px, #EEF2FF bg, #6366F1 icon
- Text input: "Name" placeholder — #94A3B8, Inter 400, 15px
- Right: minus button — 28px circle, #FEE2E2 bg, #DC2626 minus icon — only visible when more than 1 member
- 8px gap between rows
- First row auto-focused after name input is filled

**Add Member Link**

- "+ Add another person"
- Inter 500, 14px, #6366F1
- Left-aligned, 12px below the last member row
- Tapping adds a new input row with animation

### Bottom (fixed, above home indicator)

- "Create Group" — Primary Button, full width minus 40px, 56px, #6366F1 bg
- Disabled state: 50% opacity, not tappable until name is filled and at least 1 member added
- 20px from bottom safe area

### Designer Notes

> The emoji picker is not a feature — it is the personality of the app. When a user picks an emoji for their group, they are making it theirs. This moment of personalization creates ownership and retention.
>
> The member input rows use a subtle left icon (person circle) to reinforce that these are people, not items. Small detail, big psychological difference.
>
> The Create button being disabled until the form is valid prevents errors and teaches the user what is required without showing error messages.

---

## SCREEN 08 — Notification Prompt

**World:** Light

### Mood

This screen asks for something. It must give before it takes.
Show the user exactly what they will receive before asking permission.
The mood is: generous, transparent, worth it.

### Background

#F8FAFC — standard light world background.

### Illustration Area

Full width, 280px tall, sits at the top of the content (below status bar).
Background of illustration area: #EEF2FF (indigo 50) — a soft tinted panel.
Border radius bottom only: 24px.

**Three notification card mockups stacked with slight overlap and rotation:**

Card 1 (back, slightly rotated -2deg, lowest):

- 300×60px, white, border-radius 14px, elevation level 1
- Left: bell icon circle — 36px, #EEF2FF bg, #6366F1 bell
- Text: "Alex added Hotel Barcelona" — Inter 600, 13px, #0F172A
- Sub: "Spain Trip · $620.00" — Inter 400, 12px, #64748B
- Right: "now" — Inter 400, 11px, #94A3B8

Card 2 (middle, no rotation):

- Same size, elevation level 2
- Left: checkmark circle — 36px, #D1FAE5 bg, #059669 check
- Text: "Jordan settled up" — Inter 600, 13px, #0F172A
- Sub: "Flat Bills · $42.00" — Inter 400, 12px, #64748B

Card 3 (front, slightly rotated +1.5deg, highest):

- Same size, elevation level 2
- Left: bell icon circle — brand colors
- Text: "Netflix split auto-added" — Inter 600, 13px, #0F172A
- Sub: "Flat Bills · Recurring" — Inter 400, 12px, #64748B

### Text Block

32px below the illustration area, 20px side padding.

**Heading**

- "Know the moment someone pays"
- Inter 700, 24px, #0F172A, line-height 32px

**Body**

- "Get notified when expenses are added, balances change, or someone settles up."
- Inter 400, 15px, #64748B, line-height 24px
- 12px below heading

### Bottom (fixed)

**Enable Button**

- "Enable Notifications" — Primary Button, full width minus 40px, 56px, #6366F1
- 20px from bottom safe area

**Not Now Link**

- "Not now" — Inter 500, 14px, #94A3B8, centered
- 12px below the enable button
- No border, no background — just text

### Designer Notes

> Showing three notification examples before asking permission is the entire strategy. Users who see what they'll receive accept at 70%+ rate. Users who see only the system dialog accept at ~40%.
>
> The stacked, slightly rotated cards create depth and make the notifications feel real — like they are already happening, waiting for the user to turn them on.

---

## SCREEN 09 — Groups Home · With Groups

**World:** Light

### Mood

This is the user's command center. They come here every time they open the app.
It must answer one question instantly: "Where do I stand?"
The net balance banner answers that question before the user reads a single word.
The mood is: clear, organized, in control.

### Header

White background, 64px tall, 1px #F1F5F9 border bottom.

**Left side**

- Split Circle logo mark — 28px, #6366F1 version (light world)
- "SplitEasy" — Inter 800, 18px, #6366F1, letter-spacing -0.5px, 10px right of logo
- "4 active groups" — Inter 400, 10px, #94A3B8, sits directly below the wordmark

**Right side**

- Bell button — 40px circle, #F8FAFC background
- Bell icon inside: View-based, 20px, #6366F1
- Notification dot: 8px circle, #DC2626, top-right of bell — visible when there are unread notifications

### Net Balance Banner

20px side margins, 16px below header, border-radius 20px, 88px tall.
Overflow hidden — decorative circles clip to the card edges.

**Positive state (shown as default):**

- Background: #059669 (emerald)
- Right half overlay: #34D399 at 35% opacity — creates a subtle gradient within the card
- Three decorative circles (absolute positioned, rgba(255,255,255,0.10)):
  - 100px circle: top -30px, right 50px
  - 64px circle: top 20px, right 16px
  - 44px circle: bottom -12px, right 80px

**Left content:**

- "You are owed" — Inter 500, 12px, rgba(255,255,255,0.80)
- "$101.25" — Inter 800, 26px, white, letter-spacing -0.5px, 4px below label

**Right content:**

- "Settle all" pill button
- White background, border-radius 999px
- "Settle all" — Inter 600, 13px, #059669
- Padding: 8px 16px

**Negative state:**

- Background: #DC2626, overlay #FB7185
- Label: "You owe", amount in white, pill text #DC2626

**Zero state:**

- Background: #6366F1, overlay #8B5CF6
- Label: "All settled up", no amount, no pill button

### Search Bar

20px side margins, 12px below banner, 44px tall, border-radius 10px.

- White background, 1px #E2E8F0 border
- Left: search icon (circle + handle) — 18px, #94A3B8
- Input: "Search groups…" placeholder — Inter 400, 14px, #94A3B8
- Right (when text entered): clear button — 18px circle, #F1F5F9 bg, #64748B x

### Group Cards

White background, full width. Each card 72px tall.
Padding: 16px vertical, 20px horizontal.

**Each card contains (left to right):**

- Left accent bar: 3px wide, 40px tall, border-radius 999px
  - Positive balance: #059669
  - Negative balance: #DC2626
  - Zero balance: #6366F1
- Emoji icon: 48×48px, border-radius 10px, group color at 15% opacity background
- Center block (flex 1):
  - Group name — Inter 600, 14px, #0F172A
  - "5 members · Hotel Barcelona" — Inter 400, 12px, #94A3B8, 3px below name
- Balance chip (right):
  - Positive: #D1FAE5 bg, #059669 text, "+$124.50"
  - Negative: #FEE2E2 bg, #DC2626 text, "-$42.00"
  - Zero: #F1F5F9 bg, #94A3B8 text, "Settled"
  - Inter 600, 12px, border-radius 999px, padding 4px 10px

**Separator between cards:**

- 1px #F1F5F9, starts after the accent bar (marginLeft = 20 + 3 + 12 + 48 + 12 = 95px)
- This alignment makes the separator feel like it belongs to the text, not the card edge

### FAB (Floating Action Button)

- 56px circle, #6366F1 background
- Shadow: 0 6px 20px rgba(99,102,241,0.40), 0 2px 6px rgba(0,0,0,0.08)
- Position: bottom 24px, right 20px
- Icon: white plus — two 20×3px bars crossing at center
- Pressing it opens the Create Group flow

### Designer Notes

> The accent bar on the left of each card is the most important detail on this screen. It lets users scan their balance status without reading a single number — green bar = good, red bar = owe, indigo bar = settled. This is color as information, not decoration.
>
> The separator alignment (starting after the icon) is a premium detail. It makes the list feel like it has breathing room on the left — the icons float, the text is connected.
>
> The FAB shadow uses the brand color, not black. This makes the button feel like it belongs to the brand, not like a generic floating element.

---

## SCREEN 10 — Groups Home · Empty State

**World:** Light

### Mood

The user has no groups yet. This is a moment of potential, not failure.
The empty state should make them excited to create their first group — not feel like they are looking at a broken screen.
The mood is: inviting, warm, ready.

### Header

Identical to Screen 09 — logo, wordmark, subtitle, bell button.
Subtitle changes to: "No groups yet" — #94A3B8.

### Search Bar

Same as Screen 09 — present but empty and non-functional until groups exist.

### Empty State Illustration (centered in remaining space)

**Nested circle composition:**

- Outer ring: 120px circle, rgba(99,102,241,0.08) background — the atmosphere
- Middle ring: 80px circle, rgba(99,102,241,0.12) background — the focus
- Inner circle: 48px circle, #6366F1 background — the core
- Inside inner circle: "+" — Inter 300, 28px, white — an invitation, not a label

**Text below the circles:**

- "No groups yet" — Inter 700, 20px, #0F172A, centered, 20px below circles
- "Create your first group to start splitting bills with friends." — Inter 400, 14px, #64748B, centered, line-height 22px, max-width 260px, 8px below title

**CTA Button**

- "Create a group" — 44px, border-radius 10px, #6366F1 bg, white Inter 600 14px
- Width: auto (fits content + 24px padding each side)
- Centered, 24px below subtitle

### FAB

Still present — same as Screen 09. Two ways to create a group (button + FAB) is intentional redundancy.

### Designer Notes

> The "+" inside the inner circle is the key detail. It transforms the empty state from a void into an invitation. The nested circles create a target — the user's eye is drawn to the center, and the center says "add something here."
>
> The CTA button is smaller (44px vs 56px) than the primary button. This is intentional — the empty state should feel gentle, not pushy. The FAB is the primary action; the button is a secondary nudge.

---

## SCREEN 11 — Group Detail Screen

**World:** Light

### Mood

The user is inside a group. They want to know: what's happening, who owes what, and what to do next.
This screen is the group's home — it must answer all three questions without scrolling.
The mood is: organized, actionable, complete.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- Left: "‹" back arrow — Inter 300, 28px, #6366F1
- Center: group name "Spain Trip 2024" — Inter 600, 16px, #0F172A
- Right: settings gear icon — 20px, #94A3B8

### Group Hero Card

20px side margins, 16px below header.
Border-radius: 20px. Height: 108px. Overflow hidden.
Background: #6366F1 (brand indigo).
Elevation: level 2.

**Decorative layer:**

- Two large circles (absolute): 120px rgba(255,255,255,0.08), top-right area; 80px rgba(255,255,255,0.06), bottom-left
- These give the card depth without competing with the content

**Left content:**

- Group emoji: 32px, sits top-left of content area
- Group name: "Spain Trip 2024" — Inter 700, 18px, white, 6px below emoji
- Member count: "5 members" — Inter 400, 13px, rgba(255,255,255,0.65), 4px below name

**Bottom stat row (inside card, separated by 1px rgba(255,255,255,0.20) line):**

- Left stat: "Your balance" — Inter 500, 11px, rgba(255,255,255,0.65) / "+$124.50" — Inter 700, 20px, white
- Vertical divider: 1px rgba(255,255,255,0.20), 32px tall
- Right stat: "Total spent" — Inter 500, 11px, rgba(255,255,255,0.65) / "$620.00" — Inter 600, 18px, white

### Member Balances Card

White, 20px side margins, 12px below hero card.
Border-radius: 16px. Border: 1px #F1F5F9. Elevation: level 1.

**Section header (inside card):**

- "BALANCES" — Inter 600, 10px, #94A3B8, letter-spacing 3px, uppercase
- Padding: 16px top, 16px horizontal

**Each member row:**

- Avatar: 40px circle, deterministic color, white initials Inter 700 14px
- Name: Inter 600, 14px, #0F172A
- Amount right: Inter 700, 14px, #059669 or #DC2626
- "Settle" pill: 28px tall, border-radius 999px, #059669 or #DC2626 bg, white Inter 600 11px
- "Nudge" ghost pill: same height, transparent, #E2E8F0 border, #64748B text — sits left of Settle
- Row height: 56px, 1px #F1F5F9 separator between rows

### Recent Expenses Card

White, 20px side margins, 12px below balances card.
Border-radius: 16px. Border: 1px #F1F5F9. Elevation: level 1.

**Section header:**

- "RECENT" left — Inter 600, 10px, #94A3B8, uppercase, letter-spacing 3px
- "View all →" right — Inter 500, 13px, #6366F1

**Each expense row:**

- Icon circle: 40px, border-radius 10px, #EEF2FF bg, category emoji 20px
- Name: Inter 600, 14px, #0F172A
- Meta: "Paid by You · Apr 13" — Inter 400, 12px, #94A3B8
- Amount right: Inter 700, 14px, #059669 or #DC2626
- Row height: 56px, 1px #F1F5F9 separator

### Bottom (fixed)

- "Add Expense" — Primary Button, full width minus 40px, 56px, #6366F1
- 20px from bottom safe area

### Designer Notes

> The hero card does three jobs: it identifies the group (emoji + name), shows the user's personal stake (your balance), and shows the group's total activity (total spent). Three pieces of information, one card, zero scrolling required.
>
> The Nudge button sitting left of Settle is a deliberate hierarchy. Settle is the primary action (colored). Nudge is the secondary action (ghost). The user's eye goes to Settle first — which is what we want.

---

## SCREEN 12 — Add Expense · Amount Entry

**World:** Light

### Mood

This is the 3-tap promise. The user is adding an expense.
Everything on this screen exists to make that happen as fast as possible.
The amount is the hero. Everything else is secondary.
The mood is: focused, fast, satisfying.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- Left: "Cancel" — Inter 500, 16px, #64748B
- Center: "New Expense" — Inter 600, 16px, #0F172A
- Right: "Save" — Inter 600, 16px, #6366F1 (disabled/gray until amount > 0)

### Amount Display

The visual center of the screen. Sits 40px below the header.

**Amount**

- "$0.00" (updates as user types) — Inter 800, 52px, #6366F1, letter-spacing -2px, centered
- This is the largest text in the entire app. It must feel important.
- When amount is 0: #C7D2FE (indigo 200) — muted, waiting
- When amount > 0: #6366F1 — active, alive

**Expense Name Input**

- Below the amount, 16px gap
- No border, no background — just a centered text input
- Placeholder: "What's this for?" — Inter 400, 16px, #94A3B8, centered
- Typed text: Inter 400, 16px, #0F172A, centered
- A single 1px #E2E8F0 underline — minimal, not a full input box

### Category Row

Horizontal scroll, 20px left padding, 12px top margin.
No scroll indicator.

**Each category item:**

- 64×64px container, border-radius 12px
- Default: #F8FAFC background
- Selected: #EEF2FF background, 2px #6366F1 border
- Emoji: 28px, centered in top 40px of container
- Label: Inter 500, 10px, #64748B, centered below emoji, letter-spacing 0.5px

**8 categories:**
Stay 🏨 · Food 🍽 · Travel ✈️ · Fun 🎉 · Grocery 🛒 · Utility ⚡ · Activity 🏃 · Other 💳

### Paid By Row

20px side padding, 20px top margin.

**Label:** "Paid by" — Inter 600, 13px, #94A3B8, uppercase, letter-spacing 1px

**Member pills (horizontal, 8px gap):**

- Each pill: avatar circle 32px + name — Inter 500, 13px
- Default: #F8FAFC bg, #E2E8F0 border, #64748B text
- Selected: #EEF2FF bg, 2px #6366F1 border, #6366F1 text
- Border-radius: 999px, padding: 6px 12px 6px 6px

### Split Method Tabs

20px side padding, 20px top margin.
4 tabs in a row: Equal · Exact · % · By item

- Tab height: 36px
- Active: #6366F1 text Inter 600 14px, 2px #6366F1 bottom border
- Inactive: #94A3B8 text Inter 500 14px, no border
- Tab width: equal distribution

### Equal Split Preview (below tabs, 16px gap)

**Member checkboxes:**

- Each row: 48px tall
- Left: checkbox 22px — checked: #6366F1 bg, white checkmark; unchecked: #E2E8F0 border
- Avatar 32px, 8px right of checkbox
- Name: Inter 500, 14px, #0F172A
- Right: "owes $60.00" — Inter 500, 13px, #64748B

**Summary pill:**

- "Each owes $60.00" — centered pill
- #EEF2FF bg, #6366F1 text, Inter 600, 13px, border-radius 999px, padding 6px 16px
- 12px below the last checkbox row

### Bottom (fixed)

- "Save Expense" — Primary Button, full width minus 40px, 56px, #6366F1
- Shadow: level 4 with brand color
- 20px from bottom safe area

### Designer Notes

> The 52px amount display is the largest text in the app. This is intentional — the amount is the entire reason the user opened this screen. Making it huge makes the interaction feel important and satisfying.
>
> The expense name input has no box — just an underline. This keeps the focus on the amount. The name is secondary information; the amount is primary.
>
> The "Save" button in the header is a shortcut for power users. The "Save Expense" button at the bottom is for everyone else. Both do the same thing.

---

## SCREEN 13 — Add Expense · Split Detail

**World:** Light

### Mood

The user is customizing how the bill is split.
This screen must make math feel easy — even satisfying.
The progress bar filling up as amounts are allocated is the key interaction.
The mood is: precise, satisfying, in control.

### Header

Same as Screen 12 — Cancel left, "Split" center, Save right.

### Amount Recap Bar

White, full width, 56px tall, 1px #F1F5F9 border bottom.

- Left: "$240.00" — Inter 700, 18px, #0F172A
- Right: "Hotel Barcelona" — Inter 400, 13px, #94A3B8
- This bar keeps the total visible at all times — the user always knows what they're splitting

### Exact Split Mode (shown as default for this screen)

**Progress bar:**

- Full width, 4px tall, border-radius 999px
- Background: #F1F5F9
- Fill: #6366F1, width proportional to allocated amount
- When fully allocated: fill turns #059669 (green) — a satisfying completion signal
- Sits directly below the recap bar

**Allocation label:**

- "Allocated: $180.00 of $240.00" — Inter 500, 13px, #64748B, left-aligned, 20px padding
- "$60.00 remaining" — Inter 600, 13px, #DC2626, right-aligned — turns #059669 when 0

**Member rows:**

- Each row: 64px tall, 20px side padding
- Left: avatar 40px + name Inter 600 14px #0F172A
- Right: amount input — 80px wide, 44px tall, border-radius 10px
  - Background: #F8FAFC, border: 1px #E2E8F0
  - Focused: 2px #6366F1 border
  - Text: Inter 700, 16px, #0F172A, right-aligned
- 1px #F1F5F9 separator between rows

**Validation state:**

- When total matches: progress bar fills green, "Amounts match ✓" appears in green below the bar
- Save button activates (full opacity)
- When total exceeds: progress bar turns red, "Over by $X.XX" appears in red

### Designer Notes

> The progress bar is the emotional core of this screen. Watching it fill up as you allocate amounts is inherently satisfying — it turns a math task into a completion task. The color change from indigo to green when complete is the reward.
>
> The amount input being right-aligned inside the field mirrors how we read financial figures — right-aligned, decimal-aligned. This is a financial app convention that makes the screen feel professional.

---

## SCREEN 14 — Expense Detail Screen

**World:** Light

### Mood

The user is reviewing a past expense. This is a record — it should feel like a beautiful digital receipt.
Authoritative, clear, complete. Every question answered without asking.
The mood is: informative, trustworthy, archival.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- Left: "‹" back — #6366F1
- Center: expense name "Hotel Barcelona" — Inter 600, 16px, #0F172A
- Right: "Edit" — Inter 500, 16px, #6366F1

### Hero Card

20px side margins, 16px below header.
Border-radius: 20px. Background: #6366F1. Elevation: level 2. Height: 120px.

**Content:**

- Category icon circle: 48px, rgba(255,255,255,0.20) bg, category emoji 24px — top-left of content
- Category name: "Stay" — Inter 500, 12px, rgba(255,255,255,0.70), 6px right of icon
- Amount: "$620.00" — Inter 800, 36px, white, letter-spacing -1px, centered vertically in card
- "Paid by You · April 13, 2026" — Inter 400, 13px, rgba(255,255,255,0.65), below amount

### Split Breakdown Card

White, 20px side margins, 12px below hero.
Border-radius: 16px. Border: 1px #F1F5F9. Elevation: level 1.

**Section header:** "SPLIT BREAKDOWN" — Inter 600, 10px, #94A3B8, uppercase, letter-spacing 3px

**Each member row (56px tall):**

- Avatar 40px + name Inter 600 14px #0F172A
- Right: share amount Inter 700 14px (pos/neg color) + "owes you" / "you owe" Inter 400 11px #94A3B8 below

### Details Card

White, 20px side margins, 12px below split card.
Border-radius: 16px. Border: 1px #F1F5F9. Elevation: level 1.

**Rows (each 48px):**

- Date: calendar icon 20px #94A3B8 + "April 13, 2026" Inter 400 14px #0F172A
- Group: group emoji + "Spain Trip 2024" Inter 400 14px #0F172A
- Split method: split icon + "Equal split" Inter 400 14px #0F172A
- Notes (if present): note icon + notes text Inter 400 14px #64748B

### Bottom (fixed)

- "Delete Expense" — Destructive Button, full width minus 40px, 56px
- Background: #FEE2E2, text: #DC2626 Inter 600 16px
- 20px from bottom safe area

### Designer Notes

> The hero card uses the same #6366F1 background as the group hero card. This visual consistency tells the user: this expense belongs to this group. Color as navigation.
>
> The delete button uses a soft red background (#FEE2E2) instead of a solid red. This is intentional — it signals danger without being alarming. The user must consciously choose to delete; the design doesn't make it feel easy.

---

## SCREEN 15 — Settle Up Screen

**World:** Light

### Mood

Someone is paying someone back. This is a moment of resolution.
The screen should feel generous and positive — even if the user is the one paying.
The mood is: clean, final, celebratory-adjacent.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- Left: "‹" back — #6366F1
- Center: "Settle Up" — Inter 600, 16px, #0F172A
- No right element

### Person Card

20px side margins, 20px below header.
White, border-radius 20px, border: 1px #F1F5F9, elevation: level 2.
Padding: 24px.

**Content:**

- Avatar: 64px circle, deterministic color, white initials Inter 700 22px, centered
- Name: "Alex Chen" — Inter 700, 20px, #0F172A, centered, 12px below avatar
- "owes you" — Inter 400, 14px, #64748B, centered, 4px below name
- Amount: "$86.50" — Inter 800, 44px, #059669, letter-spacing -1.5px, centered, 16px below label
- Glow behind amount: 80px circle, rgba(5,150,105,0.10), centered behind the number
- "from Spain Trip 2024, Pizza Fridays" — Inter 400, 13px, #94A3B8, centered, 8px below amount

### Amount Input Section

20px side padding, 24px below person card.

**Label:** "AMOUNT TO SETTLE" — Inter 600, 10px, #94A3B8, uppercase, letter-spacing 3px

**Input:**

- 56px, border-radius 14px, background #F8FAFC, border 1px #E2E8F0
- Pre-filled: "$86.50" — Inter 700, 20px, #0F172A
- Focused: 2px #6366F1 border
- 8px below label

**Partial settlement toggle:**

- "Partial settlement" — Inter 500, 13px, #64748B, left-aligned
- Toggle switch right-aligned — off by default
- When on: input becomes editable, amount can be changed

### Note Field

20px side padding, 12px below amount input.

- 44px, border-radius 12px, background #F8FAFC, border 1px #E2E8F0
- Placeholder: "Add a note (optional)" — Inter 400, 14px, #94A3B8

### Bottom (fixed)

- "Mark as Received" — 56px, border-radius 14px, background #059669, white Inter 600 16px
- Shadow: 0 8px 24px rgba(5,150,105,0.35)
- Full width minus 40px, 20px from bottom safe area

### Designer Notes

> The amount having a subtle green glow behind it is the key premium detail. It makes the number feel alive — like it's glowing with the satisfaction of being paid back. This is the kind of detail that makes users say "this app just feels good."
>
> The "Mark as Received" button is green — the same green as the positive money color. This is intentional color language: green = good, green = money coming in, green = this is the right action.

---

## SCREEN 16 — Settlement Confetti

**World:** Dark (momentarily)

### Mood

The group balance has hit exactly $0.00. This is the best moment in the app.
It should feel like a celebration — genuine, joyful, shareable.
This is the screen users film for TikTok. Design it knowing that.
The mood is: euphoric, complete, worth sharing.

### Background

White — this is the only "dark world moment" that uses white.
The confetti IS the background. The white makes the colors pop.

### Center Composition

**Glow ring:**

- 140px circle, rgba(5,150,105,0.12), centered at y=340
- A second ring: 110px circle, rgba(5,150,105,0.18), centered same point

**Checkmark circle:**

- 88px circle, #059669 background, elevation level 3
- White checkmark inside — thick, 4px stroke, rounded caps
- The circle scales in with a spring animation (code handles this)

**Heading:**

- "You're all square!" — Inter 700, 24px, #0F172A, centered, 24px below the circle
- This is the emotional payoff line. Short. Final. Joyful.

**Sub-heading:**

- "Spain Trip 2024 is fully settled." — Inter 400, 15px, #64748B, centered, 8px below heading

### Confetti Layer (absolute, full screen)

20+ confetti pieces scattered across the screen.
Each piece is a small rectangle or circle, various sizes (6–16px), various rotations.

**Colors (8 colors, used randomly):**

- #6366F1 (brand indigo)
- #F59E0B (gold)
- #059669 (emerald)
- #DC2626 (red)
- #8B5CF6 (violet)
- #0891B2 (cyan)
- #F97316 (orange)
- #EC4899 (pink)

**Shapes:** Mix of rectangles (8×4px) and circles (6px diameter), all with slight rotations.
**Distribution:** Heavier concentration at top, lighter at bottom — simulates falling.

### Bottom (fixed)

**Share Button:**

- "Share the good news" — Primary Button, full width minus 40px, 56px, #6366F1
- 20px from bottom safe area

**Back Link:**

- "Back to group" — Inter 500, 14px, #94A3B8, centered, 12px below share button

### Designer Notes

> White background for confetti is non-negotiable. Confetti on a dark background looks muddy. Confetti on white looks like a celebration.
>
> "You're all square!" is the copy. Not "Settlement complete" (corporate). Not "All done!" (generic). "All square" is a real phrase people use — it feels human.
>
> The share button exists because this moment is marketing. Every time a user shares this screen, SplitEasy gets a free impression. Design the screen knowing it will be screenshotted.

---

## SCREEN 17 — Balances Tab

**World:** Light

### Mood

The user wants to know: who owes me, and who do I owe?
Answer that question in the first 200px of the screen.
The mood is: financial clarity, no surprises, total control.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- "Balances" — Inter 700, 20px, #0F172A, left-aligned, 20px from left

### Hero Card

20px side margins, 16px below header.
Border-radius: 20px. Padding: 20px. Elevation: level 2.

**Positive state (default shown):**

- Background: #D1FAE5 (emerald 100)
- "You're owed" — Inter 500, 12px, #64748B, marginBottom 4px
- "$143.25" — Inter 800, 40px, #059669, letter-spacing -1px

**Stats row** (below 1px rgba(0,0,0,0.06) divider, 16px top margin):

- Left column: "$143.25" Inter 700 18px #059669 / "owed to me" Inter 400 11px #94A3B8
- Vertical divider: 1px rgba(0,0,0,0.06), 32px tall
- Right column: "$60.25" Inter 700 18px #DC2626 / "I owe" Inter 400 11px #94A3B8

**Negative state:** Background #FEE2E2, amount in #DC2626, label "You owe"
**Zero state:** Background #EEF2FF, "All settled up" Inter 600 14px #6366F1, no amount, no stats row

### Filter Pills

20px side padding, 12px below hero card, gap 8px.

- "All" · "Owe me" · "I owe"
- Active: #6366F1 bg, white Inter 600 13px, border-radius 999px, 6px 14px padding
- Inactive: white bg, 1px #E2E8F0 border, #64748B Inter 500 13px

### Person Rows (FlatList)

White background, full width.

**Each row (72px tall, 20px side padding):**

- Avatar: 44px circle, deterministic color, white initials Inter 700 15px
- Info (flex 1): name Inter 600 14px #0F172A / groups Inter 400 11px #94A3B8 (numberOfLines 1)
- Right column (alignItems flex-end):
  - Amount: Inter 700 15px, #059669 or #DC2626
  - Label: "owes you" or "you owe" — Inter 400 11px, same color
  - "Settle" pill: 28px tall, border-radius 999px, pos/neg bg, white Inter 600 11px, 4px top margin
  - Zero: "Settled" Inter 500 13px #94A3B8 only

**Separator:** 1px #F1F5F9, marginLeft 76px (aligns with name text)

### Designer Notes

> The hero card is the entire screen in one element. If a user only ever looks at the hero card, they know everything they need to know. The list below is detail — the card is the summary.
>
> The filter pills are small (32px) because they are secondary navigation, not primary actions. They refine the list; they don't change the screen.

---

## SCREEN 18 — Activity Feed

**World:** Light

### Mood

The user wants to see what has happened — a chronological story of the group's money.
This is a feed, not a dashboard. It should feel like reading a timeline.
The mood is: narrative, readable, satisfying.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- "Activity" — Inter 700, 20px, #0F172A, left-aligned, 20px from left

### Filter Bar

White, full width, 1px #F1F5F9 border bottom.

- "All" · "Expenses" · "Settlements"
- Same pill style as Balances screen
- 20px side padding, 12px vertical padding

### Date Headers

- "TODAY" — Inter 600, 11px, #94A3B8, uppercase, letter-spacing 0.5px
- 20px side padding, 20px top / 8px bottom
- These headers break the feed into readable time chunks

### Activity Rows

White background, full width, 1px #F1F5F9 border bottom.
Padding: 14px vertical, 20px horizontal.

**Each row (left to right):**

- Icon circle: 44px, border-radius 10px
  - Expense: #EEF2FF background, category emoji 20px
  - Settlement: #D1FAE5 background, 💸 20px
- Right content (flex 1, 12px left gap):
  - Top row: description Inter 600 14px #0F172A (flex 1, truncated) + amount Inter 700 14px right
    - Amount colors: +amount = #059669, -amount = #DC2626, settlement = #059669
  - Bottom row (4px top margin): group badge + meta text
    - Group badge: #EEF2FF bg, #6366F1 Inter 600 11px, border-radius 6px, 8px/2px padding
    - Meta: "Alex paid · $620.00" — Inter 400 11px #94A3B8, flex 1

### Empty State (when filter returns nothing)

- Centered in remaining space
- "No activity yet" — Inter 700, 18px, #0F172A
- "Expenses and settlements will appear here." — Inter 400, 14px, #64748B, centered

### Designer Notes

> The group badge on each row is the key navigation element. It tells the user which group this activity belongs to without them having to remember. In a multi-group world, this context is essential.
>
> Date headers ("TODAY", "YESTERDAY", "APR 10") break the feed into scannable chunks. Without them, a long list of expenses is overwhelming. With them, it reads like a diary.

---

## SCREEN 19 — Settings Home

**World:** Light

### Mood

The user is managing their account. This should feel organized and premium.
The upgrade card must be impossible to ignore — but not annoying.
The mood is: polished, trustworthy, premium-adjacent.

### Header

White, 56px, 1px #F1F5F9 border bottom.

- "Settings" — Inter 700, 20px, #0F172A, left-aligned, 20px from left

### Profile Card

20px side margins, 16px below header.
White, border-radius 20px, border: 1px #F1F5F9, elevation: level 1.
Padding: 20px.

**Content (flex row):**

- Avatar: 64px circle, #6366F1 bg, "PH" white Inter 700 22px
- Info (flex 1, 16px left gap):
  - Name: "Partha Hudati" — Inter 600, 18px, #0F172A
  - Email: "partha@example.com" — Inter 400, 13px, #94A3B8, 2px below name
- "Edit" badge (right):
  - Border-radius 999px, 1.5px #6366F1 border
  - "Edit" — Inter 600, 13px, #6366F1
  - Padding: 6px 14px

### Premium Upgrade Card (free users only)

20px side margins, 12px below profile card.
Background: #1E1B4B (deep dark indigo). Border-radius: 20px. Padding: 20px.

**Top row:**

- Left text block:
  - "Upgrade to Premium" — Inter 700, 16px, white
  - "Unlimited groups, AI scanner, zero ads." — Inter 400, 13px, rgba(255,255,255,0.65), 4px below
- Right: "✦ PRO" badge
  - Background: #F59E0B (gold), border-radius 10px
  - "✦ PRO" — Inter 800, 12px, #92400E
  - Padding: 6px 12px

**Bottom button:**

- Full width, 44px, border-radius 12px
- Background: rgba(255,255,255,0.12), border: 1px rgba(255,255,255,0.20)
- "Start 7-day free trial" — Inter 600, 14px, white, centered
- 16px top margin

### Section Headers

- "ACCOUNT" / "PREFERENCES" / "APP"
- Inter 600, 11px, #94A3B8, uppercase, letter-spacing 1px
- 20px side padding, 20px top / 8px bottom

### Settings Sections

20px side margins. White bg. Border-radius: 16px. Border: 1px #F1F5F9. Overflow hidden.

**Each row (52px tall):**

- 16px horizontal / 14px vertical padding
- Left: icon wrap (32×32px, border-radius 8px, #F1F5F9 bg) + label Inter 500 14px #0F172A
  - Destructive rows: icon wrap #FEE2E2 bg, label #DC2626
- Right: value Inter 400 13px #94A3B8 + "›" Inter 400 20px #94A3B8
- Row divider: 1px #F1F5F9, marginLeft 60px

**Rows:**

- Account: Profile · Default Currency (value: "USD")
- Preferences: Notifications
- App: About SplitEasy · Rate the App · Send Feedback
- Danger: Sign Out (destructive styling)

### Footer

Centered, 32px vertical padding.

- "SplitEasy v1.0.0" — Inter 400, 13px, #94A3B8
- "Privacy Policy · Terms of Use" — Inter 400, 11px, #94A3B8, 6px below

### Designer Notes

> The premium upgrade card uses the dark world palette (#1E1B4B) inside a light world screen. This contrast makes it impossible to miss — it is the only dark element on the screen. The eye goes there first.
>
> The gold PRO badge is the only gold element on this screen. Gold = premium. Its scarcity makes it feel valuable.

---

## SCREEN 20 — Paywall Screen

**World:** Dark

### Mood

This screen exists to convert free users to paid subscribers.
Every element must serve that single goal.
The mood is: aspirational, inevitable, worth it.
The user should feel: "Of course I want this."

### Background

- Base: #1E1B4B full bleed
- Bottom 60% overlay: #312E81 at 75% opacity
- Same dark world language as Sign In — this is a premium moment

### Close Button

- Top right, 20px from right, 20px below status bar
- Two 16×2px white bars crossing at 45°/-45°
- Color: rgba(255,255,255,0.50)
- Hit target: 44×44px

### Hero Section

Centered, 24px below close button.

**Gold Star Mark:**

- Two overlapping rotated squares (32×32px each, border-radius 6px, #F59E0B)
- Square 1: rotated 45deg, opacity 0.50
- Square 2: rotated 22deg, opacity 0.85
- White center dot: 14px circle, opacity 0.90
- Total container: 56×56px, centered

**Title:**

- "SplitEasy Premium" — Inter 700, 26px, white, centered, 16px below star mark

**Subtitle:**

- "Everything you need to split smarter"
- Inter 400, 14px, rgba(255,255,255,0.65), centered, 8px below title

### Feature List

20px side padding, 24px below subtitle. Gap: 12px between rows.

**Each row:**

- Gold check circle: 22px, #F59E0B bg, white checkmark inside
- Feature text: Inter 500, 15px, white, flex 1, 12px left gap

**6 features:**

1. Unlimited groups — no caps, ever
2. Recurring bills that auto-add themselves
3. AI receipt scanner — snap and split
4. PDF reports for every group
5. Multi-currency at live exchange rates
6. Zero ads, forever

### Plan Cards

20px side margins, 24px below feature list. Two cards side by side, 12px gap.

**Annual card (pre-selected):**

- Background: #EEF2FF (indigo 50)
- Border: 2px #6366F1
- Border-radius: 16px
- "BEST VALUE" badge: absolute top -10px right 12px, #F59E0B bg, #92400E Inter 800 10px, border-radius 999px, 4px 8px padding
- Radio dot: 18px circle, 2px #6366F1 border, filled #6366F1 center dot 8px
- "Annual" — Inter 600, 13px, #64748B
- "$24.99" — Inter 700, 22px, #0F172A
- "per year · save 40%" — Inter 400, 10px, rgba(255,255,255,0.45)

**Monthly card (unselected):**

- Background: rgba(255,255,255,0.08)
- Border: 2px rgba(255,255,255,0.15)
- Border-radius: 16px
- Radio dot: 18px circle, 2px rgba(255,255,255,0.40) border, empty
- "Monthly" — Inter 600, 13px, rgba(255,255,255,0.60)
- "$3.49" — Inter 700, 22px, white
- "per month" — Inter 400, 10px, rgba(255,255,255,0.45)

### CTA Button

Full width minus 40px, 56px, border-radius 14px.

- Background: #6366F1
- "Start 7-Day Free Trial" — Inter 600, 16px, white, centered
- Shadow: 0 8px 32px rgba(99,102,241,0.50), 0 4px 8px rgba(0,0,0,0.10)
- 20px below plan cards

### Below CTA

- "Restore Purchases" — Inter 400, 13px, rgba(255,255,255,0.45), centered, 12px below CTA
- "Cancel anytime. Billed annually." — Inter 400, 10px, rgba(255,255,255,0.30), centered, 8px below restore

### Designer Notes

> The annual plan is pre-selected. This is not an accident — it is the highest-value option for both the user (saves 40%) and the business (higher LTV). Pre-selection removes the decision; the user must actively choose monthly if they want it.
>
> "Start 7-Day Free Trial" is the copy — not "Subscribe" or "Upgrade." Trial removes risk. Risk removal removes hesitation. Hesitation removal drives conversion.
>
> The feature list sells transformation, not features. "Zero ads, forever" is not a feature — it is a promise of a better experience. Every line should make the user feel what life will be like after they subscribe.
>
> The gold star mark is the only gold element on this screen (besides the BEST VALUE badge). Gold = premium. Its presence at the top of the screen sets the tone for everything below it.

---

_SplitEasy Screen Design Specifications — Version 1.0_
_20 screens · 2 worlds · 1 design language_
_Last updated: April 2026_
