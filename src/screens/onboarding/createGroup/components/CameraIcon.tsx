import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../../../theme/colors';

// ── Component ─────────────────────────────────────────────────────────────────

export function CameraIcon(): React.JSX.Element {
  return (
    <View style={s.wrap}>
      <View style={s.body} />
      <View style={s.lens} />
      <View style={s.bump} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  wrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    width: 20,
    height: 14,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: colors.white,
    bottom: 1,
  },
  lens: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.white,
    bottom: 5,
    zIndex: 1,
  },
  bump: {
    position: 'absolute',
    width: 6,
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: colors.white,
    top: 3,
    left: 5,
  },
});
