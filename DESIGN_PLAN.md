# SplitEasy — Premium UI Redesign: Master Plan

# Written: 2026-04-17 | Status: IN PROGRESS

---

## WHAT WENT WRONG (Root Cause)

Workers generated partial files — JSX tags left unclosed, StyleSheet objects
truncated mid-definition, style keys referenced before they were declared.
Three files are broken and must be fully rewritten from scratch.

---

## FILES TO FIX / BUILD — IN ORDER

### STATUS KEY

- [x] Done — zero errors
- [~] In progress
- [ ] Not started

---

### FILE 1 — src/theme/colors.ts

STATUS: [x] DONE
WHAT: Expanded color system with premium gold, glass tokens, gradient arrays.
NO FURTHER ACTION NEEDED.

---

### FILE 2 — src/screens/onboarding/SplashScreen.tsx

STATUS: [x] DONE (worker completed, no errors reported)
WHAT: Dark gradient bg (#1E1B4B → #4338CA), chain-link logo mark, animated
spring entrance, tagline, version footer.
VERIFY: Run checkErrors after all fixes to confirm.

---

### FILE 3 — src/screens/onboarding/WelcomeScreen.tsx

STATUS: [x] DONE (worker completed, no errors reported)
WHAT: Three illustrated slides with geometric art (split avatars, balance
scale, network silhouettes), gradient backgrounds, premium dots/buttons.
VERIFY: Run checkErrors after all fixes to confirm.

---

### FILE 4 — src/screens/onboarding/SignInScreen.tsx

STATUS: [x] FIXED — needs full rewrite
ERRORS:

- StyleSheet truncated at line 630 — missing closing brace
- styles.btnPrimary, btnPrimaryText, forgotLink, btnGuest, btnGuestText,
  trustBadge, trustBadgeText all referenced but never defined in StyleSheet
  ROOT CAUSE: Worker cut off mid-file. The styles object is incomplete.
  FIX: Write the complete file from scratch with ALL style keys defined.
  DESIGN SPEC:
- Dark background: backgroundColor '#1E1B4B' (deep indigo)
- Gradient overlay: absolute View bottom 55%, bg '#312E81', opacity 0.7
- Logo mark: two chain-link rounded rectangles (brand + brandMid colors)
- Wordmark: 'SplitEasy' 28px bold white centered
- Welcome heading: 22px semibold white centered, marginTop 32
- Trust line: 14px rgba(255,255,255,0.6) centered
- Glass card: bg rgba(255,255,255,0.10), border rgba(255,255,255,0.18),
  borderRadius 24, padding 24, marginHorizontal 20
- Apple button: black bg, white text, height 56, borderRadius 14
- Google button: white bg, text1 color, height 56, borderRadius 14
- Divider: hairline lines + 'or' text in rgba(255,255,255,0.4)
- Email button: transparent, border rgba(255,255,255,0.3), white text
- Guest button: transparent, border rgba(255,255,255,0.15) dashed,
  rgba(255,255,255,0.5) text
- Trust badge: centered below card, lock icon + 'Encrypted & private'
- Email mode: dark inputs (rgba(255,255,255,0.12) bg), white text
- Primary button (email mode): brand bg (#6366F1), white text, height 56
- Forgot link: rgba(255,255,255,0.6) centered text
- Error text: rgba(255,107,107,1) red
- Success box: rgba(5,150,105,0.2) bg, green border, mint text
- Back row: arrow + 'Back' in #A5B4FC (indigo 300)
  ALL STYLE KEYS NEEDED: root, mainContainer, subContainer, logoSection,
  wordmark, welcomeHeading, trustLine, glassCard, subHeading, subText,
  backRow, backArrow, backLabel, darkInput, errorText, successBox,
  successText, btn, btnDisabled, btnApple, appleIcon, btnAppleText,
  btnGoogle, googleG, btnGoogleText, btnEmail, btnEmailText, btnPrimary,
  btnPrimaryText, btnGuest, btnGuestText, forgotLink, trustBadge,
  trustBadgeText

---

### FILE 5 — src/navigation/MainTabs.tsx

STATUS: [x] FIXED — needs full rewrite
ERRORS:

- JSX View tag unclosed at line 20 (GroupsIcon component cut off)
- iconStyles referenced but never defined
- All imports unused because Tab.Navigator never rendered
  ROOT CAUSE: Worker generated icon components but file was truncated before
  the iconStyles StyleSheet and the Tab.Navigator JSX.
  FIX: Write the complete file from scratch.
  DESIGN SPEC:
- 4 tabs: Groups, Balances, Activity, Settings
- Each tab has a custom View-based icon (no emoji, no external icon lib)
- Groups icon: 3 overlapping circles (small, large, small) — people
- Balances icon: horizontal bar with two hanging vertical lines + circles
  (scale/balance visual)
- Activity icon: 3 horizontal lines of decreasing width (list/feed)
- Settings icon: circle with 4 small dots around it (gear suggestion)
- Active state: icon color = colors.brand, inactive = colors.text4
- Active tab: small 3px wide × 3px tall brand-colored dot ABOVE the icon
- Tab bar: white bg, borderTopWidth 1, borderTopColor colors.border,
  height 64, paddingBottom 0
- Tab label: 10px medium weight, brand color when active, text4 inactive
  ALL STYLE KEYS NEEDED: tabBar, iconWrap, activeDot, tabLabel,
  groupsRow, groupsCircleSm, groupsCircleLg,
  balanceBeam, balanceWire, balancePan,
  actLine1, actLine2, actLine3,
  settingsCircle, settingsDot

---

### FILE 6 — src/screens/groups/GroupsHomeScreen.tsx

STATUS: [x] FIXED — needs full rewrite
ERRORS:

- JSX unclosed tag at line 269 (NetBalanceBanner — Text tag opened twice,
  closing tag mismatched)
- StyleSheet truncated at line 391 — missing all style definitions after
  'header' key
- 50+ style keys referenced but not defined (card, accentBar, groupIcon,
  groupEmoji, cardCenter, groupName, groupMeta, balanceChip, balanceChipPos,
  balanceChipNeg, balanceChipZero, balanceChipText, balanceTextPos,
  balanceTextNeg, balanceTextZero, emptyState, emptyOuterCircle,
  emptyMidCircle, emptyInnerCircle, emptyInnerText, emptyTitle,
  emptySubtitle, emptyBtn, emptyBtnText, banner, bannerOverlay,
  bannerCircle, bannerCircle1, bannerCircle2, bannerCircle3, bannerLeft,
  bannerLabel, bannerAmount, settleAllBtn, settleAllText, fab, fabBarH,
  fabBarV, headerLeft, headerTextBlock, wordmark, headerSub, notifBtn,
  searchRow, searchBar, searchInput, clearBtnCircle, clearBtnText,
  noResults, noResultsText, listContent)
  ROOT CAUSE: Worker truncated the StyleSheet. JSX also has a broken Text tag
  in NetBalanceBanner (two opening Text tags, one closing).
  FIX: Write the complete file from scratch.
  DESIGN SPEC:
- Header: white bg, flexRow, logo mark (28px indigo rounded square with
  two white bars) + 'SplitEasy' wordmark (20px extrabold brand) +
  subtitle (xs text4) + bell icon (View-based) on right in 40px
  circle bg=colors.bg
- Net balance banner: full-width card, marginHorizontal 20, marginTop 16,
  borderRadius 16, overflow hidden, height 88
  Positive: bg colors.pos, overlay '#34D399' right half opacity 0.4
  Negative: bg colors.neg, overlay '#FB7185' right half opacity 0.4
  Zero: bg colors.brand, overlay '#8B5CF6' right half opacity 0.4
  Three decorative circles (absolute, rgba white 0.12, 0.08, 0.05)
  Left: label (12px white 0.8 opacity) + amount (26px bold white)
  Right: 'Settle all' pill (white bg, colored text, borderRadius pill)
- Search bar: marginHorizontal 20, marginTop 12, height 44, white bg,
  borderRadius 10, border borderMid, flexRow, SearchIcon + TextInput + clear circle button (16px circle, bg surfaceDeep)
- Group cards: white bg, paddingVertical 16, paddingHorizontal 20,
  flexRow, gap 12. Left accent bar: 3px wide, 40px tall, borderRadius
  pill, color = pos/neg/brand. Emoji icon: 48px square, borderRadius
  10, bg = group.color + '20'. Name: 14px semibold text1. Meta: 12px
  text4. Balance chip: paddingH 10, paddingV 4, borderRadius pill,
  bg = posBg/negBg/bg, text = pos/neg/zero, 12px semibold.
- Empty state: centered, nested circles (outer 120px rgba brand 0.08,
  mid 80px rgba brand 0.12, inner 48px brand bg with 'G' white text),
  title 20px bold text1, subtitle 14px text3, CTA button brand bg
- FAB: 56px circle, brand bg, brand shadow, bottom 24, right 20,
  cross made of two 20px × 3px white bars (H and V, absolute centered)
  ALL STYLE KEYS: root, header, headerLeft, headerTextBlock, wordmark,
  headerSub, notifBtn, banner, bannerOverlay, bannerCircle, bannerCircle1,
  bannerCircle2, bannerCircle3, bannerLeft, bannerLabel, bannerAmount,
  settleAllBtn, settleAllText, searchRow, searchBar, searchInput,
  clearBtnCircle, clearBtnText, card, accentBar, groupIcon, groupEmoji,
  cardCenter, groupName, groupMeta, balanceChip, balanceChipPos,
  balanceChipNeg, balanceChipZero, balanceChipText, balanceTextPos,
  balanceTextNeg, balanceTextZero, emptyState, emptyOuterCircle,
  emptyMidCircle, emptyInnerCircle, emptyInnerText, emptyTitle,
  emptySubtitle, emptyBtn, emptyBtnText, noResults, noResultsText,
  listContent, separator, fab, fabBarH, fabBarV

---

### FILE 7 — src/screens/balances/BalancesScreen.tsx

STATUS: [x] DONE (no errors yet — original file intact)
WHAT: Premium redesign of the balances tab.
DESIGN SPEC:

- Header: CustomHeader with title 'Balances'
- Hero card: marginH 20, marginTop 16, borderRadius 20, padding 20
  Positive: bg colors.posBg. Negative: bg colors.negBg.
  Zero: bg colors.brandLight.
  Label: 12px medium text3. Amount: 40px extrabold letterSpacing -1
  Stats row (if net != 0): divider line, two stat columns
  (owed to me in pos color, I owe in neg color)
- Filter pills: flexRow, paddingH 20, gap 8, marginBottom 8
  Active: brand bg, white text. Inactive: white bg, borderMid,
  text3. Height 32, borderRadius pill, paddingH 14.
- Person rows: white bg, paddingV 16, paddingH 20, flexRow, gap 12
  Avatar: 44px circle, deterministic color, white initials 13px bold
  Info: name 14px semibold text1, groups 11px text4
  Right: amount (14px bold pos/neg), label (11px medium pos/neg),
  Settle pill button (pos/neg bg, white text, 10px semibold)
- Separator: 1px border, marginLeft 76 (aligns with text after avatar+gap)
- Empty state: centered icon circle + title + subtitle

---

### FILE 8 — src/screens/activity/ActivityScreen.tsx

STATUS: [x] DONE (no errors yet — original file intact)
WHAT: Premium redesign of the activity feed.
DESIGN SPEC:

- Header: CustomHeader with title 'Activity'
- Filter pills: same style as Balances (All / Expenses / Settlements)
  Rendered in white bar with bottom border
- Date headers: paddingH 20, paddingTop 20, paddingBottom 8
  Text: 11px semibold text4, uppercase, letterSpacing 0.5
- Activity rows: white bg, paddingV 14, paddingH 20, flexRow, gap 12,
  borderBottom 1px border
  Icon circle: 44px, borderRadius 10
  Expense: brandLight bg
  Settlement: posBg bg
  Description: 14px semibold text1 (flex 1, truncated)
  Amount: 14px bold (pos/neg/text3)
  Bottom row: group badge (brandLight bg, brand text, 10px semibold,
  borderRadius 6) + meta text (11px text4)
- Empty state: centered

---

### FILE 9 — src/screens/settings/SettingsHomeScreen.tsx

STATUS: [x] DONE (no errors yet — original file intact)
WHAT: Premium redesign of settings.
DESIGN SPEC:

- Header: CustomHeader with title 'Settings'
- Profile card: marginH 20, marginTop 16, borderRadius 20, padding 20,
  white bg, shadow. Avatar: 64px circle brand bg, 22px bold
  white initials. Name: 18px semibold text1. Email: 13px text4.
  'Edit' badge: brand border, brand text, borderRadius pill.
- Premium upgrade card (free users only): marginH 20, marginTop 12,
  borderRadius 20, padding 20, bg '#1E1B4B' (dark indigo).
  Left: 'Upgrade to Premium' 16px bold white, subtitle 13px
  rgba(255,255,255,0.7). Right: '✦ PRO' badge in gold bg
  (#F59E0B), dark text, borderRadius 10.
  Bottom: 'Start 7-day free trial' white pill button.
- Section headers: paddingH 20, paddingTop 20, paddingBottom 8,
  11px semibold text4 uppercase letterSpacing 1
- Settings sections: marginH 20, white bg, borderRadius 16, border borderMid,
  overflow hidden
- Settings rows: paddingH 16, paddingV 14, flexRow, gap 12
  Icon wrap: 32px square, borderRadius 8, bg surfaceDeep
  Label: 14px medium text1 (destructive = neg color)
  Value: 13px text4. Chevron: '›' 20px text4.
  Row divider: 1px border, marginLeft 60
- Footer: centered, version 13px text4, links 11px text4

---

### FILE 10 — src/screens/paywall/PaywallScreen.tsx

STATUS: [x] DONE (currently a placeholder)
WHAT: Full premium paywall — the most important conversion screen.
DESIGN SPEC:

- Background: dark '#1E1B4B' with gradient overlay (same as SignIn)
- Close button: top-right X, rgba(255,255,255,0.5), hitSlop 12
- Header section: gold star icon (View-based 5-point star suggestion using
  rotated squares), 'SplitEasy Premium' 26px bold white,
  'Everything you need to split smarter' 14px rgba white 0.7
- Feature list (6 items): each row = gold checkmark circle (24px, gold bg,
  white check text) + feature text (15px white)
  Features: 1. 'Unlimited groups — no caps, ever' 2. 'Recurring bills that auto-add themselves' 3. 'AI receipt scanner — snap and split' 4. 'PDF reports for every group' 5. 'Multi-currency at live exchange rates' 6. 'Zero ads, forever'
- Plan cards: two cards side by side (Monthly | Annual)
  Annual card: 2px brand border, 'BEST VALUE' amber badge top-right
  Monthly: white bg, text1. Annual: brandLight bg, brand border.
  Plan name: 13px semibold text3. Price: 22px bold text1.
  Period: 11px text4.
- CTA button: full width, brand bg, 'Start 7-Day Free Trial' 16px semibold
  white, height 56, borderRadius 14, marginTop 16
- Restore link: centered, 'Restore Purchases' 13px rgba white 0.5, marginTop 12
- Legal: 'Cancel anytime. Billed annually.' 11px rgba white 0.4, centered

---

## IMPLEMENTATION ORDER

Fix broken files first (they block the app from running):
STEP 1: Fix SignInScreen.tsx ← broken, must fix now
STEP 2: Fix MainTabs.tsx ← broken, must fix now
STEP 3: Fix GroupsHomeScreen.tsx ← broken, must fix now
STEP 4: Redesign BalancesScreen.tsx
STEP 5: Redesign ActivityScreen.tsx
STEP 6: Redesign SettingsHomeScreen.tsx
STEP 7: Build PaywallScreen.tsx
STEP 8: Verify SplashScreen.tsx + WelcomeScreen.tsx (check errors)
STEP 9: Final checkErrors across all 10 files

---

## CONSTRAINTS (apply to every file)

- NO external libraries beyond what already exists in the project
- NO LinearGradient — simulate with layered Views + backgroundColor + opacity
- NO emoji in tab bar or icon positions — use View-based geometric icons
- All money colors (pos, neg, zero, pend) are SACRED — never change them
- Every StyleSheet must define ALL keys referenced in JSX — no missing keys
- Every JSX tag must be properly opened and closed
- TypeScript: no implicit any except where `as any` is already used for
  fontWeight (React Native limitation)
- Keep all navigation logic identical to original — only visual layer changes
