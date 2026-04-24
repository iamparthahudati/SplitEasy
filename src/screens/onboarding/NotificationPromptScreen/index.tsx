import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useNavigation } from '../../../navigation/NavigationContext';

import styles from './styles';

const NOTIFICATION_BENEFITS = [
  { icon: '💰', text: 'Know when someone settles up' },
  { icon: '➕', text: "See new expenses as they're added" },
  { icon: '👋', text: 'Get nudged when a balance is overdue' },
];

function BellIcon() {
  return (
    <View style={styles.bellCircle}>
      <Text style={styles.bellGlyph}>🔔</Text>
    </View>
  );
}

export function NotificationPromptScreen() {
  const { reset } = useNavigation();

  const handleEnable = async () => {
    try {
      // TODO: call Notifications.requestPermissionsAsync()
      // const { status } = await Notifications.requestPermissionsAsync();
      // store result to AsyncStorage
    } catch {}
    reset('Groups');
  };

  const handleNotNow = () => {
    // TODO: AsyncStorage.setItem('notifDismissed', 'true')
    reset('Groups');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <BellIcon />

        <Text style={styles.heading}>Stay in the loop</Text>
        <Text style={styles.progress}>2 of 2</Text>

        <Text style={styles.sub}>
          Enable notifications so you always know what's happening with your
          money.
        </Text>

        <View style={styles.benefitsList}>
          {NOTIFICATION_BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.enableBtn} onPress={handleEnable}>
          <Text style={styles.enableText}>Enable Notifications</Text>
        </Pressable>

        <Pressable style={styles.laterBtn} onPress={handleNotNow} hitSlop={12}>
          <Text style={styles.laterText}>Not now</Text>
        </Pressable>
      </View>
    </View>
  );
}
