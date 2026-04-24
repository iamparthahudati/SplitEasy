import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

interface Category {
  key: string;
  label: string;
  emoji: string;
}

const CATEGORIES: Category[] = [
  { key: 'Food', label: 'Food', emoji: '🍽' },
  { key: 'Travel', label: 'Travel', emoji: '✈️' },
  { key: 'Stay', label: 'Stay', emoji: '🏨' },
  { key: 'Fun', label: 'Fun', emoji: '🎉' },
  { key: 'Grocery', label: 'Grocery', emoji: '🛒' },
  { key: 'Utility', label: 'Utility', emoji: '💡' },
  { key: 'Activity', label: 'Activity', emoji: '🏃' },
  { key: 'Other', label: 'Other', emoji: '📦' },
];

interface CategoryPickerProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {CATEGORIES.map(cat => {
        const isSelected = cat.key === selected;
        return (
          <Pressable
            key={cat.key}
            onPress={() => onSelect(cat.key)}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipUnselected,
            ]}
            accessibilityRole="button"
            accessibilityLabel={cat.label}
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={styles.emoji}>{cat.emoji}</Text>
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelUnselected,
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.pill,
    gap: spacing[1],
  },
  chipSelected: {
    backgroundColor: colors.brand,
  },
  chipUnselected: {
    backgroundColor: colors.border,
  },
  emoji: {
    fontSize: fontSizes.base,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  labelSelected: {
    color: colors.white,
  },
  labelUnselected: {
    color: colors.text2,
  },
});
