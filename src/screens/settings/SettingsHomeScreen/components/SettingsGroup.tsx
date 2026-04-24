import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SectionHeader } from '../../../../components/molecules/SectionHeader';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SettingsGroup({ title, children, style }: SettingsGroupProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <SectionHeader title={title} compact />
      <View style={styles.card}>{children}</View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing[4],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
