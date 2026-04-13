# SplitEasy — Development Roadmap

> **One task at a time. One screen at a time. One week at a time.**
> This is your single source of truth. Work top to bottom. Never skip ahead.
> Estimated: 15 weeks solo developer · Firebase only backend

---

## How to Use This Roadmap

- ✅ Fully done — design + functionality working
- 🎨 Design done — UI built, needs Firebase / AsyncStorage / library wired up
- 🔄 In progress
- ⏸ Blocked (note the reason)
- [ ] Not started
- Each phase has a **Gate** — a minimum bar before moving to the next phase
- Never start Phase 4 if Phase 3 is not gated

---

## Current Status — Last Updated: 2026-04-13

| Area | Status |
|---|---|
| Folder structure & theme | ✅ Complete |
| TypeScript types | ✅ Complete |
| Settlement algorithm + 10 unit tests | ✅ Complete |
| Utility functions (formatters, splitCalculator) | ✅ Complete |
| Custom navigation system | ✅ Complete |
| UI components (Button, Card, Avatar, Badge) | ✅ Complete |
| Global state store (useAppStore) | ✅ Complete |
| Firebase service stubs | 🎨 Stubbed — needs real Firebase SDK |
| 32 placeholder screens | ✅ All navigable |
| Splash screen | 🎨 Design done — AsyncStorage routing pending |
| Welcome carousel | 🎨 Design done — AsyncStorage write pending |
| Sign In screen | 🎨 Design done — Firebase Auth pending |
| Create Group screen | 🎨 Design done — Firestore write pending |
| Notification prompt | 🎨 Design done — Notifications API pending |
| **Next action** | Install dependencies (0.4) → wire Firebase (0.5) |

---

## Quick Overview

| Phase | Name | Weeks | Goal |
|---|---|---|---|
| **0** | Setup & foundation | 1 | Project runs on your phone |
| **1** | Onboarding | 2 | User can sign up and create a group |
| **2** | Core expense features | 3–6 | Full expense cycle works end-to-end |
| **3** | Monetization | 7–9 | App earns money from day one |
| **4** | Premium features | 10–12 | Users have strong reasons to upgrade |
| **5** | Polish & testing | 13–14 | App Store ready, zero crashes |
| **6** | Launch | 15 | Live on App Store + Google Play |
| **7** | Post-launch growth | 16–24 | Scale to 50k MAU |

---

## Phase 0 — Setup & Foundation
### Week 1 · Goal: Project runs on your phone with all tools connected

---

### 0.1 — Development Environment

- [ ] Install Node.js (LTS version — check nodejs.org)
- [ ] Install Expo CLI globally: `npm install -g expo-cli`
- [ ] Install EAS CLI globally: `npm install -g eas-cli`
- [ ] Set up iOS Simulator via Xcode (Mac only)
- [ ] Set up Android Emulator via Android Studio
- [ ] Install VS Code + extensions: ESLint, Prettier, React Native Tools

---

### 0.2 — Project Initialization

```bash
npx create-expo-app SplitEasy --template blank-typescript
cd SplitEasy
git init
git remote add origin https://github.com/YOUR_USERNAME/spliteasy
```

- [ ] Project created successfully
- [ ] App runs on iOS Simulator: `npx expo start`
- [ ] App runs on Android Emulator
- [ ] Git repo initialized and first commit pushed
- [ ] `.gitignore` includes: `.env`, `google-services.json`, `GoogleService-Info.plist`, `node_modules`

---

### 0.3 — Folder Structure

Create this structure before writing any screens:

```
SplitEasy/
├── src/
│   ├── screens/
│   │   ├── onboarding/
│   │   ├── groups/
│   │   ├── balances/
│   │   ├── activity/
│   │   ├── premium/
│   │   ├── paywall/
│   │   └── settings/
│   ├── components/
│   │   ├── ui/          (Button, Card, Avatar, Badge, AdBanner)
│   │   ├── groups/      (GroupCard, ExpenseRow, MemberBalance)
│   │   ├── sheets/      (NudgeSheet, AddMemberSheet, RewardedVideoSheet)
│   │   └── modals/      (DeleteConfirmModal, ConfettiOverlay)
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthStack.tsx
│   │   ├── MainTabs.tsx
│   │   └── GroupStack.tsx
│   ├── hooks/
│   │   ├── usePremium.ts
│   │   ├── useGroup.ts
│   │   ├── useBalances.ts
│   │   └── useAds.ts
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   ├── revenuecat.ts
│   │   └── applovin.ts
│   ├── store/
│   │   └── useAppStore.ts       (Zustand global state)
│   ├── utils/
│   │   ├── settlement.ts        ← WRITE THIS FIRST
│   │   ├── formatters.ts
│   │   └── splitCalculator.ts
│   ├── types/
│   │   ├── group.ts
│   │   ├── expense.ts
│   │   └── user.ts
│   └── theme/
│       ├── colors.ts
│       ├── typography.ts
│       └── spacing.ts
├── assets/
├── .env
├── app.config.js
└── package.json
```

- ✅ All folders created
- ✅ `theme/colors.ts` created with full color palette
- ✅ `theme/typography.ts` and `theme/spacing.ts` created

---

### 0.4 — Install All Dependencies

Run all of these before writing a single screen:

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# Firebase
npx expo install firebase
npx expo install @react-native-firebase/app @react-native-firebase/auth
npx expo install @react-native-firebase/firestore @react-native-firebase/storage

# State management
npm install zustand

# Local storage
npx expo install @react-native-async-storage/async-storage

# UI & animations
npx expo install react-native-reanimated react-native-gesture-handler
npx expo install @gorhom/bottom-sheet

# Camera & images
npx expo install expo-image-picker expo-image-manipulator expo-camera

# Notifications
npx expo install expo-notifications expo-device

# iOS tracking (required for AppLovin MAX)
npx expo install expo-tracking-transparency

# PDF & sharing
npx expo install expo-print expo-sharing

# Revenue & Ads
npm install react-native-purchases
npm install react-native-applovin-max

# Utilities
npm install date-fns

# Crash reporting
npx expo install sentry-expo
```

- [ ] All packages installed with zero errors
- [ ] App still loads after install
- [ ] No TypeScript errors in base project

---

### 0.5 — Firebase Project Setup

- [ ] Go to console.firebase.google.com → Create new project: "SplitEasy"
- [ ] Enable **Authentication** → Sign-in methods: Email/Password, Google, Apple
- [ ] Enable **Firestore Database** → Start in test mode
- [ ] Enable **Storage** → Start in test mode
- [ ] Enable **Functions** (needed later for recurring bills)
- [ ] Enable **Hosting** (needed for shareable links)
- [ ] Download `google-services.json` → place in project root (Android)
- [ ] Download `GoogleService-Info.plist` → place in project root (iOS)
- [ ] Both files added to `.gitignore`
- [ ] Test: write a single document to Firestore from the app → confirm it appears in console

---

### 0.6 — Firestore Data Schema

Define all types before building any screens:

```typescript
// src/types/group.ts
export interface Group {
  id: string;
  name: string;
  emoji: string;
  color: string;
  memberNames: string[];     // plain names — no account needed for members
  createdBy: string;         // userId
  createdAt: Date;
  archived: boolean;
  currency: string;          // 'USD', 'EUR', etc.
}

// src/types/expense.ts
export interface Expense {
  id: string;
  name: string;
  amount: number;
  currency: string;
  originalAmount?: number;   // if multi-currency
  exchangeRate?: number;
  paidBy: string;            // member name (not userId)
  splits: Record<string, number>; // { 'Alex': 60, 'Jordan': 60 }
  splitMethod: 'equal' | 'exact' | 'percentage' | 'itemized';
  items?: Array<{ name: string; amount: number; assignedTo: string[] }>;
  category: string;
  notes?: string;
  photoUrl?: string;
  date: Date;
  createdAt: Date;
  createdBy: string;
  isRecurring?: boolean;
}

export interface Settlement {
  id: string;
  from: string;              // member name
  to: string;                // member name
  amount: number;
  settledAt: Date;
  settledBy: string;         // userId
}

export interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  paidBy: string;
  splits: Record<string, number>;
  frequency: 'monthly' | 'weekly';
  dayOfMonth: number;
  nextDate: Date;
  active: boolean;
}
```

Firestore structure:
```
users/{userId}/
  profile: { email, displayName, currency, defaultSplit, createdAt }

groups/{groupId}/
  info: { name, emoji, color, memberNames, createdBy, createdAt, archived, currency }
  expenses/{expenseId}: Expense object
  settlements/{settlementId}: Settlement object
  recurring/{recurringId}: RecurringBill object
```

- ✅ All TypeScript interfaces created in `src/types/`
- [ ] Firestore security rules written (users read/write own groups only)
- [ ] Security rules tested: user A cannot read user B's groups

---

### 0.7 — THE SETTLEMENT ALGORITHM (Write Before Anything Else)

This is the mathematical core. Every balance depends on it. Write it first, test it thoroughly.

```typescript
// src/utils/settlement.ts

export interface Balance { [memberName: string]: number }
export interface Settlement { from: string; to: string; amount: number }

export function calculateBalances(
  expenses: Array<{ paidBy: string; amount: number; splits: Record<string, number> }>,
  settlements: Array<{ from: string; to: string; amount: number }>
): Balance {
  const balances: Balance = {};

  for (const exp of expenses) {
    balances[exp.paidBy] = (balances[exp.paidBy] || 0) + exp.amount;
    for (const [member, share] of Object.entries(exp.splits)) {
      balances[member] = (balances[member] || 0) - share;
    }
  }

  for (const s of settlements) {
    balances[s.from] = (balances[s.from] || 0) + s.amount;
    balances[s.to] = (balances[s.to] || 0) - s.amount;
  }

  for (const k of Object.keys(balances)) {
    balances[k] = Math.round(balances[k] * 100) / 100;
  }

  return balances;
}

export function getSettlements(balances: Balance): Settlement[] {
  const settlements: Settlement[] = [];
  const entries = Object.entries(balances)
    .map(([id, amount]) => ({ id, amount: Math.round(amount * 100) / 100 }))
    .filter(e => Math.abs(e.amount) > 0.01)
    .sort((a, b) => a.amount - b.amount);

  let left = 0, right = entries.length - 1;
  while (left < right) {
    const debtor = entries[left];
    const creditor = entries[right];
    const amount = Math.round(Math.min(-debtor.amount, creditor.amount) * 100) / 100;

    if (amount > 0.01) {
      settlements.push({ from: debtor.id, to: creditor.id, amount });
    }
    debtor.amount += amount;
    creditor.amount -= amount;
    if (Math.abs(debtor.amount) < 0.01) left++;
    if (Math.abs(creditor.amount) < 0.01) right--;
  }
  return settlements;
}
```

Write these unit tests before moving on:

- ✅ Test 1: Simple 2-person — Alex paid $100 for both → Jordan owes Alex $50
- ✅ Test 2: 3-person complex — should reduce to minimum payments
- ✅ Test 3: All even — everyone paid their exact share → no settlements
- ✅ Test 4: Partial settlement — $30 paid of $50 debt → $20 remaining
- ✅ Test 5: Rounding — $10 ÷ 3 people = shares sum to exactly $10
- ✅ Test 6: Zero balance — already settled, result is empty array
- ✅ Test 7: One person paid everything for 4 people
- ✅ Test 8: Multiple payers with cross-debts
- ✅ Test 9: Very small amounts ($0.01 edge case)
- ✅ Test 10: Large group (6 people, 10 expenses)

**All 10 tests must pass before building any UI.**

---

### 0.8 — Navigation Shell

- ✅ Set up bottom tab navigator: Groups · Balances · Activity · Settings
- ✅ Set up stack navigators inside each tab
- ✅ Auth stack: Splash → Welcome → Sign In → Create Group
- ✅ Create placeholder screens for all 32 screens (just `<Text>Screen Name</Text>`)
- ✅ Confirm all navigation paths work with no broken routes
- 🎨 Route logic: check AsyncStorage for `hasOnboarded` → go to home if true, welcome if false _(AsyncStorage not installed yet)_

---

### ⏸ Phase 0 Gate — BLOCKED on Firebase + device testing

Do not start Phase 1 until:
- [ ] App loads on both iOS Simulator and Android Emulator _(needs 0.4 installs + device test)_
- [ ] Firebase read/write works from the app _(needs 0.5 Firebase setup)_
- ✅ All 32 placeholder screens are navigable
- ✅ Settlement algorithm passes all 10 unit tests
- ✅ Folder structure and theme files are in place

---

## Phase 1 — Onboarding
### Week 2 · Goal: User can sign up and create a group

---

### 1.1 — Splash Screen

- ✅ Indigo `#6366F1` full-screen background
- ✅ SplitEasy logo mark centered (overlapping circles SVG + wordmark)
- ✅ Tagline: "SPLIT BILLS · KEEP FRIENDS" in 10px tracked uppercase
- 🎨 Duration: 1.5s → auto-navigate based on `hasOnboarded` AsyncStorage flag _(AsyncStorage not installed)_
- [ ] Test on real device (animations behave differently than simulator)

---

### 1.2 — Welcome Carousel

- ✅ 3 horizontal slides using `FlatList` + `scrollTo`
- ✅ Slide 1: "Split any bill in 3 taps" — divide icon on indigo bg
- ✅ Slide 2: "Always know who owes whom" — balance illustration on green bg
- ✅ Slide 3: "Friends don't need the app" — connection illustration
- ✅ Page indicator dots: active = 18×5px pill, inactive = 5×5px circle
- ✅ "Skip" button top-right → navigates to Sign In
- ✅ "Next" button → advances, becomes "Get Started" on slide 3
- 🎨 On "Get Started": store `hasOnboarded = true` in AsyncStorage _(AsyncStorage not installed)_

---

### 1.3 — Sign In Screen

- ✅ Sign in with Apple — black button, 56px height (required on iOS if any social login)
- ✅ Sign in with Google — white button with border, 56px height
- ✅ Continue with Email — indigo outline button
- ✅ "Continue without account" — dashed border button (stores data in AsyncStorage only)
- ✅ Forgot password screen (UI built with `sendPasswordResetEmail` stub)
- ✅ Human-readable error messages (never show Firebase error codes to users)
- ✅ Trust copy: "Your friends never need to download anything."
- 🎨 On success → check if user has groups → route to Create Group or Home _(Firebase Auth not wired)_

---

### 1.4 — Create First Group

- ✅ Group name input (autofocused on screen load)
- ✅ Emoji picker: 5 rows × 6 columns grid — travel, home, food, party, outdoors themes
- ✅ Selected emoji: indigo border + indigo background
- ✅ Add members by name: text input, "+" button adds another field
- ✅ Minimum 1 member required (can't create empty group)
- 🎨 "Create Group" → save to Firestore → animated transition to Home _(Firestore not wired)_
- 🎨 Store `groupIds` array on user's Firestore profile _(Firestore not wired)_

---

### 1.5 — Notification Permission Prompt

- ✅ Show after first group is created (not at app launch — too early)
- ✅ Custom pre-prompt screen before iOS system dialog
- ✅ Copy: "Know when someone settles up" — explain each notification type
- 🎨 "Enable Notifications" → `Notifications.requestPermissionsAsync()` → system dialog _(expo-notifications not installed)_
- 🎨 "Not now" → dismiss and store `notifDismissed = true` in AsyncStorage _(AsyncStorage not installed)_
- [ ] Custom pre-prompt increases permission acceptance from ~40% to ~70% _(measure after real launch)_

---

### ⏸ Phase 1 Gate — BLOCKED on Firebase + AsyncStorage

Do not start Phase 2 until:
- [ ] Full onboarding flow works end-to-end on both platforms _(needs Firebase + AsyncStorage)_
- [ ] Sign in with Apple works on a real iPhone (not simulator)
- [ ] "No account" mode creates a group stored in AsyncStorage _(AsyncStorage not installed)_
- [ ] Group data saves to Firestore and persists after app restart _(Firebase not wired)_
- [ ] Push notification permission is requested after group creation _(expo-notifications not installed)_

---

## Phase 2 — Core Expense Features
### Weeks 3–6 · Goal: Full expense cycle works — add, view, balance, settle

---

### Week 3 — Groups Home + Group Detail

#### 2.1 — Groups Home Screen

- [ ] Free-plan badge: `FREE PLAN` amber pill in top-left
- [ ] Net balance hero card: full-width indigo card showing total owed/owing
- [ ] Group cards: emoji, name, member count, your net balance (green/red)
- [ ] 3-group limit: 4th group card shows lock overlay "Upgrade to unlock"
- [ ] "+" FAB button: top-right, creates new group (triggers paywall after 3rd)
- [ ] AppLovin MAX banner at bottom (placeholder component for now — real ads in Phase 3)
- [ ] Empty state: illustrated friends at dinner + "Create your first group" CTA
- [ ] Firestore `onSnapshot` listener — updates in real time

#### 2.2 — Free Limits Screen

- [ ] Shows from Settings or when user hits a limit
- [ ] Usage bars: groups (2/3 used), features locked with amber badges
- [ ] List of premium features they're missing
- [ ] "Upgrade — 7-day free trial" CTA at bottom (placeholder — real paywall in Phase 3)

#### 2.3 — Group Detail Screen

- [ ] Group header: emoji + name + member count
- [ ] Two stat cards: your balance (green/red) + total spent
- [ ] Member balances: each person with colored amount + Settle Up + Nudge buttons
- [ ] Recent expenses: last 5, with "View all →" link
- [ ] "Add Expense" CTA: full-width indigo button
- [ ] Firestore `onSnapshot` — balances recalculate instantly when expenses change
- [ ] AppLovin MAX banner at bottom (placeholder)

---

### Week 4 — Add Expense (Protect the 3-tap flow)

#### 2.4 — Add Expense Screen (Equal Split)

The 3-tap flow is the entire product's competitive advantage. Protect it.

Tap 1: Enter amount (large numpad, defaults to today's date)
Tap 2: Select who paid (member avatars, tap to select)
Tap 3: Tap "Save Expense"

- [ ] Large centered amount display — 30px bold indigo
- [ ] Expense name: text input at top (optional, defaults to category + date)
- [ ] Category picker: 8 icons in a row (Stay, Food, Travel, Fun, Grocery, Utility, Activity, Other)
- [ ] "Paid by" row: member avatar pills, tap to select
- [ ] Split method tabs: Equal · Exact · % · By item
- [ ] Equal split: member checkboxes, all selected by default, real-time preview "Each owes $60.00"
- [ ] "Save Expense" → write to Firestore → navigate back → balance updates immediately (optimistic UI)
- [ ] Success toast: "Expense saved · $240 split 4 ways ✓"

#### 2.5 — Exact Amount Split

- [ ] Number input per member
- [ ] Running total: "Allocated: $180 / $240"
- [ ] Red validation: "Doesn't add up — $60 remaining" shown below inputs
- [ ] "Save" button disabled until total matches exactly

#### 2.6 — Percentage Split

- [ ] Slider per member (0–100%)
- [ ] Last member's % auto-adjusts to keep total at 100%
- [ ] Dollar amount shown next to each slider in real time

#### 2.7 — Itemized Split Screen

- [ ] Line items: name input + amount + member assign buttons per row
- [ ] "+" button to add more items
- [ ] Running per-person total at bottom, updates instantly
- [ ] "Done" → creates expense with itemized split data stored in `items[]`

---

### Week 5 — Balances + Activity + History

#### 2.8 — Balances Tab

- [ ] Net balance hero card: total owed/owing across all groups
- [ ] "WHO OWES YOU" section: green heading, each person with amount + group name
- [ ] Inline buttons: "Settle Up" + "Nudge 💬" per person
- [ ] "YOU OWE" section: red heading, same layout
- [ ] Cross-group attribution: "Alex owes you $47.20 from Spain Trip"

#### 2.9 — Settle Up Flow

- [ ] Full-screen settle view: person name, amount they owe in green card
- [ ] Amount input pre-filled (editable for partial settlement)
- [ ] Optional note field
- [ ] "Mark as Received ✓" → write settlement to Firestore
- [ ] Balances recalculate via `onSnapshot`
- [ ] Confetti animation: show when group balance reaches exactly $0.00

**Confetti implementation (React Native Reanimated):**
```javascript
// On group total balance reaching $0:
// 1. Scale green checkmark circle 0 → 1.2 → 1.0 (spring, 400ms)
// 2. Confetti particles rain down (8 colors, react-native-reanimated)
// 3. "You and Alex are all square!" text fades in (300ms delay)
// 4. "Share the good news 💬" CTA appears (600ms delay)
// This is the most shareable moment — film it for TikTok content
```

#### 2.10 — Activity Feed

- [ ] All expense adds and settlements across all groups, reverse chronological
- [ ] Each event: member avatar circle, description, amount (colored), group name, time ago
- [ ] AppLovin MAX native ad placeholder every 4th item
- [ ] Firestore compound query: all subcollection events ordered by `createdAt`

#### 2.11 — Expense History

- [ ] Full expense list for one group, most recent first
- [ ] Search bar: filter by expense name
- [ ] Date filter pills: All / This Month / Last Month
- [ ] Category filter pills
- [ ] Each row: category icon, name, paid by, amount, your net share (green/red)
- [ ] AppLovin MAX native ad placeholder every 8th item
- [ ] "Export CSV" button: generate CSV from Firestore data → share via native sheet

#### 2.12 — Expense Detail Screen

- [ ] Full expense info: name, amount, category, date
- [ ] Indigo hero card with total amount
- [ ] Split breakdown: each member's share with colored amounts
- [ ] Edit button → navigates to Add Expense form pre-filled
- [ ] Delete button → confirmation modal → delete from Firestore

---

### Week 6 — Sharing + Push Notifications + Group Management

#### 2.13 — Nudge Feature

- [ ] "Nudge [name]" button on any balance row
- [ ] Opens bottom sheet with pre-written friendly message
- [ ] Message template: "Hey [name], just a reminder you owe me $[amount] from [group]! 😊 No rush at all."
- [ ] "Copy Message" CTA → copies to clipboard
- [ ] "Open in Messages" → `sms:` URL scheme deeplink on iOS
- [ ] No in-app messaging — just clipboard and deeplink

#### 2.14 — Share Group Summary

- [ ] "Share" button on group detail screen
- [ ] Opens bottom sheet showing balance summary preview
- [ ] Generate as plain text: "✈️ Spain Trip — Alex owes Sarah: $47.20, Sam: $22.15, Jordan: Settled ✓"
- [ ] Share via native iOS/Android share sheet (Messages, WhatsApp, Email, Copy)

#### 2.15 — Group Settings Screen

- [ ] Edit group name (inline)
- [ ] Change emoji and color
- [ ] Add/remove members (with balance warning if member has outstanding debt)
- [ ] Archive group → confirmation modal → set `archived: true` in Firestore
- [ ] Archived groups move to a separate "Archived" section on home screen

#### 2.16 — Push Notifications

- [ ] Expense added to your group → push notification (requires Expo push token stored on user profile)
- [ ] Settlement confirmed → push to relevant member
- [ ] Schedule with `expo-notifications`
- [ ] Test on real physical device (push notifications don't work reliably in simulator)
- [ ] Store push token in Firestore `users/{userId}/pushToken`

#### 2.17 — Offline Support

- [ ] Enable Firestore offline persistence: `enableIndexedDbPersistence(db)` on init
- [ ] Test: airplane mode → add expense → reconnect → expense syncs
- [ ] Show "Offline" banner when no connection detected (NetInfo)
- [ ] All reads work from cache when offline — app never shows empty state just because of no internet

---

### ✅ Phase 2 Gate

Do not start Phase 3 until:
- [ ] Full expense cycle: create group → add expense → see balance → settle → confetti
- [ ] Balances calculate correctly (run settlement algorithm against real Firestore data)
- [ ] Nudge copies to clipboard on real device
- [ ] Push notification fires when expense is added (test on real iPhone + Android)
- [ ] Offline mode works (add expense in airplane mode, sync on reconnect)
- [ ] Give app to 3 real friend groups and watch them use it — fix every point of confusion

---

## Phase 3 — Monetization
### Weeks 7–9 · Goal: App earns money from day one of launch

---

### Week 7 — AppLovin MAX Ads

#### 3.1 — MAX SDK Setup

- [ ] Create AppLovin account at dash.applovin.com
- [ ] Create 4 ad units: Banner, Interstitial, Rewarded, Native
- [ ] Write down all 8 ad unit IDs (4 for iOS, 4 for Android) in `.env`
- [ ] Enable mediation networks in MAX dashboard: Google AdMob, Meta Audience Network, Unity Ads
- [ ] Add AppLovin SDK key to `app.config.js`
- [ ] Initialize MAX SDK in `App.tsx` — AFTER ATT consent on iOS

#### 3.2 — ATT Consent Modal (iOS 14+ Required)

- [ ] Build pre-prompt screen (must show BEFORE system ATT dialog)
- [ ] Copy: "Help us show relevant ads — not random ones"
- [ ] "Continue" → `requestTrackingPermissionsAsync()` → system ATT dialog
- [ ] Pass ATT status to AppLovin MAX initialization
- [ ] Test on real iPhone — ATT dialog does not appear in simulator

#### 3.3 — Banner Ads

```typescript
// src/components/ui/AdBanner.tsx
import AppLovinMAX from 'react-native-applovin-max';
import { usePremium } from '../../hooks/usePremium';

export const AdBanner = () => {
  const { isPremium } = usePremium();
  if (isPremium) return null;  // Premium users see zero ads
  
  return (
    <AppLovinMAX.AdView
      adUnitId={Platform.OS === 'ios' ? IOS_BANNER_ID : ANDROID_BANNER_ID}
      adFormat={AppLovinMAX.AdFormat.BANNER}
      style={{ width: '100%', height: 50 }}
    />
  );
};
```

- [ ] Banner placed above bottom tab bar on: Groups Home, Group Detail, Activity Feed
- [ ] `AdBanner` returns `null` for premium users — zero ads
- [ ] Handle ad load failure gracefully — collapse space, don't show empty gap

#### 3.4 — Interstitial Ads

- [ ] Pre-load interstitial on app start
- [ ] Pre-load again immediately after one is shown
- [ ] **Trigger: only after group balance reaches $0.00 (settlement complete)**
- [ ] Wait 2 seconds AFTER confetti animation before showing interstitial
- [ ] Frequency cap: max 1 interstitial per 3 minutes

```typescript
// Frequency cap implementation
const COOLDOWN_MS = 3 * 60 * 1000;
let lastShownTime = 0;

export const showInterstitialIfReady = (isPremium: boolean) => {
  if (isPremium) return;
  if (Date.now() - lastShownTime < COOLDOWN_MS) return;
  if (!AppLovinMAX.isInterstitialReady(INTER_UNIT_ID)) return;
  
  AppLovinMAX.showInterstitial(INTER_UNIT_ID);
  lastShownTime = Date.now();
  AppLovinMAX.loadInterstitial(INTER_UNIT_ID); // preload next
};
```

- [ ] Never show interstitial: during expense entry, on auth screens, on paywall screen

#### 3.5 — Rewarded Video Ads

- [ ] Pre-load rewarded ad on app start
- [ ] Build `RewardedVideoSheet` component
- [ ] Trigger for: PDF export (once/day) + Receipt scanner (once/day)
- [ ] Timer shown during video: "Unlocks in 28 seconds"
- [ ] On reward earned: execute unlocked action + show success animation
- [ ] Track daily unlock state in AsyncStorage — reset at midnight

#### 3.6 — Native Ads

- [ ] MAX native ad template styled to match expense cards exactly
- [ ] "Sponsored" label in 8px slate gray — clearly labeled
- [ ] Insert every 4th item in Activity Feed
- [ ] Insert every 8th item in Expense History
- [ ] Free users only

---

### Week 8 — RevenueCat Subscriptions

#### 3.7 — RevenueCat Setup

- [ ] Create RevenueCat account at app.revenuecat.com
- [ ] Create iOS app + Android app in RevenueCat dashboard
- [ ] Create products in **App Store Connect**:
  - Product ID: `spliteasy_premium_monthly` · Price: $3.49/month · Trial: 7 days
  - Product ID: `spliteasy_premium_annual` · Price: $24.99/year · Trial: 7 days
- [ ] Create same products in **Google Play Console**
- [ ] Create "premium" entitlement in RevenueCat → link both products
- [ ] Create "default" offering → add monthly + annual packages
- [ ] Initialize RevenueCat SDK in `App.tsx`
- [ ] Test with RevenueCat sandbox environment

#### 3.8 — usePremium Hook

```typescript
// src/hooks/usePremium.ts
import Purchases from 'react-native-purchases';
import { useState, useEffect } from 'react';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPremium();
    const listener = Purchases.addCustomerInfoUpdateListener((info) => {
      setIsPremium(!!info.entitlements.active['premium']);
    });
    return () => listener.remove();
  }, []);

  const checkPremium = async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      setIsPremium(!!info.entitlements.active['premium']);
    } catch { setIsPremium(false); }
    finally { setIsLoading(false); }
  };

  return { isPremium, isLoading };
}
```

- [ ] `usePremium()` hook works in every screen that needs it
- [ ] Premium users: all ads hidden, all premium screens unlocked
- [ ] Free users: ads shown, premium screens show lock overlays

#### 3.9 — Paywall Screen

- [ ] Annual plan pre-selected (2px indigo border on annual card)
- [ ] "SAVE 40%" amber badge floating above annual option
- [ ] Feature list: 6 items, emotion-first copy (not feature names)
- [ ] "Start 7-Day Free Trial" → `Purchases.purchasePackage()`
- [ ] Handle purchase errors with human-readable messages
- [ ] "Restore Purchases" → `Purchases.restorePurchases()`
- [ ] Test: purchase → use premium → cancel → free mode returns

#### 3.10 — Paywall Triggers (4 context variants)

**Variant A — 4th group attempt:**
- Show what they wanted to create (name + emoji in amber preview card)
- "You've hit the free limit — 3 groups max on Free"
- CTA: "Upgrade & Create Group"

**Variant B — Receipt scanner tap:**
- Bottom sheet (not full screen)
- Shows AI scanner preview, 3 specific benefits
- CTA: "Try Premium Free — 7 Days" + secondary "Watch an ad for 1 free scan"

**Variant C — PDF export tap:**
- Bottom sheet with PDF preview visible behind
- Rewarded video option + premium option side by side
- This variant drives BOTH ad revenue AND premium conversions

**Variant D — 30-day anniversary:**
- Push notification: "You've logged [N] expenses this month — see your full report →"
- Tapping notification opens the PDF locked screen

- [ ] All 4 paywall variants built and triggering correctly
- [ ] Paywall never shows to premium users

---

### Week 9 — Monetization Testing

- [ ] Banner ads display correctly on Groups Home + Group Detail
- [ ] Interstitial fires after settlement at $0 (with 2s delay, frequency capped)
- [ ] Rewarded video unlocks PDF export for the day
- [ ] Native ads blend into Activity Feed list (labeled "Sponsored")
- [ ] All ads hidden for premium users (test by purchasing in sandbox)
- [ ] RevenueCat purchase flow completes in sandbox on both platforms
- [ ] Paywall triggers at correct moments (4th group, receipt scanner, PDF, 30-day)
- [ ] `usePremium()` hook returns correct value after purchase, cancel, restore
- [ ] ATT prompt fires before MAX init on real iPhone

---

### ✅ Phase 3 Gate

Do not start Phase 4 until:
- [ ] All 4 AppLovin MAX ad formats load on real iPhone 14 and Samsung S21
- [ ] Interstitial frequency cap works correctly (max 1 per 3 minutes)
- [ ] RevenueCat subscription purchase completes in sandbox on both platforms
- [ ] Premium users see exactly zero ads
- [ ] Paywall triggers correctly at all 4 moments
- [ ] Revenue pipeline is confirmed working — even $0 in sandbox is fine, the plumbing must work

---

## Phase 4 — Premium Features
### Weeks 10–12 · Goal: Premium feels worth every cent

---

### Week 10 — Recurring Bills

#### 4.1 — Recurring Bills Screen

- [ ] List of active recurring bills with next-due date
- [ ] Indigo left border on active bills
- [ ] Toggle per bill: active / paused (updates `active` field in Firestore)
- [ ] "Add Recurring Bill" → form screen
- [ ] Paused bills shown below with gray styling

#### 4.2 — Add Recurring Form

- [ ] Bill name input
- [ ] Amount input
- [ ] Split method (same as regular expense)
- [ ] Frequency: Monthly / Weekly
- [ ] Day of month picker (for monthly)
- [ ] "Save" → create recurring document in Firestore with `nextDate` set

#### 4.3 — Firebase Function: Auto-Add Cron Job

```javascript
// functions/index.js
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addRecurringExpenses = onSchedule('0 9 1 * *', async () => {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();

  const snapshot = await db.collectionGroup('recurring')
    .where('active', '==', true)
    .where('nextDate', '<=', now)
    .get();

  const batch = db.batch();

  for (const doc of snapshot.docs) {
    const r = doc.data();
    const groupRef = doc.ref.parent.parent;

    // Create expense from recurring template
    const expenseRef = groupRef.collection('expenses').doc();
    batch.set(expenseRef, {
      name: r.name,
      amount: r.amount,
      paidBy: r.paidBy,
      splits: r.splits,
      splitMethod: 'exact',
      category: 'recurring',
      date: now,
      createdAt: now,
      createdBy: 'system',
      isRecurring: true,
    });

    // Advance nextDate by 1 month
    const next = new Date(r.nextDate.toDate());
    next.setMonth(next.getMonth() + 1);
    batch.update(doc.ref, {
      nextDate: admin.firestore.Timestamp.fromDate(next)
    });
  }

  await batch.commit();
});
```

- [ ] Firebase Function deployed: `firebase deploy --only functions`
- [ ] Test: manually set a `nextDate` to past → verify expense auto-creates
- [ ] Push notification sent when recurring bill is auto-added: "[Bill name] auto-added to [Group]"

---

### Week 11 — Receipt Scanner + Multi-Currency

#### 4.4 — Cloudflare Worker Proxy

The receipt scanner calls two paid APIs (Google Cloud Vision + Claude). Never put API keys in the app. Use a Cloudflare Worker as a proxy.

```javascript
// cloudflare-worker/index.js
export default {
  async fetch(request, env) {
    const { imageBase64 } = await request.json();

    // Step 1: Google Cloud Vision — extract text from receipt photo
    const visionRes = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${env.GOOGLE_VISION_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: imageBase64 },
            features: [{ type: 'TEXT_DETECTION' }]
          }]
        })
      }
    );
    const visionData = await visionRes.json();
    const rawText = visionData.responses[0]?.fullTextAnnotation?.text || '';

    if (!rawText) return Response.json({ items: [], error: 'Cannot read receipt' });

    // Step 2: Claude API — parse raw OCR text into structured items
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        messages: [{
          role: 'user',
          content: `Parse this receipt. Return ONLY a JSON array: [{"name": string, "amount": number}]
Include ONLY food/drink items. EXCLUDE tax, tip, total, service charge. Receipt: ${rawText}`
        }]
      })
    });
    const claudeData = await claudeRes.json();
    const text = claudeData.content[0]?.text || '[]';

    try {
      const items = JSON.parse(text.replace(/```json|```/g, '').trim());
      return Response.json({ items });
    } catch {
      return Response.json({ items: [], error: 'Parse failed' });
    }
  }
};
```

- [ ] Cloudflare Worker created and deployed
- [ ] Google Vision API key and Claude API key stored as Cloudflare secrets
- [ ] Worker URL stored in `.env`
- [ ] Test worker directly with curl using a real receipt photo in base64

#### 4.5 — Receipt Scanner Screen

- [ ] Camera view with rectangular scan overlay
- [ ] Capture → compress (expo-image-manipulator, max 1200px, 0.7 quality)
- [ ] Base64 encode → POST to Cloudflare Worker
- [ ] Loading state: "Reading receipt..." with subtle animation
- [ ] Detected items list: name + amount + "Assign →" button per item
- [ ] Error handling: "Couldn't read this receipt — try better lighting or add items manually"

#### 4.6 — Assign Items Screen

- [ ] Each detected item shows as a card
- [ ] Member pills per item (tap to toggle who ordered it)
- [ ] Running per-person total updates instantly
- [ ] "Save Split" → creates expense with `splitMethod: 'itemized'` and `items[]` array

#### 4.7 — Multi-Currency

- [ ] Currency selector per expense (dropdown: USD, EUR, GBP, CAD, JPY, AUD, INR, SGD)
- [ ] Open Exchange Rates API: `https://open.exchangeratesapi.io/latest?base=USD`
- [ ] Cache rates in AsyncStorage with 1-hour TTL
- [ ] Each expense shows: original amount + currency + converted amount in group's home currency
- [ ] Group total always shown in group's home currency

---

### Week 12 — PDF Report + Custom Categories

#### 4.8 — PDF Group Report

```html
<!-- expo-print HTML template -->
<html>
<head>
<style>
  body { font-family: -apple-system, sans-serif; padding: 24px; color: #0F172A; }
  .header { background: #6366F1; color: white; padding: 16px; border-radius: 12px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th { background: #EEF2FF; color: #4338CA; font-size: 10px; padding: 8px; text-align: left; }
  td { font-size: 11px; padding: 8px; border-bottom: 1px solid #EEF2FF; }
  .pos { color: #059669; font-weight: 700; }
  .neg { color: #DC2626; font-weight: 700; }
  .footer { font-size: 9px; color: #94A3B8; text-align: center; margin-top: 20px; }
</style>
</head>
<body>
  <div class="header">
    <h2>{{emoji}} {{groupName}}</h2>
    <p>{{memberNames}} · {{count}} expenses · {{dateRange}}</p>
  </div>
  <h3>Expense History</h3>
  <table>
    <tr><th>Date</th><th>Description</th><th>Paid By</th><th>Amount</th><th>Your Share</th></tr>
    {{expenses}}
  </table>
  <h3>Final Balances</h3>
  {{balances}}
  <div class="footer">Generated by SplitEasy · spliteasy.app</div>
</body>
</html>
```

- [ ] Build PDF preview screen: scrollable card showing the rendered PDF
- [ ] "Export & Share" → `expo-print` generates PDF → `expo-sharing` opens native share sheet
- [ ] "Print" option
- [ ] Free users: `RewardedVideoSheet` shows first (watch to export once/day)
- [ ] Premium users: instant export, no ad

#### 4.9 — Custom Categories

- [ ] Settings screen: "Custom Categories" section (premium)
- [ ] Add category: emoji picker + name input
- [ ] Custom categories appear alongside built-in ones in expense form
- [ ] Stored in `users/{userId}/customCategories` in Firestore

---

### ✅ Phase 4 Gate

Do not start Phase 5 until:
- [ ] Recurring bills auto-create correctly via Firebase Function
- [ ] Receipt scanner extracts items from 3+ real restaurant receipts accurately
- [ ] Multi-currency shows correct converted amounts (verify against Google rate)
- [ ] PDF exports with clean, professional formatting
- [ ] All premium features are gated correctly behind `usePremium()` hook
- [ ] Give 3–5 premium users (friends, family) full access to test everything

---

## Phase 5 — Polish & Testing
### Weeks 13–14 · Goal: App Store ready, zero crashes, feels premium on every screen

---

### Week 13 — Animations + Empty States + Loading

#### 5.1 — Animations

- [ ] Splash: logo fade-in 300ms ease-out
- [ ] Welcome carousel: slide + opacity transition between screens
- [ ] Group card entrance: stagger 60ms between cards on home screen load
- [ ] Expense save: green checkmark scales in (spring, 300ms)
- [ ] Settlement confetti: full confetti animation with 8 colored particles
- [ ] Confetti trigger: ONLY when group balance reaches exactly $0.00
- [ ] Paywall: feature checkmarks stagger-animate in (80ms each)
- [ ] Balance update: number counts up/down after new expense added (400ms)
- [ ] Haptic feedback: save expense, settle up, paywall dismiss

#### 5.2 — Empty States (Never Show a Blank Screen)

- [ ] Groups home — no groups: "Create your first group to start splitting" + CTA
- [ ] Group detail — no expenses: "Add your first expense — split anything" + CTA
- [ ] Activity feed — no activity: "No activity yet. Add an expense to see it here."
- [ ] Expense history — no expenses: "No expenses yet in this group."
- [ ] Balances — all zero: "You're all squared up! 🎉" + celebration illustration

#### 5.3 — Loading States

- [ ] Skeleton screens for: Groups home, Group detail, Expense history, Balances
- [ ] Skeleton: animated gray placeholder cards while Firestore loads
- [ ] Optimistic UI on all writes — never show a loading spinner for saves
- [ ] Custom loading indicator: animated indigo dot pulse (not default spinner)

#### 5.4 — Dark Mode

- [ ] Test every screen in dark mode on iOS and Android
- [ ] Fix all hardcoded colors (search for `#` in all screen files)
- [ ] Verify text contrast ≥ 4.5:1 ratio in dark mode for all text
- [ ] Green/red money colors must still be distinguishable in dark mode

---

### Week 14 — Testing + App Store Prep

#### 5.5 — Functional Testing Checklist

- [ ] Full onboarding on real iPhone (Apple Sign-In works)
- [ ] Full onboarding on real Android (Google Sign-In works)
- [ ] "No account" mode: create group, add expense, settle — all persists in AsyncStorage
- [ ] Add expense: all 4 split methods (equal, exact, percentage, itemized)
- [ ] Settlement algorithm: create complex 5-person group, verify suggestions are correct
- [ ] Recurring bill: Firebase Function auto-adds on schedule
- [ ] Receipt scanner: test with 5 real restaurant receipts
- [ ] Multi-currency: verify USD→EUR conversion matches current market rate
- [ ] PDF export: looks clean on iPhone 15 Pro + Samsung S21
- [ ] Nudge: message copies to clipboard, Messages deeplink opens on iPhone
- [ ] Push notifications: fire on both platforms for expense added + settlement
- [ ] RevenueCat sandbox: purchase → premium unlocked → cancel → free returns
- [ ] AppLovin MAX: all 4 formats on real iPhone 14 and Samsung Galaxy S21
- [ ] ATT: fires BEFORE MAX init on real iPhone (critical Apple requirement)
- [ ] Offline: add expense in airplane mode → reconnect → syncs to Firestore
- [ ] Paywall: triggers at correct moments (4th group, scanner, PDF, anniversary)

#### 5.6 — Performance Testing

- [ ] Groups home with 20 groups: scroll smooth at 60fps
- [ ] Expense history with 100 expenses: FlatList performs correctly
- [ ] Settlement algorithm: runs in under 50ms for groups with 50+ expenses
- [ ] App cold start: under 3 seconds on iPhone 11 or Samsung S20

#### 5.7 — Crash Reporting (Sentry)

```javascript
// App.tsx
import * as Sentry from 'sentry-expo';
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enableInExpoDevelopment: false,
});
```

- [ ] Sentry initialized in `App.tsx`
- [ ] Force a test crash → confirm it appears in Sentry dashboard
- [ ] Set up Sentry email alert for new crash types
- [ ] Zero Sentry errors during 2 hours of manual testing

#### 5.8 — App Store Preparation (iOS)

- [ ] App Store Connect: create new app
- [ ] App name: "SplitEasy — Bill Splitter & Tab"
- [ ] Subtitle: "Group Expense Tracker"
- [ ] Category: Finance (Primary)
- [ ] Age rating: 4+
- [ ] Screenshots required: 6.7" iPhone 15 Pro Max + 5.5" iPhone 8 Plus
- [ ] Screenshot content: groups home with balance, add expense, confetti settlement, paywall
- [ ] Privacy policy URL: host on Firebase Hosting (`/privacy` route)
- [ ] Keywords (100 chars max): `bill splitter,split expenses,group expenses,roommate expenses,travel expenses,split bills`
- [ ] Data safety: declare financial data, purchase history, email address

#### 5.9 — Google Play Preparation

- [ ] Play Console: create new app
- [ ] Same name and description as iOS
- [ ] Feature graphic: 1024×500px — indigo background, SplitEasy logo, tagline
- [ ] Phone screenshots + 7" tablet screenshots
- [ ] Data safety form: same as iOS
- [ ] Internal testing track → alpha track before production

#### 5.10 — TestFlight Beta

- [ ] Submit build to TestFlight
- [ ] Invite 10 real beta users across: college roommates, travel friends, couples, work friends
- [ ] Watch 3 of them use it silently — don't explain anything
- [ ] Fix every point of confusion before App Store submission
- [ ] Target: zero "how do I..." questions from beta users

---

### ✅ Phase 5 Gate

Do not submit to App Store until:
- [ ] Zero Sentry crashes in 2 hours of continuous testing on real devices
- [ ] All screens tested on iPhone 14 and Samsung Galaxy S21
- [ ] RevenueCat purchase tested end-to-end in sandbox on both platforms
- [ ] All AppLovin MAX ad formats confirmed on real devices
- [ ] App Store and Play Store listings complete and reviewed
- [ ] Privacy policy live at a public URL
- [ ] 5+ TestFlight users gave positive feedback

---

## Phase 6 — Launch
### Week 15 · Goal: Live on App Store + Google Play, first real users

---

### 6.1 — Submission

- [ ] Submit to App Store Review (typical: 1–3 days)
- [ ] Submit to Google Play Review (typical: 1–3 days)
- [ ] Prepare for common rejection reasons:
  - Missing Apple Sign-In (required if any social login)
  - Broken in-app purchase in review environment
  - ATT prompt not shown before any tracking
  - Privacy policy URL not accessible

### 6.2 — Launch Day Actions

- [ ] Reddit posts (same day as App Store approval):
  - r/solotravel: "I built a free bill splitter after my friend owed me $400 for 6 months"
  - r/college: "Built a roommate expense tracker — simpler than Splitwise"
  - r/personalfinance: "Finally built the app I wish existed for splitting bills"
  - r/Frugal: "Free bill splitter with no account needed for your friends"
- [ ] TikTok: film the confetti settlement moment — "My friend finally paid me back 🎉"
- [ ] ProductHunt: Tuesday launch at 12:01am ET for maximum visibility
- [ ] App Store Search Ads: $10/day on "bill splitter app", "split expenses"
- [ ] Message 20 friends/family — ask for honest reviews (not just 5 stars)

### 6.3 — First Week Monitoring (Daily)

- [ ] Sentry: check for new crashes every morning
- [ ] Firebase Analytics: DAU, onboarding completion %, paywall view rate
- [ ] AppLovin MAX dashboard: eCPM, fill rate, revenue
- [ ] RevenueCat dashboard: trial starts, conversions, MRR
- [ ] App Store reviews: respond to every review within 48 hours
- [ ] Fix critical bugs within 24 hours → submit expedited review request

---

### ✅ Phase 6 Gate

- [ ] App live on both App Store and Google Play
- [ ] First 100 downloads in week 1
- [ ] First ad revenue received (even $1 is validation)
- [ ] Zero critical crashes in first 48 hours

---

## Phase 7 — Post-Launch Growth
### Weeks 16–24 · Goal: 50,000 MAU · $7,000+/month revenue

---

### Week 16–17 — Fix and Listen

- [ ] Read every single App Store review
- [ ] Build a spreadsheet of all feedback — group by theme
- [ ] Fix all bugs from launch feedback
- [ ] Identify the top 3 most-requested features (build these next, not what you originally planned)
- [ ] Submit v1.0.1 with bug fixes within 72 hours if critical bugs found

### Week 18–19 — Growth Marketing

- [ ] TikTok: post 3×/week
  - Format 1: "The awkward moment when your friend still hasn't paid you back" → show Nudge feature
  - Format 2: "How I split expenses on a group trip with 7 people" → show group + expense flow
  - Format 3: "My roommate finally paid the rent split" → film the confetti moment
- [ ] YouTube Shorts: same content repurposed vertically
- [ ] Instagram Reels: same videos
- [ ] App Store Search Ads: increase to $20/day on best-performing keywords
- [ ] Identify top 5 keywords from first 3 weeks of search ad data → double down on winners

### Week 20–21 — Feature Expansion (Build What Users Actually Ask For)

Top post-launch requests for expense-splitting apps:

- [ ] Venmo/Zelle deeplink on "Settle Up" button — pre-fills amount and note
- [ ] WhatsApp share for expense summary (huge in US + international markets)
- [ ] Couples mode: simplified 2-person tracking, recurring bills focus
- [ ] "Trip mode": date-range grouping, location tagging
- [ ] Lifetime plan: $59.99 one-time — captures anti-subscription users

### Week 22–23 — Revenue Optimization

- [ ] A/B test paywall headline: "SplitEasy Premium" vs "Unlock Everything" vs "For Groups That Travel"
- [ ] A/B test pricing: $24.99/yr vs $19.99/yr vs $29.99/yr
- [ ] Test annual vs monthly pre-selection on paywall
- [ ] Optimize interstitial timing: test showing after 3 completed settlements vs current trigger
- [ ] Apply for AppLovin MAX Verified Publisher program at 10k MAU (higher CPMs)
- [ ] Apply for Chewy, Amazon, or Chase Sapphire affiliate programs (high-CPA finance ads)

### Week 24 — Scale Planning

By end of Week 24 you should have:
- 40,000–60,000 MAU
- $5,000–9,000/month revenue
- Clear data on what % of users hit the 3-group paywall (primary conversion trigger)

Evaluate:
- [ ] Hire a part-time React Native developer for 2 days/week
- [ ] Explore Splitwise acquisition discussions if MAU is growing fast (they have acquired competitors before)
- [ ] International expansion: Canada, UK, Australia all use English and have high per-capita spending
- [ ] B2B opportunity: offer SplitEasy for Teams to coworking spaces and travel companies at $9.99/seat/month

---

## Revenue Projections

| Month | MAU | Avg eCPM | Ad Revenue | Premium (2%) | Monthly Total |
|---|---|---|---|---|---|
| 1 | 400 | $9 | $30 | $20 | $50 |
| 2 | 1,500 | $10 | $130 | $80 | $210 |
| 3 | 3,500 | $10 | $300 | $180 | $480 |
| 6 | 14,000 | $10 | $1,200 | $700 | $1,900 |
| 9 | 30,000 | $11 | $2,800 | $1,500 | $4,300 |
| 12 | 52,000 | $11 | $5,000 | $2,900 | $7,900 |

Revenue spikes at: Memorial Day, July 4th, Labor Day, Spring Break, Thanksgiving — all travel periods when friend groups split costs. Plan TikTok campaigns 2 weeks before each.

---

## Weekly Check-in Template

Use this every Monday morning to stay on track:

```
Week: ___
Phase: ___

✅ Completed last week:
-
-
-

🔄 This week's focus (max 3 things):
1.
2.
3.

⏸ Currently blocked on:
-

📊 Metrics (post-launch only):
Downloads total:
DAU:
Ad revenue this week: $
New premium subscribers:
Sentry crashes this week:
Top App Store feedback:
Settlement confetti fires/day: (proxy for deep engagement)
```

---

## The Beating Splitwise Checklist

When every box is checked, SplitEasy ships and wins:

- [ ] Expense added in 3 taps (Splitwise requires 7+)
- [ ] Zero account required for group members
- [ ] AI receipt scanner (Splitwise has none)
- [ ] Recurring bills that actually auto-add via Firebase Function
- [ ] Settlement confetti (TikTok marketing gold)
- [ ] Multi-currency at live rates
- [ ] PDF export at $24.99/yr (Splitwise charges $39.99/yr)
- [ ] Nudge with one-tap message copy
- [ ] "No account" mode for solo use
- [ ] All screens respond in under 500ms
- [ ] App Store rating ≥ 4.6 stars within first 3 months

---

## Files in This Project

| File | Purpose |
|---|---|
| `SplitEasy_Features.md` | Complete feature list, free vs premium, AppLovin MAX setup |
| `SplitEasy_Screens.md` | All 32 screen designs with layout specs |
| `SplitEasy_Roadmap.md` | This file — week-by-week plan |
| `SplitEasy_Project_Starter.md` | Full code snippets, schema, setup commands |
| `SplitEasy_Premium_Build_Guide.md` | Premium UI guide and winning strategy |

---

*SplitEasy Development Roadmap v2.0*
*15 weeks to launch · 24 weeks to 50k MAU*
*First task: write settlement.ts · Test it · Then build everything else.*
*The settlement algorithm is the entire app. Get it right.*
