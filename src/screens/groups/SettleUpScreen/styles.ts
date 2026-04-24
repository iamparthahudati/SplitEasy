import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[8],
  },

  // ── Subheader ─────────────────────────────────────────────────────────────
  subheader: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular as '400',
    color: colors.text2,
    textAlign: 'center',
    marginTop: spacing[4],
    marginBottom: spacing[2],
    marginHorizontal: spacing[4],
  },

  // ── Amount card ───────────────────────────────────────────────────────────
  amountCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    paddingVertical: spacing[6],
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },

  // ── Payment method ────────────────────────────────────────────────────────
  methodSection: {
    marginTop: spacing[5],
    marginHorizontal: spacing[4],
  },
  methodLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as '600',
    color: colors.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing[3],
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing[2],
  },

  // ── Form section ──────────────────────────────────────────────────────────
  formSection: {
    marginTop: spacing[5],
    marginHorizontal: spacing[4],
    gap: spacing[3],
  },

  // ── Confirm button ────────────────────────────────────────────────────────
  confirmBtn: {
    marginHorizontal: spacing[4],
    marginTop: spacing[6],
  },
});
