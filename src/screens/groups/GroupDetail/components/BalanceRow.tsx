import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';
import { formatBalance } from '../../../../utils/formatters';

interface BalanceRowProps {
  initials: string;
  avatarColor: string;
  name: string;
  relation: string;
  balance: number;
  onSettle: () => void;
}

export function BalanceRow({
  initials,
  avatarColor,
  name,
  relation,
  balance,
  onSettle,
}: BalanceRowProps) {
  const isPositive = balance > 0;
  const isZero = balance === 0;

  const badgeStyle = isPositive
    ? styles.badgePositive
    : isZero
    ? styles.badgeZero
    : styles.badgeNegative;

  const badgeTextStyle = isPositive
    ? styles.badgeTextPositive
    : isZero
    ? styles.badgeTextZero
    : styles.badgeTextNegative;

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
          {relation.length > 0 && (
            <Text style={styles.relation} numberOfLines={1}>
              {relation}
            </Text>
          )}
        </View>

        {/* Right side */}
        <View style={styles.right}>
          {/* Amount badge */}
          <View style={[styles.amountBadge, badgeStyle]}>
            <Text style={[styles.amountText, badgeTextStyle]}>
              {formatBalance(balance)}
            </Text>
          </View>

          {/* Settle button or Settled label */}
          {isZero ? (
            <Text style={styles.settledText}>Settled</Text>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.settleButton,
                pressed && styles.settleButtonPressed,
              ]}
              onPress={onSettle}
            >
              <Text style={styles.settleButtonText}>Settle</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />
    </View>
  );
}

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
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  initials: {
    color: colors.white,
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
    fontSize: fontSizes.base + 1,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: 2,
  },
  relation: {
    fontSize: fontSizes.sm + 1,
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
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1] + 2,
  },
  amountText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  badgePositive: {
    backgroundColor: colors.posBgAlt,
  },
  badgeTextPositive: {
    color: colors.posAlt,
  },
  badgeNegative: {
    backgroundColor: colors.negBg,
  },
  badgeTextNegative: {
    color: colors.neg,
  },
  badgeZero: {
    backgroundColor: colors.border,
  },
  badgeTextZero: {
    color: colors.text3,
  },
  settleButton: {
    backgroundColor: colors.settleGreen,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3] + 2,
    paddingVertical: spacing[2],
  },
  settleButtonPressed: {
    opacity: 0.8,
  },
  settleButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm + 1,
    fontWeight: fontWeights.semibold,
  },
  settledText: {
    fontSize: fontSizes.sm + 1,
    fontWeight: fontWeights.medium,
    color: colors.text3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: 44 + spacing[3] + spacing[4],
  },
});
