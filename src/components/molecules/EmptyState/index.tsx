import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import Icon, { IconName } from '../../atoms/Icon';
import styles from './styles';

export interface Action {
  label: string;
  onPress: () => void;
}

export interface Props {
  icon: IconName;
  title: string;
  subtitle?: string;
  action?: Action;
  style?: StyleProp<ViewStyle>;
}

export type EmptyStateProps = Props;

export function EmptyState({ icon, title, subtitle, action, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={36} stroke={colors.brand} fill="none" />
      </View>

      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      ) : null}

      {action ? (
        <Pressable
          onPress={action.onPress}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          <Text style={styles.ctaLabel}>{action.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
