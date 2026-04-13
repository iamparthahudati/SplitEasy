import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { MainTabsParamList } from './types';
import { GroupsStack } from './GroupsStack';
import { SettingsStack } from './SettingsStack';
import { BalancesScreen } from '../screens/balances/BalancesScreen';
import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { colors } from '../theme/colors';
import { fontSizes, fontWeights } from '../theme/typography';
import { sizes } from '../theme/spacing';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const TAB_CONFIG: Record<keyof MainTabsParamList, { icon: string; label: string }> = {
  GroupsTab:   { icon: '👥', label: 'Groups' },
  Balances:    { icon: '⚖️', label: 'Balances' },
  Activity:    { icon: '📋', label: 'Activity' },
  SettingsTab: { icon: '⚙️', label: 'Settings' },
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const cfg = TAB_CONFIG[route.name as keyof MainTabsParamList];
        return {
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.text4,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>{cfg?.label}</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              {focused && <View style={styles.activeBar} />}
              <Text style={styles.tabIcon}>{cfg?.icon}</Text>
            </View>
          ),
        };
      }}
    >
      <Tab.Screen name="GroupsTab" component={GroupsStack} />
      <Tab.Screen name="Balances" component={BalancesScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: sizes.tabBarHeight,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 0,
  },
  iconWrapper: {
    alignItems: 'center',
    paddingTop: 4,
  },
  activeBar: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.brand,
  },
  tabIcon: {
    fontSize: fontSizes.lg,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium as any,
    marginBottom: 4,
  },
});
