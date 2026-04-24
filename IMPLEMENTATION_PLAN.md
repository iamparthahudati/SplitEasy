# SplitEasy — Full Implementation Plan

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Done

---

## File Structure Convention

Every screen follows this pattern:

```
src/screens/<tab>/<ScreenName>/
  index.tsx          ← screen component (layout + logic)
  styles.ts          ← all StyleSheet.create() for the screen
  components/        ← screen-private sub-components
    ComponentA.tsx
    ComponentB.tsx
```

Every molecule/atom that has meaningful styles follows:

```
src/components/<atoms|molecules>/<ComponentName>/
  index.tsx          ← component
  styles.ts          ← styles
```

---

## PART 0 — Project Infrastructure

| #   | Item                           | Details                                                                                     | Status |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------- | ------ |
| 0a  | `react-native-svg`             | Installed for SVG rendering                                                                 | [x]    |
| 0b  | `react-native-svg-transformer` | Installed + wired into `metro.config.js` so `.svg` files are importable as React components | [x]    |
| 0c  | `babel-plugin-module-resolver` | Installed + configured in `babel.config.js` with all `@` aliases                            | [x]    |
| 0d  | `tsconfig.json` path aliases   | `baseUrl` + `paths` matching all Babel aliases                                              | [x]    |
| 0e  | `src/types/svg.d.ts`           | TypeScript declaration for `*.svg` module imports                                           | [x]    |
| 0f  | `src/utils/helper.ts`          | `a11y()` accessibility helper                                                               | [x]    |

---

## PART 1 — Atoms & Molecules

### Atoms (`src/components/atoms/`)

> All atoms are single-file. Only `Icon` uses the folder pattern (already done).

| #   | File                | Details                                                                                            | Status |
| --- | ------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| 1   | `Icon/index.tsx`    | SVG Icon component. `IconMap`, `IconName`, `IconProps`, `Pressable` wrapper, `a11y()`, memoized    | [x]    |
| 1a  | `Icon/styles.ts`    | `mainContainerStyle` centered flex wrapper                                                         | [x]    |
| 1b  | `Icon.tsx`          | Re-export shim                                                                                     | [x]    |
| 1c  | `src/assets/icons/` | SVG assets folder. Currently: `chevron-down-black.svg`. Drop new SVGs here and wire into `IconMap` | [x]    |
| 2   | `Divider.tsx`       | Hairline divider. Props: `orientation`, `color`, `insetLeft`, `insetRight`, `style`                | [x]    |
| 3   | `Tag.tsx`           | Label pill. Props: `label`, `color`, `bgColor`, `size`, `style`                                    | [x]    |
| 4   | `Chip.tsx`          | Selectable filter chip. Props: `label`, `selected`, `onPress`, `leftIcon`, `style`                 | [x]    |
| 5   | `ProgressBar.tsx`   | Fill bar. Props: `progress`, `color`, `trackColor`, `height`, `style`                              | [x]    |
| 6   | `Toggle.tsx`        | iOS-style switch. Props: `value`, `onValueChange`, `disabled`, `activeColor`, `style`              | [x]    |
| 7   | `RadioButton.tsx`   | Radio circle. Props: `selected`, `onPress`, `label`, `style`                                       | [x]    |
| 8   | `Checkbox.tsx`      | Checkbox. Props: `checked`, `onPress`, `label`, `style`                                            | [x]    |

### Molecules (`src/components/molecules/`)

> All molecules are currently single-file. Refactor to `index.tsx` + `styles.ts` folder pattern as part of this plan.

| #   | Folder / File                | Refactor task                                                                     | Status |
| --- | ---------------------------- | --------------------------------------------------------------------------------- | ------ |
| 9   | `ScreenHeader/index.tsx`     | Moved from `ScreenHeader.tsx`. Imports updated to `../../../theme` and `../../atoms/Icon` | [x]    |
| 9a  | `ScreenHeader/styles.ts`     | All styles extracted. Re-export shim left at `ScreenHeader.tsx`                   | [x]    |
| 10  | `ListRow/index.tsx`          | Moved. Constants + all logic unchanged. Exports `ListRow` + `ListRowProps`        | [x]    |
| 10a | `ListRow/styles.ts`          | Styles + layout constants extracted. Re-export shim at `ListRow.tsx`              | [x]    |
| 11  | `AmountDisplay/index.tsx`    | Moved. 4× `as any` removed. `style` → `StyleProp<ViewStyle>`. Exports `AmountDisplay` + `AmountDisplayProps` | [x]    |
| 11a | `AmountDisplay/styles.ts`    | Styles extracted, all `as any` casts fixed. Re-export shim at `AmountDisplay.tsx` | [x]    |
| 12  | `EmptyState/index.tsx`       | Moved. Exports `EmptyState` + `EmptyStateProps` + `Action`                        | [x]    |
| 12a | `EmptyState/styles.ts`       | Styles extracted. Re-export shim at `EmptyState.tsx`                              | [x]    |
| 13  | `InputField/index.tsx`       | Moved. `style` → `StyleProp<ViewStyle>`. Exports `InputField` + `InputFieldProps` | [x]    |
| 13a | `InputField/styles.ts`       | Styles extracted. Re-export shim at `InputField.tsx`                              | [x]    |
| 14  | `SelectRow/index.tsx`        | Moved. Exports `SelectRow` + `SelectRowProps`                                     | [x]    |
| 14a | `SelectRow/styles.ts`        | Styles extracted. Re-export shim at `SelectRow.tsx`                               | [x]    |
| 15  | `InfoCard/index.tsx`         | Moved. Exports `InfoCard` + `InfoCardProps` + `InfoCardVariant` (named + default) | [x]    |
| 15a | `InfoCard/styles.ts`         | Styles extracted. Re-export shim at `InfoCard.tsx`                                | [x]    |
| 16  | `PremiumBanner/index.tsx`    | Moved. `Orb` helper kept local. Exports `PremiumBanner` + `PremiumBannerProps`    | [x]    |
| 16a | `PremiumBanner/styles.ts`    | Styles + `Platform.select` extracted. Re-export shim at `PremiumBanner.tsx`       | [x]    |
| 17  | `SectionHeader/index.tsx`    | Moved. Exports `SectionHeader` + `SectionHeaderProps` + `SectionAction`           | [x]    |
| 17a | `SectionHeader/styles.ts`    | Styles extracted. Re-export shim at `SectionHeader.tsx`                           | [x]    |
| 18  | `KeyboardDismiss/index.tsx`  | Moved. Exports `KeyboardDismiss` + `useKeyboardVisible` + `KeyboardDismissProps`  | [x]    |
| 19  | `BottomSheetModal/index.tsx` | Moved. Exports `BottomSheetModal` + `BottomSheetModalProps` + `SnapHeight`        | [x]    |
| 19a | `BottomSheetModal/styles.ts` | Styles + SCREEN_HEIGHT, SNAP_HEIGHTS, ANIM_DURATION, OVERLAY_OPACITY extracted    | [x]    |
| 20  | `AvatarGroup/index.tsx`      | Moved. Exports `AvatarGroup` + `AvatarGroupProps` + `AvatarSize`                  | [x]    |
| 20a | `AvatarGroup/styles.ts`      | Styles + AVATAR_DIM, DEFAULT_OVERLAP, OVERFLOW_FONT_SIZE extracted                | [x]    |

> After each molecule is moved, add a re-export shim at the old path (e.g. `molecules/ScreenHeader.tsx` → `export { ... } from './ScreenHeader/index'`) so existing imports don't break.

---

## PART 2 — Tab Screens

### Groups Tab

Already structured correctly (`index.tsx` + `styles.ts` + `components/`). No changes needed.

- [x] `GroupsHomeScreen/` — `index.tsx`, `styles.ts`, `components/` (BalanceBanner, GroupCard, Header, SearchBar)
- [x] `GroupDetail/` — `index.tsx`, `styles.ts`, `components/` (AddExpenseBar, BalanceRow, HeroBanner, NavBar, RecentExpenseRow, SectionHeader)

### Balances Tab (`src/screens/balances/BalancesScreen/`)

| #   | File                              | Details                                                                                                                                          | Status |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 21  | `index.tsx`                       | Done. SafeAreaView + ScrollView, NetSummaryBanner, 3 Chip filters, PersonBalanceRow list, EmptyState when all settled | [x]    |
| 21a | `styles.ts`                       | All styles extracted                                                                                                                             | [x]    |
| 22  | `components/NetSummaryBanner.tsx` | Two-column card with vertical divider. AmountDisplay size=md. Green/red per money color language                                                 | [x]    |
| 23  | `components/PersonBalanceRow.tsx` | Avatar md + name + group count subtitle + AmountDisplay showSign + pill Settle button (hidden when balance=0) + hairline separator               | [x]    |

### Activity Tab (`src/screens/activity/ActivityScreen/`)

| #   | File                                 | Details                                                                                                               | Status |
| --- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------ |
| 24  | `index.tsx`                          | Done. SafeAreaView + SectionList, useMemo date grouping, stickySectionHeaders, EmptyState, 8 mock events across 3 date sections | [x]    |
| 24a | `styles.ts`                          | All styles extracted                                                                                                  | [x]    |
| 25  | `components/ActivityHeader.tsx`      | Title + 3 Chip filters (All / Expenses / Settlements), white bg, hairline bottom border                               | [x]    |
| 26  | `components/ActivityEventRow.tsx`    | Icon circle (brandLight/posBg) + description + group/time meta + AmountDisplay right-aligned + hairline separator     | [x]    |
| 27  | `components/ActivityDateSection.tsx` | Sticky header, uppercase text3 label on colors.bg background so it occludes rows when pinned                          | [x]    |

### Settings Tab (`src/screens/settings/SettingsHomeScreen/`)

| #   | File                           | Details                                                                                                                               | Status |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 28  | `index.tsx`                    | Done. SafeAreaView + ScrollView, ProfileCard, PremiumBanner (if free), 3 SettingsGroups (Account / App / Danger), Sign Out with Alert confirm | [x]    |
| 28a | `styles.ts`                    | All styles extracted                                                                                                                  | [x]    |
| 29  | `components/ProfileCard.tsx`   | Avatar lg + name/email flex + Badge (premium/free). Tappable, subtle shadow. Driven by useIsPremium()                                 | [x]    |
| 30  | `components/SettingsGroup.tsx` | SectionHeader (compact) above white rounded card (overflow hidden, border). Shared by AboutScreen too                                 | [x]    |

---

## PART 3 — Settings Deep Screens

Each screen: `src/screens/settings/<ScreenName>/index.tsx` + `styles.ts`

| #   | Screen folder                     | Details                                                                                                                                                                                                    | Status |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 31  | `ProfileScreen/`                  | Done. KeyboardAvoidingView + ScrollView, Avatar lg + camera badge overlay, InputField name/email, ListRow member since, Save with 1s loading, Danger zone Delete Account | [x]    |
| 31a | `ProfileScreen/styles.ts`         | All styles extracted                                                                                                                                                                                       | [x]    |
| 32  | `DefaultCurrencyScreen/`          | Done. Search InputField, FlatList of 12 currencies, useMemo filter, brand check icon on selected row, useState default USD                                                                                 | [x]    |
| 32a | `DefaultCurrencyScreen/styles.ts` | All styles extracted                                                                                                                                                                                       | [x]    |
| 33  | `NotificationsScreen/`            | Done. 5 Toggle ListRows in white card, typed NotificationState, first 3 on / last 2 off by default                                                                                                        | [x]    |
| 33a | `NotificationsScreen/styles.ts`   | All styles extracted                                                                                                                                                                                       | [x]    |
| 34  | `AboutScreen/`                    | Done. Wordmark + version, 3 SettingsGroups (App Info / Legal / Follow Us), Platform.OS in build row, social rows with link icon                                                                            | [x]    |
| 34a | `AboutScreen/styles.ts`           | All styles extracted                                                                                                                                                                                       | [x]    |

---

## PART 4 — Group Stack Screens

Each screen: `src/screens/groups/<ScreenName>/index.tsx` + `styles.ts` + `components/`

| #   | Screen folder / file                              | Details                                                                                                                                                                                                                                         | Status |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 35  | `AddExpenseScreen/index.tsx`                      | Done. KeyboardAvoidingView + ScrollView, AmountInput hero section, all form fields, equal-split math reactive to amount | [x]    |
| 35a | `AddExpenseScreen/styles.ts`                      | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 36  | `AddExpenseScreen/components/AmountInput.tsx`     | Currency symbol (2xl brand) + 4xl bold TextInput, decimal-pad, transparent bg                                                                                                                                                                  | [x]    |
| 37  | `AddExpenseScreen/components/CategoryPicker.tsx`  | Horizontal ScrollView, 8 emoji+label chips, brand bg when selected                                                                                                                                                                             | [x]    |
| 38  | `AddExpenseScreen/components/SplitMethodTabs.tsx` | Segmented control, brand active / border inactive, height 40                                                                                                                                                                                   | [x]    |
| 39  | `AddExpenseScreen/components/MemberSplitRow.tsx`  | Avatar sm + name + read-only (equal) or TextInput (exact/%) right slot, hairline separator                                                                                                                                                     | [x]    |
| 40  | `EditExpenseScreen/index.tsx`                     | Done. Pre-filled mock data, trash icon header → Alert confirm, Save Changes button. Reuses AddExpenseScreen components                                                                                                                          | [x]    |
| 40a | `EditExpenseScreen/styles.ts`                     | Re-exports AddExpenseScreen styles (zero duplication)                                                                                                                                                                                          | [x]    |
| 41  | `ExpenseDetailScreen/index.tsx`                   | Done. Hero card (AmountDisplay xl + Tag), Paid By, Split Breakdown, Notes, footer, Delete with Alert confirm                                                                                                                                    | [x]    |
| 41a | `ExpenseDetailScreen/styles.ts`                   | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 42  | `SettleUpScreen/index.tsx`                        | Done. Subheader, AmountDisplay xl card, 3 payment Chips, Notes InputField, Date SelectRow, Confirm → Alert → goBack                                                                                                                            | [x]    |
| 42a | `SettleUpScreen/styles.ts`                        | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 43  | `ActivityFeedScreen/index.tsx`                    | Done. SectionList 3 date sections, 5 events, reuses ActivityEventRow + ActivityDateSection, sticky headers, EmptyState                                                                                                                         | [x]    |
| 43a | `ActivityFeedScreen/styles.ts`                    | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 44  | `GroupSettingsScreen/index.tsx`                   | Done. Group image circle + camera badge, InputField name, Members SettingsGroup with Avatar rows + minus remove, Danger Zone with Alert confirms                                                                                                | [x]    |
| 44a | `GroupSettingsScreen/styles.ts`                   | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 45  | `AddMemberScreen/index.tsx`                       | Done. Search InputField, 4 suggestion ListRows with Add/Added pill, horizontal Chip row for added members, Confirm button with count, disabled when empty                                                                                       | [x]    |
| 45a | `AddMemberScreen/styles.ts`                       | All styles extracted                                                                                                                                                                                                                            | [x]    |
| 46  | `ExportPDFScreen/index.tsx`                       | Done. Preview card with brand accent, OPTIONS SettingsGroup (SelectRow + 2 Toggle ListRows), PremiumBanner if free, side-by-side Export+Share buttons with premium gate                                                                         | [x]    |
| 46a | `ExportPDFScreen/styles.ts`                       | All styles extracted                                                                                                                                                                                                                            | [x]    |

---

## PART 5 — Premium Screens

Each screen: `src/screens/premium/<ScreenName>/index.tsx` + `styles.ts` + `components/`

| #   | Screen folder / file                               | Details                                                                                                                                                                                                 | Status |
| --- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 47  | `PaywallScreen/index.tsx`                          | Done. Dark indigo full-screen, close button, 6 FeatureRows, side-by-side PricingCards (annual default), white CTA, restore + terms footer                                                              | [x]    |
| 47a | `PaywallScreen/styles.ts`                          | All styles extracted                                                                                                                                                                                    | [x]    |
| 48  | `PaywallScreen/components/PricingCard.tsx`         | Pressable card, brand border when selected, savings badge pill top-right, brand shadow when selected                                                                                                    | [x]    |
| 49  | `PaywallScreen/components/FeatureRow.tsx`          | check-circle icon (pos color) + label text row                                                                                                                                                          | [x]    |
| 50  | `FreeLimitsScreen/index.tsx`                       | Done. Warning InfoCard, 4 LimitRows in white card, full PremiumBanner at bottom                                                                                                                        | [x]    |
| 50a | `FreeLimitsScreen/styles.ts`                       | All styles extracted                                                                                                                                                                                    | [x]    |
| 51  | `FreeLimitsScreen/components/LimitRow.tsx`         | Label + usage text + ProgressBar (color adapts brand/pend/neg by ratio) + Tag (OK/Almost full/Full)                                                                                                    | [x]    |
| 52  | `PremiumFeaturesScreen/index.tsx`                  | Done. Brand hero banner with crown icon, 5 FeatureCards, CTA → Paywall                                                                                                                                 | [x]    |
| 52a | `PremiumFeaturesScreen/styles.ts`                  | All styles extracted                                                                                                                                                                                    | [x]    |
| 53  | `PremiumFeaturesScreen/components/FeatureCard.tsx` | Row card: 48×48 colored icon square + title/description text block, white bg, border                                                                                                                   | [x]    |

---

## PART 6 — Onboarding Screens

Already partially structured. Refactor remaining flat files to folder pattern.

| #   | Screen folder / file                 | Details                                                                                                                              | Status |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 54  | `welcome/` _(already done)_          | `index.tsx` + `styles.ts` + `components/` (BalanceIllustration, BillSplitIllustration, DotIndicator, FriendsIllustration, SlideItem) | [x]    |
| 55  | `signin/` _(already done)_           | `index.tsx` + `styles.ts` + `components/` (AuthButton, EmailSignInView, ForgotPasswordView, LogoMark, OrDivider, SocialButton)       | [x]    |
| 56  | `createGroup/` _(already done)_      | `index.tsx` + `components/` (CameraIcon, GroupImagePicker)                                                                           | [x]    |
| 57  | `SplashScreen/index.tsx`             | Moved. All animation logic preserved, imports updated to ../../../theme                                                              | [x]    |
| 57a | `SplashScreen/styles.ts`             | All styles extracted. Re-export shim at SplashScreen.tsx                                                                            | [x]    |
| 58  | `NotificationPromptScreen/index.tsx` | Moved. Imports updated to ../../../theme. Re-export shim at NotificationPromptScreen.tsx                                             | [x]    |
| 58a | `NotificationPromptScreen/styles.ts` | All styles extracted                                                                                                                 | [x]    |
| 59  | `CreateGroupScreen/index.tsx`        | Already a re-export shim pointing to `./createGroup`. No change needed                                                              | [x]    |

---

## PART 7 — Navigation & Tab Bar Upgrade

| #   | File                | Details                                                                                                                                                                            | Status |
| --- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 60  | `MainTabs.tsx`      | Done. Icon atom replaces unicode chars, platform shadow added, active indicator line at top, brand label when active                | [x]    |
| 61  | `RootNavigator.tsx` | Done. CreateGroupScreen import fixed to `./createGroup`. All shim paths resolve correctly                                           | [x]    |

---

## Implementation Order

```
Part 0  →  Part 1  →  Part 1 refactor  →  Part 2  →  Part 3  →  Part 4  →  Part 5  →  Part 6  →  Part 7
Infra      Atoms       Molecules to        Tab        Settings   Group       Premium    Onboarding  Nav
           & Mols      index+styles        Screens    Deep       Stack       Screens    cleanup     Upgrade
```

Each part is independent and can be built/reviewed separately before moving on.
