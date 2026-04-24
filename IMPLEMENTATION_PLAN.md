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

| #   | Folder / File                | Status |
| --- | ---------------------------- | ------ |
| 9   | `ScreenHeader/index.tsx`     | [x]    |
| 9a  | `ScreenHeader/styles.ts`     | [x]    |
| 10  | `ListRow/index.tsx`          | [x]    |
| 10a | `ListRow/styles.ts`          | [x]    |
| 11  | `AmountDisplay/index.tsx`    | [x]    |
| 11a | `AmountDisplay/styles.ts`    | [x]    |
| 12  | `EmptyState/index.tsx`       | [x]    |
| 12a | `EmptyState/styles.ts`       | [x]    |
| 13  | `InputField/index.tsx`       | [x]    |
| 13a | `InputField/styles.ts`       | [x]    |
| 14  | `SelectRow/index.tsx`        | [x]    |
| 14a | `SelectRow/styles.ts`        | [x]    |
| 15  | `InfoCard/index.tsx`         | [x]    |
| 15a | `InfoCard/styles.ts`         | [x]    |
| 16  | `PremiumBanner/index.tsx`    | [x]    |
| 16a | `PremiumBanner/styles.ts`    | [x]    |
| 17  | `SectionHeader/index.tsx`    | [x]    |
| 17a | `SectionHeader/styles.ts`    | [x]    |
| 18  | `KeyboardDismiss/index.tsx`  | [x]    |
| 19  | `BottomSheetModal/index.tsx` | [x]    |
| 19a | `BottomSheetModal/styles.ts` | [x]    |
| 20  | `AvatarGroup/index.tsx`      | [x]    |
| 20a | `AvatarGroup/styles.ts`      | [x]    |

---

## PART 2–7 — Screens (All Complete)

All screens implemented, refactored to `index.tsx` + `styles.ts` folder pattern, and optimized.
See git history for full details. Summary:

- [x] GroupsHomeScreen, GroupDetailScreen
- [x] BalancesScreen, ActivityScreen
- [x] SettingsHomeScreen, ProfileScreen, DefaultCurrencyScreen, NotificationsScreen, AboutScreen
- [x] AddExpenseScreen, EditExpenseScreen, ExpenseDetailScreen, SettleUpScreen
- [x] ActivityFeedScreen, GroupSettingsScreen, AddMemberScreen, ExportPDFScreen
- [x] PaywallScreen, FreeLimitsScreen, PremiumFeaturesScreen
- [x] SplashScreen, WelcomeScreen, SignInScreen, CreateGroupScreen, NotificationPromptScreen
- [x] MainTabs (Icon atom, platform shadow), RootNavigator (import paths fixed)

---

## PART 8 — Icon SVG Assets

> Drop each `.svg` into `src/assets/icons/` then update the `require()` in `src/components/atoms/Icon/index.tsx`.
> See `ICONS_NEEDED.md` for the full priority list and wiring instructions.

### Priority 1 — Navigation & Core (used on every screen)

| #   | Icon name           | File name               | Status |
| --- | ------------------- | ----------------------- | ------ |
| 62  | `chevron-left`      | `chevron-left.svg`      | [ ]    |
| 63  | `chevron-right`     | `chevron-right.svg`     | [ ]    |
| 64  | `chevron-down-gray` | `chevron-down-gray.svg` | [ ]    |
| 65  | `chevron-up-gray`   | `chevron-up-gray.svg`   | [ ]    |
| 66  | `arrow-back`        | `arrow-back.svg`        | [ ]    |
| 67  | `arrow-forward`     | `arrow-forward.svg`     | [ ]    |
| 68  | `close`             | `close.svg`             | [ ]    |
| 69  | `plus`              | `plus.svg`              | [ ]    |
| 70  | `minus`             | `minus.svg`             | [ ]    |
| 71  | `check`             | `check.svg`             | [ ]    |
| 72  | `check-circle`      | `check-circle.svg`      | [ ]    |
| 73  | `search`            | `search.svg`            | [ ]    |

### Priority 2 — Tab Bar (visible always)

| #   | Icon name   | File name       | Status |
| --- | ----------- | --------------- | ------ |
| 74  | `home`      | `home.svg`      | [ ]    |
| 75  | `bar-chart` | `bar-chart.svg` | [ ]    |
| 76  | `activity`  | `activity.svg`  | [ ]    |
| 77  | `settings`  | `settings.svg`  | [ ]    |

### Priority 3 — Settings & Auth

| #   | Icon name | File name     | Status |
| --- | --------- | ------------- | ------ |
| 78  | `user`    | `user.svg`    | [ ]    |
| 79  | `bell`    | `bell.svg`    | [ ]    |
| 80  | `dollar`  | `dollar.svg`  | [ ]    |
| 81  | `info`    | `info.svg`    | [ ]    |
| 82  | `log-out` | `log-out.svg` | [ ]    |
| 83  | `star`    | `star.svg`    | [ ]    |
| 84  | `share`   | `share.svg`   | [ ]    |
| 85  | `lock`    | `lock.svg`    | [ ]    |
| 86  | `eye`     | `eye.svg`     | [ ]    |
| 87  | `eye-off` | `eye-off.svg` | [ ]    |
| 88  | `link`    | `link.svg`    | [ ]    |
| 89  | `mail`    | `mail.svg`    | [ ]    |
| 90  | `phone`   | `phone.svg`   | [ ]    |

### Priority 4 — Expense & Group Screens

| #   | Icon name  | File name      | Status |
| --- | ---------- | -------------- | ------ |
| 91  | `edit`     | `edit.svg`     | [ ]    |
| 92  | `trash`    | `trash.svg`    | [ ]    |
| 93  | `camera`   | `camera.svg`   | [ ]    |
| 94  | `users`    | `users.svg`    | [ ]    |
| 95  | `calendar` | `calendar.svg` | [ ]    |
| 96  | `receipt`  | `receipt.svg`  | [ ]    |
| 97  | `send`     | `send.svg`     | [ ]    |
| 98  | `tag`      | `tag.svg`      | [ ]    |
| 99  | `filter`   | `filter.svg`   | [ ]    |
| 100 | `copy`     | `copy.svg`     | [ ]    |
| 101 | `download` | `download.svg` | [ ]    |
| 102 | `upload`   | `upload.svg`   | [ ]    |

### Priority 5 — Premium & Paywall

| #   | Icon name        | File name            | Status |
| --- | ---------------- | -------------------- | ------ |
| 103 | `crown`          | `crown.svg`          | [ ]    |
| 104 | `zap`            | `zap.svg`            | [ ]    |
| 105 | `star-filled`    | `star-filled.svg`    | [ ]    |
| 106 | `shield`         | `shield.svg`         | [ ]    |
| 107 | `globe`          | `globe.svg`          | [ ]    |
| 108 | `file-text`      | `file-text.svg`      | [ ]    |
| 109 | `alert-circle`   | `alert-circle.svg`   | [ ]    |
| 110 | `alert-triangle` | `alert-triangle.svg` | [ ]    |
| 111 | `help-circle`    | `help-circle.svg`    | [ ]    |
| 112 | `gift`           | `gift.svg`           | [ ]    |
| 113 | `qr-code`        | `qr-code.svg`        | [ ]    |

---

## PART 9 — Logo SVG Assets

> Replace the current View-based logo implementations with proper SVG files.
> See `screen-designs/15-logo-design.md` for full specs and AI prompts.

| #   | File                         | Details                                                                                                                                                | Status |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 114 | `src/assets/logo-splash.svg` | Variant A — monochrome white on dark. 76px viewBox. Left half solid white, right half white outline arc, 1px center divider                            | [ ]    |
| 115 | `src/assets/logo-signin.svg` | Variant B — asymmetric, amber accent. Left 44px white fill, right 54px amber arc, 2px amber center divider                                             | [ ]    |
| 116 | `src/assets/logo-header.svg` | Variant C — compact blue on white. 28px viewBox. `#3B5BDB` stroke + divider, white left fill                                                           | [ ]    |
| 117 | `src/assets/logo-icon.svg`   | App icon mark only — 1024px viewBox, for marketing and store assets                                                                                    | [ ]    |
| 118 | Replace `SplashScreen` logo  | Swap View-based `LogoMark` in `SplashScreen/index.tsx` with `<SvgLogo />` from `logo-splash.svg`                                                       | [ ]    |
| 119 | Replace `SignIn` logo        | Swap View-based `LogoMark` in `signin/components/LogoMark.tsx` with `<SvgLogo />` from `logo-signin.svg`                                               | [ ]    |
| 120 | Replace `Header` logo        | Swap View-based `SplitCircleLogo` in `GroupsHomeScreen/components/Header.tsx` with `<SvgLogo />` from `logo-header.svg`                                | [ ]    |
| 121 | Replace `NavBar` logo        | Swap View-based `SplitCircleLogo` in `GroupDetail/components/NavBar.tsx` with `<SvgLogo />` from `logo-header.svg` (same asset, smaller rendered size) | [ ]    |

---

## PART 10 — Firebase Integration

> Wire real backend. Firebase SDK must be installed first.
> All service stubs are in `src/services/firebase/` — correct shape, zero implementation.

### Setup

| #   | Task                             | Details                                                                                                                           | Status |
| --- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 122 | Install Firebase SDK             | `yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage` | [ ]    |
| 123 | iOS — `GoogleService-Info.plist` | Download from Firebase Console, add to `ios/SplitEasy/`                                                                           | [ ]    |
| 124 | Android — `google-services.json` | Download from Firebase Console, add to `android/app/`                                                                             | [ ]    |
| 125 | iOS pod install                  | `cd ios && pod install`                                                                                                           | [ ]    |
| 126 | Android build config             | Add `google-services` plugin to `android/build.gradle` and `android/app/build.gradle`                                             | [ ]    |

### Auth (`src/services/firebase/auth.ts`)

| #   | Function             | Details                                                                         | Status |
| --- | -------------------- | ------------------------------------------------------------------------------- | ------ |
| 127 | `signInWithEmail`    | `signInWithEmailAndPassword` — wire real Firebase call, return `AuthUser`       | [ ]    |
| 128 | `signInWithGoogle`   | `@react-native-google-signin/google-signin` + Firebase credential               | [ ]    |
| 129 | `signInWithApple`    | `@invertase/react-native-apple-authentication` + Firebase credential (iOS only) | [ ]    |
| 130 | `sendPasswordReset`  | `sendPasswordResetEmail`                                                        | [ ]    |
| 131 | `signOut`            | `auth().signOut()`                                                              | [ ]    |
| 132 | `onAuthStateChanged` | Subscribe to auth state, update `StoreProvider` via `SET_USER` dispatch         | [ ]    |

### Firestore (`src/services/firebase/firestore.ts`)

| #   | Function         | Details                                                            | Status |
| --- | ---------------- | ------------------------------------------------------------------ | ------ |
| 133 | `createUser`     | Write `UserProfile` to `users/{uid}` on first sign-in              | [ ]    |
| 134 | `getUser`        | Fetch `UserProfile` from `users/{uid}`                             | [ ]    |
| 135 | `updateUser`     | Patch `users/{uid}` — display name, currency, settings             | [ ]    |
| 136 | `createGroup`    | Write `Group` to `groups/{id}`, add `id` to `users/{uid}.groupIds` | [ ]    |
| 137 | `getGroups`      | Fetch all groups where `id` in `user.groupIds`                     | [ ]    |
| 138 | `updateGroup`    | Patch `groups/{id}` — name, emoji, color, members                  | [ ]    |
| 139 | `deleteGroup`    | Delete `groups/{id}` + all sub-collections                         | [ ]    |
| 140 | `addExpense`     | Write `Expense` to `groups/{id}/expenses/{expenseId}`              | [ ]    |
| 141 | `getExpenses`    | Fetch all expenses for a group, ordered by date desc               | [ ]    |
| 142 | `updateExpense`  | Patch expense document                                             | [ ]    |
| 143 | `deleteExpense`  | Delete expense document                                            | [ ]    |
| 144 | `addSettlement`  | Write `Settlement` to `groups/{id}/settlements/{id}`               | [ ]    |
| 145 | `getSettlements` | Fetch all settlements for a group                                  | [ ]    |

### Storage (`src/services/firebase/storage.ts`)

| #   | Function             | Details                                                                   | Status |
| --- | -------------------- | ------------------------------------------------------------------------- | ------ |
| 146 | `uploadReceiptPhoto` | Upload image to `receipts/{groupId}/{expenseId}.jpg`, return download URL | [ ]    |
| 147 | `deleteReceiptPhoto` | Delete file at given storage path                                         | [ ]    |

---

## PART 11 — State Management & Real Data

> Replace mock data with real Firestore data. Wire `useAppStore` dispatch to Firebase calls.

| #   | Task                              | Details                                                                                              | Status |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| 148 | Wire `onAuthStateChanged`         | In `App.tsx` or `NavigationProvider` — subscribe on mount, dispatch `SET_USER`, navigate accordingly | [ ]    |
| 149 | Replace `MOCK_GROUPS`             | `GroupsHomeScreen` — fetch real groups via `getGroups()` on mount, dispatch `SET_GROUPS`             | [ ]    |
| 150 | Replace `MOCK_BALANCES`           | `BalancesScreen` — compute net balances from real expenses + settlements per group                   | [ ]    |
| 151 | Replace `MOCK_EXPENSES`           | `GroupDetailScreen` — fetch real expenses via `getExpenses(groupId)`, dispatch `SET_EXPENSES`        | [ ]    |
| 152 | Replace `MOCK_ACTIVITY`           | `ActivityScreen` — aggregate expenses + settlements across all groups, sort by date                  | [ ]    |
| 153 | Wire `AddExpenseScreen` save      | Call `addExpense()` on save, dispatch `ADD_EXPENSE`, navigate back                                   | [ ]    |
| 154 | Wire `EditExpenseScreen` save     | Call `updateExpense()` on save, dispatch `UPDATE_EXPENSE`, navigate back                             | [ ]    |
| 155 | Wire `EditExpenseScreen` delete   | Call `deleteExpense()` on confirm, dispatch `REMOVE_EXPENSE`, navigate back                          | [ ]    |
| 156 | Wire `SettleUpScreen` confirm     | Call `addSettlement()` on confirm, dispatch `ADD_SETTLEMENT`, navigate back                          | [ ]    |
| 157 | Wire `CreateGroupScreen` create   | Call `createGroup()` + `uploadGroupImage()` on save, dispatch `ADD_GROUP`, navigate                  | [ ]    |
| 158 | Wire `GroupSettingsScreen` save   | Call `updateGroup()` on name/image change                                                            | [ ]    |
| 159 | Wire `GroupSettingsScreen` delete | Call `deleteGroup()` on confirm, dispatch `REMOVE_GROUP`, navigate to Groups                         | [ ]    |
| 160 | Wire `ProfileScreen` save         | Call `updateUser()` on save, dispatch `SET_USER`                                                     | [ ]    |
| 161 | Persist `DefaultCurrency` setting | Call `updateUser({ currency })` on selection, dispatch `SET_USER`                                    | [ ]    |
| 162 | Persist `Notifications` settings  | Store toggle state in `users/{uid}.notificationPrefs` via `updateUser()`                             | [ ]    |
| 163 | Persist onboarding state          | Replace `checkHasOnboarded()` stub in `SplashScreen` with AsyncStorage read                          | [ ]    |

---

## PART 12 — Auth Flow Wiring

> Connect the sign-in screen handlers to real Firebase auth.

| #   | Task                           | Details                                                                                               | Status |
| --- | ------------------------------ | ----------------------------------------------------------------------------------------------------- | ------ |
| 164 | Install Google Sign-In         | `yarn add @react-native-google-signin/google-signin` + iOS/Android config                             | [ ]    |
| 165 | Install Apple Auth (iOS)       | `yarn add @invertase/react-native-apple-authentication` + Xcode capability                            | [ ]    |
| 166 | Wire `handleEmailSignIn`       | `signin/index.tsx` — call `signInWithEmail()`, handle errors, navigate on success                     | [ ]    |
| 167 | Wire `handleGoogle`            | Call `signInWithGoogle()`, handle errors, navigate on success                                         | [ ]    |
| 168 | Wire `handleApple`             | Call `signInWithApple()`, handle errors, navigate on success (iOS only)                               | [ ]    |
| 169 | Wire `handleForgotPassword`    | `ForgotPasswordView` — call `sendPasswordReset()`, show success/error state                           | [ ]    |
| 170 | Wire `handleSignOut`           | `SettingsHomeScreen` — call `signOut()`, dispatch `RESET`, navigate to `SignIn`                       | [ ]    |
| 171 | Wire `handleNoAccount` (guest) | Store `guestMode = true` in AsyncStorage, navigate to `CreateGroup`                                   | [ ]    |
| 172 | Auto-navigate on app launch    | `SplashScreen` — read AsyncStorage for `hasOnboarded` + check `auth().currentUser`, route accordingly | [ ]    |

---

## PART 13 — Notifications

| #   | Task                          | Details                                                                                  | Status |
| --- | ----------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| 173 | Install notifications library | `yarn add @notifee/react-native` or `@react-native-firebase/messaging`                   | [ ]    |
| 174 | iOS permission request        | `NotificationPromptScreen` — call real permission API, store result in AsyncStorage      | [ ]    |
| 175 | Android notification channel  | Create default channel on app launch                                                     | [ ]    |
| 176 | FCM token registration        | On sign-in, save FCM token to `users/{uid}.fcmToken` in Firestore                        | [ ]    |
| 177 | Persist dismissal             | `NotificationPromptScreen` `handleNotNow` — write `notifDismissed: true` to AsyncStorage | [ ]    |

---

## PART 14 — Polish & Production Readiness

### Code quality

| #   | Task                              | Details                                                                                             | Status |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| 178 | Extract `computeEqualSplit`       | Duplicated in `AddExpenseScreen` and `EditExpenseScreen` — move to `src/utils/splitCalculator.ts`   | [ ]    |
| 179 | Replace emoji category icons      | `CategoryPicker.tsx` — replace 8 emoji glyphs with Icon atom (add category icons to `IconMap`)      | [ ]    |
| 180 | Replace `GroupCard` emoji         | `GroupCard.tsx` — replace emoji prop with a colored icon tile using Icon atom                       | [ ]    |
| 181 | Replace `RecentExpenseRow` emoji  | `RecentExpenseRow.tsx` — replace emoji prop with Icon atom using `ExpenseCategory` → `IconName` map | [ ]    |
| 182 | Fix `TouchableOpacity` in welcome | `welcome/components/SlideItem.tsx` — check for any remaining `TouchableOpacity` usage               | [ ]    |
| 183 | Remove `PlaceholderScreen`        | `src/components/ui/PlaceholderScreen.tsx` — delete once all screens are real (currently unused)     | [ ]    |
| 184 | Zustand migration (optional)      | Replace `useAppStore` context+reducer with Zustand — same selector API, drop-in compatible          | [ ]    |

### Navigation

| #   | Task                              | Details                                                                        | Status |
| --- | --------------------------------- | ------------------------------------------------------------------------------ | ------ |
| 185 | Pass `groupId` to GroupDetail     | `RootNavigator` — read `currentParams.groupId` and pass to `GroupDetailScreen` | [ ]    |
| 186 | Pass `expenseId` to ExpenseDetail | Read `currentParams.expenseId`, fetch real expense from store                  | [ ]    |
| 187 | Pass `memberId` to SettleUp       | Read `currentParams.memberId`, pre-fill name and amount from store             | [ ]    |
| 188 | Deep link support                 | Configure URL scheme `spliteasy://` for group invites and settlement links     | [ ]    |

### Testing

| #   | Task                              | Details                                                                                        | Status |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| 189 | Unit tests — `splitCalculator.ts` | Already has `__tests__/settlement.test.ts` — expand coverage for equal/exact/percentage splits | [ ]    |
| 190 | Unit tests — `formatters.ts`      | Test `formatBalance`, `formatCurrency`, `formatRelativeDate`, `getInitials`                    | [ ]    |
| 191 | Unit tests — `settlement.ts`      | Test debt simplification algorithm                                                             | [ ]    |
| 192 | Component tests — atoms           | Snapshot + interaction tests for `Chip`, `Toggle`, `ProgressBar`, `Tag`                        | [ ]    |
| 193 | E2E test — add expense flow       | Detox or Maestro: open group → add expense → verify it appears in list                         | [ ]    |
| 194 | E2E test — settle up flow         | Detox or Maestro: open balances → settle → verify balance updates                              | [ ]    |

### App Store

| #   | Task                        | Details                                                                                            | Status |
| --- | --------------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| 195 | App icon — all sizes        | Generate from `src/assets/logo-icon.svg` using `@expo/prebuild` or manual Xcode/Android Studio     | [ ]    |
| 196 | Launch screen               | Replace default RN launch screen with branded indigo + split-circle mark                           | [ ]    |
| 197 | Privacy manifest (iOS 17+)  | `PrivacyInfo.xcprivacy` — declare API usage (UserDefaults, FileTimestamp, etc.)                    | [ ]    |
| 198 | App Store metadata          | Screenshots (6.7", 6.1", iPad), description, keywords, category (Finance)                          | [ ]    |
| 199 | Android Play Store metadata | Feature graphic, screenshots, description, content rating                                          | [ ]    |
| 200 | Version + build number      | Replace hardcoded `v1.0.0` in `SplashScreen` with value from `package.json` or native build config | [ ]    |

---

## Implementation Order (Next Phase)

```
Part 8          Part 9          Part 10         Part 11         Part 12
Icon SVGs  →   Logo SVGs  →   Firebase    →   Real Data   →   Auth Wiring
(drop files,   (design +      (install +      (replace        (Google,
 wire IconMap)  implement)     configure)      mock data)      Apple, Email)

     ↓               ↓               ↓
Part 13         Part 14a        Part 14b        Part 14c
Notifications   Code Polish     Navigation      Testing &
                (emoji →        (params         App Store
                 icons)          wiring)
```

**Recommended starting point:** Part 8 (icon SVGs) — highest visual impact, zero risk,
no backend dependency. Drop SVG files, update `IconMap`, done.

**Highest value after icons:** Part 10 (Firebase) — unlocks all real data flows.
Install the SDK first, then wire auth, then data.
