import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[8],
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[5],
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: fontSizes.base * 1.55,
    marginBottom: spacing[6],
  },
  cta: {
    height: sizes.btnHeightSm,
    paddingHorizontal: spacing[6],
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[2],
  },
  ctaPressed: {
    backgroundColor: colors.brandDark,
  },
  ctaLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },
});

export default styles;
