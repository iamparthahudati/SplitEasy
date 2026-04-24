import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacings,
} from '../../../theme/typography';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  row: {
    height: sizes.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  sideSlot: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideSlotRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing[2],
    width: 'auto',
    minWidth: 40,
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlotLeft: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacings.tight,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    marginTop: 1,
    lineHeight: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: {
    opacity: 0.7,
  },
  badgeDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.neg,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
});

export default styles;
