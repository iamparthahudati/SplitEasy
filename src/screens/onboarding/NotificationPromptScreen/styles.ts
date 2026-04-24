import { StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.onboardingTop,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing[8],
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[6],
    paddingBottom: spacing[8],
    alignItems: 'center',
  },
  bellCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  bellGlyph: {
    fontSize: 28,
    lineHeight: 34,
  },
  heading: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text1,
    marginBottom: spacing[1],
    textAlign: 'center',
  },
  progress: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text4,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  sub: {
    fontSize: fontSizes.base,
    color: colors.text3,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing[6],
  },
  benefitsList: {
    alignSelf: 'stretch',
    marginBottom: spacing[6],
    gap: spacing[4],
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  benefitIcon: {
    fontSize: fontSizes.lg,
    width: 28,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: fontSizes.base,
    color: colors.text2,
    fontWeight: fontWeights.medium,
    flex: 1,
  },
  enableBtn: {
    height: sizes.btnHeight,
    backgroundColor: colors.brand,
    borderRadius: radius.sm,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  enableText: {
    color: colors.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
  },
  laterBtn: {
    paddingVertical: spacing[3],
  },
  laterText: {
    fontSize: fontSizes.base,
    color: colors.text4,
  },
});

export default styles;
