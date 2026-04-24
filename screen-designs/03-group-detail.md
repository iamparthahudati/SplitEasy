# Group Detail Screen Design

**Screen:** GroupDetailScreen  
**Design Mode:** Light App (with dark hero banner)  
**Last Updated:** 2026-04-24

---

## Overview

The Group Detail screen is the financial command center for a single group. It shows the user's balance within the group, individual balances with each member, and a list of recent expenses. It is the most information-dense screen in the app and must balance data density with visual clarity.

**User flow context:**

- Entered from GroupsHomeScreen by tapping a group card
- Back navigation returns to GroupsHomeScreen
- Tapping a member's "Settle" button opens the settle-up flow for that member
- Tapping an expense row opens ExpenseDetailScreen
- Tapping the settings cog opens GroupSettingsScreen
- Tapping "See All" on the expenses section opens ExpenseListScreen

---

## Visual Design

### Background

`screenBg` `#F2F3F7` fills the entire screen. White card panels float on this background.

### StatusBar

`light-content` (white icons) while the hero banner is visible at the top. Transitions to `dark-content` as the user scrolls past the banner (if implementing dynamic status bar).

---

## Component Breakdown

### 1. NavBar

**Container:**

| Property           | Value                  |
| ------------------ | ---------------------- |
| Background         | `#FFFFFF`              |
| Height             | 56px + safe area top   |
| Padding horizontal | 16px                   |
| Border bottom      | 1px `border` `#F1F5F9` |
| Flex direction     | row                    |
| Align items        | center                 |
| Justify content    | space-between          |

**Left slot — Back button:**

| Property   | Value                  |
| ---------- | ---------------------- |
| Icon       | Chevron-left           |
| Icon size  | 22px                   |
| Icon color | `heroIndigo` `#3730A3` |
| Hit slop   | 12px all sides         |

**Center slot — Logo + Title:**

Flex row, align center, gap 8px, centered in the nav bar.

_Split-circle logo:_

| Property       | Value                                |
| -------------- | ------------------------------------ |
| Diameter       | 24px                                 |
| Left half      | Solid `logoBlueBrand` `#3B5BDB`      |
| Right half     | Transparent, `#3B5BDB` outline 1.5px |
| Center divider | 1px `#3B5BDB`                        |

_Title text:_

| Property    | Value                          |
| ----------- | ------------------------------ |
| Text        | Group name (e.g., "Bali Trip") |
| Font size   | 18px                           |
| Font weight | 700 (bold)                     |
| Color       | `text1` `#0F172A`              |

**Right slot — Settings cog:**

A View-based custom cog icon (not an icon library glyph) to ensure precise visual control:

| Property     | Value                                                                 |
| ------------ | --------------------------------------------------------------------- |
| Outer circle | 24px diameter, `text3` `#64748B` stroke, 1.5px                        |
| Teeth        | 8 rectangular teeth, evenly distributed around the circle, each 4×2px |
| Inner circle | 8px diameter, `text3` stroke, 1.5px                                   |
| Hit slop     | 12px all sides                                                        |

Implementation: SVG or Canvas-drawn component. The cog is rendered as a `View` with `width: 24`, `height: 24`.

---

### 2. HeroBanner

**Container:**

| Property          | Value  |
| ----------------- | ------ |
| Margin horizontal | 16px   |
| Margin top        | 16px   |
| Border radius     | 16px   |
| Overflow          | hidden |

**Background layers:**

| Layer       | Color                        | Coverage   |
| ----------- | ---------------------------- | ---------- |
| Top band    | `heroIndigo` `#3730A3`       | Top 50%    |
| Bottom band | `heroIndigoBright` `#4F46E5` | Bottom 50% |

**Decorative orb:**

| Property      | Value                                |
| ------------- | ------------------------------------ |
| Diameter      | 180px                                |
| Border radius | 90px (pill)                          |
| Background    | `rgba(255,255,255,0.10)`             |
| Position      | `absolute`, top: -40px, right: -40px |

This orb bleeds off the top-right corner of the banner, creating a soft highlight that adds depth without being distracting.

**Top section (padding 20px horizontal, 20px top):**

_Group icon row:_ Flex row, align center, gap 10px.

| Element    | Spec                                     |
| ---------- | ---------------------------------------- |
| Star icon  | 18px, `#FFFFFF` (or group-specific icon) |
| Group name | 20px bold white, letterSpacing -0.3      |

_Member count:_ 14px regular white at 80% opacity, marginTop 4px.  
Example: "5 members"

**Hairline divider:**

| Property          | Value                    |
| ----------------- | ------------------------ |
| Height            | 1px                      |
| Background        | `rgba(255,255,255,0.25)` |
| Margin top        | 16px                     |
| Margin horizontal | 0 (full width of banner) |

**Stats row (below divider):**

Two equal cells (`flex: 1` each) in a flex row. A vertical divider separates them.

_Vertical divider:_

| Property   | Value                    |
| ---------- | ------------------------ |
| Width      | 1px                      |
| Height     | 52px                     |
| Background | `rgba(255,255,255,0.25)` |
| Align self | center                   |

_Each stat cell:_

| Property         | Value  |
| ---------------- | ------ |
| Flex             | 1      |
| Align items      | center |
| Padding vertical | 16px   |

_Stat label:_

| Property       | Value                    |
| -------------- | ------------------------ |
| Font size      | 11px                     |
| Font weight    | 600 (semibold)           |
| Color          | `rgba(255,255,255,0.75)` |
| Letter spacing | 1.2                      |
| Text transform | uppercase                |

_Stat value:_

| Property       | Value               |
| -------------- | ------------------- |
| Font size      | 28px                |
| Font weight    | 700 (bold)          |
| Color          | `#FFFFFF` (default) |
| Letter spacing | -0.5                |
| Margin top     | 4px                 |

**Special rule for positive balance stat value:** Use `posAlt` `#16A34A` instead of white. This is the only place in the app where a money color overrides white text on a dark background. It must be clearly readable — `#16A34A` on `#3730A3` meets WCAG AA.

**Stat cell content:**

| Cell  | Label          | Value Example                           |
| ----- | -------------- | --------------------------------------- |
| Left  | "YOUR BALANCE" | "+$42.00" (posAlt) or "-$18.00" (white) |
| Right | "TOTAL SPENT"  | "$340.00" (white)                       |

---

### 3. Balances Card Panel

**Container:**

| Property          | Value     |
| ----------------- | --------- |
| Background        | `#FFFFFF` |
| Border radius     | 16px      |
| Margin horizontal | 16px      |
| Margin top        | 16px      |
| Overflow          | hidden    |

**Card header row:**

| Property           | Value         |
| ------------------ | ------------- |
| Padding horizontal | 16px          |
| Padding top        | 16px          |
| Padding bottom     | 12px          |
| Flex direction     | row           |
| Justify content    | space-between |
| Align items        | center        |

| Element        | Spec                          |
| -------------- | ----------------------------- |
| Title          | "Balances", 16px bold `text1` |
| "See All" link | 13px medium `brand` `#6366F1` |

**BalanceRow:**

Each member of the group gets one row.

_Row container:_

| Property           | Value  |
| ------------------ | ------ |
| Padding horizontal | 16px   |
| Padding vertical   | 12px   |
| Flex direction     | row    |
| Align items        | center |
| Min height         | 64px   |

_Avatar pill (left):_

| Property      | Value                                        |
| ------------- | -------------------------------------------- |
| Size          | 44×44px                                      |
| Border radius | 999 (pill)                                   |
| Background    | Per-member color                             |
| Content       | Initials, 14px bold white, letterSpacing 0.5 |
| Margin right  | 12px                                         |

_Name + sub-label (center, flex 1):_

| Element     | Size | Weight         | Color             |
| ----------- | ---- | -------------- | ----------------- |
| Member name | 15px | 600 (semibold) | `text1` `#0F172A` |
| Sub-label   | 12px | 400 (regular)  | `text3` `#64748B` |

Sub-label examples: "owes you", "you owe", "settled up"

_Right slot — Amount badge + Settle button:_

Flex row, align center, gap 8px.

**Amount badge:**

| State                   | Background           | Text color         | Border                    | Text example |
| ----------------------- | -------------------- | ------------------ | ------------------------- | ------------ |
| Positive (they owe you) | `posBgAlt` `#DCFCE7` | `posAlt` `#16A34A` | none                      | "+$42.00"    |
| Negative (you owe them) | `negBg` `#FEE2E2`    | `neg` `#DC2626`    | none                      | "-$18.50"    |
| Settled                 | transparent          | `zero` `#94A3B8`   | 1px `borderMid` `#E2E8F0` | "$0.00"      |

Badge specs: `paddingHorizontal: 8px`, `paddingVertical: 4px`, `borderRadius: 999`, `fontSize: 13px`, `fontWeight: 600`.

**Settle button** (only shown when balance is non-zero):

| Property           | Value                   |
| ------------------ | ----------------------- |
| Height             | 30px                    |
| Padding horizontal | 12px                    |
| Border radius      | 999 (pill)              |
| Background         | `settleGreen` `#2D9B6F` |
| Text               | "Settle"                |
| Text size          | 13px                    |
| Text weight        | 600 (semibold)          |
| Text color         | `#FFFFFF`               |

Press state: background → `settleGreenDark` `#1A7A52`, 150ms ease.

**Separator:**

| Property     | Value              |
| ------------ | ------------------ |
| Height       | 1px                |
| Background   | `border` `#F1F5F9` |
| Margin left  | 72px               |
| Margin right | 0                  |

No separator on the last row.

---

### 4. Recent Expenses Card Panel

**Container:**

| Property          | Value     |
| ----------------- | --------- |
| Background        | `#FFFFFF` |
| Border radius     | 16px      |
| Margin horizontal | 16px      |
| Margin top        | 16px      |
| Overflow          | hidden    |

**Card header row:**

Same structure as Balances card header.

| Element        | Spec                                 |
| -------------- | ------------------------------------ |
| Title          | "Recent Expenses", 16px bold `text1` |
| "See All" link | 13px medium `brand` `#6366F1`        |

**RecentExpenseRow:**

_Row container:_

| Property           | Value  |
| ------------------ | ------ |
| Padding horizontal | 16px   |
| Padding vertical   | 12px   |
| Flex direction     | row    |
| Align items        | center |
| Min height         | 64px   |

_Icon tile (left):_

| Property      | Value                        |
| ------------- | ---------------------------- |
| Size          | 44×44px                      |
| Border radius | 12px                         |
| Background    | `heroIndigoBright` `#4F46E5` |
| Content       | Emoji, centered, 22px        |
| Margin right  | 12px                         |

_Text block (center, flex 1):_

| Element      | Size | Weight        | Color             | Notes                                  |
| ------------ | ---- | ------------- | ----------------- | -------------------------------------- |
| Expense name | 15px | 700 (bold)    | `text1` `#0F172A` | e.g., "Dinner at Nobu"                 |
| Meta line    | 13px | 400 (regular) | `text3` `#64748B` | "Paid by Alex · Mar 12", marginTop 2px |

_Amount (right):_

| State                 | Size | Weight         | Color              | Notes          |
| --------------------- | ---- | -------------- | ------------------ | -------------- |
| Your share (positive) | 14px | 600 (semibold) | `posAlt` `#16A34A` | "+$21.00 back" |
| Your share (negative) | 14px | 600 (semibold) | `neg` `#DC2626`    | "-$42.00 owed" |
| You paid              | 14px | 600 (semibold) | `text1` `#0F172A`  | "$84.00 paid"  |

**Separator:**

| Property     | Value              |
| ------------ | ------------------ |
| Height       | 1px                |
| Background   | `border` `#F1F5F9` |
| Margin left  | 72px               |
| Margin right | 16px               |

Both sides inset on expense rows (unlike balance rows which only inset left). No separator on last row.

---

### 5. Add Expense Button

Positioned below the Recent Expenses card, `marginHorizontal: 16px`, `marginTop: 12px`.

| Property      | Value                             |
| ------------- | --------------------------------- |
| Height        | 52px                              |
| Border radius | 14px                              |
| Background    | `brandLight` `#EEF2FF`            |
| Border        | 1.5px `brandMid` `#C7D2FE`        |
| Icon          | Plus (+), 18px, `brand` `#6366F1` |
| Text          | "Add Expense"                     |
| Text size     | 15px                              |
| Text weight   | 600 (semibold)                    |
| Text color    | `brand` `#6366F1`                 |
| Icon-text gap | 8px                               |

Press state: background → `brandMid` `#C7D2FE`, 150ms ease.

---

## Scroll Behavior

The NavBar is sticky. Everything below (HeroBanner, card panels, Add Expense button) scrolls inside a `ScrollView`. Bottom padding: 32px.

---

## Interaction States

### BalanceRow

| State            | Visual                                      |
| ---------------- | ------------------------------------------- |
| Default          | As specified                                |
| Pressed          | Row background `rgba(0,0,0,0.03)`, 150ms    |
| Settle pressed   | Settle button bg → `settleGreenDark`, 150ms |
| Loading (settle) | Spinner in settle button, opacity 0.7       |

### RecentExpenseRow

| State   | Visual                                   |
| ------- | ---------------------------------------- |
| Default | As specified                             |
| Pressed | Row background `rgba(0,0,0,0.03)`, 150ms |

### HeroBanner

| State   | Visual                                                     |
| ------- | ---------------------------------------------------------- |
| Loading | Skeleton shimmer over entire banner                        |
| Error   | "Could not load balance" in white at 65% opacity, centered |

---

## Empty States

### No Members

Replace BalanceRow list with:

- Icon: people icon, 32px, `text4`
- Text: "No members yet", 14px regular `text3`
- CTA: "Invite Members" link, `brand`

### No Expenses

Replace RecentExpenseRow list with:

- Icon: receipt icon, 32px, `text4`
- Text: "No expenses yet", 14px regular `text3`
- CTA: "Add the first expense" link, `brand`

---

## Layout Diagram

```
┌─────────────────────────────────────────┐
│  [NavBar: ← | Logo + "Bali Trip" | ⚙]  │  ← 56px + safe area
├─────────────────────────────────────────┤
│  screenBg #F2F3F7                       │
│                                         │
│  ┌─────────────────────────────────┐    │  ← marginHorizontal 16
│  │  HeroBanner                     │    │
│  │  [Decorative orb top-right]     │    │
│  │  ★ Bali Trip                    │    │
│  │  5 members                      │    │
│  │  ─────────────────────────────  │    │
│  │  YOUR BALANCE  │  TOTAL SPENT   │    │
│  │  +$42.00       │  $340.00       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │  ← marginHorizontal 16
│  │  Balances              See All  │    │
│  │  ─────────────────────────────  │    │
│  │  [AV] Alex    +$42.00  [Settle] │    │
│  │       ─────────────────────     │    │  ← separator inset 72px
│  │  [AV] Jamie   -$18.50  [Settle] │    │
│  │       ─────────────────────     │    │
│  │  [AV] Sam     Settled           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │  ← marginHorizontal 16
│  │  Recent Expenses       See All  │    │
│  │  ─────────────────────────────  │    │
│  │  [🍜] Dinner at Nobu  -$42.00   │    │
│  │       ──────────────────────    │    │  ← separator inset 72px left, 16px right
│  │  [🏨] Hotel Booking   +$21.00   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [+ Add Expense]                        │  ← marginHorizontal 16
│                                         │
└─────────────────────────────────────────┘
```

---

## AI Prompt — Group Detail Screen

```
Design a premium mobile group detail screen for a bill-splitting app called SplitEasy.

BACKGROUND: Screen background is #F2F3F7. All card panels are white (#FFFFFF) with borderRadius 16
and marginHorizontal 16. Cards float on the grey background.

NAVBAR (56px + safe area, white, 1px #F1F5F9 bottom border):
Left: chevron-left icon, 22px, #3730A3 (heroIndigo).
Center: 24px split-circle logo (left half solid #3B5BDB, right half transparent with #3B5BDB outline)
followed by group name "Bali Trip" in 18px bold #0F172A.
Right: A custom view-based cog icon — 24px outer circle with #64748B stroke, 8 evenly-spaced teeth
around the perimeter, 8px inner circle. Not a glyph — rendered as a geometric shape.

HERO BANNER (marginHorizontal 16, marginTop 16, borderRadius 16, overflow hidden):
Two-band background: top 50% is #3730A3 (heroIndigo), bottom 50% is #4F46E5 (heroIndigoBright).
Decorative orb: 180px circle, rgba(255,255,255,0.10) background, positioned absolute at top -40px,
right -40px, bleeding off the corner.

Top section (padding 20px horizontal, 20px top):
- Row: star icon (18px white) + group name "Bali Trip" (20px bold white, letterSpacing -0.3)
- Below: "5 members" in 14px regular white at 80% opacity, marginTop 4px

Hairline divider: 1px rgba(255,255,255,0.25), marginTop 16px, full width.

Stats row below divider: two equal cells (flex 1 each) separated by a 1px vertical divider
(52px tall, rgba(255,255,255,0.25)).
Each cell: centered, paddingVertical 16px.
- Stat label: 11px semibold white at 75% opacity, letterSpacing 1.2, uppercase
- Stat value: 28px bold, letterSpacing -0.5, marginTop 4px
Left cell: "YOUR BALANCE" label, "+$42.00" value in #16A34A (posAlt green — positive balance)
Right cell: "TOTAL SPENT" label, "$340.00" value in white

BALANCES CARD (white, borderRadius 16, marginHorizontal 16, marginTop 16, overflow hidden):
Header: "Balances" 16px bold #0F172A, "See All" 13px medium #6366F1, paddingHorizontal 16,
paddingTop 16, paddingBottom 12.

Each balance row (paddingHorizontal 16, paddingVertical 12, flex row, align center):
- Left: 44×44px pill avatar (borderRadius 999, per-member color background, white initials 14px bold
  letterSpacing 0.5)
- Center: member name 15px semibold #0F172A, sub-label "owes you" 12px regular #64748B
- Right: amount badge + settle button (8px gap)
  * Positive badge: #DCFCE7 bg + #16A34A text, 13px semibold, paddingH 8, paddingV 4, radius 999
  * Negative badge: #FEE2E2 bg + #DC2626 text
  * Settled badge: transparent bg + 1px #E2E8F0 border + #94A3B8 text
  * Settle button: #2D9B6F background, pill shape, 30px height, 12px horizontal padding,
    "Settle" 13px semibold white
Separator: 1px #F1F5F9, inset left 72px.

RECENT EXPENSES CARD (same container style as balances card):
Header: "Recent Expenses" + "See All" link.

Each expense row (paddingHorizontal 16, paddingVertical 12, flex row, align center):
- Left: 44×44px icon tile, borderRadius 12, #4F46E5 (heroIndigoBright) background, emoji centered 22px
- Center: expense name 15px bold #0F172A, meta "Paid by Alex · Mar 12" 13px regular #64748B
- Right: amount 14px semibold — #16A34A for positive, #DC2626 for negative
Separator: 1px #F1F5F9, inset left 72px, inset right 16px.

ADD EXPENSE BUTTON (marginHorizontal 16, marginTop 12, height 52px, borderRadius 14):
Background: #EEF2FF (brandLight). Border: 1.5px #C7D2FE (brandMid).
Plus icon 18px #6366F1 + "Add Expense" text 15px semibold #6366F1, centered, 8px gap.

The overall feel: premium fintech group management. The hero banner with its two-tone indigo gradient
and decorative orb creates a strong visual anchor. The white cards below feel clean and organized.
The green balance stat value on the dark banner is the most important data point on the screen.
```
