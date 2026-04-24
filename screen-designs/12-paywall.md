# 12 — Paywall Screen

## 1. Screen Overview

The Paywall screen is the primary monetization surface in SplitEasy. It is presented modally (full-screen modal, not a stack push) when a user hits a free-tier limit or taps an upgrade CTA anywhere in the app. Its job is to convert free users to Premium subscribers by communicating value clearly, anchoring on the annual plan, and reducing friction with a free trial offer.

**Navigation context:**

- Triggered from: FreeLimitsScreen, PremiumFeaturesScreen, any locked feature gate
- Dismissed via: close button (top-right) → returns to previous screen
- On successful purchase: modal dismisses, app state updates to Premium

**User flow:**

```
[Any screen] → hits limit / taps upgrade
    → Paywall modal slides up (full screen)
        → User reads features
        → Selects plan (Annual pre-selected)
        → Taps "Start Free Trial"
            → Purchase flow (native IAP sheet)
                → Success → dismiss modal
                → Cancel → stay on Paywall
    → Or taps close → dismiss
```

---

## 2. Design System Tokens

| Token                    | Value     | Usage                                                  |
| ------------------------ | --------- | ------------------------------------------------------ |
| `onboardingTop`          | `#1A1560` | Screen background (deep navy)                          |
| `brand`                  | `#6366F1` | Selected card border, price text, badge bg, CTA button |
| `brandLight`             | `#EEF2FF` | —                                                      |
| `white`                  | `#FFFFFF` | Text, icons                                            |
| `text1`                  | `#0F172A` | Card plan name                                         |
| `text3`                  | `#94A3B8` | Period label                                           |
| `text4`                  | `#CBD5E1` | Footer, restore text                                   |
| `borderMid`              | `#E2E8F0` | Default card border                                    |
| `pos` / emerald          | `#059669` | Feature check icons                                    |
| `surface`                | `#FFFFFF` | Pricing card background                                |
| `rgba(255,255,255,0.12)` | —         | Logo wrap bg, close button bg                          |
| `rgba(255,255,255,0.70)` | —         | Hero subtitle text                                     |

**Typography:**
| Role | Size | Weight | Line Height |
|---|---|---|---|
| Hero title | 24px | Bold (700) | 32px |
| Hero subtitle | 14px | Regular (400) | 21px |
| Feature label | 14px | Regular (400) | 20px |
| Plan name | 14px | SemiBold (600) | 20px |
| Price | 24px | Bold (700) | 30px |
| Period | 12px | Regular (400) | 16px |
| Savings badge | 10px | SemiBold (600) | 14px |
| Restore text | 12px | Medium (500) | 16px |
| Footer text | 10px | Regular (400) | 14px |

---

## 3. Visual Design

### 3.1 Overall Layout

```
┌─────────────────────────────────────┐
│ SafeAreaView bg:#1A1560             │
│                                     │
│                          [×]        │  ← absolute, top:16 right:16
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ScrollView px:20 pb:40      │    │
│  │                             │    │
│  │   [Hero Section]            │    │
│  │   [Feature Rows ×6]         │    │
│  │   [Pricing Cards Row]       │    │
│  │   [CTA Button]              │    │
│  │   [Restore Purchases]       │    │
│  │   [Footer]                  │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 3.2 Background

- `SafeAreaView` fills the entire screen
- Background color: `#1A1560` (deep navy — same as onboarding gradient top)
- No gradient on this screen — flat deep navy throughout
- Status bar style: `light-content`

---

## 4. Component Breakdown

### 4.1 Close Button

| Property      | Value                                 |
| ------------- | ------------------------------------- |
| Position      | `absolute`                            |
| Top           | `16px`                                |
| Right         | `16px`                                |
| Z-index       | `10`                                  |
| Size          | `36 × 36px`                           |
| Border radius | `18px` (full circle)                  |
| Background    | `rgba(255, 255, 255, 0.12)`           |
| Icon          | `x` (close/X), `20px`, `#FFFFFF`      |
| Hit slop      | `8px` all sides                       |
| Press state   | Background → `rgba(255,255,255,0.20)` |

The close button sits above the ScrollView in the Z-stack. It does not scroll away.

---

### 4.2 Hero Section

Container: `alignItems: center`, `paddingTop: 48`, `paddingBottom: 24`

**Logo Wrap (Crown Container):**
| Property | Value |
|---|---|
| Size | `64 × 64px` |
| Border radius | `16px` |
| Background | `rgba(255, 255, 255, 0.12)` |
| Margin bottom | `16px` |
| Alignment | `center` (icon centered inside) |
| Icon | `crown` (Feather/Ionicons), `32px`, `#FFFFFF` |

**Title:**
| Property | Value |
|---|---|
| Text | `SplitEasy Premium` |
| Font size | `24px` |
| Font weight | `700` (Bold) |
| Color | `#FFFFFF` |
| Text align | `center` |
| Margin bottom | `8px` |

**Subtitle:**
| Property | Value |
|---|---|
| Text | `Unlock the full experience with unlimited groups, exports, and more.` |
| Font size | `14px` |
| Font weight | `400` (Regular) |
| Color | `rgba(255, 255, 255, 0.70)` |
| Text align | `center` |
| Line height | `21px` |
| Max width | `280px` (centered) |

---

### 4.3 Feature Rows

Container: `marginBottom: 24`

Six `FeatureRow` components stacked vertically. Each row:

| Property         | Value    |
| ---------------- | -------- |
| Flex direction   | `row`    |
| Align items      | `center` |
| Gap              | `12px`   |
| Padding vertical | `8px`    |

**Icon:**
| Property | Value |
|---|---|
| Icon name | `check-circle` |
| Size | `18px` |
| Color | `#059669` (emerald / pos) |

**Label:**
| Property | Value |
|---|---|
| Font size | `14px` |
| Font weight | `400` |
| Color | `#FFFFFF` |
| Flex | `1` |

**Feature list (in order):**

| #   | Label                  |
| --- | ---------------------- |
| 1   | Unlimited groups       |
| 2   | PDF export             |
| 3   | Multi-currency support |
| 4   | Receipt scanning       |
| 5   | Priority support       |
| 6   | No ads ever            |

---

### 4.4 Pricing Cards Row

Container:
| Property | Value |
|---|---|
| Flex direction | `row` |
| Gap | `12px` |
| Margin bottom | `24px` |

Two `PricingCard` components side by side, each `flex: 1`.

**PricingCard — Base:**
| Property | Value |
|---|---|
| Flex | `1` |
| Background | `#FFFFFF` |
| Border radius | `12px` |
| Padding | `16px` |
| Border width | `1.5px` |
| Border color (default) | `#E2E8F0` |
| Overflow | `visible` |

**PricingCard — Selected state:**
| Property | Value |
|---|---|
| Border color | `#6366F1` (brand) |
| Shadow color | `#6366F1` |
| Shadow opacity | `0.18` |
| Shadow radius | `8px` |
| Elevation (Android) | `4` |

**Savings Badge (Annual card only):**
| Property | Value |
|---|---|
| Position | `absolute` |
| Top | `8px` |
| Right | `8px` |
| Background | `#6366F1` (brand) |
| Border radius | `99px` (pill) |
| Padding horizontal | `8px` |
| Padding vertical | `3px` |
| Font size | `10px` |
| Font weight | `600` |
| Color | `#FFFFFF` |
| Text | `Save 33%` |

**Card content layout (top to bottom):**

```
[Savings Badge — absolute top-right]
[Plan Name]       ← marginTop: 4, marginBottom: 4
[Price]           ← marginBottom: 2
[Period]
```

| Element          | Monthly         | Annual          |
| ---------------- | --------------- | --------------- |
| Plan name        | `Monthly`       | `Annual`        |
| Plan name size   | `14px SemiBold` | `14px SemiBold` |
| Plan name color  | `#0F172A`       | `#0F172A`       |
| Price            | `$4.99`         | `$39.99`        |
| Price size       | `24px Bold`     | `24px Bold`     |
| Price color      | `#6366F1`       | `#6366F1`       |
| Period           | `/month`        | `/year`         |
| Period size      | `12px Regular`  | `12px Regular`  |
| Period color     | `#94A3B8`       | `#94A3B8`       |
| Badge            | None            | `Save 33%`      |
| Default selected | No              | **Yes**         |

**Interaction:** Tapping a card deselects the other and applies the selected border/shadow. The CTA button label and trial terms update to reflect the selected plan.

---

### 4.5 CTA Button

Uses the app's primary `Button` component:

| Property      | Value                                   |
| ------------- | --------------------------------------- |
| Variant       | `primary`                               |
| Label         | `Start Free Trial`                      |
| Margin bottom | `16px`                                  |
| Width         | `100%` (full width of ScrollView)       |
| Height        | `52px`                                  |
| Background    | `#6366F1`                               |
| Border radius | `12px`                                  |
| Font size     | `16px`                                  |
| Font weight   | `600`                                   |
| Color         | `#FFFFFF`                               |
| Press state   | Background → `#4F46E5` (darken 10%)     |
| Loading state | Spinner replaces label, button disabled |

---

### 4.6 Restore Purchases

| Property         | Value               |
| ---------------- | ------------------- |
| Component        | `Pressable`         |
| Padding vertical | `8px`               |
| Margin bottom    | `12px`              |
| Text             | `Restore purchases` |
| Font size        | `12px`              |
| Font weight      | `500` (Medium)      |
| Color            | `#CBD5E1` (text4)   |
| Text align       | `center`            |
| Press state      | Opacity → `0.6`     |

---

### 4.7 Footer

| Property       | Value             |
| -------------- | ----------------- |
| Text           | `Terms · Privacy` |
| Font size      | `10px`            |
| Font weight    | `400`             |
| Color          | `#CBD5E1` (text4) |
| Text align     | `center`          |
| Padding bottom | `8px`             |

"Terms" and "Privacy" are individually tappable inline links (same color, underline on press).

---

## 5. Interaction States

| State               | Behavior                                                                |
| ------------------- | ----------------------------------------------------------------------- |
| Plan card tap       | Deselects other card; selected card gets brand border + shadow          |
| CTA press           | Button darkens to `#4F46E5`; triggers IAP purchase flow                 |
| CTA loading         | Spinner shown, button disabled, opacity 0.7                             |
| Close button press  | Background lightens; modal dismisses                                    |
| Restore press       | Opacity 0.6; triggers IAP restore flow; shows toast on result           |
| Terms / Privacy tap | Opens in-app WebView or Safari                                          |
| Scroll              | ScrollView scrolls; close button stays fixed (absolute, outside scroll) |

---

## 6. Spacing Map

```
SafeAreaView top edge
  ↓ 16px → Close button top
  ↓ 48px → Hero section paddingTop
  ↓ 16px → Crown icon bottom margin
  ↓ 8px  → Title bottom margin
  ↓ 24px → Hero section paddingBottom
  ↓ 8px  → Each feature row paddingVertical
  ↓ 24px → Feature rows marginBottom
  ↓ 24px → Pricing cards marginBottom
  ↓ 16px → CTA marginBottom
  ↓ 12px → Restore marginBottom
  ↓ 8px  → Footer paddingBottom
  ↓ 40px → ScrollView paddingBottom
```

---

## 7. AI Prompt — Redesign at Premium Quality

```
Design a full-screen premium paywall modal for a React Native bill-splitting app called SplitEasy. The screen uses a deep navy background (#1A1560) throughout — no gradient, flat color. Status bar is light-content (white icons).

LAYOUT:
The screen is a modal presented full-screen. A fixed close button (36×36px circle, rgba(255,255,255,0.12) background, white X icon 20px) sits absolute top:16 right:16 above everything. Below it, a ScrollView with paddingHorizontal:20 and paddingBottom:40 contains all content.

HERO SECTION (centered, paddingTop:48, paddingBottom:24):
- A 64×64px rounded square (borderRadius:16, rgba(255,255,255,0.12) background) contains a crown icon (32px, white). marginBottom:16.
- Title: "SplitEasy Premium" — 24px bold white, centered, marginBottom:8.
- Subtitle: "Unlock the full experience with unlimited groups, exports, and more." — 14px regular rgba(255,255,255,0.70), centered, lineHeight:21, maxWidth:280px.

FEATURE LIST (marginBottom:24):
Six rows, each: flexDirection row, alignItems center, gap:12, paddingVertical:8.
- Left: check-circle icon, 18px, color #059669 (emerald green).
- Right: label text 14px regular white, flex:1.
Features: "Unlimited groups", "PDF export", "Multi-currency support", "Receipt scanning", "Priority support", "No ads ever".

PRICING CARDS (flexDirection row, gap:12, marginBottom:24):
Two cards side by side, each flex:1, white background, borderRadius:12, padding:16, borderWidth:1.5.
- Default (unselected): borderColor #E2E8F0.
- Selected: borderColor #6366F1, shadow color #6366F1 opacity 0.18 radius 8, elevation 4.
- Annual card is selected by default.

Monthly card: plan name "Monthly" (14px semibold #0F172A, marginTop:4 marginBottom:4), price "$4.99" (24px bold #6366F1, marginBottom:2), period "/month" (12px regular #94A3B8). No badge.

Annual card: plan name "Annual" (same specs), price "$39.99" (same specs), period "/year" (same specs). Savings badge: absolute top:8 right:8, #6366F1 background, pill shape (borderRadius:99, paddingHorizontal:8 paddingVertical:3), text "Save 33%" 10px semibold white.

CTA BUTTON (marginBottom:16):
Full-width primary button. Height 52px, borderRadius:12, background #6366F1, label "Start Free Trial" 16px semibold white. Press state: background #4F46E5.

RESTORE PURCHASES (marginBottom:12):
Centered Pressable, paddingVertical:8. Text "Restore purchases" 12px medium #CBD5E1, centered. Press: opacity 0.6.

FOOTER:
"Terms · Privacy" — 10px regular #CBD5E1, centered, paddingBottom:8. Each word is a tappable link.

DESIGN PRINCIPLES:
- The deep navy background creates a premium, focused atmosphere — no distractions.
- White text on navy provides maximum contrast and legibility.
- The emerald check icons (#059669) create a positive, "you're getting all this" feeling.
- The brand indigo (#6366F1) on white pricing cards pops against the dark background.
- The annual card's selected state (brand border + shadow) draws the eye and anchors the recommended choice.
- Generous vertical spacing (paddingTop:48 on hero) gives the screen room to breathe.
- The close button is subtle (low-opacity white) so it doesn't compete with the CTA.
- Typography hierarchy: 24px bold title → 14px regular subtitle → 14px features → 24px bold price.
- The savings badge uses the same brand color as the selected border — visual consistency reinforces the recommendation.
```

---

## 8. File Reference

| File             | Path                             |
| ---------------- | -------------------------------- |
| Screen component | `src/screens/PaywallScreen.tsx`  |
| Pricing card     | `src/components/PricingCard.tsx` |
| Feature row      | `src/components/FeatureRow.tsx`  |
| Primary button   | `src/components/Button.tsx`      |
| Design tokens    | `src/theme/tokens.ts`            |
