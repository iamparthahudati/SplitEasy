# 11 — Group Settings, Add Member & Export PDF Screens

## 1. Screen Purpose & User Flow Context

This document covers three related screens that form the group management flow in SplitEasy.

**GroupSettingsScreen** — Reached from the Group Detail header action. Allows the group admin to rename the group, manage members (add or remove), and perform destructive actions (archive, leave, delete). Non-admin members see a restricted view with leave-only actions.

**AddMemberScreen** — Reached from the "Add Member" row in Group Settings. Allows the user to search contacts, select one or more people to add, and confirm. Added members appear as chips above the confirm button.

**ExportPDFScreen** — Reached from Group Settings or a dedicated export action. Allows the user to configure export options (date range, include settled, include notes) and generate or share a PDF report of the group's expenses. Gated behind a premium subscription.

**Entry/Exit flows:**

- Group Detail → Group Settings → (Add Member | Export PDF | back)
- Add Member → confirm → Group Settings (members updated)
- Export PDF → generate → share sheet or file save

---

## 2. Design System Tokens

| Token        | Value     | Usage                                   |
| ------------ | --------- | --------------------------------------- |
| `brand`      | `#4F46E5` | Icons, selected states, primary buttons |
| `brandDark`  | `#3730A3` | Pressed states                          |
| `brandLight` | `#EEF2FF` | Icon backgrounds, selected chip bg      |
| `text1`      | `#0F172A` | Primary labels                          |
| `text2`      | `#334155` | Secondary labels, subtitles             |
| `text3`      | `#64748B` | Section headers, placeholders           |
| `text4`      | `#94A3B8` | Metadata, disabled text                 |
| `border`     | `#E2E8F0` | Card borders, hairlines                 |
| `borderMid`  | `#CBD5E1` | Chip borders                            |
| `bg`         | `#F8FAFC` | Screen background                       |
| `white`      | `#FFFFFF` | Card surfaces                           |
| `neg`        | `#EF4444` | Destructive actions, remove icons       |
| `negBg`      | `#FEF2F2` | Destructive icon backgrounds            |
| `pend`       | `#F59E0B` | Warning / archive actions               |
| `pendBg`     | `#FFFBEB` | Warning icon backgrounds                |

**Typography**

| Role             | Size | Weight | Line Height |
| ---------------- | ---- | ------ | ----------- |
| Section header   | 10px | 600    | 14px        |
| Body / row label | 14px | 500    | 20px        |
| Row subtitle     | 12px | 400    | 16px        |
| Chip label       | 12px | 500    | 16px        |
| Button label     | 16px | 600    | 24px        |
| Preview title    | 18px | 700    | 26px        |
| Preview subtitle | 12px | 400    | 16px        |
| Preview date     | 12px | 500    | 16px        |

---

## 3. Screen A — Group Settings

### 3.1 Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + title)    │
├─────────────────────────────────┤
│  ScrollView (flex 1, bg)        │
│                                 │
│  Group Image Section            │  paddingVertical 24
│    imageCircle + cameraBadge    │  paddingHorizontal 16
│    InputField Group Name        │
│                                 │
│  SettingsGroup 'MEMBERS'        │  marginTop 20
│    MemberRow × N                │
│    Add Member row               │
│                                 │
│  SettingsGroup 'DANGER ZONE'    │  marginTop 20
│    Archive row                  │
│    Leave row                    │
│    Delete row                   │
│                                 │
└─────────────────────────────────┘
```

### 3.2 ScreenHeader

| Property      | Value                                              |
| ------------- | -------------------------------------------------- |
| Background    | `white`                                            |
| Height        | 56px                                               |
| Left element  | Back chevron, 24px, `text2`                        |
| Title         | `Group Settings`, 17px SemiBold, `text1`, centered |
| Right element | None                                               |
| Bottom border | 1px `border` hairline                              |

### 3.3 Group Image Section

| Property           | Value                     |
| ------------------ | ------------------------- |
| Align items        | `center`                  |
| Padding vertical   | 24px                      |
| Padding horizontal | 16px                      |
| Background         | `bg` (screen bg, no card) |

**imageCircle**

| Property        | Value                            |
| --------------- | -------------------------------- |
| Width           | 80px                             |
| Height          | 80px                             |
| Border radius   | 40px                             |
| Background      | `brand` `#4F46E5`                |
| Icon            | `users` (Feather), 32px, `white` |
| Align items     | `center`                         |
| Justify content | `center`                         |
| Position        | `relative`                       |

**cameraBadge**

| Property        | Value                             |
| --------------- | --------------------------------- |
| Width           | 26px                              |
| Height          | 26px                              |
| Border radius   | 13px                              |
| Background      | `brand` `#4F46E5`                 |
| Border          | 2px solid `white`                 |
| Position        | `absolute`                        |
| Bottom          | 0px                               |
| Right           | 0px                               |
| Icon            | `camera` (Feather), 13px, `white` |
| Align items     | `center`                          |
| Justify content | `center`                          |

**Group Name InputField**

| Property                | Value                              |
| ----------------------- | ---------------------------------- |
| Container background    | `white`                            |
| Container border radius | 12px                               |
| Container border        | 1px `border`                       |
| Margin top              | 16px                               |
| Width                   | `100%` (full width within padding) |
| Left icon               | `edit-2` (Feather), 18px, `text3`  |
| Placeholder             | `Group name`                       |
| Font size               | 14px                               |
| Font weight             | 500                                |
| Color                   | `text1`                            |
| Height                  | 52px                               |
| Padding horizontal      | 16px                               |

### 3.4 SettingsGroup — "MEMBERS"

**Section Header**

| Property          | Value       |
| ----------------- | ----------- |
| Text              | `MEMBERS`   |
| Font size         | 10px        |
| Font weight       | 600         |
| Color             | `text3`     |
| Letter spacing    | 0.8px       |
| Text transform    | `uppercase` |
| Margin horizontal | 16px        |
| Margin top        | 20px        |
| Margin bottom     | 8px         |

**Members Card**

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Overflow          | `hidden` |

**Member ListRow (existing members)**

| Property           | Value                 |
| ------------------ | --------------------- |
| Flex direction     | `row`                 |
| Align items        | `center`              |
| Padding horizontal | 16px                  |
| Padding vertical   | 12px                  |
| Bottom border      | 1px `border` hairline |
| Gap                | 12px                  |

| Element          | Spec                                                            |
| ---------------- | --------------------------------------------------------------- |
| Avatar (sm)      | 32×32px circle, `brandLight` bg, `brand` initials 12px SemiBold |
| Name             | 14px medium `text1`, flex 1                                     |
| Right (non-self) | `minus-circle` icon 20px `neg` — Pressable, 44px touch target   |
| Right (self)     | `You` label 12px regular `text3`                                |

**Add Member Row**

| Property           | Value                       |
| ------------------ | --------------------------- |
| Flex direction     | `row`                       |
| Align items        | `center`                    |
| Padding horizontal | 16px                        |
| Padding vertical   | 14px                        |
| Gap                | 12px                        |
| On press           | Navigate to AddMemberScreen |

| Element      | Spec                                                      |
| ------------ | --------------------------------------------------------- |
| Icon wrapper | 32×32px circle, `brandLight` bg, `plus` icon 20px `brand` |
| Label        | `Add Member` 14px medium `brand`                          |
| Right        | `chevron-right` 16px `text4`                              |

### 3.5 SettingsGroup — "DANGER ZONE"

**Section Header** — same spec as MEMBERS, text `DANGER ZONE`.

**Danger Card**

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Overflow          | `hidden` |

**Archive Row**

| Element           | Spec                                                                          |
| ----------------- | ----------------------------------------------------------------------------- |
| Left icon wrapper | 32×32px circle, `pendBg` `#FFFBEB` bg, `alert-triangle` 18px `pend` `#F59E0B` |
| Label             | `Archive Group` 14px medium `text1`                                           |
| Bottom border     | 1px `border` hairline                                                         |
| On press          | Alert: "Archive Group?" → confirm archives and navigates to Groups list       |

**Leave Row**

| Element           | Spec                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| Left icon wrapper | 32×32px circle, `negBg` `#FEF2F2` bg, `log-out` 18px `neg` `#EF4444` |
| Label             | `Leave Group` 14px medium `neg`                                      |
| Bottom border     | 1px `border` hairline                                                |
| On press          | Alert: "Leave Group?" → confirm leaves and navigates to Groups list  |

**Delete Row**

| Element           | Spec                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| Left icon wrapper | 32×32px circle, `negBg` bg, `trash-2` 18px `neg`                      |
| Label             | `Delete Group` 14px medium `neg`                                      |
| Bottom border     | none (last row)                                                       |
| On press          | Alert: "Delete Group?" → confirm deletes and navigates to Groups list |

**Alert Specs (all danger actions)**

| Property | Value                                    |
| -------- | ---------------------------------------- |
| Title    | `[Action] Group?`                        |
| Message  | Contextual warning about irreversibility |
| Confirm  | Destructive style button                 |
| Cancel   | `Cancel`                                 |

---

## 4. Screen B — Add Member

### 4.1 Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + title)    │
├─────────────────────────────────┤
│  ScrollView (flex 1, bg)        │
│                                 │
│  Search InputField              │  marginHorizontal 16
│                                 │  marginTop 16
│  SectionHeader 'SUGGESTIONS'    │  marginTop 20
│  ┌─────────────────────────┐    │  marginHorizontal 16
│  │ ContactRow × 4          │    │  marginTop 8
│  └─────────────────────────┘    │
│                                 │
│  Added chips row (conditional)  │  marginTop 16
│                                 │
└─────────────────────────────────┘
│  Bottom Bar (fixed)             │
│  [  Add N Member(s)  ]         │
└─────────────────────────────────┘
```

### 4.2 ScreenHeader

| Property      | Value                                          |
| ------------- | ---------------------------------------------- |
| Background    | `white`                                        |
| Height        | 56px                                           |
| Left element  | Back chevron, 24px, `text2`                    |
| Title         | `Add Member`, 17px SemiBold, `text1`, centered |
| Right element | None                                           |
| Bottom border | 1px `border` hairline                          |

### 4.3 Search InputField

| Property                | Value                             |
| ----------------------- | --------------------------------- |
| Container background    | `white`                           |
| Container border radius | 12px                              |
| Container border        | 1px `border`                      |
| Margin horizontal       | 16px                              |
| Margin top              | 16px                              |
| Left icon               | `search` (Feather), 18px, `text3` |
| Placeholder             | `Search by name or email`         |
| Placeholder color       | `text4`                           |
| Font size               | 14px                              |
| Color                   | `text1`                           |
| Height                  | 48px                              |
| Padding horizontal      | 16px                              |
| Focused border          | 1px `brand`                       |

### 4.4 Suggestions Section

**Section Header — "SUGGESTIONS"**

| Property          | Value                  |
| ----------------- | ---------------------- |
| Text              | `SUGGESTIONS`          |
| Font size         | 10px                   |
| Font weight       | 600                    |
| Color             | `text3`                |
| Letter spacing    | 0.8px                  |
| Text transform    | `uppercase`            |
| Margin horizontal | 16px                   |
| Margin top        | 20px                   |
| Margin bottom     | 8px                    |
| Compact variant   | No extra bottom margin |

**Suggestions Card**

| Property          | Value        |
| ----------------- | ------------ |
| Background        | `white`      |
| Border radius     | 12px         |
| Margin horizontal | 16px         |
| Border            | 1px `border` |
| Overflow          | `hidden`     |

**Contact ListRow**

| Property           | Value                                  |
| ------------------ | -------------------------------------- |
| Flex direction     | `row`                                  |
| Align items        | `center`                               |
| Padding horizontal | 16px                                   |
| Padding vertical   | 12px                                   |
| Bottom border      | 1px `border` hairline (last row: none) |
| Gap                | 12px                                   |

| Element        | Spec                                                            |
| -------------- | --------------------------------------------------------------- |
| Avatar (sm)    | 32×32px circle, `brandLight` bg, `brand` initials 12px SemiBold |
| Name           | 14px medium `text1`                                             |
| Email subtitle | 12px regular `text3`, marginTop 2px                             |
| Flex           | 1 (name+email column)                                           |

**Add Pill — Default (not added)**

| Property           | Value       |
| ------------------ | ----------- |
| Border             | 1px `brand` |
| Border radius      | 999px       |
| Padding horizontal | 12px        |
| Padding vertical   | 4px         |
| Label              | `Add`       |
| Label font size    | 12px        |
| Label font weight  | 500         |
| Label color        | `brand`     |
| Background         | `white`     |

**Add Pill — Added state**

| Property           | Value                  |
| ------------------ | ---------------------- |
| Background         | `brandLight` `#EEF2FF` |
| Border             | 1px `brandLight`       |
| Border radius      | 999px                  |
| Padding horizontal | 12px                   |
| Padding vertical   | 4px                    |
| Label              | `Added`                |
| Label font size    | 12px                   |
| Label font weight  | 500                    |
| Label color        | `brandDark` `#3730A3`  |

### 4.5 Added Chips Row (Conditional)

Rendered only when at least one contact has been added.

| Property          | Value |
| ----------------- | ----- |
| Margin top        | 16px  |
| Margin horizontal | 16px  |

**Label**

| Property       | Value       |
| -------------- | ----------- |
| Text           | `ADDED`     |
| Font size      | 10px        |
| Font weight    | 600         |
| Color          | `text3`     |
| Letter spacing | 0.8px       |
| Text transform | `uppercase` |
| Margin bottom  | 8px         |

**Chips ScrollView**

| Property          | Value   |
| ----------------- | ------- |
| Horizontal        | `true`  |
| Show indicator    | `false` |
| Gap between chips | 8px     |
| Padding bottom    | 4px     |

**Added Member Chip**

| Property           | Value                        |
| ------------------ | ---------------------------- |
| Background         | `brand` `#4F46E5`            |
| Border radius      | 999px                        |
| Padding horizontal | 12px                         |
| Padding vertical   | 6px                          |
| Flex direction     | `row`                        |
| Align items        | `center`                     |
| Gap                | 6px                          |
| Name font size     | 12px                         |
| Name font weight   | 500                          |
| Name color         | `white`                      |
| Close icon         | `x` (Feather), 12px, `white` |
| On close press     | Remove from added list       |

### 4.6 Bottom Bar (Fixed)

| Property           | Value                                              |
| ------------------ | -------------------------------------------------- |
| Position           | Fixed to bottom (absolute or KeyboardAvoidingView) |
| Background         | `white`                                            |
| Top border         | 1px `border` hairline                              |
| Padding horizontal | 16px                                               |
| Padding vertical   | 12px                                               |
| Safe area bottom   | respected                                          |

**Confirm Button**

| Property          | Value                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| Variant           | `primary`                                                                 |
| Height            | 52px                                                                      |
| Border radius     | 14px                                                                      |
| Background        | `brand` (enabled) / `#A5B4FC` (disabled)                                  |
| Label             | `Add Member` (N=1) / `Add N Members` (N>1) / `Add Member` (N=0, disabled) |
| Label font size   | 16px                                                                      |
| Label font weight | 600                                                                       |
| Label color       | `white`                                                                   |
| Disabled          | `true` when no contacts added                                             |

---

## 5. Screen C — Export PDF

### 5.1 Layout Overview

```
┌─────────────────────────────────┐
│  ScreenHeader (back + title)    │
├─────────────────────────────────┤
│  ScrollView (flex 1, bg)        │
│                                 │
│  Preview Card                   │  marginHorizontal 16
│                                 │  marginTop 16
│  SettingsGroup 'OPTIONS'        │  marginTop 20
│    SelectRow Date Range         │
│    ListRow Include Settled      │
│    ListRow Include Notes        │
│                                 │
│  PremiumBanner (non-premium)    │  marginTop 20
│                                 │
│  Action Buttons Row             │  marginHorizontal 16
│    [Export PDF] [Share]         │  marginTop 20
│                                 │
└─────────────────────────────────┘
```

### 5.2 ScreenHeader

| Property      | Value                                          |
| ------------- | ---------------------------------------------- |
| Background    | `white`                                        |
| Height        | 56px                                           |
| Left element  | Back chevron, 24px, `text2`                    |
| Title         | `Export PDF`, 17px SemiBold, `text1`, centered |
| Right element | None                                           |
| Bottom border | 1px `border` hairline                          |

### 5.3 Preview Card

| Property            | Value                     |
| ------------------- | ------------------------- |
| Background          | `white`                   |
| Border radius       | 16px                      |
| Margin horizontal   | 16px                      |
| Margin top          | 16px                      |
| Shadow opacity      | 0.07                      |
| Shadow radius       | 8px                       |
| Shadow offset       | `{ width: 0, height: 2 }` |
| Elevation (Android) | 3                         |
| Flex direction      | `row`                     |
| Overflow            | `hidden`                  |

**Left Accent Bar**

| Property             | Value                |
| -------------------- | -------------------- |
| Width                | 4px                  |
| Background           | `brand` `#4F46E5`    |
| Border radius (left) | 16px on left corners |
| Align self           | `stretch`            |

**Card Body**

| Property           | Value |
| ------------------ | ----- |
| Flex               | 1     |
| Padding horizontal | 16px  |
| Padding vertical   | 16px  |

| Element  | Spec                                                            |
| -------- | --------------------------------------------------------------- |
| Title    | Group name, 18px bold `text1`                                   |
| Subtitle | `Expense Report`, 12px regular `text3`, marginTop 4px           |
| Date     | e.g. `Jan 1 – Apr 24, 2026`, 12px medium `text2`, marginTop 8px |

### 5.4 SettingsGroup — "OPTIONS"

**Section Header**

| Property          | Value       |
| ----------------- | ----------- |
| Text              | `OPTIONS`   |
| Font size         | 10px        |
| Font weight       | 600         |
| Color             | `text3`     |
| Letter spacing    | 0.8px       |
| Text transform    | `uppercase` |
| Margin horizontal | 16px        |
| Margin top        | 20px        |
| Margin bottom     | 8px         |

**Options Card**

| Property          | Value    |
| ----------------- | -------- |
| Background        | `white`  |
| Border radius     | 12px     |
| Margin horizontal | 16px     |
| Overflow          | `hidden` |

**SelectRow — Date Range**

| Property          | Value                               |
| ----------------- | ----------------------------------- |
| Left icon         | `calendar` (Feather), 18px, `text3` |
| Label             | `Date Range`                        |
| Label font size   | 14px                                |
| Label font weight | 500                                 |
| Label color       | `text1`                             |
| Value             | e.g. `All Time` or `Last 30 Days`   |
| Value font size   | 14px                                |
| Value color       | `text3`                             |
| Right icon        | `chevron-right`, 16px, `text4`      |
| Height            | 52px                                |
| Bottom border     | 1px `border` hairline               |

**ListRow — Include Settled (Toggle)**

| Property          | Value                                   |
| ----------------- | --------------------------------------- |
| Left icon         | `check-circle` (Feather), 18px, `text3` |
| Label             | `Include Settled`                       |
| Label font size   | 14px                                    |
| Label font weight | 500                                     |
| Label color       | `text1`                                 |
| Right element     | Toggle switch                           |
| Toggle on color   | `brand`                                 |
| Toggle off color  | `borderMid`                             |
| Height            | 52px                                    |
| Bottom border     | 1px `border` hairline                   |

**ListRow — Include Notes (Toggle)**

| Property          | Value                                |
| ----------------- | ------------------------------------ |
| Left icon         | `file-text` (Feather), 18px, `text3` |
| Label             | `Include Notes`                      |
| Label font size   | 14px                                 |
| Label font weight | 500                                  |
| Label color       | `text1`                              |
| Right element     | Toggle switch                        |
| Toggle on color   | `brand`                              |
| Toggle off color  | `borderMid`                          |
| Height            | 52px                                 |
| Bottom border     | none (last row)                      |

### 5.5 PremiumBanner (Non-Premium Only)

Rendered only when `isPremium === false`.

| Property          | Value                   |
| ----------------- | ----------------------- |
| Background        | `brandLight` `#EEF2FF`  |
| Border radius     | 12px                    |
| Margin horizontal | 16px                    |
| Margin top        | 20px                    |
| Padding           | 16px                    |
| Border            | 1px `brand` opacity 0.2 |
| Flex direction    | `row`                   |
| Align items       | `center`                |
| Gap               | 12px                    |

| Element  | Spec                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| Icon     | `star` (Feather), 20px, `brand`                                                   |
| Title    | `Premium Feature` 14px SemiBold `brand`                                           |
| Subtitle | `Export PDF is available on the Premium plan.` 12px regular `text3` marginTop 2px |
| CTA      | `Upgrade` 12px SemiBold `brand`, right-aligned, underline                         |

### 5.6 Action Buttons Row

| Property          | Value |
| ----------------- | ----- |
| Flex direction    | `row` |
| Gap               | 12px  |
| Margin horizontal | 16px  |
| Margin top        | 20px  |
| Margin bottom     | 32px  |

**Export PDF Button**

| Property          | Value                                         |
| ----------------- | --------------------------------------------- |
| Variant           | `primary`                                     |
| Flex              | 1                                             |
| Height            | 52px                                          |
| Border radius     | 14px                                          |
| Background        | `brand` (isPremium) / `#A5B4FC` (not premium) |
| Label             | `Export PDF`                                  |
| Label font size   | 15px                                          |
| Label font weight | 600                                           |
| Label color       | `white`                                       |
| Left icon         | `download` (Feather), 16px, `white`           |
| Disabled          | `!isPremium`                                  |
| On press          | Gate on isPremium → generate PDF → file save  |

**Share Button**

| Property          | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| Variant           | `outline`                                               |
| Flex              | 1                                                       |
| Height            | 52px                                                    |
| Border radius     | 14px                                                    |
| Background        | `white`                                                 |
| Border            | 1px `brand` (isPremium) / 1px `borderMid` (not premium) |
| Label             | `Share`                                                 |
| Label font size   | 15px                                                    |
| Label font weight | 600                                                     |
| Label color       | `brand` (isPremium) / `text4` (not premium)             |
| Left icon         | `share-2` (Feather), 16px, same as label color          |
| Disabled          | `!isPremium`                                            |
| On press          | Gate on isPremium → generate PDF → share sheet          |

---

## 6. Interaction States

### Group Settings

| Element            | State   | Visual                       |
| ------------------ | ------- | ---------------------------- |
| Member remove icon | Default | `neg` color                  |
| Member remove icon | Pressed | `neg` opacity 0.7, scale 0.9 |
| Add Member row     | Pressed | `#F8FAFC` bg                 |
| Danger rows        | Pressed | `#F8FAFC` bg                 |
| Group name input   | Focused | `brand` border 1px           |

### Add Member

| Element          | State    | Visual                             |
| ---------------- | -------- | ---------------------------------- |
| Search input     | Focused  | `brand` border 1px                 |
| Add pill         | Default  | `brand` border, `brand` label      |
| Add pill         | Added    | `brandLight` bg, `brandDark` label |
| Add pill         | Pressed  | Scale 0.96                         |
| Added chip close | Pressed  | Opacity 0.7                        |
| Confirm button   | Disabled | `#A5B4FC` bg                       |
| Confirm button   | Pressed  | `brandDark` bg, scale 0.98         |

### Export PDF

| Element       | State    | Visual                            |
| ------------- | -------- | --------------------------------- |
| Toggle        | On       | `brand` track                     |
| Toggle        | Off      | `borderMid` track                 |
| Export button | Disabled | `#A5B4FC` bg                      |
| Export button | Pressed  | `brandDark` bg, scale 0.98        |
| Share button  | Disabled | `borderMid` border, `text4` label |
| Share button  | Pressed  | `brandLight` bg                   |

---

## 7. Empty & Edge States

| Screen         | Scenario                        | Behavior                                                                   |
| -------------- | ------------------------------- | -------------------------------------------------------------------------- |
| Group Settings | Only 1 member (self)            | Remove icon hidden; only "Add Member" and danger rows shown                |
| Group Settings | Non-admin user                  | Archive and Delete rows hidden; only Leave shown                           |
| Add Member     | No search results               | Empty state: `search` icon 32px `text4` + "No contacts found" 14px `text3` |
| Add Member     | All suggestions already members | Pill shows `Member` label in `text4`, non-pressable                        |
| Export PDF     | No expenses in range            | Warning text below options: "No expenses in selected date range"           |
| Export PDF     | isPremium=true                  | PremiumBanner hidden; both buttons fully enabled                           |

---

## 8. AI Prompt — Premium Redesign (All 3 Screens)

```
Design three premium mobile screens for a bill-splitting app called SplitEasy.
The app uses a clean light design system with the following tokens:
  brand=#4F46E5, brandDark=#3730A3, brandLight=#EEF2FF,
  text1=#0F172A, text2=#334155, text3=#64748B, text4=#94A3B8,
  border=#E2E8F0, borderMid=#CBD5E1, bg=#F8FAFC, white=#FFFFFF,
  neg=#EF4444, negBg=#FEF2F2, pend=#F59E0B, pendBg=#FFFBEB.

=== SCREEN A: GROUP SETTINGS ===

1. SCREEN HEADER
   White bg, 56px, hairline bottom border. Left: back chevron 24px text2.
   Center: "Group Settings" 17px SemiBold text1.

2. GROUP IMAGE SECTION
   Centered, paddingVertical 24px, paddingHorizontal 16px, bg background (no card).
   - imageCircle: 80×80px circle, brand bg, users icon 32px white, centered.
   - cameraBadge: 26×26px circle, brand bg, 2px white border, absolute bottom-right of imageCircle.
     camera icon 13px white, centered.
   - Group Name InputField below: white bg, borderRadius 12px, 1px border border,
     marginTop 16px, left edit-2 icon 18px text3, "Group name" placeholder, height 52px.

3. MEMBERS SETTINGS GROUP
   Section header "MEMBERS": 10px SemiBold text3 uppercase letterSpacing 0.8,
   marginHorizontal 16px, marginTop 20px, marginBottom 8px.
   White card: borderRadius 12px, marginHorizontal 16px, overflow hidden.
   - Member rows: flexDirection row, alignItems center, paddingHorizontal 16px,
     paddingVertical 12px, hairline bottom border, gap 12px.
     Left: Avatar 32px (brandLight bg, brand initials 12px SemiBold).
     Middle: name 14px medium text1, flex 1.
     Right (non-self): minus-circle icon 20px neg, 44px touch target.
     Right (self): "You" 12px regular text3.
   - Add Member row: same layout, left icon wrapper 32px brandLight bg with plus 20px brand.
     Label "Add Member" 14px medium brand. Right: chevron-right 16px text4.

4. DANGER ZONE SETTINGS GROUP
   Section header "DANGER ZONE": same style, marginTop 20px.
   White card: borderRadius 12px, marginHorizontal 16px, overflow hidden.
   - Archive row: 32px pendBg circle + alert-triangle 18px pend. Label "Archive Group" 14px medium text1.
   - Leave row: 32px negBg circle + log-out 18px neg. Label "Leave Group" 14px medium neg.
   - Delete row: 32px negBg circle + trash-2 18px neg. Label "Delete Group" 14px medium neg.
   All rows: paddingHorizontal 16px, paddingVertical 14px, hairline bottom border (except last).
   All rows: on press show Alert with destructive confirm.

=== SCREEN B: ADD MEMBER ===

1. SCREEN HEADER
   White bg, 56px, hairline bottom border. Left: back chevron 24px text2.
   Center: "Add Member" 17px SemiBold text1.

2. SEARCH INPUT
   White bg, borderRadius 12px, 1px border border, marginHorizontal 16px, marginTop 16px.
   Left search icon 18px text3. Placeholder "Search by name or email" 14px text4. Height 48px.
   Focused: brand border 1px.

3. SUGGESTIONS SECTION
   Section header "SUGGESTIONS": 10px SemiBold text3 uppercase, marginHorizontal 16px, marginTop 20px.
   White card: borderRadius 12px, marginHorizontal 16px, marginTop 8px, 1px border border, overflow hidden.
   4 contact rows: flexDirection row, alignItems center, paddingHorizontal 16px, paddingVertical 12px,
   hairline bottom border (last: none), gap 12px.
   - Avatar 32px (brandLight bg, brand initials 12px SemiBold).
   - Column: name 14px medium text1 + email 12px regular text3, flex 1.
   - Add pill (right):
     Default: white bg, 1px brand border, borderRadius 999px, paddingHorizontal 12px, paddingVertical 4px,
       "Add" 12px medium brand.
     Added: brandLight bg, 1px brandLight border, "Added" 12px medium brandDark.

4. ADDED CHIPS ROW (conditional — shown when ≥1 added)
   Label "ADDED": 10px SemiBold text3 uppercase, marginHorizontal 16px, marginTop 16px, marginBottom 8px.
   Horizontal ScrollView, gap 8px.
   Each chip: brand bg, borderRadius 999px, paddingHorizontal 12px, paddingVertical 6px,
   flexDirection row, gap 6px. Name 12px medium white + x icon 12px white.

5. BOTTOM BAR (fixed)
   White bg, hairline top border, paddingHorizontal 16px, paddingVertical 12px.
   Button: primary, height 52px, borderRadius 14px, brand bg (enabled) / #A5B4FC (disabled).
   Label: "Add Member" (1 added) / "Add N Members" (N>1) / "Add Member" (0, disabled).
   16px SemiBold white.

=== SCREEN C: EXPORT PDF ===

1. SCREEN HEADER
   White bg, 56px, hairline bottom border. Left: back chevron 24px text2.
   Center: "Export PDF" 17px SemiBold text1.

2. PREVIEW CARD
   White card, borderRadius 16px, marginHorizontal 16px, marginTop 16px.
   Shadow: opacity 0.07, radius 8px, elevation 3.
   flexDirection row, overflow hidden.
   - Left accent bar: 4px wide, brand bg, full height, rounded left corners.
   - Body (flex 1): paddingHorizontal 16px, paddingVertical 16px.
     Title: group name, 18px bold text1.
     Subtitle: "Expense Report" 12px regular text3, marginTop 4px.
     Date: "Jan 1 – Apr 24, 2026" 12px medium text2, marginTop 8px.

3. OPTIONS SETTINGS GROUP
   Section header "OPTIONS": 10px SemiBold text3 uppercase, marginHorizontal 16px, marginTop 20px.
   White card: borderRadius 12px, marginHorizontal 16px, overflow hidden.
   - SelectRow Date Range: left calendar icon 18px text3, "Date Range" 14px medium text1,
     value "All Time" 14px text3, chevron-right 16px text4, height 52px, hairline bottom border.
   - ListRow Include Settled: left check-circle icon 18px text3, "Include Settled" 14px medium text1,
     right Toggle (brand on / borderMid off), height 52px, hairline bottom border.
   - ListRow Include Notes: left file-text icon 18px text3, "Include Notes" 14px medium text1,
     right Toggle, height 52px, no bottom border.

4. PREMIUM BANNER (non-premium only)
   brandLight bg, borderRadius 12px, marginHorizontal 16px, marginTop 20px, padding 16px,
   1px brand border opacity 0.2. flexDirection row, alignItems center, gap 12px.
   Left: star icon 20px brand.
   Column: "Premium Feature" 14px SemiBold brand + "Export PDF is available on the Premium plan." 12px regular text3.
   Right: "Upgrade" 12px SemiBold brand underline.

5. ACTION BUTTONS ROW
   flexDirection row, gap 12px, marginHorizontal 16px, marginTop 20px, marginBottom 32px.
   - Export PDF button (flex 1): primary, height 52px, borderRadius 14px.
     brand bg (isPremium) / #A5B4FC (not premium). download icon 16px white + "Export PDF" 15px SemiBold white.
   - Share button (flex 1): outline, height 52px, borderRadius 14px, white bg.
     1px brand border (isPremium) / 1px borderMid (not premium).
     share-2 icon 16px + "Share" 15px SemiBold — brand color (isPremium) / text4 (not premium).

VISUAL DIRECTION (all 3 screens):
- Group Settings: the danger zone should feel serious but not alarming — colored icon circles
  (amber for archive, red for leave/delete) provide clear visual coding without aggressive styling.
- The camera badge on the group image is a subtle affordance — small, precise, brand-colored.
- Add Member: the add/added pill state change is the key micro-interaction — instant visual feedback.
  The added chips row appears smoothly when the first contact is added.
- Export PDF: the preview card with the left accent bar mimics a real document — it grounds the screen.
  The premium banner is informational, not aggressive — brandLight bg keeps it soft.
- All screens: white cards on #F8FAFC bg, no shadows (except Export PDF preview card which uses a subtle shadow).
- Consistent section header style across all screens: 10px SemiBold text3 uppercase letterSpacing 0.8.
- Render each screen at 390×844px (iPhone 14 Pro), light mode only.
```

---

## 9. Accessibility Notes

### Group Settings

- Remove member icon: `accessibilityLabel="Remove [Name] from group"`, `accessibilityRole="button"`
- Add Member row: `accessibilityLabel="Add a new member"`, `accessibilityRole="button"`
- Danger rows: `accessibilityLabel="[Action] group"`, `accessibilityRole="button"`, `accessibilityHint="Double tap to confirm"`
- Camera badge: `accessibilityLabel="Change group photo"`, `accessibilityRole="button"`

### Add Member

- Search input: `accessibilityLabel="Search contacts"`, `accessibilityHint="Search by name or email"`
- Add pill: `accessibilityRole="button"`, `accessibilityLabel="Add [Name]"` / `"[Name] added"`
- Added chip close: `accessibilityLabel="Remove [Name]"`, `accessibilityRole="button"`
- Confirm button: `accessibilityLabel="Add N member(s) to group"`, `accessibilityState={{ disabled }}`

### Export PDF

- Toggle rows: `accessibilityRole="switch"`, `accessibilityState={{ checked }}`, `accessibilityLabel="[Option name]"`
- Export button: `accessibilityLabel="Export PDF"`, `accessibilityState={{ disabled: !isPremium }}`
- Share button: `accessibilityLabel="Share PDF"`, `accessibilityState={{ disabled: !isPremium }}`
- Premium banner CTA: `accessibilityLabel="Upgrade to Premium"`, `accessibilityRole="button"`
