# 08 — Add Expense Screen

## 1. Screen Purpose & User Flow Context

The Add Expense screen is the primary data-entry surface in SplitEasy. It is reached by tapping the floating action button on the Group Detail screen or the global "+" action. The user enters an amount, selects a category, specifies who paid, configures the split method, optionally adds a date and notes, then saves. On save the expense is appended to the group ledger and the user is returned to Group Detail with balances updated.

**Entry points:** Group Detail FAB → Add Expense  
**Exit points:** Save → Group Detail (expense added) | Back → Group Detail (no change)

---

## 2. Design System Tokens

| Token        | Value     | Usage                                   |
| ------------ | --------- | --------------------------------------- |
| `brand`      | `#4F46E5` | Primary actions, selected states, icons |
| `brandDark`  | `#3730A3` | Brand pressed state                     |
| `brandLight` | `#EEF2FF` | Amount hero bg, unselected chip bg      |
| `text1`      | `#0F172A` | Primary labels, amount input            |
| `text2`      | `#334155` | Secondary values                        |
| `text3`      | `#64748B` | Tertiary labels, section headers        |
| `text4`      | `#94A3B8` | Placeholders                            |
| `border`     | `#E2E8F0` | Card borders, hairlines                 |
| `borderMid`  | `#CBD5E1` | Chip borders, dividers                  |
| `bg`         | `#F8FAFC` | Screen background                       |
| `white`      | `#FFFFFF` | Card surfaces                           |
| `neg`        | `#EF4444` | Destructive actions                     |
| `negBg`      | `#FEF2F2` | Destructive tint                        |

**Typography**

| Role            | Size | Weight         | Line Height |
| --------------- | ---- | -------------- | ----------- |
| Section label   | 10px | 600 (SemiBold) | 14px        |
| Body / input    | 14px | 400–500        | 20px        |
| Amount input    | 36px | 700 (Bold)     | 44px        |
| Currency symbol | 24px | 700 (Bold)     | 32px        |
| Chip label      | 12px | 500 (Medium)   | 16px        |
| Tab label       | 12px | 600 (SemiBold) | 16px        |

**Spacing & Radius**

| Token                      | Value |
| -------------------------- | ----- |
| Card margin horizontal     | 16px  |
| Card border radius         | 16px  |
| Pill border radius         | 999px |
| Section gap (card to card) | 16px  |
| Inner card padding         | 16px  |

---

## 3. Screen Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + title)    │
├─────────────────────────────────┤
│  Amount Hero Band               │  paddingVertical 32
│  $ [  0.00  ]                   │  centered
├─────────────────────────────────┤
│  ScrollView (flex 1)            │
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ Details Card            │    │  marginTop 16
│  │  Section label          │    │
│  │  InputField (desc)      │    │
│  │  CategoryPicker         │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │  marginTop 16
│  │ Paid By Card            │    │
│  │  SelectRow              │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │  marginTop 16
│  │ Split Card              │    │
│  │  Section label          │    │
│  │  SplitMethodTabs        │    │
│  │  MemberSplitRow × N     │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │  marginTop 16
│  │ Date + Notes Card       │    │
│  │  SelectRow (Date)       │    │
│  │  InputField (Notes)     │    │
│  └─────────────────────────┘    │
│                                 │
│  [    Save Expense    ]         │  paddingHorizontal 16
│                                 │  paddingTop 24
└─────────────────────────────────┘
```

---

## 4. Component Breakdown & Exact Specs

### 4.1 ScreenHeader

| Property           | Value                                           |
| ------------------ | ----------------------------------------------- |
| Background         | `white`                                         |
| Height             | 56px                                            |
| Left element       | Back chevron icon, 24px, `text2`                |
| Title              | 'Add Expense', 17px SemiBold, `text1`, centered |
| Right element      | None                                            |
| Bottom border      | 1px `border` hairline                           |
| Padding horizontal | 16px                                            |

---

### 4.2 Amount Hero Band

| Property              | Value                                                                      |
| --------------------- | -------------------------------------------------------------------------- |
| Background            | `brandLight` `#EEF2FF`                                                     |
| Padding vertical      | 32px                                                                       |
| Padding horizontal    | 16px                                                                       |
| Layout                | `flexDirection: 'row'`, `alignItems: 'center'`, `justifyContent: 'center'` |
| Gap (symbol to input) | 4px                                                                        |

**Currency Symbol**

| Property    | Value                 |
| ----------- | --------------------- |
| Text        | `$`                   |
| Font size   | 24px                  |
| Font weight | 700                   |
| Color       | `brand` `#4F46E5`     |
| Alignment   | `alignSelf: 'center'` |

**Amount TextInput**

| Property          | Value             |
| ----------------- | ----------------- |
| Font size         | 36px              |
| Font weight       | 700               |
| Color             | `text1` `#0F172A` |
| Placeholder text  | `0.00`            |
| Placeholder color | `text4` `#94A3B8` |
| Min width         | 120px             |
| Background        | `transparent`     |
| Text align        | `center`          |
| Keyboard type     | `decimal-pad`     |
| Border            | none              |
| Selection color   | `brand`           |

---

### 4.3 Details Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Margin horizontal | 16px     |
| Margin top        | 16px     |
| Border radius     | 16px     |
| Overflow          | `hidden` |
| Padding top       | 16px     |
| Padding bottom    | 4px      |

**Section Label — "DETAILS"**

| Property          | Value             |
| ----------------- | ----------------- |
| Text              | `DETAILS`         |
| Font size         | 10px              |
| Font weight       | 600               |
| Color             | `text3` `#64748B` |
| Letter spacing    | 0.8px             |
| Text transform    | `uppercase`       |
| Margin horizontal | 16px              |
| Margin bottom     | 8px               |

**Description InputField**

| Property           | Value                              |
| ------------------ | ---------------------------------- |
| Left icon          | `receipt` (Feather), 18px, `text3` |
| Placeholder        | `What was it for?`                 |
| Placeholder color  | `text4`                            |
| Font size          | 14px                               |
| Font weight        | 400                                |
| Color              | `text1`                            |
| Height             | 48px                               |
| Padding horizontal | 16px                               |
| Bottom border      | 1px `border` hairline              |
| Background         | `white`                            |

**CategoryPicker**

| Property           | Value                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Container          | `ScrollView` horizontal, `showsHorizontalScrollIndicator: false` |
| Padding horizontal | 16px                                                             |
| Padding vertical   | 12px                                                             |
| Gap between chips  | 8px                                                              |
| Flex direction     | `row`                                                            |

**Category Chip — Unselected**

| Property             | Value             |
| -------------------- | ----------------- |
| Background           | `#F1F5F9`         |
| Border               | none              |
| Border radius        | 999px             |
| Padding horizontal   | 12px              |
| Padding vertical     | 8px               |
| Gap (emoji to label) | 4px               |
| Emoji size           | 14px              |
| Label font size      | 12px              |
| Label font weight    | 500               |
| Label color          | `text3` `#64748B` |

**Category Chip — Selected**

| Property           | Value             |
| ------------------ | ----------------- |
| Background         | `brand` `#4F46E5` |
| Border radius      | 999px             |
| Padding horizontal | 12px              |
| Padding vertical   | 8px               |
| Gap                | 4px               |
| Emoji size         | 14px              |
| Label font size    | 12px              |
| Label font weight  | 500               |
| Label color        | `white`           |

**Category List**

| Emoji | Label    |
| ----- | -------- |
| 🍔    | Food     |
| ✈️    | Travel   |
| 🏨    | Stay     |
| 🎉    | Fun      |
| 🛒    | Grocery  |
| 💡    | Utility  |
| 🏃    | Activity |
| 📦    | Other    |

---

### 4.4 Paid By Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Margin horizontal | 16px     |
| Margin top        | 16px     |
| Border radius     | 16px     |
| Overflow          | `hidden` |

**SelectRow — "Paid by"**

| Property           | Value                           |
| ------------------ | ------------------------------- |
| Label              | `Paid by`                       |
| Label font size    | 14px                            |
| Label font weight  | 500                             |
| Label color        | `text1`                         |
| Value              | `You` (or selected member name) |
| Value font size    | 14px                            |
| Value font weight  | 400                             |
| Value color        | `text3`                         |
| Right icon         | chevron-right, 16px, `text4`    |
| Height             | 52px                            |
| Padding horizontal | 16px                            |
| Left icon          | `user` (Feather), 18px, `text3` |

---

### 4.5 Split Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Margin horizontal | 16px     |
| Margin top        | 16px     |
| Border radius     | 16px     |
| Overflow          | `hidden` |
| Padding bottom    | 4px      |
| Padding top       | 16px     |

**Section Label — "SPLIT"**

Same spec as Details section label. Margin bottom 8px.

**SplitMethodTabs**

| Property                    | Value     |
| --------------------------- | --------- |
| Container flex direction    | `row`     |
| Container background        | `#F1F5F9` |
| Container border radius     | 10px      |
| Container padding           | 3px       |
| Container height            | 40px      |
| Container margin horizontal | 16px      |
| Container margin bottom     | 4px       |

**Tab — Active**

| Property          | Value             |
| ----------------- | ----------------- |
| Background        | `brand` `#4F46E5` |
| Border radius     | 8px               |
| Label font size   | 12px              |
| Label font weight | 600               |
| Label color       | `white`           |
| Flex              | 1                 |
| Align items       | `center`          |
| Justify content   | `center`          |

**Tab — Inactive**

| Property          | Value             |
| ----------------- | ----------------- |
| Background        | `transparent`     |
| Label font size   | 12px              |
| Label font weight | 600               |
| Label color       | `text3` `#64748B` |
| Flex              | 1                 |
| Align items       | `center`          |
| Justify content   | `center`          |

**Tab Labels:** `Equal` | `Exact` | `%`

---

### 4.6 MemberSplitRow

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| Flex direction     | `row`                                     |
| Align items        | `center`                                  |
| Padding vertical   | 12px                                      |
| Padding horizontal | 16px                                      |
| Bottom border      | 1px `borderMid` hairline (last row: none) |
| Gap                | 12px                                      |

**Avatar (sm)**

| Property             | Value        |
| -------------------- | ------------ |
| Size                 | 32×32px      |
| Border radius        | 16px         |
| Background           | `brandLight` |
| Initials font size   | 12px         |
| Initials font weight | 600          |
| Initials color       | `brand`      |

**Name**

| Property    | Value   |
| ----------- | ------- |
| Font size   | 14px    |
| Font weight | 500     |
| Color       | `text1` |
| Flex        | 1       |

**Right — Equal mode**

| Property           | Value   |
| ------------------ | ------- |
| Amount font size   | 14px    |
| Amount font weight | 600     |
| Amount color       | `text2` |

**Right — Exact mode**

| Property                   | Value         |
| -------------------------- | ------------- |
| Wrapper background         | `#F1F5F9`     |
| Wrapper border radius      | 8px           |
| Wrapper padding horizontal | 8px           |
| Wrapper padding vertical   | 4px           |
| Prefix `$` font size       | 13px          |
| Prefix color               | `text3`       |
| TextInput font size        | 13px          |
| TextInput font weight      | 500           |
| TextInput color            | `text1`       |
| TextInput width            | 64px          |
| TextInput keyboard         | `decimal-pad` |

**Right — Percent mode**

Same as Exact mode wrapper. Suffix `%` instead of prefix `$`. TextInput width 48px.

---

### 4.7 Date + Notes Card

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Margin horizontal | 16px     |
| Margin top        | 16px     |
| Border radius     | 16px     |
| Overflow          | `hidden` |

**SelectRow — Date**

| Property      | Value                                       |
| ------------- | ------------------------------------------- |
| Left icon     | `calendar` (Feather), 18px, `text3`         |
| Label         | `Date`                                      |
| Value         | Formatted date string (e.g. `Apr 24, 2026`) |
| Right icon    | chevron-right, 16px, `text4`                |
| Height        | 52px                                        |
| Bottom border | 1px `border` hairline                       |

**Notes InputField**

| Property         | Value                             |
| ---------------- | --------------------------------- |
| Left icon        | `edit-2` (Feather), 18px, `text3` |
| Placeholder      | `Add a note (optional)`           |
| Multiline        | `true`                            |
| Min height       | 52px                              |
| Max height       | 120px                             |
| Padding vertical | 14px                              |
| Font size        | 14px                              |
| Color            | `text1`                           |
| Background       | `white`                           |

---

### 4.8 Save Button

| Property             | Value                 |
| -------------------- | --------------------- |
| Variant              | `primary`             |
| Height               | 56px                  |
| Margin horizontal    | 16px                  |
| Margin top           | 24px                  |
| Margin bottom        | 32px (safe area)      |
| Border radius        | 14px                  |
| Background           | `brand` `#4F46E5`     |
| Label                | `Save Expense`        |
| Label font size      | 16px                  |
| Label font weight    | 600                   |
| Label color          | `white`               |
| Pressed background   | `brandDark` `#3730A3` |
| Disabled background  | `#A5B4FC`             |
| Disabled label color | `white` (opacity 0.7) |

**Disabled condition:** amount is `0` or `0.00` or empty.

---

## 5. Interaction States

### Amount Input

| State     | Visual                                                        |
| --------- | ------------------------------------------------------------- |
| Empty     | Placeholder `0.00` in `text4`                                 |
| Focused   | Cursor visible, no border change (hero band provides context) |
| Has value | `text1` bold, amount formatted with 2 decimal places on blur  |

### Category Chip

| State              | Visual                       |
| ------------------ | ---------------------------- |
| Unselected         | `#F1F5F9` bg, `text3` label  |
| Selected           | `brand` bg, `white` label    |
| Press (unselected) | `#E2E8F0` bg (slight darken) |
| Press (selected)   | `brandDark` bg               |

### SplitMethodTab

| State            | Visual                                                 |
| ---------------- | ------------------------------------------------------ |
| Active           | `brand` bg, `white` label, subtle shadow `elevation 2` |
| Inactive         | Transparent bg, `text3` label                          |
| Press (inactive) | `rgba(79,70,229,0.06)` bg                              |

### MemberSplitRow — Exact/Percent Input

| State                | Visual                         |
| -------------------- | ------------------------------ |
| Unfocused            | `#F1F5F9` bg                   |
| Focused              | `brand` border 1px, `white` bg |
| Error (sum mismatch) | `neg` border 1px, `negBg` bg   |

### Save Button

| State    | Visual                            |
| -------- | --------------------------------- |
| Default  | `brand` bg                        |
| Pressed  | `brandDark` bg, scale 0.98        |
| Disabled | `#A5B4FC` bg, no press feedback   |
| Loading  | Activity indicator replaces label |

---

## 6. Empty & Edge States

| Scenario                  | Behavior                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| No group members          | Split card shows only "You" row                                    |
| Exact split sum mismatch  | Red warning text below split list: `Amounts don't add up to $X.XX` |
| Percent split sum ≠ 100   | Warning: `Percentages must total 100%`                             |
| Description empty on save | Inline error under field: `Please add a description`               |
| Amount zero on save       | Save button remains disabled                                       |

---

## 7. AI Prompt — Premium Redesign

```
Design a premium mobile screen called "Add Expense" for a bill-splitting app called SplitEasy.
The app uses a clean light design system with the following tokens:
  brand=#4F46E5, brandDark=#3730A3, brandLight=#EEF2FF,
  text1=#0F172A, text2=#334155, text3=#64748B, text4=#94A3B8,
  border=#E2E8F0, borderMid=#CBD5E1, bg=#F8FAFC, white=#FFFFFF,
  neg=#EF4444, negBg=#FEF2F2.

SCREEN STRUCTURE (top to bottom):

1. SCREEN HEADER
   White background, 56px tall, hairline bottom border (#E2E8F0).
   Left: back chevron icon 24px in text2. Center: "Add Expense" 17px SemiBold text1.

2. AMOUNT HERO BAND
   Full-width band, background brandLight (#EEF2FF), paddingVertical 32px, paddingHorizontal 16px.
   Horizontally centered row: "$" symbol 24px bold brand color, then a large text input 36px bold text1,
   minWidth 120px, transparent background, centered text, placeholder "0.00" in text4.
   This band should feel like a focused, premium calculator entry zone — airy and prominent.

3. DETAILS CARD
   White card, borderRadius 16px, marginHorizontal 16px, marginTop 16px, overflow hidden.
   - Section label "DETAILS" 10px SemiBold text3 uppercase letterSpacing 0.8, marginHorizontal 16px, marginBottom 8px, marginTop 16px.
   - InputField row: left receipt icon 18px text3, placeholder "What was it for?" 14px text4, height 48px, hairline bottom border.
   - CategoryPicker: horizontal ScrollView, paddingHorizontal 16px, paddingVertical 12px, gap 8px.
     Each chip is a pill (borderRadius 999px): unselected = #F1F5F9 bg, text3 label 12px medium;
     selected = brand bg, white label 12px medium. Emoji 14px + label with gap 4px.
     8 categories: Food, Travel, Stay, Fun, Grocery, Utility, Activity, Other.

4. PAID BY CARD
   White card, borderRadius 16px, marginHorizontal 16px, marginTop 16px.
   Single row: left user icon 18px text3, label "Paid by" 14px medium text1, flex 1,
   value "You" 14px text3 right-aligned, chevron-right 16px text4.
   Row height 52px, paddingHorizontal 16px.

5. SPLIT CARD
   White card, borderRadius 16px, marginHorizontal 16px, marginTop 16px, paddingBottom 4px.
   - Section label "SPLIT" same style as DETAILS.
   - SplitMethodTabs: full-width row inside card (marginHorizontal 16px), height 40px,
     background #F1F5F9, borderRadius 10px, padding 3px.
     3 tabs: Equal / Exact / %. Active tab: brand bg, borderRadius 8px, white 12px SemiBold label.
     Inactive: transparent bg, text3 12px SemiBold label.
   - MemberSplitRow list below tabs. Each row: flexDirection row, alignItems center,
     paddingVertical 12px, paddingHorizontal 16px, hairline bottom border (borderMid), gap 12px.
     Left: Avatar 32px circle (brandLight bg, brand initials 12px SemiBold).
     Middle: member name 14px medium text1, flex 1.
     Right (Equal mode): amount 14px SemiBold text2.
     Right (Exact mode): pill wrapper (#F1F5F9 bg, borderRadius 8px, paddingHorizontal 8px, paddingVertical 4px)
       containing "$" prefix 13px text3 + TextInput 13px medium text1 width 64px.
     Right (Percent mode): same wrapper with "%" suffix instead.

6. DATE + NOTES CARD
   White card, borderRadius 16px, marginHorizontal 16px, marginTop 16px, overflow hidden.
   - SelectRow Date: left calendar icon 18px text3, label "Date" 14px medium text1,
     value "Apr 24, 2026" 14px text3, chevron-right 16px text4, height 52px, hairline bottom border.
   - Notes InputField: left edit-2 icon 18px text3, placeholder "Add a note (optional)" 14px text4,
     multiline, minHeight 52px, paddingVertical 14px.

7. SAVE BUTTON
   Primary button, height 56px, borderRadius 14px, brand bg, "Save Expense" 16px SemiBold white.
   marginHorizontal 16px, marginTop 24px, marginBottom 32px.
   Disabled state: #A5B4FC bg. Pressed state: brandDark bg, scale 0.98.

VISUAL DIRECTION:
- The screen should feel clean, structured, and premium — not cluttered.
- The amount hero band is the visual anchor: large, airy, indigo-tinted.
- Cards use white surfaces on a #F8FAFC background for clear depth separation.
- All interactive elements have clear affordance through color, icon, and chevron cues.
- Typography hierarchy: 36px amount → 17px header → 14px body → 12px chips/tabs → 10px section labels.
- Spacing is generous: 16px between cards, 12px internal gaps, 32px hero padding.
- The split section is the most complex — tabs and member rows should feel like a polished settings panel.
- No shadows on cards — rely on background contrast (#F8FAFC vs white) for depth.
- Render at 390×844px (iPhone 14 Pro dimensions), light mode only.
```

---

## 8. Accessibility Notes

- Amount input: `accessibilityLabel="Expense amount"`, `accessibilityHint="Enter the total amount in dollars"`
- Category chips: `accessibilityRole="radio"`, `accessibilityState={{ selected }}`
- SplitMethodTabs: `accessibilityRole="tab"`, `accessibilityState={{ selected }}`
- Save button: `accessibilityState={{ disabled }}` when amount is zero
- All icons paired with visible labels or `accessibilityLabel` props
- Minimum touch target: 44×44px (chips and tabs use padding to meet this)
