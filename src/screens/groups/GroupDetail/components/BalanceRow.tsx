import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface BalanceRowProps {
  initials: string;
  avatarColor: string;
  name: string;
  relation: string;
  balance: number;
  onSettle: () => void;
}

export const BalanceRow = ({
  initials,
  avatarColor,
  name,
  relation,
  balance,
  onSettle,
}: BalanceRowProps) => {
  const isPositive = balance > 0;
  const isZero = balance === 0;

  const amountBadgeStyle = isPositive
    ? { backgroundColor: '#DCFCE7' }
    : isZero
    ? { backgroundColor: '#F1F5F9' }
    : { backgroundColor: '#FEE2E2' };

  const amountTextStyle = isPositive
    ? { color: '#16A34A' }
    : isZero
    ? { color: colors.text3 }
    : { color: '#DC2626' };

  const formattedAmount = `${isPositive ? '+' : ''}$${Math.abs(balance).toFixed(
    2,
  )}`;

  return (
    <View>
      <View style={styles.row}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        {/* Name + Relation */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.relation} numberOfLines={1}>
            {relation}
          </Text>
        </View>

        {/* Right side */}
        <View style={styles.right}>
          {/* Amount badge */}
          <View style={[styles.amountBadge, amountBadgeStyle]}>
            <Text style={[styles.amountText, amountTextStyle]}>
              {formattedAmount}
            </Text>
          </View>

          {/* Settle button or Settled label */}
          {isZero ? (
            <Text style={styles.settledText}>Settled</Text>
          ) : (
            <TouchableOpacity
              style={styles.settleButton}
              onPress={onSettle}
              activeOpacity={0.8}
            >
              <Text style={styles.settleButtonText}>Settle</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initials: {
    color: '#FFFFFF',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
    marginLeft: spacing[3],
    marginRight: spacing[2],
  },
  name: {
    fontSize: 15,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: 2,
  },
  relation: {
    fontSize: 13,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    flexShrink: 0,
  },
  amountBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  amountText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  settleButton: {
    backgroundColor: '#2D9B6F',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  settleButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: fontWeights.semibold,
  },
  settledText: {
    fontSize: 13,
    fontWeight: fontWeights.medium,
    color: colors.text3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E2E8F0',
    marginLeft: 44 + spacing[3] + spacing[4],
  },
});
