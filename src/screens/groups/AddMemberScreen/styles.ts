import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[4],
  },

  // ── Search ────────────────────────────────────────────────────────────────────
  searchWrap: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
  },

  // ── Suggestions card ──────────────────────────────────────────────────────────
  suggestionsCard: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  // ── Add pill button ───────────────────────────────────────────────────────────
  addPill: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPillAdded: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brandLight,
  },
  addPillLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.brand,
  },
  addPillLabelAdded: {
    color: colors.brandDark,
  },

  // ── Added chips row ───────────────────────────────────────────────────────────
  chipsSection: {
    marginTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
  chipsSectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  chipsScroll: {
    flexDirection: 'row',
  },
  chipsScrollContent: {
    gap: spacing[2],
    paddingRight: spacing[2],
  },

  // ── Bottom confirm ────────────────────────────────────────────────────────────
  bottomBar: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderMid,
    backgroundColor: colors.white,
  },
});

export default styles;
