import React, { JSX } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import ProgressBar from '../../../../components/atoms/ProgressBar';
import Tag from '../../../../components/atoms/Tag';
import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LimitRowProps {
  label: string;
  used: number;
  total: number;
  style?: ViewStyle;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBarColor(ratio: number): string {
  if (ratio >= 1) return colors.neg;
  if (ratio > 0.7) return colors.pend;
  return colors.brand;
}

function getTagProps(ratio: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (ratio >= 1) {
    return { label: 'Full', color: colors.neg, bgColor: colors.negBg };
  }
  if (ratio > 0.7) {
    return { label: 'Almost full', color: colors.pend, bgColor: colors.pendBg };
  }
  return { label: 'OK', color: colors.pos, bgColor: colors.posBg };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LimitRow({
  label,
  used,
  total,
  style,
}: LimitRowProps): JSX.Element {
  const ratio = total > 0 ? used / total : 0;
  const barColor = getBarColor(ratio);
  const tagProps = getTagProps(ratio);

  return (
    <View style={[styles.container, style]}>
      {/* Top row: label + usage count */}
      <View style={styles.topRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.usageText}>
          {used} of {total} used
        </Text>
      </View>

      {/* Progress bar */}
      <ProgressBar
        progress={ratio}
        color={barColor}
        trackColor={colors.borderMid}
        height={6}
        style={styles.bar}
      />

      {/* Status tag — right-aligned */}
      <View style={styles.tagRow}>
        <Tag
          label={tagProps.label}
          color={tagProps.color}
          bgColor={tagProps.bgColor}
          size="sm"
        />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[3],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  label: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text1,
  },
  usageText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  bar: {
    marginBottom: spacing[2],
  },
  tagRow: {
    alignItems: 'flex-end',
  },
});
