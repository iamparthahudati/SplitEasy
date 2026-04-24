import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Icon, { IconName } from '../components/atoms/Icon/index';
import { colors } from '../theme/colors';
import { sizes, spacing } from '../theme/spacing';
import { fontSizes, fontWeights } from '../theme/typography';
import { MainTabRoute, useNavigation } from './NavigationContext';

// Tab screens
import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { BalancesScreen } from '../screens/balances/BalancesScreen';
import { GroupsHomeScreen } from '../screens/groups/GroupsHomeScreen/index';
import { SettingsHomeScreen } from '../screens/settings/SettingsHomeScreen';

type TabDef = {
  route: MainTabRoute;
  label: string;
  icon: IconName;
  activeIcon: IconName;
};

const TABS: TabDef[] = [
  { route: 'Groups', label: 'Groups', icon: 'home', activeIcon: 'home' },
  {
    route: 'Balances',
    label: 'Balances',
    icon: 'bar-chart',
    activeIcon: 'bar-chart',
  },
  {
    route: 'Activity',
    label: 'Activity',
    icon: 'activity',
    activeIcon: 'activity',
  },
  {
    route: 'Settings',
    label: 'Settings',
    icon: 'settings',
    activeIcon: 'settings',
  },
];

function TabScreen({ route }: { route: MainTabRoute }): React.ReactElement {
  switch (route) {
    case 'Groups':
      return <GroupsHomeScreen />;
    case 'Balances':
      return <BalancesScreen />;
    case 'Activity':
      return <ActivityScreen />;
    case 'Settings':
      return <SettingsHomeScreen />;
    default: {
      // Exhaustiveness check — TypeScript will error here if a MainTabRoute case is unhandled above
      const _exhaustive: never = route;
      void _exhaustive;
      return <GroupsHomeScreen />;
    }
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
              {active && <View style={styles.activeIndicator} />}
              <Icon
                name={active ? tab.activeIcon : tab.icon}
                size={22}
                stroke={active ? colors.brand : colors.text4}
                fill="none"
              />
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {tab.label}
              </Text>
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
    // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // Android elevation
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing[1],
    position: 'relative',
  },
  tabLabel: {
    marginTop: 2,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text4,
  },
  tabLabelActive: {
    color: colors.brand,
    fontWeight: fontWeights.semibold,
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
