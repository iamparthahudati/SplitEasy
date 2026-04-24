# 13 — Free Limits Screen & Premium Features Screen

## 1. Screen Overview

This document covers two closely related screens that form the upgrade funnel for free-tier users:

1. **FreeLimitsScreen** — Shows the user's current usage against free-tier caps. Surfaces when a user is approaching or has hit a limit. The goal is to make the constraint visible and motivate an upgrade.
2. **PremiumFeaturesScreen** — A marketing-style screen listing what Premium unlocks. Reached from the FreeLimitsScreen banner or from Settings. The goal is to communicate value and drive the user to the Paywall.

**Navigation context:**

```
Settings → "Usage Limits"
    → FreeLimitsScreen
        → PremiumBanner CTA → PremiumFeaturesScreen
            → "Upgrade to Premium" button → PaywallScreen (modal)

Any locked feature gate → PremiumFeaturesScreen → PaywallScreen
```

---

## 2. Design System Tokens

| Token                 | Value                           | Usage                                           |
| --------------------- | ------------------------------- | ----------------------------------------------- |
| `surface` / screen bg | `#F8FAFC`                       | Screen background                               |
| `white`               | `#FFFFFF`                       | Card backgrounds                                |
| `brand`               | `#6366F1`                       | Brand indigo — progress fill (OK), hero bg, CTA |
| `brandLight`          | `#EEF2FF`                       | Brand tinted bg for icon wraps                  |
| `neg`                 | `#EF4444`                       | Red — full usage, negative status               |
| `negBg`               | `#FEF2F2`                       | Red tinted bg                                   |
| `pend`                | `#F59E0B`                       | Amber — almost full usage                       |
| `pendBg`              | `#FFFBEB`                       | Amber tinted bg                                 |
| `pos`                 | `#10B981`                       | Green — OK status                               |
| `posBg`               | `#ECFDF5`                       | Green tinted bg                                 |
| `posBgAlt`            | `#F0FDF4`                       | Alternate green tinted bg                       |
| `text1`               | `#0F172A`                       | Primary text                                    |
| `text3`               | `#94A3B8`                       | Secondary/muted text                            |
| `text4`               | `#CBD5E1`                       | Tertiary text                                   |
| `borderMid`           | `#E2E8F0`                       | Card borders, progress track                    |
| `borderLight`         | `#F1F5F9`                       | Subtle card borders                             |
| `warning`             | InfoCard warning variant colors | Alert-circle icon, amber tones                  |

**Typography:**
| Role | Size | Weight | Color |
|---|---|---|---|
| Section header | 12px | SemiBold (600) | `#94A3B8` |
| Card title | 14px–16px | SemiBold (600) | `#0F172A` |
| Body / label | 14px | Medium (500) | `#0F172A` |
| Usage count | 12px | Regular (400) | `#94A3B8` |
| Description | 12px | Regular (400) | `#94A3B8` |
| Feature card title | 14px | SemiBold (600) | `#0F172A` |
| Feature card desc | 12px | Regular (400) | `#94A3B8` |
| Hero title | 24px | Bold (700) | `#FFFFFF` |
| Hero subtitle | 12px | Regular (400) | `rgba(255,255,255,0.75)` |
| CTA button | 16px | SemiBold (600) | `#FFFFFF` |

---

## 3. FreeLimitsScreen

### 3.1 Visual Design

```
┌─────────────────────────────────────┐
│ SafeAreaView bg:#F8FAFC             │
│                                     │
│  ← [ScreenHeader: "Usage Limits"]   │
│                                     │
│  YOUR PLAN                          │  ← SectionHeader
│  ┌─────────────────────────────┐    │
│  │ InfoCard (warning variant)  │    │  ← mx:16 mb:8
│  │ ⚠ Free Plan                 │    │
│  │ Upgrade to Premium for...   │    │
│  └─────────────────────────────┘    │
│                                     │
│  CURRENT USAGE                      │  ← SectionHeader
│  ┌─────────────────────────────┐    │
│  │ Usage Card (mx:16)          │    │
│  │ ─────────────────────────── │    │
│  │ LimitRow: Groups            │    │
│  │ ─────────────────────────── │    │
│  │ LimitRow: Expenses/group    │    │
│  │ ─────────────────────────── │    │
│  │ LimitRow: Members/group     │    │
│  │ ─────────────────────────── │    │
│  │ LimitRow: Receipt photos    │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ PremiumBanner (full)  mx:16 │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 3.2 ScreenHeader

| Property      | Value               |
| ------------- | ------------------- |
| Title         | `Usage Limits`      |
| Left action   | Back chevron button |
| Right action  | None                |
| Background    | `#FFFFFF`           |
| Border bottom | `1px #F1F5F9`       |

### 3.3 SectionHeader

Reusable component used twice on this screen.

| Property           | Value                         |
| ------------------ | ----------------------------- |
| Text               | `YOUR PLAN` / `CURRENT USAGE` |
| Font size          | `12px`                        |
| Font weight        | `600` (SemiBold)              |
| Color              | `#94A3B8`                     |
| Letter spacing     | `0.8px`                       |
| Padding horizontal | `16px`                        |
| Padding vertical   | `8px` (top) `4px` (bottom)    |
| Margin top         | `16px`                        |

### 3.4 InfoCard — Warning Variant

| Property          | Value                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Margin horizontal | `16px`                                                                                                |
| Margin bottom     | `8px`                                                                                                 |
| Background        | `#FFFBEB` (pendBg / amber tint)                                                                       |
| Border            | `1px solid #F59E0B` (pend)                                                                            |
| Border radius     | `12px`                                                                                                |
| Padding           | `16px`                                                                                                |
| Icon              | `alert-circle`, `20px`, `#F59E0B`                                                                     |
| Title             | `Free Plan` — `14px SemiBold #0F172A`                                                                 |
| Body              | `Upgrade to Premium for unlimited access to all features.` — `12px Regular #94A3B8` lineHeight `18px` |
| Layout            | Icon + text column, icon top-aligned with title                                                       |

### 3.5 Usage Card

| Property           | Value                                                         |
| ------------------ | ------------------------------------------------------------- |
| Margin horizontal  | `16px`                                                        |
| Margin bottom      | `16px`                                                        |
| Background         | `#FFFFFF`                                                     |
| Border radius      | `12px`                                                        |
| Padding horizontal | `16px`                                                        |
| Border             | `1px solid #F1F5F9`                                           |
| Shadow             | Subtle — color `#000` opacity `0.04` radius `4` elevation `1` |

Contains 4 `LimitRow` components separated by `1px #F1F5F9` horizontal dividers. No divider after the last row.

### 3.6 LimitRow

Each row: `paddingVertical: 12`

**Top row (label + count):**
| Property | Value |
|---|---|
| Layout | `flexDirection: row`, `justifyContent: space-between`, `alignItems: center` |
| Margin bottom | `8px` |
| Label | `14px Medium #0F172A` |
| Count | `12px Regular #94A3B8` (e.g. `3 of 3`) |

**Progress bar:**
| Property | Value |
|---|---|
| Height | `6px` |
| Border radius | `3px` |
| Track color | `#E2E8F0` (borderMid) |
| Fill color logic | ratio ≥ 1.0 → `#EF4444` (neg/red); ratio > 0.7 → `#F59E0B` (pend/amber); else → `#6366F1` (brand/indigo) |
| Fill width | `(used / limit) * 100%` clamped to 100% |
| Margin bottom | `6px` |

**Status tag (right-aligned below bar):**
| State | Text | Text color | Background |
|---|---|---|---|
| Full (ratio ≥ 1.0) | `Full` | `#EF4444` | `#FEF2F2` |
| Almost full (ratio > 0.7) | `Almost full` | `#F59E0B` | `#FFFBEB` |
| OK (ratio ≤ 0.7) | `OK` | `#10B981` | `#ECFDF5` |

Tag specs: `borderRadius: 99` (pill), `paddingHorizontal: 8`, `paddingVertical: 2`, `fontSize: 11px`, `fontWeight: 600`.

**Four LimitRows — data:**

| Label              | Used | Limit | Ratio | Status     |
| ------------------ | ---- | ----- | ----- | ---------- |
| Groups             | 3    | 3     | 1.0   | Full (red) |
| Expenses per group | 10   | 10    | 1.0   | Full (red) |
| Members per group  | 5    | 10    | 0.5   | OK (brand) |
| Receipt photos     | 2    | 5     | 0.4   | OK (brand) |

### 3.7 PremiumBanner (Full Variant)

The full-variant banner (not compact) sits below the usage card.

| Property          | Value             |
| ----------------- | ----------------- |
| Margin horizontal | `16px`            |
| Background        | `#6366F1` (brand) |
| Border radius     | `12px`            |
| Padding           | `16px`            |
| Layout            | Column            |

**Banner content:**

- Heading: `Upgrade to Premium` — `16px Bold #FFFFFF` marginBottom `4px`
- Subtext: `Remove all limits and unlock every feature.` — `12px Regular rgba(255,255,255,0.80)` marginBottom `12px`
- Feature pills row (flexDirection row, flexWrap wrap, gap 8):
  - `Unlimited groups` — pill: `rgba(255,255,255,0.15)` bg, `10px SemiBold #FFFFFF`, borderRadius `99`, paddingHorizontal `10` paddingVertical `4`
  - `Unlimited expenses` — same
  - `PDF export` — same
- CTA button: `marginTop: 12`, full width, white background, `#6366F1` text, `14px SemiBold`, borderRadius `8px`, height `40px`
  - Label: `Upgrade Now`
  - Press: background → `rgba(255,255,255,0.90)`

---

## 4. PremiumFeaturesScreen

### 4.1 Visual Design

```
┌─────────────────────────────────────┐
│ SafeAreaView bg:#F8FAFC             │
│                                     │
│  ← [ScreenHeader: "Premium         │
│      Features"]                     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Hero Banner (mx:16)         │    │
│  │ bg:#6366F1 borderRadius:16  │    │
│  │ [crown icon wrap]           │    │
│  │ Go Premium                  │    │
│  │ Everything you need...      │    │
│  └─────────────────────────────┘    │
│                                     │
│  WHAT YOU GET                       │  ← SectionHeader
│                                     │
│  ┌─────────────────────────────┐    │
│  │ FeatureCard: Unlimited      │    │  ← px:16 gap:12
│  │ FeatureCard: PDF Export     │    │
│  │ FeatureCard: Multi-Currency │    │
│  │ FeatureCard: Receipt Scan   │    │
│  │ FeatureCard: Priority Supp. │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Upgrade to Premium Button]        │  ← mx:16
│                                     │
└─────────────────────────────────────┘
```

### 4.2 ScreenHeader

| Property     | Value               |
| ------------ | ------------------- |
| Title        | `Premium Features`  |
| Left action  | Back chevron button |
| Right action | None                |

### 4.3 Hero Banner

| Property      | Value             |
| ------------- | ----------------- |
| Margin        | `16px` all sides  |
| Background    | `#6366F1` (brand) |
| Border radius | `16px`            |
| Padding       | `20px`            |
| Overflow      | `hidden`          |

**Decorative background element (optional):** A large semi-transparent circle (rgba(255,255,255,0.06), 120px diameter) positioned absolute bottom-right to add depth without distraction.

**Icon wrap:**
| Property | Value |
|---|---|
| Size | `48 × 48px` |
| Border radius | `12px` |
| Background | `rgba(255, 255, 255, 0.15)` |
| Margin bottom | `12px` |
| Icon | `crown`, `24px`, `#FFFFFF` |

**Title:**
| Property | Value |
|---|---|
| Text | `Go Premium` |
| Font size | `24px` |
| Font weight | `700` (Bold) |
| Color | `#FFFFFF` |
| Margin bottom | `4px` |

**Subtitle:**
| Property | Value |
|---|---|
| Text | `Everything you need to split bills like a pro.` |
| Font size | `12px` |
| Font weight | `400` |
| Color | `rgba(255, 255, 255, 0.75)` |
| Line height | `18px` |

### 4.4 SectionHeader

| Property | Value                                  |
| -------- | -------------------------------------- |
| Text     | `WHAT YOU GET`                         |
| Specs    | Same as FreeLimitsScreen SectionHeader |

### 4.5 Feature Cards

Container: `paddingHorizontal: 16`, `gap: 12`, `marginBottom: 16`

Each `FeatureCard`:
| Property | Value |
|---|---|
| Flex direction | `row` |
| Background | `#FFFFFF` |
| Border radius | `12px` |
| Border | `1px solid #F1F5F9` |
| Padding | `16px` |
| Align items | `flex-start` |
| Gap | `16px` |
| Shadow | color `#000` opacity `0.04` radius `4` elevation `1` |

**Icon wrap (inside each card):**
| Property | Value |
|---|---|
| Size | `48 × 48px` |
| Border radius | `12px` |
| Alignment | `center` (icon centered) |
| Icon size | `22px` |

**Text block (flex: 1):**
| Property | Value |
|---|---|
| Title | `14px SemiBold #0F172A` marginBottom `4px` |
| Description | `12px Regular #94A3B8` lineHeight `18px` |

**Five FeatureCards — data:**

| #   | Title            | Description                                                       | Icon        | Icon color | Icon bg                |
| --- | ---------------- | ----------------------------------------------------------------- | ----------- | ---------- | ---------------------- |
| 1   | Unlimited Groups | Create as many groups as you need — travel, home, work, and more. | `users`     | `#6366F1`  | `#EEF2FF` (brandLight) |
| 2   | PDF Export       | Export any group's expense history as a clean, shareable PDF.     | `file-text` | `#10B981`  | `#ECFDF5` (posBg)      |
| 3   | Multi-Currency   | Track expenses in any currency with live conversion rates.        | `globe`     | `#F59E0B`  | `#FFFBEB` (pendBg)     |
| 4   | Receipt Scanning | Snap a photo of any receipt and auto-fill the expense details.    | `camera`    | `#EF4444`  | `#FEF2F2` (negBg)      |
| 5   | Priority Support | Get help fast with dedicated priority support from our team.      | `shield`    | `#10B981`  | `#F0FDF4` (posBgAlt)   |

### 4.6 CTA Button

| Property          | Value                                            |
| ----------------- | ------------------------------------------------ |
| Variant           | `primary`                                        |
| Label             | `Upgrade to Premium`                             |
| Margin horizontal | `16px`                                           |
| Margin bottom     | `24px`                                           |
| Height            | `52px`                                           |
| Background        | `#6366F1`                                        |
| Border radius     | `12px`                                           |
| Font size         | `16px`                                           |
| Font weight       | `600`                                            |
| Color             | `#FFFFFF`                                        |
| On press          | Navigate to `PaywallScreen` (modal presentation) |
| Press state       | Background → `#4F46E5`                           |

---

## 5. Interaction States

### FreeLimitsScreen

| State            | Behavior                                         |
| ---------------- | ------------------------------------------------ |
| Full limit row   | Red progress bar fills 100%, "Full" red pill tag |
| Almost full row  | Amber bar, "Almost full" amber pill tag          |
| OK row           | Brand indigo bar, "OK" green pill tag            |
| Banner CTA press | Navigate to PremiumFeaturesScreen                |
| Back button      | Pop to Settings                                  |

### PremiumFeaturesScreen

| State              | Behavior                                        |
| ------------------ | ----------------------------------------------- |
| Feature card press | Subtle scale (0.98) + opacity (0.9) feedback    |
| CTA press          | Button darkens; navigate to PaywallScreen modal |
| Back button        | Pop to previous screen                          |
| Hero banner        | Static (no interaction)                         |

---

## 6. Spacing Map

### FreeLimitsScreen

```
ScreenHeader
  ↓ 16px → SectionHeader "YOUR PLAN"
  ↓ 8px  → InfoCard
  ↓ 8px  → InfoCard marginBottom
  ↓ 16px → SectionHeader "CURRENT USAGE"
  ↓ 4px  → Usage card top
  ↓ 12px → LimitRow paddingVertical
  ↓ 1px  → Divider
  ↓ 12px → LimitRow paddingVertical (×4 rows)
  ↓ 16px → Usage card marginBottom
  ↓ 0px  → PremiumBanner (mx:16)
  ↓ 24px → Screen bottom padding
```

### PremiumFeaturesScreen

```
ScreenHeader
  ↓ 16px → Hero banner margin
  ↓ 16px → SectionHeader "WHAT YOU GET"
  ↓ 4px  → Feature cards container
  ↓ 12px → Gap between cards
  ↓ 16px → Cards marginBottom
  ↓ 0px  → CTA button (mx:16)
  ↓ 24px → Screen bottom padding
```

---

## 7. AI Prompt — FreeLimitsScreen

```
Design a usage limits screen for a React Native bill-splitting app called SplitEasy. The screen uses a light background (#F8FAFC) with a standard navigation header.

HEADER:
Standard ScreenHeader with title "Usage Limits" and a back chevron on the left. White background, 1px #F1F5F9 bottom border.

SECTION: "YOUR PLAN"
SectionHeader label "YOUR PLAN" — 12px semibold #94A3B8, letterSpacing 0.8, paddingHorizontal:16, marginTop:16.
Below it: an InfoCard with warning styling — background #FFFBEB, border 1px #F59E0B, borderRadius:12, padding:16, marginHorizontal:16, marginBottom:8.
Card content: alert-circle icon (20px, #F59E0B) + title "Free Plan" (14px semibold #0F172A) + body "Upgrade to Premium for unlimited access to all features." (12px regular #94A3B8, lineHeight:18).

SECTION: "CURRENT USAGE"
SectionHeader label "CURRENT USAGE" — same specs.
Below it: a white card (marginHorizontal:16, marginBottom:16, borderRadius:12, border 1px #F1F5F9, paddingHorizontal:16, subtle shadow).
Inside: 4 LimitRows separated by 1px #F1F5F9 dividers.

Each LimitRow (paddingVertical:12):
- Top row: label (14px medium #0F172A) + usage count (12px regular #94A3B8) space-between, marginBottom:8.
- Progress bar: height 6px, borderRadius 3px, track #E2E8F0. Fill color: ratio≥1 → #EF4444, ratio>0.7 → #F59E0B, else → #6366F1.
- Status pill (right-aligned, below bar): borderRadius:99, paddingHorizontal:8, paddingVertical:2, 11px semibold.
  - "Full": text #EF4444, bg #FEF2F2.
  - "Almost full": text #F59E0B, bg #FFFBEB.
  - "OK": text #10B981, bg #ECFDF5.

Data rows:
1. Groups — 3 of 3 — Full (red bar, red pill)
2. Expenses per group — 10 of 10 — Full (red bar, red pill)
3. Members per group — 5 of 10 — OK (brand bar, green pill)
4. Receipt photos — 2 of 5 — OK (brand bar, green pill)

PREMIUM BANNER (full variant, marginHorizontal:16):
Brand indigo background (#6366F1), borderRadius:12, padding:16.
- Heading: "Upgrade to Premium" — 16px bold white, marginBottom:4.
- Subtext: "Remove all limits and unlock every feature." — 12px regular rgba(255,255,255,0.80), marginBottom:12.
- Feature pills (flexWrap row, gap:8): "Unlimited groups", "Unlimited expenses", "PDF export" — each pill: rgba(255,255,255,0.15) bg, 10px semibold white, borderRadius:99, paddingHorizontal:10 paddingVertical:4.
- CTA button: marginTop:12, full width, white bg, #6366F1 text, 14px semibold, borderRadius:8, height:40.

DESIGN PRINCIPLES:
- The red progress bars and "Full" pills create urgency without being aggressive.
- The amber "Almost full" state is a softer warning — the user still has room.
- The brand indigo "OK" bars are reassuring — not everything is at the limit.
- The premium banner at the bottom is the natural next step after seeing the limits.
- The warning InfoCard at the top sets context immediately — the user is on the free plan.
- White cards on the light grey background create clear visual grouping.
```

---

## 8. AI Prompt — PremiumFeaturesScreen

```
Design a premium features marketing screen for a React Native bill-splitting app called SplitEasy. The screen uses a light background (#F8FAFC) with a hero banner and feature cards.

HEADER:
Standard ScreenHeader with title "Premium Features" and a back chevron on the left.

HERO BANNER (margin:16, borderRadius:16, padding:20, overflow:hidden):
Background: #6366F1 (brand indigo). Optional: large semi-transparent circle (rgba(255,255,255,0.06), 120px) absolute bottom-right for depth.
- Icon wrap: 48×48px, borderRadius:12, rgba(255,255,255,0.15) background, marginBottom:12. Crown icon 24px white centered.
- Title: "Go Premium" — 24px bold white, marginBottom:4.
- Subtitle: "Everything you need to split bills like a pro." — 12px regular rgba(255,255,255,0.75), lineHeight:18.

SECTION: "WHAT YOU GET"
SectionHeader: 12px semibold #94A3B8, letterSpacing:0.8, paddingHorizontal:16, marginTop:16.

FEATURE CARDS (paddingHorizontal:16, gap:12, marginBottom:16):
5 cards, each: flexDirection row, white bg, borderRadius:12, border 1px #F1F5F9, padding:16, alignItems flex-start, gap:16, subtle shadow.

Left: 48×48px icon wrap, borderRadius:12, colored background, icon 22px centered.
Right (flex:1): title 14px semibold #0F172A marginBottom:4 + description 12px regular #94A3B8 lineHeight:18.

Cards:
1. "Unlimited Groups" — users icon, #6366F1 on #EEF2FF — "Create as many groups as you need — travel, home, work, and more."
2. "PDF Export" — file-text icon, #10B981 on #ECFDF5 — "Export any group's expense history as a clean, shareable PDF."
3. "Multi-Currency" — globe icon, #F59E0B on #FFFBEB — "Track expenses in any currency with live conversion rates."
4. "Receipt Scanning" — camera icon, #EF4444 on #FEF2F2 — "Snap a photo of any receipt and auto-fill the expense details."
5. "Priority Support" — shield icon, #10B981 on #F0FDF4 — "Get help fast with dedicated priority support from our team."

CTA BUTTON (marginHorizontal:16, marginBottom:24):
Primary button, height:52, borderRadius:12, background #6366F1, label "Upgrade to Premium" 16px semibold white. Press: background #4F46E5. Navigates to PaywallScreen modal.

DESIGN PRINCIPLES:
- The hero banner uses the same brand indigo as the CTA — visual consistency reinforces the brand.
- Each feature card uses a distinct icon color to create visual variety without chaos.
- The icon backgrounds are tinted versions of the icon color — harmonious and readable.
- White cards on the light grey screen background create clear separation.
- The feature list is scannable — icon + title + one-line description is the right density.
- The CTA at the bottom is the natural conclusion after reading the feature list.
- The hero crown icon signals "premium" immediately — users know what this screen is about.
```

---

## 9. File Reference

| File                    | Path                                    |
| ----------------------- | --------------------------------------- |
| FreeLimitsScreen        | `src/screens/FreeLimitsScreen.tsx`      |
| PremiumFeaturesScreen   | `src/screens/PremiumFeaturesScreen.tsx` |
| LimitRow component      | `src/components/LimitRow.tsx`           |
| PremiumBanner component | `src/components/PremiumBanner.tsx`      |
| InfoCard component      | `src/components/InfoCard.tsx`           |
| FeatureCard component   | `src/components/FeatureCard.tsx`        |
| SectionHeader component | `src/components/SectionHeader.tsx`      |
| Design tokens           | `src/theme/tokens.ts`                   |
