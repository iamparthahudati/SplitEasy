import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { radius, spacing } from '../../theme/spacing';

type BadgeVariant = 'free' | 'premium' | 'pending' | 'positive' | 'negative';

interface Props {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const BG: Record<BadgeVariant, string> = {
  free: colors.pendBg,
  premium: colors.brandLight,
  pending: colors.pendBg,
  positive: colors.posBg,
  negative: colors.negBg,
};

const TEXT_COLOR: Record<BadgeVariant, string> = {
  free: colors.pend,
  premium: colors.brandDark,
  pending: colors.pend,
  positive: colors.posDark,
  negative: colors.negDark,
};

export function Badge({ label, variant = 'free', style }: Props) {
  return (
    <View style={[styles.pill, { backgroundColor: BG[variant] }, style]}>
      <Text style={[styles.text, { color: TEXT_COLOR[variant] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.pill,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as any,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
