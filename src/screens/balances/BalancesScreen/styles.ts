import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ─── Root ─────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ─── List ─────────────────────────────────────────────────────────────────
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing[8],
  },

  // ─── Header block ─────────────────────────────────────────────────────────
  headerContainer: {
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  screenTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text1,
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },

  // ─── Chip row ─────────────────────────────────────────────────────────────
  chipRow: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    marginBottom: spacing[4],
  },

  // ─── Section header wrapper ────────────────────────────────────────────────
  sectionHeaderWrapper: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[2],
  },

  // ─── Card shell (wraps rows) ───────────────────────────────────────────────
  cardShell: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  // ─── Empty state ──────────────────────────────────────────────────────────
  emptyState: {
    marginTop: spacing[10],
    marginBottom: spacing[6],
  },

  // ─── Card footer spacer ───────────────────────────────────────────────────
  cardFooter: {
    height: 0,
  },
});

export default styles;
