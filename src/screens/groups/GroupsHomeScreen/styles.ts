import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ── Palette constants ─────────────────────────────────────────────────────────

export const HEADER_BG = '#FFFFFF';
export const BANNER_TOP = '#2D9B6F';
export const BANNER_BOTTOM = '#1A7A52';
export const SCREEN_BG = '#F2F3F7';

// ── Screen-level styles ───────────────────────────────────────────────────────

export const styles = StyleSheet.create({
  // Safe-area root
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  // FlatList contentContainerStyle
  listContent: {
    paddingBottom: sizes.fabSize + spacing[6] + spacing[4], // clear FAB
  },

  // Section label above group list ("Your groups", "Archived", …)
  sectionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.text3,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },

  // Floating action button
  fab: {
    position: 'absolute',
    bottom: spacing[6],
    right: spacing[5],
    width: sizes.fabSize,
    height: sizes.fabSize,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  // "+" label inside FAB
  fabText: {
    fontSize: fontSizes['2xl'],
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.white,
    lineHeight: sizes.fabSize,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

// ── Header styles ─────────────────────────────────────────────────────────────

export const headerStyles = StyleSheet.create({
  // Opaque white bar behind the safe-area inset
  container: {
    backgroundColor: HEADER_BG,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  // Left cluster: logo + wordmark
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  // App wordmark
  wordmark: {
    fontSize: fontSizes.lg,
    fontWeight: String(fontWeights.bold) as '700',
    color: colors.text1,
    letterSpacing: -0.3,
  },

  // Right cluster: action icons
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  // Tappable icon button wrapper
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandLight,
  },

  // Notification badge dot
  badgeDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.neg,
    borderWidth: 1.5,
    borderColor: HEADER_BG,
  },
});

// ── Banner (BalanceBanner) styles ─────────────────────────────────────────────

export const bannerStyles = StyleSheet.create({
  // LinearGradient root
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    marginBottom: spacing[2],
    padding: spacing[5],
  },

  // Left column: label + amount
  leftSection: {
    flexDirection: 'column',
    gap: spacing[1],
  },

  // "You are owed" / "You owe" label
  label: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.regular) as '400',
    color: 'rgba(255,255,255,0.80)',
  },

  // Dollar amount
  amount: {
    fontSize: fontSizes['3xl'],
    fontWeight: String(fontWeights.bold) as '700',
    color: colors.white,
    letterSpacing: -0.5,
  },

  // "Settle all" pill button
  settleButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.70)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2] + 2, // 10px
  },

  settleButtonText: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.white,
  },
});

// ── SearchBar styles ──────────────────────────────────────────────────────────

export const searchStyles = StyleSheet.create({
  // Outer wrapper with horizontal padding
  wrapper: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: SCREEN_BG,
  },

  // Input row container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderMid,
    paddingHorizontal: spacing[3] + 2, // 14px
  },

  // Icon wrapper (magnifier)
  iconWrapper: {
    width: 18,
    height: 18,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Magnifier circle
  iconCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.text4,
    backgroundColor: 'transparent',
  },

  // Magnifier handle
  iconHandle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: colors.text4,
    transform: [{ rotate: '-45deg' }],
  },

  // Text input
  input: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.text1,
    paddingVertical: 0,
  },
});

// ── GroupCard styles ──────────────────────────────────────────────────────────

export const cardStyles = StyleSheet.create({
  // Row container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },

  // Pressed state
  pressed: {
    backgroundColor: colors.bg,
  },

  // Emoji icon area (colored square)
  iconArea: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Emoji character
  emoji: {
    fontSize: fontSizes.xl,
    lineHeight: 28,
  },

  // Middle column: name + subtitle
  middle: {
    flex: 1,
    gap: 2,
  },

  // Group name
  name: {
    fontSize: fontSizes.md,
    fontWeight: String(fontWeights.bold) as '700',
    color: colors.text1,
    letterSpacing: -0.1,
  },

  // Member count / last activity
  subtitle: {
    fontSize: 13,
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.text3,
  },

  // Right column: balance badge
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },

  // Positive balance badge (owed to you)
  badgePositive: {
    backgroundColor: colors.posBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextPositive: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.pos,
  },

  // Negative balance badge (you owe)
  badgeNegative: {
    backgroundColor: colors.negBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
  },
  badgeTextNegative: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.neg,
  },

  // Settled badge (zero balance)
  badgeSettled: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2] / 2,
    borderWidth: 1,
    borderColor: colors.borderMid,
    backgroundColor: 'transparent',
  },
  badgeTextSettled: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.zero,
  },

  // Inset separator between cards
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: 48 + spacing[3] + spacing[4], // align with text column
  },
});
