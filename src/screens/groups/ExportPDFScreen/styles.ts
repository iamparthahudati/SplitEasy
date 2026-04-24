import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[10],
    gap: spacing[4],
  },

  // ── Preview card ──────────────────────────────────────────────────────────────
  previewCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    overflow: 'hidden',
    // Shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    marginTop: spacing[4],
  },
  previewAccent: {
    width: 4,
    backgroundColor: colors.brand,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  previewBody: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  previewTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: spacing[1],
  },
  previewSubtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    marginBottom: spacing[1],
  },
  previewDate: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text2,
  },

  // ── Settings section ──────────────────────────────────────────────────────────
  settingsSection: {
    // no extra padding — SettingsGroup handles its own
  },

  // ── Premium banner ────────────────────────────────────────────────────────────
  premiumBanner: {
    // inherits margin from gap
  },

  // ── Action buttons ────────────────────────────────────────────────────────────
  actionsRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  actionBtn: {
    flex: 1,
  },
});

export default styles;
