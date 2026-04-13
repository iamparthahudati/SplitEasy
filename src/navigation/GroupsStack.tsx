import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { GroupsStackParamList } from './types';
import { CustomHeader } from '../components/ui/CustomHeader';

import { GroupsHomeScreen } from '../screens/groups/GroupsHomeScreen';
import { GroupDetailScreen } from '../screens/groups/GroupDetailScreen';
import { AddExpenseScreen } from '../screens/groups/AddExpenseScreen';
import { ExpenseDetailScreen } from '../screens/groups/ExpenseDetailScreen';
import { EditExpenseScreen } from '../screens/groups/EditExpenseScreen';
import { SettleUpScreen } from '../screens/groups/SettleUpScreen';
import { ActivityFeedScreen } from '../screens/groups/ActivityFeedScreen';
import { GroupSettingsScreen } from '../screens/groups/GroupSettingsScreen';
import { AddMemberScreen } from '../screens/groups/AddMemberScreen';
import { ExportPDFScreen } from '../screens/groups/ExportPDFScreen';

const Stack = createNativeStackNavigator<GroupsStackParamList>();

export function GroupsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        header: ({ navigation, options, back }) => (
          <CustomHeader
            title={options.title ?? ''}
            showBack={!!back}
            onBack={navigation.goBack}
            safeAreaTop
          />
        ),
      }}
    >
      <Stack.Screen name="GroupsHome" component={GroupsHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GroupDetail" component={GroupDetailScreen} options={{ title: 'Group' }} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} options={{ title: 'Expense' }} />
      <Stack.Screen name="EditExpense" component={EditExpenseScreen} options={{ title: 'Edit Expense' }} />
      <Stack.Screen name="SettleUp" component={SettleUpScreen} options={{ title: 'Settle Up' }} />
      <Stack.Screen name="ActivityFeed" component={ActivityFeedScreen} options={{ title: 'Activity' }} />
      <Stack.Screen name="GroupSettings" component={GroupSettingsScreen} options={{ title: 'Group Settings' }} />
      <Stack.Screen name="AddMember" component={AddMemberScreen} options={{ title: 'Add Member' }} />
      <Stack.Screen name="ExportPDF" component={ExportPDFScreen} options={{ title: 'Export PDF' }} />
    </Stack.Navigator>
  );
}
