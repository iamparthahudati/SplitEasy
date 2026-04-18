import { StyleSheet } from 'react-native';

import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ── Palette constants ────────────────────────────────────────────────────────

export const BG_BASE = '#1A1560';
export const BRAND_INDIGO = '#6366F1';

const BG = BG_BASE;
const WHITE = '#FFFFFF';

// ── Styles ───────────────────────────────────────────────────────────────────

export const styles = StyleSheet.create({
  // ── Layout ────────────────────────────────────────────────────────────────

  screenBg: {
    flex: 1,
    backgroundColor: '#1A1560',
  },

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
  safeArea: {
    flex: 1,
  },

  // Main view scroll content
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing[6], // 24px
    paddingTop: 60,
    paddingBottom: spacing[8], // 32px
  },

  // Sub-views (email / forgotPassword) scroll content
  subContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[5], // 20px
    paddingBottom: spacing[8],
  },

  // ── Logo mark ─────────────────────────────────────────────────────────────

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[8], // 32px
  },

  // 28px split circle container
  splitCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },

  // Left half — solid white fill
  splitLeft: {
    width: 14,
    height: 28,
    backgroundColor: WHITE,
  },

  // Right half — transparent fill with white border arc
  splitRight: {
    width: 14,
    height: 28,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: WHITE,
    borderLeftWidth: 0,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },

  // Thin vertical divider in the center
  splitDivider: {
    position: 'absolute',
    left: 13,
    top: 0,
    width: 2,
    height: 28,
    backgroundColor: BG_BASE,
  },

  wordmark: {
    fontSize: 22,
    fontWeight: fontWeights.bold as any,
    color: WHITE,
    letterSpacing: -0.3,
    marginLeft: spacing[2], // 8px
  },

  // ── Hero text ─────────────────────────────────────────────────────────────

  welcomeHeading: {
    fontSize: 28,
    fontWeight: fontWeights.bold as any,
    color: WHITE,
    textAlign: 'center',
    marginBottom: spacing[3], // 12px
  },

  welcomeSubtitle: {
    fontSize: fontSizes.base, // 14px
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginBottom: spacing[8], // 32px
    lineHeight: 20,
  },

  // ── Buttons section ───────────────────────────────────────────────────────

  buttonsSection: {
    width: '100%',
  },

  // Shared button base
  btnBase: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  btnDisabled: {
    opacity: 0.55,
  },

  // Apple button
  btnApple: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#000000',
    marginBottom: spacing[3], // 12px
  },
  appleIcon: {
    fontSize: fontSizes.xl, // 20px
    color: WHITE,
    lineHeight: 24,
  },
  btnAppleText: {
    fontSize: fontSizes.md, // 16px
    fontWeight: fontWeights.semibold as any,
    color: WHITE,
  },

  // Google button
  btnGoogle: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: WHITE,
    marginBottom: spacing[3], // 12px
  },
  googleG: {
    fontSize: fontSizes.md, // 16px
    fontWeight: fontWeights.bold as any,
    color: '#4285F4',
  },
  btnGoogleText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: '#1A1A1A',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[5], // 20px
    gap: spacing[3], // 12px
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dividerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },

  // Email button
  btnEmail: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: spacing[3], // 12px
  },
  btnEmailText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: WHITE,
  },

  // Guest button
  btnGuest: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  btnGuestText: {
    fontSize: 15,
    fontWeight: fontWeights.regular as any,
    color: 'rgba(255,255,255,0.35)',
  },

  // ── Footer ────────────────────────────────────────────────────────────────

  footer: {
    marginTop: 'auto' as any,
    paddingTop: spacing[8],
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
  },

  // ── Sub-view shared ───────────────────────────────────────────────────────

  backRow: {
    marginBottom: spacing[6], // 24px
  },
  backText: {
    fontSize: fontSizes.base,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: fontWeights.medium as any,
  },

  subHeading: {
    fontSize: 28,
    fontWeight: fontWeights.bold as any,
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
    backgroundColor: BRAND_INDIGO,
    marginBottom: spacing[3],
  },
  btnPrimaryText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold as any,
    color: WHITE,
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
    color: '#F87171',
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
    fontWeight: fontWeights.medium as any,
    fontSize: fontSizes.base,
    textAlign: 'center',
  },
});
