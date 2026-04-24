# 07 — Settings Deep Screens

## Overview

This document covers the four deep-linked screens accessible from Settings Home:

1. **ProfileScreen** — Edit display name, view email, manage account
2. **DefaultCurrencyScreen** — Search and select preferred currency
3. **NotificationsScreen** — Toggle notification preferences
4. **AboutScreen** — App info, legal links, social links

All four screens share the following base properties:

| Property          | Value                                          |
| ----------------- | ---------------------------------------------- |
| Root              | `SafeAreaView`                                 |
| Background        | `#F2F3F7` (`screenBg` deep variant)            |
| Header            | `ScreenHeader` with back button, light variant |
| Header bg         | `#FFFFFF`                                      |
| Header border     | `#E2E8F0` hairline                             |
| Header title size | 20px bold `#0F172A`                            |

---

## Design System Tokens (Shared)

| Token         | Value     |
| ------------- | --------- |
| `screenBg`    | `#F2F3F7` |
| `white`       | `#FFFFFF` |
| `text1`       | `#0F172A` |
| `text3`       | `#94A3B8` |
| `borderLight` | `#F1F5F9` |
| `borderMid`   | `#E2E8F0` |
| `brand`       | `#6366F1` |
| `brandLight`  | `#EEF2FF` |
| `negRed`      | `#E11D48` |
| `negBg`       | `#FFE4E6` |
| `posGreen`    | `#2D9B6F` |

---

---

# Screen 1 — ProfileScreen

## 1. Screen Purpose & User Flow Context

The Profile screen allows users to update their display name and view their account details. Email is read-only (cannot be changed). The screen also shows account metadata (member since date) and provides access to the destructive Delete Account action.

**Navigation:** Settings Home → Profile (push). Back button returns to Settings Home.

---

## 2. Visual Design Overview

The screen opens with a large centered avatar section on a white strip — this creates a clear focal point and feels like a profile editing experience rather than a form. Below it, two form cards handle editable fields and read-only metadata separately. The Save button is a full-width primary CTA. The Delete Account button is a danger variant at the bottom, visually separated from the save action.

---

## 3. Component Breakdown & Exact Specs

### 3.1 Root Container

```
SafeAreaView
  backgroundColor: #F2F3F7
  flex: 1

KeyboardAvoidingView
  behavior: "padding" (iOS) / "height" (Android)
  flex: 1

ScrollView
  showsVerticalScrollIndicator: false
  keyboardShouldPersistTaps: "handled"
  contentContainerStyle:
    paddingBottom: 48
```

---

### 3.2 ScreenHeader

```
View
  backgroundColor: #FFFFFF
  paddingHorizontal: 16
  paddingVertical: 14
  borderBottomWidth: StyleSheet.hairlineWidth
  borderBottomColor: #E2E8F0
  flexDirection: row
  alignItems: center

  Pressable (back button)
    marginRight: 8
    Icon "chevron-left"  size: 24  color: #0F172A

  Text "Profile"
    fontSize: 20
    fontWeight: 700
    color: #0F172A
```

---

### 3.3 Avatar Section

```
View
  backgroundColor: #FFFFFF
  borderBottomWidth: StyleSheet.hairlineWidth
  borderBottomColor: #E2E8F0
  paddingVertical: 32
  alignItems: center
  justifyContent: center
```

**Avatar container (80×80px)**

```
View
  width: 80
  height: 80
  position: relative

  ← Avatar circle:
  View
    width: 80
    height: 80
    borderRadius: 40
    backgroundColor: <deterministic color>
    alignItems: center
    justifyContent: center

    Text (initials)
      fontSize: 28
      fontWeight: 700
      color: #FFFFFF

  ← Camera badge (absolute, bottom-right):
  Pressable
    position: absolute
    bottom: 0
    right: 0
    width: 26
    height: 26
    borderRadius: 13
    backgroundColor: #6366F1
    borderWidth: 2
    borderColor: #FFFFFF
    alignItems: center
    justifyContent: center

    Icon "camera"
      size: 14
      color: #FFFFFF
```

The camera badge press opens an image picker (ActionSheet with Camera / Photo Library / Cancel).

---

### 3.4 Form Card — Editable Fields

```
View (card)
  marginHorizontal: 16
  marginTop: 24
  marginBottom: 24
  backgroundColor: #FFFFFF
  borderRadius: 12
  paddingHorizontal: 16
  paddingTop: 16
  paddingBottom: 8
  gap: 16
```

**InputField — Display Name**

```
View (field wrapper)
  gap: 6

  Text (label)
    fontSize: 12
    fontWeight: 500
    color: #94A3B8
    letterSpacing: 0.2

  View (input container)
    flexDirection: row
    alignItems: center
    backgroundColor: #F8FAFC
    borderRadius: 10
    borderWidth: 1
    borderColor: #E2E8F0
    paddingHorizontal: 12
    height: 48

    Icon "user"
      size: 16
      color: #94A3B8
      marginRight: 10

    TextInput
      flex: 1
      fontSize: 14
      fontWeight: 500
      color: #0F172A
      placeholder: "Your display name"
      placeholderTextColor: #94A3B8

  ← Focus state:
  borderColor: #6366F1
  backgroundColor: #FFFFFF
```

**InputField — Email (read-only)**

```
View (field wrapper)
  gap: 6

  Text (label) "Email"
    ← same as above

  View (input container)
    ← same structure, but:
    backgroundColor: #F8FAFC
    borderColor: #F1F5F9   ← lighter, signals non-editable

    Icon "mail"
      size: 16
      color: #94A3B8
      marginRight: 10

    TextInput
      editable: false
      color: #94A3B8   ← greyed out

  Text (hint) "Email cannot be changed"
    fontSize: 11
    fontWeight: 400
    color: #94A3B8
    marginTop: 4
```

---

### 3.5 Member Card

```
View (card)
  marginHorizontal: 16
  marginBottom: 24
  backgroundColor: #FFFFFF
  borderRadius: 12
  overflow: hidden
  borderWidth: 1
  borderColor: #F1F5F9
```

**ListRow — Member Since**

```
View (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14

  Text "Member Since"
    flex: 1
    fontSize: 14
    fontWeight: 500
    color: #0F172A

  Text "January 2024"
    fontSize: 14
    fontWeight: 400
    color: #94A3B8
```

No chevron. No separator (single row).

---

### 3.6 Save Button (Primary)

```
Pressable
  marginHorizontal: 16
  marginBottom: 24
  height: 56
  backgroundColor: #6366F1
  borderRadius: 14
  alignItems: center
  justifyContent: center
  shadowColor: #6366F1
  shadowOffset: { width: 0, height: 4 }
  shadowOpacity: 0.25
  shadowRadius: 8
  elevation: 4

  Text "Save Changes"
    fontSize: 16
    fontWeight: 700
    color: #FFFFFF
    letterSpacing: 0.2

← Loading state:
  ActivityIndicator color: #FFFFFF
  (replace text with spinner while saving)

← Disabled state (no changes):
  backgroundColor: #E2E8F0
  shadowOpacity: 0
  Text color: #94A3B8
```

---

### 3.7 Delete Account Button (Danger)

```
Pressable
  marginHorizontal: 16
  height: 56
  backgroundColor: #FFE4E6
  borderRadius: 14
  alignItems: center
  justifyContent: center

  Text "Delete Account"
    fontSize: 16
    fontWeight: 700
    color: #E11D48

← Press state:
  backgroundColor: #FECDD3
```

Press triggers a two-step Alert confirmation before proceeding.

---

## 4. Interaction States — Profile

| Element            | State       | Visual Change                          |
| ------------------ | ----------- | -------------------------------------- |
| Display Name input | Focus       | Border `#6366F1`, bg `#FFFFFF`         |
| Display Name input | Filled      | Border `#E2E8F0`, text `#0F172A`       |
| Email input        | Always      | Greyed text `#94A3B8`, no focus ring   |
| Save button        | No changes  | `#E2E8F0` bg, `#94A3B8` text, disabled |
| Save button        | Has changes | `#6366F1` bg, white text, enabled      |
| Save button        | Loading     | Spinner replaces text                  |
| Camera badge       | Press       | Opacity `0.8`                          |
| Delete Account     | Press       | `#FECDD3` bg                           |

---

---

# Screen 2 — DefaultCurrencyScreen

## 1. Screen Purpose & User Flow Context

Users select their preferred currency for displaying amounts throughout the app. The screen shows a searchable list of 12 supported currencies. The currently selected currency has a brand-colored check icon on the right. Selecting a new currency saves immediately (no Save button needed).

**Navigation:** Settings Home → Default Currency (push).

---

## 2. Visual Design Overview

The screen is a search-first list. The search bar is fixed at the top (inside a white strip with a hairline border), and the currency list scrolls beneath it. All currencies live inside a single white card with rounded corners. The selected currency is indicated by a check icon — no background highlight — keeping the list visually clean.

---

## 3. Component Breakdown & Exact Specs

### 3.1 Root Container

```
SafeAreaView
  backgroundColor: #F2F3F7
  flex: 1
```

---

### 3.2 Search Bar Strip

```
View
  backgroundColor: #FFFFFF
  borderBottomWidth: StyleSheet.hairlineWidth
  borderBottomColor: #E2E8F0
  paddingVertical: 12
  paddingHorizontal: 16
```

**InputField (search)**

```
View
  flexDirection: row
  alignItems: center
  backgroundColor: #F8FAFC
  borderRadius: 10
  borderWidth: 1
  borderColor: #E2E8F0
  paddingHorizontal: 12
  height: 44

  Icon "search"
    size: 16
    color: #94A3B8
    marginRight: 10

  TextInput
    flex: 1
    fontSize: 14
    fontWeight: 400
    color: #0F172A
    placeholder: "Search currencies..."
    placeholderTextColor: #94A3B8
    returnKeyType: "search"
    autoCorrect: false
```

---

### 3.3 Currency FlatList

```
FlatList
  contentContainerStyle:
    paddingTop: 16
    paddingHorizontal: 16
    paddingBottom: 48
  showsVerticalScrollIndicator: false
  keyboardShouldPersistTaps: "handled"
```

**Outer card wrapper**

```
View
  backgroundColor: #FFFFFF
  borderRadius: 12
  overflow: hidden
  borderWidth: 1
  borderColor: #F1F5F9
```

---

### 3.4 Currency ListRow

```
Pressable (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14
  backgroundColor: #FFFFFF

  ← Press state:
  backgroundColor: #EEF2FF
```

**Content**

```
View (flex 1)

  Text (currency name)
    fontSize: 14
    fontWeight: 500
    color: #0F172A

  Text (currency code)
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
    marginTop: 2
```

**Right elements**

```
View
  flexDirection: row
  alignItems: center
  gap: 12

  Text (symbol)
    fontSize: 14
    fontWeight: 600
    color: #94A3B8

  ← Selected only:
  Icon "check"
    size: 18
    color: #6366F1
    strokeWidth: 2.5
```

**Hairline separator** (same pattern as other screens — absolute bottom, left 16, right 0).

---

### 3.5 Supported Currencies

| Code | Name              | Symbol |
| ---- | ----------------- | ------ |
| USD  | US Dollar         | $      |
| EUR  | Euro              | €      |
| GBP  | British Pound     | £      |
| JPY  | Japanese Yen      | ¥      |
| AUD  | Australian Dollar | A$     |
| CAD  | Canadian Dollar   | C$     |
| CHF  | Swiss Franc       | Fr     |
| INR  | Indian Rupee      | ₹      |
| SGD  | Singapore Dollar  | S$     |
| MXN  | Mexican Peso      | MX$    |
| BRL  | Brazilian Real    | R$     |
| KRW  | South Korean Won  | ₩      |

---

### 3.6 Empty State (No Search Results)

```
View
  paddingVertical: 48
  alignItems: center

  Text "No currencies found"
    fontSize: 14
    fontWeight: 400
    color: #94A3B8
    textAlign: center
```

Shown inside the card area when the search query matches no currencies.

---

## 4. Interaction States — DefaultCurrency

| Element      | State        | Visual Change                 |
| ------------ | ------------ | ----------------------------- |
| Search input | Focus        | Border `#6366F1`              |
| Currency row | Press        | `backgroundColor` → `#EEF2FF` |
| Currency row | Selected     | Check icon `#6366F1` visible  |
| Currency row | Unselected   | No check icon                 |
| List         | Empty search | Empty state text shown        |

---

---

# Screen 3 — NotificationsScreen

## 1. Screen Purpose & User Flow Context

Users control which push notification categories they receive. Five toggles cover the main notification types. Changes take effect immediately (no Save button). The screen is intentionally simple — one card, five rows.

**Navigation:** Settings Home → Notifications (push).

---

## 2. Visual Design Overview

A single white card contains all five toggle rows. The card sits on the `#F2F3F7` background with standard margins. Each row has a label on the left and an iOS-style toggle on the right. The toggle uses brand indigo when on and a neutral grey when off.

---

## 3. Component Breakdown & Exact Specs

### 3.1 Root Container

```
SafeAreaView
  backgroundColor: #F2F3F7
  flex: 1

ScrollView
  contentContainerStyle:
    paddingTop: 24
    paddingHorizontal: 16
    paddingBottom: 48
```

---

### 3.2 Notifications Card

```
View (card)
  backgroundColor: #FFFFFF
  borderRadius: 12
  overflow: hidden
  borderWidth: 1
  borderColor: #F1F5F9
```

---

### 3.3 Toggle ListRow

```
View (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14
  backgroundColor: #FFFFFF
```

**Label block**

```
View (flex 1)

  Text (title)
    fontSize: 14
    fontWeight: 500
    color: #0F172A

  Text (subtitle — optional)
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
    marginTop: 2
```

**Toggle (iOS-style)**

```
Pressable (toggle)
  width: 51
  height: 31
  borderRadius: 15.5
  backgroundColor: #6366F1 (on) / #E2E8F0 (off)
  padding: 2

  ← Thumb:
  Animated.View
    width: 27
    height: 27
    borderRadius: 13.5
    backgroundColor: #FFFFFF
    shadowColor: #000000
    shadowOffset: { width: 0, height: 1 }
    shadowOpacity: 0.15
    shadowRadius: 2
    elevation: 2

    ← translateX: 20 (on) / 0 (off)
    ← Spring animation: tension 200, friction 20
```

**Hairline separator** — same pattern, omit on last row.

---

### 3.4 Notification Rows

| #   | Title          | Subtitle                          | Default |
| --- | -------------- | --------------------------------- | ------- |
| 1   | New Expenses   | When someone adds an expense      | ON      |
| 2   | Settlements    | When a balance is settled         | ON      |
| 3   | Reminders      | Gentle nudges for unpaid balances | ON      |
| 4   | Weekly Summary | Your weekly spending overview     | OFF     |
| 5   | Marketing      | Tips, updates, and offers         | OFF     |

---

## 4. Interaction States — Notifications

| Element | State             | Visual Change                                   |
| ------- | ----------------- | ----------------------------------------------- |
| Toggle  | On                | `#6366F1` track, thumb at right (translateX 20) |
| Toggle  | Off               | `#E2E8F0` track, thumb at left (translateX 0)   |
| Toggle  | Animating         | Spring transition, 200ms                        |
| Row     | Press (on toggle) | Toggle animates, no row flash                   |

---

---

# Screen 4 — AboutScreen

## 1. Screen Purpose & User Flow Context

The About screen provides app version information, legal document links, and social media links. It is purely informational — no editable fields. The screen opens external links (Terms, Privacy, social) in the system browser.

**Navigation:** Settings Home → About (push).

---

## 2. Visual Design Overview

The screen opens with a centered logo block — the app name in brand indigo and the version number below it. This gives the screen a distinct identity compared to the other settings screens. Below the logo, three settings groups follow the standard card-group pattern.

---

## 3. Component Breakdown & Exact Specs

### 3.1 Root Container

```
SafeAreaView
  backgroundColor: #F2F3F7
  flex: 1

ScrollView
  showsVerticalScrollIndicator: false
  contentContainerStyle:
    paddingBottom: 48
```

---

### 3.2 Logo Block

```
View
  alignItems: center
  paddingTop: 32
  marginBottom: 32

  Text "SplitEasy"
    fontSize: 24
    fontWeight: 700
    color: #6366F1
    letterSpacing: -0.5

  Text "Version 1.0.0"
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
    marginTop: 4
```

---

### 3.3 APP INFO Group

Section header: `APP INFO`

| Row | Label    | Right Label   | Chevron |
| --- | -------- | ------------- | ------- |
| 1   | Version  | 1.0.0         | No      |
| 2   | Build    | 100           | No      |
| 3   | Platform | iOS / Android | No      |

All rows are non-pressable (display only). Right label: 14px regular `#94A3B8`.

```
View (row — non-pressable)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14

  Text (label)
    flex: 1
    fontSize: 14
    fontWeight: 500
    color: #0F172A

  Text (right label)
    fontSize: 14
    fontWeight: 400
    color: #94A3B8
```

---

### 3.4 LEGAL Group

Section header: `LEGAL`

| Row | Label                | Action                     |
| --- | -------------------- | -------------------------- |
| 1   | Terms of Service     | Open URL in browser        |
| 2   | Privacy Policy       | Open URL in browser        |
| 3   | Open Source Licenses | Navigate to LicensesScreen |

All rows are pressable with chevron-right. Press state: `backgroundColor` → `#EEF2FF`.

---

### 3.5 FOLLOW US Group

Section header: `FOLLOW US`

| Row | Label       | Icon             | Action   |
| --- | ----------- | ---------------- | -------- |
| 1   | Twitter / X | `twitter` or `x` | Open URL |
| 2   | Instagram   | `instagram`      | Open URL |

Right element: `external-link` icon (16px `#94A3B8`) instead of chevron-right, to signal external navigation.

```
Icon "external-link"
  size: 16
  color: #94A3B8
```

---

### 3.6 Standard ListRow (Pressable, with Chevron)

```
Pressable (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14
  backgroundColor: #FFFFFF

  Text (label)
    flex: 1
    fontSize: 14
    fontWeight: 500
    color: #0F172A

  Icon "chevron-right" or "external-link"
    size: 16
    color: #94A3B8

  ← Press state:
  backgroundColor: #EEF2FF
```

---

## 4. Interaction States — About

| Element        | State | Visual Change                 |
| -------------- | ----- | ----------------------------- |
| Legal rows     | Press | `backgroundColor` → `#EEF2FF` |
| Follow Us rows | Press | `backgroundColor` → `#EEF2FF` |
| External links | Press | Opens `Linking.openURL()`     |
| APP INFO rows  | —     | Non-pressable, no press state |

---

---

# Unified AI Prompt — All 4 Deep Settings Screens

```
You are a senior mobile UI designer specialising in consumer fintech apps. Design all four deep settings screens for a React Native bill-splitting app called SplitEasy: Profile, DefaultCurrency, Notifications, and About. All screens share a common design language — premium, clean, and calm — with a distinct indigo brand identity.

SHARED DESIGN SYSTEM:
- Deep screen background: #F2F3F7 (slightly darker than main app #F8FAFC)
- Card surface: #FFFFFF
- Card border: #F1F5F9 (1px)
- Header bg: #FFFFFF, hairline border #E2E8F0
- Header title: 20px bold #0F172A, back button chevron-left 24px #0F172A
- Text primary: #0F172A
- Text tertiary: #94A3B8
- Brand: #6366F1
- Brand light: #EEF2FF
- Negative red: #E11D48
- Negative bg: #FFE4E6
- Input bg (editable): #F8FAFC, border #E2E8F0, focus border #6366F1
- Input bg (read-only): #F8FAFC, border #F1F5F9, text #94A3B8
- Toggle on: #6366F1 track
- Toggle off: #E2E8F0 track
- Toggle thumb: #FFFFFF with shadow

SETTINGS GROUP PATTERN (used in all screens):
- marginHorizontal: 16, marginBottom: 16
- Section header: 10px semibold #94A3B8, letterSpacing 2, uppercase, marginBottom 8
- Card: white, borderRadius 12, 1px #F1F5F9 border, overflow hidden
- Row: paddingHorizontal 16, paddingVertical 14, flexDirection row, alignItems center
- Hairline separator: absolute bottom 0, left 16, right 0, hairlineWidth, #F1F5F9
- Press state: backgroundColor #EEF2FF

---

SCREEN 1 — PROFILE:
Structure: KeyboardAvoidingView > ScrollView (paddingBottom 48)

Avatar section (white strip, hairline bottom border, paddingVertical 32, centered):
- 80×80px circle avatar, deterministic color, 28px bold white initials
- Camera badge: 26×26px #6366F1 circle, 2px white border, absolute bottom-right, camera icon 14px white
- Badge press → image picker ActionSheet

Form card (marginHorizontal 16, marginTop 24, marginBottom 24, white, borderRadius 12, paddingHorizontal 16, paddingTop 16, paddingBottom 8, gap 16):
- InputField "Display Name": leftIcon "user" 16px #94A3B8, editable, height 48, borderRadius 10
  Focus: border #6366F1, bg #FFFFFF
- InputField "Email": leftIcon "mail" 16px #94A3B8, editable=false, text #94A3B8, border #F1F5F9
  Hint below: "Email cannot be changed" 11px regular #94A3B8

Member card (marginHorizontal 16, marginBottom 24, white, borderRadius 12, 1px #F1F5F9 border):
- Single row: "Member Since" (14px medium #0F172A) + "January 2024" (14px regular #94A3B8), no chevron

Save button (marginHorizontal 16, marginBottom 24):
- height 56, borderRadius 14, backgroundColor #6366F1
- Brand shadow: shadowColor #6366F1, offset 0,4 opacity 0.25 radius 8
- "Save Changes" 16px bold white
- Disabled (no changes): #E2E8F0 bg, #94A3B8 text, no shadow
- Loading: ActivityIndicator white replaces text

Delete Account button (marginHorizontal 16):
- height 56, borderRadius 14, backgroundColor #FFE4E6
- "Delete Account" 16px bold #E11D48
- Press: #FECDD3 bg
- Press → two-step Alert confirmation

---

SCREEN 2 — DEFAULT CURRENCY:
Structure: SafeAreaView > fixed search strip > FlatList

Search strip (white bg, hairline bottom border, paddingVertical 12, paddingHorizontal 16):
- InputField: height 44, borderRadius 10, bg #F8FAFC, border #E2E8F0, leftIcon "search" 16px #94A3B8
- Placeholder: "Search currencies..."

FlatList (paddingTop 16, paddingHorizontal 16, paddingBottom 48):
- Single white card (borderRadius 12, 1px #F1F5F9 border, overflow hidden) wrapping all rows
- 12 currencies: USD/$, EUR/€, GBP/£, JPY/¥, AUD/A$, CAD/C$, CHF/Fr, INR/₹, SGD/S$, MXN/MX$, BRL/R$, KRW/₩
- Row: name 14px medium #0F172A + code 12px regular #94A3B8 (flex 1) | symbol 14px semibold #94A3B8 | check icon 18px #6366F1 (selected only)
- Row press: select immediately, no Save button needed
- Empty search: "No currencies found" 14px regular #94A3B8 centered inside card

---

SCREEN 3 — NOTIFICATIONS:
Structure: SafeAreaView > ScrollView (paddingTop 24, paddingHorizontal 16, paddingBottom 48)

Single white card (borderRadius 12, 1px #F1F5F9 border, overflow hidden):
5 toggle rows:
1. "New Expenses" / "When someone adds an expense" — ON
2. "Settlements" / "When a balance is settled" — ON
3. "Reminders" / "Gentle nudges for unpaid balances" — ON
4. "Weekly Summary" / "Your weekly spending overview" — OFF
5. "Marketing" / "Tips, updates, and offers" — OFF

Toggle specs:
- width 51, height 31, borderRadius 15.5
- On: backgroundColor #6366F1, thumb translateX 20
- Off: backgroundColor #E2E8F0, thumb translateX 0
- Thumb: 27×27px, borderRadius 13.5, white, shadow (offset 0,1 opacity 0.15 radius 2)
- Spring animation: tension 200, friction 20

---

SCREEN 4 — ABOUT:
Structure: SafeAreaView > ScrollView (paddingBottom 48)

Logo block (centered, paddingTop 32, marginBottom 32):
- "SplitEasy" 24px bold #6366F1 letterSpacing -0.5
- "Version 1.0.0" 12px regular #94A3B8 marginTop 4

3 settings groups:
APP INFO (non-pressable rows, right labels in #94A3B8):
- Version: "1.0.0"
- Build: "100"
- Platform: "iOS" or "Android" (Platform.OS)

LEGAL (pressable, chevron-right, press → #EEF2FF):
- Terms of Service → Linking.openURL
- Privacy Policy → Linking.openURL
- Open Source Licenses → navigate to LicensesScreen

FOLLOW US (pressable, external-link icon instead of chevron, press → #EEF2FF):
- Twitter / X → Linking.openURL
- Instagram → Linking.openURL

---

OUTPUT: Provide all four screens as separate React Native components in a single code block. Use StyleSheet.create with exact tokens. Use react-native-reanimated for toggle spring animations. Use Pressable for all interactive elements. Implement Linking.openURL for external links. Do not approximate any color values. Do not use placeholder data — use the exact currency list, notification labels, and version numbers specified above.
```

---

## Layout Measurements Summary (All 4 Screens)

| Element            | Margin H | Margin T | Margin B | Border Radius | Height |
| ------------------ | -------- | -------- | -------- | ------------- | ------ |
| Form card          | 16       | 24       | 24       | 12            | auto   |
| Member card        | 16       | —        | 24       | 12            | auto   |
| Save button        | 16       | —        | 24       | 14            | 56     |
| Delete button      | 16       | —        | —        | 14            | 56     |
| Avatar container   | —        | —        | —        | 40 (circle)   | 80     |
| Camera badge       | —        | —        | —        | 13 (circle)   | 26     |
| Search strip       | —        | —        | —        | 10            | 44     |
| Currency card      | 16       | —        | —        | 12            | auto   |
| Notifications card | 16       | —        | —        | 12            | auto   |
| Toggle             | —        | —        | —        | 15.5          | 31     |
| Toggle thumb       | —        | —        | —        | 13.5          | 27     |
| Settings group     | 16       | —        | 16       | —             | auto   |
| Settings card      | —        | —        | —        | 12            | auto   |
| ListRow            | —        | —        | —        | —             | ~52    |

---

## Screen Mockups — ASCII Reference

### Profile

```
┌─────────────────────────────────────┐
│ ← Profile                           │  ← ScreenHeader
├─────────────────────────────────────┤
│         [  AV  ]                    │  ← Avatar section (white strip)
│         [  80  ] [📷]               │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Display Name                    │ │  ← Form card
│ │ [👤 Alice Morgan              ] │ │
│ │ Email                           │ │
│ │ [✉  alice@email.com           ] │ │
│ │   Email cannot be changed       │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Member Since       January 2024 │ │  ← Member card
│ └─────────────────────────────────┘ │
│ [        Save Changes             ] │  ← Primary button
│ [        Delete Account           ] │  ← Danger button
└─────────────────────────────────────┘
```

### DefaultCurrency

```
┌─────────────────────────────────────┐
│ ← Default Currency                  │
├─────────────────────────────────────┤
│ [🔍 Search currencies...          ] │  ← Search strip (white)
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ US Dollar          $      ✓    │ │  ← Selected (check icon)
│ ├─────────────────────────────────┤ │
│ │ Euro               €            │ │
│ ├─────────────────────────────────┤ │
│ │ British Pound      £            │ │
│ │ ...                             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Notifications

```
┌─────────────────────────────────────┐
│ ← Notifications                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ New Expenses              [ON ] │ │
│ │ When someone adds an expense    │ │
│ ├─────────────────────────────────┤ │
│ │ Settlements               [ON ] │ │
│ ├─────────────────────────────────┤ │
│ │ Reminders                 [ON ] │ │
│ ├─────────────────────────────────┤ │
│ │ Weekly Summary           [OFF] │ │
│ ├─────────────────────────────────┤ │
│ │ Marketing                [OFF] │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### About

```
┌─────────────────────────────────────┐
│ ← About                             │
├─────────────────────────────────────┤
│           SplitEasy                 │  ← Brand indigo, 24px bold
│           Version 1.0.0             │  ← text3, 12px
│                                     │
│ APP INFO                            │
│ ┌─────────────────────────────────┐ │
│ │ Version                   1.0.0 │ │
│ │ Build                       100 │ │
│ │ Platform                    iOS │ │
│ └─────────────────────────────────┘ │
│ LEGAL                               │
│ ┌─────────────────────────────────┐ │
│ │ Terms of Service              › │ │
│ │ Privacy Policy                › │ │
│ │ Open Source Licenses          › │ │
│ └─────────────────────────────────┘ │
│ FOLLOW US                           │
│ ┌─────────────────────────────────┐ │
│ │ Twitter / X                   ↗ │ │
│ │ Instagram                     ↗ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```
