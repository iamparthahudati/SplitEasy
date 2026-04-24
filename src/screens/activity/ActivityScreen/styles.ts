import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ── Root ─────────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── List ─────────────────────────────────────────────────────────────────────
  listContent: {
    paddingBottom: spacing[10],
  },

  // ── Empty state ───────────────────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    paddingTop: spacing[16],
  },

  // ── Header ───────────────────────────────────────────────────────────────────
  headerContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMid,
  },
  headerTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: spacing[3],
  },
  headerChips: {
    flexDirection: 'row',
    gap: spacing[2],
  },

  // ── Date section ─────────────────────────────────────────────────────────────
  dateSectionContainer: {
    backgroundColor: colors.bg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  dateSectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Event row ────────────────────────────────────────────────────────────────
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: {
    backgroundColor: colors.bg,
  },
  rowIconCircle: {
    width: sizes.avatarMd,
    height: sizes.avatarMd,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
    flexShrink: 0,
  },
  rowIconCircleExpense: {
    backgroundColor: colors.brandLight,
  },
  rowIconCircleSettlement: {
    backgroundColor: colors.posBg,
  },
  rowContent: {
    flex: 1,
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  rowDescription: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    marginBottom: 2,
  },
  rowMeta: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
  },
  rowAmountCol: {
    alignItems: 'flex-end',
    flexShrink: 0,
  },
});

export default styles;
