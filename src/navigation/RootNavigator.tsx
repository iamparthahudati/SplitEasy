import React from 'react';

import { useNavigation } from './NavigationContext';

// Auth screens
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { SignInScreen } from '../screens/onboarding/SignInScreen';
import { CreateGroupScreen } from '../screens/onboarding/CreateGroupScreen';
import { NotificationPromptScreen } from '../screens/onboarding/NotificationPromptScreen';

// Main tabs
import { MainTabs } from './MainTabs';

// Group stack
import { GroupDetailScreen } from '../screens/groups/GroupDetailScreen';
import { AddExpenseScreen } from '../screens/groups/AddExpenseScreen';
import { ExpenseDetailScreen } from '../screens/groups/ExpenseDetailScreen';
import { EditExpenseScreen } from '../screens/groups/EditExpenseScreen';
import { SettleUpScreen } from '../screens/groups/SettleUpScreen';
import { ActivityFeedScreen } from '../screens/groups/ActivityFeedScreen';
import { GroupSettingsScreen } from '../screens/groups/GroupSettingsScreen';
import { AddMemberScreen } from '../screens/groups/AddMemberScreen';
import { ExportPDFScreen } from '../screens/groups/ExportPDFScreen';

// Premium screens
import { PaywallScreen } from '../screens/paywall/PaywallScreen';
import { FreeLimitsScreen } from '../screens/premium/FreeLimitsScreen';
import { PremiumFeaturesScreen } from '../screens/premium/PremiumFeaturesScreen';

// Settings screens
import { SettingsHomeScreen } from '../screens/settings/SettingsHomeScreen';
import { ProfileScreen } from '../screens/settings/ProfileScreen';
import { DefaultCurrencyScreen } from '../screens/settings/DefaultCurrencyScreen';
import { NotificationsScreen } from '../screens/settings/NotificationsScreen';
import { AboutScreen } from '../screens/settings/AboutScreen';

export function RootNavigator() {
  const { currentScreen } = useNavigation();

  switch (currentScreen) {
    // ── Auth ──────────────────────────────────────────────────────────────
    case 'Splash':              return <SplashScreen />;
    case 'Welcome':             return <WelcomeScreen />;
    case 'SignIn':              return <SignInScreen />;
    case 'CreateGroup':         return <CreateGroupScreen />;
    case 'NotificationPrompt':  return <NotificationPromptScreen />;

    // ── Main app (tabs) ────────────────────────────────────────────────
    case 'Groups':
    case 'Balances':
    case 'Activity':
    case 'Settings':            return <MainTabs />;

    // ── Group stack ────────────────────────────────────────────────────
    case 'GroupDetail':         return <GroupDetailScreen />;
    case 'AddExpense':          return <AddExpenseScreen />;
    case 'ExpenseDetail':       return <ExpenseDetailScreen />;
    case 'EditExpense':         return <EditExpenseScreen />;
    case 'SettleUp':            return <SettleUpScreen />;
    case 'ActivityFeed':        return <ActivityFeedScreen />;
    case 'GroupSettings':       return <GroupSettingsScreen />;
    case 'AddMember':           return <AddMemberScreen />;
    case 'ExportPDF':           return <ExportPDFScreen />;

    // ── Premium ────────────────────────────────────────────────────────
    case 'Paywall':             return <PaywallScreen />;
    case 'FreeLimits':          return <FreeLimitsScreen />;
    case 'PremiumFeatures':     return <PremiumFeaturesScreen />;

    // ── Settings (deep) ────────────────────────────────────────────────
    case 'SettingsHome':        return <SettingsHomeScreen />;
    case 'Profile':             return <ProfileScreen />;
    case 'DefaultCurrency':     return <DefaultCurrencyScreen />;
    case 'Notifications':       return <NotificationsScreen />;
    case 'About':               return <AboutScreen />;

    default:                    return <SplashScreen />;
  }
}
