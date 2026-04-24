import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon, { IconName } from '../../../../components/atoms/Icon';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureCardProps {
  iconName: IconName;
  iconBg: string;
  title: string;
  description: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeatureCard({
  iconName,
  iconBg,
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <View style={styles.card}>
      {/* Icon square */}
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Icon name={iconName} size={22} stroke={colors.brand} fill="none" />
      </View>

      {/* Text content */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
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
    padding: spacing[4],
    alignItems: 'flex-start',
    gap: spacing[4],
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    marginBottom: spacing[1],
  },
  description: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    lineHeight: fontSizes.sm * 1.5,
  },
});
