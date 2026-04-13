import { StyleSheet } from 'react-native';

export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const lineHeights = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const letterSpacings = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

export const typography = StyleSheet.create({
  // Display
  heroAmount: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacings.tight,
  },
  // Headings
  h1: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
  },
  // Body
  bodyLg: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
  },
  bodySm: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
  },
  // Labels
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  labelCaps: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacings.widest,
    textTransform: 'uppercase',
  },
  // Button text
  btnLg: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  btnSm: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
});
