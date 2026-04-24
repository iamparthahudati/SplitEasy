import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { fontSizes, fontWeights } from '../../theme/typography';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  label,
  disabled = false,
  style,
}) => {
  const dotScale = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(dotScale, {
      toValue: selected ? 1 : 0,
      useNativeDriver: true,
      overshootClamping: true,
    }).start();
  }, [selected, dotScale]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      style={[styles.row, disabled && styles.disabled, style]}
    >
      <View
        style={[
          styles.outerCircle,
          selected ? styles.outerCircleSelected : styles.outerCircleUnselected,
        ]}
      >
        <Animated.View
          style={[styles.innerDot, { transform: [{ scale: dotScale }] }]}
        />
      </View>

      {label !== undefined && (
        <Text
          style={[
            styles.label,
            disabled ? styles.labelDisabled : styles.labelEnabled,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleSelected: {
    borderColor: colors.brand,
  },
  outerCircleUnselected: {
    borderColor: colors.borderMid,
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand,
  },
  label: {
    marginLeft: spacing[2],
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
  },
  labelEnabled: {
    color: colors.text2,
  },
  labelDisabled: {
    color: colors.text3,
  },
});

export default RadioButton;
