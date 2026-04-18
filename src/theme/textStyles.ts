import { StyleSheet } from 'react-native';
import { fontSizes, fontWeights, letterSpacings } from './typography';

export const textStyles = StyleSheet.create({
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
