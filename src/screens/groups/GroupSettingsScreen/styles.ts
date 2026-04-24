import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, spacing } from '../../../theme/spacing';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },

  // ── Group image section ───────────────────────────────────────────────────────
  imageSection: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
  },
  imageCircleWrap: {
    position: 'relative',
    marginBottom: spacing[4],
  },
  imageCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  nameInput: {
    width: '100%',
  },

  // ── Settings groups ───────────────────────────────────────────────────────────
  settingsSection: {
    paddingHorizontal: spacing[4],
    marginTop: spacing[2],
  },
});

export default styles;
