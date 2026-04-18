import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface HeroBannerProps {
  name: string;
  memberCount: number;
  balance: number;
  totalSpent: number;
}

const formatCurrency = (value: number): string => {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
};

export const HeroBanner = ({
  name,
  memberCount,
  balance,
  totalSpent,
}: HeroBannerProps) => {
  const balanceColor = balance > 0 ? colors.pos : colors.white;

  return (
    <View style={styles.container}>
      {/* Gradient layers — top to bottom */}
      <View style={[StyleSheet.absoluteFill, styles.gradientTop]} />
      <View style={[StyleSheet.absoluteFill, styles.gradientBottom]} />

      {/* Decorative circle — top-right */}
      <View style={styles.decorativeCircle} />

      {/* Top section */}
      <View style={styles.topSection}>
        <View style={styles.titleRow}>
          <Text style={styles.starIcon}>★</Text>
          <Text style={styles.groupName} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <Text style={styles.memberCount}>
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.sectionDivider} />

      {/* Bottom stats row */}
      <View style={styles.statsRow}>
        {/* Left: Your Balance */}
        <View style={styles.statCell}>
          <Text style={styles.statLabel}>YOUR BALANCE</Text>
          <Text style={[styles.statValue, { color: balanceColor }]}>
            {formatCurrency(balance)}
          </Text>
        </View>

        {/* Vertical divider */}
        <View style={styles.verticalDivider} />

        {/* Right: Total Spent */}
        <View style={styles.statCell}>
          <Text style={styles.statLabel}>TOTAL SPENT</Text>
          <Text style={styles.statValue}>{formatCurrency(totalSpent)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[4],
  },
  gradientTop: {
    backgroundColor: '#3730A3',
    bottom: '50%',
  },
  gradientBottom: {
    backgroundColor: '#4F46E5',
    top: '50%',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -40,
    right: -40,
  },
  topSection: {
    marginBottom: spacing[4],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  starIcon: {
    fontSize: fontSizes.lg,
    color: colors.white,
    lineHeight: fontSizes.lg * 1.3,
  },
  groupName: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.white,
    flex: 1,
  },
  memberCount: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.white,
    opacity: 0.8,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginBottom: spacing[4],
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCell: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: fontWeights.semibold,
    color: colors.white,
    opacity: 0.75,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing[1],
  },
  statValue: {
    fontSize: 28,
    fontWeight: fontWeights.bold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginHorizontal: spacing[4],
  },
});
