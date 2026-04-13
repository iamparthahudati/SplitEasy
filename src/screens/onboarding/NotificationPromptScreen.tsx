import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { spacing, radius, sizes } from '../../theme/spacing';
import { useNavigation } from '../../navigation/NavigationContext';

const NOTIFICATION_BENEFITS = [
  { icon: '💰', text: 'Know when someone settles up' },
  { icon: '➕', text: 'See new expenses as they\'re added' },
  { icon: '👋', text: 'Get nudged when a balance is overdue' },
];

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
        <Text style={styles.bell}>🔔</Text>
        <Text style={styles.heading}>Stay in the loop</Text>
        <Text style={styles.sub}>
          Enable notifications so you always know what's happening with your money.
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing[8],
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[6],
    paddingBottom: spacing[8],
    alignItems: 'center',
  },
  bell: {
    fontSize: 56,
    marginBottom: spacing[4],
  },
  heading: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as any,
    color: colors.text1,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  sub: {
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing[6],
  },
  benefitsList: {
    alignSelf: 'stretch',
    marginBottom: spacing[6],
    gap: spacing[4],
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  benefitIcon: {
    fontSize: fontSizes.lg,
    width: 28,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: fontSizes.base,
    color: colors.text2,
    fontWeight: fontWeights.medium as any,
    flex: 1,
  },
  enableBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  enableText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
  },
  laterBtn: {
    paddingVertical: spacing[3],
  },
  laterText: {
    fontSize: fontSizes.base,
    color: colors.text4,
  },
});
