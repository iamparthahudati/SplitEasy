# 04 — Balances Screen

## 1. Screen Purpose & User Flow Context

The Balances screen gives users a consolidated view of all outstanding debts across every group they belong to. It answers the two most important questions at a glance: "Who owes me money?" and "Who do I owe?" Users land here from the bottom tab bar. From this screen they can filter by direction, scan individual balances, and initiate a settlement directly from a person row without navigating away.

**Flow position:** Tab 2 of 4 in the main tab navigator. No back button. Scrollable content beneath a fixed header and filter row.

---

## 2. Design System Tokens

| Token         | Value     | Usage                            |
| ------------- | --------- | -------------------------------- |
| `screenBg`    | `#F8FAFC` | Root background                  |
| `white`       | `#FFFFFF` | Cards, rows                      |
| `text1`       | `#0F172A` | Primary labels, names            |
| `text2`       | `#475569` | Secondary labels                 |
| `text3`       | `#94A3B8` | Tertiary labels, hints           |
| `borderLight` | `#F1F5F9` | Card borders, dividers           |
| `borderMid`   | `#E2E8F0` | Unselected chip border           |
| `brand`       | `#6366F1` | Selected chip bg, Settle pill bg |
| `brandLight`  | `#EEF2FF` | Chip press flash                 |
| `brandDark`   | `#4338CA` | —                                |
| `posGreen`    | `#2D9B6F` | Positive amount color            |
| `negRed`      | `#E11D48` | Negative amount color            |
| `posBg`       | `#D1FAE5` | —                                |
| `negBg`       | `#FFE4E6` | —                                |

**Typography scale**

| Role              | Size | Weight                                            | Letter Spacing |
| ----------------- | ---- | ------------------------------------------------- | -------------- |
| Screen title      | 24px | 700 Bold                                          | —              |
| Section header    | 10px | 600 Semibold                                      | 2px uppercase  |
| Row name          | 14px | 600 Semibold                                      | —              |
| Row subtitle      | 12px | 400 Regular                                       | —              |
| Chip label        | 12px | 600 Semibold (selected) / 500 Medium (unselected) | —              |
| Amount symbol     | 14px | —                                                 | —              |
| Amount whole      | 20px | 700 Bold                                          | —              |
| Amount decimal    | 14px | —                                                 | —              |
| Settle pill label | 10px | 600 Semibold                                      | —              |
| Net summary label | 12px | 500 Medium                                        | 0.1px          |

---

## 3. Visual Design Overview

The screen uses a layered card system on a soft `#F8FAFC` background. All interactive surfaces are white with a 1px `#F1F5F9` border and 16px border radius. The visual hierarchy flows top-to-bottom:

1. Screen title (left-aligned)
2. Net summary banner (two-column card)
3. Filter chip row
4. Section header + balances card list

Color is used sparingly and purposefully: green for money owed to you, red for money you owe, indigo for interactive elements. The Settle pill is the only filled-indigo element in the list, drawing the eye to the primary action.

---

## 4. Component Breakdown & Exact Specs

### 4.1 Root Container

```
SafeAreaView
  backgroundColor: #F8FAFC
  flex: 1
```

Content is wrapped in a `ScrollView` with `showsVerticalScrollIndicator: false` and `contentContainerStyle: { paddingBottom: 32 }`.

---

### 4.2 Screen Header

```
View
  paddingHorizontal: 16
  marginBottom: 16
  paddingTop: 8        ← from SafeAreaView top inset

  Text "Balances"
    fontSize: 24
    fontWeight: 700
    color: #0F172A
    letterSpacing: -0.3
```

No back button. No right action. Pure title.

---

### 4.3 NetSummaryBanner

A horizontal two-column card that summarises the user's net financial position.

```
View (card)
  marginHorizontal: 16
  marginBottom: 12
  backgroundColor: #FFFFFF
  borderRadius: 12
  borderWidth: 1
  borderColor: #F1F5F9
  flexDirection: row
  overflow: hidden
```

**Left column — "You are owed"**

```
View
  flex: 1
  paddingVertical: 16
  paddingHorizontal: 12
  gap: 4

  Text "You are owed"
    fontSize: 12
    fontWeight: 500
    color: #94A3B8
    letterSpacing: 0.1

  AmountDisplay (size=md)
    symbol: "$"  fontSize: 14  color: #2D9B6F
    whole: "124"  fontSize: 20  fontWeight: 700  color: #2D9B6F
    decimal: ".50"  fontSize: 14  color: #2D9B6F
    verticalAlign: baseline
```

**Vertical divider**

```
View
  width: 1
  backgroundColor: #F1F5F9
  marginVertical: 12
```

**Right column — "You owe"**

```
View
  flex: 1
  paddingVertical: 16
  paddingHorizontal: 12
  gap: 4

  Text "You owe"
    fontSize: 12
    fontWeight: 500
    color: #94A3B8
    letterSpacing: 0.1

  AmountDisplay (size=md)
    symbol: "$"  fontSize: 14  color: #E11D48
    whole: "47"  fontSize: 20  fontWeight: 700  color: #E11D48
    decimal: ".00"  fontSize: 14  color: #E11D48
    verticalAlign: baseline
```

**AmountDisplay color logic**

| Condition                | Color     |
| ------------------------ | --------- |
| Amount > 0 (owed to you) | `#2D9B6F` |
| Amount < 0 (you owe)     | `#E11D48` |
| Amount = 0               | `#94A3B8` |

---

### 4.4 Filter Chip Row

```
ScrollView (horizontal, showsHorizontalScrollIndicator: false)
  contentContainerStyle:
    flexDirection: row
    gap: 8
    paddingHorizontal: 16
    marginBottom: 16
```

**Chip — Selected state**

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

**Chip — Unselected state**

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

**Press animation:** Spring scale `0.94` on `onPressIn`, back to `1.0` on `onPressOut`.

```js
// Spring config
useSpring({ toValue: pressed ? 0.94 : 1, useNativeDriver: true });
```

**Chip labels:** `'All'` · `'Owed to you'` · `'You owe'`

---

### 4.5 Section Header (Compact)

```
View
  paddingHorizontal: 16
  marginBottom: 8

  Text "BALANCES"
    fontSize: 10
    fontWeight: 600
    color: #94A3B8
    letterSpacing: 2
    textTransform: uppercase
```

---

### 4.6 Balances Card

The outer card wraps all `PersonBalanceRow` items.

```
View (card)
  marginHorizontal: 16
  backgroundColor: #FFFFFF
  borderRadius: 16
  borderWidth: 1
  borderColor: #F1F5F9
  overflow: hidden
```

---

### 4.7 PersonBalanceRow

Each row represents one person the user has a balance with.

```
Pressable (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 12
  backgroundColor: #FFFFFF
```

**Avatar (md — 40px)**

```
View
  width: 40
  height: 40
  borderRadius: 20
  backgroundColor: <deterministic color from name hash>
  alignItems: center
  justifyContent: center
  marginRight: 12

  Text (initials)
    fontSize: 14
    fontWeight: 700
    color: #FFFFFF
```

Deterministic color palette (6 options, index = `charCodeAt(0) % 6`):
`#6366F1` · `#2D9B6F` · `#F59E0B` · `#EC4899` · `#14B8A6` · `#8B5CF6`

**Info block**

```
View
  flex: 1
  gap: 2

  Text (name)
    fontSize: 14
    fontWeight: 600
    color: #0F172A

  Text (subtitle — e.g. "3 groups")
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
```

**Right block**

```
View
  alignItems: flex-end
  gap: 6

  AmountDisplay (size=sm, showSign=true)
    symbol: 12px
    whole: 16px fontWeight 700
    decimal: 12px
    color: #2D9B6F or #E11D48 or #94A3B8

  Pressable (Settle pill)
    backgroundColor: #6366F1
    borderRadius: 999
    paddingVertical: 4
    paddingHorizontal: 12

    Text "Settle"
      fontSize: 10
      fontWeight: 600
      color: #FFFFFF
```

**Hairline separator**

```
View (absolute)
  position: absolute
  bottom: 0
  left: 16
  right: 0
  height: StyleSheet.hairlineWidth   ← 0.5px on iOS retina
  backgroundColor: #F1F5F9
```

Last row in the list omits the separator.

---

### 4.8 Empty State

Shown when no balances exist (all settled up).

```
View
  alignItems: center
  justifyContent: center
  marginTop: 40

  Icon: check-circle  size: 48  color: #94A3B8

  Text "All settled up!"
    fontSize: 16
    fontWeight: 600
    color: #0F172A
    marginTop: 16

  Text "You have no outstanding balances."
    fontSize: 14
    fontWeight: 400
    color: #94A3B8
    marginTop: 4
    textAlign: center
```

---

## 5. Interaction States

| Element          | State                   | Visual Change                                           |
| ---------------- | ----------------------- | ------------------------------------------------------- |
| Filter chip      | Press                   | Scale `0.94` spring, bg flashes `#EEF2FF` on unselected |
| Filter chip      | Selected                | `#6366F1` bg, white semibold label                      |
| PersonBalanceRow | Press                   | `backgroundColor` → `#F8FAFC` (subtle flash)            |
| Settle pill      | Press                   | Opacity `0.75`                                          |
| Settle pill      | Disabled (zero balance) | Hidden — do not render                                  |
| NetSummaryBanner | Zero state              | Amount color `#94A3B8`, no sign                         |
| Empty state      | No balances             | Render EmptyState, hide card and section header         |

---

## 6. Layout Measurements Summary

| Element          | Margin H | Margin B | Border Radius | Height       |
| ---------------- | -------- | -------- | ------------- | ------------ |
| Screen header    | 16       | 16       | —             | auto         |
| NetSummaryBanner | 16       | 12       | 12            | auto (~80px) |
| Filter chip row  | 16       | 16       | 999 (pill)    | 32           |
| Section header   | 16       | 8        | —             | 20           |
| Balances card    | 16       | —        | 16            | auto         |
| PersonBalanceRow | —        | —        | —             | ~64          |
| Settle pill      | —        | —        | 999           | 22           |

---

## 7. AI Prompt — Premium Redesign

```
You are a senior mobile UI designer specialising in fintech apps. Redesign the Balances screen for a React Native bill-splitting app called SplitEasy. The screen must feel premium, clean, and trustworthy — similar in quality to Revolut or Splitwise's best moments, but with a distinct indigo-first design language.

DESIGN SYSTEM (use these exact values):
- Background: #F8FAFC (soft off-white, not pure white)
- Card surface: #FFFFFF with 1px #F1F5F9 border
- Primary brand: #6366F1 (indigo)
- Brand light: #EEF2FF
- Positive green: #2D9B6F
- Negative red: #E11D48
- Text primary: #0F172A
- Text secondary: #475569
- Text tertiary: #94A3B8

SCREEN STRUCTURE (top to bottom):
1. Screen title "Balances" — 24px bold #0F172A, left-aligned, paddingHorizontal 16, marginBottom 16
2. NetSummaryBanner — horizontal two-column white card (borderRadius 12, 1px #F1F5F9 border, marginHorizontal 16, marginBottom 12). Left column: label "You are owed" (12px medium #94A3B8) + green amount. Right column: label "You owe" (12px medium #94A3B8) + red amount. Columns separated by a 1px #F1F5F9 vertical divider with 12px vertical margin. Amounts use baseline-aligned symbol+whole+decimal typography (14px / 20px bold / 14px).
3. Filter chip row — horizontal scrollable row, gap 8, paddingHorizontal 16, marginBottom 16. Three pill chips: "All", "Owed to you", "You owe". Selected chip: #6366F1 bg, white 12px semibold label. Unselected: white bg, 1px #E2E8F0 border, #475569 12px medium label. Spring scale animation to 0.94 on press.
4. Section header "BALANCES" — 10px semibold #94A3B8 uppercase letterSpacing 2, paddingHorizontal 16, marginBottom 8.
5. Balances card — white card, borderRadius 16, 1px #F1F5F9 border, marginHorizontal 16, overflow hidden. Contains PersonBalanceRow items.

PERSON BALANCE ROW (inside card):
- flexDirection row, alignItems center, paddingHorizontal 16, paddingVertical 12
- Left: 40px circle avatar with deterministic indigo/green/amber/pink/teal/purple bg, white 14px bold initials, marginRight 12
- Center (flex 1): name 14px semibold #0F172A + subtitle "N groups" 12px regular #94A3B8, gap 2
- Right: amount (AmountDisplay sm with sign, green or red) above a "Settle" pill (#6366F1 bg, 10px semibold white, paddingVertical 4 paddingHorizontal 12, borderRadius 999)
- Hairline separator (0.5px #F1F5F9) absolute bottom, left 16, right 0. Omit on last row.

EMPTY STATE (when no balances):
- Centered, marginTop 40
- check-circle icon 48px #94A3B8
- "All settled up!" 16px semibold #0F172A, marginTop 16
- "You have no outstanding balances." 14px regular #94A3B8, marginTop 4

INTERACTION QUALITY:
- All press states must feel immediate and satisfying
- Chip selection uses spring animation (not linear)
- Row press flashes background to #F8FAFC
- Settle pill press reduces opacity to 0.75
- Amounts animate in with a subtle fade when filter changes

OUTPUT: Provide a complete React Native screen component using StyleSheet.create, no external libraries except react-native-reanimated for spring animations. Use the exact color tokens above. Do not use placeholder colors or approximate values.
```

---

## 8. Screen Mockup — ASCII Reference

```
┌─────────────────────────────────────┐
│ Balances                            │  ← 24px bold, left
├─────────────────────────────────────┤
│ ┌──────────────┬──────────────────┐ │
│ │ You are owed │    You owe       │ │  ← NetSummaryBanner
│ │  $124.50     │   $47.00         │ │
│ └──────────────┴──────────────────┘ │
│                                     │
│ [All] [Owed to you] [You owe]       │  ← Filter chips
│                                     │
│ BALANCES                            │  ← Section header
│ ┌─────────────────────────────────┐ │
│ │ [AV] Alice M.      +$45.00      │ │
│ │      2 groups      [Settle]     │ │
│ ├─────────────────────────────────┤ │
│ │ [BK] Bob K.        +$79.50      │ │
│ │      1 group       [Settle]     │ │
│ ├─────────────────────────────────┤ │
│ │ [CL] Carol L.      -$47.00      │ │
│ │      1 group       [Settle]     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```
