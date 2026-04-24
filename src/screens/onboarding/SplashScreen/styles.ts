import { StyleSheet } from 'react-native';

import {
  fontSizes,
  fontWeights,
  letterSpacings,
} from '../../../theme/typography';

// ─── Splash gradient colors ───────────────────────────────────────────────────
const GRAD_TOP = '#1A1560'; // near-black dark indigo
const GRAD_MID = '#2D2A6E'; // indigo mid
const GRAD_BOTTOM = '#3730A3'; // indigo 700

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAD_TOP,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Gradient bands
  gradMid: {
    ...StyleSheet.absoluteFill,
    top: '38%',
    backgroundColor: GRAD_MID,
    opacity: 0.82,
  },
  gradBottom: {
    ...StyleSheet.absoluteFill,
    top: '68%',
    backgroundColor: GRAD_BOTTOM,
    opacity: 0.7,
  },

  // Very faint radial warmth behind logo — not a visible ring
  radialGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: '50%',
    marginTop: -160,
    alignSelf: 'center',
  },

  // Logo + text block — sits slightly above center
  centerUnit: {
    alignItems: 'center',
    marginBottom: '18%',
  },

  wordmark: {
    marginTop: 12,
    fontSize: fontSizes['3xl'], // 30px
    fontWeight: fontWeights.extrabold, // 800
    color: '#FFFFFF',
    letterSpacing: letterSpacings.tight, // -0.5
  },

  divider: {
    marginTop: 12,
    width: 36,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  tagline: {
    marginTop: 10,
    fontSize: fontSizes.xs, // 10px
    fontWeight: fontWeights.medium, // 500
    color: 'rgba(255,255,255,0.40)',
    letterSpacing: 3.5,
    textTransform: 'uppercase',
  },

  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: fontSizes.xs, // 10px
    fontWeight: fontWeights.regular, // 400
    color: 'rgba(255,255,255,0.20)',
    letterSpacing: 0.5,
  },
});

export default styles;
