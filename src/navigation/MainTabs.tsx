import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActivityScreen } from '../screens/activity/ActivityScreen';
import { BalancesScreen } from '../screens/balances/BalancesScreen';
import { colors } from '../theme/colors';
import { sizes } from '../theme/spacing';
import { fontSizes, fontWeights } from '../theme/typography';
import { GroupsStack } from './GroupsStack';
import { SettingsStack } from './SettingsStack';
import type { MainTabsParamList } from './types';

const Tab = createBottomTabNavigator<MainTabsParamList>();

// ─── Tab Icon: Groups ─────────────────────────────────────────────────────────
// Three overlapping circles — represents a group of people

function GroupsIcon({ active }: { active: boolean }) {
  const fill = active ? colors.brand : colors.text4;
  return (
    <View style={iconStyles.groupsRow}>
      <View
        style={[
          iconStyles.groupsCircleSm,
          { backgroundColor: fill, opacity: active ? 0.6 : 0.5 },
        ]}
      />
      <View
        style={[
          iconStyles.groupsCircleLg,
          { backgroundColor: fill, marginLeft: -5, zIndex: 1 },
        ]}
      />
      <View
        style={[
          iconStyles.groupsCircleSm,
          {
            backgroundColor: fill,
            marginLeft: -5,
            opacity: active ? 0.6 : 0.5,
          },
        ]}
      />
    </View>
  );
}

// ─── Tab Icon: Balances ───────────────────────────────────────────────────────
// A horizontal beam with two hanging pans — balance scale

function BalancesIcon({ active }: { active: boolean }) {
  const fill = active ? colors.brand : colors.text4;
  return (
    <View style={iconStyles.balanceWrap}>
      {/* Fulcrum pole */}
      <View style={[iconStyles.balancePole, { backgroundColor: fill }]} />
      {/* Horizontal beam */}
      <View style={[iconStyles.balanceBeam, { backgroundColor: fill }]} />
      {/* Left wire + pan */}
      <View style={iconStyles.balanceSide}>
        <View style={[iconStyles.balanceWire, { backgroundColor: fill }]} />
        <View style={[iconStyles.balancePan, { borderColor: fill }]} />
      </View>
      {/* Right wire + pan */}
      <View style={[iconStyles.balanceSide, iconStyles.balanceSideRight]}>
        <View style={[iconStyles.balanceWire, { backgroundColor: fill }]} />
        <View style={[iconStyles.balancePan, { borderColor: fill }]} />
      </View>
    </View>
  );
}

// ─── Tab Icon: Activity ───────────────────────────────────────────────────────
// Three horizontal lines of decreasing width — list / feed

function ActivityIcon({ active }: { active: boolean }) {
  const fill = active ? colors.brand : colors.text4;
  return (
    <View style={iconStyles.actWrap}>
      <View
        style={[iconStyles.actLine, { backgroundColor: fill, width: 18 }]}
      />
      <View
        style={[iconStyles.actLine, { backgroundColor: fill, width: 14 }]}
      />
      <View
        style={[iconStyles.actLine, { backgroundColor: fill, width: 10 }]}
      />
    </View>
  );
}

// ─── Tab Icon: Settings ───────────────────────────────────────────────────────
// A circle with four small satellite dots — gear suggestion

function SettingsIcon({ active }: { active: boolean }) {
  const fill = active ? colors.brand : colors.text4;
  return (
    <View style={iconStyles.settingsWrap}>
      {/* Center circle */}
      <View style={[iconStyles.settingsCenter, { backgroundColor: fill }]} />
      {/* Four satellite dots */}
      <View
        style={[
          iconStyles.settingsDot,
          iconStyles.settingsDotTop,
          { backgroundColor: fill },
        ]}
      />
      <View
        style={[
          iconStyles.settingsDot,
          iconStyles.settingsDotBottom,
          { backgroundColor: fill },
        ]}
      />
      <View
        style={[
          iconStyles.settingsDot,
          iconStyles.settingsDotLeft,
          { backgroundColor: fill },
        ]}
      />
      <View
        style={[
          iconStyles.settingsDot,
          iconStyles.settingsDotRight,
          { backgroundColor: fill },
        ]}
      />
    </View>
  );
}

// ─── Icon StyleSheet ──────────────────────────────────────────────────────────

const iconStyles = StyleSheet.create({
  // Groups
  groupsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 26,
    height: 18,
  },
  groupsCircleSm: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  groupsCircleLg: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  // Balances
  balanceWrap: {
    width: 22,
    height: 20,
    alignItems: 'center',
    position: 'relative',
  },
  balancePole: {
    position: 'absolute',
    bottom: 0,
    width: 2,
    height: 10,
    borderRadius: 1,
  },
  balanceBeam: {
    position: 'absolute',
    top: 2,
    width: 22,
    height: 2,
    borderRadius: 1,
  },
  balanceSide: {
    position: 'absolute',
    top: 4,
    left: 0,
    alignItems: 'center',
  },
  balanceSideRight: {
    left: undefined,
    right: 0,
  },
  balanceWire: {
    width: 1.5,
    height: 6,
    borderRadius: 1,
  },
  balancePan: {
    width: 8,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },

  // Activity
  actWrap: {
    gap: 4,
    alignItems: 'flex-start',
  },
  actLine: {
    height: 2.5,
    borderRadius: 2,
  },

  // Settings
  settingsWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  settingsCenter: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  settingsDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  settingsDotTop: { top: 0, left: 8 },
  settingsDotBottom: { bottom: 0, left: 8 },
  settingsDotLeft: { left: 0, top: 8 },
  settingsDotRight: { right: 0, top: 8 },
});

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TAB_LABELS: Record<keyof MainTabsParamList, string> = {
  GroupsTab: 'Groups',
  Balances: 'Balances',
  Activity: 'Activity',
  SettingsTab: 'Settings',
};

// ─── Main Tabs Navigator ──────────────────────────────────────────────────────

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const label = TAB_LABELS[route.name as keyof MainTabsParamList];
        return {
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.brand,
          tabBarInactiveTintColor: colors.text4,
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabLabel, { color }]}>{label}</Text>
          ),
          tabBarIcon: ({ focused }) => {
            const name = route.name as keyof MainTabsParamList;
            return (
              <View style={styles.iconWrap}>
                {focused && <View style={styles.activeDot} />}
                {name === 'GroupsTab' && <GroupsIcon active={focused} />}
                {name === 'Balances' && <BalancesIcon active={focused} />}
                {name === 'Activity' && <ActivityIcon active={focused} />}
                {name === 'SettingsTab' && <SettingsIcon active={focused} />}
              </View>
            );
          },
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

// ─── Tab Bar Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tabBar: {
    height: sizes.tabBarHeight,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 0,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.brand,
    position: 'absolute',
    top: 0,
  },
  tabLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium as any,
    marginBottom: 4,
  },
});
