import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ── Palette constants ────────────────────────────────────────────────────────

export const BG_BASE = colors.onboardingTop; // '#1A1560'

const BG = BG_BASE;
const WHITE = colors.white;

// ── Styles ───────────────────────────────────────────────────────────────────

export const styles = StyleSheet.create({
  // Radial purple glow — center of screen
  glowCircle: {
    position: 'absolute',
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: 'rgba(76,29,149,0.55)',
    alignSelf: 'center',
    top: '20%',
  },

  root: {
    flex: 1,
    backgroundColor: BG,
  },

  // Sub-views (email / forgotPassword) scroll content
  subContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[5], // 20px
    paddingBottom: spacing[8],
  },

  // ── Sub-view shared ───────────────────────────────────────────────────────

  backRow: {
    marginBottom: spacing[6], // 24px
  },
  backText: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: fontWeights.medium,
  },

  subHeading: {
    fontSize: 28,
    fontWeight: fontWeights.bold,
    color: WHITE,
    marginBottom: spacing[6], // 24px
  },

  subSubtitle: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: spacing[6],
    lineHeight: 20,
  },

  // Input
  input: {
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md, // 12px
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing[4], // 16px
    fontSize: fontSizes.base,
    color: WHITE,
    marginBottom: spacing[3], // 12px
  },

  // Primary action button (email flow)
  btnPrimary: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    marginBottom: spacing[3],
  },
  btnPrimaryText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: WHITE,
  },

  btnDisabled: {
    opacity: 0.55,
  },

  // Forgot password link
  forgotLink: {
    textAlign: 'center',
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.45)',
    paddingVertical: spacing[3],
  },

  // Error
  errorText: {
    fontSize: 13,
    color: colors.neg,
    marginBottom: spacing[3],
    paddingHorizontal: spacing[1],
  },

  // Success (reset sent)
  successBox: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    borderRadius: radius.md,
    padding: spacing[4],
    marginTop: spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
  },
  successText: {
    color: '#A5B4FC',
    fontWeight: fontWeights.medium,
    fontSize: fontSizes.base,
    textAlign: 'center',
  },
});
