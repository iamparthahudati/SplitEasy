import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  // ─── Root ─────────────────────────────────────────────────────────────────
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ─── Profile card wrapper ─────────────────────────────────────────────────
  profileCardWrapper: {
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    marginBottom: spacing[3],
  },

  // ─── Premium banner wrapper ───────────────────────────────────────────────
  premiumBannerWrapper: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
  },

  // ─── Groups wrapper ───────────────────────────────────────────────────────
  groupsWrapper: {
    paddingHorizontal: spacing[4],
  },

  // ─── Sign out label ───────────────────────────────────────────────────────
  signOutLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.neg,
  },

  // ─── Left icon container (used inside ListRow via leftIcon prop) ──────────
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
