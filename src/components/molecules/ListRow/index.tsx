import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import Icon from '../../atoms/Icon';
import styles from './styles';

// Left icon container width + right margin — used to inset the separator
export interface Props {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  leftIconBg?: string;
  rightLabel?: string;
  rightSublabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ListRow({
  title,
  subtitle,
  leftIcon,
  leftIconBg = colors.brandLight,
  rightLabel,
  rightSublabel,
  rightElement,
  onPress,
  showChevron,
  disabled = false,
  style,
}: Props) {
  const isInteractive = !!onPress && !disabled;

  // showChevron defaults to true when onPress exists and no rightElement is provided
  const resolvedShowChevron =
    showChevron !== undefined ? showChevron : isInteractive && !rightElement;

  const inner = (
    <View style={[styles.inner, style]}>
      {/* Left icon container */}
      {leftIcon ? (
        <View
          style={[styles.leftIconContainer, { backgroundColor: leftIconBg }]}
        >
          {leftIcon}
        </View>
      ) : null}

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text
          style={[styles.title, disabled && styles.titleDisabled]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {/* Right block */}
      <View style={styles.rightBlock}>
        {rightLabel || rightSublabel ? (
          <View style={styles.rightLabelStack}>
            {rightLabel ? (
              <Text style={styles.rightLabel} numberOfLines={1}>
                {rightLabel}
              </Text>
            ) : null}
            {rightSublabel ? (
              <Text style={styles.rightSublabel} numberOfLines={1}>
                {rightSublabel}
              </Text>
            ) : null}
          </View>
        ) : null}

        {rightElement ? (
          rightElement
        ) : resolvedShowChevron ? (
          <Icon
            name="chevron-right"
            size={16}
            stroke={colors.text4}
            fill="none"
          />
        ) : null}
      </View>
    </View>
  );

  return (
    <View>
      {isInteractive ? (
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          {inner}
        </Pressable>
      ) : (
        inner
      )}
      <View style={styles.separator} />
    </View>
  );
}
