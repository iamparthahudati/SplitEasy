import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';

// ─── Param Lists ──────────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  CreateGroup: undefined;
  NotificationPrompt: undefined;
};

export type MainTabsParamList = {
  GroupsTab: NavigatorScreenParams<GroupsStackParamList>;
  Balances: undefined;
  Activity: undefined;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

export type GroupsStackParamList = {
  GroupsHome: undefined;
  GroupDetail: { groupId: string };
  AddExpense: { groupId: string };
  ExpenseDetail: { expenseId: string; groupId: string };
  EditExpense: { expenseId: string; groupId: string };
  SettleUp: { groupId: string };
  ActivityFeed: { groupId: string };
  GroupSettings: { groupId: string };
  AddMember: { groupId: string };
  ExportPDF: { groupId: string };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  Profile: undefined;
  DefaultCurrency: undefined;
  Notifications: undefined;
  About: undefined;
};

// ─── Screen Props Helpers ─────────────────────────────────────────────────────

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> =
  NativeStackScreenProps<OnboardingStackParamList, T>;

export type GroupsStackScreenProps<T extends keyof GroupsStackParamList> =
  NativeStackScreenProps<GroupsStackParamList, T>;

export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
  NativeStackScreenProps<SettingsStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabsParamList> =
  BottomTabScreenProps<MainTabsParamList, T>;
