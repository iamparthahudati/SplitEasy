import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, sizes, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// Phase 1 color token (fallback to hex until colors.ts is updated)
const HERO_INDIGO_BRIGHT = colors.heroIndigoBright ?? '#4F46E5';

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
    backgroundColor: HERO_INDIGO_BRIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: HERO_INDIGO_BRIGHT,
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
