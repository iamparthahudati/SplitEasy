import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { sizes } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ─── Constants ────────────────────────────────────────────────────────────────

export type AvatarSize = 'sm' | 'md' | 'lg';

export const AVATAR_DIM: Record<AvatarSize, number> = {
  sm: sizes.avatarSm,
  md: sizes.avatarMd,
  lg: sizes.avatarLg,
};

export const DEFAULT_OVERLAP: Record<AvatarSize, number> = {
  sm: 10,
  md: 12,
  lg: 16,
};

export const OVERFLOW_FONT_SIZE: Record<AvatarSize, number> = {
  sm: fontSizes.xs,
  md: fontSizes.sm,
  lg: fontSizes.base,
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  overflowBubble: {
    backgroundColor: colors.border,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    color: colors.text3,
    fontWeight: fontWeights.medium,
  },
});

export default styles;
