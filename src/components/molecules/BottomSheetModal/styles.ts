import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import {
  fontSizes,
  fontWeights,
  letterSpacings,
} from '../../../theme/typography';

// ─── Constants ────────────────────────────────────────────────────────────────

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const ANIM_DURATION = 320;
export const OVERLAY_OPACITY = 0.45;

export const SNAP_HEIGHTS: Record<
  'quarter' | 'half' | 'full' | 'auto',
  number
> = {
  quarter: SCREEN_HEIGHT * 0.28,
  half: SCREEN_HEIGHT * 0.52,
  full: SCREEN_HEIGHT * 0.92,
  auto: 0,
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  // Backdrop
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.black,
  },
  // Sheet panel
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    // Shadow
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  // Drag handle
  handleWrap: {
    alignItems: 'center',
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.borderMid,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  headerSide: {
    width: 36,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.text1,
    letterSpacing: letterSpacings.tight,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: {
    backgroundColor: colors.borderMid,
  },
  // Content
  content: {
    flex: 1,
  },
});

export default styles;
