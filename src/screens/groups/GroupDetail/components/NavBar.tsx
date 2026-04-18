import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface NavBarProps {
  title: string;
  onBack: () => void;
  onSettings: () => void;
}

const COG_OUTER_SIZE = 24;
const COG_INNER_SIZE = 8;
const COG_BORDER = 2;
const TOOTH_WIDTH = 4;
const TOOTH_HEIGHT = 7;
const COG_COLOR = '#64748B';

/** 8 evenly-spaced rectangular teeth rotated around the cog center */
const COG_TEETH = Array.from({ length: 8 }, (_, i) => ({
  index: i,
  transform: [{ rotate: `${i * 45}deg` }],
}));

export const NavBar = ({ title, onBack, onSettings }: NavBarProps) => {
  return (
    <View style={navBarStyles.container}>
      {/* Left: Back arrow */}
      <Pressable
        onPress={onBack}
        style={navBarStyles.sideSlot}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={navBarStyles.backArrow}>{'<'}</Text>
      </Pressable>

      {/* Center: Title */}
      <View style={navBarStyles.centerSlot}>
        <Text style={navBarStyles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right: Gear icon (View-based cog) */}
      <Pressable
        onPress={onSettings}
        style={navBarStyles.sideSlot}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={navBarStyles.cogOuter}>
          {COG_TEETH.map(tooth => (
            <View
              key={tooth.index}
              style={[navBarStyles.cogTooth, { transform: tooth.transform }]}
            />
          ))}
          <View style={navBarStyles.cogInner} />
        </View>
      </Pressable>
    </View>
  );
};

const navBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sideSlot: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  backArrow: {
    fontSize: 22,
    color: '#3730A3',
    fontWeight: '600',
    lineHeight: 26,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
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
    borderRadius: 1,
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
