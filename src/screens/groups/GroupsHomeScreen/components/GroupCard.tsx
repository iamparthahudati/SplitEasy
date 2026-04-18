import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface GroupCardProps {
  emoji: string;
  color: string;
  name: string;
  subtitle: string;
  balance: number;
  onPress: () => void;
}

export const GroupCard = ({
  emoji,
  color,
  name,
  subtitle,
  balance,
  onPress,
}: GroupCardProps) => {
  const renderBadge = () => {
    if (balance > 0) {
      return (
        <View style={styles.badgePositive}>
          <Text style={styles.badgeTextPositive}>+${balance.toFixed(2)}</Text>
        </View>
      );
    }
    if (balance < 0) {
      return (
        <View style={styles.badgeNegative}>
          <Text style={styles.badgeTextNegative}>
            -${Math.abs(balance).toFixed(2)}
          </Text>
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  pressed: {
    backgroundColor: '#F8FAFC',
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
    fontWeight: String(fontWeights.bold) as '700',
    color: '#0F172A',
    letterSpacing: -0.1,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: String(fontWeights.regular) as '400',
    color: '#64748B',
  },
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  badgePositive: {
    backgroundColor: '#DCFCE7',
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextPositive: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.semibold) as '600',
    color: '#16A34A',
  },
  badgeNegative: {
    backgroundColor: '#FEE2E2',
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextNegative: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.semibold) as '600',
    color: '#DC2626',
  },
  badgeSettled: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: 'transparent',
  },
  badgeTextSettled: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: '#94A3B8',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E8F0',
    marginLeft: 48 + spacing[3] + spacing[4],
  },
});
