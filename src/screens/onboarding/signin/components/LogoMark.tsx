import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontWeights } from '../../../../theme/typography';

const ORANGE = '#F59E0B';
const BG_MASK = '#1A1560'; // matches screen background for arc masking

// ─── Props ────────────────────────────────────────────────────────────────────
interface LogoMarkProps {
  /** Circle-only mode: renders just the split-circle, no wordmark */
  iconOnly?: boolean;
  /** Scale multiplier — default 1 (icon ~44px), use 2+ for hero display */
  scale?: number;
}

// ─── Split-circle icon ────────────────────────────────────────────────────────
// Left  : solid white semicircle
// Right : orange outline arc (larger radius → D-shape)
// Center: orange vertical divider
function SplitCircleIcon({ scale = 1 }: { scale?: number }) {
  const LR = 22 * scale; // left semicircle radius
  const RR = 27 * scale; // right arc radius (larger)
  const SW = 2.5 * scale; // stroke width
  const H = RR * 2; // total height

  return (
    <View style={{ width: LR + RR, height: H }}>
      {/* Right arc — full orange circle outline */}
      <View
        style={{
          position: 'absolute',
          left: LR - RR,
          top: 0,
          width: RR * 2,
          height: RR * 2,
          borderRadius: RR,
          borderWidth: SW,
          borderColor: ORANGE,
          backgroundColor: 'transparent',
        }}
      />
      {/* Mask left half of right circle */}
      <View
        style={{
          position: 'absolute',
          left: LR - RR,
          top: 0,
          width: RR,
          height: RR * 2,
          backgroundColor: BG_MASK,
        }}
      />

      {/* Left filled white semicircle */}
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

      {/* Center orange divider */}
      <View
        style={{
          position: 'absolute',
          left: LR - SW / 2,
          top: (H - LR * 2) / 2,
          width: SW,
          height: LR * 2,
          backgroundColor: ORANGE,
        }}
      />
    </View>
  );
}

// ─── LogoMark ─────────────────────────────────────────────────────────────────
export function LogoMark({ iconOnly = false, scale = 1 }: LogoMarkProps) {
  const fontSize = 26 * scale;

  if (iconOnly) {
    return <SplitCircleIcon scale={scale} />;
  }

  return (
    <View style={styles.column}>
      {/* Split-circle icon */}
      <SplitCircleIcon scale={scale} />

      {/* Two-tone wordmark below the icon */}
      <View style={styles.wordmarkRow}>
        <Text style={[styles.wordmarkWhite, { fontSize }]}>Split</Text>
        <Text style={[styles.wordmarkOrange, { fontSize }]}>Easy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    gap: 14,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordmarkWhite: {
    fontWeight: fontWeights.bold,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  wordmarkOrange: {
    fontWeight: fontWeights.bold,
    color: ORANGE,
    letterSpacing: -0.5,
  },
});
