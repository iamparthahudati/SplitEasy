import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontWeights } from '../../../../theme/typography';

// ─── Logo constants ───────────────────────────────────────────────────────────
const LR = 22; // left semicircle radius → 44px diameter
const RR = 27; // right arc radius (larger D-shape)
const SW = 2.5; // orange stroke width
const H = RR * 2; // total height driven by taller right arc
const BG = '#1A1560'; // background color for masking right arc left half
const ORANGE = '#F59E0B';

// ─── Split-circle mark ────────────────────────────────────────────────────────
// Left  : solid white filled semicircle (radius LR)
// Right : orange outline arc only (radius RR, larger — D-shape)
//         achieved by drawing a full orange circle then masking its left half
// Center: vertical orange divider line
function SplitCircle() {
  const totalW = LR + RR;

  return (
    <View style={{ width: totalW, height: H }}>
      {/* Right arc — full orange circle outline */}
      <View
        style={{
          position: 'absolute',
          left: LR - RR, // center the right circle on the divider
          top: 0,
          width: RR * 2,
          height: RR * 2,
          borderRadius: RR,
          borderWidth: SW,
          borderColor: ORANGE,
          backgroundColor: 'transparent',
        }}
      />
      {/* Mask: cover left half of right circle with bg color */}
      <View
        style={{
          position: 'absolute',
          left: LR - RR,
          top: 0,
          width: RR,
          height: RR * 2,
          backgroundColor: BG,
        }}
      />

      {/* Left filled semicircle */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          top: (H - LR * 2) / 2,
          width: LR,
          height: LR * 2,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: LR * 2,
            height: LR * 2,
            borderRadius: LR,
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* Center vertical orange divider */}
      <View
        style={{
          position: 'absolute',
          left: LR - 1,
          top: (H - LR * 2) / 2,
          width: 2,
          height: LR * 2,
          backgroundColor: ORANGE,
        }}
      />
    </View>
  );
}

// ─── LogoMark: circle + wordmark inline ──────────────────────────────────────
export function LogoMark() {
  return (
    <View style={styles.row}>
      <SplitCircle />
      <Text style={styles.wordmark}>
        <Text style={styles.wordmarkWhite}>Split</Text>
        <Text style={styles.wordmarkOrange}>Easy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wordmark: {
    fontSize: 26,
    letterSpacing: -0.3,
  },
  wordmarkWhite: {
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
  },
  wordmarkOrange: {
    fontWeight: fontWeights.bold,
    color: ORANGE,
  },
});
