import { StyleSheet } from 'react-native';

import { radius, sizes, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing[4],
    gap: spacing[3],
  },
  iconWrap: {
    width: sizes.avatarMd,
    height: sizes.avatarMd,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: spacing[1],
  },
  title: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.base * 1.4,
  },
  body: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * 1.5,
  },
  action: {
    marginTop: spacing[2],
    alignSelf: 'flex-start',
  },
  actionPressed: {
    opacity: 0.6,
  },
  actionLabel: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  },
  dismiss: {
    flexShrink: 0,
  },
});

export default styles;
