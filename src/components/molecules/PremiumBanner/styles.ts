import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacings,
} from '../../../theme/typography';

const styles = StyleSheet.create({
  // ── Full card ──
  card: {
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    padding: spacing[4],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.brand,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardPressed: {
    backgroundColor: '#4F46E5',
  },

  // Title
  title: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.white,
    marginBottom: 4,
  },

  // Subtitle
  subtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.80)',
    marginBottom: spacing[3],
  },

  // Feature pills row
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  featurePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 99,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  featureLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },

  // CTA button
  ctaBtn: {
    marginTop: spacing[3],
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.90)',
  },
  ctaBtnLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.brand,
  },

  // ── Compact strip ──
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    gap: spacing[3],
    ...Platform.select({
      ios: {
        shadowColor: colors.brand,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  compactPressed: {
    backgroundColor: colors.brandDark,
  },
  compactLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  compactIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  compactTextBlock: {
    flex: 1,
  },
  compactTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.white,
    letterSpacing: letterSpacings.tight,
  },
  compactSubtitle: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  compactCta: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    flexShrink: 0,
  },
  compactCtaLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.brand,
  },
});

export default styles;
