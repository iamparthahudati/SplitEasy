import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ── Root ──────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: colors.onboardingTop,
  },

  // ── Close button ──────────────────────────────────────────────────────────
  closeBtn: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[10],
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    paddingTop: spacing[12],
    paddingBottom: spacing[6],
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  heroTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  heroSubtitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: 'rgba(255,255,255,0.70)',
    textAlign: 'center',
    lineHeight: fontSizes.base * 1.5,
  },

  // ── Features list ─────────────────────────────────────────────────────────
  featuresSection: {
    marginBottom: spacing[6],
  },

  // ── Pricing cards ─────────────────────────────────────────────────────────
  pricingRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[6],
  },

  // ── CTA ───────────────────────────────────────────────────────────────────
  ctaButton: {
    backgroundColor: colors.white,
    marginBottom: spacing[4],
  },
  ctaLabel: {
    color: colors.brand,
  },

  // ── Restore ───────────────────────────────────────────────────────────────
  restoreBtn: {
    alignItems: 'center',
    paddingVertical: spacing[2],
    marginBottom: spacing[3],
  },
  restoreText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text4,
    textAlign: 'center',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    alignItems: 'center',
    paddingBottom: spacing[2],
  },
  footerText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: colors.text4,
    textAlign: 'center',
  },
});

export default styles;
