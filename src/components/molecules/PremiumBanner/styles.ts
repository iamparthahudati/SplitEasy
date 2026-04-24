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
    borderRadius: radius.lg,
    padding: spacing[5],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.brand,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardPressed: {
    backgroundColor: colors.brandDark,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    gap: 4,
    marginBottom: spacing[3],
  },
  badgeLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.extrabold,
    color: colors.brandDark,
    letterSpacing: letterSpacings.wider,
  },

  // Title
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.white,
    letterSpacing: letterSpacings.tight,
    marginBottom: spacing[2],
  },

  // Subtitle
  subtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: fontSizes.sm * 1.6,
    marginBottom: spacing[4],
  },

  // Feature pills row
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginBottom: spacing[5],
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: spacing[2] + 2,
  },
  featureLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.white,
  },

  // CTA row
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1] + 2,
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: spacing[2] + 2,
    paddingHorizontal: spacing[4],
  },
  ctaBtnLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.brand,
  },
  dismissHint: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'right',
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
