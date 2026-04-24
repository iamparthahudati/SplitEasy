import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ─── Screen ────────────────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ─── Amount hero section ───────────────────────────────────────────────────
  amountSection: {
    backgroundColor: colors.brandLight,
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
  },

  // ─── Form card ─────────────────────────────────────────────────────────────
  card: {
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    borderRadius: radius.lg,
    overflow: 'hidden',
  },

  // ─── Section label ─────────────────────────────────────────────────────────
  sectionLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },

  // ─── Category row ──────────────────────────────────────────────────────────
  categoryRow: {
    paddingVertical: spacing[3],
  },

  // ─── Split section ─────────────────────────────────────────────────────────
  splitCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingBottom: spacing[1],
  },
  splitTabsWrap: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },

  // ─── Details card ──────────────────────────────────────────────────────────
  detailsCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingBottom: spacing[2],
  },
  inputWrap: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },

  // ─── Save button ───────────────────────────────────────────────────────────
  saveWrap: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
  },
  saveBtn: {
    height: sizes.btnHeight,
  },
});

export default styles;
