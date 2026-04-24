import React, { JSX } from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import styles from './styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SectionAction {
  label: string;
  onPress: () => void;
}

export interface SectionHeaderProps {
  title: string;
  action?: SectionAction;
  /** Reduce vertical padding — useful inside dense lists */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  action,
  compact = false,
  style,
}: SectionHeaderProps): JSX.Element {
  return (
    <View
      style={[
        styles.row,
        compact ? styles.rowCompact : styles.rowDefault,
        style,
      ]}
    >
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {action ? (
        <Pressable
          onPress={action.onPress}
          style={({ pressed }) => [
            styles.action,
            pressed && styles.actionPressed,
          ]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text style={styles.actionLabel}>{action.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
