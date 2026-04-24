import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { AmountDisplay } from '../../../../components/molecules/AmountDisplay';
import { Avatar } from '../../../../components/ui/Avatar';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonBalanceRowProps {
  name: string;
  groupCount: number;
  balance: number;
  currency?: string;
  onSettle: () => void;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PersonBalanceRow({
  name,
  groupCount,
  balance,
  currency = 'USD',
  onSettle,
  style,
}: PersonBalanceRowProps) {
  const groupLabel = groupCount === 1 ? '1 group' : `${groupCount} groups`;

  return (
    <View style={[styles.row, style]}>
      {/* Avatar */}
      <Avatar name={name} size="md" style={styles.avatar} />

      {/* Name + subtitle */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {groupLabel}
        </Text>
      </View>

      {/* Right side: amount + settle button */}
      <View style={styles.right}>
        <AmountDisplay
          amount={balance}
          currency={currency}
          size="sm"
          showSign
        />
        {balance !== 0 ? (
          <Pressable
            onPress={onSettle}
            style={({ pressed }) => [
              styles.settleBtn,
              pressed && styles.settleBtnPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Settle up with ${name}`}
          >
            <Text style={styles.settleBtnText}>Settle</Text>
          </Pressable>
        ) : null}
      </View>

      {/* Hairline separator */}
      <View style={styles.separator} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
  },
  avatar: {
    marginRight: spacing[3],
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  name: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  right: {
    alignItems: 'flex-end',
    gap: spacing[2],
  },
  settleBtn: {
    backgroundColor: colors.brand,
    borderRadius: radius.pill,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  },
  settleBtnPressed: {
    backgroundColor: colors.brandDark,
  },
  settleBtnText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: spacing[4],
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
