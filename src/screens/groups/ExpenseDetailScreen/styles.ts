import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[8],
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[6],
    paddingBottom: spacing[5],
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  heroAmount: {
    marginBottom: spacing[3],
  },
  heroDescription: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as '700',
    color: colors.text1,
    textAlign: 'center',
    marginBottom: spacing[3],
  },

  // ── Section card ──────────────────────────────────────────────────────────
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginHorizontal: spacing[4],
    marginTop: spacing[3],
    overflow: 'hidden',
  },

  // ── Split member row ──────────────────────────────────────────────────────
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  memberRowLast: {
    borderBottomWidth: 0,
  },
  memberName: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium as '500',
    color: colors.text1,
    marginLeft: spacing[3],
  },

  // ── Notes card ────────────────────────────────────────────────────────────
  notesText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular as '400',
    color: colors.text2,
    lineHeight: 22,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    paddingHorizontal: spacing[1],
  },
  footerText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular as '400',
    color: colors.text4,
  },

  // ── Delete button ─────────────────────────────────────────────────────────
  deleteBtn: {
    marginHorizontal: spacing[4],
    marginTop: spacing[5],
  },
});
