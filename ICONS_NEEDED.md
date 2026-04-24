# SplitEasy — Icons Needed

All SVG files go into `src/assets/icons/`.
After adding each file, update the `require(...)` path in `src/components/atoms/Icon/index.tsx`.

Currently wired: `chevron-down-black.svg` (real) — all others use it as a placeholder.

---

## Priority 1 — Navigation & Core Actions

> Used on almost every screen. Add these first.

| Icon name           | File name               | Used in                                   |
| ------------------- | ----------------------- | ----------------------------------------- |
| `chevron-left`      | `chevron-left.svg`      | ScreenHeader back button, NavBar          |
| `chevron-right`     | `chevron-right.svg`     | ListRow, SelectRow chevrons               |
| `chevron-down-gray` | `chevron-down-gray.svg` | SelectRow, dropdowns                      |
| `chevron-up-gray`   | `chevron-up-gray.svg`   | Collapsed sections                        |
| `arrow-back`        | `arrow-back.svg`        | ForgotPasswordView back button            |
| `arrow-forward`     | `arrow-forward.svg`     | PremiumBanner CTA arrow                   |
| `close`             | `close.svg`             | BottomSheetModal, PaywallScreen           |
| `plus`              | `plus.svg`              | GroupsHomeScreen FAB, AddMember           |
| `minus`             | `minus.svg`             | GroupSettingsScreen remove member         |
| `check`             | `check.svg`             | DefaultCurrencyScreen selected row        |
| `check-circle`      | `check-circle.svg`      | EmptyState icon, PaywallScreen FeatureRow |
| `search`            | `search.svg`            | SearchBar, InputField leftIcon            |

---

## Priority 2 — Tab Bar

> Visible on every main screen. Add alongside Priority 1.

| Icon name   | File name       | Used in           |
| ----------- | --------------- | ----------------- |
| `home`      | `home.svg`      | Groups tab icon   |
| `bar-chart` | `bar-chart.svg` | Balances tab icon |
| `activity`  | `activity.svg`  | Activity tab icon |
| `settings`  | `settings.svg`  | Settings tab icon |

---

## Priority 3 — Settings & Auth

> Needed for the Settings stack and sign-in flow.

| Icon name | File name     | Used in                             |
| --------- | ------------- | ----------------------------------- |
| `user`    | `user.svg`    | Profile ListRow, SettingsHomeScreen |
| `bell`    | `bell.svg`    | Notifications ListRow               |
| `dollar`  | `dollar.svg`  | Default Currency ListRow            |
| `info`    | `info.svg`    | About ListRow, InfoCard             |
| `log-out` | `log-out.svg` | Sign Out ListRow                    |
| `star`    | `star.svg`    | Rate App ListRow                    |
| `share`   | `share.svg`   | Share App ListRow                   |
| `lock`    | `lock.svg`    | SignIn screen guest mode            |
| `eye`     | `eye.svg`     | Password field show toggle          |
| `eye-off` | `eye-off.svg` | Password field hide toggle          |
| `link`    | `link.svg`    | AboutScreen social rows             |
| `mail`    | `mail.svg`    | Email InputField leftIcon           |
| `phone`   | `phone.svg`   | Phone InputField leftIcon           |

---

## Priority 4 — Expense & Group Screens

> Needed for the full group stack.

| Icon name  | File name      | Used in                                         |
| ---------- | -------------- | ----------------------------------------------- |
| `edit`     | `edit.svg`     | ExpenseDetailScreen header right action         |
| `trash`    | `trash.svg`    | EditExpenseScreen header, delete flows          |
| `camera`   | `camera.svg`   | ProfileScreen avatar badge, GroupSettings badge |
| `users`    | `users.svg`    | GroupSettingsScreen image circle                |
| `calendar` | `calendar.svg` | Date SelectRow leftIcon                         |
| `receipt`  | `receipt.svg`  | AddExpenseScreen receipt row                    |
| `send`     | `send.svg`     | SettleUpScreen confirm                          |
| `tag`      | `tag.svg`      | ExpenseDetailScreen category Tag                |
| `filter`   | `filter.svg`   | Filter actions                                  |
| `copy`     | `copy.svg`     | Copy to clipboard actions                       |
| `repeat`   | `repeat.svg`   | Recurring expense indicator                     |
| `refresh`  | `refresh.svg`  | Refresh / retry actions                         |
| `download` | `download.svg` | ExportPDFScreen                                 |
| `upload`   | `upload.svg`   | Receipt upload                                  |

---

## Priority 5 — Premium & Paywall

> Needed for the premium screens.

| Icon name        | File name            | Used in                                         |
| ---------------- | -------------------- | ----------------------------------------------- |
| `crown`          | `crown.svg`          | PremiumBanner badge, PremiumFeaturesScreen hero |
| `zap`            | `zap.svg`            | PremiumBanner PREMIUM badge                     |
| `star-filled`    | `star-filled.svg`    | GroupDetail HeroBanner rating star              |
| `shield`         | `shield.svg`         | PremiumFeaturesScreen — Priority Support card   |
| `globe`          | `globe.svg`          | PremiumFeaturesScreen — Multi-Currency card     |
| `file-text`      | `file-text.svg`      | PremiumFeaturesScreen — PDF Export card         |
| `alert-circle`   | `alert-circle.svg`   | FreeLimitsScreen InfoCard                       |
| `alert-triangle` | `alert-triangle.svg` | GroupSettingsScreen danger zone rows            |
| `gift`           | `gift.svg`           | Gift / referral features                        |
| `qr-code`        | `qr-code.svg`        | QR code feature                                 |
| `help-circle`    | `help-circle.svg`    | Help / support actions                          |

---

## Priority 6 — Remaining (low urgency)

> Defined in IconName but not yet actively rendered in UI.

| Icon name     | File name         | Notes                    |
| ------------- | ----------------- | ------------------------ |
| `credit-card` | `credit-card.svg` | Payment method           |
| `percent`     | `percent.svg`     | Percentage split display |
| `hash`        | `hash.svg`        | Reference numbers        |
| `globe`       | `globe.svg`       | Multi-currency           |
| `lock`        | `lock.svg`        | Security                 |
| `send`        | `send.svg`        | Send payment             |

---

## How to wire each icon

1. Drop the `.svg` file into `src/assets/icons/`
2. Open `src/components/atoms/Icon/index.tsx`
3. Find the icon entry in `IconMap` — it currently points to `chevron-down-black.svg`
4. Change the `require` path to the new file:

```ts
// Before
'chevron-left': require('../../../assets/icons/chevron-down-black.svg').default,

// After
'chevron-left': require('../../../assets/icons/chevron-left.svg').default,
```

5. All existing `<Icon name="chevron-left" />` usages across the app update automatically — no other changes needed.

---

## SVG spec

All icons should follow the same format as `chevron-down-black.svg`:

```svg
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- paths here, using stroke="#0F0D13" or fill="#0F0D13" -->
</svg>
```

- `width` / `height`: `40` (rendered size is controlled by the `size` prop at runtime)
- `viewBox`: `0 0 40 40`
- `fill="none"` on the root `<svg>`
- Use `stroke` for line icons, `fill` for solid icons
- The Icon atom passes `stroke` and `fill` props at runtime — so use `stroke="currentColor"` or a neutral dark color in the SVG source; the component overrides it
