import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../../theme/colors';
import { radius, spacing } from '../../../../theme/spacing';
import { fontSizes, fontWeights } from '../../../../theme/typography';

// Hero indigo token (Phase 1 addition, fallback until colors.ts is updated)
const HERO_INDIGO = colors.heroIndigo ?? '#3730A3';
const COG_COLOR = colors.text3;

const COG_OUTER_SIZE = 24;
const COG_INNER_SIZE = 8;
const COG_BORDER = 2;
const TOOTH_WIDTH = 4;
const TOOTH_HEIGHT = 7;
const BACK_ARROW_SIZE = 22;

/** 8 evenly-spaced rectangular teeth rotated around the cog center */
const COG_TEETH = Array.from({ length: 8 }, (_, i) => ({
  index: i,
  transform: [{ rotate: `${i * 45}deg` }],
}));

interface NavBarProps {
  title: string;
  onBack: () => void;
  onSettings: () => void;
}

// ─── Split-circle logo (View-based, no SVG) ───────────────────────────────────
const LOGO_BLUE = '#3B5BDB';
const LR = 12;
const LD = LR * 2;

function SplitCircleLogo() {
  return (
    <View style={logoStyles.root}>
      <View style={logoStyles.outline} />
      <View style={logoStyles.leftClip}>
        <View style={logoStyles.leftFill} />
      </View>
      <View style={logoStyles.divider} />
    </View>
  );
}

const logoStyles = StyleSheet.create({
  root: {
    width: LD,
    height: LD,
  },
  outline: {
    position: 'absolute',
    width: LD,
    height: LD,
    borderRadius: LR,
    borderWidth: 1.5,
    borderColor: LOGO_BLUE,
    backgroundColor: 'transparent',
  },
  leftClip: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: LR,
    height: LD,
    overflow: 'hidden',
  },
  leftFill: {
    width: LD,
    height: LD,
    borderRadius: LR,
    backgroundColor: colors.white,
  },
  divider: {
    position: 'absolute',
    left: LR - 0.75,
    top: 0,
    width: 1.5,
    height: LD,
    backgroundColor: LOGO_BLUE,
  },
});

export function NavBar({ title, onBack, onSettings }: NavBarProps) {
  return (
    <View style={styles.container}>
      {/* Left: Back arrow */}
      <Pressable
        onPress={onBack}
        style={styles.sideSlot}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.backArrow}>{'<'}</Text>
      </Pressable>

      {/* Center: Logo + Title */}
      <View style={styles.centerSlot}>
        <SplitCircleLogo />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right: Gear icon (View-based cog) */}
      <Pressable
        onPress={onSettings}
        style={styles.sideSlot}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.cogOuter}>
          {COG_TEETH.map(tooth => (
            <View
              key={tooth.index}
              style={[styles.cogTooth, { transform: tooth.transform }]}
            />
          ))}
          <View style={styles.cogInner} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  sideSlot: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[1],
  },
  backArrow: {
    fontSize: BACK_ARROW_SIZE,
    color: HERO_INDIGO,
    fontWeight: fontWeights.semibold,
    lineHeight: 26,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.text1,
  },
  cogOuter: {
    width: COG_OUTER_SIZE,
    height: COG_OUTER_SIZE,
    borderRadius: COG_OUTER_SIZE / 2,
    borderWidth: COG_BORDER,
    borderColor: COG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cogTooth: {
    position: 'absolute',
    width: TOOTH_WIDTH,
    height: TOOTH_HEIGHT,
    borderRadius: radius.xs / 4,
    backgroundColor: COG_COLOR,
    top: (COG_OUTER_SIZE - TOOTH_HEIGHT) / 2 - COG_OUTER_SIZE / 2 + 1,
    left: (COG_OUTER_SIZE - TOOTH_WIDTH) / 2,
  },
  cogInner: {
    width: COG_INNER_SIZE,
    height: COG_INNER_SIZE,
    borderRadius: COG_INNER_SIZE / 2,
    backgroundColor: COG_COLOR,
  },
});
