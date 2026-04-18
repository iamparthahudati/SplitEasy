import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { formatBalance } from '../../../../utils/formatters';

// Phase 1 color tokens (fallback to hex until colors.ts is updated)
const COLOR_POS_ALT = colors.posAlt ?? '#16A34A';
const COLOR_POS_BG_ALT = colors.posBgAlt ?? '#DCFCE7';

interface GroupCardProps {
  emoji: string;
  color: string;
  name: string;
  subtitle: string;
  balance: number;
  onPress: () => void;
}

export function GroupCard({
  emoji,
  color,
  name,
  subtitle,
  balance,
  onPress,
}: GroupCardProps) {
  const renderBadge = () => {
    if (balance > 0) {
      return (
        <View style={styles.badgePositive}>
          <Text style={styles.badgeTextPositive}>{formatBalance(balance)}</Text>
        </View>
      );
    }
    if (balance < 0) {
      return (
        <View style={styles.badgeNegative}>
          <Text style={styles.badgeTextNegative}>{formatBalance(balance)}</Text>
        </View>
      );
    }
    return (
      <View style={styles.badgeSettled}>
        <Text style={styles.badgeTextSettled}>Settled</Text>
      </View>
    );
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.04)' }}
      >
        <View style={[styles.iconArea, { backgroundColor: color }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        <View style={styles.right}>{renderBadge()}</View>
      </Pressable>
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  pressed: {
    backgroundColor: colors.bg,
  },
  iconArea: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: {
    fontSize: fontSizes.xl,
    lineHeight: 28,
  },
  middle: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    letterSpacing: -0.1,
  },
  subtitle: {
    fontSize: fontSizes.sm + 1,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  badgePositive: {
    backgroundColor: COLOR_POS_BG_ALT,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextPositive: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: COLOR_POS_ALT,
  },
  badgeNegative: {
    backgroundColor: colors.negBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextNegative: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.neg,
  },
  badgeSettled: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
    borderWidth: 1,
    borderColor: colors.borderMid,
    backgroundColor: 'transparent',
  },
  badgeTextSettled: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.zero,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: 48 + spacing[3] + spacing[4],
  },
});
