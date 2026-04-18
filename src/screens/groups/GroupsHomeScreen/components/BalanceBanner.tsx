import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// Settle-green tokens (Phase 1 additions, fallback to hex until colors.ts is updated)
const BANNER_TOP = colors.settleGreen ?? '#2D9B6F';
const BANNER_BOTTOM = colors.settleGreenDark ?? '#1A7A52';

interface BalanceBannerProps {
  amount: string;
  onSettleAll: () => void;
}

export function BalanceBanner({ amount, onSettleAll }: BalanceBannerProps) {
  return (
    <View style={styles.outer}>
      {/* Gradient simulation: top color base + bottom overlay */}
      <View style={[StyleSheet.absoluteFill, styles.gradientTop]} />
      <View style={[StyleSheet.absoluteFill, styles.gradientOverlay]} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.label}>You are owed</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        <Pressable style={styles.settleBtn} onPress={onSettleAll}>
          <Text style={styles.settleBtnText}>Settle all</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[3],
    borderRadius: radius.lg,
    overflow: 'hidden',
    minHeight: 100,
  },
  gradientTop: {
    borderRadius: radius.lg,
    backgroundColor: BANNER_TOP,
  },
  gradientOverlay: {
    borderRadius: radius.lg,
    backgroundColor: BANNER_BOTTOM,
    opacity: 0.55,
    top: '40%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[5],
  },
  left: {
    gap: spacing[1],
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
  },
  amount: {
    color: colors.white,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: -0.5,
  },
  settleBtn: {
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2] + 2,
  },
  settleBtnText: {
    color: colors.white,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
  },
});
