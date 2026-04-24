# 10 — Settle Up Screen

## 1. Screen Purpose & User Flow Context

The Settle Up screen allows a user to record a manual payment that resolves an outstanding balance with another group member. It is reached by tapping "Settle Up" on the Group Detail screen's balance summary or from a member's balance row. The user confirms the pre-filled amount, selects a payment method, optionally adds a note and date, then confirms. On confirmation a success alert is shown and the user is returned to Group Detail with the balance updated to zero.

**Entry points:** Group Detail balance row → Settle Up | Balance summary CTA → Settle Up  
**Exit points:** Confirm → Alert success → Group Detail (balance cleared) | Back → Group Detail (no change)

---

## 2. Design System Tokens

| Token        | Value     | Usage                                 |
| ------------ | --------- | ------------------------------------- |
| `brand`      | `#4F46E5` | Selected payment chip, primary button |
| `brandDark`  | `#3730A3` | Button pressed state                  |
| `brandLight` | `#EEF2FF` | Selected chip background              |
| `text1`      | `#0F172A` | Primary labels                        |
| `text2`      | `#334155` | Body text, unselected chip labels     |
| `text3`      | `#64748B` | Section labels, input icons           |
| `text4`      | `#94A3B8` | Placeholders, metadata                |
| `border`     | `#E2E8F0` | Card borders, hairlines               |
| `borderMid`  | `#CBD5E1` | Unselected chip borders               |
| `bg`         | `#F8FAFC` | Screen background                     |
| `white`      | `#FFFFFF` | Card surfaces                         |
| `pos`        | `#10B981` | Amount display (positive settlement)  |

**Typography**

| Role                    | Size | Weight | Line Height |
| ----------------------- | ---- | ------ | ----------- |
| Subheader               | 14px | 400    | 20px        |
| Amount — whole          | 48px | 700    | 56px        |
| Amount — symbol/decimal | 20px | 700    | 28px        |
| Section label           | 10px | 600    | 14px        |
| Chip label              | 13px | 500    | 18px        |
| Input body              | 14px | 400    | 20px        |
| Button label            | 16px | 600    | 24px        |

---

## 3. Screen Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + title)    │
├─────────────────────────────────┤
│  ScrollView (flex 1, bg)        │
│                                 │
│  Subheader text                 │  marginTop 16, centered
│                                 │
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ Amount Card             │    │  marginTop 12
│  │   AmountDisplay xl      │    │  paddingVertical 24
│  └─────────────────────────┘    │
│                                 │
│  Payment Method section         │  marginTop 20
│    Label                        │  marginHorizontal 16
│    Chip row                     │
│                                 │
│  Form section                   │  marginTop 20
│    InputField Notes             │  marginHorizontal 16
│    SelectRow Date               │
│                                 │
│  [    Confirm Payment    ]      │  marginHorizontal 16
│                                 │  marginTop 24
└─────────────────────────────────┘
```

---

## 4. Component Breakdown & Exact Specs

### 4.1 ScreenHeader

| Property           | Value                                         |
| ------------------ | --------------------------------------------- |
| Background         | `white`                                       |
| Height             | 56px                                          |
| Left element       | Back chevron icon, 24px, `text2`              |
| Title              | `Settle Up`, 17px SemiBold, `text1`, centered |
| Right element      | None                                          |
| Bottom border      | 1px `border` hairline                         |
| Padding horizontal | 16px                                          |

---

### 4.2 Subheader Text

| Property          | Value                         |
| ----------------- | ----------------------------- |
| Text              | `Settling with [Member Name]` |
| Font size         | 14px                          |
| Font weight       | 400                           |
| Color             | `text2`                       |
| Text align        | `center`                      |
| Margin top        | 16px                          |
| Margin bottom     | 8px                           |
| Margin horizontal | 16px                          |

---

### 4.3 Amount Card

| Property          | Value                 |
| ----------------- | --------------------- |
| Background        | `white`               |
| Border radius     | 12px                  |
| Margin horizontal | 16px                  |
| Margin top        | 12px                  |
| Padding vertical  | 24px                  |
| Align items       | `center`              |
| Border            | 1px `border` hairline |

**AmountDisplay — XL**

Baseline-aligned row: currency symbol + whole number + decimal.

| Element             | Size                                | Weight | Color           |
| ------------------- | ----------------------------------- | ------ | --------------- |
| Currency symbol `$` | 20px                                | 700    | `pos` `#10B981` |
| Whole number        | 48px                                | 700    | `pos` `#10B981` |
| Decimal `.XX`       | 20px                                | 700    | `pos` `#10B981` |
| Alignment           | `alignItems: 'flex-end'` (baseline) | —      | —               |

> `showSign=false` — the amount is always displayed as a positive value since the settlement direction is established by the subheader context.

> Color is always `pos` on this screen because settling up is a positive financial action.

---

### 4.4 Payment Method Section

| Property          | Value |
| ----------------- | ----- |
| Margin top        | 20px  |
| Margin horizontal | 16px  |

**Section Label**

| Property       | Value            |
| -------------- | ---------------- |
| Text           | `PAYMENT METHOD` |
| Font size      | 10px             |
| Font weight    | 600              |
| Color          | `text3`          |
| Letter spacing | 0.8px            |
| Text transform | `uppercase`      |
| Margin bottom  | 12px             |

**Chip Row**

| Property       | Value  |
| -------------- | ------ |
| Flex direction | `row`  |
| Gap            | 8px    |
| Flex wrap      | `wrap` |

**Payment Chip — Unselected**

| Property           | Value                     |
| ------------------ | ------------------------- |
| Background         | `white`                   |
| Border             | 1px `borderMid` `#CBD5E1` |
| Border radius      | 999px                     |
| Padding horizontal | 16px                      |
| Padding vertical   | 8px                       |
| Label font size    | 13px                      |
| Label font weight  | 500                       |
| Label color        | `text2`                   |
| Min height         | 36px                      |

**Payment Chip — Selected**

| Property           | Value             |
| ------------------ | ----------------- |
| Background         | `brand` `#4F46E5` |
| Border             | 1px `brand`       |
| Border radius      | 999px             |
| Padding horizontal | 16px              |
| Padding vertical   | 8px               |
| Label font size    | 13px              |
| Label font weight  | 500               |
| Label color        | `white`           |
| Min height         | 36px              |

**Payment Methods:** `Cash` | `Bank Transfer` | `Other`

Default selected: `Cash`

---

### 4.5 Form Section

| Property           | Value |
| ------------------ | ----- |
| Margin top         | 20px  |
| Margin horizontal  | 16px  |
| Gap between fields | 12px  |

**Notes InputField**

| Property                | Value                             |
| ----------------------- | --------------------------------- |
| Container background    | `white`                           |
| Container border radius | 12px                              |
| Container border        | 1px `border`                      |
| Left icon               | `edit-2` (Feather), 18px, `text3` |
| Placeholder             | `Add a note (optional)`           |
| Placeholder color       | `text4`                           |
| Font size               | 14px                              |
| Font weight             | 400                               |
| Color                   | `text1`                           |
| Height                  | 52px                              |
| Padding horizontal      | 16px                              |

**Date SelectRow**

| Property                | Value                               |
| ----------------------- | ----------------------------------- |
| Container background    | `white`                             |
| Container border radius | 12px                                |
| Container border        | 1px `border`                        |
| Left icon               | `calendar` (Feather), 18px, `text3` |
| Label                   | `Date`                              |
| Label font size         | 14px                                |
| Label font weight       | 500                                 |
| Label color             | `text1`                             |
| Value                   | Today's date, e.g. `Apr 24, 2026`   |
| Value font size         | 14px                                |
| Value font weight       | 400                                 |
| Value color             | `text3`                             |
| Right icon              | `chevron-right`, 16px, `text4`      |
| Height                  | 52px                                |
| Padding horizontal      | 16px                                |

---

### 4.6 Confirm Button

| Property           | Value                 |
| ------------------ | --------------------- |
| Variant            | `primary`             |
| Height             | 56px                  |
| Border radius      | 14px                  |
| Background         | `brand` `#4F46E5`     |
| Label              | `Confirm Payment`     |
| Label font size    | 16px                  |
| Label font weight  | 600                   |
| Label color        | `white`               |
| Margin horizontal  | 16px                  |
| Margin top         | 24px                  |
| Margin bottom      | 32px (safe area)      |
| Pressed background | `brandDark` `#3730A3` |
| Pressed scale      | 0.98                  |

**Success Alert (on confirm)**

| Property | Value                                                                        |
| -------- | ---------------------------------------------------------------------------- |
| Title    | `Payment Recorded`                                                           |
| Message  | `Your settlement with [Name] has been recorded. Balances have been updated.` |
| Button   | `Done` → `navigation.goBack()`                                               |

---

## 5. Interaction States

### Payment Chip

| State              | Visual                                      |
| ------------------ | ------------------------------------------- |
| Unselected         | White bg, `borderMid` border, `text2` label |
| Selected           | `brand` bg, `brand` border, `white` label   |
| Press (unselected) | `#F8FAFC` bg (slight darken)                |
| Press (selected)   | `brandDark` bg                              |

### Notes Input

| State     | Visual                       |
| --------- | ---------------------------- |
| Empty     | Placeholder `text4`          |
| Focused   | `brand` border 1px, white bg |
| Has value | `text1` content              |

### Date SelectRow

| State            | Visual                        |
| ---------------- | ----------------------------- |
| Default          | Shows today's date in `text3` |
| Pressed          | `#F8FAFC` bg                  |
| Date picker open | Platform native date picker   |

### Confirm Button

| State   | Visual                            |
| ------- | --------------------------------- |
| Default | `brand` bg                        |
| Pressed | `brandDark` bg, scale 0.98        |
| Loading | Activity indicator replaces label |

---

## 6. Empty & Edge States

| Scenario                 | Behavior                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Amount is zero           | Confirm button disabled, label `No Balance to Settle`                                                           |
| Member name unavailable  | Subheader falls back to `Settling with this member`                                                             |
| Network error on confirm | Alert: `Failed to record payment. Please try again.`                                                            |
| Partial settlement       | Amount is pre-filled with full balance; user cannot edit amount on this screen (it is a full settlement action) |

---

## 7. AI Prompt — Premium Redesign

```
Design a premium mobile screen called "Settle Up" for a bill-splitting app called SplitEasy.
The app uses a clean light design system with the following tokens:
  brand=#4F46E5, brandDark=#3730A3, brandLight=#EEF2FF,
  text1=#0F172A, text2=#334155, text3=#64748B, text4=#94A3B8,
  border=#E2E8F0, borderMid=#CBD5E1, bg=#F8FAFC, white=#FFFFFF,
  pos=#10B981.

SCREEN STRUCTURE (top to bottom):

1. SCREEN HEADER
   White background, 56px tall, hairline bottom border (#E2E8F0).
   Left: back chevron 24px text2. Center: "Settle Up" 17px SemiBold text1. No right action.

2. SUBHEADER TEXT
   "Settling with Alex Chen" — 14px regular text2, centered.
   marginTop 16px, marginBottom 8px, marginHorizontal 16px.
   This line establishes the directional context of the settlement.

3. AMOUNT CARD
   White card, borderRadius 12px, marginHorizontal 16px, marginTop 12px.
   paddingVertical 24px, alignItems center, hairline border (#E2E8F0).
   AmountDisplay XL: baseline-aligned row.
   - "$" symbol 20px bold pos (#10B981)
   - Whole number 48px bold pos (#10B981)
   - Decimal ".50" 20px bold pos (#10B981)
   Amount is always positive (showSign=false). Green color signals a positive resolution.
   The card should feel like a clean confirmation display — not editable.

4. PAYMENT METHOD SECTION
   marginTop 20px, marginHorizontal 16px.
   Section label "PAYMENT METHOD": 10px SemiBold text3 uppercase letterSpacing 0.8, marginBottom 12px.
   Chip row: flexDirection row, gap 8px, flexWrap wrap.
   3 chips: "Cash", "Bank Transfer", "Other".
   - Unselected chip: white bg, 1px borderMid border, borderRadius 999px,
     paddingHorizontal 16px, paddingVertical 8px, 13px medium text2 label.
   - Selected chip: brand bg, 1px brand border, borderRadius 999px,
     paddingHorizontal 16px, paddingVertical 8px, 13px medium white label.
   Default selected: "Cash".

5. FORM SECTION
   marginTop 20px, marginHorizontal 16px, gap 12px between fields.
   - Notes InputField: white bg, borderRadius 12px, 1px border border.
     Left edit-2 icon 18px text3. Placeholder "Add a note (optional)" 14px text4.
     Height 52px, paddingHorizontal 16px.
   - Date SelectRow: white bg, borderRadius 12px, 1px border border.
     Left calendar icon 18px text3. Label "Date" 14px medium text1.
     Value "Apr 24, 2026" 14px regular text3. Right chevron-right 16px text4.
     Height 52px, paddingHorizontal 16px.

6. CONFIRM BUTTON
   Primary button: height 56px, borderRadius 14px, brand bg.
   Label "Confirm Payment" 16px SemiBold white.
   marginHorizontal 16px, marginTop 24px, marginBottom 32px.
   Pressed: brandDark bg, scale 0.98.
   On press: show success Alert then navigate back.

VISUAL DIRECTION:
- This screen is intentionally simple and reassuring — the user is completing a financial action.
- The amount card is the focal point: large green number on a clean white card with a subtle border.
- Green (pos) is used exclusively for the amount to signal a positive, resolved state.
- Payment method chips are the only interactive selection element — keep them compact and clear.
- The form fields (notes, date) are secondary — visually lighter than the amount card.
- The confirm button is the clear CTA — full-width, prominent, brand color.
- No shadows — depth through background contrast (#F8FAFC vs white).
- Spacing: 20px between sections, 12px between form fields, 24px above button.
- Render at 390×844px (iPhone 14 Pro), light mode only.
```

---

## 8. Accessibility Notes

- Subheader: `accessibilityRole="text"`, `accessibilityLabel="Settling with Alex Chen"`
- AmountDisplay: `accessibilityLabel="Settlement amount: $48.50"`
- Payment chips: `accessibilityRole="radio"`, `accessibilityState={{ selected }}`, `accessibilityLabel="[Method] payment method"`
- Confirm button: `accessibilityLabel="Confirm payment"`, `accessibilityRole="button"`
- Date SelectRow: `accessibilityLabel="Settlement date: April 24, 2026"`, `accessibilityRole="button"`
- Notes input: `accessibilityLabel="Add a note"`, `accessibilityHint="Optional note about this payment"`
