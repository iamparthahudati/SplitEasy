import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing[8],
    paddingBottom: spacing[12],
  },

  // Logo block
  logoBlock: {
    alignItems: 'center',
    marginBottom: spacing[8],
    paddingHorizontal: spacing[4],
  },
  wordmark: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as '700',
    color: colors.brand,
    letterSpacing: -0.5,
  },
  versionText: {
    fontSize: fontSizes.sm,
    color: colors.text3,
    marginTop: spacing[1],
  },

  // Groups
  groupsWrapper: {
    paddingHorizontal: spacing[4],
  },
});
