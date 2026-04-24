import React, { createContext, useCallback, useContext, useState } from 'react';

// ─── Route Definitions ────────────────────────────────────────────────────────

export type AuthRoute =
  | 'Splash'
  | 'Welcome'
  | 'SignIn'
  | 'CreateGroup'
  | 'NotificationPrompt';

export type MainTabRoute = 'Groups' | 'Balances' | 'Activity' | 'Settings';

export type GroupRoute =
  | 'GroupDetail'
  | 'AddExpense'
  | 'ExpenseDetail'
  | 'EditExpense'
  | 'SettleUp'
  | 'ActivityFeed'
  | 'GroupSettings'
  | 'AddMember'
  | 'ExportPDF'
  | 'BalanceDetail';

export type PremiumRoute = 'Paywall' | 'FreeLimits' | 'PremiumFeatures';

export type SettingsRoute =
  | 'SettingsHome'
  | 'Profile'
  | 'DefaultCurrency'
  | 'Notifications'
  | 'About';

export type ScreenName =
  | AuthRoute
  | MainTabRoute
  | GroupRoute
  | PremiumRoute
  | SettingsRoute;

export interface NavParams {
  groupId?: string;
  expenseId?: string;
  memberId?: string;
  personId?: string;
}

interface NavEntry {
  screen: ScreenName;
  params?: NavParams;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface NavigationContextValue {
  currentScreen: ScreenName;
  currentParams: NavParams;
  activeTab: MainTabRoute;
  stack: NavEntry[];
  navigate: (screen: ScreenName, params?: NavParams) => void;
  goBack: () => void;
  reset: (screen: ScreenName, params?: NavParams) => void;
  setTab: (tab: MainTabRoute) => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface NavigationProviderProps {
  children: React.ReactNode;
  initialScreen?: ScreenName;
}

export function NavigationProvider({
  children,
  initialScreen = 'Splash',
}: NavigationProviderProps) {
  const [stack, setStack] = useState<NavEntry[]>([{ screen: initialScreen }]);
  const [activeTab, setActiveTab] = useState<MainTabRoute>('Groups');

  const currentEntry = stack[stack.length - 1];

  const navigate = useCallback((screen: ScreenName, params?: NavParams) => {
    setStack(prev => [...prev, { screen, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const reset = useCallback((screen: ScreenName, params?: NavParams) => {
    setStack([{ screen, params }]);
  }, []);

  const setTab = useCallback((tab: MainTabRoute) => {
    setActiveTab(tab);
    // Reset to a clean single-entry stack for the selected tab
    setStack([{ screen: tab }]);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: currentEntry.screen,
        currentParams: currentEntry.params ?? {},
        activeTab,
        stack,
        navigate,
        goBack,
        reset,
        setTab,
        canGoBack: stack.length > 1,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used inside <NavigationProvider>');
  }
  return ctx;
}
