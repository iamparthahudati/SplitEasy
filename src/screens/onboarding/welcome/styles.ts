import { Dimensions, StyleSheet } from 'react-native';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// WelcomeScreen background

// WelcomeScreen background
export const BG_BASE = '#1A1560'; // top half
export const BG_BOTTOM = '#2D2A6E'; // bottom half

export const AVATAR_SIZE = 100;
export const AVATAR_OVERLAP = 10;

export const SCREEN_WIDTH = Dimensions.get('window').width;

const BALANCE_CIRCLE_SIZE = AVATAR_SIZE + 16; // 100

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG_BASE,
  },

  // Bottom half — solid #2D2A6E covering the lower 50%
  bgBottom: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG_BOTTOM,
  },

  skipBtn: {
    position: 'absolute',
    top: 56,
    right: spacing[5],
    zIndex: 10,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },

  skipText: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
  },

  flatList: {
    flex: 1,
  },

  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 210,
    paddingHorizontal: spacing[8],
  },

  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
  },

  title: {
    color: '#FFFFFF',
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    marginBottom: spacing[3],
    lineHeight: 34,
  },

  body: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing[3],
  },

  sub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Dot pagination
  dotRow: {
    position: 'absolute',
    bottom: 152,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    height: 6,
    borderRadius: 3,
  },

  dotActive: {
    width: 20,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },

  dotInactive: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: 3,
  },

  // Next button
  btnWrap: {
    position: 'absolute',
    bottom: 78,
    left: spacing[5],
    right: spacing[5],
  },

  nextBtn: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextText: {
    color: BG_BASE,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
});

// ---------------------------------------------------------------------------
// Illustration styles
// ---------------------------------------------------------------------------

export const illustStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },

  // Avatar row — overlap handled via marginLeft inline (no gap)
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing[2],
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: BG_BASE,
    overflow: 'hidden',
  },

  avatarLabel: {
    color: '#FFFFFF',
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },

  dividerLine: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: spacing[3],
  },

  // Amount row — no gap, each cell width = AVATAR_SIZE so labels sit under avatars
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  amount: {
    width: AVATAR_SIZE,
    color: '#FFFFFF',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },

  // Balance row
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[4],
  },

  balanceCircle: {
    width: BALANCE_CIRCLE_SIZE,
    height: BALANCE_CIRCLE_SIZE,
    borderRadius: BALANCE_CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.20)',
  },

  balanceLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    textAlign: 'center',
    marginBottom: 2,
  },

  balanceAmount: {
    color: '#FFFFFF',
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },

  pole: {
    width: 2,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  balanceTag: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.md,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },

  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: '#4ADE80',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#052E16',
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
  },
});
