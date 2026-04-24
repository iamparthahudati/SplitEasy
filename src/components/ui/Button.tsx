import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { radius, sizes } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger' | 'apple' | 'google';
type Size = 'lg' | 'sm';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  style,
  leftIcon,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={[
        styles.base,
        size === 'lg' ? styles.sizeLg : styles.sizeSm,
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? colors.brand
              : colors.white
          }
        />
      ) : (
        <>
          {leftIcon ?? null}
          <Text
            style={[
              styles.label,
              labelStyles[variant],
              size === 'sm' && styles.labelSm,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.brand },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderMid,
    borderStyle: 'dashed',
  },
  danger: { backgroundColor: colors.neg },
  apple: { backgroundColor: '#000000' },
  google: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderMid,
  },
});

const labelStyles = StyleSheet.create({
  primary: { color: colors.white },
  outline: { color: colors.brand },
  ghost: { color: colors.text3 },
  danger: { color: colors.white },
  apple: { color: colors.white },
  google: { color: colors.text1 },
});

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    gap: 8,
  },
  sizeLg: { height: sizes.btnHeight },
  sizeSm: { height: sizes.btnHeightSm, paddingHorizontal: 16 },
  disabled: { opacity: 0.55 },
  label: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  labelSm: { fontSize: fontSizes.sm },
});
