import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSizes, fontWeights } from '../../theme/typography';
import { sizes } from '../../theme/spacing';
import { getInitials } from '../../utils/formatters';

// Deterministic color from name so the same member always gets the same color
const AVATAR_COLORS = [
  '#6366F1', '#059669', '#D97706', '#DC2626',
  '#7C3AED', '#0891B2', '#BE185D', '#16A34A',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

type AvatarSize = 'sm' | 'md' | 'lg';

interface Props {
  name: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

const SIZES: Record<AvatarSize, number> = {
  sm: sizes.avatarSm,
  md: sizes.avatarMd,
  lg: sizes.avatarLg,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  sm: fontSizes.xs,
  md: fontSizes.sm,
  lg: fontSizes.md,
};

export function Avatar({ name, size = 'md', style }: Props) {
  const dim = SIZES[size];
  return (
    <View
      style={[
        styles.circle,
        { width: dim, height: dim, borderRadius: dim / 2, backgroundColor: avatarColor(name) },
        style,
      ]}
    >
      <Text style={[styles.initials, { fontSize: FONT_SIZES[size] }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.white,
    fontWeight: fontWeights.semibold as any,
  },
});
