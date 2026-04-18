import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

// ── Palette constants ─────────────────────────────────────────────────────────

export const HERO_TOP = '#3730A3'; // Indigo 800
export const HERO_BOTTOM = '#4F46E5'; // Indigo 600
export const SCREEN_BG = '#F2F3F7';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Screen-level styles ───────────────────────────────────────────────────────

export const styles = StyleSheet.create({
  // SafeAreaView / flex root
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },

  // ScrollView contentContainerStyle
  scrollContent: {
    paddingBottom: sizes.fabSize + spacing[6] + spacing[4], // clear add-bar
  },
});

// ── Navigation bar styles ─────────────────────────────────────────────────────

export const navStyles = StyleSheet.create({
  // Transparent bar that sits over the hero gradient
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },

  // Circular back / action button
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Right-side cluster (settings, export, …)
  rightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  // Group name shown in nav when hero scrolls out of view
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.white,
    letterSpacing: -0.2,
  },
});

// ── Hero gradient block styles ────────────────────────────────────────────────

export const heroStyles = StyleSheet.create({
  // Outer container — fixed height, clips children
  container: {
    width: SCREEN_WIDTH,
    height: 220,
    overflow: 'hidden',
  },

  // Top gradient layer (HERO_TOP)
  gradientTop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: HERO_TOP,
  },

  // Bottom gradient layer (HERO_BOTTOM) — covers lower half, fades upward via
  // a tall borderRadius trick so no library is needed
  gradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
    backgroundColor: HERO_BOTTOM,
    borderTopLeftRadius: SCREEN_WIDTH * 0.6,
    borderTopRightRadius: SCREEN_WIDTH * 0.6,
    opacity: 0.72,
  },

  // Inner content padding (sits above gradient layers)
  content: {
    flex: 1,
    paddingHorizontal: spacing[5],
    paddingTop: sizes.headerHeight + spacing[4],
    paddingBottom: spacing[5],
    justifyContent: 'flex-end',
  },

  // Group emoji / avatar
  emoji: {
    fontSize: fontSizes['2xl'] + 8, // 32
    marginBottom: spacing[2],
  },

  // Group name
  groupName: {
    fontSize: fontSizes['2xl'],
    fontWeight: String(fontWeights.bold) as '700',
    color: colors.white,
    letterSpacing: -0.4,
    marginBottom: spacing[1],
  },

  // Member count pill
  memberPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    gap: spacing[1],
  },

  memberPillText: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: 'rgba(255,255,255,0.90)',
  },
});

// ── Balance card styles ───────────────────────────────────────────────────────

export const balanceStyles = StyleSheet.create({
  // White card that overlaps the hero bottom edge
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    marginHorizontal: spacing[4],
    marginTop: -spacing[5],
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Row: net balance label + settle button
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // "Your balance" label
  label: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.text3,
    marginBottom: spacing[1],
  },

  // Net amount (positive / negative / zero)
  amount: {
    fontSize: fontSizes['3xl'] ?? 30,
    fontWeight: String(fontWeights.bold) as '700',
    letterSpacing: -0.5,
  },

  amountPos: { color: colors.pos },
  amountNeg: { color: colors.neg },
  amountZero: { color: colors.zero },

  // "Settle up" pill button
  settleBtn: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2] + 2, // 10
    backgroundColor: colors.brand,
  },

  settleBtnText: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.white,
  },

  // Thin divider between balance row and member avatars
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginVertical: spacing[3],
  },

  // Horizontal member avatar strip
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },

  // "+N more" overflow label
  memberOverflow: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.text3,
  },
});

// ── Expense row styles ────────────────────────────────────────────────────────

export const expenseStyles = StyleSheet.create({
  // Pressable row container
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },

  // Pressed state
  rowPressed: {
    backgroundColor: colors.bg,
  },

  // Category icon square
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  iconEmoji: {
    fontSize: fontSizes.lg,
    lineHeight: 26,
  },

  // Middle column
  middle: {
    flex: 1,
    gap: 2,
  },

  // Expense description
  description: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.text1,
    letterSpacing: -0.1,
  },

  // "Paid by You · Apr 18" meta line
  meta: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.text3,
  },

  // Right column
  right: {
    alignItems: 'flex-end',
    flexShrink: 0,
    gap: 2,
  },

  // Total amount
  total: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.text1,
  },

  // "you owe / lent" share label
  sharePos: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.pos,
  },

  shareNeg: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.neg,
  },

  shareZero: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.zero,
  },

  // Inset row separator
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: 44 + spacing[3] + spacing[4], // align with text column
  },
});

// ── Section header styles ─────────────────────────────────────────────────────

export const sectionStyles = StyleSheet.create({
  // Row: label + optional action link
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },

  // "EXPENSES" / "MEMBERS" caps label
  label: {
    fontSize: fontSizes.xs,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  // "See all" action link
  action: {
    fontSize: fontSizes.sm,
    fontWeight: String(fontWeights.medium) as '500',
    color: colors.brand,
  },

  // White card wrapper that groups rows together
  card: {
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    borderRadius: radius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  // Empty-state placeholder inside a section card
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    gap: spacing[2],
  },

  emptyText: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.regular) as '400',
    color: colors.text3,
  },
});

// ── Add-expense bar styles ────────────────────────────────────────────────────

export const addBarStyles = StyleSheet.create({
  // Fixed bottom bar container
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderMid,
    gap: spacing[3],
  },

  // Primary "Add expense" button
  primaryBtn: {
    flex: 1,
    height: sizes.btnHeightSm,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryBtnText: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.white,
    letterSpacing: 0.1,
  },

  // Secondary "Settle up" ghost button
  secondaryBtn: {
    height: sizes.btnHeightSm,
    paddingHorizontal: spacing[4],
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryBtnText: {
    fontSize: fontSizes.base,
    fontWeight: String(fontWeights.semibold) as '600',
    color: colors.brand,
  },
});
