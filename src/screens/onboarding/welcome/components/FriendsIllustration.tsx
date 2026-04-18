import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { AVATAR_SIZE, illustStyles } from '../styles';

const FRIENDS: { label: string; color: string }[] = [
  { label: 'J', color: '#7C75D8' },
  { label: 'M', color: '#4B44B8' },
  { label: 'S', color: '#3730A3' },
];

const AVATAR_GAP = 16;
const TOTAL_ROW_WIDTH =
  FRIENDS.length * AVATAR_SIZE + (FRIENDS.length - 1) * AVATAR_GAP;

export const FriendsIllustration = (): React.JSX.Element => (
  <View style={illustStyles.wrapper}>
    {/* Avatar row — gap:16, no overlap */}
    <View style={[illustStyles.avatarRow, styles.avatarRow]}>
      {FRIENDS.map(({ label, color }) => (
        <View
          key={label}
          style={[
            illustStyles.avatar,
            styles.avatar,
            { backgroundColor: color },
          ]}
        >
          <Text style={styles.avatarLabel}>{label}</Text>
        </View>
      ))}
    </View>

    {/* Divider */}
    <View style={[illustStyles.dividerLine, { width: TOTAL_ROW_WIDTH }]} />

    {/* Badge */}
    <View style={styles.badge}>
      <View style={styles.badgeDot} />
      <Text style={styles.badgeText}>No account needed</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  avatarRow: {
    gap: AVATAR_GAP,
    alignItems: 'center',
    marginBottom: 0,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  avatarLabel: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[4],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    gap: spacing[2],
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: '#A5B4FC',
  },
  badgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: 'rgba(255,255,255,0.90)',
    letterSpacing: 0.2,
  },
});
