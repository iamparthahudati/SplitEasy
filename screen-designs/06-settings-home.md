# 06 — Settings Home Screen

## 1. Screen Purpose & User Flow Context

The Settings Home screen is the user's control panel — account management, app preferences, and session control all live here. It is the entry point to a set of deep-linked settings screens. The screen is intentionally calm and organised: no distracting colors, clear groupings, and a prominent profile card that reinforces identity.

**Flow position:** Tab 4 of 4. No back button. Scrollable content beneath a standard light screen header. Navigates forward to: Profile, DefaultCurrency, Notifications, About screens.

---

## 2. Design System Tokens

| Token         | Value     | Usage                                           |
| ------------- | --------- | ----------------------------------------------- |
| `screenBg`    | `#F8FAFC` | Root background                                 |
| `white`       | `#FFFFFF` | Cards, header                                   |
| `text1`       | `#0F172A` | Names, row labels                               |
| `text2`       | `#475569` | —                                               |
| `text3`       | `#94A3B8` | Email, section headers, hints                   |
| `borderLight` | `#F1F5F9` | Card borders, row separators                    |
| `brand`       | `#6366F1` | Profile icon bg, Share icon bg, row press flash |
| `brandLight`  | `#EEF2FF` | Row press flash bg                              |
| `brandDark`   | `#4338CA` | Premium badge text                              |
| `posGreen`    | `#2D9B6F` | Default Currency icon bg                        |
| `posBg`       | `#D1FAE5` | —                                               |
| `pendAmber`   | `#F59E0B` | Notifications icon bg, Rate App icon bg         |
| `pendBg`      | `#FEF3C7` | Free badge bg                                   |
| `pend`        | `#92400E` | Free badge text                                 |
| `negRed`      | `#E11D48` | Sign Out label, Delete Account                  |
| `negBg`       | `#FFE4E6` | Sign Out icon bg                                |
| `text3Bg`     | `#F1F5F9` | About icon bg                                   |

**Typography scale**

| Role                    | Size | Weight       |
| ----------------------- | ---- | ------------ |
| Screen header title     | 20px | 700 Bold     |
| Profile name            | 16px | 700 Bold     |
| Profile email           | 12px | 400 Regular  |
| Section header          | 10px | 600 Semibold |
| Row label               | 14px | 500 Medium   |
| Row right label         | 14px | 400 Regular  |
| Badge label             | 11px | 600 Semibold |
| Premium banner title    | 14px | 700 Bold     |
| Premium banner subtitle | 12px | 400 Regular  |

---

## 3. Visual Design Overview

The Settings Home screen uses a strict card-group pattern. Every logical group of settings lives inside a white card with rounded corners and a subtle border. Groups are separated by a compact uppercase section header label. This creates a clear visual hierarchy without needing heavy dividers or color.

The profile card at the top is the most visually prominent element — it uses a shadow (not a border) to lift it slightly off the background, signalling that it is a primary interactive surface. The premium banner (free users only) sits directly below the profile card and uses the brand indigo gradient to stand out without being aggressive.

Danger actions (Sign Out) are isolated in their own group at the bottom, with a red label instead of a chevron, making the destructive nature clear without being alarming.

---

## 4. Component Breakdown & Exact Specs

### 4.1 Root Container

```
SafeAreaView
  backgroundColor: #F8FAFC
  flex: 1

ScrollView
  showsVerticalScrollIndicator: false
  contentContainerStyle:
    paddingBottom: 48
```

---

### 4.2 ScreenHeader (Light Variant)

```
View (header)
  backgroundColor: #FFFFFF
  paddingHorizontal: 16
  paddingVertical: 14
  borderBottomWidth: StyleSheet.hairlineWidth
  borderBottomColor: #E2E8F0
  shadowColor: #000000
  shadowOffset: { width: 0, height: 1 }
  shadowOpacity: 0.04
  shadowRadius: 2
  elevation: 1

  Text "Settings"
    fontSize: 20
    fontWeight: 700
    color: #0F172A
```

No back button. No right action icon.

---

### 4.3 ProfileCard

```
Pressable (card)
  marginHorizontal: 16
  marginTop: 16
  marginBottom: 12
  backgroundColor: #FFFFFF
  borderRadius: 12
  padding: 16
  flexDirection: row
  alignItems: center
  shadowColor: #000000
  shadowOffset: { width: 0, height: 1 }
  shadowOpacity: 0.06
  shadowRadius: 4
  elevation: 2
  activeOpacity: 0.85
```

**Avatar (lg — 56px)**

```
View
  width: 56
  height: 56
  borderRadius: 28
  backgroundColor: <deterministic color from name hash>
  alignItems: center
  justifyContent: center

  Text (initials — up to 2 chars)
    fontSize: 20
    fontWeight: 700
    color: #FFFFFF
```

**Text block**

```
View
  flex: 1
  marginHorizontal: 12

  Text (name)
    fontSize: 16
    fontWeight: 700
    color: #0F172A

  Text (email)
    fontSize: 12
    fontWeight: 400
    color: #94A3B8
    marginTop: 2
```

**Badge**

```
← Premium user:
View
  backgroundColor: #EEF2FF
  borderRadius: 999
  paddingVertical: 3
  paddingHorizontal: 8

  Text "Premium"
    fontSize: 11
    fontWeight: 600
    color: #4338CA

← Free user:
View
  backgroundColor: #FEF3C7
  borderRadius: 999
  paddingVertical: 3
  paddingHorizontal: 8

  Text "Free"
    fontSize: 11
    fontWeight: 600
    color: #92400E
```

---

### 4.4 PremiumBanner (Conditional — Free Users Only)

```
Pressable (banner)
  marginHorizontal: 16
  marginBottom: 16
  backgroundColor: #6366F1
  borderRadius: 12
  padding: 16
  flexDirection: row
  alignItems: center
  shadowColor: #6366F1
  shadowOffset: { width: 0, height: 4 }
  shadowOpacity: 0.3
  shadowRadius: 8
  elevation: 4
```

**Crown icon container (frosted circle)**

```
View
  width: 40
  height: 40
  borderRadius: 20
  backgroundColor: rgba(255, 255, 255, 0.2)
  alignItems: center
  justifyContent: center
  marginRight: 12

  Icon: "crown"
    size: 20
    color: #FFFFFF
```

**Text block**

```
View
  flex: 1

  Text "Upgrade to Premium"
    fontSize: 14
    fontWeight: 700
    color: #FFFFFF

  Text "Unlimited groups & advanced features"
    fontSize: 12
    fontWeight: 400
    color: rgba(255, 255, 255, 0.8)
    marginTop: 2
```

**CTA pill**

```
View
  backgroundColor: #FFFFFF
  borderRadius: 999
  paddingVertical: 6
  paddingHorizontal: 14

  Text "Upgrade"
    fontSize: 12
    fontWeight: 600
    color: #6366F1
```

---

### 4.5 SettingsGroup Pattern

Each group follows this exact structure:

```
View (group wrapper)
  marginHorizontal: 16
  marginBottom: 16

  ← Section header:
  Text "ACCOUNT"
    fontSize: 10
    fontWeight: 600
    color: #94A3B8
    letterSpacing: 2
    textTransform: uppercase
    marginBottom: 8

  ← Card:
  View
    backgroundColor: #FFFFFF
    borderRadius: 12
    borderWidth: 1
    borderColor: #F1F5F9
    overflow: hidden
```

---

### 4.6 ListRow

Each row inside a settings card.

```
Pressable (row)
  flexDirection: row
  alignItems: center
  paddingHorizontal: 16
  paddingVertical: 14
  backgroundColor: #FFFFFF

  ← Press state:
  backgroundColor: #EEF2FF   ← brandLight flash
```

**Icon container (32×32px)**

```
View
  width: 32
  height: 32
  borderRadius: 8           ← radius xs
  backgroundColor: <group-specific color>
  alignItems: center
  justifyContent: center
  marginRight: 12

  Icon
    size: 16
    color: #FFFFFF
```

**Label**

```
Text
  flex: 1
  fontSize: 14
  fontWeight: 500
  color: #0F172A
```

**Right element**

```
← Standard rows (chevron):
Icon "chevron-right"
  size: 16
  color: #94A3B8

← Sign Out row (red label, no chevron):
Text "Sign Out"
  fontSize: 14
  fontWeight: 500
  color: #E11D48
```

**Hairline separator**

```
View (absolute)
  position: absolute
  bottom: 0
  left: 16
  right: 0
  height: StyleSheet.hairlineWidth
  backgroundColor: #F1F5F9
```

Omit on last row of each card.

---

### 4.7 ACCOUNT Group

| Row              | Icon          | Icon Bg   | Label            | Right         |
| ---------------- | ------------- | --------- | ---------------- | ------------- |
| Profile          | `user`        | `#6366F1` | Profile          | chevron-right |
| Default Currency | `dollar-sign` | `#2D9B6F` | Default Currency | chevron-right |
| Notifications    | `bell`        | `#F59E0B` | Notifications    | chevron-right |

---

### 4.8 APP Group

| Row       | Icon      | Icon Bg                          | Label     | Right         |
| --------- | --------- | -------------------------------- | --------- | ------------- |
| About     | `info`    | `#F1F5F9` (icon color `#94A3B8`) | About     | chevron-right |
| Rate App  | `star`    | `#F59E0B`                        | Rate App  | chevron-right |
| Share App | `share-2` | `#6366F1`                        | Share App | chevron-right |

Note: The About row uses `#F1F5F9` as the icon container bg with `#94A3B8` icon color (not white) to visually de-emphasise it.

---

### 4.9 DANGER Group

```
Section header: "DANGER ZONE"
  color: #E11D48   ← red instead of text3 for this group only
```

| Row      | Icon      | Icon Bg                          | Label | Right                        |
| -------- | --------- | -------------------------------- | ----- | ---------------------------- |
| Sign Out | `log-out` | `#FFE4E6` (icon color `#E11D48`) | —     | Text "Sign Out" in `#E11D48` |

**Sign Out press behavior:**

```
Alert.alert(
  "Sign Out",
  "Are you sure you want to sign out?",
  [
    { text: "Cancel", style: "cancel" },
    { text: "Sign Out", style: "destructive", onPress: () => navigate("SignIn") }
  ]
)
```

---

## 5. Interaction States

| Element            | State    | Visual Change                       |
| ------------------ | -------- | ----------------------------------- |
| ProfileCard        | Press    | `activeOpacity: 0.85` (native fade) |
| PremiumBanner      | Press    | `activeOpacity: 0.9`                |
| ListRow (standard) | Press    | `backgroundColor` → `#EEF2FF`       |
| ListRow (danger)   | Press    | `backgroundColor` → `#FFE4E6`       |
| Sign Out           | Press    | Alert dialog appears                |
| All rows           | Disabled | `opacity: 0.5`, no press feedback   |

---

## 6. Layout Measurements Summary

| Element               | Margin H | Margin T | Margin B | Border Radius |
| --------------------- | -------- | -------- | -------- | ------------- |
| ProfileCard           | 16       | 16       | 12       | 12            |
| PremiumBanner         | 16       | —        | 16       | 12            |
| SettingsGroup wrapper | 16       | —        | 16       | —             |
| Settings card         | —        | —        | —        | 12            |
| ListRow               | —        | —        | —        | —             |
| Icon container        | —        | —        | —        | 8             |
| Badge                 | —        | —        | —        | 999 (pill)    |
| CTA pill              | —        | —        | —        | 999 (pill)    |

---

## 7. AI Prompt — Premium Redesign

```
You are a senior mobile UI designer specialising in consumer fintech apps. Redesign the Settings Home screen for a React Native bill-splitting app called SplitEasy. The screen must feel organised, calm, and premium — like a well-designed iOS settings screen but with a distinct indigo brand identity. Reference quality: Linear's settings panel combined with Revolut's profile screen.

DESIGN SYSTEM (use these exact values):
- Screen background: #F8FAFC
- Card / header surface: #FFFFFF
- Text primary: #0F172A
- Text tertiary: #94A3B8
- Card border: #F1F5F9
- Header border: #E2E8F0
- Brand indigo: #6366F1
- Brand light: #EEF2FF
- Brand dark: #4338CA
- Positive green: #2D9B6F
- Amber: #F59E0B
- Amber bg: #FEF3C7
- Negative red: #E11D48
- Negative bg: #FFE4E6

SCREEN STRUCTURE (top to bottom, all inside ScrollView):

1. SCREEN HEADER (light variant, not scrolling):
   - backgroundColor: #FFFFFF, hairline bottom border #E2E8F0
   - Subtle shadow: offset 0,1 opacity 0.04 radius 2
   - Title "Settings": 20px bold #0F172A, paddingHorizontal 16, paddingVertical 14
   - No back button, no right action

2. PROFILE CARD (marginHorizontal 16, marginTop 16, marginBottom 12):
   - White card, borderRadius 12, padding 16, flexDirection row, alignItems center
   - Shadow: offset 0,1 opacity 0.06 radius 4 elevation 2
   - Pressable → Profile screen, activeOpacity 0.85
   - Left: 56px circle avatar, deterministic color, white 20px bold initials
   - Center (flex 1, marginHorizontal 12): name 16px bold #0F172A + email 12px regular #94A3B8 marginTop 2
   - Right: badge pill — Premium (#EEF2FF bg, #4338CA text) or Free (#FEF3C7 bg, #92400E text), 11px semibold, paddingVertical 3 paddingHorizontal 8, borderRadius 999

3. PREMIUM BANNER (free users only, marginHorizontal 16, marginBottom 16):
   - backgroundColor: #6366F1, borderRadius 12, padding 16, flexDirection row, alignItems center
   - Brand-colored shadow: shadowColor #6366F1, offset 0,4 opacity 0.3 radius 8
   - Left: 40px frosted circle (rgba(255,255,255,0.2)), crown icon 20px white
   - Center (flex 1): "Upgrade to Premium" 14px bold white + subtitle 12px regular rgba(255,255,255,0.8) marginTop 2
   - Right: white pill button "Upgrade" 12px semibold #6366F1, paddingVertical 6 paddingHorizontal 14

4. SETTINGS GROUPS (pattern repeated 3 times):
   Each group: marginHorizontal 16, marginBottom 16
   Section header: 10px semibold #94A3B8, letterSpacing 2, uppercase, marginBottom 8
   Card: white, borderRadius 12, 1px #F1F5F9 border, overflow hidden

   ACCOUNT group rows:
   - Profile: icon "user" in 32×32 #6366F1 container (radius 8), label "Profile", chevron-right
   - Default Currency: icon "dollar-sign" in 32×32 #2D9B6F container, label "Default Currency", chevron-right
   - Notifications: icon "bell" in 32×32 #F59E0B container, label "Notifications", chevron-right

   APP group rows:
   - About: icon "info" in 32×32 #F1F5F9 container (icon color #94A3B8), label "About", chevron-right
   - Rate App: icon "star" in 32×32 #F59E0B container, label "Rate App", chevron-right
   - Share App: icon "share-2" in 32×32 #6366F1 container, label "Share App", chevron-right

   DANGER ZONE group:
   - Section header color: #E11D48 (not #94A3B8)
   - Sign Out: icon "log-out" in 32×32 #FFE4E6 container (icon color #E11D48), no chevron, right element is Text "Sign Out" 14px medium #E11D48
   - Press triggers Alert.alert confirm dialog before navigating to SignIn

ROW SPECS (all rows):
- paddingHorizontal: 16, paddingVertical: 14
- Icon container: 32×32px, borderRadius 8, marginRight 12, icon size 16px white
- Label: 14px medium #0F172A, flex 1
- Hairline separator: absolute bottom 0, left 16, right 0, height hairlineWidth, color #F1F5F9
- Press state: backgroundColor → #EEF2FF (standard) or #FFE4E6 (danger)

OUTPUT: Provide a complete React Native screen component. Use ScrollView with paddingBottom 48. Use StyleSheet.create with exact tokens. Use Pressable for all interactive elements. Implement the Alert.alert sign-out confirmation. Do not use any placeholder colors.
```

---

## 8. Screen Mockup — ASCII Reference

```
┌─────────────────────────────────────┐
│ Settings                            │  ← ScreenHeader (white, hairline)
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [AV] Alice Morgan    [Premium]  │ │  ← ProfileCard (shadow)
│ │      alice@email.com            │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [♛]  Upgrade to Premium [Upg.] │ │  ← PremiumBanner (indigo, free only)
│ └─────────────────────────────────┘ │
│ ACCOUNT                             │  ← Section header
│ ┌─────────────────────────────────┐ │
│ │ [👤] Profile                  › │ │
│ ├─────────────────────────────────┤ │
│ │ [$]  Default Currency         › │ │
│ ├─────────────────────────────────┤ │
│ │ [🔔] Notifications            › │ │
│ └─────────────────────────────────┘ │
│ APP                                 │
│ ┌─────────────────────────────────┐ │
│ │ [ℹ]  About                    › │ │
│ ├─────────────────────────────────┤ │
│ │ [★]  Rate App                 › │ │
│ ├─────────────────────────────────┤ │
│ │ [↗]  Share App                › │ │
│ └─────────────────────────────────┘ │
│ DANGER ZONE                         │  ← Red section header
│ ┌─────────────────────────────────┐ │
│ │ [→]  Sign Out                   │ │  ← Red right label, no chevron
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```
