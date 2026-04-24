# 14 — Activity Feed Screen, Edit Expense Screen & Premium UI Prompt Guidelines

## 1. Screen Overview

This document covers two screens and a comprehensive set of guidelines for writing premium UI prompts for the SplitEasy design system.

1. **ActivityFeedScreen** — A group-scoped activity timeline showing all expense and settlement events for a single group. Identical in structure to the global ActivityScreen but filtered to one group and contextualized with the group name in the header.
2. **EditExpenseScreen** — The expense editing flow, identical in layout to AddExpenseScreen but pre-filled with existing data and featuring a delete action in the header.
3. **Premium UI Prompt Guidelines** — A reusable reference for writing high-quality AI prompts that produce premium-quality screens consistent with the SplitEasy design system.

---

## 2. Design System Tokens

| Token                 | Value     | Usage                               |
| --------------------- | --------- | ----------------------------------- |
| `surface` / screen bg | `#F8FAFC` | Screen background                   |
| `white`               | `#FFFFFF` | Cards, header                       |
| `brand`               | `#6366F1` | Brand indigo — icons, accents, CTAs |
| `brandLight`          | `#EEF2FF` | Brand tinted backgrounds            |
| `neg`                 | `#EF4444` | Negative amounts, delete actions    |
| `negBg`               | `#FEF2F2` | Red tinted backgrounds              |
| `pend`                | `#F59E0B` | Pending/settlement amounts          |
| `pendBg`              | `#FFFBEB` | Amber tinted backgrounds            |
| `pos`                 | `#10B981` | Positive/settled amounts            |
| `posBg`               | `#ECFDF5` | Green tinted backgrounds            |
| `text1`               | `#0F172A` | Primary text                        |
| `text2`               | `#475569` | Secondary text                      |
| `text3`               | `#94A3B8` | Muted/metadata text                 |
| `text4`               | `#CBD5E1` | Tertiary/placeholder text           |
| `borderMid`           | `#E2E8F0` | Standard borders                    |
| `borderLight`         | `#F1F5F9` | Subtle borders, dividers            |

**Typography:**
| Role | Size | Weight | Color |
|---|---|---|---|
| Screen title | 17px | SemiBold (600) | `#0F172A` |
| Screen subtitle | 13px | Regular (400) | `#94A3B8` |
| Section date header | 12px | SemiBold (600) | `#94A3B8` |
| Event description | 14px | Medium (500) | `#0F172A` |
| Event metadata | 12px | Regular (400) | `#94A3B8` |
| Amount | 14px | SemiBold (600) | varies by type |
| Input label | 12px | Medium (500) | `#94A3B8` |
| Input value | 16px | Regular (400) | `#0F172A` |
| CTA button | 16px | SemiBold (600) | `#FFFFFF` |
| Section header | 12px | SemiBold (600) | `#94A3B8` |

---

## 3. ActivityFeedScreen

### 3.1 Screen Purpose

The ActivityFeedScreen is the event log for a single group. It answers the question: "What has happened in this group?" Users navigate here from the GroupDetailScreen to review the full history of expenses and settlements. It is read-only — tapping an expense event navigates to ExpenseDetailScreen.

### 3.2 Navigation Context

```
GroupDetailScreen → "Activity" tab or "See all" link
    → ActivityFeedScreen (stack push)
        → Tap expense event → ExpenseDetailScreen
        → Back → GroupDetailScreen
```

### 3.3 Visual Design

```
┌─────────────────────────────────────┐
│ SafeAreaView bg:#F8FAFC             │
│                                     │
│  ← [ScreenHeader]                   │
│     Title: "Activity"               │
│     Subtitle: "Spain Trip 2024"     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ SectionList                 │    │
│  │                             │    │
│  │  [Date Section: Today]      │    │  ← sticky header
│  │  ActivityEventRow           │    │
│  │  ActivityEventRow           │    │
│  │                             │    │
│  │  [Date Section: Yesterday]  │    │  ← sticky header
│  │  ActivityEventRow           │    │
│  │                             │    │
│  │  [Date Section: Mon Apr 21] │    │  ← sticky header
│  │  ActivityEventRow           │    │
│  │  ActivityEventRow           │    │
│  └─────────────────────────────┘    │
│                                     │
│  [EmptyState — when no events]      │
└─────────────────────────────────────┘
```

### 3.4 ScreenHeader

| Property          | Value                                                        |
| ----------------- | ------------------------------------------------------------ |
| Title             | `Activity`                                                   |
| Subtitle          | Group name — e.g. `Spain Trip 2024`                          |
| Left action       | Back chevron button                                          |
| Right action      | None                                                         |
| Background        | `#FFFFFF`                                                    |
| Border bottom     | `1px #F1F5F9`                                                |
| Title size        | `17px SemiBold #0F172A`                                      |
| Subtitle size     | `13px Regular #94A3B8`                                       |
| Subtitle position | Below title, centered or left-aligned (match app convention) |

### 3.5 SectionList Configuration

| Property                      | Value                                              |
| ----------------------------- | -------------------------------------------------- |
| Component                     | `SectionList`                                      |
| `stickySectionHeadersEnabled` | `true`                                             |
| `keyExtractor`                | event id                                           |
| `contentContainerStyle`       | `paddingBottom: 24`                                |
| Background                    | `#F8FAFC`                                          |
| Separator                     | None (rows have internal bottom border or spacing) |

### 3.6 ActivityDateSection (Sticky Section Header)

| Property           | Value                                                            |
| ------------------ | ---------------------------------------------------------------- |
| Background         | `#F8FAFC` (matches screen — blends when sticky)                  |
| Padding horizontal | `16px`                                                           |
| Padding vertical   | `8px`                                                            |
| Text               | Formatted date string (e.g. `Today`, `Yesterday`, `Mon, Apr 21`) |
| Font size          | `12px`                                                           |
| Font weight        | `600` (SemiBold)                                                 |
| Color              | `#94A3B8`                                                        |
| Letter spacing     | `0.6px`                                                          |
| Border bottom      | None (section header is visually separated by background color)  |

### 3.7 ActivityEventRow

Each row represents one event (expense added, expense edited, settlement recorded).

**Container:**
| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Margin horizontal | `16px` |
| Border radius | `12px` |
| Padding | `12px 16px` |
| Margin bottom | `8px` |
| Border | `1px solid #F1F5F9` |
| Shadow | color `#000` opacity `0.03` radius `3` elevation `1` |
| Press state | Background → `#F8FAFC`, scale `0.99` |

**Layout (flexDirection row, alignItems flex-start, gap 12):**

```
[Icon Wrap]  [Text Block flex:1]  [Amount]
```

**Icon Wrap:**
| Property | Value |
|---|---|
| Size | `36 × 36px` |
| Border radius | `10px` |
| Background | Varies by event type (see table below) |
| Icon | Varies by event type |
| Icon size | `18px` |

**Event type → icon mapping:**

| Event type      | Icon           | Icon color | Icon bg   |
| --------------- | -------------- | ---------- | --------- |
| Expense added   | `plus-circle`  | `#6366F1`  | `#EEF2FF` |
| Expense edited  | `edit-2`       | `#F59E0B`  | `#FFFBEB` |
| Settlement      | `check-circle` | `#10B981`  | `#ECFDF5` |
| Expense deleted | `trash-2`      | `#EF4444`  | `#FEF2F2` |

**Text block (flex: 1):**
| Element | Spec |
|---|---|
| Description | `14px Medium #0F172A` — e.g. `"Alex added Dinner at La Boqueria"` |
| Metadata | `12px Regular #94A3B8` — e.g. `"Paid by Alex · Split 4 ways"` or `"Alex → Maria"` |
| Metadata margin top | `2px` |

**Amount (right-aligned):**
| Property | Value |
|---|---|
| Font size | `14px` |
| Font weight | `600` (SemiBold) |
| Color | Expense → `#0F172A`; Settlement → `#10B981` |
| Text | e.g. `$84.00` or `+$21.00` |
| Align | `flex-end`, `alignSelf: flex-start` |

### 3.8 Mock Data — 5 Events Across 3 Date Sections

**Section 1: Today**

| #   | Type          | Description                      | Metadata                    | Amount  |
| --- | ------------- | -------------------------------- | --------------------------- | ------- |
| 1   | Expense added | Alex added Dinner at La Boqueria | Paid by Alex · Split 4 ways | $84.00  |
| 2   | Settlement    | Maria settled up with Alex       | Maria → Alex                | +$21.00 |

**Section 2: Yesterday**

| #   | Type          | Description                       | Metadata                   | Amount |
| --- | ------------- | --------------------------------- | -------------------------- | ------ |
| 3   | Expense added | Sam added Sagrada Familia tickets | Paid by Sam · Split 4 ways | $56.00 |

**Section 3: Mon, Apr 21**

| #   | Type          | Description               | Metadata                    | Amount  |
| --- | ------------- | ------------------------- | --------------------------- | ------- |
| 4   | Expense added | Alex added Hotel check-in | Paid by Alex · Split 4 ways | $320.00 |
| 5   | Settlement    | Sam settled up with Alex  | Sam → Alex                  | +$80.00 |

### 3.9 EmptyState

Shown when the group has no activity events.

| Property  | Value                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------- |
| Layout    | Centered vertically and horizontally in the list area                                          |
| Icon      | `activity` or `clock`, `48px`, `#CBD5E1`                                                       |
| Title     | `No activity yet` — `16px SemiBold #94A3B8` marginTop `12px`                                   |
| Subtitle  | `Expenses and settlements will appear here.` — `14px Regular #CBD5E1` marginTop `4px` centered |
| Max width | `240px`                                                                                        |

---

## 4. EditExpenseScreen

### 4.1 Screen Purpose

The EditExpenseScreen allows a user to modify an existing expense. It is structurally identical to AddExpenseScreen — same form fields, same layout, same validation — but pre-populated with the expense's current data and featuring a delete action in the header.

### 4.2 Navigation Context

```
ExpenseDetailScreen → "Edit" button
    → EditExpenseScreen (stack push)
        → Save Changes → pop to ExpenseDetailScreen (with updated data)
        → Delete (trash icon) → Alert confirm → pop to GroupDetailScreen
        → Back → pop to ExpenseDetailScreen (no changes)
```

### 4.3 Visual Design

The layout is identical to AddExpenseScreen. Only the following elements differ:

| Element             | AddExpenseScreen | EditExpenseScreen            |
| ------------------- | ---------------- | ---------------------------- |
| Header title        | `Add Expense`    | `Edit Expense`               |
| Header right action | None             | Trash icon (delete)          |
| Form pre-fill       | Empty            | Pre-filled with expense data |
| CTA button label    | `Add Expense`    | `Save Changes`               |

### 4.4 ScreenHeader

| Property      | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| Title         | `Edit Expense`                                             |
| Left action   | Back chevron button                                        |
| Right action  | Trash icon button — `trash-2`, `20px`, `#EF4444` (neg red) |
| Background    | `#FFFFFF`                                                  |
| Border bottom | `1px #F1F5F9`                                              |

**Trash icon button:**
| Property | Value |
|---|---|
| Size | `36 × 36px` hit area |
| Icon | `trash-2`, `20px`, `#EF4444` |
| Press state | Opacity → `0.6` |
| On press | Show `Alert.alert` confirmation dialog |

**Delete confirmation Alert:**
| Property | Value |
|---|---|
| Title | `Delete Expense` |
| Message | `Are you sure you want to delete this expense? This cannot be undone.` |
| Buttons | `Cancel` (default) + `Delete` (destructive style, red) |
| On confirm | Delete expense from state → `navigation.goBack()` |
| On cancel | Dismiss alert, stay on screen |

### 4.5 Pre-filled Mock Data

| Field        | Value                         |
| ------------ | ----------------------------- |
| Amount       | `84.00`                       |
| Description  | `Dinner at La Boqueria`       |
| Category     | `Food`                        |
| Paid by      | Current user (Alex)           |
| Split method | Equal split among all members |
| Date         | Current date                  |

### 4.6 Form Layout (Identical to AddExpenseScreen)

All sub-components are reused directly from AddExpenseScreen:

| Section      | Component             | Notes                                           |
| ------------ | --------------------- | ----------------------------------------------- |
| Amount input | `AmountInput`         | Large centered amount field, pre-filled `84.00` |
| Description  | `TextInput` row       | Pre-filled `Dinner at La Boqueria`              |
| Category     | `CategoryPicker`      | Pre-selected `Food`                             |
| Paid by      | `PaidBySelector`      | Pre-selected current user                       |
| Split method | `SplitMethodSelector` | Pre-selected equal split                        |
| Date         | `DatePicker` row      | Pre-filled with expense date                    |

### 4.7 CTA Button

| Property       | Value                                   |
| -------------- | --------------------------------------- |
| Variant        | `primary`                               |
| Label          | `Save Changes`                          |
| Position       | Bottom of screen (fixed or scroll-end)  |
| Margin         | `16px` horizontal, `16px` bottom        |
| Height         | `52px`                                  |
| Background     | `#6366F1`                               |
| Border radius  | `12px`                                  |
| Font size      | `16px`                                  |
| Font weight    | `600`                                   |
| Color          | `#FFFFFF`                               |
| On press       | Validate → update expense → pop screen  |
| Disabled state | Background `#E2E8F0`, text `#94A3B8`    |
| Loading state  | Spinner replaces label, button disabled |

### 4.8 Interaction States

| State                   | Behavior                                                                   |
| ----------------------- | -------------------------------------------------------------------------- |
| Trash icon press        | Alert confirmation dialog appears                                          |
| Alert "Delete" press    | Expense deleted, navigate back to GroupDetailScreen                        |
| Alert "Cancel" press    | Alert dismissed, screen unchanged                                          |
| Form field edit         | Field highlights with brand border `#6366F1`                               |
| Save Changes press      | Validates form; if valid → saves and pops; if invalid → shows field errors |
| Back press with changes | Optionally show "Discard changes?" alert (if implemented)                  |
| Save loading            | Button shows spinner, all inputs disabled                                  |

---

## 5. AI Prompt — ActivityFeedScreen

```
Design a group-scoped activity feed screen for a React Native bill-splitting app called SplitEasy. The screen shows a chronological timeline of all expense and settlement events for a single group.

HEADER:
ScreenHeader with title "Activity" (17px semibold #0F172A) and subtitle "Spain Trip 2024" (13px regular #94A3B8) below it. Back chevron on the left. White background, 1px #F1F5F9 bottom border.

LIST:
SectionList with stickySectionHeadersEnabled:true, paddingBottom:24, background #F8FAFC.

SECTION HEADERS (sticky):
Background #F8FAFC (blends with screen when sticky). paddingHorizontal:16, paddingVertical:8. Text: 12px semibold #94A3B8, letterSpacing:0.6. Labels: "Today", "Yesterday", "Mon, Apr 21".

EVENT ROWS:
Each row: white background, marginHorizontal:16, borderRadius:12, padding:12 16, marginBottom:8, border 1px #F1F5F9, subtle shadow (opacity 0.03).
Layout: flexDirection row, alignItems flex-start, gap:12.

Left: 36×36px icon wrap, borderRadius:10, colored background.
- Expense added: plus-circle icon #6366F1 on #EEF2FF.
- Settlement: check-circle icon #10B981 on #ECFDF5.

Center (flex:1):
- Description: 14px medium #0F172A. E.g. "Alex added Dinner at La Boqueria".
- Metadata: 12px regular #94A3B8, marginTop:2. E.g. "Paid by Alex · Split 4 ways" or "Alex → Maria".

Right:
- Amount: 14px semibold. Expense → #0F172A. Settlement → #10B981.

MOCK DATA (5 events, 3 sections):
Today: (1) Alex added Dinner at La Boqueria — $84.00 expense. (2) Maria settled up with Alex — +$21.00 settlement.
Yesterday: (3) Sam added Sagrada Familia tickets — $56.00 expense.
Mon Apr 21: (4) Alex added Hotel check-in — $320.00 expense. (5) Sam settled up with Alex — +$80.00 settlement.

EMPTY STATE (when no events):
Centered in list area. activity icon 48px #CBD5E1. Title "No activity yet" 16px semibold #94A3B8 marginTop:12. Subtitle "Expenses and settlements will appear here." 14px regular #CBD5E1 marginTop:4, centered, maxWidth:240.

DESIGN PRINCIPLES:
- The sticky section headers use the screen background color so they blend seamlessly when scrolling.
- White event cards on the grey screen background create clear visual separation.
- Icon colors are semantically meaningful: brand indigo for additions, green for settlements, amber for edits, red for deletions.
- The amount column is right-aligned and uses color to signal type: neutral for expenses, green for settlements.
- The subtitle in the header immediately contextualizes the feed — the user knows which group they're viewing.
- Generous card padding (12px vertical, 16px horizontal) makes each event easy to read and tap.
- The 8px gap between cards creates a clean, airy list without wasting space.
```

---

## 6. AI Prompt — EditExpenseScreen

```
Design an edit expense screen for a React Native bill-splitting app called SplitEasy. The screen is structurally identical to the Add Expense screen but pre-filled with existing data and includes a delete action.

HEADER:
ScreenHeader with title "Edit Expense" (17px semibold #0F172A). Back chevron on the left. On the right: trash-2 icon (20px, #EF4444) as a pressable button with 36×36px hit area. White background, 1px #F1F5F9 bottom border.

DELETE FLOW:
Tapping the trash icon shows a native Alert: title "Delete Expense", message "Are you sure you want to delete this expense? This cannot be undone.", buttons: "Cancel" (default) and "Delete" (destructive/red). Confirming deletes the expense and navigates back.

FORM (identical to Add Expense, pre-filled):
All form sections reuse AddExpenseScreen sub-components exactly. Pre-filled values:
- Amount: "84.00" (large centered amount input)
- Description: "Dinner at La Boqueria"
- Category: "Food" (pre-selected in CategoryPicker)
- Paid by: current user (pre-selected)
- Split: equal split (pre-selected)
- Date: expense date (pre-selected)

FORM FIELD STYLING:
Each field row: white background, borderRadius:12, border 1px #F1F5F9, padding:16, marginHorizontal:16, marginBottom:8.
Label: 12px medium #94A3B8, marginBottom:4.
Value: 16px regular #0F172A.
Focus state: border color → #6366F1 (brand).
Error state: border color → #EF4444, error message 12px regular #EF4444 below field.

CTA BUTTON (fixed bottom or scroll-end):
Primary button, height:52, borderRadius:12, background #6366F1, label "Save Changes" 16px semibold white. marginHorizontal:16, marginBottom:16.
Press: background #4F46E5.
Disabled: background #E2E8F0, text #94A3B8.
Loading: spinner replaces label, button disabled.

DESIGN PRINCIPLES:
- The trash icon in red immediately signals the destructive action — it's visible but not dominant.
- Pre-filling all fields reduces friction — the user only changes what they need to.
- The "Save Changes" label (vs "Add Expense") confirms the user is editing, not creating.
- The delete confirmation alert prevents accidental data loss.
- All form validation and error states are identical to AddExpenseScreen — no new patterns introduced.
- The screen feels familiar because it reuses every component from AddExpenseScreen.
```

---

## 7. General Guidelines — Writing Premium UI Prompts for SplitEasy

This section is a reusable reference for writing AI prompts that produce screens consistent with the SplitEasy design system at premium quality.

### 7.1 Prompt Structure

Every premium UI prompt for SplitEasy should follow this structure:

```
1. One-sentence screen purpose
2. HEADER section (always first)
3. Content sections (in visual order, top to bottom)
4. Interactive elements (buttons, inputs)
5. Empty/error/loading states
6. DESIGN PRINCIPLES section (always last)
```

The Design Principles section is the most important — it explains the _why_ behind the visual decisions and helps the AI understand the intent, not just the specs.

### 7.2 Color Tokens to Always Reference

When writing prompts, always use hex values alongside token names so the AI has no ambiguity:

| Token           | Hex       | When to use                                          |
| --------------- | --------- | ---------------------------------------------------- |
| `brand`         | `#6366F1` | CTAs, selected states, brand accents, progress fills |
| `brandLight`    | `#EEF2FF` | Brand icon backgrounds, tinted surfaces              |
| `onboardingTop` | `#1A1560` | Dark/premium modal backgrounds                       |
| `text1`         | `#0F172A` | All primary body text                                |
| `text2`         | `#475569` | Secondary descriptions                               |
| `text3`         | `#94A3B8` | Metadata, labels, muted text                         |
| `text4`         | `#CBD5E1` | Placeholders, tertiary text, footer                  |
| `borderLight`   | `#F1F5F9` | Card borders, dividers                               |
| `borderMid`     | `#E2E8F0` | Input borders, progress tracks                       |
| `surface`       | `#F8FAFC` | Screen backgrounds                                   |
| `neg`           | `#EF4444` | Errors, destructive, negative amounts                |
| `negBg`         | `#FEF2F2` | Red tinted icon/tag backgrounds                      |
| `pend`          | `#F59E0B` | Warnings, pending states, amber                      |
| `pendBg`        | `#FFFBEB` | Amber tinted backgrounds                             |
| `pos`           | `#10B981` | Success, settled, positive amounts                   |
| `posBg`         | `#ECFDF5` | Green tinted backgrounds                             |

### 7.3 Typography Rules

Always specify all four properties: size, weight, color, and line height (when relevant).

| Context                    | Size    | Weight                    | Notes                            |
| -------------------------- | ------- | ------------------------- | -------------------------------- |
| Screen/modal title         | 24px    | Bold 700                  | Hero titles only                 |
| Navigation header          | 17px    | SemiBold 600              | ScreenHeader component           |
| Card title / primary label | 14–16px | SemiBold 600              | Most card headings               |
| Body text                  | 14px    | Regular 400 or Medium 500 | Main content                     |
| Metadata / secondary       | 12px    | Regular 400               | Timestamps, counts, descriptions |
| Badges / pills             | 10–11px | SemiBold 600              | Status tags, savings badges      |
| Footer / legal             | 10px    | Regular 400               | Terms, privacy links             |
| Section headers            | 12px    | SemiBold 600              | ALL CAPS, letterSpacing 0.8      |
| Button labels              | 16px    | SemiBold 600              | Primary CTAs                     |
| Input values               | 16px    | Regular 400               | Form field content               |
| Input labels               | 12px    | Medium 500                | Field labels above inputs        |

**Line height rule:** Always set lineHeight to approximately 1.5× the font size for body text (e.g. 14px text → 21px line height, 12px text → 18px line height).

### 7.4 Spacing Rules

SplitEasy uses an 8px base grid. All spacing values should be multiples of 4 or 8.

| Context                          | Value       |
| -------------------------------- | ----------- |
| Screen horizontal padding        | `16px`      |
| Card internal padding            | `16px`      |
| Card border radius               | `12px`      |
| Small element border radius      | `8px`       |
| Pill/badge border radius         | `99px`      |
| Gap between list items           | `8px`       |
| Gap between inline elements      | `12px`      |
| Section top margin               | `16px`      |
| Screen bottom padding            | `24px`      |
| Icon wrap size (large)           | `48 × 48px` |
| Icon wrap size (medium)          | `36 × 36px` |
| Icon wrap border radius (large)  | `12px`      |
| Icon wrap border radius (medium) | `10px`      |
| Button height (primary)          | `52px`      |
| Button border radius             | `12px`      |

### 7.5 Component Patterns to Follow

**Cards:**

- Always white background on `#F8FAFC` screen
- `borderRadius: 12`, `border: 1px solid #F1F5F9`
- Subtle shadow: color `#000`, opacity `0.03–0.05`, radius `3–6`, elevation `1–2`
- Internal padding: `16px`
- `marginHorizontal: 16` (never full-bleed on light screens)

**Icon wraps:**

- Always use a tinted background matching the icon color
- Large (48×48, radius 12): for feature cards, hero sections
- Medium (36×36, radius 10): for list rows, event rows
- Small (32×32, radius 8): for inline elements
- Icon size is always 55–60% of wrap size (e.g. 22px icon in 48px wrap)

**Section headers:**

- ALL CAPS text, `12px SemiBold #94A3B8`, `letterSpacing: 0.8`
- `paddingHorizontal: 16`, `paddingVertical: 8`, `marginTop: 16`
- No background, no border — purely typographic

**Status pills / tags:**

- `borderRadius: 99` (always pill shape)
- `paddingHorizontal: 8`, `paddingVertical: 2–4`
- `fontSize: 10–11px`, `fontWeight: 600`
- Always use semantic color pairs: text color + tinted background

**Primary buttons:**

- Height `52px`, `borderRadius: 12`, background `#6366F1`
- Label `16px SemiBold white`
- Press state: background `#4F46E5`
- Disabled: background `#E2E8F0`, text `#94A3B8`
- Loading: spinner replaces label, button disabled, opacity `0.7`
- Always `marginHorizontal: 16` when inside a screen

**ScreenHeader:**

- White background, `1px #F1F5F9` bottom border
- Title `17px SemiBold #0F172A`
- Back chevron left, optional action right
- Optional subtitle `13px Regular #94A3B8` below title

### 7.6 What Makes a Screen Feel Premium vs Basic

| Premium                                                         | Basic                                       |
| --------------------------------------------------------------- | ------------------------------------------- |
| Consistent 8px grid spacing                                     | Arbitrary spacing values                    |
| Semantic color usage (green = good, red = bad, amber = warning) | Random color choices                        |
| Icon wraps with tinted backgrounds                              | Bare icons with no container                |
| Subtle shadows (opacity 0.03–0.05)                              | No shadows or harsh shadows                 |
| Pill-shaped status tags with semantic colors                    | Plain text status labels                    |
| Section headers in ALL CAPS with letter spacing                 | Bold section titles                         |
| Cards with `borderRadius: 12` and `border: 1px #F1F5F9`         | Flat lists with no separation               |
| Press states on every interactive element                       | No visual feedback on press                 |
| Empty states with icon + title + subtitle                       | Blank screen or plain "No data" text        |
| Loading states with spinners                                    | No loading feedback                         |
| Consistent icon library (Feather or Ionicons)                   | Mixed icon styles                           |
| Typography hierarchy (3–4 distinct levels)                      | One or two font sizes throughout            |
| Light screen bg `#F8FAFC` (not pure white)                      | Pure white `#FFFFFF` screen background      |
| Dark modal bg `#1A1560` for premium/paywall                     | Grey modal backgrounds                      |
| Sticky section headers that blend with background               | Section headers with contrasting background |
| Amounts colored by semantic meaning                             | All amounts in the same color               |

### 7.7 Key Design Principles to Always Include in Prompts

Include a **DESIGN PRINCIPLES** section at the end of every prompt. This section should explain:

1. **Why the background color was chosen** — `#F8FAFC` creates depth vs white cards; `#1A1560` creates premium focus
2. **Why the spacing is generous** — breathing room signals quality; cramped layouts feel cheap
3. **Why icon wraps use tinted backgrounds** — creates visual harmony; bare icons feel unfinished
4. **Why status colors are semantic** — users learn the system; red = bad, green = good, amber = warning
5. **Why shadows are subtle** — heavy shadows feel dated; micro-shadows add depth without distraction
6. **Why section headers are ALL CAPS** — creates clear hierarchy without competing with content
7. **Why cards have borders AND shadows** — border defines the edge; shadow adds lift; both together feel premium
8. **Why the CTA is always brand indigo** — consistency builds trust; users always know where to tap

### 7.8 Prompt Template

Use this template as a starting point for any new SplitEasy screen prompt:

```
Design a [screen name] screen for a React Native bill-splitting app called SplitEasy.
[One sentence describing the screen's purpose and user context.]

HEADER:
[ScreenHeader specs: title, subtitle if any, left/right actions, border]

[SECTION NAME]:
[SectionHeader specs if applicable]
[Component specs: background, border, radius, padding, shadow]
[Content specs: typography, colors, layout]

[INTERACTIVE ELEMENTS]:
[Button/input specs: height, radius, colors, states]

[EMPTY / ERROR / LOADING STATES]:
[Specs for each state]

DESIGN PRINCIPLES:
- [Why the background color creates the right atmosphere]
- [Why the spacing choices feel premium]
- [Why the color choices are semantically meaningful]
- [Why the component hierarchy creates clear visual flow]
- [Why the interaction states feel responsive and polished]
```

---

## 8. File Reference

| File                         | Path                                     |
| ---------------------------- | ---------------------------------------- |
| ActivityFeedScreen           | `src/screens/ActivityFeedScreen.tsx`     |
| EditExpenseScreen            | `src/screens/EditExpenseScreen.tsx`      |
| ActivityEventRow             | `src/components/ActivityEventRow.tsx`    |
| ActivityDateSection          | `src/components/ActivityDateSection.tsx` |
| AddExpenseScreen (reference) | `src/screens/AddExpenseScreen.tsx`       |
| ScreenHeader                 | `src/components/ScreenHeader.tsx`        |
| EmptyState                   | `src/components/EmptyState.tsx`          |
| Design tokens                | `src/theme/tokens.ts`                    |
