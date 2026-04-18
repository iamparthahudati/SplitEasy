import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes } from '../../../../theme/typography';

interface RecentExpenseRowProps {
  icon: string;
  name: string;
  paidBy: string;
  date: string;
  amount: number;
  onPress: () => void;
}

export const RecentExpenseRow = ({
  icon,
  name,
  paidBy,
  date,
  amount,
  onPress,
}: RecentExpenseRowProps) => {
  const isPositive = amount >= 0;
  const amountColor = isPositive ? '#16A34A' : '#DC2626';
  const amountLabel = isPositive
    ? `+$${Math.abs(amount).toFixed(2)}`
    : `-$${Math.abs(amount).toFixed(2)}`;

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
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
          {amountLabel}
        </Text>
      </TouchableOpacity>

      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: '#F2F3F7',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  iconText: {
    fontSize: fontSizes.lg,
    color: '#FFFFFF',
  },
  info: {
    flex: 1,
    marginRight: spacing[2],
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text1,
    marginBottom: 2,
  },
  meta: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.text3,
  },
  amount: {
    fontSize: fontSizes.base,
    fontWeight: '600',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E8F0',
    marginLeft: spacing[4] + 44 + spacing[3],
    marginRight: spacing[4],
  },
});
