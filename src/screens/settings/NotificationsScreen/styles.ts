import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing[6],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[12],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
});
