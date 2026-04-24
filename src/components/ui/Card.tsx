import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'hero';
}

export function Card({ children, style, variant = 'default' }: Props) {
  return (
    <View
      style={[
        styles.base,
        variant === 'hero' ? styles.hero : styles.default,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: spacing[4],
    borderRadius: radius.md,
  },
  default: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hero: {
    backgroundColor: colors.brand,
    borderRadius: radius.lg,
    padding: spacing[5],
  },
});
