import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text2,
    marginBottom: spacing[1] + 2,
    letterSpacing: 0.1,
  },
  labelError: {
    color: colors.neg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingHorizontal: spacing[3],
    backgroundColor: colors.white,
  },
  inputContainerFocused: {
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.text1,
    height: '100%',
    padding: 0,
  },
  inputWithLeft: {
    marginLeft: spacing[2],
  },
  inputWithRight: {
    marginRight: spacing[2],
  },
  inputMultiline: {
    height: undefined,
    paddingTop: 2,
  },
  inputDisabled: {
    color: colors.text4,
  },
  leftIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightElementWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[1] + 2,
    gap: spacing[1],
  },
  errorDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.neg,
  },
  errorText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.neg,
    flex: 1,
  },
  hintText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    marginTop: spacing[1] + 2,
    lineHeight: fontSizes.sm * 1.5,
  },
});

export default styles;
