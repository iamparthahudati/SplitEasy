# SplitEasy — Complete Designer Reference

This document is the single source of truth for every screen, component, and
design token in the SplitEasy app. Organized in user-journey order: logo →
onboarding → main tabs → detail screens → settings → premium. Read it top to
bottom to understand the full visual language, or jump to any section you need.

---

## 0. DESIGN SYSTEM

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `brand` | `#6366F1` | Indigo 500 — primary buttons, FAB, links, active state |
| `brandDark` | `#4338CA` | Indigo 700 — pressed / hover state |
| `brandLight` | `#EEF2FF` | Indigo 50 — subtle tinted backgrounds |
| `brandMid` | `#C7D2FE` | Indigo 200 — borders on light brand backgrounds |
| `logoBlueBrand` | `#3B5BDB` | Split-circle logo stroke + fill (slightly deeper blue) |
| `onboardingTop` | `#1A1560` | Near-black indigo — top of onboarding gradient |
| `onboardingMid` | `#2D2A6E` | Mid-tone indigo — middle band |
| `onboardingBottom` | `#3730A3` | Bright indigo — bottom band |
| `heroIndigo` | `#3730A3` | Group detail hero banner top half |
| `heroIndigoBright` | `#4F46E5` | Group detail hero banner bottom half |
| `settleGreen` | `#2D9B6F` | Primary settle-up action color |
| `settleGreenDark` | `#1A7A52` | Pressed state for settle-up |
| `pos` | `#059669` | Emerald 600 — money owed TO you (SACRED, never change) |
| `posBg` | `#D1FAE5` | Emerald 100 — positive balance chip background |
| `posDark` | `#065F46` | Emerald 900 — text on green backgrounds |
| `posAlt` | `#16A34A` | Green 600 — hero banner positive balance text |
| `posBgAlt` | `#DCFCE7` | Green 100 — alternate positive backgrounds |
| `neg` | `#DC2626` | Red 600 — money you OWE (SACRED, never change) |
| `negBg` | `#FEE2E2` | Red 100 — negative balance chip background |
| `negDark` | `#991B1B` | Red 900 |
| `zero` | `#94A3B8` | Slate 400 — settled / zero balance |
| `pend` | `#D97706` | Amber 600 — needs action |
| `pendBg` | `#FEF3C7` | Amber 100 — pending backgrounds |
| `bg` | `#F8FAFC` | Slate 50 — default app background |
| `screenBg` | `#F2F3F7` | Groups list / group detail screen background |
| `white` | `#FFFFFF` | Cards, headers |
| `black` | `#000000` | Apple Sign-In button |
| `text1` | `#0F172A` | Slate 900 — primary text |
| `text2` | `#334155` | Slate 700 — secondary text, labels |
| `text3` | `#64748B` | Slate 500 — subtitles, hints |
| `text4` | `#94A3B8` | Slate 400 — placeholder text |
| `border` | `#F1F5F9` | Slate 100 — subtle row separators |
| `borderMid` | `#E2E8F0` | Slate 200 — input field borders |

### Money Color Language (SACRED — never break these rules)

- Positive amount (owed TO you) → `#059669` green
- Negative amount (you OWE) → `#DC2626` red
- Zero / settled → `#94A3B8` grey
- Needs action → `#D97706` amber

### Typography Scale

| Name | Size | Usage |
|---|---|---|
| `xs` | 10px | Version string, micro labels |
| `sm` | 12px | Section labels, badges, subtitles |
| `base` | 14px | Body text, description, subtitles |
| `md` | 15px | Button text, row titles |
| `lg` | 18px | App name in header, screen subtitles |
| `xl` | 20px | Group name in hero banner |
| `2xl` | 24px | Screen headings |
| `3xl` | 28px | Large amounts, hero stat values |
| `4xl` | 36px | Balance banner total amount |

Font weights: `regular` (400), `medium` (500), `semibold` (600), `bold` (700), `extrabold` (800)

### Spacing Scale (base 4px)

| Token | Value |
|---|---|
| space[1] | 4px |
| space[2] | 8px |
| space[3] | 12px |
| space[4] | 16px |
| space[5] | 20px |
| space[6] | 24px |
| space[8] | 32px |
| space[10] | 40px |
| space[16] | 64px |

### Key Sizes

| Name | Value | Usage |
|---|---|---|
| Button height | 56px | All primary/auth buttons |
| FAB | 56×56px | Floating action button |
| Tab bar | 64px | Bottom navigation bar height |
| Icon SM | 16px | Small inline icons |
| Icon MD | 20px | Standard icons |
| Avatar pill | 44px | Balance rows, member lists |

### Border Radius

| Name | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 12px |
| lg | 16px |
| xl | 20px |
| pill | 9999px |

---

## 1. LOGO DESIGN

The SplitEasy logo is a **split circle** — a circle divided vertically in half.
Left half is solid white; right half is transparent (shows whatever is behind).
A 1.5px vertical line divides the two halves. There is no SVG file yet —
currently rendered entirely with View components.

### Variant A — Splash Screen Logo (76px diameter)

- Circle diameter: 76px (radius 38px)
- Left half: solid `#FFFFFF` fill
- Right half: transparent, showing only the circle outline
- Circle outline: 1.5px stroke, `rgba(255,255,255,0.88)` — slightly off-white
- Center divider line: 1px, `#FFFFFF`
- Background behind it: dark indigo (#1A1560 area)
- The logo appears centered, vertically in the upper-center of the screen

### Variant B — Sign-In Screen Logo (64px, two-color)

- Same split circle concept but the right half uses amber `#F59E0B`
- Left half: white
- Right half: amber
- Wordmark directly below: "Split" in white + "Easy" in amber `#F59E0B`
- This variant exists only on the sign-in screen for visual warmth

### Variant C — Groups Home Header Logo (28px diameter)

- Diameter: 28px (radius 14px)
- Logo stroke color: `#3B5BDB` (logoBlueBrand)
- Left half fill: `#FFFFFF` (white card background)
- Divider: 1.5px, `#3B5BDB`
- Sits left of the "SplitEasy" wordmark in the app header

### Variant D — Group Detail NavBar Logo (24px diameter)

- Diameter: 24px (radius 12px)
- Same as Variant C colors but smaller
- Sits centered in the nav bar, left of the group name

### Wordmark

- Font: system bold
- Size: 18px (header), 28px (splash)
- Color on dark background: `#FFFFFF`
- Color on light background: `#3B5BDB` (logoBlueBrand)
- Letter spacing: default

---

## 2. ONBOARDING FLOW

### 2.1 SplashScreen

**File:** `src/screens/onboarding/SplashScreen/index.tsx`

**Purpose:** First screen the user ever sees. Establishes the brand, then
routes to Welcome (new user) or Groups (returning user).

**Background:**
- Full-screen, no status bar content beneath
- Three layered Views create a gradient illusion:
  - Top: `#1A1560` (near-black indigo), fills entire screen
  - Mid: `#2D2A6E`, covers bottom 65% of screen
  - Bottom: `#3730A3`, covers bottom 35% of screen
- Behind the logo: a white radial glow (circular View, ~220px diameter,
  `rgba(255,255,255,0.05)`) centered behind the logo mark

**Center Unit (logo group — animates as one block):**
- The entire center unit fades in and scales from 0.72 → 1.0 with a spring
  animation (tension 52, friction 8, ~380ms)
- Content from top to bottom:
  1. **LogoMark** — 76px split circle (Variant A above)
  2. **Wordmark** — "SplitEasy", 28px bold white, 12px below logo
  3. **Divider** — 24px wide, 1px height, `rgba(255,255,255,0.3)`, 12px below wordmark
  4. **Tagline** — "SPLIT BILLS · KEEP FRIENDS", 11px semibold, `rgba(255,255,255,0.45)`,
     uppercase, letter-spacing 2.0, 10px below divider
     — fades in separately 280ms after logo, over 400ms

**Version string:**
- "v1.0.0", 10px, `rgba(255,255,255,0.2)`, absolute bottom-40px
- Fades in at the same time as the tagline

**Navigation Logic:**
- After 2 seconds total, checks AsyncStorage:
  - No onboarding done → go to Welcome
  - Onboarded but no groups → go to CreateGroup
  - Onboarded + groups exist → go to Groups (main app)

---

### 2.2 WelcomeScreen (Carousel)

**File:** `src/screens/onboarding/welcome/index.tsx`

**Purpose:** 3-slide carousel that explains the app's core value props before
sign-in. New users always see this.

**Background:**
- Top half: `#1A1560` (set as root background, bleeds through)
- Bottom half: `#2D2A6E` View overlaid on bottom

**Skip button:**
- Absolute top-right, 14px medium, `rgba(255,255,255,0.55)`
- Goes directly to SignIn screen

**Carousel (FlatList, horizontal, paging):**
- Each slide occupies 100% screen width
- Slide content from top to bottom:
  1. **Illustration area** — ~240px tall, centered, contains custom React Native
     illustration component (no external images yet, pure View shapes):
     - Slide 1 (`BillSplitIllustration`) — a receipt-like shape being split
     - Slide 2 (`BalanceIllustration`) — balance scale / number display
     - Slide 3 (`FriendsIllustration`) — avatars / friend icons
  2. **Title** — 24px bold white, centered, marginTop 32px
     - Slide 1: "Split any bill in 3 taps"
     - Slide 2: "Always know who owes whom"
     - Slide 3: "Friends need zero account"
  3. **Body text** — 16px regular, `rgba(255,255,255,0.65)`, centered, marginTop 12px
     - Slide 1: "No more mental math. No more awkward conversations."
     - Slide 2: "Real-time balances across every group."
     - Slide 3: "Add anyone by name."
  4. **Sub text** — 14px regular, `rgba(255,255,255,0.45)`, centered, marginTop 8px
     - Slide 1: "Just tap, split, done."
     - Slide 2: "Settle one person at a time."
     - Slide 3: "They never have to download anything."

**DotIndicator:**
- File: `src/screens/onboarding/welcome/components/DotIndicator.tsx`
- 3 dots, horizontally centered, 6px gap between dots
- Active dot: 20×6px white pill (rounded rectangle)
- Inactive dot: 6×6px, `rgba(255,255,255,0.3)` circle
- Transitions between active states in ~200ms

**Next / Get Started Button:**
- 56px height, full width minus 48px horizontal padding
- Background: `#FFFFFF`, borderRadius 12px
- Text: 16px semibold, `#1A1560` (dark)
- Label changes: "Next" on slides 1–2, "Get Started" on slide 3
- Press animation: spring scale 0.97 → 1.0

---

### 2.3 SignInScreen

**File:** `src/screens/onboarding/signin/index.tsx`

**Purpose:** Authentication gateway. Three modes: main (social/email choice),
email form, forgot-password form.

**Background:**
- Same three-band dark indigo gradient as SplashScreen
- Radial glow: ~480px diameter circle, `rgba(76,29,149,0.55)`, positioned in
  upper third of screen behind the logo

**Layout (ScrollView, bottom-aligned content):**
Padding: 24px horizontal, 72px top, 40px bottom

#### LogoMark
- File: `src/screens/onboarding/signin/components/LogoMark.tsx`
- Large centered logo, flex 1 with `justifyContent: flex-end` (pushes content to fill space above buttons)
- This is Variant B (two-color: left white, right amber) — pending final design decision

#### Hero Text
- Heading: "Welcome back", 28px bold white, centered
- Subtitle: "Your friends never need to download anything.", 14px, `rgba(255,255,255,0.4)`, centered
- 36px gap below subtitle before buttons

#### Error Display
- If error exists: 13px, `#DC2626`, centered above buttons

#### Auth Buttons (stacked, 12px gap between each)

**1. SocialButton — Apple**
- File: `src/screens/onboarding/signin/components/SocialButton.tsx`
- Height: 56px, full width, borderRadius 12px
- Background: `#000000` (Apple black)
- Left: Apple logo SVG (20px white)
- Label: "Continue with Apple", 15px semibold white, centered with gap 10px

**2. SocialButton — Google**
- Same 56px structure
- Background: `#FFFFFF`
- Left: Google "G" logo (colorful, 20px)
- Label: "Continue with Google", 15px semibold `#0F172A`

**3. OrDivider**
- File: `src/screens/onboarding/signin/components/OrDivider.tsx`
- 1px horizontal line, `rgba(255,255,255,0.15)`, full width
- Centered "or" label, 13px, `rgba(255,255,255,0.45)`
- 20px vertical margin

**4. AuthButton — Email**
- File: `src/screens/onboarding/signin/components/AuthButton.tsx`
- Height: 56px, borderRadius 12px
- Background: `rgba(255,255,255,0.07)` (frosted glass)
- Left: mail icon, 18px white
- Label: "Continue with Email", 15px semibold white

**5. AuthButton — Guest**
- Height: 56px, borderRadius 12px
- Background: transparent
- Border: 1.5px, `rgba(255,255,255,0.3)`
- Label: "Continue without account", 15px semibold `rgba(255,255,255,0.7)`

#### Footer
- Lock icon (16px white) + "Encrypted and private"
- 13px, `rgba(255,255,255,0.3)`, centered
- 32px top padding

#### Email Mode (EmailSignInView)
- File: `src/screens/onboarding/signin/components/EmailSignInView.tsx`
- Replaces main view entirely
- Contains: email TextInput, password TextInput (with show/hide toggle), Sign In button, Forgot Password link, back button
- Input style: 52px height, `rgba(255,255,255,0.08)` background, `rgba(255,255,255,0.2)` border, white text

#### Forgot Password Mode (ForgotPasswordView)
- File: `src/screens/onboarding/signin/components/ForgotPasswordView.tsx`
- Shows email-only input + "Send Reset Email" button
- Success state: icon + "Email sent" confirmation message

---

### 2.4 CreateGroupScreen (Step 1 of 2)

**File:** `src/screens/onboarding/createGroup/index.tsx`

**Purpose:** User creates their first group during onboarding. This step collects
group name, image, color, and member names.

**Background:** `#F8FAFC` (light app bg — same as main app, not dark onboarding)

**Skip button:**
- Absolute top-right, 14px, `#64748B`
- Goes directly to Groups tab (bypasses group creation)

**Header:**
- "Create your first group", 24px bold `#0F172A`
- Step indicator: "1 of 2", 12px, `#94A3B8`, below heading
- Subtitle: "You can always add more people later.", 14px, `#64748B`

**GroupImagePicker:**
- File: `src/screens/onboarding/createGroup/components/GroupImagePicker.tsx`
- Large centered circle (~88px diameter) with group color background
- If no image: shows group name initials (24px bold white) or a camera icon
- If image selected: shows the photo in a circle crop
- Camera badge overlay: 28×28px white circle, bottom-right, contains camera icon
- CameraIcon: `src/screens/onboarding/createGroup/components/CameraIcon.tsx`

**Group Name Input:**
- Label: "GROUP NAME", 12px semibold `#334155`, uppercase, letter-spacing 0.8
- Input: 56px height, white bg, 1px `#E2E8F0` border, 8px radius
- Placeholder: "e.g. Spain Trip, Flat Bills", `#94A3B8`
- Auto-focuses on mount

**Group Color Picker:**
- Label: "GROUP COLOR"
- 8 color swatches in a row, 36×36px circles, 12px gap
- Colors: `#6366F1` (brand), `#059669`, `#D97706`, `#DC2626`, `#7C3AED`, `#0891B2`, `#BE185D`, `#16A34A`
- Selected state: 2.5px border, `#0F172A` (dark outline ring)

**Members Section:**
- Label: "MEMBERS"
- Each member: 56px TextInput (white, same style as name input) + ✕ remove button (right)
- "+ Add another member" link: 14px medium, `#6366F1`
- Minimum 1 member required

**Error text:** 13px, `#DC2626`, appears above CTA button

**Create Group Button:**
- 56px height, `#6366F1` background, 8px radius
- Label: "Create Group" / "Creating…" (loading state, opacity 0.6)
- White 15px semibold text

**Skip link:** "or skip for now", 13px, `#64748B`, centered below button

---

### 2.5 NotificationPromptScreen (Step 2 of 2)

**File:** `src/screens/onboarding/NotificationPromptScreen/index.tsx`

**Purpose:** Requests notification permissions. Final step before entering the
main app. User can skip.

**Background:** `#F8FAFC` light — the screen uses a card-within-screen layout

**Layout:** Full-screen View → centered Card View

**Card:**
- Background: `#FFFFFF`, borderRadius 16px, padding 32px
- marginHorizontal 24px, shadow

**BellIcon:**
- 72×72px circle, `#EEF2FF` (brand light) background
- Bell emoji 🔔 centered, 36px font size

**Heading:** "Stay in the loop", 22px bold `#0F172A`, centered, 16px top margin

**Progress indicator:** "2 of 2", 12px `#94A3B8`, centered, 8px below heading

**Subtitle:** "Enable notifications so you always know what's happening with your money."
14px, `#64748B`, centered, lineHeight 22, 16px below heading

**Benefits list (3 rows, 16px gap between):**
- Each row: icon emoji (24px) + benefit text (14px, `#334155`)
- Row 1: 💰 "Know when someone settles up"
- Row 2: ➕ "See new expenses as they're added"
- Row 3: 👋 "Get nudged when a balance is overdue"

**Enable Notifications button:**
- 56px height, `#6366F1`, 12px radius, full width
- "Enable Notifications", 15px semibold white

**Not Now link:**
- "Not now", 14px medium, `#64748B`, centered, 16px top margin

---

## 3. MAIN TAB NAVIGATION

**File:** `src/navigation/MainTabs.tsx`

**Purpose:** Bottom navigation bar persistent across all 4 main tabs.

**Tab Bar container:**
- Height: 64px (plus safe area bottom inset)
- Background: `#FFFFFF`
- Top border: 1px `#F1F5F9`
- Shadow above: subtle upward shadow

**4 Tabs (left to right):**

| Tab | Icon | Label | Screen |
|---|---|---|---|
| Groups | home | Groups | GroupsHomeScreen |
| Balances | bar-chart | Balances | BalancesScreen |
| Activity | activity | Activity | ActivityScreen |
| Settings | settings | Settings | SettingsHomeScreen |

**Per-tab item:**
- 44×44px touch target (minimum)
- Icon: 22px, default color `#94A3B8`
- Label: 10px, default color `#94A3B8`
- **Active state:** icon + label color → `#6366F1` (brand), 2px top indicator bar (brand color, full tab width)
- Press: no scale animation, just color change

---

## 4. GROUPS HOME SCREEN

**File:** `src/screens/groups/GroupsHomeScreen/index.tsx`

**Purpose:** Main dashboard. Shows all the user's groups, their net balance,
and a search bar. This is the app's home screen.

**Background:** `#FFFFFF` (white) — the header and group cards sit on white

**Safe area:** top only

### 4.1 Header Component

**File:** `src/screens/groups/GroupsHomeScreen/components/Header.tsx`

A fixed top bar (not sticky in scroll, always rendered above the FlatList).

- Height: auto (paddingVertical 12px)
- Background: `#FFFFFF`
- paddingHorizontal: 16px

**Left side (logo + text):**
- `SplitCircleLogo` — 28px diameter (Variant C), `#3B5BDB` brand blue
- Wordmark: "SplitEasy", 18px bold, `#3B5BDB`
- Subtitle: "{N} active groups", 12px regular, `#64748B`
- 8px gap between logo and text block

**Right side (bell button):**
- 40×40px pill (borderRadius pill), background `#F1F5F9`
- Contains `BellIcon` — custom View-based bell shape, stroke `#334155`
- If `notificationCount > 0`: red badge (16×16px pill, `#DC2626`) in top-right
  corner of the pill button, white border 1.5px, badge shows count number

### 4.2 BalanceBanner Component

**File:** `src/screens/groups/GroupsHomeScreen/components/BalanceBanner.tsx`

A full-width colored banner showing the user's total net balance across all groups.

- marginHorizontal: 16px, borderRadius: 16px
- Background: two-band gradient — top 40% `#1A7A52` (darker), bottom 60% `#2D9B6F` (settleGreen)
- Height: auto (paddingHorizontal 20px, paddingVertical 18px)

**Left block:**
- "TOTAL BALANCE" label: 11px semibold, `rgba(255,255,255,0.75)`, uppercase, letterSpacing 1.2
- Amount: 36px bold white, letterSpacing -0.5
  - Positive amount (owed to you): shows `+$124.50` in white (green bg implies good)
  - Negative amount (you owe): shows `-$38.00` in white (still white on green — context is net)
  - Zero: shows "$0.00"
- Subtext: "across N groups", 12px regular, `rgba(255,255,255,0.65)`

**Right block:**
- "Settle All" button: transparent bg, 1.5px white 60% border, pill shape
- 13px semibold white
- Hidden when balance is exactly zero

### 4.3 SearchBar Component

**File:** `src/screens/groups/GroupsHomeScreen/components/SearchBar.tsx`

- marginHorizontal: 16px, marginTop: 12px, marginBottom: 4px
- Height: 44px, background `#FFFFFF`, borderRadius: 10px
- Border: 1px `#E2E8F0`
- Left: search icon (18px, `#64748B`)
- TextInput: placeholder "Search groups…", `#94A3B8`
- Right: clear (✕) button, visible only when text is non-empty

### 4.4 Section Label

Inline in GroupsHomeScreen index, above the group list:
- "MY GROUPS", 12px semibold `#64748B`, uppercase, letterSpacing 0.8
- paddingHorizontal: 16px, marginBottom: 8px

### 4.5 GroupCard Component

**File:** `src/screens/groups/GroupsHomeScreen/components/GroupCard.tsx`

Each group in the list is one card row (white background, stacked with separators).

The entire list lives inside the FlatList on a white screen background. Cards
are NOT individually rounded — they stack as rows within an implicit white area.

**Per row layout (horizontal flex, 16px padding, 16px vertical):**
- **Left: Group Icon Tile** — 48×48px, 12px radius, group's assigned pastel color
  - Contains group emoji centered, 24px font size
- **Center: Text block** (flex 1, marginLeft 12px)
  - Group name: 16px bold `#0F172A`, letterSpacing -0.1
  - Subtitle: 13px regular `#64748B` — e.g. "3 members · 5 expenses"
- **Right: Balance badge** (pill shape, paddingH 10px, paddingV 4px)
  - Positive: background `#D1FAE5`, text `#065F46` (dark green), shows "+$X.XX"
  - Negative: background `#FEE2E2`, text `#991B1B` (dark red), shows "-$X.XX"
  - Zero: transparent bg, `#94A3B8` border 1px, text `#94A3B8`, shows "Settled"

**Row separator:** 1px `#F1F5F9`, inset-left 76px (aligns with text, not icon), full width to right edge

**No search results state:**
- "No groups match "{search}"", 14px regular, `#94A3B8`, centered, paddingTop 40px

### 4.6 FAB (Floating Action Button)

- Position: absolute, bottom 24px + safe area, right 20px
- Size: 56×56px pill
- Background: `#6366F1` (brand)
- Icon: `plus` icon, 24px, white, strokeWidth 2
- Shadow: color `#6366F1`, opacity 0.35, radius 8, offsetY 4, elevation 6 (Android)
- Press: opacity → 0.85

### 4.7 Empty State (no groups)

Shown when user has no groups. Replaces the FlatList entirely.

- **Illustration:** 64×64px pill circle, background `#6366F1`, contains plus icon 36px white
- **Title:** "No groups yet", 22px bold `#0F172A`, centered
- **Subtitle:** "Create your first group to start splitting bills with friends."
  14px regular `#64748B`, centered, lineHeight 21
- **Primary CTA:** "Create your first group" button, 56px, `#6366F1`, full width
- **Secondary link:** "Join an existing group", 14px medium, `#6366F1`, centered

---

## 5. GROUP DETAIL SCREEN

**File:** `src/screens/groups/GroupDetail/index.tsx`

**Purpose:** Shows a single group's full details — member balances, recent
expenses, and a button to add new expenses.

**Background:** `#F2F3F7` (screenBg) — slightly grey, makes white cards float

**Safe area:** top only

### 5.1 NavBar Component

**File:** `src/screens/groups/GroupDetail/components/NavBar.tsx`

Sticky top navigation bar.

- Height: auto (paddingHorizontal 16px, paddingVertical 12px)
- Background: `#FFFFFF`

**Left slot (36px wide):**
- `chevron-left` icon, 22px, color `#3730A3` (heroIndigo)
- Navigates back to Groups Home

**Center slot (flex 1):**
- `SplitCircleLogo` 24px (Variant D) + group name text
- Group name: 18px bold `#0F172A`
- Logo and name have 8px gap

**Right slot (36px wide):**
- Custom cog icon (pure View-based, no SVG):
  - 24px outer circle, 2px border, `#64748B`
  - 8 rectangular teeth (4×7px each), evenly rotated at 45° intervals, `#64748B`
  - 8px solid inner circle, `#64748B`
- Navigates to GroupSettings

### 5.2 HeroBanner Component

**File:** `src/screens/groups/GroupDetail/components/HeroBanner.tsx`

The visual hero card at the top of the group detail.

- marginHorizontal: 16px (added by parent card wrapping)
- borderRadius: 16px, overflow hidden
- paddingHorizontal: 20px, paddingTop: 20px, paddingBottom: 16px

**Background (two-band split):**
- Top 50%: `#3730A3` (heroIndigo)
- Bottom 50%: `#4F46E5` (heroIndigoBright)

**Decorative orb:**
- 180×180px circle, `rgba(255,255,255,0.10)`, positioned top: -40px, right: -40px
- Bleeds out of top-right corner for depth

**Top section:**
- Title row: star-filled icon (14px white filled) + group name (20px bold white, flex 1)
- Member count: 14px regular, `rgba(255,255,255,0.80)` — e.g. "4 members"

**Divider:** hairline 1px, `rgba(255,255,255,0.25)`, full width, 16px below member count

**Stats row (two cells):**

Left cell — "YOUR BALANCE":
- Label: "YOUR BALANCE", 11px semibold, `rgba(255,255,255,0.75)`, uppercase, letterSpacing 1.2
- Amount: 26px bold
  - Positive balance → `#16A34A` (posAlt green)
  - Negative or zero → `#FFFFFF` (white)

Right cell — "TOTAL SPENT":
- Label: "TOTAL SPENT", same label style
- Amount: 26px bold white

Vertical divider between cells: hairline, `rgba(255,255,255,0.25)`, 52px tall, marginH 16px

### 5.3 Balances Card

White card: background `#FFFFFF`, marginHorizontal 16px, marginTop 12px, borderRadius 16px, overflow hidden

**SectionHeader** (inside card):
- File: `src/screens/groups/GroupDetail/components/SectionHeader.tsx`
- "Balances" (16px bold `#0F172A`) on left
- No "See All" for this card in group detail

**BalanceRow Component:**
- File: `src/screens/groups/GroupDetail/components/BalanceRow.tsx`
- paddingHorizontal 16px, paddingVertical 14px

Per row:
- **Avatar pill:** 44×44px circle, member's assigned color bg, initials (14px bold white, letterSpacing 0.5)
- **Text block** (flex 1, marginLeft 12px):
  - Name: 15px semibold `#0F172A`
  - Relation text: 12px regular `#64748B`
    - "owes you $X.XX" (positive)
    - "you owe $X.XX" (negative)
    - "settled up" (zero)
- **Right side:**
  - Balance badge (pill): same color rules as GroupCard balance badge
  - If balance non-zero: "Settle" button (30px height, `#2D9B6F` bg, pill, 13px semibold white)

Row separator: 1px `#F1F5F9`, inset-left 72px

### 5.4 Recent Expenses Card

Same card shell as Balances card.

**SectionHeader:**
- "Recent" on left
- "View all >" on right, 13px medium `#6366F1`, navigates to ActivityFeed

**RecentExpenseRow Component:**
- File: `src/screens/groups/GroupDetail/components/RecentExpenseRow.tsx`
- paddingHorizontal 16px, paddingVertical 14px

Per row:
- **Icon tile:** 44×44px, 12px radius, `#4F46E5` (heroIndigoBright) background, emoji or icon centered
- **Text block** (flex 1):
  - Expense name: 15px bold `#0F172A`
  - Meta: 13px regular `#64748B` — "Paid by {name} · {date}"
- **Right:** amount, 14px semibold — color follows money color language

Row separator: 1px `#F1F5F9`, inset-left 72px, inset-right 16px

### 5.5 AddExpenseBar Component

**File:** `src/screens/groups/GroupDetail/components/AddExpenseBar.tsx`

A sticky bar at the bottom of the screen (above safe area).

- Height: 52px
- marginHorizontal: 16px, marginBottom: 16px
- Background: `#EEF2FF` (brandLight)
- Border: 1.5px `#C7D2FE` (brandMid)
- BorderRadius: 14px
- Content: plus icon (18px `#6366F1`) + "Add Expense" (15px semibold `#6366F1`)
- Horizontally centered, 8px gap between icon and text

---

## 6. ADD EXPENSE SCREEN

**File:** `src/screens/groups/AddExpenseScreen/index.tsx`

**Purpose:** Full form for adding a new expense to a group. Supports 3 split
methods (equal, exact, percentage).

**Header:** ScreenHeader component — "Add Expense" title, back chevron on left

**Background:** `#F8FAFC` (bg)

**Section 1 — Amount Hero:**
- `AmountInput` component centered
- File: `src/screens/groups/AddExpenseScreen/components/AmountInput.tsx`
- Large currency display (e.g. "$0.00"), 40px+ font, tappable to open numeric keyboard
- Currency symbol prefix on left

**Section 2 — Details Card** (white, 16px radius, marginHorizontal 16px):
- "Details" section label: 12px semibold `#64748B`, uppercase
- `InputField` — description, placeholder "What was it for?", receipt icon on left
- `CategoryPicker` — horizontal scroll of emoji category chips

**CategoryPicker Component:**
- File: `src/screens/groups/AddExpenseScreen/components/CategoryPicker.tsx`
- Categories: Stay 🏠, Food 🍔, Travel ✈️, Fun 🎉, Grocery 🛒, Utility 💡, Activity 🏃, Other 📦
- Each category: pill chip with emoji + label
- Selected: `#6366F1` border + `#EEF2FF` background
- Unselected: `#E2E8F0` border + white background

**Section 3 — Paid By Card** (white card):
- `SelectRow` — "Paid by" label on left, selected member name on right with chevron
- Tapping opens a member picker (not yet implemented)

**Section 4 — Split Card** (white card):
- "Split" section label

**SplitMethodTabs:**
- File: `src/screens/groups/AddExpenseScreen/components/SplitMethodTabs.tsx`
- 3 pill tabs: "Equal" | "Exact" | "%" (percentage)
- Active: `#6366F1` background white text
- Inactive: `#F1F5F9` background `#64748B` text

**MemberSplitRow per member:**
- File: `src/screens/groups/AddExpenseScreen/components/MemberSplitRow.tsx`
- Avatar pill (32px) + member name + right-side amount/percentage input
- Equal mode: shows calculated share, read-only
- Exact mode: editable currency input per member
- Percentage mode: editable % input per member

**Section 5 — Date + Notes Card** (white):
- `SelectRow` — "Date", today's date, chevron
- Notes `InputField` — multiline, 3 lines, "Add a note…" placeholder

**Save Button:**
- `Button` primary variant, "Save Expense", full width, `#6366F1` bg

---

## 7. SETTLE UP SCREEN

**File:** `src/screens/groups/SettleUpScreen/index.tsx`

**Purpose:** Records a payment settlement between two members.

**Header:** ScreenHeader — "Settle Up", back chevron

**Subheader:** "Settling with {Name}", 16px semibold `#0F172A`, paddingHorizontal 16px

**Amount Card** (white, 16px radius, centered):
- `AmountDisplay` component — xl size, shows amount without sign
- The amount is pre-filled from the balance owed (e.g. "$48.00")

**Payment Method Section:**
- Label: "Payment Method", 14px semibold `#334155`
- 3 `Chip` components in a row:
  - "Cash" | "Bank Transfer" | "Other"
  - Selected chip: `#6366F1` border + `#EEF2FF` tint
  - Default: Cash

**Form Section:**
- `InputField` — "Notes", optional, edit icon on left
- `SelectRow` — "Date", today's date

**Confirm Settlement Button:**
- `Button` primary — "Confirm Settlement", full width, `#6366F1`
- On press: shows Alert confirmation dialog

---

## 8. EXPENSE DETAIL SCREEN

**File:** `src/screens/groups/ExpenseDetailScreen/index.tsx`

**Purpose:** Read-only view of a single expense with edit/delete actions.

**Header:** ScreenHeader with back button + edit icon in top-right

**Content:**
- Expense name (large heading)
- Total amount (large display)
- Category icon + label
- "Paid by {name}" row
- Date row
- Split breakdown — member list with their share amounts
- Notes (if present)
- Delete button (destructive, red text or red background)

---

## 9. EDIT EXPENSE SCREEN

**File:** `src/screens/groups/EditExpenseScreen/index.tsx`

**Purpose:** Same form as AddExpenseScreen, pre-filled with existing expense data.

**Differences from AddExpense:**
- Header title: "Edit Expense"
- All fields pre-populated
- Additional "Delete Expense" button at bottom (destructive, red)
- Delete triggers a confirmation Alert before removing

---

## 10. ACTIVITY FEED SCREEN (Group-specific)

**File:** `src/screens/groups/ActivityFeedScreen/index.tsx`

**Purpose:** Full history of all expenses and settlements within one group.
Opened from "View all >" on the Group Detail screen.

**Layout:** Same as Activity tab screen (see Section 12) but filtered to a
single group. Header shows group name instead of tab filters.

---

## 11. GROUP SETTINGS SCREEN

**File:** `src/screens/groups/GroupSettingsScreen/index.tsx`

**Purpose:** Edit group details and danger actions.

**Header:** ScreenHeader — "Group Settings", back chevron

**Sections:**
1. **Group Info** — edit name, image, color (same UI as CreateGroup)
2. **Members** — list all members, tap to rename or remove
3. **Add Members** — "Add Member" row with chevron → AddMemberScreen
4. **Danger Zone** — "Leave Group" (orange/amber) + "Delete Group" (red)

---

## 12. ADD MEMBER SCREEN

**File:** `src/screens/groups/AddMemberScreen/index.tsx`

**Purpose:** Add new members to an existing group.

**Header:** "Add Members", back chevron

**Content:**
- Search/input field for member name
- Member name input (same style as CreateGroup member inputs)
- "+ Add another" link
- "Add Members" primary button

---

## 13. EXPORT PDF SCREEN

**File:** `src/screens/groups/ExportPDFScreen/index.tsx`

**Purpose:** Premium feature — generate and share a PDF report of a group's
expenses. Shown to free users with an upgrade prompt.

**Header:** "Export PDF", back chevron

**Content:**
- Preview of what the PDF will contain (date range, member list, expenses)
- "Export PDF" primary button
- For free users: `PremiumBanner` overlaid or instead, directing to Paywall

---

## 14. BALANCES SCREEN (Tab 2)

**File:** `src/screens/balances/BalancesScreen/index.tsx`

**Purpose:** Cross-group overview of all outstanding balances with every person
the user has shared expenses with.

**Background:** `#F8FAFC` (bg)

**Safe area:** top only

### 14.1 Screen Title
- "Balances", 24px bold `#0F172A`
- paddingHorizontal 16px, paddingTop 8px

### 14.2 NetSummaryBanner

**File:** `src/screens/balances/BalancesScreen/components/NetSummaryBanner.tsx`

A two-column summary card.

- marginHorizontal 16px, borderRadius 12px
- Background: white card with light shadow
- Left column: "OWED TO YOU" label + total positive amount (green)
- Right column: "YOU OWE" label + total negative amount (red)
- A vertical hairline divider separates the two columns

### 14.3 Filter Chips

Three `Chip` components in a horizontal row:
- "All" | "Owed to you" | "You owe"
- paddingHorizontal 16px, gap 8px
- Same chip style as elsewhere: selected = brand indigo

### 14.4 Balances Section Header

`SectionHeader` component (compact variant) — "BALANCES"

### 14.5 PersonBalanceRow

**File:** `src/screens/balances/BalancesScreen/components/PersonBalanceRow.tsx`

Shown inside a white card (borderRadius 16px, marginHorizontal 16px).

Per row:
- **Avatar pill:** 44×44px, member color bg, initials (white bold)
- **Text block** (flex 1):
  - Name: 15px semibold `#0F172A`
  - Sub-label: 12px regular `#64748B` — e.g. "1 group · owes you" or "1 group · you owe"
- **Right:**
  - Amount: 13px semibold, colored by money language
  - "Settle" button (30px pill, `#2D9B6F` bg, white text) if balance non-zero

Row separator: 1px `#F1F5F9`, inset-left 72px

### 14.6 Empty State

When all balances are zero (filter = "all") or no items match filter:
- `EmptyState` component: check-circle icon, "All settled up", "No outstanding balances"

---

## 15. ACTIVITY SCREEN (Tab 3)

**File:** `src/screens/activity/ActivityScreen/index.tsx`

**Purpose:** Chronological log of every expense and settlement across all groups.

**Background:** `#F8FAFC`

**Safe area:** top only

### 15.1 ActivityHeader (Sticky)

**File:** `src/screens/activity/ActivityScreen/components/ActivityHeader.tsx`

- Background: `#FFFFFF`, borderBottom 1px `#F1F5F9`
- Title: "Activity" (or within the header area)
- 3 filter chips: "All" | "Expenses" | "Settlements"
- Same chip style — selected = brand

### 15.2 ActivityDateSection (Sticky Section Headers)

**File:** `src/screens/activity/ActivityScreen/components/ActivityDateSection.tsx`

- SectionList sticky headers
- Background: `#F8FAFC` (matches screen, floats cleanly)
- Label: relative date string — "Today", "Yesterday", "Last week", "Last month", or formatted date
- 12px semibold `#64748B`, paddingHorizontal 16px, paddingVertical 8px

### 15.3 ActivityEventRow

**File:** `src/screens/activity/ActivityScreen/components/ActivityEventRow.tsx`

Per event row (inside a white card group per date):

- **Icon tile:** 44×44px, 12px radius
  - Expense events: `#4F46E5` (brand-ish blue) background
  - Settlement events: `#D1FAE5` (green bg) background
  - Icon centered: receipt, credit-card, home, tag, dollar, check-circle etc.
- **Text block** (flex 1):
  - Description: 15px bold `#0F172A` — e.g. "Dinner at Nobu"
  - Group name: 13px regular `#64748B` — e.g. "Tokyo Trip"
- **Right:**
  - Amount: 14px semibold
    - Expense: color by money language (your share owed = red, you paid = green)
    - Settlement: green if someone paid you, neutral otherwise
  - Date: 12px `#94A3B8`

Row separator: 1px `#F1F5F9`

### 15.4 Empty State

`EmptyState` component: activity icon, "No activity yet",
"Your expense and settlement history will appear here"

---

## 16. SETTINGS SCREEN (Tab 4)

**File:** `src/screens/settings/SettingsHomeScreen/index.tsx`

**Purpose:** User account settings, app preferences, premium upgrade prompt,
and sign-out.

**Background:** `#F8FAFC`

**ScreenHeader:** "Settings" title (no back button — this is a tab root)

### 16.1 ProfileCard

**File:** `src/screens/settings/SettingsHomeScreen/components/ProfileCard.tsx`

A tappable card at the top of Settings.

- Background: `#FFFFFF`, borderRadius 16px, marginHorizontal 16px
- Layout: horizontal flex, 16px padding

**Left: Avatar**
- 52×52px pill, brand color bg, initials (18px bold white)

**Middle: Text block** (flex 1, marginLeft 12px):
- Name: 17px semibold `#0F172A`
- Email: 13px regular `#64748B`
- If isPremium: small crown icon + "Premium" badge (amber pill)

**Right:** chevron-right icon, 16px `#94A3B8`

### 16.2 PremiumBanner (compact, free users only)

**File:** `src/components/molecules/PremiumBanner/index.tsx`

Shown between ProfileCard and settings groups for free users only.

- Compact variant: single row with crown icon, title, subtitle, "Upgrade" button
- Background: gradient from `#6366F1` to `#4338CA`
- Text: white
- CTA button: white bg, brand text

### 16.3 SettingsGroup Component

**File:** `src/screens/settings/SettingsHomeScreen/components/SettingsGroup.tsx`

A labeled group of settings rows in a white card.

- Group title: 11px semibold `#94A3B8`, uppercase, letterSpacing 0.8, paddingHorizontal 16px
- Card: `#FFFFFF`, borderRadius 12px, marginHorizontal 16px, overflow hidden
- Rows separated by 1px `#F1F5F9`

**Three groups:**

**ACCOUNT group:**
- Profile row — user icon on brand indigo bg → navigates to Profile
- Default Currency row — dollar icon on green bg → navigates to DefaultCurrency
- Notifications row — bell icon on amber bg → navigates to Notifications

**APP group:**
- About row — info icon on grey bg → navigates to About
- Rate App row — star icon on amber bg → opens App Store rating
- Share App row — share icon on brand bg → opens native share sheet

**DANGER group:**
- Sign Out row — log-out icon on red `#DC2626` bg
- Red icon tile signals destructive action
- No chevron; shows "Sign Out" right label
- Triggers confirmation Alert before signing out

### 16.4 ListRow Component

**File:** `src/components/molecules/ListRow/index.tsx`

Reusable row used inside SettingsGroup (and elsewhere).

- Height: 52px, paddingHorizontal 16px
- **Left icon:** `RowIcon` — 32×32px circle with background color + 16px icon (white)
- **Title:** 15px medium `#0F172A`, flex 1, marginLeft 12px
- **Right:** chevron-right (16px `#94A3B8`) OR right label text OR toggle

---

## 17. SETTINGS DETAIL SCREENS

### 17.1 ProfileScreen

**File:** `src/screens/settings/ProfileScreen/index.tsx`

**Header:** "Profile", back chevron

**Content:**
- Large avatar (80px), tappable to change photo
- Display name input (pre-filled)
- Email (read-only, or editable)
- "Save" primary button

### 17.2 DefaultCurrencyScreen

**File:** `src/screens/settings/DefaultCurrencyScreen/index.tsx`

**Header:** "Default Currency", back chevron

**Content:**
- Search field for currencies
- List of currencies (USD, EUR, GBP, JPY, etc.)
- Each row: currency code + full name + flag emoji
- Selected currency: checkmark on right, brand color

### 17.3 NotificationsScreen

**File:** `src/screens/settings/NotificationsScreen/index.tsx`

**Header:** "Notifications", back chevron

**Content:**
- Toggle rows for each notification type:
  - New expenses added
  - Someone settles up
  - Payment reminders
  - Group activity
- Each row uses `ListRow` with `Toggle` component on right

### 17.4 AboutScreen

**File:** `src/screens/settings/AboutScreen/index.tsx`

**Header:** "About", back chevron

**Content:**
- App logo (centered)
- App version number
- Rows: Rate SplitEasy, Share with friends, Privacy Policy (external link), Terms of Service (external link)
- Footer: copyright text

---

## 18. ADS

The free tier of SplitEasy includes non-intrusive ads. The `PremiumBanner`
component (`src/components/molecules/PremiumBanner/index.tsx`) serves as the
upgrade prompt that appears in place of or adjacent to ad slots.

**Ad placement strategy:**
- **Settings screen:** `PremiumBanner` (compact) below ProfileCard, above settings groups — always visible for free users
- **FreeLimitsScreen:** Full `PremiumBanner` at bottom of screen after usage limits list
- **ExportPDFScreen:** `PremiumBanner` blocks the export button / overlays screen for free users
- **GroupsHomeScreen:** A future banner ad slot may appear between groups (between group N and N+1) — every 5 groups for free users
- **ActivityScreen:** A future inline ad row may appear within the SectionList after every 10 activity events

**PremiumBanner (full variant):**
- Background: brand gradient (`#6366F1` → `#4338CA`)
- Crown icon (24px white)
- Title: "Unlock Premium" — 17px bold white
- Feature bullets: list of 2–3 features with white checkmarks
- CTA: "Upgrade" pill button — white bg, brand text, bold

**PremiumBanner (compact variant):**
- Same gradient bg but single row
- Crown icon + title + subtitle + "Upgrade" button in one line
- Height: ~64px

---

## 19. PAYWALL SCREEN

**File:** `src/screens/paywall/PaywallScreen/index.tsx`

**Purpose:** Full-screen premium subscription purchase screen. Presented modally
(user can close it with the ✕ button).

**Background:** `#0F172A` (very dark, near-black slate) — premium feel

**Close button:**
- Absolute top-right, 36×36px
- ✕ (`close`) icon, 20px, white, `rgba(255,255,255,0.6)` background circle

**Hero Section:**
- Crown icon in a 56×56px circle (`#6366F1` bg, 24px white crown)
- Title: "SplitEasy Premium", 26px bold white, centered
- Subtitle: "Everything you need to split smarter", 14px `rgba(255,255,255,0.6)`, centered

**Feature Rows:**

**FeatureRow Component:**
- File: `src/screens/paywall/PaywallScreen/components/FeatureRow.tsx`
- 6 features listed vertically with 16px gap:
  1. Unlimited groups
  2. PDF export
  3. Multi-currency support
  4. Receipt scanning
  5. Priority support
  6. No ads ever
- Each row: green checkmark icon (20px) + feature label (15px medium white)

**Pricing Cards:**

**PricingCard Component:**
- File: `src/screens/paywall/PaywallScreen/components/PricingCard.tsx`
- Two cards side by side in a row: "Monthly" + "Annual"
- Each card: background `rgba(255,255,255,0.08)`, borderRadius 16px, 1px border
  - Unselected border: `rgba(255,255,255,0.15)`
  - Selected border: `#6366F1` (brand), 2px
- Plan name: 13px semibold white
- Price: 22px bold white
- Period: 12px `rgba(255,255,255,0.6)`
- "Save 33%" badge (Annual only): small amber pill on top-right corner of card
- Annual card is selected by default

**Start Free Trial Button:**
- `Button` primary, "Start Free Trial"
- 56px, `#6366F1`, full width, 16px radius
- White 15px semibold text

**Restore Purchases Link:**
- "Restore purchases", 13px medium, `rgba(255,255,255,0.5)`, centered

**Footer:**
- "Terms · Privacy", 12px `rgba(255,255,255,0.35)`, centered

---

## 20. FREE LIMITS SCREEN

**File:** `src/screens/premium/FreeLimitsScreen/index.tsx`

**Purpose:** Shows the user how much of their free tier quota they've used.
Motivates upgrading by showing limits at or near capacity.

**Header:** ScreenHeader — "Usage Limits", back chevron

**Background:** `#F8FAFC`

**YOUR PLAN section:**
- `SectionHeader` — "YOUR PLAN"
- `InfoCard` (warning variant):
  - File: `src/components/molecules/InfoCard/index.tsx`
  - Alert-circle icon, amber accent
  - Title: "Free Plan"
  - Body: "Upgrade to Premium for unlimited access to all features."

**CURRENT USAGE section:**
- `SectionHeader` — "CURRENT USAGE"
- White card (borderRadius 12px) containing `LimitRow` entries

**LimitRow Component:**
- File: `src/screens/premium/FreeLimitsScreen/components/LimitRow.tsx`
- Per row (paddingHorizontal 16px, paddingVertical 14px):
  - Label: 15px medium `#0F172A`
  - `ProgressBar` component: fills `used/total` ratio
    - Green if under 50%, amber if 50–80%, red if >80%
  - Usage text: "{used} / {total}", 12px `#64748B`
- Rows separated by hairline divider

**4 Limits shown:**
| Limit | Used | Total |
|---|---|---|
| Groups | 3 | 3 |
| Expenses per group | 10 | 10 |
| Members per group | 5 | 10 |
| Receipt photos | 2 | 5 |

**PremiumBanner (full variant)** at bottom:
- Features: "Unlimited groups", "Unlimited expenses", "PDF export"
- CTA navigates to Paywall

---

## 21. PREMIUM FEATURES SCREEN

**File:** `src/screens/premium/PremiumFeaturesScreen/index.tsx`

**Purpose:** Marketing screen detailing what Premium unlocks. Accessed from
PremiumBanner or Settings.

**Header:** ScreenHeader — "Premium Features", back chevron

**Background:** `#F8FAFC`

**Hero Banner** (inside the scroll):
- Full-width card, borderRadius 16px, marginHorizontal 16px
- Background: `#6366F1` (brand indigo)
- Crown icon (24px white) in 44×44px `rgba(255,255,255,0.15)` circle
- Title: "Go Premium", 22px bold white
- Subtitle: "Unlock the full SplitEasy experience…", 13px `rgba(255,255,255,0.75)`

**WHAT YOU GET section:**
- `SectionHeader` — "WHAT YOU GET"
- 5 `FeatureCard` components stacked vertically

**FeatureCard Component:**
- File: `src/screens/premium/PremiumFeaturesScreen/components/FeatureCard.tsx`
- White card, borderRadius 12px, horizontal flex
- **Left:** 44×44px icon circle, icon-specific background color:
  - Unlimited Groups: `#EEF2FF` (brandLight), users icon
  - PDF Export: `#D1FAE5` (posBg green), file-text icon
  - Multi-Currency: `#FEF3C7` (pendBg amber), globe icon
  - Receipt Scanning: `#FEE2E2` (negBg red-tint), camera icon
  - Priority Support: `#DCFCE7` (posBgAlt), shield icon
- **Right text block:**
  - Title: 16px semibold `#0F172A`
  - Description: 13px regular `#64748B`, lineHeight 19

**Upgrade to Premium Button:**
- `Button` primary — "Upgrade to Premium"
- Navigates to Paywall

---

## 22. REUSABLE COMPONENTS

### Atoms (`src/components/atoms/`)

**Icon** (`Icon/index.tsx`)
- Renders SVG icon by `name` (IconName type)
- Props: `name`, `size`, `stroke`, `fill`, `color`, `style`
- All icons currently use placeholder SVG — 50+ icons needed

**Chip** (`Chip.tsx`)
- Small pill label, selectable
- Props: `label`, `selected`, `onPress`
- Selected: `#6366F1` border + `#EEF2FF` background, `#6366F1` text
- Unselected: `#E2E8F0` border, white background, `#64748B` text
- Height: ~32px, paddingHorizontal 14px, borderRadius pill

**Checkbox** (`Checkbox.tsx`)
- Square checkbox with label text to the right
- Checked: `#6366F1` fill, white checkmark

**Divider** (`Divider.tsx`)
- Horizontal or vertical hairline
- Props: `orientation`, `color`, `inset`
- Default: 1px `#F1F5F9` horizontal

**ProgressBar** (`ProgressBar.tsx`)
- Horizontal fill bar
- Props: `progress` (0–1), `color`, `trackColor`, `height`
- Track: `#F1F5F9`, height 8px default

**RadioButton** (`RadioButton.tsx`)
- Circle with selection ring
- Selected: brand indigo outer ring, filled center

**Tag** (`Tag.tsx`)
- Small label pill
- Props: `color`, `bgColor`, `size`
- Used for category labels, status tags

**Toggle** (`Toggle.tsx`)
- iOS-style switch
- Props: `value`, `onValueChange`, `activeColor`
- On: `#6366F1` track, white thumb

---

### Molecules (`src/components/molecules/`)

**AmountDisplay** (`AmountDisplay/index.tsx`)
- Formatted currency with optional sign prefix
- Sizes: sm (14px), md (20px), lg (28px), xl (36px)
- Color follows money language

**AvatarGroup** (`AvatarGroup/index.tsx`)
- 2–3 overlapping member avatars
- Each avatar: circle, member color, initials
- Each overlaps previous by 8px

**BottomSheetModal** (`BottomSheetModal/index.tsx`)
- Modal sliding up from bottom
- Dark overlay backdrop, dismissible by tapping backdrop
- White panel, borderRadius 20px top corners
- Drag handle: 36×4px pill `#E2E8F0` at top center

**EmptyState** (`EmptyState/index.tsx`)
- Icon (48px circle, brandLight bg, brand icon) + title + subtitle + optional CTA
- Props: `icon` (IconName), `title`, `subtitle`, `style`
- Used across all list empty states

**InfoCard** (`InfoCard/index.tsx`)
- Information or warning card
- Variants: `default` (blue), `warning` (amber), `error` (red)
- Left icon, right text block (title + body)

**InputField** (`InputField/index.tsx`)
- Labeled text input
- Props: `label`, `placeholder`, `leftIcon`, `value`, `onChangeText`, `multiline`
- Height: 52px (single line), auto (multiline)
- Border: 1px `#E2E8F0`, focussed: 1.5px `#6366F1`
- Background: `#FFFFFF`

**KeyboardDismiss** (`KeyboardDismiss/index.tsx`)
- HOC wrapper — tapping outside any input dismisses keyboard

**ListRow** (`ListRow/index.tsx`)
- See Settings section above
- Props: `title`, `leftIcon`, `leftIconBg`, `rightLabel`, `onPress`, `showChevron`, `toggle`

**PremiumBanner** (`PremiumBanner/index.tsx`)
- See Ads section above
- Props: `compact`, `title`, `subtitle`, `ctaLabel`, `onPress`, `features`, `style`

**ScreenHeader** (`ScreenHeader/index.tsx`)
- Standard stack screen header
- Height: 56px, background `#FFFFFF`, borderBottom 1px `#F1F5F9`
- Left: chevron-back (22px `#0F172A`) — if `onBack` provided
- Center: title (17px semibold `#0F172A`)
- Right: optional action icon/button

**SectionHeader** (`SectionHeader/index.tsx`)
- Used above grouped content
- Props: `title`, `actionLabel`, `onAction`, `compact`
- Title: 12px semibold `#64748B`, uppercase, letterSpacing 0.8
- Action label (e.g. "See All"): 13px medium `#6366F1`, right-aligned
- Compact variant: smaller vertical padding

**SelectRow** (`SelectRow/index.tsx`)
- Tappable row for selecting a value from a picker
- Left: label (15px medium `#64748B`)
- Right: value text (15px medium `#0F172A`) + chevron-right
- Border: 1px `#E2E8F0` around full row

---

### UI Components (`src/components/ui/`)

**Avatar** (`Avatar.tsx`)
- Single person avatar circle
- Props: `initials`, `color`, `size`
- Default size: 40×40px

**Badge** (`Badge.tsx`)
- Small status pill
- Props: `color`, `text`
- Used for notification counts, labels

**Button** (`Button.tsx`)
- Primary / secondary button
- Props: `label`, `onPress`, `variant`, `style`, `loading`, `disabled`
- Primary: `#6366F1` bg, white text, 56px, 12px radius
- Secondary: white bg, `#6366F1` border + text
- Loading: ActivityIndicator replaces label text
- Disabled: opacity 0.5

**Card** (`Card.tsx`)
- White container with shadow
- Props: `style`, `children`
- Background: `#FFFFFF`, borderRadius 16px, subtle shadow

**PlaceholderScreen** (`PlaceholderScreen.tsx`)
- Temporary screen shown for unimplemented routes
- Centered label showing the screen name
- Will be replaced one by one as screens are built

---

## 23. NAVIGATION FLOW MAP

```
App Launch
  └── SplashScreen (2s)
        ├── First time → WelcomeScreen (carousel)
        │     └── SignInScreen
        │           ├── Apple/Google/Email → CreateGroupScreen (step 1/2)
        │           │     └── NotificationPromptScreen (step 2/2)
        │           │           └── GroupsHomeScreen (Tab Root)
        │           └── Guest → CreateGroupScreen → Groups
        └── Returning user → GroupsHomeScreen

Main App (Bottom Tabs)
  ├── Tab 1: GroupsHomeScreen
  │     └── GroupDetailScreen
  │           ├── AddExpenseScreen
  │           ├── EditExpenseScreen
  │           ├── ExpenseDetailScreen
  │           ├── SettleUpScreen
  │           ├── ActivityFeedScreen
  │           ├── GroupSettingsScreen
  │           │     └── AddMemberScreen
  │           └── ExportPDFScreen (Premium)
  ├── Tab 2: BalancesScreen
  │     └── SettleUpScreen
  ├── Tab 3: ActivityScreen
  └── Tab 4: SettingsHomeScreen
        ├── ProfileScreen
        ├── DefaultCurrencyScreen
        ├── NotificationsScreen
        ├── AboutScreen
        └── Paywall (Premium)
              ├── FreeLimitsScreen
              └── PremiumFeaturesScreen
```

---

## 24. KEY DESIGN PRINCIPLES

1. **Dark onboarding, light app** — All onboarding screens use the dark indigo
   gradient. Once inside the app, everything shifts to light `#F8FAFC` / white.

2. **Cards float** — Screen backgrounds are slightly grey (`#F2F3F7` or `#F8FAFC`).
   Content lives on white cards that "float" above the bg with subtle shadows.

3. **Money is sacred** — Green = good (owed to you). Red = bad (you owe). Grey =
   settled. Amber = needs action. These four rules never break anywhere in the app.

4. **Brand indigo everywhere** — `#6366F1` is the primary accent: buttons, FABs,
   active tabs, selected states, links. Never use off-brand colors for actions.

5. **No grey shadows** — Shadows are brand-tinted. The FAB shadow uses `#6366F1`
   as shadow color, not black. Cards use subtle white/transparent shadows.

6. **Depth via color** — Visual hierarchy comes from background color shifts,
   not from borders or outlines. Cards are white on grey, heroes are dark on light.

7. **Spring animations** — Button presses use spring physics (scale 0.93–1.0).
   Logo entrance uses spring. Navigation transitions slide horizontally.

8. **Logo = identity** — The split-circle logo appears at minimum on SplashScreen,
   WelcomeScreen, SignInScreen, GroupsHomeScreen header, and GroupDetail NavBar.
   It must always be recognizable at any size it appears.
