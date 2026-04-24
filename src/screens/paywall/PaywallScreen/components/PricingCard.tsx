import React, { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  savingsBadge?: string;
  selected: boolean;
  onPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingCard({
  planName,
  price,
  period,
  savingsBadge,
  selected,
  onPress,
}: PricingCardProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardSelected : styles.cardDefault,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${planName} plan, ${price} ${period}`}
      accessibilityState={{ selected }}
    >
      {/* Savings badge — top-right */}
      {savingsBadge != null && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{savingsBadge}</Text>
        </View>
      )}

      {/* Plan name */}
      <Text style={styles.planName}>{planName}</Text>

      {/* Price */}
      <Text style={styles.price}>{price}</Text>

      {/* Period */}
      <Text style={styles.period}>{period}</Text>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing[4],
    borderWidth: 1.5,
    position: 'relative',
    overflow: 'hidden',
  },
  cardDefault: {
    borderColor: colors.borderMid,
  },
  cardSelected: {
    borderColor: colors.brand,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.85,
  },
  badge: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    backgroundColor: colors.brand,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.white,
    letterSpacing: 0.2,
  },
  planName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    marginBottom: spacing[1],
    marginTop: spacing[1],
  },
  price: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.brand,
    marginBottom: 2,
  },
  period: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
});
