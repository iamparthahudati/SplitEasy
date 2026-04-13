import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { OnboardingStackParamList } from './types';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { SignInScreen } from '../screens/onboarding/SignInScreen';
import { CreateGroupScreen } from '../screens/onboarding/CreateGroupScreen';
import { NotificationPromptScreen } from '../screens/onboarding/NotificationPromptScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <Stack.Screen name="NotificationPrompt" component={NotificationPromptScreen} options={{ animation: 'slide_from_bottom' }} />
    </Stack.Navigator>
  );
}
