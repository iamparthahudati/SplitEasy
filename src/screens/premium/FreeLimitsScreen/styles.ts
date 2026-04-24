import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';

const styles = StyleSheet.create({
  // ── Root ──────────────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ── Info card wrapper ─────────────────────────────────────────────────────
  infoCardWrap: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[2],
  },

  // ── Usage card ────────────────────────────────────────────────────────────
  usageCard: {
    marginHorizontal: spacing[4],
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing[4],
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing[4],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  // ── Divider between limit rows ────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },

  // ── Premium banner ────────────────────────────────────────────────────────
  premiumBanner: {
    marginHorizontal: spacing[4],
  },
});

export default styles;
