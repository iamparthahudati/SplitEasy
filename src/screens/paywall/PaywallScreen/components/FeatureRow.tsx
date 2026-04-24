import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../../../components/atoms/Icon';
import { colors } from '../../../../theme/colors';
import { spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureRowProps {
  label: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FeatureRow({ label }: FeatureRowProps): JSX.Element {
  return (
    <View style={styles.row}>
      <Icon name="check-circle" size={18} stroke={colors.pos} fill="none" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  label: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.white,
    flex: 1,
  },
});
