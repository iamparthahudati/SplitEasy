import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toggle from '../../../components/atoms/Toggle';
import { ListRow } from '../../../components/molecules/ListRow';
import { ScreenHeader } from '../../../components/molecules/ScreenHeader';
import { useNavigation } from '../../../navigation/NavigationContext';
import styles from './styles';

interface NotificationState {
  newExpenses: boolean;
  settlements: boolean;
  reminders: boolean;
  weeklySummary: boolean;
  marketing: boolean;
}

type NotificationKey = keyof NotificationState;

interface NotificationItem {
  key: NotificationKey;
  title: string;
  subtitle: string;
}

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    key: 'newExpenses',
    title: 'New Expenses',
    subtitle: 'Get notified when a new expense is added',
  },
  {
    key: 'settlements',
    title: 'Settlements',
    subtitle: 'When someone settles up with you',
  },
  {
    key: 'reminders',
    title: 'Reminders',
    subtitle: 'Gentle nudges for unpaid balances',
  },
  {
    key: 'weeklySummary',
    title: 'Weekly Summary',
    subtitle: 'A weekly overview of your spending',
  },
  {
    key: 'marketing',
    title: 'Marketing',
    subtitle: 'Tips, updates and offers from SplitEasy',
  },
];

export function NotificationsScreen() {
  const { goBack } = useNavigation();

  const [prefs, setPrefs] = useState<NotificationState>({
    newExpenses: true,
    settlements: true,
    reminders: true,
    weeklySummary: false,
    marketing: false,
  });

  const toggle = (key: NotificationKey) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <ScreenHeader title="Notifications" onBack={goBack} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {NOTIFICATION_ITEMS.map(item => (
            <ListRow
              key={item.key}
              title={item.title}
              subtitle={item.subtitle}
              showChevron={false}
              rightElement={
                <Toggle
                  value={prefs[item.key]}
                  onValueChange={() => toggle(item.key)}
                />
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
