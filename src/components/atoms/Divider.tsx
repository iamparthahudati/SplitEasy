import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  insetLeft?: number;
  insetRight?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = colors.borderMid,
  thickness = StyleSheet.hairlineWidth,
  insetLeft = 0,
  insetRight = 0,
  label,
  style,
}) => {
  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          { width: thickness, backgroundColor: color },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View
        style={[
          styles.row,
          { marginLeft: insetLeft, marginRight: insetRight },
          style,
        ]}
      >
        <View
          style={[styles.line, { height: thickness, backgroundColor: color }]}
        />
        <Text style={[styles.label, { color }]}>{label}</Text>
        <View
          style={[styles.line, { height: thickness, backgroundColor: color }]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontal,
        {
          height: thickness,
          backgroundColor: color,
          marginLeft: insetLeft,
          marginRight: insetRight,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    alignSelf: 'stretch',
  },
  vertical: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  line: {
    flex: 1,
  },
  label: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginHorizontal: spacing[3],
  },
});

export default Divider;
