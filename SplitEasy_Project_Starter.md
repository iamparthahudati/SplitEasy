# SplitEasy — Complete Project Starter

> **The app that will beat Splitwise.**
> Premium Indigo design · AppLovin MAX ads · RevenueCat subscriptions
> React Native + Expo · Firebase · 15 weeks to launch

---

## Why SplitEasy Wins

| Competitor weakness | SplitEasy advantage |
|---|---|
| Splitwise: 7+ taps to add expense | **3 taps. That's it.** |
| Splitwise: requires all friends to sign up | **Friends need zero account** |
| Splitwise: no receipt scanner | **AI receipt scanner built-in** |
| Splitwise: $39.99/yr | **$24.99/yr — 37% cheaper** |
| Splitwise: no emotional payoff | **Confetti when group settles** |
| Both apps: boring UI | **Premium Indigo design system** |

---

## Design System (Exact Values)

```css
/* Brand */
--brand:        #6366F1;   /* Indigo 500 */
--brand-dark:   #4338CA;   /* Indigo 700 */
--brand-light:  #EEF2FF;   /* Indigo 50 */
--brand-mid:    #C7D2FE;   /* Indigo 200 */

/* Money color language — SACRED. NEVER BREAK THESE. */
--pos:          #059669;   /* Emerald 600 — owed TO you */
--pos-bg:       #D1FAE5;   /* Emerald 100 */
--pos-dark:     #065F46;   /* Emerald 900 — text on green bg */
--neg:          #DC2626;   /* Red 600 — you OWE */
--neg-bg:       #FEE2E2;   /* Red 100 */
--neg-dark:     #991B1B;   /* Red 900 */
--zero:         #94A3B8;   /* Slate 400 — settled */
--pend:         #D97706;   /* Amber 600 — needs action */
--pend-bg:      #FEF3C7;   /* Amber 100 */

/* Surfaces */
--bg:           #F8FAFC;   /* Slate 50 — app bg */
--white:        #FFFFFF;   /* Cards */
--text-1:       #0F172A;   /* Slate 900 */
--text-2:       #334155;   /* Slate 700 */
--text-3:       #64748B;   /* Slate 500 */
--text-4:       #94A3B8;   /* Slate 400 — hints */
--border:       #F1F5F9;   /* Slate 100 — subtle */
--border-mid:   #E2E8F0;   /* Slate 200 — inputs */

/* Radius */
--r-xl: 24px;   /* sheets, paywall */
--r-lg: 16px;   /* hero cards */
--r-md: 12px;   /* regular cards */
--r-sm: 10px;   /* inputs, buttons */
--r-xs: 8px;    /* small chips */
--r-pill: 999px;
```

---

## Project Setup (Run in order)

### 1. Initialize

```bash
npx create-expo-app SplitEasy --template blank-typescript
cd SplitEasy
git init
git remote add origin https://github.com/YOUR_USERNAME/spliteasy
```

### 2. Install all dependencies

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# Firebase
npx expo install firebase
npx expo install @react-native-firebase/app @react-native-firebase/auth
npx expo install @react-native-firebase/firestore @react-native-firebase/storage

# State
npm install zustand

# Storage
npx expo install @react-native-async-storage/async-storage

# UI & Animation
npx expo install react-native-reanimated react-native-gesture-handler
npm install react-native-svg
npx expo install @gorhom/bottom-sheet

# Camera & Images
npx expo install expo-image-picker expo-image-manipulator expo-camera

# Notifications & Device
npx expo install expo-notifications expo-device
npx expo install expo-tracking-transparency

# PDF & Sharing
npx expo install expo-print expo-sharing

# Revenue
npm install react-native-purchases        # RevenueCat
npm install react-native-applovin-max     # AppLovin MAX

# Utilities
npm install date-fns
npm install fuse.js                       # fuzzy search (if needed)

# Dev tools
npm install --save-dev @types/react-native sentry-expo jest
```

### 3. Create .env

```bash
# .env — NEVER commit this
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

REVENUECAT_IOS_KEY=
REVENUECAT_ANDROID_KEY=
APPLOVIN_SDK_KEY=

CLOUDFLARE_WORKER_URL=https://your-worker.your-subdomain.workers.dev
```

---

## Folder Structure

```
SplitEasy/
├── src/
│   ├── screens/
│   │   ├── onboarding/
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── SignInScreen.tsx
│   │   │   └── CreateGroupScreen.tsx
│   │   ├── groups/
│   │   │   ├── GroupsHomeScreen.tsx
│   │   │   ├── GroupDetailScreen.tsx
│   │   │   ├── AddExpenseScreen.tsx
│   │   │   ├── SplitMethodScreen.tsx
│   │   │   ├── ItemizedSplitScreen.tsx
│   │   │   ├── ExpenseDetailScreen.tsx
│   │   │   └── ExpenseHistoryScreen.tsx
│   │   ├── balances/
│   │   │   ├── BalancesScreen.tsx
│   │   │   └── SettleUpScreen.tsx
│   │   ├── activity/
│   │   │   └── ActivityFeedScreen.tsx
│   │   ├── premium/
│   │   │   ├── RecurringBillsScreen.tsx
│   │   │   ├── ReceiptScannerScreen.tsx
│   │   │   ├── AssignItemsScreen.tsx
│   │   │   ├── MultiCurrencyScreen.tsx
│   │   │   └── PDFReportScreen.tsx
│   │   ├── paywall/
│   │   │   ├── PaywallScreen.tsx
│   │   │   └── ComparePlansScreen.tsx
│   │   └── settings/
│   │       ├── SettingsScreen.tsx
│   │       ├── AccountScreen.tsx
│   │       └── NotificationPrefsScreen.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── HeroCard.tsx
│   │   │   └── AdBanner.tsx      ← AppLovin MAX wrapper
│   │   ├── groups/
│   │   │   ├── GroupCard.tsx
│   │   │   ├── MemberBalance.tsx
│   │   │   ├── ExpenseRow.tsx
│   │   │   └── SettleSuggestion.tsx
│   │   ├── sheets/
│   │   │   ├── NudgeSheet.tsx
│   │   │   ├── AddMemberSheet.tsx
│   │   │   ├── LogWeightSheet.tsx
│   │   │   ├── RewardedVideoSheet.tsx
│   │   │   └── ShareSummarySheet.tsx
│   │   └── modals/
│   │       ├── DeleteConfirmModal.tsx
│   │       ├── ArchiveConfirmModal.tsx
│   │       └── ConfettiOverlay.tsx
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthStack.tsx
│   │   ├── MainTabs.tsx
│   │   └── GroupStack.tsx
│   │
│   ├── hooks/
│   │   ├── usePremium.ts         ← RevenueCat entitlement check
│   │   ├── useGroup.ts
│   │   ├── useBalances.ts
│   │   └── useAds.ts             ← AppLovin MAX helpers
│   │
│   ├── services/
│   │   ├── firebase/
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   ├── revenuecat.ts
│   │   ├── applovin.ts
│   │   └── receiptScanner.ts     ← Cloudflare Worker caller
│   │
│   ├── store/
│   │   └── useAppStore.ts        ← Zustand global state
│   │
│   ├── utils/
│   │   ├── settlement.ts         ← THE MOST IMPORTANT FILE
│   │   ├── formatters.ts         ← currency, date formatting
│   │   ├── splitCalculator.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── group.ts
│   │   ├── expense.ts
│   │   └── user.ts
│   │
│   └── theme/
│       ├── colors.ts             ← All CSS vars above as TS constants
│       ├── typography.ts
│       └── spacing.ts
│
├── assets/
│   ├── icon.png                  ← 1024×1024
│   ├── splash.png
│   └── illustrations/            ← empty states SVGs
│
├── .env
├── app.config.js
├── package.json
└── tsconfig.json
```

---

## Firestore Schema

```typescript
// users/{userId}
interface User {
  email: string;
  displayName: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JPY';
  defaultSplit: 'equal' | 'exact' | 'percentage';
  createdAt: Timestamp;
  groupIds: string[];
}

// groups/{groupId}
interface Group {
  name: string;
  emoji: string;
  color: string;         // hex of chosen color theme
  memberNames: string[]; // plain names — no account needed
  createdBy: string;     // userId
  createdAt: Timestamp;
  archived: boolean;
  archivedAt?: Timestamp;
}

// groups/{groupId}/expenses/{expenseId}
interface Expense {
  name: string;
  amount: number;        // always in group's home currency
  currency: string;      // original currency if multi-currency
  originalAmount?: number;
  exchangeRate?: number;
  paidBy: string;        // member name
  splits: Record<string, number>; // { 'Alex': 60, 'Jordan': 60, 'You': 60 }
  splitMethod: 'equal' | 'exact' | 'percentage' | 'itemized';
  items?: Array<{ name: string; amount: number; assignedTo: string[] }>;
  category: string;
  notes?: string;
  photoUrl?: string;
  date: Timestamp;
  createdAt: Timestamp;
  createdBy: string;
}

// groups/{groupId}/settlements/{settlementId}
interface Settlement {
  from: string;          // member name who paid
  to: string;            // member name who received
  amount: number;
  settledAt: Timestamp;
  settledBy: string;     // userId who recorded it
}

// groups/{groupId}/recurring/{recurringId}
interface RecurringBill {
  name: string;
  amount: number;
  splits: Record<string, number>;
  frequency: 'monthly' | 'weekly';
  dayOfMonth?: number;   // 1-28
  dayOfWeek?: number;    // 0-6
  nextDate: Timestamp;
  active: boolean;
  createdAt: Timestamp;
}
```

---

## Settlement Algorithm (Write First, Test Thoroughly)

```typescript
// src/utils/settlement.ts

export interface Balance { [memberName: string]: number }
export interface Settlement { from: string; to: string; amount: number }

/**
 * Returns the minimum number of payments to settle all debts.
 * Uses greedy algorithm: largest debtor pays largest creditor.
 * 
 * UNIT TEST THIS WITH 10+ SCENARIOS BEFORE BUILDING ANY UI.
 */
export function getSettlements(balances: Balance): Settlement[] {
  const settlements: Settlement[] = [];
  
  // Round all balances to 2 decimal places first
  const rounded: Balance = {};
  for (const [k, v] of Object.entries(balances)) {
    rounded[k] = Math.round(v * 100) / 100;
  }
  
  const entries = Object.entries(rounded)
    .filter(([, v]) => Math.abs(v) > 0.01)
    .sort((a, b) => a[1] - b[1]);

  let left = 0, right = entries.length - 1;
  
  while (left < right) {
    const debtor = entries[left];
    const creditor = entries[right];
    const amount = Math.round(Math.min(-debtor[1], creditor[1]) * 100) / 100;
    
    if (amount > 0.01) {
      settlements.push({ from: debtor[0], to: creditor[0], amount });
    }
    
    debtor[1] += amount;
    creditor[1] -= amount;
    
    if (Math.abs(debtor[1]) < 0.01) left++;
    if (Math.abs(creditor[1]) < 0.01) right--;
  }
  
  return settlements;
}

/**
 * Calculate each member's net balance from all expenses and settlements.
 * Positive = owed TO them. Negative = they OWE.
 */
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
  
  // Round all to 2 decimal places
  for (const k of Object.keys(balances)) {
    balances[k] = Math.round(balances[k] * 100) / 100;
  }
  
  return balances;
}

// Unit test scenarios:
// 1. Simple 2-person: A paid $100 for both → B owes A $50
// 2. 3-person complex: A paid $120, B paid $60 → minimize to 2 payments
// 3. All even: everyone paid their exact share → [] empty
// 4. Partial settlement: $30 paid of $50 debt → $20 remaining
// 5. Rounding: $10 ÷ 3 = 3.33 + 3.33 + 3.34, must sum to exactly $10
// 6. Already settled: balance = 0 → no settlements needed
// 7. 5-person group with complex cross-debts
// 8. One person paid everything for group of 4
// 9. Two separate payers, two separate bills
// 10. Negative rounding edge case: -0.001 should be treated as zero
```

---

## usePremium Hook

```typescript
// src/hooks/usePremium.ts
import Purchases from 'react-native-purchases';
import { useState, useEffect } from 'react';

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPremium();
    
    // Listen for purchase events
    Purchases.addCustomerInfoUpdateListener((info) => {
      setIsPremium(!!info.entitlements.active['premium']);
    });
  }, []);

  const checkPremium = async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      setIsPremium(!!info.entitlements.active['premium']);
    } catch (e) {
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isPremium, isLoading };
}
```

---

## AppLovin MAX Setup

```typescript
// src/services/applovin.ts
import AppLovinMAX from 'react-native-applovin-max';

const AD_UNITS = {
  banner: {
    ios: 'YOUR_BANNER_IOS_UNIT_ID',
    android: 'YOUR_BANNER_ANDROID_UNIT_ID',
  },
  interstitial: {
    ios: 'YOUR_INTER_IOS_UNIT_ID',
    android: 'YOUR_INTER_ANDROID_UNIT_ID',
  },
  rewarded: {
    ios: 'YOUR_REWARDED_IOS_UNIT_ID',
    android: 'YOUR_REWARDED_ANDROID_UNIT_ID',
  },
  native: {
    ios: 'YOUR_NATIVE_IOS_UNIT_ID',
    android: 'YOUR_NATIVE_ANDROID_UNIT_ID',
  },
};

import { Platform } from 'react-native';

export const getUnitId = (type: keyof typeof AD_UNITS) =>
  Platform.OS === 'ios' ? AD_UNITS[type].ios : AD_UNITS[type].android;

// Initialize in App.tsx — AFTER ATT consent
export const initMAX = (sdkKey: string) => {
  AppLovinMAX.initialize(sdkKey, () => {
    // Preload high-value units immediately
    AppLovinMAX.loadInterstitial(getUnitId('interstitial'));
    AppLovinMAX.loadRewardedAd(getUnitId('rewarded'));
  });
};

// Interstitial with frequency cap
let lastInterstitialTime = 0;
const COOLDOWN = 3 * 60 * 1000; // 3 minutes

export const showInterstitial = (isPremium: boolean) => {
  if (isPremium) return;
  if (Date.now() - lastInterstitialTime < COOLDOWN) return;
  
  if (AppLovinMAX.isInterstitialReady(getUnitId('interstitial'))) {
    AppLovinMAX.showInterstitial(getUnitId('interstitial'));
    lastInterstitialTime = Date.now();
    // Preload next one
    AppLovinMAX.loadInterstitial(getUnitId('interstitial'));
  }
};

// Rewarded with callback
export const showRewarded = (
  onRewarded: () => void,
  isPremium?: boolean
) => {
  if (isPremium) {
    onRewarded();
    return;
  }
  
  AppLovinMAX.setRewardedAdListener({
    onAdRewardedEvent: () => onRewarded(),
    onAdHiddenEvent: () => {},
  });
  
  if (AppLovinMAX.isRewardedAdReady(getUnitId('rewarded'))) {
    AppLovinMAX.showRewardedAd(getUnitId('rewarded'));
    AppLovinMAX.loadRewardedAd(getUnitId('rewarded'));
  }
};
```

---

## Ad Placement Map

| Screen | Free user | Premium user |
|---|---|---|
| Groups home | Banner (bottom) | Nothing |
| Group detail | Banner (bottom) | Nothing |
| Activity feed | Native (item 4) | Nothing |
| Expense history | Native (item 8) | Nothing |
| Settlement success | Interstitial (2s delay) | Nothing |
| PDF export attempt | Rewarded video option | Instant export |
| Receipt scanner attempt | Rewarded video option | Instant access |

**Interstitial rule:** Only show when group balance reaches $0 (settlement complete). This is the highest-satisfaction moment — user just achieved their goal. Best conversion timing AND least intrusive.

---

## Receipt Scanner — Cloudflare Worker

```javascript
// cloudflare-worker/index.js — Deploy at workers.cloudflare.com

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { imageBase64 } = await request.json();

    // Step 1: Google Cloud Vision OCR
    const visionResponse = await fetch(
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

    const visionData = await visionResponse.json();
    const rawText = visionData.responses[0]?.fullTextAnnotation?.text || '';

    if (!rawText) {
      return Response.json({ items: [], error: 'Could not read receipt' });
    }

    // Step 2: Claude API — parse line items
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Parse this restaurant receipt and return ONLY a JSON array.
Each item: { "name": string (max 4 words), "amount": number }
Include ONLY food and drink items.
EXCLUDE: tax, tip, subtotal, total, service charge, gratuity.
If no items found, return [].
Receipt text: ${rawText}`
        }]
      })
    });

    const claudeData = await claudeResponse.json();
    const responseText = claudeData.content[0]?.text || '[]';
    
    try {
      const clean = responseText.replace(/```json|```/g, '').trim();
      const items = JSON.parse(clean);
      return Response.json({ items });
    } catch {
      return Response.json({ items: [], error: 'Parse failed' });
    }
  }
};
```

---

## RevenueCat Products to Create

### App Store Connect (iOS)
```
Product 1:
  Reference name: SplitEasy Premium Monthly
  Product ID:     spliteasy_premium_monthly
  Type:           Auto-Renewable Subscription
  Price:          $3.49/month
  Free trial:     7 days

Product 2:
  Reference name: SplitEasy Premium Annual
  Product ID:     spliteasy_premium_annual
  Type:           Auto-Renewable Subscription
  Price:          $24.99/year
  Free trial:     7 days
```

### RevenueCat Dashboard
```
Entitlement:  "premium"
Products:     spliteasy_premium_monthly, spliteasy_premium_annual
Offering:     "default"
Packages:     $monthly, $annual (annual pre-selected in paywall)
```

---

## Firebase Indexes to Create

```
Collection: groups/{groupId}/expenses
Composite indexes:
  - createdAt DESC (for expense history)
  - category ASC + createdAt DESC (for filtered history)

Collection: groups/{groupId}/settlements
  - settledAt DESC

Collection: groups/{groupId}/recurring
  - nextDate ASC + active == true (for Firebase Function)
```

---

## Firebase Function — Recurring Auto-Add

```javascript
// functions/index.js
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addRecurringExpenses = onSchedule('0 9 1 * *', async () => {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();
  
  // Find all active recurring bills due today
  const snapshot = await db.collectionGroup('recurring')
    .where('active', '==', true)
    .where('nextDate', '<=', now)
    .get();

  const batch = db.batch();
  
  for (const doc of snapshot.docs) {
    const recurring = doc.data();
    const groupRef = doc.ref.parent.parent;
    
    // Create expense from template
    const expenseRef = groupRef.collection('expenses').doc();
    batch.set(expenseRef, {
      name: recurring.name,
      amount: recurring.amount,
      paidBy: recurring.paidBy || 'Auto',
      splits: recurring.splits,
      splitMethod: 'exact',
      category: 'recurring',
      date: now,
      createdAt: now,
      createdBy: 'system',
      isRecurring: true,
    });
    
    // Update nextDate (add 1 month)
    const nextDate = new Date(recurring.nextDate.toDate());
    nextDate.setMonth(nextDate.getMonth() + 1);
    batch.update(doc.ref, {
      nextDate: admin.firestore.Timestamp.fromDate(nextDate)
    });
  }
  
  await batch.commit();
});
```

---

## Week-by-Week Build Order

### Week 1 — Foundation
- [ ] Expo init + all dependencies installed
- [ ] Firebase project created (Auth, Firestore, Storage, Hosting)
- [ ] `.env` set up with all keys
- [ ] `settlement.ts` written + all 10 unit tests passing
- [ ] Folder structure created
- [ ] Navigation shell (all placeholder screens reachable)
- [ ] Theme colors + typography constants

### Week 2 — Onboarding
- [ ] Splash screen (purple bg, logo, animated dots)
- [ ] Welcome carousel (3 slides, custom SVG icons, dot indicator)
- [ ] Sign in (Apple required on iOS, Google, Email, "no account" mode)
- [ ] Create first group (name, emoji grid, member name inputs)
- [ ] Route: first launch → welcome → sign in → create group → home
- [ ] Route: returning user → home directly (AsyncStorage flag)

### Week 3 — Groups Home + Group Detail
- [ ] Groups home: free-plan badge, net balance hero card, group cards, 3-group limit lock, ad banner
- [ ] Free limits screen: usage bars, premium features list
- [ ] Group detail: member balances, settle up + nudge buttons, recent expenses
- [ ] Settle up flow: amount card, mark as received, confetti on zero balance
- [ ] Settlement algorithm integrated with real Firestore data

### Week 4 — Add Expense (Core — Protect the 3-tap flow)
- [ ] Add expense: large amount numpad, category picker, paid-by selector
- [ ] Equal split: member checkboxes, real-time preview ("Each owes $60.00")
- [ ] Exact split: per-person inputs, validates sum = total
- [ ] Percentage split: sliders, auto-adjust to 100%
- [ ] Itemized split: line items, assign members per item
- [ ] Save: Firestore write, optimistic UI, "Expense saved" toast

### Week 5 — Balances + Activity
- [ ] Balances tab: net hero card, who owes you, you owe, per-group attribution
- [ ] Activity feed: chronological events, avatar rows, native ads (item 4)
- [ ] Expense history: search, category filter, date filter, native ads (item 8)
- [ ] Expense detail: full breakdown, per-person shares, edit/delete

### Week 6 — Sharing + Notifications
- [ ] Nudge sheet: pre-written message, copy + Messages deeplink
- [ ] Share summary: group balance image, multi-platform share
- [ ] CSV export (free feature — builds trust)
- [ ] Push notifications: expense added, settlement confirmed
- [ ] Notification permission prompt (pre-prompt before system dialog)

### Weeks 7–8 — Monetization
- [ ] AppLovin MAX: SDK init, all 4 ad units, ATT consent, mediation enabled
- [ ] Banner: groups home + group detail
- [ ] Interstitial: after settlement to $0 (2 second delay, frequency capped)
- [ ] Rewarded: PDF export + receipt scanner unlock
- [ ] Native: activity feed + history list
- [ ] RevenueCat: products in App Store Connect + Google Play
- [ ] Paywall screen: annual pre-selected, "Save 40%", feature list, 7-day trial
- [ ] 4 paywall variants: main, 4th-group, scanner, PDF
- [ ] `usePremium()` hook gating all premium content
- [ ] Sandbox testing: purchase → premium → cancel → free

### Weeks 9–10 — Premium Features
- [ ] Recurring bills: list, add form, pause/activate toggle
- [ ] Firebase Function: monthly auto-add cron job
- [ ] Receipt scanner: camera view, Cloudflare Worker call, item list
- [ ] Assign items: per-item member toggle, running per-person total
- [ ] Multi-currency: currency selector, Open Exchange Rates API, conversion display
- [ ] PDF report: expo-print HTML template, preview, share sheet

### Weeks 11–12 — Polish
- [ ] Confetti animation (react-native-reanimated) on full settlement
- [ ] Empty states: all 6 screens illustrated + actionable
- [ ] Skeleton loaders on all Firestore-dependent screens
- [ ] Optimistic UI on all saves
- [ ] Haptic feedback: expense save, settle, paywall dismiss
- [ ] Dark mode audit (all screens)
- [ ] 60fps scroll on all FlatList screens

### Weeks 13–14 — Testing + App Store Prep
- [ ] Settlement: test 10 complex scenarios with real group data
- [ ] Receipt scanner: 5 real restaurant receipts
- [ ] RevenueCat sandbox: purchase, cancel, restore on both platforms
- [ ] AppLovin MAX: all 4 ad formats on iPhone 14 + Samsung S21
- [ ] ATT: confirm shows BEFORE MAX initializes on iPhone
- [ ] Zero crashes in 2 hours of real use testing
- [ ] App Store screenshots: 6.7" + 5.5" iPhone
- [ ] App name: "SplitEasy — Bill Splitter & Tab"
- [ ] Keywords: `bill splitter,split expenses,group expenses,roommate expenses,travel expenses`
- [ ] TestFlight: 10 users across real friend groups

### Week 15 — Launch
- [ ] Submit App Store + Google Play
- [ ] Reddit: r/solotravel, r/college, r/personalfinance ("I built a simpler Splitwise")
- [ ] TikTok: film the confetti settlement moment ("My friend finally paid me back 🎉")
- [ ] ProductHunt: Tuesday launch
- [ ] App Store Search Ads: "bill splitter app", "split expenses", $10/day

---

## Beating Splitwise Checklist

When every box is checked, SplitEasy ships:

- [ ] Expense added in 3 taps (Splitwise: 7+)
- [ ] Zero account required for group members (Splitwise: mandatory)
- [ ] AI receipt scanner (Splitwise: none)
- [ ] Recurring auto-add (Splitwise: manual only)
- [ ] Settlement confetti (Splitwise: none)
- [ ] Multi-currency at live rates (Splitwise: premium only, more expensive)
- [ ] PDF export at $24.99/yr (Splitwise: $39.99/yr — 37% cheaper)
- [ ] Nudge one-tap copy (Splitwise: manual navigation)
- [ ] "No account" mode (Splitwise: not available)
- [ ] Response <500ms on all interactions

---

## Revenue Projections

| Month | MAU | Ad eCPM | Ad Revenue | Premium (2%) | Monthly Total |
|---|---|---|---|---|---|
| 1 | 400 | $9 | $30 | $20 | $50 |
| 3 | 3,000 | $10 | $250 | $150 | $400 |
| 6 | 14,000 | $10 | $1,200 | $700 | $1,900 |
| 9 | 30,000 | $11 | $2,800 | $1,500 | $4,300 |
| 12 | 52,000 | $11 | $5,000 | $2,900 | $7,900 |

Revenue spikes: Memorial Day, July 4th, Labor Day, Spring Break, Thanksgiving.
Target TikTok campaigns 2 weeks before each travel holiday.

---

*SplitEasy Project Starter v1.0*
*32 screens · 15 weeks to launch · Built to beat Splitwise*
*Start with settlement.ts. Test it. Then build everything else.*
