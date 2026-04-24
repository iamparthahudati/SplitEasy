import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

type TagVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'premium';
type TagSize = 'sm' | 'md';

interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  color?: string;
  bgColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface VariantTokens {
  bg: string;
  text: string;
  dot: string;
}

const VARIANT_MAP: Record<TagVariant, VariantTokens> = {
  default: {
    bg: colors.border,
    text: colors.text2,
    dot: colors.text4,
  },
  success: {
    bg: colors.posBg,
    text: colors.pos,
    dot: colors.pos,
  },
  warning: {
    bg: colors.pendBg,
    text: colors.pend,
    dot: colors.pend,
  },
  danger: {
    bg: colors.negBg,
    text: colors.neg,
    dot: colors.neg,
  },
  info: {
    bg: colors.brandLight,
    text: colors.brand,
    dot: colors.brand,
  },
  premium: {
    bg: colors.brandDark,
    text: colors.white,
    dot: colors.brandMid,
  },
};

const SIZE_MAP: Record<
  TagSize,
  { paddingH: number; paddingV: number; fontSize: number; dotSize: number }
> = {
  sm: {
    paddingH: spacing[2],
    paddingV: 3,
    fontSize: fontSizes.xs,
    dotSize: 4,
  },
  md: {
    paddingH: spacing[3],
    paddingV: spacing[1],
    fontSize: fontSizes.sm,
    dotSize: 5,
  },
};

const Tag: React.FC<TagProps> = ({
  label,
  variant = 'default',
  size = 'md',
  color,
  bgColor,
  onPress,
  style,
}) => {
  const hasRawColors = color !== undefined && bgColor !== undefined;
  const tokens = hasRawColors
    ? { bg: bgColor as string, text: color as string, dot: color as string }
    : VARIANT_MAP[variant];
  const sizeTokens = SIZE_MAP[size];

  const showDot = hasRawColors || variant !== 'default';

  const containerDynamic: ViewStyle = {
    backgroundColor: tokens.bg,
    paddingHorizontal: sizeTokens.paddingH,
    paddingVertical: sizeTokens.paddingV,
  };

  const dotDynamic: ViewStyle = {
    width: sizeTokens.dotSize,
    height: sizeTokens.dotSize,
    borderRadius: sizeTokens.dotSize / 2,
    backgroundColor: tokens.dot,
  };

  const inner = (
    <>
      {showDot && <View style={[styles.dot, dotDynamic]} />}
      <Text
        style={[
          styles.text,
          { fontSize: sizeTokens.fontSize, color: tokens.text },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          containerDynamic,
          style,
          pressed && styles.pressed,
        ]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, containerDynamic, style]}>{inner}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dot: {
    marginRight: spacing[1],
  },
  text: {
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default Tag;
