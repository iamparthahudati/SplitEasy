# 09 — Expense Detail Screen

## 1. Screen Purpose & User Flow Context

The Expense Detail screen presents a read-only summary of a single expense record. It is reached by tapping any expense row in the Group Detail screen's transaction list. The user can review the full breakdown — who paid, how the cost was split across members, any attached notes, and metadata — then optionally navigate to edit the expense or delete it. Deletion triggers a confirmation alert before removing the record and returning to Group Detail.

**Entry points:** Group Detail expense row tap → Expense Detail  
**Exit points:** Back → Group Detail | Edit icon → Add Expense (edit mode) | Delete → Group Detail (expense removed)

---

## 2. Design System Tokens

| Token        | Value     | Usage                                     |
| ------------ | --------- | ----------------------------------------- |
| `brand`      | `#4F46E5` | Category tag color, accent elements       |
| `brandDark`  | `#3730A3` | Brand pressed state                       |
| `brandLight` | `#EEF2FF` | Category tag background                   |
| `text1`      | `#0F172A` | Description, member names, primary labels |
| `text2`      | `#334155` | Amount display, secondary content         |
| `text3`      | `#64748B` | Subtitles, section headers                |
| `text4`      | `#94A3B8` | Footer metadata, timestamps               |
| `border`     | `#E2E8F0` | Card borders, hairlines                   |
| `borderMid`  | `#CBD5E1` | Row dividers                              |
| `bg`         | `#F8FAFC` | Screen background                         |
| `white`      | `#FFFFFF` | Card surfaces, hero section               |
| `pos`        | `#10B981` | Positive / paid amounts                   |
| `neg`        | `#EF4444` | Destructive actions, owed amounts         |
| `negBg`      | `#FEF2F2` | Delete button background tint             |

**Typography**

| Role                      | Size | Weight | Line Height |
| ------------------------- | ---- | ------ | ----------- |
| Amount — whole part       | 48px | 700    | 56px        |
| Amount — symbol / decimal | 20px | 700    | 28px        |
| Description               | 24px | 700    | 32px        |
| Section header            | 10px | 600    | 14px        |
| Body / row label          | 14px | 500    | 20px        |
| Row subtitle              | 12px | 400    | 16px        |
| Notes text                | 14px | 400    | 22px        |
| Footer metadata           | 10px | 400    | 14px        |
| Tag label                 | 12px | 500    | 16px        |

---

## 3. Screen Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + edit)     │
├─────────────────────────────────┤
│  Hero Section (white)           │  paddingHorizontal 20
│    AmountDisplay xl             │  paddingTop 24
│    Description                  │  paddingBottom 20
│    Category Tag                 │  hairline bottom border
├─────────────────────────────────┤
│  ScrollView (flex 1, bg)        │
│                                 │
│  SectionHeader 'PAID BY'        │  marginTop 16
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ Payer ListRow           │    │  marginTop 12
│  └─────────────────────────┘    │
│                                 │
│  SectionHeader 'SPLIT BREAKDOWN'│  marginTop 20
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ MemberRow × N           │    │  marginTop 12
│  └─────────────────────────┘    │
│                                 │
│  SectionHeader 'NOTES'          │  marginTop 20 (conditional)
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ Notes text              │    │  marginTop 12
│  └─────────────────────────┘    │
│                                 │
│  Footer row                     │  marginHorizontal 16
│                                 │  marginTop 16
│  [    Delete Expense    ]       │  marginHorizontal 16
│                                 │  marginTop 20
└─────────────────────────────────┘
```

---

## 4. Component Breakdown & Exact Specs

### 4.1 ScreenHeader

| Property           | Value                                              |
| ------------------ | -------------------------------------------------- |
| Background         | `white`                                            |
| Height             | 56px                                               |
| Left element       | Back chevron icon, 24px, `text2`                   |
| Title              | `Expense Detail`, 17px SemiBold, `text1`, centered |
| Right element      | Edit icon (`edit-2` Feather), 20px, `brand`        |
| Right touch area   | 44×44px minimum                                    |
| Bottom border      | 1px `border` hairline                              |
| Padding horizontal | 16px                                               |

---

### 4.2 Hero Section

| Property           | Value                 |
| ------------------ | --------------------- |
| Background         | `white`               |
| Padding horizontal | 20px                  |
| Padding top        | 24px                  |
| Padding bottom     | 20px                  |
| Align items        | `center`              |
| Bottom border      | 1px `border` hairline |

**AmountDisplay — XL**

Baseline-aligned row: currency symbol + whole number + decimal part.

| Element             | Size                                | Weight | Color                                          |
| ------------------- | ----------------------------------- | ------ | ---------------------------------------------- |
| Currency symbol `$` | 20px                                | 700    | `pos` `#10B981` (positive) or `neg` (negative) |
| Whole number        | 48px                                | 700    | Same as symbol                                 |
| Decimal `.XX`       | 20px                                | 700    | Same as symbol                                 |
| Alignment           | `alignItems: 'flex-end'` (baseline) | —      | —                                              |
| Margin bottom       | 12px                                | —      | —                                              |

> Color rule: if the current user is owed money (others owe them), use `pos`. If the user owes money, use `neg`. For a neutral view (admin), use `text1`.

**Description**

| Property      | Value    |
| ------------- | -------- |
| Font size     | 24px     |
| Font weight   | 700      |
| Color         | `text1`  |
| Text align    | `center` |
| Margin bottom | 12px     |
| Max lines     | 2        |

**Category Tag**

| Property             | Value                  |
| -------------------- | ---------------------- |
| Background           | `brandLight` `#EEF2FF` |
| Border radius        | 999px                  |
| Padding horizontal   | 12px                   |
| Padding vertical     | 6px                    |
| Emoji size           | 14px                   |
| Label font size      | 12px                   |
| Label font weight    | 500                    |
| Label color          | `brand` `#4F46E5`      |
| Gap (emoji to label) | 4px                    |
| Flex direction       | `row`                  |
| Align items          | `center`               |

---

### 4.3 Section Headers

Reusable `SectionHeader` component used above each card.

| Property          | Value                       |
| ----------------- | --------------------------- |
| Text transform    | `uppercase`                 |
| Font size         | 10px                        |
| Font weight       | 600                         |
| Color             | `text3` `#64748B`           |
| Letter spacing    | 0.8px                       |
| Margin horizontal | 16px                        |
| Margin top        | 20px (first instance: 16px) |

---

### 4.4 "Paid By" Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Margin top        | 12px     |
| Overflow          | `hidden` |

**Payer ListRow**

| Property           | Value    |
| ------------------ | -------- |
| Flex direction     | `row`    |
| Align items        | `center` |
| Padding horizontal | 16px     |
| Padding vertical   | 14px     |
| Gap                | 12px     |

**Avatar (sm)**

| Property             | Value         |
| -------------------- | ------------- |
| Size                 | 32×32px       |
| Border radius        | 16px          |
| Background           | `brandLight`  |
| Initials font size   | 12px          |
| Initials font weight | 600           |
| Initials color       | `brand`       |
| Icon background      | `transparent` |

**Payer Name**

| Property    | Value   |
| ----------- | ------- |
| Font size   | 14px    |
| Font weight | 500     |
| Color       | `text1` |

**Payer Subtitle**

| Property    | Value                  |
| ----------- | ---------------------- |
| Text        | `paid the full amount` |
| Font size   | 12px                   |
| Font weight | 400                    |
| Color       | `text3`                |
| Margin top  | 2px                    |

**Right element:** None (no chevron — read-only row).

---

### 4.5 "Split Breakdown" Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Margin top        | 12px     |
| Overflow          | `hidden` |

**Per-Member Row**

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| Flex direction     | `row`                                     |
| Align items        | `center`                                  |
| Padding horizontal | 16px                                      |
| Padding vertical   | 12px                                      |
| Bottom border      | 1px `borderMid` hairline (last row: none) |

**Avatar (sm)** — same spec as Paid By card.

**Member Name**

| Property    | Value   |
| ----------- | ------- |
| Font size   | 14px    |
| Font weight | 500     |
| Color       | `text1` |
| Flex        | 1       |
| Margin left | 12px    |

**AmountDisplay — SM (right-aligned)**

| Element             | Size    | Weight | Color   |
| ------------------- | ------- | ------ | ------- |
| Currency symbol `$` | 12px    | 600    | `text2` |
| Amount              | 16px    | 600    | `text2` |
| Text align          | `right` | —      | —       |

> If the row member is the current user and they owe, color the amount `neg`. If they are owed, color `pos`.

---

### 4.6 "Notes" Card (Conditional)

Rendered only when the expense has a non-empty notes field.

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Margin top        | 12px     |
| Overflow          | `hidden` |

**Notes Text**

| Property    | Value   |
| ----------- | ------- |
| Font size   | 14px    |
| Font weight | 400     |
| Color       | `text2` |
| Line height | 22px    |
| Padding     | 16px    |

---

### 4.7 Footer Row

| Property          | Value           |
| ----------------- | --------------- |
| Flex direction    | `row`           |
| Justify content   | `space-between` |
| Margin horizontal | 16px            |
| Margin top        | 16px            |
| Margin bottom     | 4px             |

**Left — Date**

| Property    | Value                               |
| ----------- | ----------------------------------- |
| Text        | Formatted date, e.g. `Apr 24, 2026` |
| Font size   | 10px                                |
| Font weight | 400                                 |
| Color       | `text4`                             |

**Right — Added by**

| Property    | Value          |
| ----------- | -------------- |
| Text        | `Added by You` |
| Font size   | 10px           |
| Font weight | 400            |
| Color       | `text4`        |

---

### 4.8 Delete Button

| Property           | Value                                                  |
| ------------------ | ------------------------------------------------------ |
| Variant            | `danger`                                               |
| Height             | 52px                                                   |
| Border radius      | 14px                                                   |
| Background         | `negBg` `#FEF2F2`                                      |
| Label              | `Delete Expense`                                       |
| Label font size    | 15px                                                   |
| Label font weight  | 600                                                    |
| Label color        | `neg` `#EF4444`                                        |
| Margin horizontal  | 16px                                                   |
| Margin top         | 20px                                                   |
| Margin bottom      | 32px (safe area)                                       |
| Pressed background | `#FEE2E2`                                              |
| Icon               | `trash-2` Feather, 18px, `neg`, left of label, gap 8px |

**Delete Alert**

| Property       | Value                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------- |
| Title          | `Delete Expense`                                                                            |
| Message        | `This will permanently remove this expense and update all balances. This cannot be undone.` |
| Confirm button | `Delete`, destructive style                                                                 |
| Cancel button  | `Cancel`                                                                                    |

---

## 5. Interaction States

### Edit Icon (Header)

| State   | Visual                         |
| ------- | ------------------------------ |
| Default | `brand` color                  |
| Pressed | `brandDark` color, opacity 0.8 |

### Member Row (Split Breakdown)

| State          | Visual                          |
| -------------- | ------------------------------- |
| Default        | White bg                        |
| No interaction | Static — rows are not pressable |

### Delete Button

| State                  | Visual                            |
| ---------------------- | --------------------------------- |
| Default                | `negBg` bg, `neg` label           |
| Pressed                | `#FEE2E2` bg, scale 0.98          |
| Loading (post-confirm) | Activity indicator replaces label |

---

## 6. Empty & Edge States

| Scenario                      | Behavior                                                                |
| ----------------------------- | ----------------------------------------------------------------------- |
| No notes                      | Notes section hidden entirely                                           |
| Single member group           | Split breakdown shows one row                                           |
| Very long description         | Truncated at 2 lines with ellipsis in hero; full text visible on scroll |
| Amount is a round number      | Decimal `.00` still shown for consistency                               |
| Expense added by another user | Footer shows `Added by [Name]` instead of `Added by You`                |
| Current user is the payer     | Payer row subtitle reads `You paid the full amount`                     |

---

## 7. AI Prompt — Premium Redesign

```
Design a premium mobile screen called "Expense Detail" for a bill-splitting app called SplitEasy.
The app uses a clean light design system with the following tokens:
  brand=#4F46E5, brandDark=#3730A3, brandLight=#EEF2FF,
  text1=#0F172A, text2=#334155, text3=#64748B, text4=#94A3B8,
  border=#E2E8F0, borderMid=#CBD5E1, bg=#F8FAFC, white=#FFFFFF,
  pos=#10B981, neg=#EF4444, negBg=#FEF2F2.

SCREEN STRUCTURE (top to bottom):

1. SCREEN HEADER
   White background, 56px tall, hairline bottom border (#E2E8F0).
   Left: back chevron 24px text2. Center: "Expense Detail" 17px SemiBold text1.
   Right: edit-2 icon 20px brand color, 44px touch target.

2. HERO SECTION
   White background, paddingHorizontal 20px, paddingTop 24px, paddingBottom 20px.
   All content centered. Hairline bottom border.
   - AmountDisplay XL: baseline-aligned row of "$" symbol 20px bold + whole number 48px bold + decimal 20px bold.
     Color the entire amount in pos (#10B981) if the viewer is owed money, neg (#EF4444) if they owe.
     Margin bottom 12px.
   - Description: 24px bold text1, centered, max 2 lines, margin bottom 12px.
     Example: "Team Dinner"
   - Category Tag: pill shape, brandLight bg, borderRadius 999px, paddingHorizontal 12px, paddingVertical 6px.
     Row with emoji 14px + label 12px medium brand color, gap 4px.
     Example: "🍔 Food"

3. PAID BY SECTION
   SectionHeader "PAID BY": 10px SemiBold text3 uppercase letterSpacing 0.8, marginHorizontal 16px, marginTop 16px.
   White card: borderRadius 12px, marginHorizontal 16px, marginTop 12px.
   Single ListRow: paddingHorizontal 16px, paddingVertical 14px, flexDirection row, gap 12px.
   - Avatar 32px circle: brandLight bg, brand initials 12px SemiBold.
   - Column: name 14px medium text1 + subtitle "paid the full amount" 12px regular text3, marginTop 2px.
   - No chevron (read-only).

4. SPLIT BREAKDOWN SECTION
   SectionHeader "SPLIT BREAKDOWN": same style, marginTop 20px.
   White card: borderRadius 12px, marginHorizontal 16px, marginTop 12px.
   Per-member rows: flexDirection row, alignItems center, paddingHorizontal 16px, paddingVertical 12px,
   hairline bottom border (borderMid) except last row.
   - Avatar 32px circle (brandLight bg, brand initials).
   - Name 14px medium text1, flex 1, marginLeft 12px.
   - AmountDisplay SM right-aligned: "$" 12px SemiBold text2 + amount 16px SemiBold text2.
     Color neg if this member owes, pos if they are owed.

5. NOTES SECTION (conditional — only if notes exist)
   SectionHeader "NOTES": same style, marginTop 20px.
   White card: borderRadius 12px, marginHorizontal 16px, marginTop 12px.
   Notes text: 14px regular text2, lineHeight 22px, padding 16px.

6. FOOTER ROW
   flexDirection row, justifyContent space-between, marginHorizontal 16px, marginTop 16px.
   Left: date string "Apr 24, 2026" — 10px regular text4.
   Right: "Added by You" — 10px regular text4.

7. DELETE BUTTON
   Danger variant: height 52px, borderRadius 14px, negBg (#FEF2F2) background.
   Row: trash-2 icon 18px neg + "Delete Expense" 15px SemiBold neg, gap 8px.
   marginHorizontal 16px, marginTop 20px, marginBottom 32px.
   Pressed: #FEE2E2 bg, scale 0.98.
   On press: show Alert "Delete Expense" with destructive confirm.

VISUAL DIRECTION:
- The hero section is the emotional anchor of the screen — large amount, bold description, colorful tag.
- The amount color immediately communicates financial status: green = good (owed to you), red = attention (you owe).
- Cards are white on #F8FAFC background — no shadows, depth through contrast only.
- The split breakdown is the most data-dense section; keep rows clean with generous vertical padding.
- The delete button is visually subdued (light red bg, not solid red) to avoid alarming the user.
- Typography hierarchy: 48px amount → 24px description → 17px header → 14px body → 12px subtitles/tags → 10px metadata.
- Spacing: 20px between major sections, 12px card-to-header gap, 16px internal padding.
- Render at 390×844px (iPhone 14 Pro), light mode only.
```

---

## 8. Accessibility Notes

- Edit icon: `accessibilityLabel="Edit expense"`, `accessibilityRole="button"`
- AmountDisplay: `accessibilityLabel="$48.50 — you owe"` (combine symbol, amount, and context)
- Category tag: `accessibilityLabel="Category: Food"`
- Delete button: `accessibilityLabel="Delete expense"`, `accessibilityRole="button"`
- Member rows: `accessibilityLabel="[Name] owes $12.00"` (descriptive, not just the number)
- Notes section: `accessibilityLabel="Notes: [notes text]"`
