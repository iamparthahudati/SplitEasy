import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { SettingsStackParamList } from './types';
import { colors } from '../theme/colors';
import { fontWeights } from '../theme/typography';

import { SettingsHomeScreen } from '../screens/settings/SettingsHomeScreen';
import { ProfileScreen } from '../screens/settings/ProfileScreen';
import { DefaultCurrencyScreen } from '../screens/settings/DefaultCurrencyScreen';
import { NotificationsScreen } from '../screens/settings/NotificationsScreen';
import { AboutScreen } from '../screens/settings/AboutScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.brand,
        headerTitleStyle: { fontWeight: fontWeights.semibold as any, color: colors.text1 },
        headerShadowVisible: false,
        headerBackTitle: '',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="DefaultCurrency" component={DefaultCurrencyScreen} options={{ title: 'Default Currency' }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Stack.Navigator>
  );
}
