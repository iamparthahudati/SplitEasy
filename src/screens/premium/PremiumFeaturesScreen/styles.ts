import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ── Root ──────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ── Hero banner ───────────────────────────────────────────────────────────
  heroBanner: {
    backgroundColor: colors.brand,
    borderRadius: radius.lg,
    padding: spacing[5],
    margin: spacing[4],
    overflow: 'hidden',
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  heroTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.white,
    marginBottom: spacing[1],
  },
  heroSubtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: fontSizes.sm * 1.5,
  },

  // ── Feature cards list ────────────────────────────────────────────────────
  cardsSection: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
    marginBottom: spacing[4],
  },

  // ── CTA button ────────────────────────────────────────────────────────────
  ctaButton: {
    marginHorizontal: spacing[4],
  },
});

export default styles;
