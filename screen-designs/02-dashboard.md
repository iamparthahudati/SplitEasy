# Dashboard — GroupsHomeScreen Design

**Screen:** GroupsHomeScreen  
**Design Mode:** Light App  
**Last Updated:** 2026-04-24

---

## Overview

The Dashboard is the primary home screen of SplitEasy. It gives users an at-a-glance view of their overall financial position across all groups, a searchable list of their groups, and a quick-add FAB for creating new groups or expenses. It is the first screen users see after onboarding and after every app launch.

**User flow context:**

- Entry point from tab bar (Home tab, active)
- Tapping a group card navigates to GroupDetailScreen
- FAB opens a bottom sheet: "New Group" or "Add Expense"
- Bell icon opens NotificationsScreen
- "Settle All" button on the balance banner opens a settle-up flow

---

## Visual Design

### Background

`screenBg` `#F2F3F7` fills the entire screen. This slightly grey-tinted white is intentional — it makes white cards appear to float and creates visual separation between sections without using borders or shadows.

### StatusBar

`light-content` icons (dark text on light background). No background color override needed.

---

## Component Breakdown

### 1. Header

**Container:**

| Property           | Value                    |
| ------------------ | ------------------------ |
| Background         | `#FFFFFF`                |
| Height             | 56px + safe area top     |
| Padding horizontal | 16px                     |
| Border bottom      | 1px `#F1F5F9` (`border`) |
| Shadow             | none                     |
| Flex direction     | row                      |
| Align items        | center                   |
| Justify content    | space-between            |

**Left slot — Logo + App Name:**

Flex row, align center, gap 10px.

_Split-circle logo mark:_

| Property       | Value                                       |
| -------------- | ------------------------------------------- |
| Diameter       | 28px                                        |
| Left half      | Solid `logoBlueBrand` `#3B5BDB`             |
| Right half     | Transparent, `#3B5BDB` outline stroke 1.5px |
| Center divider | 1px `#3B5BDB`                               |

_App name text block:_

| Element       | Size | Weight        | Color                     |
| ------------- | ---- | ------------- | ------------------------- |
| "SplitEasy"   | 18px | 700 (bold)    | `logoBlueBrand` `#3B5BDB` |
| "Your groups" | 12px | 400 (regular) | `text3` `#64748B`         |

The subtitle "Your groups" sits directly below the app name, 2px gap.

**Right slot — Bell button:**

| Property       | Value                                                     |
| -------------- | --------------------------------------------------------- |
| Size           | 40×40px                                                   |
| Border radius  | 999 (pill)                                                |
| Background     | `bg` `#F8FAFC`                                            |
| Border         | 1px `border` `#F1F5F9`                                    |
| Icon           | Bell, 20px, `text3` `#64748B`                             |
| Badge (unread) | 8px red dot, `neg` `#DC2626`, top-right corner, no border |

---

### 2. BalanceBanner

**Container:**

| Property          | Value                          |
| ----------------- | ------------------------------ |
| Margin horizontal | 16px                           |
| Margin top        | 16px                           |
| Border radius     | 16px                           |
| Overflow          | hidden                         |
| Min height        | 100px                          |
| Padding           | 20px horizontal, 20px vertical |

**Background layers (layered Views):**

| Layer   | Color                                         | Coverage                 |
| ------- | --------------------------------------------- | ------------------------ |
| Base    | `settleGreen` `#2D9B6F`                       | Full banner              |
| Overlay | `settleGreenDark` `#1A7A52` at opacity `0.55` | Top 40% of banner height |

**Content layout:** Two columns, flex row, align center, justify space-between.

**Left column:**

| Element   | Size | Weight         | Color                    | Notes                                         |
| --------- | ---- | -------------- | ------------------------ | --------------------------------------------- |
| Label     | 11px | 600 (semibold) | `rgba(255,255,255,0.75)` | "TOTAL BALANCE", letterSpacing 1.2, uppercase |
| Amount    | 36px | 700 (bold)     | `#FFFFFF`                | letterSpacing -0.5, marginTop 4px             |
| Sub-label | 12px | 400 (regular)  | `rgba(255,255,255,0.65)` | "across 4 groups", marginTop 2px              |

**Right column:**

_Settle All button:_

| Property           | Value                          |
| ------------------ | ------------------------------ |
| Height             | 36px                           |
| Padding horizontal | 16px                           |
| Border radius      | 999 (pill)                     |
| Background         | transparent                    |
| Border             | 1.5px `rgba(255,255,255,0.60)` |
| Text               | "Settle All"                   |
| Text size          | 13px                           |
| Text weight        | 600 (semibold)                 |
| Text color         | `#FFFFFF`                      |

Press state: background becomes `rgba(255,255,255,0.15)`, 150ms ease.

**Positive balance variant:** Amount shows `+$124.50` — always prefixed with `+` for positive.  
**Negative balance variant:** Amount shows `-$38.00` — always prefixed with `-` for negative.  
**Zero balance variant:** Amount shows `$0.00`, label changes to "All settled up", Settle All button is hidden.

---

### 3. SearchBar

**Container:**

| Property           | Value                     |
| ------------------ | ------------------------- |
| Margin horizontal  | 16px                      |
| Margin top         | 16px                      |
| Height             | 44px                      |
| Border radius      | 12px                      |
| Background         | `#FFFFFF`                 |
| Border             | 1px `borderMid` `#E2E8F0` |
| Flex direction     | row                       |
| Align items        | center                    |
| Padding horizontal | 12px                      |

**Search icon:** 18px, `text3` `#64748B`, left side, 8px gap to input.

**Text input:**

| Property          | Value              |
| ----------------- | ------------------ |
| Flex              | 1                  |
| Font size         | 14px               |
| Font weight       | 400                |
| Text color        | `text1` `#0F172A`  |
| Placeholder       | "Search groups..." |
| Placeholder color | `text4` `#94A3B8`  |

**Clear button** (visible when input has text): X icon, 16px, `text3`, right side.

---

### 4. Section Label

| Property           | Value             |
| ------------------ | ----------------- |
| Text               | "MY GROUPS"       |
| Font size          | 12px              |
| Font weight        | 600 (semibold)    |
| Color              | `text3` `#64748B` |
| Letter spacing     | 0.8               |
| Text transform     | uppercase         |
| Padding horizontal | 16px              |
| Margin top         | 24px              |
| Margin bottom      | 8px               |

---

### 5. GroupCard

Each group is rendered as a row inside a white card panel. Multiple groups share a single card container (no individual card per group). The card has `borderRadius: 16`, `marginHorizontal: 16`, `backgroundColor: '#FFFFFF'`, `overflow: 'hidden'`.

**Row container:**

| Property           | Value    |
| ------------------ | -------- |
| Height             | min 64px |
| Padding horizontal | 16px     |
| Padding vertical   | 12px     |
| Flex direction     | row      |
| Align items        | center   |

**Icon tile (left):**

| Property      | Value                                 |
| ------------- | ------------------------------------- |
| Size          | 48×48px                               |
| Border radius | 12px                                  |
| Background    | Per-group color (see color set below) |
| Content       | Emoji, centered, 24px                 |
| Margin right  | 12px                                  |

**Per-group color set** (cycle through for new groups):

| Index | Background             | Usage                 |
| ----- | ---------------------- | --------------------- |
| 0     | `#EEF2FF` (brandLight) | Default / first group |
| 1     | `#FEF3C7` (pendBg)     | Warm yellow           |
| 2     | `#D1FAE5` (posBg)      | Green                 |
| 3     | `#FEE2E2` (negBg)      | Red                   |
| 4     | `#F0F9FF`              | Sky blue              |
| 5     | `#FDF4FF`              | Purple                |

**Text block (center, flex 1):**

| Element    | Size | Weight        | Color             | Notes                                   |
| ---------- | ---- | ------------- | ----------------- | --------------------------------------- |
| Group name | 16px | 700 (bold)    | `text1` `#0F172A` | letterSpacing -0.1                      |
| Subtitle   | 13px | 400 (regular) | `text3` `#64748B` | "3 members · 5 expenses", marginTop 2px |

**Right slot — Balance badge:**

| State    | Background           | Text color         | Border          | Text      |
| -------- | -------------------- | ------------------ | --------------- | --------- |
| Positive | `posBgAlt` `#DCFCE7` | `posAlt` `#16A34A` | none            | "+$42.00" |
| Negative | `negBg` `#FEE2E2`    | `neg` `#DC2626`    | none            | "-$18.50" |
| Settled  | transparent          | `zero` `#94A3B8`   | 1px `borderMid` | "Settled" |

Badge specs: `paddingHorizontal: 10px`, `paddingVertical: 4px`, `borderRadius: 999`, `fontSize: 13px`, `fontWeight: 600`.

**Separator:**

| Property     | Value                                                  |
| ------------ | ------------------------------------------------------ |
| Height       | 1px                                                    |
| Background   | `border` `#F1F5F9`                                     |
| Margin left  | 76px (inset — aligns with text, after icon tile + gap) |
| Margin right | 0                                                      |

The last row in the card has no separator.

**Press state:** Row background flashes `rgba(0,0,0,0.03)`, 150ms ease.

---

### 6. Floating Action Button (FAB)

| Property            | Value                                             |
| ------------------- | ------------------------------------------------- |
| Size                | 56×56px                                           |
| Border radius       | 999 (pill)                                        |
| Background          | `brand` `#6366F1`                                 |
| Position            | `absolute`, bottom: 24px + safe area, right: 20px |
| Icon                | Plus (+), 24px, `#FFFFFF`                         |
| Shadow color        | `#6366F1`                                         |
| Shadow opacity      | 0.35                                              |
| Shadow radius       | 8                                                 |
| Shadow offset Y     | 4                                                 |
| Elevation (Android) | 6                                                 |

**Press state:** Spring scale `1.0 → 0.93 → 1.0` (tension 60, friction 7).

**FAB action sheet** (opens on press): Bottom sheet with two options:

- "New Group" — group icon, `text1`
- "Add Expense" — receipt icon, `text1`

---

### 7. Empty State

Shown when the user has no groups yet. Replaces the section label and group card list.

**Container:** Centered vertically in the remaining screen space below the search bar. `paddingHorizontal: 32px`.

| Element        | Spec                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Icon container | 64×64px circle, `brandLight` `#EEF2FF` bg, `brand` `#6366F1` plus icon 28px                                           |
| Title          | "No groups yet", 22px bold `text1`, marginTop 20px                                                                    |
| Subtitle       | "Create a group to start splitting bills with friends.", 14px regular `text3`, lineHeight 20, marginTop 8px, centered |
| CTA button     | "Create a Group", 56px height, 14px radius, `brand` bg, white text, marginTop 28px, full width                        |

---

## Scroll Behavior

The entire screen content (header excluded) scrolls inside a `ScrollView` or `FlatList`. The header is sticky (does not scroll). The FAB is positioned absolutely over the scroll content.

**Scroll padding bottom:** 80px (to prevent content from being hidden behind the FAB).

---

## States Summary

| State      | Description                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
| Loading    | Skeleton placeholders for BalanceBanner and GroupCard rows (shimmer animation) |
| Empty      | Empty state component (see Section 7)                                          |
| Error      | Inline error banner below header: "Could not load groups. Tap to retry."       |
| Refreshing | Pull-to-refresh spinner, `brand` `#6366F1` tint                                |
| Searching  | GroupCard list filters in real-time; "No results" state if no match            |

---

## AI Prompt — Dashboard (GroupsHomeScreen)

```
Design a premium mobile dashboard screen for a bill-splitting app called SplitEasy.

BACKGROUND: The screen background is #F2F3F7 (a slightly grey-tinted white). All content cards
are pure white (#FFFFFF) with borderRadius 16 and marginHorizontal 16. The grey background shows
through the gaps between cards, creating a floating card effect.

HEADER (56px + safe area, white background, 1px #F1F5F9 bottom border, no shadow):
Left side: A 28px split-circle logo (left half solid #3B5BDB, right half transparent with #3B5BDB
outline) followed by a text block — "SplitEasy" in 18px bold #3B5BDB, and "Your groups" in 12px
regular #64748B directly below.
Right side: A 40×40px pill button with #F8FAFC background and 1px #F1F5F9 border, containing a
bell icon (20px, #64748B). A small 8px red dot badge in the top-right corner for unread notifications.

BALANCE BANNER (marginHorizontal 16, marginTop 16, borderRadius 16, overflow hidden, minHeight 100px):
Base background: #2D9B6F (settle green). An overlay View covers the top 40% at #1A7A52 with
opacity 0.55, creating a subtle gradient effect.
Left side: Label "TOTAL BALANCE" in 11px semibold white at 75% opacity, letterSpacing 1.2, uppercase.
Below it: the amount "$124.50" in 36px bold white, letterSpacing -0.5. Below that: "across 4 groups"
in 12px regular white at 65% opacity.
Right side: "Settle All" pill button — transparent background, 1.5px white border at 60% opacity,
36px height, 16px horizontal padding, 13px semibold white text.

SEARCH BAR (marginHorizontal 16, marginTop 16, height 44px, borderRadius 12, white background,
1px #E2E8F0 border): Search icon (18px, #64748B) on the left with 8px gap. Text input "Search
groups..." placeholder in #94A3B8, 14px regular.

SECTION LABEL (paddingHorizontal 16, marginTop 24px): "MY GROUPS" in 12px semibold #64748B,
letterSpacing 0.8, uppercase.

GROUP CARD LIST (white card, borderRadius 16, marginHorizontal 16, overflow hidden):
Each row is 64px min height, paddingHorizontal 16, paddingVertical 12, flex row, align center.
Left: 48×48px icon tile with borderRadius 12 and a per-group pastel background color, containing
a centered emoji (24px).
Center: Group name in 16px bold #0F172A (letterSpacing -0.1), subtitle "3 members · 5 expenses"
in 13px regular #64748B, 2px gap.
Right: Balance badge — positive uses #DCFCE7 background + #16A34A text, negative uses #FEE2E2 +
#DC2626, settled uses transparent + 1px #E2E8F0 border + #94A3B8 text. Badge: 13px semibold,
paddingHorizontal 10, paddingVertical 4, borderRadius 999.
Separator: 1px #F1F5F9, inset left 76px (no separator on last row).

FAB (56×56px pill, position absolute, bottom 24px + safe area, right 20px):
Background: #6366F1 (brand indigo). Plus icon 24px white.
Shadow: color #6366F1, opacity 0.35, radius 8, offsetY 4, elevation 6.

The overall feel: clean, airy, premium fintech. Cards float on the grey background.
The green balance banner is the visual hero of the screen. Typography does the heavy lifting —
no decorative elements beyond the card structure.
```
