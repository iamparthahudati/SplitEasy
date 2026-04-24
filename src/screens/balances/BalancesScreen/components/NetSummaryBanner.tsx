import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AmountDisplay } from '../../../../components/molecules/AmountDisplay';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NetSummaryBannerProps {
  owedToYou: number;
  youOwe: number;
  currency?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NetSummaryBanner({
  owedToYou,
  youOwe,
  currency = 'USD',
}: NetSummaryBannerProps) {
  return (
    <View style={styles.card}>
      {/* Left column — owed to you */}
      <View style={styles.column}>
        <Text style={styles.label}>Owed to you</Text>
        <AmountDisplay
          amount={owedToYou}
          currency={currency}
          size="md"
          style={styles.amount}
        />
      </View>

      {/* Vertical divider */}
      <View style={styles.divider} />

      {/* Right column — you owe */}
      <View style={styles.column}>
        <Text style={styles.label}>You owe</Text>
        <AmountDisplay
          amount={-youOwe}
          currency={currency}
          size="md"
          style={styles.amount}
        />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing[4],
    marginBottom: spacing[3],
    overflow: 'hidden',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[3],
    gap: spacing[1],
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing[3],
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text3,
    letterSpacing: 0.1,
  },
  amount: {
    marginTop: spacing[1],
  },
});
