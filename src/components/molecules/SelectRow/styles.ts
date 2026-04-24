import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    minHeight: 52,
  },
  rowPressed: {
    backgroundColor: colors.brandLight,
  },
  rowDisabled: {
    opacity: 0.5,
  },
  iconWrap: {
    marginRight: spacing[3],
  },
  label: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginLeft: spacing[2],
  },
  valueText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    maxWidth: 160,
  },
  placeholderText: {
    color: colors.text4,
  },
});

export default styles;
