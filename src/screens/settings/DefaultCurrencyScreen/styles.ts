import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  searchWrapper: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMid,
  },
  listContent: {
    paddingTop: spacing[4],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[12],
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  checkIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrapper: {
    paddingVertical: spacing[10],
    alignItems: 'center',
  },
});
