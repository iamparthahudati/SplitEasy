# SplitEasy Design System

**Version:** 1.0  
**Platform:** React Native 0.85  
**Last Updated:** 2026-04-24

---

## Overview

SplitEasy uses a dual-mode design language: a **premium dark-indigo universe** for onboarding and a **clean, airy light system** for the main application. All tokens are defined once here and referenced across every screen design document.

---

## 1. Color Palette

### 1.1 Brand Colors

| Token              | Hex       | Usage                                               |
| ------------------ | --------- | --------------------------------------------------- |
| `brand`            | `#6366F1` | Primary actions, FAB, active states, highlights     |
| `brandDark`        | `#4338CA` | Brand pressed states, gradient end                  |
| `brandLight`       | `#EEF2FF` | Brand tinted backgrounds, chips, tags               |
| `brandMid`         | `#C7D2FE` | Brand tinted borders, subtle accents                |
| `logoBlueBrand`    | `#3B5BDB` | App logo, header app name, logo arcs                |
| `heroIndigo`       | `#3730A3` | Group detail hero banner top, nav back chevron      |
| `heroIndigoBright` | `#4F46E5` | Group detail hero banner bottom, expense icon tiles |

### 1.2 Onboarding Colors

| Token              | Hex       | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `onboardingTop`    | `#1A1560` | Gradient band 1 — top of screen    |
| `onboardingMid`    | `#2D2A6E` | Gradient band 2 — middle of screen |
| `onboardingBottom` | `#3730A3` | Gradient band 3 — bottom of screen |

> **Implementation note:** The onboarding gradient is simulated with three stacked `View` layers (each `flex: 1`) inside an `absolute` full-screen container, not a `LinearGradient` component. This avoids native module dependencies and gives precise band control.

### 1.3 Money Colors (Sacred — See Section 9)

| Token             | Hex       | Usage                                               |
| ----------------- | --------- | --------------------------------------------------- |
| `pos`             | `#059669` | Positive balance text (primary)                     |
| `posBg`           | `#D1FAE5` | Positive balance background chip                    |
| `posDark`         | `#065F46` | Positive balance dark variant (pressed, emphasis)   |
| `posAlt`          | `#16A34A` | Positive balance text on light bg (higher contrast) |
| `posBgAlt`        | `#DCFCE7` | Positive balance background chip (alt, lighter)     |
| `neg`             | `#DC2626` | Negative balance text                               |
| `negBg`           | `#FEE2E2` | Negative balance background chip                    |
| `negDark`         | `#991B1B` | Negative balance dark variant (pressed, emphasis)   |
| `zero`            | `#94A3B8` | Zero / settled balance text                         |
| `pend`            | `#D97706` | Pending / awaiting confirmation                     |
| `pendBg`          | `#FEF3C7` | Pending background chip                             |
| `settleGreen`     | `#2D9B6F` | Settle-up CTA button, balance banner base           |
| `settleGreenDark` | `#1A7A52` | Settle-up gradient overlay, pressed state           |

### 1.4 Surface & Background Colors

| Token      | Hex       | Usage                                            |
| ---------- | --------- | ------------------------------------------------ |
| `bg`       | `#F8FAFC` | Default screen background (lightest)             |
| `screenBg` | `#F2F3F7` | Main app screen background (shows between cards) |
| `white`    | `#FFFFFF` | Cards, headers, inputs, modals                   |
| `black`    | `#000000` | Apple sign-in button background                  |

### 1.5 Text Colors

| Token   | Hex       | Usage                                          |
| ------- | --------- | ---------------------------------------------- |
| `text1` | `#0F172A` | Primary text — headings, names, amounts        |
| `text2` | `#334155` | Secondary text — descriptions, labels          |
| `text3` | `#64748B` | Tertiary text — meta, timestamps, placeholders |
| `text4` | `#94A3B8` | Quaternary text — disabled, hints              |

### 1.6 Border Colors

| Token       | Hex       | Usage                                                    |
| ----------- | --------- | -------------------------------------------------------- |
| `border`    | `#F1F5F9` | Subtle separators, card inner dividers                   |
| `borderMid` | `#E2E8F0` | Input borders, search bar borders, settled badge borders |

---

## 2. Typography Scale

**Font family:** System default (`-apple-system` / `Roboto`) unless a custom font is specified.

### 2.1 Font Sizes

| Token  | px  | Typical Usage                                     |
| ------ | --- | ------------------------------------------------- |
| `xs`   | 10  | Version strings, micro labels                     |
| `sm`   | 12  | Section headers (uppercase), meta text, subtitles |
| `base` | 14  | Body text, input text, button labels (secondary)  |
| `md`   | 16  | List item names, card titles, input labels        |
| `lg`   | 18  | Screen titles, header app name                    |
| `xl`   | 20  | Hero group name, modal headings                   |
| `2xl`  | 24  | Section amounts, summary figures                  |
| `3xl`  | 30  | Large balance displays                            |
| `4xl`  | 36  | Primary balance hero amount                       |

### 2.2 Font Weights

| Token       | Value | Usage                                      |
| ----------- | ----- | ------------------------------------------ |
| `regular`   | 400   | Body copy, meta, subtitles                 |
| `medium`    | 500   | Secondary labels, tab labels               |
| `semibold`  | 600   | Section headers, badge text, button labels |
| `bold`      | 700   | Card names, amounts, headings              |
| `extrabold` | 800   | Hero amounts, splash wordmark              |

### 2.3 Letter Spacing Reference

| Context                    | Value         | Notes                              |
| -------------------------- | ------------- | ---------------------------------- |
| Hero amounts               | `-0.5`        | Tighter for large numerals         |
| Card names                 | `-0.1`        | Slightly tighter for readability   |
| Section labels (uppercase) | `0.8` — `1.2` | Wider tracking for all-caps labels |
| Stat labels (uppercase)    | `1.2`         | Maximum tracking for small caps    |
| Avatar initials            | `0.5`         | Slight expansion for legibility    |
| Default body               | `0`           | No adjustment                      |

### 2.4 Line Height Reference

| Context            | Line Height   | Notes                                      |
| ------------------ | ------------- | ------------------------------------------ |
| Single-line labels | `1.0` (tight) | Buttons, badges, stat values               |
| Body text          | `1.4`         | Descriptions, subtitles                    |
| Multi-line copy    | `1.6`         | Onboarding taglines, empty state subtitles |

---

## 3. Spacing System

**Base unit:** 4px. All spacing values are multiples of 4.

| Token     | px  | Common Usage                                       |
| --------- | --- | -------------------------------------------------- |
| `space1`  | 4   | Icon-to-label gap, micro padding                   |
| `space2`  | 8   | Inner card padding (tight), badge padding          |
| `space3`  | 12  | Input vertical padding, list item vertical padding |
| `space4`  | 16  | Standard horizontal screen margin, card padding    |
| `space5`  | 20  | Section vertical spacing                           |
| `space6`  | 24  | Card internal padding, modal padding               |
| `space7`  | 28  | Large section gaps                                 |
| `space8`  | 32  | Hero section padding                               |
| `space10` | 40  | Onboarding vertical rhythm                         |
| `space12` | 48  | Large vertical gaps                                |
| `space14` | 56  | Button height reference                            |
| `space16` | 64  | Tab bar height reference                           |

### 3.1 Screen Margins

- **Horizontal screen margin:** 16px (`space4`) on all main app screens
- **Onboarding horizontal margin:** 24px (`space6`) for wider breathing room
- **Card internal padding:** 16px (`space4`) horizontal, 16px vertical

---

## 4. Border Radius Tokens

| Token      | px  | Usage                                                 |
| ---------- | --- | ----------------------------------------------------- |
| `radiusXl` | 24  | Modals, bottom sheets, large cards                    |
| `radiusLg` | 16  | Standard cards, banners, search bars (alt)            |
| `radiusMd` | 12  | Inputs, icon tiles, small cards, buttons              |
| `radiusSm` | 10  | Chips, tags, secondary buttons                        |
| `radiusXs` | 8   | Badges, small chips                                   |
| `pill`     | 999 | Fully rounded — buttons, avatars, FAB, dot indicators |

---

## 5. Shadow System

SplitEasy uses **brand-tinted shadows only**. Neutral grey shadows are never used — they flatten the design and break the color language.

### 5.1 Shadow Tokens

| Name            | Color     | Opacity | Radius | Offset Y | Elevation | Usage                                      |
| --------------- | --------- | ------- | ------ | -------- | --------- | ------------------------------------------ |
| `shadowBrand`   | `#6366F1` | 0.35    | 8      | 4        | 6         | FAB, primary CTA buttons                   |
| `shadowBrandSm` | `#6366F1` | 0.20    | 4      | 2        | 3         | Active tab indicator, small brand elements |
| `shadowSettle`  | `#2D9B6F` | 0.30    | 6      | 3        | 4         | Settle-up buttons                          |
| `shadowCard`    | `#6366F1` | 0.06    | 12     | 4        | 2         | Elevated cards (use sparingly)             |

### 5.2 Shadow Implementation (React Native)

```js
// FAB shadow
shadowColor: '#6366F1',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.35,
shadowRadius: 8,
elevation: 6,

// Settle button shadow
shadowColor: '#2D9B6F',
shadowOffset: { width: 0, height: 3 },
shadowOpacity: 0.30,
shadowRadius: 6,
elevation: 4,
```

> **Rule:** If a shadow must be neutral (e.g., system modal overlay), use `rgba(0,0,0,0.08)` at most. Never use grey shadows on brand UI elements.

---

## 6. Gradient Patterns

Gradients in SplitEasy are simulated with **layered `View` components** set to `position: absolute` and `flex: 1`, stacked inside a parent with `overflow: hidden`. This avoids `react-native-linear-gradient` as a hard dependency.

### 6.1 Pattern A — Onboarding Vignette (3-Band)

Used on: SplashScreen, WelcomeScreen, SignInScreen

```
┌─────────────────────────────┐
│  Band 1: #1A1560  (flex 1)  │  ← onboardingTop
│─────────────────────────────│
│  Band 2: #2D2A6E  (flex 1)  │  ← onboardingMid
│─────────────────────────────│
│  Band 3: #3730A3  (flex 1)  │  ← onboardingBottom
└─────────────────────────────┘
```

**Implementation:**

```jsx
<View style={StyleSheet.absoluteFill}>
  <View style={{ flex: 1, backgroundColor: '#1A1560' }} />
  <View style={{ flex: 1, backgroundColor: '#2D2A6E' }} />
  <View style={{ flex: 1, backgroundColor: '#3730A3' }} />
</View>
```

### 6.2 Pattern B — Hero Banner Hard Split (2-Band)

Used on: GroupDetailScreen HeroBanner, BalanceBanner

```
┌─────────────────────────────┐
│  Band 1: top color (50%)    │
│─────────────────────────────│
│  Band 2: bottom color (50%) │
└─────────────────────────────┘
```

**Group Detail Hero:**

- Top 50%: `heroIndigo` `#3730A3`
- Bottom 50%: `heroIndigoBright` `#4F46E5`

**Balance Banner:**

- Base: `settleGreen` `#2D9B6F`
- Overlay from top 40%: `settleGreenDark` `#1A7A52` at opacity `0.55`

```jsx
// Balance Banner implementation
<View
  style={{ backgroundColor: '#2D9B6F', borderRadius: 16, overflow: 'hidden' }}
>
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: '#1A7A52',
      opacity: 0.55,
    }}
  />
  {/* content */}
</View>
```

### 6.3 Radial Glow Overlays

Used on onboarding screens to add depth behind the logo.

| Screen       | Size           | Color     | Opacity | Position              |
| ------------ | -------------- | --------- | ------- | --------------------- |
| SplashScreen | 220px diameter | `#FFFFFF` | 0.05    | Centered behind logo  |
| SignInScreen | 480px diameter | `#4C1D95` | 0.55    | Centered, upper third |

```jsx
// Radial glow (simulated with borderRadius: 9999)
<View
  style={{
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'center',
  }}
/>
```

---

## 7. Component Size Tokens

| Token          | px  | Description                            |
| -------------- | --- | -------------------------------------- |
| `btnHeight`    | 56  | Primary button height                  |
| `btnHeightSm`  | 44  | Secondary / compact button height      |
| `tabBarHeight` | 64  | Bottom tab bar total height            |
| `headerHeight` | 56  | Navigation header height               |
| `avatarSm`     | 32  | Small avatar (comments, compact lists) |
| `avatarMd`     | 40  | Medium avatar (balance rows)           |
| `avatarLg`     | 56  | Large avatar (profile, group hero)     |
| `fabSize`      | 56  | Floating action button diameter        |
| `iconSm`       | 16  | Small icon (inline, badge)             |
| `iconMd`       | 20  | Medium icon (list item, button)        |
| `iconLg`       | 24  | Large icon (header, FAB, nav)          |

### 7.1 Avatar Pill

All avatars use `borderRadius: 999` (pill). Background color is per-entity (group color, user color). Initials are white, `bold`, `letterSpacing: 0.5`.

| Size       | Diameter | Font Size | Font Weight |
| ---------- | -------- | --------- | ----------- |
| `avatarSm` | 32px     | 12px      | 700         |
| `avatarMd` | 40px     | 14px      | 700         |
| `avatarLg` | 56px     | 18px      | 700         |

---

## 8. White Opacity Scale (Dark Backgrounds)

Used exclusively on onboarding screens and dark hero banners. Never use on light backgrounds.

| Role            | Opacity | Hex Equivalent (on `#1A1560`) | Usage                             |
| --------------- | ------- | ----------------------------- | --------------------------------- |
| Primary text    | 100%    | `#FFFFFF`                     | Logo, main headings, CTA labels   |
| Body text       | 65%     | `rgba(255,255,255,0.65)`      | Slide descriptions, body copy     |
| Sub text        | 45%     | `rgba(255,255,255,0.45)`      | Supporting labels, secondary info |
| Tagline         | 40%     | `rgba(255,255,255,0.40)`      | Splash tagline, welcome subtitle  |
| Placeholder     | 35%     | `rgba(255,255,255,0.35)`      | Input placeholder text            |
| Version / legal | 20%     | `rgba(255,255,255,0.20)`      | Version string, fine print        |

---

## 9. Money Color Language (Sacred Rules)

These rules are **non-negotiable** and must never be broken across any screen, component, or state.

| Rule                   | Specification                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------- |
| **Positive balance**   | Always `posAlt` `#16A34A` text on light bg; `pos` `#059669` on white cards            |
| **Negative balance**   | Always `neg` `#DC2626` text; `negBg` `#FEE2E2` chip background                        |
| **Zero / settled**     | Always `zero` `#94A3B8` text; `borderMid` `#E2E8F0` chip border                       |
| **Pending**            | Always `pend` `#D97706` text; `pendBg` `#FEF3C7` chip background                      |
| **Never mix**          | Do not use brand indigo for any monetary value                                        |
| **Never grey amounts** | Do not use `text3` or `text4` for any monetary amount — use the money tokens          |
| **Chip anatomy**       | Badge = colored bg + matching text, no border (except settled which uses border only) |
| **Settle CTA**         | Always `settleGreen` `#2D9B6F` — never brand indigo for settle actions                |
| **Large hero amounts** | Use `white` on dark banners; use `pos`/`neg` on light backgrounds                     |
| **Letter spacing**     | All monetary amounts at `4xl` or larger use `letterSpacing: -0.5`                     |

---

## 10. Design Principles

1. **Depth through color, not shadow.** Use brand-tinted shadows and layered backgrounds to create hierarchy. Avoid neutral grey shadows entirely.

2. **Cards float on the background.** The `screenBg` `#F2F3F7` is always visible between white cards. Never let cards bleed edge-to-edge on the main app screens.

3. **Money is sacred.** The money color language (Section 9) is the most important visual system in the app. Consistency here builds user trust.

4. **Dark onboarding, light app.** The two modes are completely separate. Never mix onboarding dark tokens into the main app, and never use light app tokens on onboarding screens.

5. **Typography does the heavy lifting.** Use size and weight contrast aggressively. A 36px bold amount next to a 12px semibold label creates hierarchy without decoration.

6. **Separators are inset, not full-width.** List separators always start at the content edge (after avatar/icon), never from the screen edge. This creates a floating, modern list feel.

7. **Interactions are physical.** Press states use spring animations (scale 0.97), not opacity flashes. The UI should feel tactile and responsive.

8. **Brand color is earned.** Use `brand` `#6366F1` only for primary actions (FAB, primary CTA, active tab). Do not scatter it across decorative elements.

9. **Whitespace is intentional.** Every spacing value comes from the 4px grid. No arbitrary values. Consistent rhythm creates a premium feel.

10. **Accessibility is non-negotiable.** All text on colored backgrounds must meet WCAG AA contrast. Money amounts must always be distinguishable by color AND by sign (+/-).

---

## 11. Interaction Patterns

### 11.1 Press States

| Element        | Press Behavior                      | Animation                      |
| -------------- | ----------------------------------- | ------------------------------ |
| Primary button | Scale `1.0 → 0.97 → 1.0`            | Spring: tension 52, friction 8 |
| List row       | Background `rgba(0,0,0,0.03)` flash | 150ms ease                     |
| FAB            | Scale `1.0 → 0.93 → 1.0`            | Spring: tension 60, friction 7 |
| Icon button    | Opacity `1.0 → 0.6`                 | 120ms ease                     |
| Card           | Scale `1.0 → 0.985`                 | Spring: tension 40, friction 9 |

### 11.2 Spring Animation Presets

```js
// Standard button spring
{ tension: 52, friction: 8 }

// FAB spring (snappier)
{ tension: 60, friction: 7 }

// Card spring (softer)
{ tension: 40, friction: 9 }

// Splash logo entrance
{ tension: 52, friction: 8 }  // scale 0.72 → 1.0
```

### 11.3 Transition Durations

| Event                    | Duration | Easing                   |
| ------------------------ | -------- | ------------------------ |
| Opacity fade in          | 380ms    | `ease-out`               |
| Tagline fade in          | 400ms    | `ease-out` (280ms delay) |
| Screen navigation        | 300ms    | iOS default slide        |
| Dot indicator transition | 200ms    | `ease-in-out`            |
| Badge color change       | 150ms    | `ease`                   |

### 11.4 Focus States (Inputs)

- Border changes from `rgba(255,255,255,0.15)` → `rgba(255,255,255,0.50)` on dark screens
- Border changes from `borderMid` `#E2E8F0` → `brand` `#6366F1` on light screens
- No scale animation on inputs — only border color transition (200ms)

---

## 12. Layout Architecture

### 12.1 Screen Structure

```
┌─────────────────────────────────────────┐
│  StatusBar (transparent, light/dark)    │
├─────────────────────────────────────────┤
│  Header / NavBar (56px)                 │
│  [white bg, no shadow, hairline bottom] │
├─────────────────────────────────────────┤
│                                         │
│  ScrollView / FlatList                  │
│  Background: screenBg #F2F3F7           │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Card (white, radius 16)          │  │  ← marginHorizontal 16
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Card (white, radius 16)          │  │
│  └───────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│  Tab Bar (64px)                         │
│  [white bg, top hairline border]        │
└─────────────────────────────────────────┘
```

### 12.2 Depth Hierarchy

| Layer          | Z-Index | Elements                    |
| -------------- | ------- | --------------------------- |
| Background     | 0       | `screenBg` fill             |
| Cards          | 1       | White card panels           |
| Sticky headers | 10      | Section headers, search bar |
| FAB            | 20      | Floating action button      |
| Tab bar        | 30      | Bottom navigation           |
| Modal overlay  | 40      | Dimmed backdrop             |
| Modal sheet    | 50      | Bottom sheet, dialog        |
| Toast          | 60      | Notification toasts         |

### 12.3 Separator Strategy

**Rule:** Separators are always inset from the left edge to align with content, never full-width.

| Context                            | Inset Left | Inset Right | Color                                        |
| ---------------------------------- | ---------- | ----------- | -------------------------------------------- |
| Group list (with 48px icon tile)   | 76px       | 0           | `border` `#F1F5F9`                           |
| Expense list (with 44px icon tile) | 72px       | 16px        | `border` `#F1F5F9`                           |
| Balance list (with 44px avatar)    | 72px       | 0           | `border` `#F1F5F9`                           |
| Hero banner stat divider           | —          | —           | `rgba(255,255,255,0.25)` vertical, 52px tall |
| Hero banner horizontal divider     | —          | —           | `rgba(255,255,255,0.25)` 1px                 |

### 12.4 Header Anatomy

```
┌─────────────────────────────────────────┐
│  [Left slot]  [Center slot]  [Right slot]│  height: 56px
│  icon/back    logo+title     action btn  │  paddingHorizontal: 16px
└─────────────────────────────────────────┘
         ↓ hairline border bottom: 1px #F1F5F9
```

- Left slot: back chevron or menu icon, 24px, `heroIndigo` on group screens, `text1` on main screens
- Center slot: logo (24–28px) + title text, horizontally centered
- Right slot: icon button, 40×40 pill, `border` bg on main screens

### 12.5 Tab Bar Anatomy

```
┌─────────────────────────────────────────┐
│  [Home]  [Activity]  [Friends]  [Profile]│  height: 64px
│  icon    icon        icon       icon     │  paddingBottom: safe area
│  label   label       label      label    │
└─────────────────────────────────────────┘
```

- Active tab: icon `brand` `#6366F1`, label `brand` `semibold`
- Inactive tab: icon `text4` `#94A3B8`, label `text4` `regular`
- Top border: 1px `border` `#F1F5F9`
- Background: `white`
