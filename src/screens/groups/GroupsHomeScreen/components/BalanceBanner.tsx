import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// Simulated gradient using two stacked Views
const BANNER_TOP = '#2D9B6F';
const BANNER_BOTTOM = '#1A7A52';

interface BalanceBannerProps {
  amount: string;
  onSettleAll: () => void;
}

export function BalanceBanner({ amount, onSettleAll }: BalanceBannerProps) {
  return (
    <View style={styles.outer}>
      {/* Gradient simulation: top color base + bottom overlay */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: BANNER_TOP, borderRadius: 16 },
        ]}
      />
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
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 100,
  },
  gradientOverlay: {
    borderRadius: 16,
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
    gap: 4,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.5,
  },
  settleBtn: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2] + 2,
  },
  settleBtnText: {
    color: '#FFFFFF',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
  },
});
