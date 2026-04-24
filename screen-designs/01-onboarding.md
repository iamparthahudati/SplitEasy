# Onboarding Flow — Screen Design

**Screens:** SplashScreen, WelcomeScreen, SignInScreen  
**Design Mode:** Dark Indigo Universe  
**Last Updated:** 2026-04-24

---

## Overview

The onboarding flow is the user's first impression of SplitEasy. It uses a deep indigo universe — a three-band layered background that evokes depth and premium quality — to establish brand identity before the user reaches the clean light main app. The flow is linear: Splash → Welcome (3 slides) → Sign In.

**User flow context:**

1. App launches → SplashScreen (2 seconds, animated logo entrance)
2. First launch only → WelcomeScreen (3 swipeable slides with dot indicator)
3. All launches after splash → SignInScreen (auth options + email/password form)

---

## Screen 1: SplashScreen

### Purpose

Brand moment. Establishes the SplitEasy identity with a confident logo animation before navigating automatically to the next screen. No user interaction required.

### Visual Design

#### Background

Three stacked `View` layers, each `flex: 1`, inside an `absoluteFill` container:

| Band   | Color              | Hex       |
| ------ | ------------------ | --------- |
| Top    | `onboardingTop`    | `#1A1560` |
| Middle | `onboardingMid`    | `#2D2A6E` |
| Bottom | `onboardingBottom` | `#3730A3` |

#### Radial Glow

A single circular `View` centered behind the logo:

| Property      | Value                                            |
| ------------- | ------------------------------------------------ |
| Diameter      | 220px                                            |
| Border radius | 110px (pill)                                     |
| Background    | `rgba(255,255,255,0.05)`                         |
| Position      | `absolute`, centered horizontally and vertically |

#### Logo Mark

The SplitEasy logo is a **split circle** — a single circle divided by a 1px vertical white line down the center:

| Property             | Value                                       |
| -------------------- | ------------------------------------------- |
| Total diameter       | 72px                                        |
| Left half            | Solid white fill (`#FFFFFF`)                |
| Right half           | Transparent fill, white stroke outline only |
| Center divider       | 1px vertical line, `#FFFFFF`                |
| Border (full circle) | 2px white stroke                            |

**Implementation approach:** Two `View` components side by side inside a `View` with `borderRadius: 36` and `overflow: hidden`. Left view: `backgroundColor: '#FFFFFF'`. Right view: `backgroundColor: 'transparent'`, `borderWidth: 2`, `borderColor: '#FFFFFF'`. A 1px absolute `View` centered vertically.

#### Wordmark

Positioned 16px below the logo mark:

| Property       | Value           |
| -------------- | --------------- |
| Text           | "SplitEasy"     |
| Font size      | 28px            |
| Font weight    | 800 (extrabold) |
| Color          | `#FFFFFF`       |
| Letter spacing | 0               |

#### Tagline

Positioned 12px below the wordmark:

| Property       | Value                        |
| -------------- | ---------------------------- |
| Text           | "Split bills. Stay friends." |
| Font size      | 14px                         |
| Font weight    | 400 (regular)                |
| Color          | `rgba(255,255,255,0.40)`     |
| Letter spacing | 0.3                          |

#### Version String

Pinned to the bottom of the screen, 32px above the safe area:

| Property    | Value                    |
| ----------- | ------------------------ |
| Text        | "v1.0.0"                 |
| Font size   | 10px                     |
| Font weight | 400                      |
| Color       | `rgba(255,255,255,0.20)` |

### Layout

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│         [Radial glow 220px]             │
│              [Logo 72px]                │
│           [Wordmark 28px]               │
│           [Tagline 14px]                │
│                                         │
│                                         │
│                                         │
│              [v1.0.0]                   │
└─────────────────────────────────────────┘
```

All logo content is vertically centered with a slight upward offset of 24px (to account for visual center vs geometric center).

### Animation Sequence

| Step | Element              | Animation                                     | Duration | Delay  |
| ---- | -------------------- | --------------------------------------------- | -------- | ------ |
| 1    | Logo mark + wordmark | Scale `0.72 → 1.0` (spring) + opacity `0 → 1` | 380ms    | 0ms    |
| 2    | Tagline              | Opacity `0 → 1`                               | 400ms    | 280ms  |
| 3    | Navigate             | Auto-navigate to WelcomeScreen                | —        | 2000ms |

**Spring config for logo entrance:**

```js
{ tension: 52, friction: 8 }
```

The scale starts at `0.72` — small enough to feel like it's emerging, large enough to not feel like a pop-in. The spring config produces a single subtle overshoot before settling.

---

## Screen 2: WelcomeScreen

### Purpose

Three-slide carousel that communicates the app's core value propositions before the user signs in. Swipeable horizontally. Dot indicator shows progress. A single CTA button advances or completes the flow.

### Visual Design

#### Background

Same three-band layered gradient as SplashScreen (`#1A1560` / `#2D2A6E` / `#3730A3`).

#### Slide Content Area

Each slide occupies the full screen width. Content is vertically centered with `paddingHorizontal: 32px`.

**Slide illustration area:**

- Height: 240px
- Content: SVG illustration or Lottie animation (per slide)
- Centered horizontally

**Slide text block** (below illustration, 40px gap):

| Element     | Size | Weight        | Color                    | Spacing               |
| ----------- | ---- | ------------- | ------------------------ | --------------------- |
| Slide title | 26px | 700 (bold)    | `#FFFFFF`                | `letterSpacing: -0.3` |
| Slide body  | 15px | 400 (regular) | `rgba(255,255,255,0.65)` | `lineHeight: 22`      |

Gap between title and body: 12px.

**Slide content:**

| Slide | Title                       | Body                                                                                          |
| ----- | --------------------------- | --------------------------------------------------------------------------------------------- |
| 1     | "Split any bill, instantly" | "Add expenses on the go and let SplitEasy calculate who owes what — automatically."           |
| 2     | "Groups for every occasion" | "Create groups for trips, dinners, housemates, or anything else. Everyone stays in the loop." |
| 3     | "Settle up with one tap"    | "See your balances at a glance and settle up with friends in seconds."                        |

#### Dot Indicator

Positioned 40px below the slide text block, centered horizontally.

| State    | Width | Height | Border radius | Color                    |
| -------- | ----- | ------ | ------------- | ------------------------ |
| Active   | 20px  | 6px    | 999 (pill)    | `#FFFFFF`                |
| Inactive | 6px   | 6px    | 999 (pill)    | `rgba(255,255,255,0.30)` |

Gap between dots: 6px. Transition between states: 200ms ease-in-out (width animates via `Animated.Value`).

#### CTA Button

Positioned 32px below the dot indicator. `marginHorizontal: 24px`. Full width of content area.

| Property      | Value                                         |
| ------------- | --------------------------------------------- |
| Height        | 56px                                          |
| Border radius | 14px                                          |
| Background    | `#FFFFFF`                                     |
| Text          | "Next" (slides 1–2) / "Get Started" (slide 3) |
| Text color    | `#1A1560` (`onboardingTop`)                   |
| Font size     | 16px                                          |
| Font weight   | 700 (bold)                                    |

**Press animation:** Spring scale `1.0 → 0.97 → 1.0` (tension 52, friction 8).

#### Skip Link

Top-right corner, `paddingTop: 16px + safeAreaTop`, `paddingRight: 20px`:

| Property    | Value                    |
| ----------- | ------------------------ |
| Text        | "Skip"                   |
| Font size   | 14px                     |
| Font weight | 500 (medium)             |
| Color       | `rgba(255,255,255,0.45)` |

### Layout

```
┌─────────────────────────────────────────┐
│                          [Skip]         │  ← safeAreaTop + 16px
│                                         │
│                                         │
│         [Illustration 240px]            │
│                                         │
│         [Slide Title 26px]              │  ← 40px below illustration
│         [Slide Body 15px]               │  ← 12px below title
│                                         │
│         [● ○ ○]  Dot indicator          │  ← 40px below body
│                                         │
│         [    Next / Get Started    ]    │  ← 32px below dots
│                                         │
└─────────────────────────────────────────┘
```

---

## Screen 3: SignInScreen

### Purpose

Authentication entry point. Supports Apple Sign In, Google Sign In, email/password, and guest access. The logo is redesigned with an amber accent to signal the transition from pure branding to action.

### Visual Design

#### Background

Same three-band layered gradient (`#1A1560` / `#2D2A6E` / `#3730A3`).

#### Radial Glow

Larger glow than splash, centered in the upper third of the screen:

| Property      | Value                                           |
| ------------- | ----------------------------------------------- |
| Diameter      | 480px                                           |
| Border radius | 240px                                           |
| Background    | `rgba(76,29,149,0.55)`                          |
| Position      | `absolute`, centered horizontally, top: `-80px` |

#### Logo Mark (Asymmetric Variant)

The sign-in logo introduces amber as a secondary brand color:

| Property       | Value                                          |
| -------------- | ---------------------------------------------- |
| Total diameter | 64px                                           |
| Left arc       | Solid white fill                               |
| Right arc      | `#F59E0B` (amber) fill                         |
| Center divider | 1px vertical line, `#F59E0B` (amber)           |
| Border         | 2px stroke — left half white, right half amber |

#### Wordmark (Two-Color)

Positioned 14px below the logo mark:

| Part        | Text    | Color     | Size | Weight          |
| ----------- | ------- | --------- | ---- | --------------- |
| First word  | "Split" | `#FFFFFF` | 26px | 800 (extrabold) |
| Second word | "Easy"  | `#F59E0B` | 26px | 800 (extrabold) |

Both words on the same line, no space between — the color break is the separator.

#### Tagline

12px below the wordmark:

| Property    | Value                        |
| ----------- | ---------------------------- |
| Text        | "Split bills. Stay friends." |
| Font size   | 13px                         |
| Font weight | 400                          |
| Color       | `rgba(255,255,255,0.40)`     |

#### Auth Button Stack

Positioned below the logo block, `marginTop: 48px`, `paddingHorizontal: 24px`. Buttons are stacked vertically with 12px gap between each.

**Button specifications:**

| Button         | Height | Radius | Background               | Border                       | Text Color               | Text                   | Icon                  |
| -------------- | ------ | ------ | ------------------------ | ---------------------------- | ------------------------ | ---------------------- | --------------------- |
| Apple Sign In  | 56px   | 14px   | `#000000`                | none                         | `#FFFFFF`                | "Continue with Apple"  | Apple logo 20px white |
| Google Sign In | 56px   | 14px   | `#FFFFFF`                | none                         | `#0F172A`                | "Continue with Google" | Google logo 20px      |
| Email          | 56px   | 14px   | `rgba(255,255,255,0.07)` | 1px `rgba(255,255,255,0.15)` | `#FFFFFF`                | "Continue with Email"  | Mail icon 20px white  |
| Guest          | 56px   | 14px   | `transparent`            | 1px `rgba(255,255,255,0.20)` | `rgba(255,255,255,0.65)` | "Continue as Guest"    | none                  |

Button text: 15px, semibold (600). Icon is left-aligned, 20px from left edge. Text is centered in remaining space.

#### Divider (between social and email buttons)

A horizontal rule with centered "or" label, positioned between Google and Email buttons:

| Property        | Value                                          |
| --------------- | ---------------------------------------------- |
| Line color      | `rgba(255,255,255,0.15)`                       |
| Line height     | 1px                                            |
| "or" text       | 12px, regular, `rgba(255,255,255,0.35)`        |
| "or" background | matches gradient (use `paddingHorizontal: 12`) |

#### Email/Password Form (expanded state)

When "Continue with Email" is tapped, the button stack collapses and the email form expands in its place (animated, 300ms ease-out).

**Input field specs:**

| Property           | Value                        |
| ------------------ | ---------------------------- |
| Height             | 52px                         |
| Border radius      | 12px                         |
| Background         | `rgba(255,255,255,0.08)`     |
| Border             | 1px `rgba(255,255,255,0.15)` |
| Border (focused)   | 1px `rgba(255,255,255,0.50)` |
| Text color         | `#FFFFFF`                    |
| Placeholder color  | `rgba(255,255,255,0.35)`     |
| Font size          | 14px                         |
| Padding horizontal | 16px                         |

Fields: Email (top), Password (bottom), 12px gap between.

**Sign In button** (below inputs, 16px gap):

- Same as primary CTA: white bg, `#1A1560` text, 56px height, 14px radius

**Forgot password link** (below sign in button, 12px gap):

- Text: "Forgot password?"
- 13px, regular, `rgba(255,255,255,0.45)`
- Centered

#### Terms Footer

Pinned to bottom, 24px above safe area:

| Property           | Value                                                    |
| ------------------ | -------------------------------------------------------- |
| Text               | "By continuing, you agree to our Terms & Privacy Policy" |
| Font size          | 11px                                                     |
| Font weight        | 400                                                      |
| Color              | `rgba(255,255,255,0.20)`                                 |
| Alignment          | Center                                                   |
| Padding horizontal | 32px                                                     |

### Layout

```
┌─────────────────────────────────────────┐
│  [Radial glow 480px — upper third]      │
│                                         │
│         [Logo mark 64px]                │  ← vertically centered, upper 40%
│         [SplitEasy wordmark 26px]       │
│         [Tagline 13px]                  │
│                                         │
│  ┌─────────────────────────────────┐    │  ← marginTop 48px
│  │  [Apple Sign In]                │    │
│  │  [Google Sign In]               │    │
│  │  ─────── or ───────             │    │
│  │  [Continue with Email]          │    │
│  │  [Continue as Guest]            │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Terms & Privacy]                      │  ← bottom safe area
└─────────────────────────────────────────┘
```

---

## Interaction States

### Button States

| State    | Visual Change                        |
| -------- | ------------------------------------ |
| Default  | As specified above                   |
| Pressed  | Scale `0.97`, 120ms spring           |
| Loading  | Spinner replaces text, opacity `0.7` |
| Disabled | Opacity `0.4`, no press animation    |

### Input States

| State   | Border Color             |
| ------- | ------------------------ |
| Default | `rgba(255,255,255,0.15)` |
| Focused | `rgba(255,255,255,0.50)` |
| Error   | `#DC2626` (neg)          |
| Filled  | `rgba(255,255,255,0.25)` |

### Error State

Below the relevant input, 6px gap:

- Text: error message
- Font size: 12px
- Color: `#FCA5A5` (light red, readable on dark bg)
- Icon: exclamation circle 14px, same color

---

## AI Prompt — SplashScreen

```
Design a premium mobile splash screen for a bill-splitting app called SplitEasy.

Background: Three stacked horizontal bands creating a deep indigo gradient — top band #1A1560,
middle band #2D2A6E, bottom band #3730A3. Each band takes equal vertical space.

Behind the logo, place a soft radial glow: a 220px circle with rgba(255,255,255,0.05) background,
perfectly centered.

Logo mark: A 72px circle split vertically down the center by a 1px white line. Left half is solid
white. Right half is transparent with a white outline stroke (2px). The full circle has a 2px white
border. This represents the "split" concept visually.

Below the logo (16px gap): wordmark "SplitEasy" in 28px extrabold white, letter-spacing 0.

Below the wordmark (12px gap): tagline "Split bills. Stay friends." in 14px regular white at 40%
opacity, letter-spacing 0.3.

All logo content is vertically centered with a slight upward offset of 24px.

Bottom of screen (32px above safe area): version string "v1.0.0" in 10px regular white at 20% opacity.

The overall feel should be: premium, confident, deep space. No decorative elements beyond the radial
glow. The logo animation enters with a spring scale from 0.72 to 1.0 (tension 52, friction 8)
combined with an opacity fade from 0 to 1 over 380ms. The tagline fades in 280ms later over 400ms.
```

---

## AI Prompt — WelcomeScreen

```
Design a premium mobile onboarding carousel screen for a bill-splitting app called SplitEasy.

Background: Same three-band deep indigo gradient as the splash screen (#1A1560 / #2D2A6E / #3730A3).

Top-right corner: a "Skip" text link in 14px medium white at 45% opacity, with safe area padding.

Center of screen: a 240px tall illustration area (placeholder for Lottie or SVG illustration).

Below the illustration (40px gap): slide title in 26px bold white, letter-spacing -0.3.
Below the title (12px gap): slide body text in 15px regular white at 65% opacity, line-height 22,
centered, paddingHorizontal 32px.

Below the body text (40px gap): a dot indicator row centered horizontally.
- Active dot: 20px wide, 6px tall, border-radius 999, solid white
- Inactive dots: 6px wide, 6px tall, border-radius 999, white at 30% opacity
- Gap between dots: 6px
- Active dot width animates smoothly between states (200ms ease-in-out)

Below the dots (32px gap): a full-width CTA button (marginHorizontal 24px).
- Height: 56px, border-radius 14px
- Background: solid white #FFFFFF
- Text: "Next" (slides 1-2) or "Get Started" (slide 3)
- Text color: #1A1560 (deep indigo), 16px bold
- Press state: spring scale 0.97 (tension 52, friction 8)

The design should feel like a premium fintech onboarding — clean, spacious, confident.
The white CTA button on the dark background creates a strong visual anchor at the bottom.
```

---

## AI Prompt — SignInScreen

```
Design a premium mobile sign-in screen for a bill-splitting app called SplitEasy.

Background: Three-band deep indigo gradient (#1A1560 / #2D2A6E / #3730A3).

Upper third: a large 480px radial glow circle with rgba(76,29,149,0.55) background, centered
horizontally, offset -80px from top. This creates a subtle purple bloom behind the logo.

Logo mark (64px diameter): An asymmetric split circle. Left half solid white. Right half solid
amber #F59E0B. Center divider is a 1px amber line. Left border arc is white, right border arc
is amber. This amber accent signals action and energy.

Below logo (14px gap): two-color wordmark "SplitEasy" in 26px extrabold.
- "Split" in white #FFFFFF
- "Easy" in amber #F59E0B
Both on the same line, no space — the color break is the visual separator.

Below wordmark (12px gap): tagline "Split bills. Stay friends." in 13px regular white at 40% opacity.

Auth button stack (marginTop 48px, paddingHorizontal 24px, 12px gap between buttons):
1. Apple Sign In: 56px height, 14px radius, solid black background, white text "Continue with Apple",
   Apple logo icon left-aligned
2. Google Sign In: 56px height, 14px radius, solid white background, dark text "Continue with Google",
   Google logo icon left-aligned
3. Horizontal divider with centered "or" label (white at 35% opacity, 1px lines at 15% opacity)
4. Email: 56px height, 14px radius, frosted glass rgba(255,255,255,0.07) background,
   1px rgba(255,255,255,0.15) border, white text "Continue with Email", mail icon
5. Guest: 56px height, 14px radius, transparent background, 1px rgba(255,255,255,0.20) border,
   white at 65% opacity text "Continue as Guest"

All button text: 15px semibold.

Bottom (24px above safe area): terms text "By continuing, you agree to our Terms & Privacy Policy"
in 11px regular white at 20% opacity, centered, paddingHorizontal 32px.

The overall feel: premium fintech sign-in. The amber accent on the logo creates visual tension and
energy. The button hierarchy (black → white → frosted → ghost) guides the eye naturally from
primary to secondary actions.
```
