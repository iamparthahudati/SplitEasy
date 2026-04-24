import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../../theme/colors';
import { radius } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

export type SplitMethod = 'equal' | 'exact' | 'percentage';

interface Tab {
  key: SplitMethod;
  label: string;
}

const TABS: Tab[] = [
  { key: 'equal', label: 'Equal' },
  { key: 'exact', label: 'Exact' },
  { key: 'percentage', label: '%' },
];

interface SplitMethodTabsProps {
  selected: SplitMethod;
  onSelect: (method: SplitMethod) => void;
}

export function SplitMethodTabs({ selected, onSelect }: SplitMethodTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = tab.key === selected;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onSelect(tab.key)}
            style={[
              styles.tab,
              isActive ? styles.tabActive : styles.tabInactive,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Split ${tab.label}`}
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    padding: 3,
    height: 40,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm - 2,
  },
  tabActive: {
    backgroundColor: colors.brand,
  },
  tabInactive: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  labelActive: {
    color: colors.white,
  },
  labelInactive: {
    color: colors.text3,
  },
});
