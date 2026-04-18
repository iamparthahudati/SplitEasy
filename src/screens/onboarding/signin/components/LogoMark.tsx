import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontSizes, fontWeights } from '../../../../theme/typography';

const R = 14; // radius → 28px diameter
const D = R * 2; // 28
const SW = 1.5; // stroke width

export function LogoMark() {
  return (
    <View style={styles.row}>
      {/* ── Split-circle mark ── */}
      <View style={{ width: D, height: D }}>
        {/* Full circle — white stroke outline */}
        <View
          style={{
            position: 'absolute',
            width: D,
            height: D,
            borderRadius: R,
            borderWidth: SW,
            borderColor: 'rgba(255,255,255,0.88)',
            backgroundColor: 'transparent',
          }}
        />

        {/* Left half — solid white fill clipped to left 50% */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: R,
            height: D,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: D,
              height: D,
              borderRadius: R,
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>

        {/* Center vertical divider — 1px white */}
        <View
          style={{
            position: 'absolute',
            left: R - 0.5,
            top: 0,
            width: 1,
            height: D,
            backgroundColor: '#FFFFFF',
          }}
        />
      </View>

      {/* ── Wordmark ── */}
      <Text style={styles.wordmark}>SplitEasy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordmark: {
    fontSize: fontSizes.md, // 16px
    fontWeight: fontWeights.bold, // 700
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
