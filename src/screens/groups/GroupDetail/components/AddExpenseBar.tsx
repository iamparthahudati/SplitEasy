import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, sizes, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface AddExpenseBarProps {
  onPress: () => void;
}

export function AddExpenseBar({ onPress }: AddExpenseBarProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}
        android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      >
        <Text style={styles.label}>+ Add Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderMid,
  },
  button: {
    height: sizes.btnHeight,
    borderRadius: radius.pill,
    backgroundColor: colors.heroIndigoBright,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: colors.heroIndigoBright,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  label: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
  },
});
