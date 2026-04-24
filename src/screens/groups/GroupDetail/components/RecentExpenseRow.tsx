import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { formatBalance } from '../../../../utils/formatters';

interface RecentExpenseRowProps {
  icon: string;
  name: string;
  paidBy: string;
  date: string;
  amount: number;
  onPress: () => void;
}

export function RecentExpenseRow({
  icon,
  name,
  paidBy,
  date,
  amount,
  onPress,
}: RecentExpenseRowProps) {
  const isPositive = amount >= 0;
  const amountColor = isPositive ? colors.posAlt : colors.neg;

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.04)' }}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {`Paid by ${paidBy} · ${date}`}
          </Text>
        </View>

        <Text style={[styles.amount, { color: amountColor }]}>
          {formatBalance(amount)}
        </Text>
      </Pressable>

      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.white,
  },
  rowPressed: {
    backgroundColor: colors.bg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.heroIndigoBright,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  iconText: {
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  info: {
    flex: 1,
    marginRight: spacing[2],
  },
  name: {
    fontSize: fontSizes.base + 1,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: 2,
  },
  meta: {
    fontSize: fontSizes.sm + 1,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  amount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: spacing[4] + 44 + spacing[3],
    marginRight: spacing[4],
  },
});
