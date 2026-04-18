import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { sizes, spacing } from '../theme/spacing';
import { fontSizes, fontWeights } from '../theme/typography';
import { MainTabRoute, useNavigation } from './NavigationContext';

// Tab screens
import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { BalancesScreen } from '../screens/balances/BalancesScreen';
import { GroupsHomeScreen } from '../screens/groups/GroupsHomeScreen/index';
import { SettingsHomeScreen } from '../screens/settings/SettingsHomeScreen';

const TABS: Array<{ route: MainTabRoute; label: string; icon: string }> = [
  { route: 'Groups', label: 'Groups', icon: '⊞' },
  { route: 'Balances', label: 'Balances', icon: '⚖' },
  { route: 'Activity', label: 'Activity', icon: '◷' },
  { route: 'Settings', label: 'Settings', icon: '⚙' },
];

function TabScreen({ route }: { route: MainTabRoute }) {
  switch (route) {
    case 'Groups':
      return <GroupsHomeScreen />;
    case 'Balances':
      return <BalancesScreen />;
    case 'Activity':
      return <ActivityScreen />;
    case 'Settings':
      return <SettingsHomeScreen />;
  }
}

export function MainTabs() {
  const { activeTab, setTab } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.screenArea}>
        <TabScreen route={activeTab} />
      </View>
      <View style={styles.tabBar}>
        {TABS.map(tab => {
          const active = tab.route === activeTab;
          return (
            <Pressable
              key={tab.route}
              style={styles.tabItem}
              onPress={() => setTab(tab.route)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab.label}
              </Text>
              {active && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  screenArea: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: sizes.tabBarHeight,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing[1],
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing[1],
    position: 'relative',
  },
  tabIcon: {
    fontSize: fontSizes.lg,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium as any,
    color: colors.text4,
  },
  tabLabelActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold as any,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.brand,
  },
});
