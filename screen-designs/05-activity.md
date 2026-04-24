# 05 — Activity Screen

## 1. Screen Purpose & User Flow Context

The Activity screen is the chronological ledger of everything that has happened across all of the user's groups — expenses added, settlements recorded, and group events. It answers "what happened recently?" and serves as an audit trail. Users land here from Tab 3 of the bottom tab bar.

The screen uses a `SectionList` with sticky date headers so users can quickly scan by day. A fixed header (not part of the scroll) holds the title and filter chips so they are always accessible without scrolling back to the top.

**Flow position:** Tab 3 of 4. No back button. Fixed header + sticky-section scrollable list.

---

## 2. Design System Tokens

| Token         | Value     | Usage                                              |
| ------------- | --------- | -------------------------------------------------- |
| `screenBg`    | `#F8FAFC` | Root background, sticky section header bg          |
| `white`       | `#FFFFFF` | Fixed header bg, row bg                            |
| `text1`       | `#0F172A` | Row description, title                             |
| `text2`       | `#475569` | —                                                  |
| `text3`       | `#94A3B8` | Meta text, date labels, tertiary                   |
| `borderLight` | `#F1F5F9` | Row hairline separator                             |
| `borderMid`   | `#E2E8F0` | Fixed header bottom border, unselected chip border |
| `brand`       | `#6366F1` | Expense icon stroke, selected chip bg              |
| `brandLight`  | `#EEF2FF` | Expense icon circle bg                             |
| `settleGreen` | `#2D9B6F` | Settlement icon stroke, positive amount            |
| `posBg`       | `#D1FAE5` | Settlement icon circle bg                          |
| `negRed`      | `#E11D48` | Negative amount                                    |

**Typography scale**

| Role               | Size | Weight                                            | Letter Spacing |
| ------------------ | ---- | ------------------------------------------------- | -------------- |
| Screen title       | 24px | 700 Bold                                          | —              |
| Date section label | 10px | 600 Semibold                                      | 1px uppercase  |
| Row description    | 14px | 600 Semibold                                      | —              |
| Row meta           | 12px | 400 Regular                                       | —              |
| Chip label         | 12px | 600 Semibold (selected) / 500 Medium (unselected) | —              |
| Amount symbol      | 12px | —                                                 | —              |
| Amount whole       | 16px | 700 Bold                                          | —              |
| Amount decimal     | 12px | —                                                 | —              |

---

## 3. Visual Design Overview

The Activity screen is the most information-dense screen in the app. The design manages this density through:

- **Consistent row height** (~64px) with clear visual anchors (icon left, amount right)
- **Color-coded icon circles** that instantly communicate event type without reading text
- **Sticky date headers** that match the screen background, creating a seamless "floating label" effect as the list scrolls
- **Fixed header** that never scrolls away, keeping filter chips always accessible

The overall feel is a clean, readable timeline — not a cluttered feed. White space within rows and the soft background between sections prevent visual fatigue.

---

## 4. Component Breakdown & Exact Specs

### 4.1 Root Container

```
SafeAreaView
  backgroundColor: #F8FAFC
  flex: 1
```

The `ActivityHeader` is rendered outside the `SectionList` so it remains fixed. The `SectionList` fills the remaining space with `flex: 1`.

---

### 4.2 ActivityHeader (Fixed — Does Not Scroll)

```
View (header)
  backgroundColor: #FFFFFF
  paddingHorizontal: 16
  paddingTop: 12
  paddingBottom: 12
  borderBottomWidth: StyleSheet.hairlineWidth   ← ~0.5px
  borderBottomColor: #E2E8F0
```

**Title**

```
Text "Activity"
  fontSize: 24
  fontWeight: 700
  color: #0F172A
  marginBottom: 12
```

**Chip row**

```
ScrollView (horizontal, showsHorizontalScrollIndicator: false)
  contentContainerStyle:
    flexDirection: row
    gap: 8
```

Three chips: `'All'` · `'Expenses'` · `'Settlements'`

**Chip — Selected**

```
Pressable
  backgroundColor: #6366F1
  borderRadius: 999
  paddingVertical: 6
  paddingHorizontal: 14

  Text
    fontSize: 12
    fontWeight: 600
    color: #FFFFFF
```

**Chip — Unselected**

```
Pressable
  backgroundColor: #FFFFFF
  borderRadius: 999
  borderWidth: 1
  borderColor: #E2E8F0
  paddingVertical: 6
  paddingHorizontal: 14

  Text
    fontSize: 12
    fontWeight: 500
    color: #475569
```

Spring scale animation `0.94` on press (same as Balances screen for consistency).

---

### 4.3 SectionList

```
SectionList
  flex: 1
  stickySectionHeadersEnabled: true
  showsVerticalScrollIndicator: false
  contentContainerStyle:
    paddingBottom: 32
  keyExtractor: (item) => item.id
```

Sections are grouped by calendar day. Each section has a `title` string and a `data` array of event objects.

---

### 4.4 ActivityDateSection (Sticky Section Header)

The sticky header blends with the screen background so it appears to float over the list content as the user scrolls.

```
View
  backgroundColor: #F8FAFC    ← matches screenBg exactly
  paddingHorizontal: 16
  paddingVertical: 8

  Text
    fontSize: 10
    fontWeight: 600
    color: #94A3B8
    letterSpacing: 1
    textTransform: uppercase
```

**Date label logic**

| Condition     | Label                         |
| ------------- | ----------------------------- |
| Today         | `TODAY`                       |
| Yesterday     | `YESTERDAY`                   |
| Within 7 days | `MONDAY`, `TUESDAY`, etc.     |
| Older         | `APR 14, 2026` (MMM DD, YYYY) |

---

### 4.5 ActivityEventRow

Each row represents a single event (expense or settlement).

```
Pressable (row)
  flexDirection: row
  alignItems: center
  backgroundColor: #FFFFFF
  paddingHorizontal: 16
  paddingVertical: 12
  borderBottomWidth: StyleSheet.hairlineWidth
  borderBottomColor: #F1F5F9
```

**Icon circle**

```
View
  width: 40
  height: 40
  borderRadius: 20          ← pill / full circle
  marginRight: 12
  alignItems: center
  justifyContent: center

  ← Expense:
    backgroundColor: #EEF2FF
    Icon: "receipt" or "file-text"
      size: 20
      color: #6366F1
      strokeWidth: 1.5
      fill: none

  ← Settlement:
    backgroundColor: #D1FAE5
    Icon: "check-circle" or "arrow-right-left"
      size: 20
      color: #2D9B6F
      strokeWidth: 1.5
      fill: none
```

**Content block**

```
View
  flex: 1

  Text (description)
    fontSize: 14
    fontWeight: 600
    color: #0F172A
    marginBottom: 2
    numberOfLines: 1

  Text (meta)
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
    numberOfLines: 1
    ← format: "GroupName · 2h ago"
```

**Amount block**

```
View
  alignItems: flex-end

  AmountDisplay (size=sm)
    symbol: 12px
    whole: 16px fontWeight 700
    decimal: 12px
    verticalAlign: baseline
```

**Amount display rules**

| Event type                  | Sign shown | Color logic                 |
| --------------------------- | ---------- | --------------------------- |
| Expense — you paid          | No sign    | `#2D9B6F` (you are owed)    |
| Expense — someone else paid | No sign    | `#E11D48` (you owe a share) |
| Settlement — you paid       | Show `+`   | `#2D9B6F`                   |
| Settlement — you received   | Show `+`   | `#2D9B6F`                   |

For settlements, always display the absolute value with a `+` prefix to indicate money moving.

**Hairline separator**

The `borderBottomWidth: hairlineWidth` on the row itself acts as the separator. The last row in each section still has the border; the gap between sections is provided by the sticky header's `paddingVertical: 8`.

---

### 4.6 Empty State

Shown when the filtered list is empty.

```
View
  flex: 1
  alignItems: center
  justifyContent: center

  Icon: "activity"
    size: 48
    color: #94A3B8

  Text "No activity yet"
    fontSize: 16
    fontWeight: 600
    color: #0F172A
    marginTop: 16

  Text "Expenses and settlements\nwill appear here."
    fontSize: 14
    fontWeight: 400
    color: #94A3B8
    marginTop: 4
    textAlign: center
```

---

## 5. Interaction States

| Element          | State      | Visual Change                                   |
| ---------------- | ---------- | ----------------------------------------------- |
| Filter chip      | Press      | Scale `0.94` spring                             |
| Filter chip      | Selected   | `#6366F1` bg, white label                       |
| ActivityEventRow | Press      | `backgroundColor` → `#F8FAFC`                   |
| ActivityEventRow | Long press | Haptic feedback (light impact)                  |
| SectionList      | Scroll     | Sticky headers slide under fixed header cleanly |
| Filter change    | Transition | List fades out/in with 150ms opacity animation  |

---

## 6. Layout Measurements Summary

| Element             | Margin H | Padding V | Padding H | Height       |
| ------------------- | -------- | --------- | --------- | ------------ |
| ActivityHeader      | —        | 12        | 16        | auto (~88px) |
| ActivityDateSection | —        | 8         | 16        | ~28px        |
| ActivityEventRow    | —        | 12        | 16        | ~64px        |
| Icon circle         | —        | —         | —         | 40×40        |
| Chip                | —        | 6         | 14        | 32           |

---

## 7. Data Model Reference

```ts
type ActivityEvent = {
  id: string;
  type: 'expense' | 'settlement';
  description: string;
  groupName: string;
  amount: number; // always positive
  userOwes: boolean; // true = red, false = green (for expenses)
  timestamp: Date;
  relativeTime: string; // "2h ago", "just now"
};

type ActivitySection = {
  title: string; // "TODAY", "YESTERDAY", "APR 14, 2026"
  data: ActivityEvent[];
};
```

---

## 8. AI Prompt — Premium Redesign

```
You are a senior mobile UI designer specialising in fintech and social finance apps. Redesign the Activity screen for a React Native bill-splitting app called SplitEasy. The screen must feel like a premium, readable timeline — clean and information-dense without feeling cluttered. Reference quality: Revolut's transaction history combined with Splitwise's social clarity.

DESIGN SYSTEM (use these exact values):
- Screen background: #F8FAFC
- Fixed header / row background: #FFFFFF
- Fixed header bottom border: #E2E8F0 (hairline)
- Row separator: #F1F5F9 (hairline)
- Brand indigo: #6366F1
- Brand light: #EEF2FF
- Settle green: #2D9B6F
- Settlement bg: #D1FAE5
- Positive amount: #2D9B6F
- Negative amount: #E11D48
- Text primary: #0F172A
- Text tertiary: #94A3B8
- Unselected chip border: #E2E8F0

SCREEN ARCHITECTURE:
The screen has two distinct zones:
1. FIXED HEADER (does not scroll) — white bg, hairline bottom border
2. SECTIONLIST (scrolls beneath) — stickySectionHeadersEnabled: true

FIXED HEADER SPECS:
- backgroundColor: #FFFFFF
- paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12
- Title "Activity": 24px bold #0F172A, marginBottom: 12
- Chip row below title: horizontal scroll, gap 8, three chips: "All", "Expenses", "Settlements"
- Selected chip: #6366F1 bg, white 12px semibold, borderRadius 999, paddingVertical 6, paddingHorizontal 14
- Unselected chip: white bg, 1px #E2E8F0 border, #475569 12px medium, same padding/radius
- Spring scale 0.94 on chip press

STICKY DATE SECTION HEADER SPECS:
- backgroundColor: #F8FAFC (MUST match screen bg exactly — creates floating label illusion)
- paddingHorizontal: 16, paddingVertical: 8
- Label: 10px semibold #94A3B8, letterSpacing 1, uppercase
- Labels: "TODAY", "YESTERDAY", weekday names, or "APR 14, 2026"

ACTIVITY EVENT ROW SPECS:
- Pressable, flexDirection row, alignItems center
- backgroundColor: #FFFFFF
- paddingHorizontal: 16, paddingVertical: 12
- hairline bottom border #F1F5F9
- Press state: backgroundColor → #F8FAFC

LEFT — Icon circle (40×40px, borderRadius 20, marginRight 12):
  Expense: backgroundColor #EEF2FF, icon color #6366F1, strokeWidth 1.5, fill none, size 20
  Settlement: backgroundColor #D1FAE5, icon color #2D9B6F, strokeWidth 1.5, fill none, size 20

CENTER — Content (flex 1):
  Description: 14px semibold #0F172A, marginBottom 2, numberOfLines 1
  Meta: 12px regular #94A3B8, format "GroupName · 2h ago", numberOfLines 1

RIGHT — Amount (AmountDisplay sm, baseline-aligned):
  symbol 12px, whole 16px bold, decimal 12px
  Expense (you owe): #E11D48, no sign
  Expense (you paid): #2D9B6F, no sign
  Settlement: #2D9B6F, show absolute value with + prefix

EMPTY STATE (flex 1, centered):
  "activity" icon 48px #94A3B8
  "No activity yet" 16px semibold #0F172A, marginTop 16
  "Expenses and settlements\nwill appear here." 14px regular #94A3B8, marginTop 4, centered

INTERACTION QUALITY:
- Filter chip selection triggers a 150ms list fade transition
- Row press is immediate with no delay (no onPress delay)
- Sticky headers must slide cleanly under the fixed header (use zIndex if needed)
- Long press on a row triggers light haptic feedback

OUTPUT: Provide a complete React Native screen component. Use SectionList with stickySectionHeadersEnabled. Use StyleSheet.create with the exact tokens above. Use react-native-reanimated for spring animations on chips. Do not approximate any color values.
```

---

## 9. Screen Mockup — ASCII Reference

```
┌─────────────────────────────────────┐
│ Activity                            │  ← Fixed header (white)
│ [All] [Expenses] [Settlements]      │
├─────────────────────────────────────┤  ← hairline #E2E8F0
│ TODAY                               │  ← Sticky section header (#F8FAFC bg)
│ ┌─────────────────────────────────┐ │
│ │ [💜] Dinner at Nobu   $124.00   │ │  ← Expense row (indigo icon)
│ │      Roommates · 2h ago         │ │
│ ├─────────────────────────────────┤ │
│ │ [✓ ] Alex settled up  +$45.00   │ │  ← Settlement row (green icon)
│ │      Trip to Bali · 5h ago      │ │
│ └─────────────────────────────────┘ │
│ YESTERDAY                           │  ← Sticky section header
│ ┌─────────────────────────────────┐ │
│ │ [💜] Groceries        $67.50    │ │
│ │      Roommates · 1d ago         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```
