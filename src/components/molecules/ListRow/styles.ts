import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

export const LEFT_CONTAINER_SIZE = 36;
export const LEFT_CONTAINER_MARGIN = spacing[3];
export const SEPARATOR_INSET =
  spacing[4] + LEFT_CONTAINER_SIZE + LEFT_CONTAINER_MARGIN;

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.white,
    minHeight: sizes.btnHeight,
  },
  pressed: {
    backgroundColor: colors.brandLight,
  },
  leftIconContainer: {
    width: LEFT_CONTAINER_SIZE,
    height: LEFT_CONTAINER_SIZE,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: LEFT_CONTAINER_MARGIN,
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.text1,
    lineHeight: 20,
  },
  titleDisabled: {
    color: colors.text4,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    marginTop: 2,
    lineHeight: 17,
  },
  rightBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginLeft: spacing[2],
  },
  rightLabelStack: {
    alignItems: 'flex-end',
  },
  rightLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text2,
    lineHeight: 18,
  },
  rightSublabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    color: colors.text4,
    lineHeight: 14,
    marginTop: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderMid,
    marginLeft: SEPARATOR_INSET,
  },
});

export default styles;
