import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacings,
} from '../../../theme/typography';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
  },
  rowDefault: {
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
  },
  rowCompact: {
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
  title: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.text3,
    letterSpacing: letterSpacings.widest,
    textTransform: 'uppercase',
    flex: 1,
  },
  action: {
    paddingVertical: spacing[1],
    paddingLeft: spacing[3],
  },
  actionPressed: {
    opacity: 0.5,
  },
  actionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.brand,
  },
});

export default styles;
