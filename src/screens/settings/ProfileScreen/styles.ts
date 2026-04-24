import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../theme/typography';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[12],
  },

  // Avatar section
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderMid,
    marginBottom: spacing[6],
  },
  avatarWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },

  // Form section
  formSection: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
    overflow: 'hidden',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
  },
  fieldSpacing: {
    marginBottom: spacing[4],
  },

  // Member since row
  memberCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
    overflow: 'hidden',
  },

  // Save button
  saveButton: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[6],
  },

  // Danger zone
  dangerSection: {
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
  },
  dangerLabel: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold as '600',
    color: colors.text3,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
});
