import React from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';

import { colors } from '../../../theme/colors';
import Icon from '../../atoms/Icon';
import styles from './styles';

export interface SelectRowProps {
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const SelectRow: React.FC<SelectRowProps> = ({
  label,
  value,
  placeholder,
  onPress,
  icon,
  disabled = false,
  style,
}) => {
  const hasValue = value != null && value.length > 0;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && !disabled && styles.rowPressed,
        disabled && styles.rowDisabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${hasValue ? value : placeholder ?? ''}`}
      accessibilityState={{ disabled }}
    >
      {icon != null && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.right}>
        <Text
          style={[styles.valueText, !hasValue && styles.placeholderText]}
          numberOfLines={1}
        >
          {hasValue ? value : placeholder}
        </Text>
        <Icon
          name="chevron-right"
          size={16}
          stroke={colors.text4}
          fill="none"
        />
      </View>
    </Pressable>
  );
};
